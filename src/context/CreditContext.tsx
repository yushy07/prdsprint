import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { PlanType, PLAN_LIMITS } from '@/lib/credits.config';
import { supabase } from '@/lib/supabase';

export interface CreditHistoryItem {
  id: string;
  type: 'deduction' | 'addition' | 'refund';
  amount: number;
  description: string;
  date: string;
  status?: 'success' | 'failed';
}

interface CreditState {
  currentPlan: PlanType;
  totalCredits: number;
  remainingCredits: number;
  creditsUsed: number;
  lifetimeCreditsEarned: number;
  lifetimePRDsGenerated: number;
  androidUnlocked: boolean;
  history: CreditHistoryItem[];
  isAdmin: boolean;
  
  // Actions
  refreshCredits: () => Promise<void>;
  refreshAdminStatus: () => Promise<void>;
  updateBalance: (balance: number) => void;
}

const defaultHistory: CreditHistoryItem[] = [
  {
    id: '1',
    type: 'addition',
    amount: 50,
    description: 'Welcome Bonus',
    date: new Date().toISOString(),
    status: 'success'
  }
];

const initialState: Omit<CreditState, 'refreshCredits' | 'refreshAdminStatus' | 'updateBalance'> = {
  currentPlan: 'free',
  totalCredits: PLAN_LIMITS.free.credits,
  remainingCredits: PLAN_LIMITS.free.credits,
  creditsUsed: 0,
  lifetimeCreditsEarned: PLAN_LIMITS.free.credits,
  lifetimePRDsGenerated: 0,
  androidUnlocked: PLAN_LIMITS.free.androidUnlocked,
  history: defaultHistory,
  isAdmin: false,
};

const CreditContext = createContext<CreditState | undefined>(undefined);

export function CreditProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialState);

  const refreshCredits = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('users')
        .select('credits_balance, plan_tier')
        .eq('id', session.user.id)
        .maybeSingle();

      if (!error && data) {
        setState(prev => {
          const fetchedCredits = data.credits_balance ?? prev.remainingCredits;
          const fetchedPlan = (data.plan_tier as PlanType) || prev.currentPlan;
          return {
            ...prev,
            remainingCredits: fetchedCredits,
            currentPlan: fetchedPlan,
            androidUnlocked: PLAN_LIMITS[fetchedPlan]?.androidUnlocked ?? prev.androidUnlocked
          };
        });
      }
    } catch (err) {
      console.error('Failed to refresh user credits from Supabase:', err);
    }
  }, []);

  const refreshAdminStatus = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setState(prev => ({ ...prev, isAdmin: false }));
        return;
      }

      const { data, error } = await supabase.rpc('is_admin', { user_id: session.user.id });
      if (!error && data !== null && data !== undefined) {
        setState(prev => ({ ...prev, isAdmin: Boolean(data) }));
      } else {
        setState(prev => ({ ...prev, isAdmin: false }));
      }
    } catch (err) {
      console.error('Failed to refresh admin status:', err);
      setState(prev => ({ ...prev, isAdmin: false }));
    }
  }, []);

  const updateBalance = useCallback((balance: number) => {
    setState(prev => ({
      ...prev,
      remainingCredits: balance
    }));
  }, []);

  useEffect(() => {
    refreshCredits();
    refreshAdminStatus();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        refreshCredits();
        refreshAdminStatus();
      } else {
        setState(prev => ({ ...prev, isAdmin: false }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [refreshCredits, refreshAdminStatus]);

  const value = useMemo(() => ({
    ...state,
    refreshCredits,
    refreshAdminStatus,
    updateBalance
  }), [state, refreshCredits, refreshAdminStatus, updateBalance]);

  return (
    <CreditContext.Provider value={value}>
      {children}
    </CreditContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
}
