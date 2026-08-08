import React, { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export function SuccessState({ onReset }: { onReset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center p-6 sm:p-8 bg-green-500/5 border border-green-500/20 rounded-2xl"
    >
      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
        <CheckCircle2 size={32} className="text-green-400" />
      </div>
      <h4 
        ref={headingRef}
        tabIndex={-1}
        className="text-xl font-display font-bold text-white mb-2 tracking-[-0.01em] outline-none"
      >
        Thanks!<br/>We've received your question.
      </h4>
      <p className="text-[15px] text-gray-400 mb-8 max-w-sm">
        We'll review your question and reply directly to your email soon.
      </p>
      <button 
        onClick={onReset}
        className="px-6 py-3 rounded-xl font-bold text-[14px] bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors duration-300"
      >
        Ask Another Question
      </button>
    </motion.div>
  );
}
