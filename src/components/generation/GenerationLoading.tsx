import { motion, AnimatePresence } from "motion/react";
import { FileText, Sparkles, Check } from "lucide-react";
import { STAGES, AI_INSIGHTS } from "./constants";

interface GenerationLoadingProps {
  progress: number;
  statusText: string;
  currentStageIndex: number;
  insightIndex: number;
}

export function GenerationLoading({
  progress,
  statusText,
  currentStageIndex,
  insightIndex
}: GenerationLoadingProps) {
  return (
    <motion.div
      key="loading-phase"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center"
    >
      {/* Animated Central Circle with Glowing Progress Arc */}
      <div className="relative mb-2 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-indigo-500/20 to-purple-500/30 blur-[35px] rounded-full" />

        <div className="relative w-20 sm:w-24 h-20 sm:h-24 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-white/10"
              strokeWidth="3"
              fill="transparent"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-[url(#hero-gradient)]"
              strokeWidth="4.5"
              strokeDasharray="276"
              strokeDashoffset={276 - (276 * progress) / 100}
              strokeLinecap="round"
              fill="transparent"
              transition={{ ease: "linear", duration: 0.1 }}
            />
            <defs>
              <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-2 rounded-full bg-[#0a0c18] border border-blue-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <FileText className="w-7 sm:w-8 h-7 sm:h-8 text-blue-400 animate-pulse" />
          </div>

          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1 -right-1 text-purple-300"
          >
            <Sparkles className="w-4.5 h-4.5 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          </motion.div>
        </div>
      </div>

      {/* Headline */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-1">
        Structuring your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
          PRD...
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-slate-400 text-xs sm:text-sm lg:text-base max-w-md mx-auto leading-relaxed mb-2 sm:mb-3">
        Please wait while we craft your Product Requirements Document based on{" "}
        <span className="text-purple-400 font-medium">your selections...</span>
      </p>

      {/* Sleek Progress Bar Section */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto mb-2">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative p-[1px]">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_#a855f7] ring-2 ring-purple-400/80" />
          </motion.div>
        </div>
      </div>

      {/* Dynamic Status Text */}
      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300 font-medium h-5 mb-2 sm:mb-3">
        <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '4s' }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={statusText}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {statusText}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Generation Stages - 4 Horizontal Cards */}
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 w-full max-w-[850px] mx-auto mt-2 mb-1 sm:mt-3 sm:mb-2">
        {STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const isStageCompleted = index < currentStageIndex;
          const isActive = index === currentStageIndex;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`
                relative rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 border transition-all duration-300 text-left backdrop-blur-md
                flex-1 min-w-[130px] sm:min-w-[150px] lg:flex-auto lg:min-w-fit
                ${isStageCompleted 
                  ? 'bg-emerald-500/[0.04] border-emerald-500/30' 
                  : isActive 
                  ? 'bg-blue-500/[0.08] border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30' 
                  : 'bg-white/[0.02] border-white/5 opacity-50'}
              `}
            >
              <div className={`
                p-2 rounded-lg border shrink-0 relative flex items-center justify-center
                ${isStageCompleted ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : stage.bgColor + ' ' + stage.color}
              `}>
                {isStageCompleted ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
              </div>

              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <div className="text-xs sm:text-sm font-semibold text-white whitespace-normal leading-tight">
                  {stage.title}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 whitespace-normal leading-tight mt-0.5">
                  {stage.subtitle}
                </div>
              </div>

              {isActive && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Dynamic AI Insight Card at Bottom */}
      <div className="w-full max-w-md sm:max-w-lg mx-auto mt-2 sm:mt-3">
        <div className="relative bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-xl px-4 py-2.5 sm:py-3 shadow-2xl shadow-blue-950/40 overflow-hidden group">
          <div className="absolute -inset-x-20 -top-20 -bottom-20 bg-gradient-to-r from-amber-500/5 via-indigo-500/5 to-purple-500/5 blur-xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={insightIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 flex items-center gap-3 min-h-[44px]"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center justify-center">
                {(() => {
                  const CurrentIcon = AI_INSIGHTS[insightIndex].icon;
                  return <CurrentIcon className="w-3.5 h-3.5" />;
                })()}
              </div>

              <div className="text-left min-w-0 flex-1">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-amber-400/90 mb-0.5 flex items-center gap-1.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  <span>AI Product Insight • {AI_INSIGHTS[insightIndex].category}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                  {AI_INSIGHTS[insightIndex].text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
