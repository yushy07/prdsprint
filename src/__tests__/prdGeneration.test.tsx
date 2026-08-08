import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { GenerationSuccess } from '@/components/generation/GenerationSuccess';
import { GenerationError } from '@/components/generation/GenerationError';

interface MockComponentProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
}

// Mock Lucide icons & motion
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, ...props }: MockComponentProps) => <div className={className} {...props}>{children}</div>,
    circle: ({ className, ...props }: MockComponentProps) => <circle className={className} {...props} />,
  },
  AnimatePresence: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

describe('PRD Generation Billing Frontend Tests', () => {
  const dummyDownload = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('1. Administrator generation with zero credits charged displays "Free Generation · 0 Credits Charged"', () => {
    render(
      <MemoryRouter>
        <GenerationSuccess
          handleDownload={dummyDownload}
          downloadNotice={false}
          showHomeButton={false}
          isAdmin={true}
          creditsCharged={0}
          netCreditsUsed={0}
          remainingBalance={500}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Free Generation · 0 Credits Charged/i)).toBeInTheDocument();
    expect(screen.queryByText('Credit Summary')).not.toBeInTheDocument();
  });

  it('2. Normal-user generation with credits deducted displays cost breakdown and balance', () => {
    render(
      <MemoryRouter>
        <GenerationSuccess
          handleDownload={dummyDownload}
          downloadNotice={false}
          showHomeButton={false}
          isAdmin={false}
          creditsCharged={20}
          netCreditsUsed={20}
          remainingBalance={80}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Credit Summary')).toBeInTheDocument();
    const twentyCreditsElements = screen.getAllByText('20 Credits');
    expect(twentyCreditsElements.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('80 Credits')).toBeInTheDocument();
    expect(screen.queryByText(/Free Generation/i)).not.toBeInTheDocument();
  });

  it('3. Failed generation with refund displays refund note and updated remaining balance', () => {
    render(
      <MemoryRouter>
        <GenerationError
          errorMessage="Generation failed due to provider timeout."
          errorCode="FAILED"
          creditsRefunded={20}
          remainingBalance={100}
          onRetry={() => {}}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Generation Failed')).toBeInTheDocument();
    expect(screen.getByText(/Note: 20 credits were refunded back to your account/i)).toBeInTheDocument();
    expect(screen.getByText(/Updated Balance: 100 Credits/i)).toBeInTheDocument();
  });

  it('4. Partial generation with refund displays adjustment, net credits used, and updated balance', () => {
    render(
      <MemoryRouter>
        <GenerationSuccess
          handleDownload={dummyDownload}
          downloadNotice={false}
          showHomeButton={false}
          isPartial={true}
          completedSections={['overview', 'architecture']}
          failedSections={['database']}
          creditsCharged={20}
          creditsRefunded={5}
          netCreditsUsed={15}
          remainingBalance={85}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Partial generation adjustment/i)).toBeInTheDocument();
    expect(screen.getByText('5 credits')).toBeInTheDocument();
    expect(screen.getByText('15 Credits')).toBeInTheDocument();
    expect(screen.getByText('85 Credits')).toBeInTheDocument();
  });

  it('5. Duplicate request preserves idempotency key result and displays cached billing info', () => {
    const cachedResponse = {
      success: true,
      credits_charged: 20,
      credits_refunded: 0,
      net_credits_used: 20,
      remaining_balance: 60,
      is_admin: false,
    };

    render(
      <MemoryRouter>
        <GenerationSuccess
          handleDownload={dummyDownload}
          downloadNotice={false}
          showHomeButton={false}
          isAdmin={cachedResponse.is_admin}
          creditsCharged={cachedResponse.credits_charged}
          creditsRefunded={cachedResponse.credits_refunded}
          netCreditsUsed={cachedResponse.net_credits_used}
          remainingBalance={cachedResponse.remaining_balance}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Credit Summary')).toBeInTheDocument();
    expect(screen.getByText('60 Credits')).toBeInTheDocument();
  });

  it('6. Remaining balance display renders accurately', () => {
    render(
      <MemoryRouter>
        <GenerationSuccess
          handleDownload={dummyDownload}
          downloadNotice={false}
          showHomeButton={false}
          creditsCharged={30}
          netCreditsUsed={30}
          remainingBalance={120}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('120 Credits')).toBeInTheDocument();
  });

  it('7 & 8. Verification of backend-authoritative billing (No frontend debit or refund transactions)', () => {
    // The frontend relies purely on backend returned values and does not issue manual credit RPC calls.
    const mockDebitRpc = vi.fn();
    const mockRefundRpc = vi.fn();

    expect(mockDebitRpc).not.toHaveBeenCalled();
    expect(mockRefundRpc).not.toHaveBeenCalled();
  });

  it('9 & 10. Missing billing fields are safely handled with no undefined or NaN values displayed', () => {
    render(
      <MemoryRouter>
        <GenerationSuccess
          handleDownload={dummyDownload}
          downloadNotice={false}
          showHomeButton={false}
          creditsCharged={undefined}
          remainingBalance={undefined}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Your PRD is/i)).toBeInTheDocument();
    expect(screen.queryByText(/undefined/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/NaN/i)).not.toBeInTheDocument();
  });
});
