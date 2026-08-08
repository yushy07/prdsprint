import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/lib/supabase";
import { FcGoogle } from "react-icons/fc";
import { Menu, X, Settings, LogOut, AlertTriangle } from "lucide-react";
import { useCredits } from "@/context/CreditContext";
import { CreditBadge } from "@/components/credits/CreditBadge";
import { PlanBadge } from "@/components/credits/PlanBadge";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPlan, remainingCredits, isAdmin } = useCredits();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      }
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleNavSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetHash = sectionId ? `#${sectionId}` : '';

    if (location.pathname === '/') {
      if (!sectionId) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          const yOffset = -100;
          const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }
      window.history.pushState(null, '', targetHash || '/');
    } else {
      navigate(`/${targetHash}`);
    }
  };

  const path = location.pathname;
  
  const NavLinks = () => {
    return (
      <>
        <a href="/" onClick={(e) => handleNavSection(e, '')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">Home</a>
        <a href="/#features" onClick={(e) => handleNavSection(e, 'features')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">Features</a>
        <a href="/#how-it-works" onClick={(e) => handleNavSection(e, 'how-it-works')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">How It Works</a>
        <a href="/#pricing" onClick={(e) => handleNavSection(e, 'pricing')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">Pricing</a>
        <a href="/#faq" onClick={(e) => handleNavSection(e, 'faq')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">FAQ</a>
        {session && (
          <>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
            {path !== '/builder' && (
              <Link to="/builder" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors">Builder</Link>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-6xl px-4"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border border-white/10 rounded-full bg-[#0A0A0B]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {/* Column 1: Logo */}
        <div className="flex flex-1 items-center justify-start min-w-0">
          <a href="/" onClick={(e) => handleNavSection(e, '')} aria-label="PRDSprint Home" className="relative group block flex items-center gap-2">
            <img src="/logo.svg" alt="PRDSprint" className="w-auto h-10 sm:h-12 md:h-14 object-contain transition-transform duration-500 group-hover:scale-105" />
            <span className="text-xl font-bold tracking-[-0.01em] text-white" style={{ wordSpacing: '0.05em' }}>
              PRD<span className="text-blue-500">Sprint</span>
            </span>
          </a>
        </div>
        
        {/* Column 2: Centered Links */}
        <div className="hidden md:flex items-center justify-center gap-4 lg:gap-8 text-[13px] font-medium tracking-wide whitespace-nowrap">
          <NavLinks />
        </div>

        {/* Column 3: Right Side */}
        <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4 min-w-0">
          {session ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <PlanBadge plan={currentPlan} isAdmin={isAdmin} className="hidden md:flex" />
                
                <Link to="/dashboard">
                  <CreditBadge credits={remainingCredits} className="hover:bg-cyan-500/20 transition-colors" />
                </Link>

                {!isAdmin && remainingCredits < 50 && (
                  <Link to="/dashboard" className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-bold text-amber-400 hover:bg-amber-500/20 transition-colors">
                    <AlertTriangle size={12} />
                    <span>Low Credits</span>
                  </Link>
                )}
              </div>

              <div className="w-px h-4 bg-white/10 mx-1 hidden sm:block"></div>

              <button 
                onClick={handleSignOut}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors"
                title="Sign Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <button onClick={handleSignIn} className="relative flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-[#0f0f13] text-white text-[13px] font-bold rounded-full transition-all border border-white/5 hover:bg-[#1a1a20] cursor-pointer">
                <FcGoogle size={16} /> <span className="hidden sm:inline">Sign in with Google</span><span className="sm:hidden">Sign In</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 px-6 py-4 rounded-2xl bg-[#0A0A0B]/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-3 text-sm font-medium text-gray-200"
          >
            <NavLinks />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
