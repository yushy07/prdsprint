import { motion } from "motion/react";
import { CheckCircle2, Sparkles, PackageCheck, Download, FileCheck, Check, RotateCcw, ArrowRight, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GenerationSuccessProps {
  handleDownload: () => Promise<void>;
  downloadNotice: boolean;
  showHomeButton: boolean;
  isPartial?: boolean;
  completedSections?: string[];
  failedSections?: string[];
  errors?: Record<string, { reason: string }>;
  isAdmin?: boolean;
  creditsCharged?: number;
  creditsRefunded?: number;
  netCreditsUsed?: number;
  remainingBalance?: number;
  downloadUrl?: string | null;
  exportInfo?: any;
  providers?: Record<string, string>;
}

export function GenerationSuccess({
  handleDownload,
  downloadNotice,
  showHomeButton,
  isPartial,
  completedSections,
  failedSections,
  errors,
  isAdmin,
  creditsCharged,
  creditsRefunded,
  netCreditsUsed,
  remainingBalance,
  downloadUrl,
  exportInfo,
  providers,
}: GenerationSuccessProps) {
  const navigate = useNavigate();

  const isFree = Boolean(isAdmin || creditsCharged === 0);
  const hasRefund = (creditsRefunded ?? 0) > 0;

  return (
    <motion.div
      key="completion-phase"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full flex flex-col items-center"
    >
      {/* Free / Admin Generation Badge */}
      {isFree && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 w-full max-w-sm rounded-xl p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] text-center text-xs font-semibold flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Free Generation · 0 Credits Charged</span>
        </motion.div>
      )}

      {/* Partial Refund Notice (Only if refund > 0 from backend) */}
      {!isFree && hasRefund && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 w-full max-w-sm rounded-xl p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          <div className="flex items-start gap-2 text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
            <div>
              <p className="font-bold mb-1">Partial generation adjustment.</p>
              <p className="mb-1 text-emerald-300/80 text-xs">Some sections could not be generated.</p>
              <p className="text-emerald-300/80 leading-relaxed text-xs">
                Backend refund of <strong className="text-emerald-400">{creditsRefunded} credits</strong> has been credited to your account balance.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Credit Summary (Only if not free) */}
      {!isFree && creditsCharged !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 w-full max-w-sm rounded-xl p-4 bg-[#090A0F] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
        >
          <h3 className="text-xs font-bold text-white mb-3 flex items-center gap-2">
            <span>💳</span> Credit Summary
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Generation Cost</span>
              <span>{creditsCharged} Credits</span>
            </div>
            {hasRefund && (
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Partial Generation Refund</span>
                <span>+{creditsRefunded} Credits</span>
              </div>
            )}
            <div className="border-t border-white/10 pt-2 flex justify-between text-white font-bold">
              <span>Net Credits Used</span>
              <span>{netCreditsUsed ?? Math.max(0, creditsCharged - (creditsRefunded || 0))} Credits</span>
            </div>
            {remainingBalance !== undefined && (
              <div className="flex justify-between text-gray-400 pt-1">
                <span>Remaining Balance</span>
                <span className="text-gray-300 font-medium">{remainingBalance} Credits</span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Hero Success Icon & Ring */}
      <div className="relative mb-2 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/40 via-teal-500/30 to-cyan-500/40 blur-[40px] rounded-full animate-pulse" style={{ animationDuration: '4s' }} />

        <div className="relative w-20 sm:w-24 h-20 sm:h-24 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-emerald-500/20"
              strokeWidth="3"
              fill="transparent"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-[url(#success-gradient)]"
              strokeWidth="5"
              strokeDasharray="276"
              strokeDashoffset="0"
              strokeLinecap="round"
              fill="transparent"
              initial={{ strokeDashoffset: 276 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="success-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="absolute inset-2 rounded-full bg-[#071318] border border-emerald-500/40 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)]"
          >
            <CheckCircle2 className="w-9 sm:w-10 h-9 sm:h-10 text-emerald-400 stroke-[2.2]" />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1 -right-1 text-emerald-300"
          >
            <Sparkles className="w-5 h-5 drop-shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
          </motion.div>
        </div>
      </div>

      {/* Success Headline */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-1">
        Your PRD is{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
          Ready!
        </span>
      </h1>

      {/* Success Subtitle */}
      <p className="text-slate-300 text-xs sm:text-sm lg:text-base max-w-lg mx-auto leading-relaxed mb-2 sm:mb-3">
        Your Product Requirements Document has been successfully generated and your ZIP file is downloading automatically.
      </p>

      {/* Two Column Layout for Download Status & Generated Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full max-w-2xl mx-auto mb-2 sm:mb-3">
        {/* Download Status Card */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white/[0.03] border border-emerald-500/30 backdrop-blur-xl rounded-xl p-3.5 sm:p-4 text-left flex flex-col justify-between shadow-2xl shadow-emerald-950/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />

          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <PackageCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white">Download Started</h3>
                <p className="text-[10px] sm:text-[11px] text-emerald-400 font-medium">Automatic ZIP package</p>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed mb-3">
              Your ZIP package is downloading automatically. If the download doesn't begin within a few seconds, click below to download it again.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="w-full py-2 px-3.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group/btn cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            <span>Download Again</span>
          </button>

          {downloadNotice && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] sm:text-[11px] text-emerald-300 font-medium mt-1.5 text-center flex items-center justify-center gap-1"
            >
              <FileCheck className="w-3 h-3" />
              <span>Download triggered! Check your browser downloads.</span>
            </motion.div>
          )}
        </motion.div>

        {/* Success Summary Card */}
        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-xl p-3.5 sm:p-4 text-left shadow-2xl shadow-blue-950/20"
        >
          <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-200">
              Generated Package Summary
            </h3>
          </div>

          <ul className="space-y-2 text-[11px] sm:text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="p-0.5 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <div>
                <strong className="text-white">PRD Document</strong>
                <p className="text-[10px] text-slate-400">Specifications & stories</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="p-0.5 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <div>
                <strong className="text-white">Supporting Assets</strong>
                <p className="text-[10px] text-slate-400">Wireframe schemas & user flow maps</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="p-0.5 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <div>
                <strong className="text-white">Project Configuration</strong>
                <p className="text-[10px] text-slate-400">Target architecture & tech stack manifest</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="p-0.5 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <div>
                <strong className="text-white">Ready for Development</strong>
                <p className="text-[10px] text-slate-400">Actionable backlog & sprint structure</p>
              </div>
            </li>
          </ul>

          {isPartial && (
            <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded p-2.5 text-[10px] sm:text-[11px] text-amber-200/80">
              <div className="flex items-center gap-1.5 mb-2 text-amber-400 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Generated {completedSections?.length || 0} of {((completedSections?.length || 0) + (failedSections?.length || 0))} sections</span>
              </div>

              {hasRefund && (
                <div className="mb-2 p-2 bg-black/30 rounded border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Charged:</span>
                    <span>{creditsCharged} credits</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Refunded:</span>
                    <span>+{creditsRefunded} credits</span>
                  </div>
                </div>
              )}

              
              {failedSections && failedSections.length > 0 && (
                <>
                  <div className="mt-1.5 mb-0.5 font-semibold">Missing</div>
                  <ul className="list-disc list-inside space-y-0.5 pl-1 mb-1.5 text-amber-200/60">
                    {failedSections.map((section, idx) => (
                      <li key={idx} className="capitalize">{section}</li>
                    ))}
                  </ul>
                </>
              )}

              {errors && Object.keys(errors).length > 0 && (
                <div className="mt-2">
                  <div className="mb-1 font-semibold">Reason</div>
                  <div className="space-y-1.5 text-amber-200/60">
                    {Object.entries(errors).map(([key, err], idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="capitalize font-medium text-amber-300/80">{key}</span>
                        <span className="text-[10px] pl-1.5">• {(err as { reason: string }).reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Primary Actions Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-md mx-auto"
      >
        <button
          onClick={() => {
            window.location.href = "/builder";
          }}
          className="w-full sm:w-auto flex-1 py-2.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer group"
        >
          <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300" />
          <span>Create Another PRD</span>
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full sm:w-auto flex-1 py-2.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>Back to Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {showHomeButton && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md mx-auto mt-3 sm:mt-4"
        >
          <button
            onClick={() => navigate("/")}
            className="w-full py-2.5 px-5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Back to Home</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
