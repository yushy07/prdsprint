import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export function ErrorState({ title, message, onRetry }: { title: string, message: string, onRetry?: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center p-6 sm:p-8 bg-red-500/5 border border-red-500/20 rounded-2xl"
    >
      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
        <AlertCircle size={32} className="text-red-400" />
      </div>
      <h4 className="text-xl font-display font-bold text-white mb-2 tracking-[-0.01em]">
        {title}
      </h4>
      <p className="text-[15px] text-gray-400 mb-8 max-w-sm">
        {message}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-6 py-3 rounded-xl font-bold text-[14px] bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors duration-300"
        >
          Try Again
        </button>
      )}
    </motion.div>
  );
}
