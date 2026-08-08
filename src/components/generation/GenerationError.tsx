import { motion } from "motion/react";
import { AlertCircle, RefreshCw, CreditCard, ShieldAlert } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface GenerationErrorProps {
  errorMessage: string;
  errorCode?: string;
  creditsRefunded?: number;
  remainingBalance?: number;
  onRetry: () => void;
  onSignIn?: () => void;
}

export function GenerationError({ errorMessage, errorCode, creditsRefunded, remainingBalance, onRetry, onSignIn }: GenerationErrorProps) {
  const navigate = useNavigate();

  const isInsufficientCredits = errorCode === 'INSUFFICIENT_CREDITS' || errorMessage.includes('Insufficient credits');
  const isAuthRequired = errorCode === 'AUTH_REQUIRED' || errorCode === 'AUTHENTICATION_REQUIRED' || errorMessage.toLowerCase().includes('sign in') || errorMessage.toLowerCase().includes('authentication required');
  const isForbidden = errorCode === 'FORBIDDEN' || errorMessage.includes('Access denied');

  const handleSignInClick = async () => {
    if (onSignIn) {
      onSignIn();
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/builder?auth=success`,
      },
    });
  };

  return (
    <motion.div
      key="error-phase"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-md mx-auto p-6 rounded-2xl bg-red-950/30 border border-red-500/30 backdrop-blur-xl flex flex-col items-center text-center shadow-2xl"
    >
      <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
        {isInsufficientCredits ? (
          <CreditCard className="w-7 h-7 text-amber-400" />
        ) : isForbidden ? (
          <ShieldAlert className="w-7 h-7 text-red-400" />
        ) : (
          <AlertCircle className="w-7 h-7" />
        )}
      </div>

      <h2 className="text-xl font-bold text-white mb-2">
        {isInsufficientCredits
          ? "Insufficient Credits"
          : isAuthRequired
          ? "Sign In Required"
          : isForbidden
          ? "Access Denied"
          : "Generation Failed"}
      </h2>

      <p className="text-slate-300 text-xs sm:text-sm mb-4 leading-relaxed">
        {errorMessage || "We encountered an issue generating your Product Requirements Document."}
      </p>

      {(creditsRefunded !== undefined && creditsRefunded > 0) || remainingBalance !== undefined ? (
        <div className="mb-4 w-full p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-medium space-y-1">
          {creditsRefunded !== undefined && creditsRefunded > 0 && (
            <p>Note: {creditsRefunded} credits were refunded back to your account.</p>
          )}
          {remainingBalance !== undefined && (
            <p className="text-emerald-200/90 font-semibold">Updated Balance: {remainingBalance} Credits</p>
          )}
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row w-full gap-3 justify-center mt-2">
        {isInsufficientCredits ? (
          <button
            onClick={() => navigate('/pricing')}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Upgrade Plan</span>
          </button>
        ) : isAuthRequired ? (
          <button
            onClick={handleSignInClick}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0">
              <FcGoogle size={14} />
            </div>
            <span>Sign in with Google</span>
          </button>
        ) : (
          <button
            onClick={onRetry}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}

        <button
          onClick={() => navigate('/')}
          className="py-2.5 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Back to Home</span>
        </button>
      </div>
    </motion.div>
  );
}
