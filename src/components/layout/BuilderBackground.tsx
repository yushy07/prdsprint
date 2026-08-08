import { lazy, Suspense } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Globe, Settings } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const Lightfall = lazy(() => import("../effects/Lightfall"));
const FloatingLines = lazy(() => import("../effects/FloatingLines"));
const PrismaticBurst = lazy(() => import("../effects/PrismaticBurst"));
const Prism = lazy(() => import("../effects/Prism"));
const Ferrofluid = lazy(() => import("../effects/Ferrofluid"));
const Aurora = lazy(() => import("../effects/Aurora"));

interface BuilderBackgroundProps {
  step: number;
}

export function BuilderBackground({ step }: BuilderBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {/* Background System for Step 1 (Platform Selection) */}
      {step === 1 && !prefersReducedMotion && (
        <motion.div key="bg1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Suspense fallback={null}>
            <Lightfall
              className=""
              dpr={1}
              mixBlendMode="normal"
              colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
              backgroundColor="#0A29FF"
              speed={1}
              streakCount={8}
              streakWidth={1}
              streakLength={1}
              glow={0.7}
              density={1}
              twinkle={1}
              zoom={2}
              backgroundGlow={0.65}
              opacity={1}
              mouseInteraction={true}
              mouseStrength={1}
              mouseRadius={0.6}
            />
          </Suspense>
          {/* Hero safe zone radial mask */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.35)_35%,transparent_70%)] scale-150 -translate-y-10" />
        </motion.div>
      )}

      {/* FloatingLines Background specifically for Style Selection (Step 5) */}
      {step === 5 && !prefersReducedMotion && (
        <motion.div key="bg5" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}} className="fixed inset-0 z-0 overflow-hidden" style={{ opacity: 0.8 }}>
          <Suspense fallback={null}>
            <FloatingLines 
              enabledWaves={['top', 'middle', 'bottom']}
              lineCount={[8, 12, 16]}
              lineDistance={[10, 8, 6]}
              animationSpeed={0.3}
              bendRadius={8.0}
              bendStrength={-0.1}
              mouseDamping={0.02}
              interactive={true}
              parallax={true}
              parallaxStrength={0.05}
              linesGradient={['#8B5CF6', '#6366F1', '#06B6D4']}
              mixBlendMode="screen"
            />
          </Suspense>
        </motion.div>
      )}

      {/* PrismaticBurst Background specifically for Color Palette Selection (Step 3) */}
      {step === 3 && !prefersReducedMotion && (
        <motion.div key="bg3" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ opacity: 0.8 }}>
          <Suspense fallback={null}>
            <PrismaticBurst 
              animationType="rotate3d"
              intensity={2}
              speed={0.5}
              distort={1.0}
              paused={false}
              offset={{ x: 0, y: 0 }}
              hoverDampness={0.25}
              rayCount={24}
              mixBlendMode="lighten"
              colors={['#8B5CF6', '#6366F1', '#06B6D4']}
            />
          </Suspense>
        </motion.div>
      )}

      {/* Ferrofluid Background specifically for Tech Stack Selection (Step 2) */}
      {step === 2 && !prefersReducedMotion && (
        <motion.div key="bg2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ opacity: 0.7 }}>
          <Suspense fallback={null}>
            <Ferrofluid
              className=""
              dpr={1}
              colors={['#4F46E5', '#06B6D4', '#E0F2FE']}
              speed={0.4}
              scale={1.2}
              turbulence={1.5}
              fluidity={0.15}
              rimWidth={0.25}
              sharpness={3.5}
              shimmer={1}
              glow={1.5}
              flowDirection="down"
              opacity={1}
              mouseInteraction={true}
              mouseStrength={1.2}
              mouseRadius={0.4}
              mixBlendMode="screen"
            />
          </Suspense>
        </motion.div>
      )}

      {/* Prism Background specifically for Typography Selection (Step 4) */}
      {step === 4 && !prefersReducedMotion && (
        <motion.div key="bg4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ opacity: 0.6 }}>
          <Suspense fallback={null}>
            <Prism 
              animationType="rotate"
              timeScale={0.1}
              height={4.5}
              baseWidth={6.5}
              scale={4.0}
              hueShift={-0.75}
              colorFrequency={0.2}
              noise={0.05}
              glow={0.6}
              transparent={true}
              hoverStrength={1.2}
              inertia={0.05}
              bloom={0.5}
              suspendWhenOffscreen={true}
            />
          </Suspense>
        </motion.div>
      )}

      {/* Aurora Background specifically for Describe Your App (Step 6) */}
      {step === 6 && !prefersReducedMotion && (
        <motion.div key="bg6" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ opacity: 0.8 }}>
          <Suspense fallback={null}>
            <Aurora
              colorStops={["#8B5CF6", "#6366F1", "#22D3EE"]}
              speed={0.25}
              blend={0.35}
              amplitude={0.7}
            />
          </Suspense>
        </motion.div>
      )}

      {/* Background System for other steps */}
      {step !== 1 && step !== 2 && step !== 3 && step !== 4 && step !== 5 && step !== 6 && (
      <motion.div key="bgother" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}} className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Subtle Scan Lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiLz48L3N2Zz4=')] opacity-30" />
        
        {/* Seamless Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(circle_at_center,black_50%,transparent_95%)]" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
           {Array.from({ length: 20 }).map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-1 h-1 rounded-full bg-cyan-500/30 blur-[1px]"
               initial={{
                 x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                 y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
               }}
               animate={{
                 y: [null, Math.random() * -100 - 50],
                 opacity: [0, 0.5, 0],
               }}
               transition={{
                 duration: Math.random() * 10 + 10,
                 repeat: Infinity,
                 ease: "linear",
                 delay: Math.random() * 10,
               }}
             />
           ))}
        </div>

        {/* Ambient Lighting */}
        <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vh] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vh] bg-purple-600/10 rounded-full blur-[140px]" />

        {/* Decorative Wireframes - Left (Web) */} <div id="section-platform" />
        <motion.div 
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] top-[25%] opacity-[0.04] text-white pointer-events-none"
        >
          {/* Globe */}
          <Globe className="w-32 h-32 absolute -top-16 -left-12" strokeWidth={1} />
          {/* Browser Window */}
          <div className="w-[280px] h-[200px] border-[1px] border-current rounded-2xl p-5 flex flex-col gap-4 rotate-[-6deg] bg-white/[0.01] backdrop-blur-[1px]">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-current" />
              <div className="w-2.5 h-2.5 rounded-full bg-current" />
              <div className="w-2.5 h-2.5 rounded-full bg-current" />
            </div>
            <div className="flex-1 border-[1px] border-current rounded-xl flex items-center justify-center overflow-hidden">
               <div className="w-20 h-16 border-[1px] border-current rounded-lg rotate-[10deg]" />
            </div>
          </div>
        </motion.div>

        {/* Decorative Wireframes - Right (Android) */}
        <motion.div 
          animate={{ y: [8, -8, 8] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[8%] top-[20%] opacity-[0.04] text-white pointer-events-none"
        >
          {/* Android Head */}
          <div className="absolute -top-12 right-12 w-28 h-28 rotate-[12deg]">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
               <path d="M5 15V9a7 7 0 0 1 14 0v6" />
               <path d="M3 15h18" />
               <path d="M8 5l-2-2" />
               <path d="M16 5l2-2" />
               <circle cx="9" cy="10" r="1.5" fill="currentColor" />
               <circle cx="15" cy="10" r="1.5" fill="currentColor" />
             </svg>
          </div>
          {/* Phone */}
          <div className="w-[140px] h-[280px] border-[1px] border-current rounded-[2rem] p-3.5 rotate-[12deg] mt-16 bg-white/[0.01] backdrop-blur-[1px]">
            <div className="w-1/3 h-1.5 bg-current mx-auto rounded-full mb-4" />
            <div className="w-full h-full border-[1px] border-current rounded-[1.25rem] flex items-center justify-center overflow-hidden p-4">
              <div className="w-full h-28 border-[1px] border-current rounded-xl flex items-center justify-center">
                 <div className="w-10 h-8 border-[1px] border-current rounded-md" />
              </div>
            </div>
          </div>
          {/* Gear */}
          <Settings className="w-20 h-20 absolute -bottom-8 -left-8 rotate-[-15deg] opacity-70" strokeWidth={1} />
        </motion.div>

        {/* Blueprint connection lines & particles */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 40 Q 30 20, 50 50 T 100 60" fill="none" stroke="white" strokeWidth="0.1" />
            <path d="M0 70 Q 40 90, 60 60 T 100 40" fill="none" stroke="white" strokeWidth="0.1" />
            <circle cx="30" cy="35" r="0.2" fill="white" />
            <circle cx="70" cy="55" r="0.2" fill="white" />
            <circle cx="50" cy="80" r="0.2" fill="white" />
          </svg>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
