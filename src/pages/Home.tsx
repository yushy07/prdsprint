/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import { Hero } from "@/components/sections";
import { ProblemAndStructure } from "@/components/sections";
import { HowItWorks } from "@/components/sections";
import { Generator } from "@/components/sections";
import { OutputPackage } from "@/components/sections";
import { WorksEverywhere } from "@/components/sections";
import { TrustStrip } from "@/components/sections";
import { Features } from "@/components/sections";
import { Pricing } from "@/components/sections";
import { FAQ } from "@/components/sections";
import { CTA } from "@/components/sections";
import { motion, useScroll, useTransform } from "motion/react";
import GridScan from "@/components/effects/GridScan";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // 4 items (h-3 = 12px) + 3 gaps (gap-3 = 12px) = 48 + 36 = 84px total height.
  // Active indicator (h-8 = 32px) max travel distance = 84 - 32 = 52px.
  const y = useTransform(scrollYProgress, [0, 1], [0, 52]);

  return (
    <div className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 flex-col gap-3 pointer-events-none z-50 mix-blend-difference hidden sm:flex h-[84px]">
      <div className="w-1 h-3 bg-secondary rounded-full"></div>
      <div className="w-1 h-3 bg-secondary rounded-full"></div>
      <div className="w-1 h-3 bg-secondary rounded-full"></div>
      <div className="w-1 h-3 bg-secondary rounded-full"></div>
      
      <motion.div 
        style={{ y }} 
        className="absolute top-0 left-0 w-1 h-8 bg-brand-primary rounded-full"
      />
    </div>
  );
}

function GlobalEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] select-none">
      {/* Edge Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#030305_120%)] opacity-80" />

      {/* Subtle Animated Grain */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Drifting Dust Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white/30 rounded-full"
          initial={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0
          }}
          animate={{
            x: [0, Math.random() * 60 - 30],
            y: [0, -(Math.random() * 100 + 50)],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
}

export function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const yOffset = -100;
          const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-[#030305] text-foreground selection:bg-brand-primary/30 font-sans selection:text-foreground relative">
          {/* Fullscreen Animated GridScan Background Layer */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80">
            <GridScan
              sensitivity={0.55}
              lineThickness={2.3}
              linesColor="#2F293A"
              scanColor="#b74ab5"
              scanOpacity={0.4}
              gridScale={0.11}
              lineStyle="solid"
              lineJitter={0.06}
              scanDirection="pingpong"
              noiseIntensity={0.01}
              scanGlow={0.5}
              scanSoftness={1.5}
              scanDuration={2}
              scanDelay={2}
              scanOnClick={false}
            />
          </div>
          <GlobalEffects />
          <Navbar />
          <ScrollProgress />
          <main className="relative z-10">
            <Hero />
            <TrustStrip />
            <Features />
            <ProblemAndStructure />
            <HowItWorks />
            <Generator />
            <OutputPackage />
            <WorksEverywhere />
            <Pricing />
            <FAQ />
            <CTA />
          </main>
          <Footer />
        </div>
    </ThemeProvider>
  );
}
