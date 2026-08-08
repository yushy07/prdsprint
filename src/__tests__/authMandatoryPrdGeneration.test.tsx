import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { GenerationStep } from '@/pages/GenerationStep';
import { Builder } from '@/pages/Builder';
import { GoogleAuthModal } from '@/components/auth/GoogleAuthModal';
import { supabase } from '@/lib/supabase';

// Mock lucide icons and motion to avoid heavy render issues
vi.mock('motion/react', () => {
  const Component = ({ children, className, onClick, ...props }: any) => (
    <div className={className} onClick={onClick} {...props}>{children}</div>
  );
  return {
    motion: new Proxy({}, {
      get: () => Component,
    }),
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

vi.mock('@/context/CreditContext', () => ({
  useCredits: () => ({
    currentCredits: 100,
    maxCredits: 100,
    currentPlan: 'pro',
    remainingCredits: 100,
    isAdmin: false,
    refreshCredits: vi.fn().mockResolvedValue(undefined),
    updateBalance: vi.fn(),
  }),
}));

vi.mock('@/context/ToastContext', () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  }),
}));

vi.mock('@/lib/supabase', () => {
  const getSessionMock = vi.fn();
  const onAuthStateChangeMock = vi.fn().mockReturnValue({
    data: { subscription: { unsubscribe: vi.fn() } },
  });
  const signInWithOAuthMock = vi.fn().mockResolvedValue({ error: null });
  const invokeMock = vi.fn();

  return {
    supabase: {
      auth: {
        getSession: getSessionMock,
        onAuthStateChange: onAuthStateChangeMock,
        signInWithOAuth: signInWithOAuthMock,
      },
      functions: {
        invoke: invokeMock,
      },
    },
  };
});

describe('Mandatory Google Auth before PRD Generation Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('1. Signed-out user clicking Generate opens Google sign-in popup', async () => {
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: null },
      error: null,
    });

    render(
      <MemoryRouter>
        <GenerationStep wizardData={{ platform: 'website', frontend: 'react-tailwind', backend: '', database: '', colorPalette: '', font: '', theme: '', designStyle: 'minimalist', description: 'Test app' }} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Authentication Required')).toBeInTheDocument();
    });
  });

  it('2. Signed-out user does not call generate-prd', async () => {
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: null },
      error: null,
    });

    render(
      <MemoryRouter>
        <GenerationStep wizardData={{ platform: 'website', frontend: 'react-tailwind', backend: '', database: '', colorPalette: '', font: '', theme: '', designStyle: 'minimalist', description: 'Test app' }} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Authentication Required')).toBeInTheDocument();
    });

    expect(supabase.functions.invoke).not.toHaveBeenCalled();
  });

  it('3. Signed-in user can generate normally', async () => {
    (supabase.auth.getSession as any).mockResolvedValue({
      data: {
        session: { access_token: 'valid-token-123', user: { id: 'user-1' } },
      },
      error: null,
    });

    (supabase.functions.invoke as any).mockResolvedValue({
      data: {
        success: true,
        sections: { overview: 'PRD overview content' },
        credits_charged: 20,
        net_credits_used: 20,
        remaining_balance: 80,
      },
      error: null,
    });

    render(
      <MemoryRouter>
        <GenerationStep wizardData={{ platform: 'website', frontend: 'react-tailwind', backend: '', database: '', colorPalette: '', font: '', theme: '', designStyle: 'minimalist', description: 'Test app' }} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(supabase.functions.invoke).toHaveBeenCalledWith('generate-prd', expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer valid-token-123',
        }),
      }));
    });
  });

  it('4. Successful Google sign-in resumes generation once', async () => {
    let authCallback: any = null;
    (supabase.auth.onAuthStateChange as any).mockImplementation((cb: any) => {
      authCallback = cb;
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });

    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: null },
      error: null,
    });

    (supabase.functions.invoke as any).mockResolvedValue({
      data: {
        success: true,
        sections: { overview: 'Resumed PRD' },
        credits_charged: 20,
        remaining_balance: 80,
      },
      error: null,
    });

    render(
      <MemoryRouter>
        <GenerationStep wizardData={{ platform: 'website', frontend: 'react-tailwind', backend: '', database: '', colorPalette: '', font: '', theme: '', designStyle: 'minimalist', description: 'Test app' }} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Authentication Required')).toBeInTheDocument();
    });

    expect(supabase.functions.invoke).not.toHaveBeenCalled();

    // Now simulate Google Auth success
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: { access_token: 'fresh-token' } },
      error: null,
    });

    if (authCallback) {
      authCallback('SIGNED_IN', { access_token: 'fresh-token' });
    }

    await waitFor(() => {
      expect(supabase.functions.invoke).toHaveBeenCalledTimes(1);
    });
  });

  it('5. Closing the popup cancels generation', async () => {
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: null },
      error: null,
    });

    render(
      <MemoryRouter>
        <GenerationStep wizardData={{ platform: 'website', frontend: 'react-tailwind', backend: '', database: '', colorPalette: '', font: '', theme: '', designStyle: 'minimalist', description: 'Test app' }} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Authentication Required')).toBeInTheDocument();
    });

    const closeBtn = screen.getByRole('button', { name: /Close modal/i });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText(/Authentication Required/i)).not.toBeInTheDocument();
    });

    expect(supabase.functions.invoke).not.toHaveBeenCalled();
  });

  it('6. Failed Google sign-in does not generate', async () => {
    (supabase.auth.signInWithOAuth as any).mockResolvedValue({
      error: { message: 'Google auth failed' },
    });

    render(
      <GoogleAuthModal
        isOpen={true}
        onClose={() => {}}
      />
    );

    const googleBtn = screen.getByRole('button', { name: /Sign in with Google/i });
    fireEvent.click(googleBtn);

    expect(supabase.functions.invoke).not.toHaveBeenCalled();
  });

  it('7. Expired session opens the popup', async () => {
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: { access_token: 'expired-token' } },
      error: null,
    });

    (supabase.functions.invoke as any).mockResolvedValue({
      data: null,
      error: { message: 'AUTHENTICATION_REQUIRED', context: { json: async () => ({ code: 'AUTHENTICATION_REQUIRED' }) } },
    });

    render(
      <MemoryRouter>
        <GenerationStep wizardData={{ platform: 'website', frontend: 'react-tailwind', backend: '', database: '', colorPalette: '', font: '', theme: '', designStyle: 'minimalist', description: 'Test app' }} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Authentication Required')).toBeInTheDocument();
    });
  });

  it('8. Admin must still authenticate', async () => {
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: null },
      error: null,
    });

    render(
      <MemoryRouter>
        <GenerationStep wizardData={{ platform: 'website', frontend: 'react-tailwind', backend: '', database: '', colorPalette: '', font: '', theme: '', designStyle: 'minimalist', description: 'Test app' }} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Authentication Required')).toBeInTheDocument();
    });

    expect(supabase.functions.invoke).not.toHaveBeenCalled();
  });

  it('9. Admin receives free generation only after authentication', async () => {
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: { access_token: 'admin-token' } },
      error: null,
    });

    (supabase.functions.invoke as any).mockResolvedValue({
      data: {
        success: true,
        sections: { overview: 'Admin PRD' },
        is_admin: true,
        credits_charged: 0,
        net_credits_used: 0,
        remaining_balance: 500,
      },
      error: null,
    });

    render(
      <MemoryRouter>
        <GenerationStep wizardData={{ platform: 'website', frontend: 'react-tailwind', backend: '', database: '', colorPalette: '', font: '', theme: '', designStyle: 'minimalist', description: 'Test app' }} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(supabase.functions.invoke).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText(/Free Generation · 0 Credits Charged/i)).toBeInTheDocument();
    });
  });

  it('10. Duplicate clicks do not create duplicate generation requests', async () => {
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: { access_token: 'valid-token' } },
      error: null,
    });

    (supabase.functions.invoke as any).mockImplementation(() => new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { success: true, sections: { overview: 'PRD' } },
          error: null,
        });
      }, 500);
    }));

    render(
      <MemoryRouter>
        <GenerationStep wizardData={{ platform: 'website', frontend: 'react-tailwind', backend: '', database: '', colorPalette: '', font: '', theme: '', designStyle: 'minimalist', description: 'Test app' }} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(supabase.functions.invoke).toHaveBeenCalledTimes(1);
    });
  });
});
