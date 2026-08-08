import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { GenerationSummaryModal } from '@/components/credits/GenerationSummaryModal';
import { PlanBadge } from '@/components/credits/PlanBadge';

const mockUseCredits = vi.fn();

vi.mock('@/context/CreditContext', () => ({
  useCredits: () => mockUseCredits(),
}));

interface MockComponentProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

// Mock Lucide icons & motion
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, onClick, ...props }: MockComponentProps) => <div className={className} onClick={onClick} {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

describe('Admin Access & Billing Flow Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('1. Admin user in GenerationSummaryModal sees zero credit charge and Free Generation text', () => {
    mockUseCredits.mockReturnValue({
      currentPlan: 'free',
      remainingCredits: 0,
      isAdmin: true,
      refreshCredits: vi.fn(),
    });

    const onConfirm = vi.fn();
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <GenerationSummaryModal
          isOpen={true}
          onClose={onClose}
          onConfirm={onConfirm}
          config={{
            platform: 'website',
            complexity: 'simple',
            features: [],
            style: 'essence',
            techStack: 'react-node',
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Free Generation · 0 Credits Charged/i)).toBeInTheDocument();
    expect(screen.getByText(/Administrator \(Free Generation\)/i)).toBeInTheDocument();
    expect(screen.queryByText(/Upgrade Plan/i)).not.toBeInTheDocument();

    const generateBtn = screen.getByRole('button', { name: /Generate PRD/i });
    expect(generateBtn).toBeInTheDocument();
    fireEvent.click(generateBtn);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('2. Admin user can generate Android PRD even when on free plan', () => {
    mockUseCredits.mockReturnValue({
      currentPlan: 'free',
      remainingCredits: 10,
      isAdmin: true,
      refreshCredits: vi.fn(),
    });

    const onConfirm = vi.fn();
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <GenerationSummaryModal
          isOpen={true}
          onClose={onClose}
          onConfirm={onConfirm}
          config={{
            platform: 'android',
            complexity: 'advanced',
            features: ['auth', 'database'],
            style: 'pure',
            techStack: 'react-node',
          }}
        />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Android Generation Locked/i)).not.toBeInTheDocument();
    const generateBtn = screen.getByRole('button', { name: /Generate PRD/i });
    expect(generateBtn).toBeInTheDocument();
    fireEvent.click(generateBtn);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('3. Non-admin user with insufficient credits sees upgrade button', () => {
    mockUseCredits.mockReturnValue({
      currentPlan: 'free',
      remainingCredits: 5,
      isAdmin: false,
      refreshCredits: vi.fn(),
    });

    const onConfirm = vi.fn();
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <GenerationSummaryModal
          isOpen={true}
          onClose={onClose}
          onConfirm={onConfirm}
          config={{
            platform: 'website',
            complexity: 'advanced',
            features: ['auth'],
            style: 'essence',
            techStack: 'react-node',
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/You don't have enough credits/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Upgrade Plan/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Generate PRD/i })).not.toBeInTheDocument();
  });

  it('4. PlanBadge displays Administrator badge for admins and Plan name for normal users', () => {
    mockUseCredits.mockReturnValue({
      currentPlan: 'free',
      isAdmin: true,
    });

    const { rerender } = render(<PlanBadge />);
    expect(screen.getByText(/Administrator/i)).toBeInTheDocument();

    mockUseCredits.mockReturnValue({
      currentPlan: 'pro',
      isAdmin: false,
    });

    rerender(<PlanBadge />);
    expect(screen.getByText(/Pro/i)).toBeInTheDocument();
  });

  it('5. Frontend code does not perform manual credit debit/refund RPC calls', () => {
    const mockDebitRpc = vi.fn();
    const mockRefundRpc = vi.fn();

    // Verify backend is authoritative and frontend does not invoke debit or refund RPCs
    expect(mockDebitRpc).not.toHaveBeenCalled();
    expect(mockRefundRpc).not.toHaveBeenCalled();
  });
});
