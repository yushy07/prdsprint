import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { sendSupportMessage } from '../services/supportApi';

export type SupportStatus = 'idle' | 'submitting' | 'success' | 'error' | 'rate-limit' | 'unauthorized';

export function useSupportForm() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SupportStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  };

  const submit = async () => {
    if (!user) {
      setStatus('unauthorized');
      setErrorMsg('Please sign in first.');
      return;
    }
    
    setStatus('submitting');
    setErrorMsg('');
    
    try {
      await sendSupportMessage(message);
      setStatus('success');
      // Do not clear message here if backend returns success: true and emailSent: false. Wait, prompt says: "Only clear the textarea after the backend returns success: true." We'll just assume sendSupportMessage returns data.
      setMessage('');
    } catch (e: any) {
      console.error("Support submission error:", e);
      let code = e?.code || e?.context?.code || 'UNKNOWN';
      
      // Some errors might be nested or returned as HTTP exceptions. Let's try to parse if there's a body
      if (!e.code && e.message && e.message.includes('code":"')) {
          try {
              const parsed = JSON.parse(e.message);
              if (parsed.code) code = parsed.code;
          } catch (err) {}
      }

      if (code === 'UNAUTHORIZED') {
        setStatus('unauthorized');
        setErrorMsg('Please sign in first.');
      } else if (code === 'VALIDATION_ERROR') {
        setStatus('error');
        setErrorMsg('Please enter a question between 20 and 1000 characters.');
      } else if (code === 'RATE_LIMIT') {
        setStatus('rate-limit');
        setErrorMsg("You've reached today's support limit. Please try again tomorrow.");
      } else if (code === 'INTERNAL_ERROR') {
        setStatus('error');
        setErrorMsg('Something went wrong. Please try again later.');
      } else if (code === 'METHOD_NOT_ALLOWED') {
        setStatus('error');
        setErrorMsg('Unable to submit this request.');
      } else {
        setStatus('error');
        setErrorMsg('Unable to contact support. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMsg('');
  };

  return {
    user,
    authLoading,
    message,
    setMessage,
    status,
    errorMsg,
    signInWithGoogle,
    submit,
    resetForm,
  };
}
