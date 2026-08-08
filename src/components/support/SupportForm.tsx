import React, { useRef, useEffect } from "react";
import { SubmitButton } from "./SubmitButton";
import { CharacterCounter } from "./CharacterCounter";
import { useSupportValidation } from "./hooks/useSupportValidation";
import { SupportStatus } from "./hooks/useSupportForm";

interface SupportFormProps {
  message: string;
  setMessage: (msg: string) => void;
  status: SupportStatus;
  errorMsg: string;
  onSubmit: () => void;
}

export function SupportForm({ message, setMessage, status, errorMsg, onSubmit }: SupportFormProps) {
  const { isValid, isNearLimit, isExceeded, maxLength, currentLength } = useSupportValidation(message);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize setup if needed
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 300)}px`;
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Auto resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 300)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      if (isValid && status !== 'submitting' && status !== 'success') {
        onSubmit();
      }
    }
  };

  return (
    <form className="w-full flex flex-col gap-3 text-left" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <label htmlFor="support-message" className="text-white font-bold text-[15px] mb-1">
        How can we help?
      </label>
      <div className="relative group/input">
        <textarea 
          id="support-message"
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={status === 'submitting'}
          rows={6}
          aria-invalid={!isValid && message.length > 0}
          aria-describedby="support-error support-counter"
          placeholder={`Describe your question in as much detail as possible...\n\nExample:\nI'm unable to export my PRD after generation.`}
          className={`w-full bg-[#12121A] border rounded-xl p-5 text-[15px] text-white min-h-[140px] placeholder-gray-500 focus:outline-none focus:ring-1 transition-all resize-none peer disabled:opacity-50 ${!isValid && message.length > 0 ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50' : 'border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/50'}`}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 peer-focus:opacity-100 blur-md -z-10 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex-1" id="support-error" aria-live="polite">
          {errorMsg && status !== 'rate-limit' && status !== 'unauthorized' && (
            <div className="text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-1">
              {errorMsg}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
          <div id="support-counter">
            <CharacterCounter 
              current={currentLength} 
              max={maxLength} 
              isNearLimit={isNearLimit} 
              isExceeded={isExceeded} 
            />
          </div>
          <SubmitButton 
            status={status} 
            disabled={!isValid} 
            onClick={() => {}}
          />
        </div>
      </div>
    </form>
  );
}
