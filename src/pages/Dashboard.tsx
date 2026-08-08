import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Navbar } from '@/components/layout';
import SoftAurora from '@/components/effects/SoftAurora';
import { Footer } from '@/components/layout';
import { useToast } from '@/context/ToastContext';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, FileText, Rocket, Database, Crown, LogOut, Lock, ShieldCheck } from 'lucide-react';
import { useCredits } from '@/context/CreditContext';
import { CreditHistoryTimeline } from "@/components/credits/CreditHistoryTimeline";
import { PLAN_LIMITS } from '@/lib/credits.config';

export function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const globalToast = useToast();
  const { currentPlan, remainingCredits, isAdmin } = useCredits();
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcode hasPRDs for now until we implement the PRD list
  const hasPRDs = false;

  // Handle toast notification if navigated from Checkout
  useEffect(() => {
    if (location.state?.toast) {
      const { type, title, message } = location.state.toast;
      if (type === "success") {
        globalToast.success(message, title);
      } else if (type === "error") {
        globalToast.error(message, title);
      } else if (type === "warning") {
        globalToast.warning(message, title);
      } else {
        globalToast.info(message, title);
      }

      // Clean history state so refresh doesn't trigger toast again
      window.history.replaceState({}, document.title);
    }
  }, [location.state, globalToast]);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };
    checkSession();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06080D] p-6 pt-24 text-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-center animate-pulse">
            <div className="space-y-4">
              <div className="h-10 w-64 bg-white/5 rounded-2xl" />
              <div className="h-5 w-48 bg-white/5 rounded-xl" />
            </div>
            <div className="h-12 w-40 bg-white/5 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            <div className="h-48 bg-white/5 rounded-3xl" />
            <div className="h-48 bg-white/5 rounded-3xl" />
            <div className="h-48 bg-white/5 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030305] text-white flex items-center justify-center px-6 text-center">
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  const rawName = user?.user_metadata?.full_name || user?.user_metadata?.name;
  const fullName = rawName || (user?.email ? user.email.split('@')[0] : 'User');
  const displayName = fullName.toUpperCase();

  // Determine max credits based on plan name
  const currentPlanName = currentPlan;
  const maxCredits = PLAN_LIMITS[currentPlan].credits;
  
  const currentCredits = remainingCredits;
  const creditsPercentage = Math.min(100, Math.max(0, (currentCredits / maxCredits) * 100));

  return (
    <div className="min-h-screen bg-[#030305] text-foreground selection:bg-brand-primary/30 font-sans selection:text-foreground relative flex flex-col">
      {/* SoftAurora Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1.0}
          color1="#f7f7f7"
          color2="#e100ff"
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={1.0}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1.0}
          enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col flex-1">
        <Navbar />
      
      <main className="pt-navbar-offset pb-16 px-6 max-w-5xl mx-auto flex-1 w-full relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 tracking-tight">
              Welcome back,<br />
              <span className="bg-gradient-to-r from-[#38bdf8] to-[#a855f7] bg-clip-text text-transparent">{displayName}</span> <span className="inline-block origin-bottom-right hover:animate-wave text-5xl">👋</span>
            </h1>
            <p className="text-gray-400 text-[17px] leading-relaxed max-w-md">
              {hasPRDs ? "Continue building where you left off." : "Your next product starts here."}
            </p>
          </div>
          
          {/* Large Hero Illustration: Blueprint Visualization */}
          <div className="relative w-full max-w-[320px] aspect-[4/3] hidden md:flex items-center justify-center shrink-0 perspective-1000">
             
             {/* Back Document Wireframe */}
             <motion.div 
               animate={{ rotateZ: -5, y: [-4, 4, -4] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute right-[10%] top-[10%] w-52 h-64 border border-white/5 bg-[#0A0A0C]/40 rounded-3xl flex flex-col p-6 shadow-2xl backdrop-blur-md"
               style={{ rotateY: 10, rotateX: 5 }}
             >
               <div className="w-full h-1.5 bg-white/10 rounded-full mb-5" />
               <div className="w-3/4 h-1.5 bg-white/10 rounded-full mb-8" />
               
               <div className="w-full h-2 bg-white/5 rounded-full mb-4" />
               <div className="w-5/6 h-2 bg-white/5 rounded-full mb-4" />
               <div className="w-4/5 h-2 bg-white/5 rounded-full mb-4" />
               <div className="w-full h-2 bg-white/5 rounded-full mb-4" />
               <div className="w-2/3 h-2 bg-white/5 rounded-full mb-4" />
             </motion.div>

             {/* Front Glowing Icon */}
             <motion.div 
               animate={{ y: [-8, 8, -8] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
               className="relative z-10 w-28 h-28 bg-[#0D0E15]/90 backdrop-blur-xl border border-blue-500/30 rounded-[28px] flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.2)] -ml-16 mt-8"
             >
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-[28px]" />
               <FileText className="w-12 h-12 text-blue-400 relative z-10" />
             </motion.div>

             {/* Orbital Rings */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="absolute w-[120%] h-[120%] rounded-full border border-purple-500/20 pointer-events-none"
               style={{ rotateX: 65 }}
             >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_15px_#a855f7]" />
                <div className="absolute bottom-[20%] right-[10%] w-1.5 h-1.5 bg-purple-500/50 rounded-full" />
             </motion.div>
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="absolute w-[140%] h-[140%] rounded-full border border-blue-500/20 pointer-events-none"
               style={{ rotateX: 70, rotateY: 10 }}
             >
                <div className="absolute bottom-0 right-1/2 w-2.5 h-2.5 bg-blue-400 rounded-full shadow-[0_0_20px_#3b82f6]" />
                <div className="absolute top-[30%] left-[5%] w-1.5 h-1.5 bg-blue-500/50 rounded-full" />
             </motion.div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Plan Card */}
          <div className="relative bg-[#0A0B10] border border-white/5 hover:border-white/10 transition-colors rounded-[32px] p-8 shadow-2xl overflow-hidden group min-h-[260px] flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#12141D] border border-purple-500/20 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-purple-400" />
                </div>
                <h2 className="text-purple-400 text-[11px] font-bold tracking-widest uppercase">
                  {isAdmin ? "ACCOUNT ROLE" : "CURRENT PLAN"}
                </h2>
              </div>
              
              <div className="text-4xl font-display font-bold text-white mb-3 flex items-center gap-2">
                {isAdmin ? "Administrator" : `${PLAN_LIMITS[currentPlan].name} Plan`}
              </div>

              {isAdmin ? (
                <div className="text-gray-300 text-[14px] mb-8 max-w-[280px] leading-relaxed space-y-1">
                  <p className="text-purple-300 font-semibold">✨ All features unlocked</p>
                  <p className="text-emerald-400 font-medium">⚡ Free PRD generation</p>
                </div>
              ) : (
                <p className="text-gray-400 text-[14px] mb-8 max-w-[260px] leading-relaxed">
                  {maxCredits} Monthly Credits included.<br/>
                  Upgrade anytime for higher limits and premium features.
                </p>
              )}
              
              {isAdmin ? (
                <Link 
                  to="/admin"
                  className="relative group/admin overflow-hidden px-6 py-2.5 bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/30 text-purple-200 text-[13px] font-bold rounded-full transition-all flex items-center gap-2 w-max"
                >
                  <span className="relative z-10">Admin Console</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/admin:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <button 
                  onClick={() => navigate('/checkout?plan=pro')}
                  className="relative group/upgrade overflow-hidden px-6 py-2.5 bg-transparent border border-white/10 hover:border-purple-500/40 text-white hover:text-purple-300 text-[13px] font-bold rounded-full transition-all flex items-center gap-2 w-max cursor-pointer"
                >
                  <span className="relative z-10">Upgrade Plan</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/upgrade:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
            
            {/* Floating Plan Icon */}
            <motion.div 
               animate={{ y: [-5, 5, -5] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute right-8 top-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-purple-500/20 bg-purple-500/5 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.1)]"
            >
               {isAdmin ? (
                 <ShieldCheck className="w-12 h-12 text-purple-400 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
               ) : (
                 <Rocket className="w-12 h-12 text-blue-500 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
               )}
            </motion.div>
          </div>

          {/* Credits Card */}
          <div className="relative bg-[#0A0B10] border border-white/5 hover:border-white/10 transition-colors rounded-[32px] p-8 shadow-2xl overflow-hidden group min-h-[260px] flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#12141D] border border-purple-500/20 flex items-center justify-center">
                  <Database className="w-4 h-4 text-purple-500" />
                </div>
                <h2 className="text-purple-500 text-[11px] font-bold tracking-widest uppercase">CREDITS REMAINING</h2>
              </div>
              
              <div className="text-5xl font-display font-bold text-blue-400 mb-2 flex items-baseline gap-2">
                {currentCredits} <span className="text-2xl text-purple-500/50">/ {maxCredits}</span>
              </div>
              <p className="text-gray-400 text-[14px] mb-8 max-w-[240px] leading-relaxed">
                {isAdmin ? "Free PRD generation active." : currentCredits === 0 ? "You're out of credits." : "You have active credits."}<br/>
                Generate a new PRD to get started.
              </p>
              
              <Link to="/builder" className="relative group/gen overflow-hidden px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[13px] font-bold rounded-full transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2 w-max">
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/gen:translate-y-0 transition-transform duration-300 ease-out" />
                 <Sparkles className="w-4 h-4 relative z-10 group-hover/gen:rotate-12 transition-transform" />
                 <span className="relative z-10">Generate PRD</span>
                 <ArrowRight className="w-4 h-4 relative z-10 group-hover/gen:translate-x-1 transition-transform" />
              </Link>
            {!isAdmin && !PLAN_LIMITS[currentPlan].androidUnlocked && (
              <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-gray-500 font-medium px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span>🌍 Website PRDs (Free)</span>
                <span className="w-1 h-1 rounded-full bg-white/20 mx-1"></span>
                <span className="flex items-center gap-1 text-purple-400/80">
                  <Lock size={10} className="mb-0.5" />
                  Android PRDs Available on Starter+
                </span>
              </div>
            )}
            </div>
            
            {/* Circular Indicator */}
            <motion.div 
               animate={{ y: [-5, 5, -5] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
               className="absolute right-8 top-1/2 -translate-y-1/2 w-36 h-36 flex items-center justify-center"
            >
               <div className="absolute inset-0 bg-purple-500/5 rounded-full" />
               <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]" viewBox="0 0 36 36">
                  <path
                    className="text-purple-500/10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className="text-purple-500"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray={`${creditsPercentage}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: `${creditsPercentage}, 100` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
               </svg>
               <Database className="w-10 h-10 text-purple-400 opacity-80 group-hover:opacity-100 transition-all duration-500 relative z-10" strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>

        {/* Empty State */}
        {!hasPRDs && (
          <div className="flex flex-col items-center justify-center p-12 md:p-16 text-center bg-[#0A0A0B]/60 backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <motion.div 
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-6 relative"
            >
              <div className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10" />
              <FileText className="w-8 h-8 text-cyan-400 opacity-80" />
            </motion.div>
            
            <h3 className="text-2xl font-display font-semibold text-white mb-3">No PRDs Yet</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8 text-[15px] leading-relaxed">
              Your next product starts here.<br/>
              Describe your idea and generate your first developer-ready PRD in minutes.
            </p>
            
            <Link to="/builder" className="relative group/btn overflow-hidden rounded-full bg-white text-black px-8 py-3.5 font-bold text-[14px] transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-out" />
              <Sparkles className="w-4 h-4 text-purple-600 relative z-10" />
              <span className="relative z-10">Generate First PRD</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
            {!isAdmin && !PLAN_LIMITS[currentPlan].androidUnlocked && (
              <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-gray-500 font-medium px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span>🌍 Website PRDs (Free)</span>
                <span className="w-1 h-1 rounded-full bg-white/20 mx-1"></span>
                <span className="flex items-center gap-1 text-purple-400/80">
                  <Lock size={10} className="mb-0.5" />
                  Android PRDs Available on Starter+
                </span>
              </div>
            )}
          </div>
        )}

        {/* Credit History */}
        <div className="mt-8">
          <CreditHistoryTimeline />
        </div>

        {/* Sign Out Section */}
        <div className="mt-12 pt-8 border-t border-white/10 flex justify-end">
          <button
            onClick={handleSignOut}
            className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-gray-400" />
            <span>Sign Out</span>
          </button>
        </div>

      </main>
      
      <Footer variant="compact" />
    </div>
    </div>
  );
}
