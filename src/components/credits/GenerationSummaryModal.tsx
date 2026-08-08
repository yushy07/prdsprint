import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GenerationConfig } from '@/lib/creditCalculator';
import { PLAN_LIMITS, PRICING_RULES } from "@/lib/credits.config";
import { useCredits } from '@/context/CreditContext';
import { 
  Zap, 
  ArrowRight, 
  AlertTriangle, 
  ShieldAlert, 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  SlidersHorizontal, 
  Gift, 
  CreditCard, 
  Globe, 
  PenTool, 
  Code2, 
  BarChart3, 
  Clock, 
  FileText, 
  Database, 
  Boxes, 
  Monitor, 
  Folder, 
  Milestone, 
  Package, 
  ShieldCheck 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GenerationSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: GenerationConfig;
}

export function GenerationSummaryModal({ isOpen, onClose, onConfirm, config }: GenerationSummaryModalProps) {
  const { remainingCredits, currentPlan, isAdmin } = useCredits();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const baseCost = PRICING_RULES.base[config.platform] || 20;
  const complexityCost = PRICING_RULES.complexity[config.complexity] || 0;
  
  let featuresCost = 0;
  config.features.forEach(feature => {
    featuresCost += (PRICING_RULES.features as any)[feature] || 0;
  });
  
  const styleCost = (PRICING_RULES.styles as any)[config.style] || 0;
  const techStackCost = (PRICING_RULES.techStacks as any)[config.techStack] || 0;
  
  const calculatedTotalCost = baseCost + complexityCost + featuresCost + styleCost + techStackCost;
  const totalCost = isAdmin ? 0 : calculatedTotalCost;
  const remainingAfter = remainingCredits - totalCost;
  const hasEnoughCredits = isAdmin || remainingCredits >= calculatedTotalCost;
  
  const isAndroidLocked = !isAdmin && config.platform === 'android' && !PLAN_LIMITS[currentPlan].androidUnlocked;

  const defaultPrompt = "Build an AI-powered SaaS platform that helps users generate professional PRDs in seconds. The platform should include a beautiful builder experience, user authentication, credit system, history of generations, and an admin dashboard for managing users and content. The app should be modern, fast, and optimized for both desktop and mobile.";
  
  const promptText = (config.projectPrompt && config.projectPrompt.trim()) ? config.projectPrompt : defaultPrompt;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleConfirm = () => {
    if (!isAndroidLocked) {
      onConfirm();
    }
  };

  const handleUpgrade = () => {
    onClose();
    navigate('/pricing');
  };

  // Deliverables list for "You'll Receive"
  const deliverables = [
    { icon: FileText, label: "Complete PRD", color: "text-blue-400" },
    { icon: Database, label: "Database Schema", color: "text-emerald-400" },
    { icon: Boxes, label: "Architecture", color: "text-purple-400" },
    { icon: Monitor, label: "UI/UX System", color: "text-cyan-400" },
    { icon: Folder, label: "Folder Structure", color: "text-amber-400" },
    { icon: Milestone, label: "Development Roadmap", color: "text-orange-400" },
    { icon: Code2, label: "API Design", color: "text-blue-400" },
    { icon: Package, label: "Export Package", color: "text-emerald-400" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 pointer-events-none"
          />
          <motion.div
            initial={{ scale: 0.97, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 8 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1120px] xl:max-w-[1220px] bg-[#080B11] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] rounded-2xl overflow-hidden flex flex-col my-auto max-h-[94vh] z-10 relative text-white"
          >
            {/* Header */}
            <div className="px-5 py-3 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.25)]">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight leading-tight">Generation Summary</h2>
                  <p className="text-xs text-slate-400">Review everything before we generate your PRD</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-3.5 sm:p-4 space-y-3 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/10">
              {/* Top Row Grid: 3 Columns on Landscape/Desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
                
                {/* 1. PROJECT / DATA PROMPT (col-span-4) */}
                <div className="lg:col-span-4 bg-[#0D111A] border border-white/[0.07] rounded-xl p-3 sm:p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">PROJECT / DATA PROMPT</span>
                      </div>
                      <button 
                        onClick={handleCopy}
                        title="Copy prompt"
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal mb-3 max-h-[105px] lg:max-h-[115px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                      {promptText}
                    </p>
                  </div>
                  
                  {/* Badges / Tags */}
                  <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-white/[0.05]">
                    <span className="bg-purple-950/60 border border-purple-800/40 text-purple-300 text-[10px] font-medium px-2 py-0.5 rounded-full">
                      AI Powered
                    </span>
                    <span className="bg-blue-950/60 border border-blue-800/40 text-blue-300 text-[10px] font-medium px-2 py-0.5 rounded-full">
                      SaaS
                    </span>
                    <span className="bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Builder
                    </span>
                    <span className="bg-amber-950/60 border border-amber-800/40 text-amber-300 text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Authentication
                    </span>
                    <span className="bg-white/5 border border-white/10 text-slate-400 text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                      +2
                    </span>
                  </div>
                </div>

                {/* 2. CONFIGURATION (col-span-3) */}
                <div className="lg:col-span-3 bg-[#0D111A] border border-white/[0.07] rounded-xl p-3 sm:p-3.5 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 mb-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">CONFIGURATION</span>
                  </div>

                  <div className="divide-y divide-white/[0.05] text-xs">
                    <div className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Globe className="w-3 h-3 text-slate-400" /> Platform
                      </div>
                      <span className="font-medium text-blue-400 capitalize">
                        {config.platform === 'android' ? 'Android' : 'Website'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <PenTool className="w-3 h-3 text-slate-400" /> Style
                      </div>
                      <span className="font-medium text-purple-400 capitalize">
                        {config.style || 'Essence'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Code2 className="w-3 h-3 text-slate-400" /> Tech Stack
                      </div>
                      <span className="font-medium text-cyan-400 capitalize">
                        {config.techStack === 'react-tailwind' ? 'React' : config.techStack || 'React'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <BarChart3 className="w-3 h-3 text-slate-400" /> Complexity
                      </div>
                      <span className="font-medium text-amber-400 capitalize">
                        {config.complexity || 'Advanced'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3 h-3 text-slate-400" /> Estimated Time
                      </div>
                      <span className="font-medium text-emerald-400">
                        10–20 seconds
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. YOU'LL RECEIVE (col-span-5) */}
                <div className="lg:col-span-5 bg-[#0D111A] border border-white/[0.07] rounded-xl p-3 sm:p-3.5 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Gift className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">YOU'LL RECEIVE</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {deliverables.map((item, index) => {
                      const IconComp = item.icon;
                      return (
                        <div 
                          key={index}
                          className="bg-[#06080E] border border-white/[0.05] rounded-lg p-2 flex flex-col items-center justify-center text-center hover:border-white/20 transition-all group min-h-[56px] sm:min-h-[60px]"
                        >
                          <IconComp className={`w-4 h-4 mb-1 ${item.color}`} />
                          <span className="text-[10px] font-medium text-slate-300 leading-tight group-hover:text-white transition-colors">
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Card: COST & ACCOUNT */}
              <div className="bg-[#0D111A] border border-white/[0.07] rounded-xl p-3 sm:p-3.5">
                <div className="flex items-center gap-1.5 mb-2">
                  <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">COST & ACCOUNT</span>
                </div>

                <div className="bg-[#06080E] border border-white/[0.05] rounded-xl p-2.5 sm:p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  
                  {/* Generation Cost */}
                  <div className="lg:col-span-4 lg:border-r border-white/[0.06] lg:pr-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Generation Cost</div>
                      {isAdmin ? (
                        <>
                          <div className="text-base sm:text-lg font-extrabold text-emerald-400 tracking-tight">Free Generation</div>
                          <div className="text-[11px] text-slate-400 font-medium">0 Credits Charged</div>
                          <span className="sr-only">Free Generation · 0 Credits Charged</span>
                        </>
                      ) : (
                        <>
                          <div className="text-base sm:text-lg font-extrabold text-white tracking-tight">{totalCost} Credits</div>
                          <div className="text-[11px] text-slate-400 font-medium">{totalCost} Credits Charged</div>
                        </>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-emerald-500/30 bg-emerald-500/10 flex flex-col items-center justify-center shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                      <span className="text-xs font-bold text-emerald-400 leading-none">{totalCost}</span>
                      <span className="text-[8px] text-slate-400 font-medium leading-none mt-0.5">Credits</span>
                    </div>
                  </div>

                  {/* Current Balance */}
                  <div className="lg:col-span-2 lg:border-r border-white/[0.06] lg:pr-3 flex flex-col justify-center">
                    <div className="text-[11px] text-slate-400 font-medium">Current Balance</div>
                    <div className="text-base font-bold text-white tracking-tight">{remainingCredits} Credits</div>
                  </div>

                  {/* Account Role */}
                  <div className="lg:col-span-3 lg:border-r border-white/[0.06] lg:pr-3 flex flex-col justify-center">
                    <div className="text-[11px] text-slate-400 font-medium">Account Role</div>
                    {isAdmin ? (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-purple-400 font-bold text-sm sm:text-base">Administrator</span>
                        <span className="bg-purple-950/60 border border-purple-800/40 text-purple-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          Free Generation
                        </span>
                        <span className="sr-only">Administrator (Free Generation)</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-white font-bold text-sm sm:text-base capitalize">{currentPlan} Plan</span>
                      </div>
                    )}
                  </div>

                  {/* Your Data is Secure Box */}
                  <div className="lg:col-span-3 bg-blue-500/[0.03] p-2 sm:p-2.5 rounded-lg border border-blue-500/10 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Your data is secure</div>
                      <div className="text-[10px] text-slate-400 leading-tight">
                        We never store your prompt or generated content.
                      </div>
                    </div>
                  </div>

                </div>

                {/* Alerts / Warnings if insufficient credits or android locked */}
                {!isAdmin && (
                  <div className="mt-2 space-y-1.5">
                    {remainingAfter < 10 && hasEnoughCredits && (
                      <div className="flex gap-2 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200/90 text-xs items-start">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
                        <div>
                          <p className="font-semibold mb-0.5">You'll have only {remainingAfter} credits remaining.</p>
                          <p>Consider upgrading to continue generating more PRDs.</p>
                        </div>
                      </div>
                    )}
                    {isAndroidLocked && (
                      <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 flex gap-2 text-xs text-red-200">
                        <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-red-400 mt-0.5" />
                        <div>
                          <span className="block font-semibold mb-0.5 text-red-300">Android Generation Locked</span>
                          Your current plan doesn't support Android PRD generation. Upgrade to Pro or Ultimate.
                        </div>
                      </div>
                    )}
                    {!hasEnoughCredits && (
                      <div className="flex gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200/90 text-xs">
                        <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-red-400 mt-0.5" />
                        <div>
                          <p className="font-semibold mb-0.5">You don't have enough credits for this generation.</p>
                          <p>Upgrade your plan to continue.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-white/[0.08] bg-[#05070C] flex items-center justify-end gap-3 shrink-0">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#131926] hover:bg-[#1A2233] text-slate-300 text-xs sm:text-sm font-semibold transition-colors border border-white/5 cursor-pointer"
              >
                Cancel
              </button>
              
              {hasEnoughCredits && !isAndroidLocked ? (
                <button
                  onClick={handleConfirm}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(99,102,241,0.35)] flex items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  Generate PRD
                  <Zap className="w-3.5 h-3.5 fill-current" />
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)] flex items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  Upgrade Plan
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
