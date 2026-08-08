import { ReactNode, useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useCredits } from "@/context/CreditContext";
import { PLAN_LIMITS } from "@/lib/credits.config";
import { Monitor, ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { FloatingNav } from "../../components/layout";
import { UpgradeModal } from "@/components/credits/UpgradeModal";
import { WizardData } from "../Builder";

// Platform icons
const BrowserGlobeIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.96" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
    <path d="M2 7h20" />
    <circle cx="6" cy="5" r="0.5" fill="currentColor" />
    <circle cx="8" cy="5" r="0.5" fill="currentColor" />
    <circle cx="10" cy="5" r="0.5" fill="currentColor" />
    <circle cx="12" cy="14" r="5" />
    <path d="M12 9c-1.6 0-3 2.2-3 5s1.4 5 3 5 3-2.2 3-5-1.4-5-3-5" />
    <path d="M7 14h10" />
    <path d="M7.7 11.5h8.6" />
    <path d="M7.7 16.5h8.6" />
  </svg>
);

const AndroidIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.96" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 15V9a7 7 0 0 1 14 0v6" />
    <path d="M3 15h18" />
    <path d="M8 5l-2-2" />
    <path d="M16 5l2-2" />
    <circle cx="9" cy="10" r="1.2" fill="currentColor" />
    <circle cx="15" cy="10" r="1.2" fill="currentColor" />
    <path d="M6 15v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4" />
    <path d="M4 15v2a2 2 0 0 0-2 2h0" />
    <path d="M20 15v2a2 2 0 0 1 2 2h0" />
  </svg>
);

interface PlatformCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  isSelected: boolean;
  onClick: () => void;
  delay: number;
  color: 'blue' | 'green';
  isLocked?: boolean;
  lockedMessage?: string;
}

function PlatformCard({ title, subtitle, icon, isSelected, onClick, delay, color, isLocked, lockedMessage }: PlatformCardProps) {
  const isBlue = color === 'blue';
  
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className={`
        relative overflow-hidden w-full h-[260px] md:h-[280px] rounded-[2rem] text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        flex flex-col items-center justify-center p-8 group
        ${isSelected 
          ? `bg-[#06080D] border ${isBlue ? 'border-blue-500/50 shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]' : 'border-emerald-500/50 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]'} transform scale-[1.02]` 
          : 'bg-[#0A0D14]/80 border border-white/[0.05] hover:border-white/[0.1] hover:bg-[#0c101a] hover:scale-[1.01]'
        }
      `}
    >
      <div className={`
        absolute inset-0 opacity-0 transition-opacity duration-700
        ${isSelected ? 'opacity-100' : 'group-hover:opacity-30'}
        ${isBlue 
          ? 'bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]' 
          : 'bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]'
        }
      `} />
      
      {isLocked && (
        <div className="absolute top-4 right-4 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <Lock size={10} />
          <span>Starter+</span>
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div 
          animate={isSelected ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`
            p-5 rounded-3xl backdrop-blur-xl transition-all duration-500
            ${isSelected 
              ? (isBlue ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]')
              : 'bg-white/5 text-gray-400 border border-white/10 group-hover:bg-white/10 group-hover:text-gray-300'
            }
          `}
        >
          {icon}
        </motion.div>
        
        <div className="flex flex-col items-center gap-2">
          <h3 className={`text-2xl font-bold tracking-tight transition-colors duration-500 ${isSelected ? 'text-white' : 'text-gray-200'}`}>
            {title}
          </h3>
          <p className={`text-sm font-medium transition-colors duration-500 text-center ${isSelected ? (isBlue ? 'text-blue-200/70' : 'text-emerald-200/70') : 'text-gray-500'}`}>
            {subtitle}
            {isLocked && lockedMessage && (
              <span className="block text-[11px] text-purple-400/80 mt-2 font-medium">
                {lockedMessage}
              </span>
            )}
          </p>
        </div>
      </div>
      
      <div className={`
        absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500
        ${isSelected 
          ? (isBlue ? 'border-blue-500 bg-blue-500' : 'border-emerald-500 bg-emerald-500') 
          : 'border-white/10 bg-transparent scale-90 opacity-0 group-hover:opacity-100'
        }
      `}>
        <motion.div 
          initial={false}
          animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
          className="w-2.5 h-2.5 rounded-full bg-white"
        />
      </div>
    </motion.button>
  );
}

interface PlatformSelectionStepProps {
  selectedPlatform: string | null;
  onSelectPlatform: (platform: string) => void;
  onNext: () => void;
}

export function PlatformSelectionStep({
  selectedPlatform,
  onSelectPlatform,
  onNext
}: PlatformSelectionStepProps) {
  const { currentPlan, isAdmin } = useCredits();
  const navigate = useNavigate();
  const isAndroidLocked = !isAdmin && !PLAN_LIMITS[currentPlan].androidUnlocked;
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  return (
    <motion.div 
      key="step1"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center pt-navbar-offset pb-28"
    >
      {/* Subtle Localized Foreground Overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,transparent_60%)] scale-150" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="w-12 h-12 rounded-[14px] border border-white/20 bg-white/[0.05] flex items-center justify-center mb-6 relative group backdrop-blur-sm"
        >
          {/* Breathing glow */}
          <motion.div 
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-[14px] bg-blue-500/30 blur-md"
          />
          <div className="absolute inset-0 rounded-[14px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
          <Monitor className="w-5 h-5 text-white relative z-10 drop-shadow-md" strokeWidth={1.5} />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[14px] font-black tracking-[0.3em] text-white/95 mb-6 drop-shadow-lg"
        >
          PLATFORM
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-[2px] rounded-full bg-gradient-to-r from-blue-500/0 via-blue-400 to-purple-500/0 mb-8 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1)]" />
        </motion.div>
        
        <div className="relative">
          {/* Subtle glow behind the heading */}
          <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none -z-10" />
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-display font-semibold text-white mb-4 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            What are you <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(96,165,250,0.4)]">building?</span>
          </motion.h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/90 text-[17px] font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        >
          Select the platform for your project
        </motion.p>
      </div>

      {/* Platform Cards */}
      <div id="platform-cards" className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[700px] mb-20">
        {/* Website Card */}
        <PlatformCard 
          title="Website"
          subtitle="Build for the web"
          icon={<BrowserGlobeIcon />}
          isSelected={selectedPlatform === "website"}
          onClick={() => onSelectPlatform("website")}
          delay={0.4}
          color="blue"
        />
        {/* Android Card */}
        <PlatformCard 
          title="Android App"
          subtitle="Build for Android devices"
          icon={<AndroidIcon />}
          isSelected={selectedPlatform === "android"}
          onClick={() => {
            if (isAndroidLocked) {
              setShowUpgradeModal(true);
              return;
            }
            onSelectPlatform("android");
          }}
          delay={0.5}
          color="green"
          isLocked={isAndroidLocked}
          lockedMessage={isAndroidLocked ? "Android PRDs are available on Starter and above." : undefined}
        />
      </div>

      
      {/* Navigation Buttons */}
      <div className="w-full max-w-[700px] mt-2 relative z-20">
        <FloatingNav isValid={!!selectedPlatform}>
          <div className="w-full flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link 
                to="/dashboard"
                className="group relative flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/30 text-gray-200 hover:text-white text-[13px] font-medium transition-all duration-300 overflow-hidden shadow-md backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">Back to Home</span>
              </Link>
            </motion.div>

            <motion.button
              data-action="next"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={() => {
                if (!selectedPlatform) {
                  const el = document.getElementById('section-platform');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                  // Let's add pulse to the cards container instead
                  const cards = document.getElementById('platform-cards');
                  if (cards) {
                      cards.classList.add('ring-2', 'ring-red-500', 'ring-offset-8', 'ring-offset-[#06080D]', 'rounded-3xl', 'transition-all', 'duration-300');
                      setTimeout(() => {
                        cards.classList.remove('ring-2', 'ring-red-500', 'ring-offset-8', 'ring-offset-[#06080D]', 'rounded-3xl');
                      }, 1000);
                  }
                } else {
                  onNext();
                }
              }}
              className={`
                group relative flex items-center gap-3 px-8 py-3.5 rounded-full text-[13px] font-semibold transition-all duration-500 overflow-hidden
                ${selectedPlatform 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] cursor-pointer hover:-translate-y-0.5' 
                  : 'bg-white/[0.02] text-gray-400 border border-white/5 backdrop-blur-md cursor-pointer hover:bg-white/[0.04]'}
              `}
            >
              {selectedPlatform && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
              {selectedPlatform && (
                <motion.div 
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                />
              )}
              <span className="relative z-10">Next</span>
              <ArrowRight className={`w-4 h-4 relative z-10 transition-transform duration-300 ${selectedPlatform ? 'group-hover:translate-x-1.5' : ''}`} />
            </motion.button>
          </div>
        </FloatingNav>
      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title="Unlock Android PRDs"
        body="Upgrade to Starter or above to generate Android PRDs and unlock premium features."
      />
      </div>
    </motion.div>
  );
}
