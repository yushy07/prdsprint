import { HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AuthPrompt } from "./AuthPrompt";
import { UserInfo } from "./UserInfo";
import { SupportForm } from "./SupportForm";
import { SuccessState } from "./SuccessState";
import { ErrorState } from "./ErrorState";
import { useSupportForm } from "./hooks/useSupportForm";

export function SupportCard() {
  const { 
    user, 
    authLoading, 
    message, 
    setMessage, 
    status, 
    errorMsg, 
    signInWithGoogle, 
    submit, 
    resetForm 
  } = useSupportForm();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full max-w-[700px] mx-auto rounded-2xl sm:rounded-[28px] lg:rounded-[32px] p-5 sm:p-8 lg:p-10 bg-[#0A0A0C]/60 backdrop-blur-xl border border-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.4)] overflow-hidden group"
    >
      {/* Panel Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-purple-500/[0.03] pointer-events-none" />
      <motion.div 
        className="absolute -inset-1/2 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(6,182,212,0.1),transparent,rgba(168,85,247,0.1),transparent)] opacity-30 pointer-events-none blur-3xl group-hover:opacity-60 transition-opacity duration-1000"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:border-cyan-500/30 transition-colors duration-500">
          <HelpCircle size={24} className="text-cyan-400" />
        </div>
        
        {!user && !authLoading && status !== 'success' && status !== 'rate-limit' ? (
          <>
            <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-[-0.01em]" style={{ wordSpacing: '0.05em' }}>
              Still have a question?
            </h3>
            <div className="w-full relative min-h-[200px]">
              <AuthPrompt onSignIn={signInWithGoogle} />
            </div>
          </>
        ) : (
          <>
            {status !== 'success' && status !== 'rate-limit' && (
              <>
                <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-[-0.01em]" style={{ wordSpacing: '0.05em' }}>
                  Still need help?
                </h3>
                <p className="text-[14px] text-gray-400 mb-8 max-w-md">
                  Couldn't find what you were looking for? Send us a message and we'll reply directly to your email.
                </p>
              </>
            )}
            <div className="w-full relative min-h-[250px]">
              <AnimatePresence mode="wait">
                {authLoading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center justify-center h-full min-h-[200px]"
                  >
                    <div className="w-6 h-6 border-2 border-cyan-500/50 border-t-cyan-400 rounded-full animate-spin" />
                  </motion.div>
                ) : status === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <SuccessState onReset={resetForm} />
                  </motion.div>
                ) : status === 'rate-limit' ? (
                  <motion.div key="rate-limit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <ErrorState 
                      title="Daily limit reached" 
                      message={errorMsg} 
                      onRetry={resetForm} 
                    />
                  </motion.div>
                ) : status === 'unauthorized' ? (
                  <motion.div key="unauthorized" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <AuthPrompt onSignIn={signInWithGoogle} />
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full flex flex-col">
                    <UserInfo user={user} />
                    <SupportForm 
                      message={message} 
                      setMessage={setMessage} 
                      status={status} 
                      errorMsg={errorMsg} 
                      onSubmit={submit} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
