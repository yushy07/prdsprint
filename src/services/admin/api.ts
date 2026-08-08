import { supabase } from '@/lib/supabase';

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
}

// API functions with fallback safety
export const adminApi = {
  checkAdminStatus: async (): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) return false;

      const { data, error } = await supabase.rpc('is_admin', { user_id: session.user.id });
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
      const { data, error } = await supabase.rpc('admin_dashboard_stats');
      if (error) throw error;
      return {
        total_users: data?.total_users ?? 0,
        banned_users: data?.banned_users ?? 0,
        total_generations: data?.total_generations ?? 0,
        pending_generations: data?.pending_generations ?? 0,
        completed_generations: data?.completed_generations ?? 0,
        failed_generations: data?.failed_generations ?? 0,
        total_payments: data?.total_payments ?? 0,
        completed_payments: data?.completed_payments ?? 0,
        credits_issued: data?.credits_issued ?? 0,
        credits_consumed: data?.credits_consumed ?? 0,
      };
    } catch (err: any) {
      console.error('getOverviewStats error:', err);
      throw err;
    }
  },

  getUsers: async (search: string = ''): Promise<User[]> => {
    try {
      const { data, error } = await supabase.rpc('admin_get_users', {
        p_search: search || null,
        p_limit: 100,
        p_offset: 0,
      });
      if (error) throw error;
      return data || [];
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
    if (!reason || !reason.trim()) throw new Error('A reason is required to add credits');
    const { error } = await supabase.rpc('admin_add_credits', { p_user_id: userId, p_amount: amount, p_description: reason });
    if (error) throw error;
  },

  removeCredits: async (userId: string, amount: number, reason: string): Promise<void> => {
    if (!reason || !reason.trim()) throw new Error('A reason is required to remove credits');
    const { error } = await supabase.rpc('admin_remove_credits', { p_user_id: userId, p_amount: amount, p_description: reason });
    if (error) throw error;
  },

  setCredits: async (userId: string, amount: number, reason: string): Promise<void> => {
    if (!reason || !reason.trim()) throw new Error('A reason is required to adjust balance');
    const { error } = await supabase.rpc('admin_set_credits', { p_user_id: userId, p_amount: amount, p_description: reason });
    if (error) throw error;
  },

  banUser: async (userId: string, reason: string): Promise<void> => {
    if (!reason || !reason.trim()) throw new Error('A reason is required to ban a user');
    const { error } = await supabase.rpc('admin_ban_user', { p_user_id: userId, p_reason: reason });
    if (error) throw error;
  },

  unbanUser: async (userId: string, reason: string): Promise<void> => {
    if (!reason || !reason.trim()) throw new Error('A reason is required to unban a user');
    const { error } = await supabase.rpc('admin_unban_user', { p_user_id: userId });
    if (error) throw error;
  },

  getCreditHistory: async (): Promise<CreditTransaction[]> => {
    try {
      const { data, error } = await supabase.rpc('admin_get_credit_history');
      if (error) throw error;
      return data || [];
    } catch (err: any) {
      console.error('getCreditHistory error:', err);
      throw err;
    }
  },

  getGenerations: async (): Promise<Generation[]> => {
    try {
      const { data, error } = await supabase.rpc('admin_get_generations', {
        p_limit: 100,
        p_offset: 0,
      });
      if (error) throw error;
      return data || [];
    } catch (err: any) {
      console.error('getGenerations error:', err);
      throw err;
    }
  },

  retryGeneration: async (generationId: string, reason?: string): Promise<void> => {
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
      return data || [];
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
      return data || [];
    } catch (err: any) {
      console.error('getAuditLogs error:', err);
      throw err;
    }
  },

  getDailyStats: async (): Promise<DailyStats[]> => {
    try {
      const { data, error } = await supabase.rpc('daily_generation_stats');
      if (error) throw error;
      return data || [];
    } catch (err: any) {
      console.error('getDailyStats error:', err);
      return [];
    }
  },

  getProviderStats: async (): Promise<ProviderStats[]> => {
    try {
      const { data, error } = await supabase.rpc('provider_statistics');
      if (error) throw error;
      return data || [];
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
      return data || {
        database_status: 'healthy',
        storage_status: 'healthy',
        pending_generations: 0,
        last_checked: new Date().toISOString()
      };
    } catch (err: any) {
      console.error('getSystemHealth error:', err);
      return {
        database_status: 'degraded',
        storage_status: 'degraded',
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
    const { error } = await supabase.rpc('update_setting', {
      p_key: key,
      p_value: value,
    });
    if (error) throw error;
  }
};
