import { Send, Loader2, Check } from "lucide-react";

interface SubmitButtonProps {
  status: 'idle' | 'submitting' | 'success' | 'error' | 'rate-limit' | 'unauthorized';
  disabled: boolean;
  onClick: () => void;
}

export function SubmitButton({ status, disabled, onClick }: SubmitButtonProps) {
  if (status === 'success') {
    return (
      <button 
        disabled
        className="h-14 px-8 w-full sm:w-auto min-w-[160px] rounded-xl font-bold text-[15px] bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center gap-2 transition-all duration-300"
      >
        <Check size={18} />
        <span>Sent</span>
      </button>
    );
  }

  return (
    <button 
      type="submit"
      disabled={disabled || status === 'submitting'}
      className="h-14 px-8 w-full sm:w-auto min-w-[160px] rounded-xl font-bold text-[15px] bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_4px_15px_rgba(6,182,212,0.3)] hover:shadow-[0_6px_20px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
    >
      {status === 'submitting' ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <span>Send Question</span>
          <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </>
      )}
    </button>
  );
}
