import { supabase } from '@/lib/supabase';
import type { GenerationOperationalState, PaginatedResult } from '@/types/admin';

const unwrapRows = <T,>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === 'object') {
    const record = value as { data?: unknown; rows?: unknown; results?: unknown };
    if (Array.isArray(record.data)) return record.data as T[];
    if (Array.isArray(record.rows)) return record.rows as T[];
    if (Array.isArray(record.results)) return record.results as T[];
  }
  return [];
};

const unwrapObject = <T,>(value: unknown): T | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const record = value as { data?: unknown };
  return (record.data && typeof record.data === 'object' && !Array.isArray(record.data) ? record.data : value) as T;
};

const unwrapPage = <T,>(value: unknown): PaginatedResult<T> => {
  const record = (value && typeof value === 'object' && !Array.isArray(value) ? value : {}) as Partial<PaginatedResult<T>> & { rows?: T[]; results?: T[] };
  const data = Array.isArray(record.data) ? record.data : Array.isArray(record.rows) ? record.rows : Array.isArray(record.results) ? record.results : [];
  return {
    data: data as T[],
    total: Number(record.total ?? data.length),
    page: Number(record.page ?? 1),
    page_size: Number(record.page_size ?? data.length),
    has_more: Boolean(record.has_more ?? false),
  };
};

const ADMIN_SETTING_KEYS = new Set([
  'generation_price',
  'signup_credits',
  'retry_limit',
  'maintenance_mode',
  'export_expiry',
]);

const requireReason = (reason: string, action: string) => {
  const value = reason.trim();
  if (value.length < 3) throw new Error(`A reason is required to ${action}`);
  if (value.length > 500) throw new Error('Administrative reasons must be 500 characters or fewer');
  return value;
};

const requirePositiveInteger = (amount: number, label: string) => {
  if (!Number.isInteger(amount) || amount <= 0) throw new Error(`${label} must be a positive whole number`);
  return amount;
};

// Types
export interface AdminStats {
  total_users: number;
  banned_users: number;
  total_generations: number;
  pending_generations: number;
  completed_generations: number;
  failed_generations: number;
  total_payments: number;
  completed_payments: number;
  credits_issued: number;
  credits_consumed: number;
}

export interface User {
  id: string;
  email: string;
  name?: string | null;
  full_name?: string | null;
  plan_tier: string;
  plan?: string;
  credits_balance: number;
  credits?: number;
  is_banned: boolean;
  created_at: string;
  updated_at?: string;
}

export interface UserDetails extends User {
  generation_count?: number;
  payment_count?: number;
  transaction_count?: number;
  ledger_consistent?: boolean;
}

export interface CreditTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  description: string;
  balance_before?: number;
  balance_after?: number;
  admin_id?: string;
  request_id?: string;
  generation_id?: string;
  created_at: string;
  user_email?: string;
}

export interface Generation {
  id: string;
  user_id: string;
  request_id?: string | null;
  platform?: string | null;
  style_id?: string | null;
  style?: string | null;
  status: string;
  credits_charged?: number;
  credits_refunded?: number;
  net_credits_used?: number;
  credits_used?: number;
  retry_count?: number;
  started_at?: string | null;
  completed_at?: string | null;
  created_at?: string;
  error_code?: string | null;
  error_message?: string | null;
  error_details?: string;
  provider_used?: string;
  failed_sections?: string[];
  user_email?: string;
  operational_state?: GenerationOperationalState;
  age_seconds?: number;
}

export interface Payment {
  id: string;
  user_id: string;
  status: string;
  amount: number;
  refund_amount?: number;
  is_refunded?: boolean;
  gateway?: string;
  created_at: string;
  user_email?: string;
}

export interface AuditLog {
  id: string;
  admin_id: string;
  target_user_id?: string | null;
  action: string;
  reason?: string;
  entity_type?: string;
  entity_id?: string | null;
  before_data?: Record<string, unknown> | null;
  after_data?: Record<string, unknown> | null;
  metadata?: Record<string, unknown> | null;
  created_at: string;
  admin_email?: string;
  target_user_email?: string | null;
}

export interface DailyStats {
  date: string;
  completed: number;
  failed: number;
  credits_used: number;
}

export interface ProviderStats {
  provider: string;
  success_rate: number;
  failures: number;
  completed: number;
  total_requests: number;
  retry_count?: number;
  recent_errors?: string[];
  status?: string;
}

export interface SystemHealth {
  database_status: string;
  storage_status: string;
  pending_generations: number;
  maintenance_mode?: boolean;
  last_checked: string;
}

export interface SystemSetting {
  key?: string;
  setting_key?: string;
  value?: string | number | boolean | Record<string, unknown>;
  setting_value?: string | number | boolean | Record<string, unknown>;
  description?: string;
  updated_at?: string;
  updated_by?: string;
}

// API functions with fallback safety
export const adminApi = {
  checkAdminStatus: async (): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) return false;

      const { data, error } = await supabase.rpc('is_admin');
      if (!error && data !== null && data !== undefined) {
        return Boolean(data);
      }

      return false;
    } catch (err) {
      console.error('Error checking admin status:', err);
      return false;
    }
  },

  getOverviewStats: async (): Promise<AdminStats> => {
    try {
      let { data, error } = await supabase.rpc('admin_dashboard_snapshot');
      // Keep the dashboard usable while older deployments refresh their RPC/schema cache.
      // The fallback remains protected by the existing admin RPC authorization.
      if (error) {
        const fallback = await supabase.rpc('admin_dashboard_stats');
        data = fallback.data;
        error = fallback.error;
      }
      if (error) throw error;
      const snapshot: Partial<AdminStats> & { users?: number; generations?: number; payments?: number; completed_payments?: number } = unwrapObject<AdminStats & { users?: number; generations?: number; payments?: number; completed_payments?: number }>(data) || {};
      return {
        total_users: snapshot.total_users ?? snapshot.users ?? 0,
        banned_users: snapshot.banned_users ?? 0,
        total_generations: snapshot.total_generations ?? snapshot.generations ?? 0,
        pending_generations: snapshot.pending_generations ?? 0,
        completed_generations: snapshot.completed_generations ?? 0,
        failed_generations: snapshot.failed_generations ?? 0,
        total_payments: snapshot.total_payments ?? snapshot.payments ?? 0,
        completed_payments: snapshot.completed_payments ?? 0,
        credits_issued: snapshot.credits_issued ?? 0,
        credits_consumed: snapshot.credits_consumed ?? 0,
      };
    } catch (err: any) {
      console.error('getOverviewStats error:', err);
      throw err;
    }
  },

  getUsersPage: async (search = '', page = 1, pageSize = 25): Promise<PaginatedResult<User>> => {
    const { data, error } = await supabase.rpc('admin_get_users_page', { p_search: search || null, p_page: page, p_page_size: pageSize });
    if (error) throw error;
    return unwrapPage<User>(data);
  },

  getUsers: async (search: string = ''): Promise<User[]> => {
    try {
      const { data, error } = await supabase.rpc('admin_get_users', {
        p_search: search || null,
        p_limit: 100,
        p_offset: 0,
      });
      if (error) throw error;
      return unwrapRows<User>(data);
    } catch (err: any) {
      console.error('getUsers error:', err);
      throw err;
    }
  },

  getUserDetails: async (userId: string): Promise<UserDetails> => {
    try {
      const { data, error } = await supabase.rpc('admin_get_user_details', { p_user_id: userId });
      if (error) throw error;
      return data;
    } catch (err: any) {
      console.error('getUserDetails error:', err);
      throw err;
    }
  },

  addCredits: async (userId: string, amount: number, reason: string): Promise<void> => {
    const description = requireReason(reason, 'add credits');
    const { error } = await supabase.rpc('admin_add_credits', { p_user_id: userId, p_amount: requirePositiveInteger(amount, 'Credit amount'), p_description: description });
    if (error) throw error;
  },

  removeCredits: async (userId: string, amount: number, reason: string): Promise<void> => {
    const description = requireReason(reason, 'remove credits');
    const { error } = await supabase.rpc('admin_remove_credits', { p_user_id: userId, p_amount: requirePositiveInteger(amount, 'Credit amount'), p_description: description });
    if (error) throw error;
  },

  setCredits: async (userId: string, amount: number, reason: string): Promise<void> => {
    const description = requireReason(reason, 'adjust the balance');
    if (!Number.isInteger(amount) || amount < 0) throw new Error('Credit balance must be a non-negative whole number');
    const { error } = await supabase.rpc('admin_set_credits', { p_user_id: userId, p_amount: amount, p_description: description });
    if (error) throw error;
  },

  banUser: async (userId: string, reason: string): Promise<void> => {
    const p_reason = requireReason(reason, 'ban a user');
    const { error } = await supabase.rpc('admin_ban_user', { p_user_id: userId, p_reason });
    if (error) throw error;
  },

  unbanUser: async (userId: string, reason: string): Promise<void> => {
    requireReason(reason, 'unban a user');
    const { error } = await supabase.rpc('admin_unban_user', { p_user_id: userId });
    if (error) throw error;
  },

  getCreditHistory: async (): Promise<CreditTransaction[]> => {
    try {
      const { data, error } = await supabase.rpc('admin_get_credit_history');
      if (error) throw error;
      return unwrapRows<CreditTransaction>(data);
    } catch (err: any) {
      console.error('getCreditHistory error:', err);
      throw err;
    }
  },

  getCreditHistoryPage: async (search = '', page = 1, pageSize = 25): Promise<PaginatedResult<CreditTransaction>> => {
    const { data, error } = await supabase.rpc('admin_get_credit_history_page', { p_search: search || null, p_page: page, p_page_size: pageSize });
    if (error) throw error;
    return unwrapPage<CreditTransaction>(data);
  },

  getGenerations: async (): Promise<Generation[]> => {
    try {
      const { data, error } = await supabase.rpc('admin_get_generations', {
        p_limit: 100,
        p_offset: 0,
      });
      if (error) throw error;
      return unwrapRows<Generation>(data);
    } catch (err: any) {
      console.error('getGenerations error:', err);
      throw err;
    }
  },

  getGenerationsPage: async (search = '', status: string | null = null, page = 1, pageSize = 25): Promise<PaginatedResult<Generation>> => {
    const { data, error } = await supabase.rpc('admin_get_generations_page', { p_search: search || null, p_status: status, p_page: page, p_page_size: pageSize, p_stuck_minutes: 15 });
    if (error) throw error;
    return unwrapPage<Generation>(data);
  },

  retryGeneration: async (generationId: string, reason?: string): Promise<void> => {
    requireReason(reason || '', 'retry a generation');
    const { error } = await supabase.rpc('admin_retry_generation', { 
      p_generation_id: generationId
    });
    if (error) throw error;
  },

  markGenerationFailed: async (generationId: string, reason?: string): Promise<void> => {
    const { error } = await supabase.rpc('admin_mark_generation_failed', { 
      p_generation_id: generationId,
      p_error_code: 'MANUAL_FAILURE',
      p_error_message: reason || 'Marked failed by administrator'
    });
    if (error) throw error;
  },

  getPayments: async (): Promise<Payment[]> => {
    try {
      const { data, error } = await supabase.rpc('admin_get_payments');
      if (error) throw error;
      return unwrapRows<Payment>(data);
    } catch (err: any) {
      console.error('getPayments error:', err);
      throw err;
    }
  },

  verifyPayment: async (paymentId: string, reason?: string): Promise<void> => {
    const { error } = await supabase.rpc('admin_verify_payment', { p_payment_id: paymentId });
    if (error) throw error;
  },

  refundPayment: async (paymentId: string, reason?: string): Promise<void> => {
    const { error } = await supabase.rpc('admin_refund_payment', { p_payment_id: paymentId, p_refund_amount: 0, p_reason: reason || 'Refunded by admin' });
    if (error) throw error;
  },

  resyncPayment: async (paymentId: string, reason?: string): Promise<void> => {
    const { error } = await supabase.rpc('admin_resync_payment', { p_payment_id: paymentId });
    if (error) throw error;
  },

  getAuditLogs: async (): Promise<AuditLog[]> => {
    try {
      const { data, error } = await supabase.rpc('admin_get_audit_logs');
      if (error) throw error;
      return unwrapRows<AuditLog>(data);
    } catch (err: any) {
      console.error('getAuditLogs error:', err);
      throw err;
    }
  },

  getAuditLogsPage: async (search = '', action: string | null = null, page = 1, pageSize = 25): Promise<PaginatedResult<AuditLog>> => {
    const { data, error } = await supabase.rpc('admin_get_audit_logs_page', { p_search: search || null, p_action: action, p_page: page, p_page_size: pageSize });
    if (error) throw error;
    return unwrapPage<AuditLog>(data);
  },

  getDailyStats: async (): Promise<DailyStats[]> => {
    try {
      const { data, error } = await supabase.rpc('daily_generation_stats');
      if (error) throw error;
      return unwrapRows<DailyStats>(data);
    } catch (err: any) {
      console.error('getDailyStats error:', err);
      return [];
    }
  },

  getProviderStats: async (): Promise<ProviderStats[]> => {
    try {
      const { data, error } = await supabase.rpc('provider_statistics');
      if (error) throw error;
      return unwrapRows<ProviderStats>(data);
    } catch (err: any) {
      console.error('getProviderStats error:', err);
      return [];
    }
  },

  getProviderHealth: async (): Promise<any> => {
    try {
      const { data, error } = await supabase.rpc('provider_health');
      if (error) throw error;
      return data;
    } catch (err: any) {
      console.error('getProviderHealth error:', err);
      return null;
    }
  },

  getSystemHealth: async (): Promise<SystemHealth> => {
    try {
      const { data, error } = await supabase.rpc('system_health');
      if (error) throw error;
      return unwrapObject<SystemHealth>(data) || {
        database_status: 'unknown',
        storage_status: 'unknown',
        pending_generations: 0,
        last_checked: new Date().toISOString()
      };
    } catch (err: any) {
      console.error('getSystemHealth error:', err);
      return {
        database_status: 'unknown',
        storage_status: 'unknown',
        pending_generations: 0,
        last_checked: new Date().toISOString()
      };
    }
  },

  getSetting: async (key: string): Promise<any> => {
    try {
      const { data, error } = await supabase.rpc('get_setting', { p_key: key });
      if (error) throw error;
      return data;
    } catch (err: any) {
      console.error(`getSetting(${key}) error:`, err);
      return null;
    }
  },

  getSettings: async (): Promise<SystemSetting[]> => {
    const keys = ['generation_price', 'signup_credits', 'retry_limit', 'maintenance_mode', 'export_expiry'];
    try {
      const results = await Promise.all(
        keys.map(async (key) => {
          const { data } = await supabase.rpc('get_setting', { p_key: key });
          return { key, value: data };
        })
      );
      return results;
    } catch (err: any) {
      console.error('getSettings error:', err);
      return [];
    }
  },

  updateSetting: async (key: string, value: any): Promise<void> => {
    if (!ADMIN_SETTING_KEYS.has(key)) throw new Error('This setting is not editable from the admin console');
    if (key === 'maintenance_mode' && typeof value !== 'boolean') throw new Error('Maintenance mode must be true or false');
    if (key !== 'maintenance_mode' && (!Number.isInteger(Number(value)) || Number(value) < 0)) {
      throw new Error('Numeric settings must be non-negative whole numbers');
    }
    const { error } = await supabase.rpc('update_setting', {
      p_key: key,
      p_value: key === 'maintenance_mode' ? Boolean(value) : Number(value),
    });
    if (error) throw error;
  },

  getSettingHistory: async (key: string | null = null, page = 1, pageSize = 25): Promise<PaginatedResult<Record<string, unknown>>> => {
    const { data, error } = await supabase.rpc('admin_get_setting_history', { p_key: key, p_page: page, p_page_size: pageSize });
    if (error) throw error;
    return unwrapPage<Record<string, unknown>>(data);
  },

  restoreSetting: async (historyId: string, reason: string): Promise<void> => {
    const p_reason = requireReason(reason, 'restore a setting');
    const { error } = await supabase.rpc('admin_restore_setting', { p_history_id: historyId, p_reason });
    if (error) throw error;
  }
};
