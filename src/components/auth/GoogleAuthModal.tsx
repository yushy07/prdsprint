import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, Sparkles, LogIn } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { supabase } from '@/lib/supabase';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  redirectPath?: string;
  onSuccess?: () => void;
}

export function GoogleAuthModal({
  isOpen,
  onClose,
  title = "Authentication Required",
  message = "Sign in with Google to generate your PRD",
  redirectPath = "/builder?auth=success",
  onSuccess,
}: GoogleAuthModalProps) {
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      const redirectToUrl = `${window.location.origin}${redirectPath}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectToUrl,
        }
      });
      if (error) {
        console.error('Google Auth Error:', error);
        setIsSigningIn(false);
      } else if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Google Auth Exception:', err);
      setIsSigningIn(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#090C14] border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] rounded-2xl p-6 sm:p-8 text-center overflow-hidden my-auto z-10"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Icon Header */}
            <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-5 shadow-inner">
              <FcGoogle size={32} />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-blue-600 text-white shadow-md">
                <Sparkles size={12} />
              </div>
            </div>

            {/* Title & Message */}
            <h3 className="text-xl font-bold text-white tracking-tight mb-2">
              {title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {message}
            </p>

            {/* Google Sign-In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                <FcGoogle size={18} />
              </div>
              <span>{isSigningIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
            </button>

            {/* Footer Notice */}
            <p className="text-xs text-slate-500 mt-4">
              Sign in securely using your Google account to access PRD generation.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
