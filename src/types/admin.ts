export type AdminPageState = 'loading' | 'ready' | 'empty' | 'error' | 'forbidden' | 'unavailable';

export type SystemHealthStatus = 'healthy' | 'degraded' | 'unknown' | 'unavailable';

export interface AdminError {
  code?: string;
  message: string;
  retryable?: boolean;
}

export interface AdminAlert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  href?: string;
  createdAt: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

export type GenerationOperationalState = 'healthy' | 'stuck' | 'retryable' | 'failed';

export interface LedgerTransactionView {
  id: string;
  user_email?: string;
  type: string;
  amount: number;
  balance_before?: number;
  balance_after?: number;
  description: string;
  created_at: string;
}
