import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X, Zap } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, "id">) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(({ type, title, message, duration = 4000 }: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { id, type, title, message, duration };

    setToasts((prev) => [...prev.slice(-4), newToast]); // Keep up to 5 toasts at a time

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const success = useCallback((message: string, title?: string) => {
    showToast({ type: "success", title, message });
  }, [showToast]);

  const error = useCallback((message: string, title?: string) => {
    showToast({ type: "error", title, message });
  }, [showToast]);

  const warning = useCallback((message: string, title?: string) => {
    showToast({ type: "warning", title, message });
  }, [showToast]);

  const info = useCallback((message: string, title?: string) => {
    showToast({ type: "info", title, message });
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info, removeToast }}>
      {children}
      
      {/* Unified Floating Toast Container */}
      <div className="fixed top-20 right-4 sm:right-6 z-[9999] flex flex-col gap-3 max-w-md w-[calc(100%-2rem)] sm:w-[400px] pointer-events-none">
        <AnimatePresence mode="sync">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`pointer-events-auto w-full p-4 rounded-2xl border backdrop-blur-2xl shadow-2xl flex items-start gap-3.5 ${
                toast.type === "success"
                  ? "bg-[#081711]/95 border-emerald-500/40 text-emerald-300 shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
                  : toast.type === "error"
                  ? "bg-[#180b0e]/95 border-red-500/40 text-red-300 shadow-[0_10px_30px_rgba(239,68,68,0.2)]"
                  : toast.type === "warning"
                  ? "bg-[#1a1308]/95 border-amber-500/40 text-amber-300 shadow-[0_10px_30px_rgba(245,158,11,0.2)]"
                  : "bg-[#0b1220]/95 border-blue-500/40 text-blue-300 shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${
                toast.type === "success" 
                  ? "bg-emerald-500/20 text-emerald-400" 
                  : toast.type === "error" 
                  ? "bg-red-500/20 text-red-400" 
                  : toast.type === "warning" 
                  ? "bg-amber-500/20 text-amber-400" 
                  : "bg-blue-500/20 text-blue-400"
              }`}>
                {toast.type === "success" && <CheckCircle2 className="w-5 h-5" />}
                {toast.type === "error" && <XCircle className="w-5 h-5" />}
                {toast.type === "warning" && <AlertTriangle className="w-5 h-5" />}
                {toast.type === "info" && <Info className="w-5 h-5" />}
              </div>

              <div className="flex-1 pr-1 min-w-0">
                {toast.title && (
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-0.5 flex items-center gap-1.5 truncate">
                    {toast.title}
                    {toast.type === "success" && <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  </h4>
                )}
                <p className="text-xs font-medium text-slate-200 leading-relaxed break-words">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 mt-0.5"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
