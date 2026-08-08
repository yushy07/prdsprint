// @ts-nocheck
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { Bot, Layers, Palette, LayoutTemplate, FileArchive, FileType, Smartphone, Zap, MessageSquare, FileText, Package } from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { useEffect, useState, MouseEvent } from "react";

function BlueprintBackground() {
  return (
    <div className="absolute -inset-y-[150px] inset-x-0 pointer-events-none select-none z-0" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
      {/* Base Grid */}
      <motion.div 
        className="absolute -inset-[100px] opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{ x: [0, -40], y: [0, -40] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Micro-grain */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Architectural Cyan Lines */}
      <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-cyan-500/10" />
      <div className="absolute right-[30%] top-0 bottom-0 w-[1px] bg-cyan-500/10" />
      <div className="absolute top-[40%] left-0 right-0 h-[1px] bg-cyan-500/10" />
      
      {/* Node Intersections */}
      <div className="absolute left-[20%] top-[40%] w-2 h-2 -translate-x-1/2 -translate-y-1/2 border border-cyan-500/30 rounded-full" />
      <div className="absolute right-[30%] top-[40%] w-2 h-2 -translate-x-1/2 -translate-y-1/2 border border-cyan-500/30 rounded-full" />
      
      <motion.div 
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[20%] top-[40%] w-[2px] h-[2px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.5)]" 
      />
      <motion.div 
        animate={{ opacity: [0.8, 0.3, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[30%] top-[40%] w-[2px] h-[2px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.5)]" 
      />

      {/* Blueprint Crosses */}
      <div className="absolute left-[10%] top-[20%] text-cyan-500/30 text-xs font-mono select-none">+</div>
      <div className="absolute right-[15%] top-[70%] text-cyan-500/30 text-xs font-mono select-none">+</div>
      <div className="absolute left-[40%] bottom-[20%] text-cyan-500/30 text-xs font-mono select-none">+</div>

      {/* Scanline */}
      <motion.div 
        className="absolute left-0 right-0 h-[2px] bg-cyan-500/5 blur-[1px]"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Corner Registration Marks */}
      <div className="absolute top-12 left-12 w-4 h-4 border-t border-l border-cyan-500/20" />
      <div className="absolute top-12 right-12 w-4 h-4 border-t border-r border-cyan-500/20" />
      <div className="absolute bottom-12 left-12 w-4 h-4 border-b border-l border-cyan-500/20" />
      <div className="absolute bottom-12 right-12 w-4 h-4 border-b border-r border-cyan-500/20" />
    </div>
  );
}

const features = [
  { 
    id: "ai-prd",
    icon: Bot, 
    title: "AI PRD Generation", 
    desc: "Turn raw ideas into structured developer-ready specs instantly with the power of AI.",
    color: "cyan",
    featured: true
  },
  { 
    id: "stacks",
    icon: Layers, 
    title: "Multiple Tech Stacks", 
    desc: "Support for React, Next.js, Node, Python, MongoDB and more.",
    logos: ["React", "Next.js", "Node.js"],
    color: "emerald"
  },
  { 
    id: "design",
    icon: Palette, 
    title: "Design System Generation", 
    desc: "Consistent tokens, colors, typography, and components — generated for you.",
    color: "purple"
  },
  { 
    id: "arch",
    icon: LayoutTemplate, 
    title: "Architecture Docs", 
    desc: "Clear system diagrams, architecture overviews, and technical documentation.",
    color: "amber"
  },
  { 
    id: "zip",
    icon: FileArchive, 
    title: "ZIP Export", 
    desc: "Download all structured files and assets in a single, organized package.",
    color: "teal"
  },
  { 
    id: "pdf",
    icon: FileType, 
    title: "PDF + MD Output", 
    desc: "Shareable PDF and Markdown formats for your entire team and stakeholders.",
    color: "rose"
  },
  { 
    id: "platforms",
    icon: Smartphone, 
    title: "Android & Web Support", 
    desc: "Generate PRDs optimized for both Android apps and web platforms.",
    color: "blue"
  },
  { 
    id: "fast",
    icon: Zap, 
    title: "Lightning Fast", 
    desc: "Generate complete, production-ready PRDs in under 30 seconds.",
    color: "lime"
  }
];

const colorMap: Record<string, { light: string, dark: string, border: string, glow: string, bg: string }> = {
  cyan: { light: "text-cyan-400", dark: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "rgba(6,182,212,0.15)", bg: "rgba(6,182,212,0.2)" },
  emerald: { light: "text-emerald-400", dark: "bg-emerald-500/10", border: "border-emerald-500/30", glow: "rgba(16,185,129,0.12)", bg: "rgba(16,185,129,0.2)" },
  purple: { light: "text-purple-400", dark: "bg-purple-500/10", border: "border-purple-500/30", glow: "rgba(168,85,247,0.12)", bg: "rgba(168,85,247,0.2)" },
  amber: { light: "text-amber-400", dark: "bg-amber-500/10", border: "border-amber-500/30", glow: "rgba(245,158,11,0.12)", bg: "rgba(245,158,11,0.2)" },
  teal: { light: "text-teal-400", dark: "bg-teal-500/10", border: "border-teal-500/30", glow: "rgba(20,184,166,0.12)", bg: "rgba(20,184,166,0.2)" },
  rose: { light: "text-rose-400", dark: "bg-rose-500/10", border: "border-rose-500/30", glow: "rgba(244,63,94,0.12)", bg: "rgba(244,63,94,0.2)" },
  blue: { light: "text-blue-400", dark: "bg-blue-500/10", border: "border-blue-500/30", glow: "rgba(59,130,246,0.12)", bg: "rgba(59,130,246,0.2)" },
  lime: { light: "text-lime-400", dark: "bg-lime-500/10", border: "border-lime-500/30", glow: "rgba(132,204,22,0.12)", bg: "rgba(132,204,22,0.2)" },
};

function FeaturedAnimation() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage(s => (s + 1) % 4);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute right-4 top-4 w-32 h-12 flex items-center justify-end gap-1.5 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-10">
      <motion.div
        animate={{ scale: stage === 0 ? 1.1 : 1, opacity: stage === 0 ? 1 : 0.3 }}
        className="w-5 h-5 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
      >
        <MessageSquare size={10} />
      </motion.div>
      <div className="w-3 h-[1px] bg-gradient-to-r from-cyan-500/50 to-blue-500/50" />
      <motion.div
        animate={{ scale: stage === 1 || stage === 2 ? 1.1 : 1, opacity: stage === 1 || stage === 2 ? 1 : 0.3 }}
        className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.4)]"
      >
        <Bot size={10} />
      </motion.div>
      <div className="w-3 h-[1px] bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
      <motion.div
        animate={{ scale: stage === 3 ? 1.1 : 1, opacity: stage === 3 ? 1 : 0.3 }}
        className="w-5 h-5 rounded bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
      >
        <Package size={10} />
      </motion.div>
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: any, index: number, key?: string | number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const colors = colorMap[feature.color];

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      className={`relative group p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-[24px] flex flex-col h-full bg-[#0A0A0C]/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2`}
      style={{
        boxShadow: `0 8px 30px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.03)`
      }}
    >
      {/* Background radial gradient based on mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-700 group-hover:opacity-70"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${colors.glow},
              transparent 80%
            )
          `,
        }}
      />

      {/* Featured Card Persistent Subtle Glow */}
      {feature.featured && (
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/[0.02] pointer-events-none" />
      )}

      {/* Subtle light sweep across top edge on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Layered Borders */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.04] group-hover:border-white/[0.1] transition-colors duration-700 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl border-t border-white/[0.08] group-hover:border-white/[0.2] transition-colors duration-700 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl border-b border-black/80 pointer-events-none" />
      
      {/* Corner Brackets */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Blueprint Texture inside card */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 mix-blend-overlay rounded-2xl pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Featured Animation (Only for primary card) */}
      {feature.featured && <FeaturedAnimation />}

      {/* Icon Container */}
      <div className="relative mb-6 z-10 w-12 h-12">
        <motion.div 
          className={`absolute inset-0 rounded-xl flex items-center justify-center ${colors.dark} border ${colors.border} shadow-[inset_0_1px_3px_rgba(255,255,255,0.15),_0_4px_15px_rgba(0,0,0,0.5)]`}
          whileHover={{ y: -4, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <feature.icon size={22} className={`${colors.light} drop-shadow-[0_0_8px_currentColor]`} />
        </motion.div>
        {/* Soft radial glow under icon */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: colors.bg }} 
        />
      </div>

      <div className="mt-auto relative z-10">
        {/* Subtle divider */}
        <div className="h-px w-8 bg-gradient-to-r from-white/10 to-transparent mb-4 group-hover:w-16 transition-all duration-700 ease-out" />
        
        <h3 className="text-[16px] md:text-[17px] font-bold text-gray-100 mb-2 tracking-normal" style={{ wordSpacing: '0.05em' }}>{feature.title}</h3>
        <p className="text-[13px] md:text-[14px] text-gray-400/90 leading-relaxed font-medium">
          {feature.desc}
        </p>
        {feature.logos && (
          <div className="flex items-center gap-2 mt-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
            {feature.logos.map((logo: string) => (
              <BrandIcon key={logo} name={logo} className="w-4 h-4 text-gray-300" />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-14 sm:py-18 md:py-24 lg:py-28 2xl:py-32 relative bg-transparent overflow-x-clip overflow-y-visible">
      <BlueprintBackground />
      <div className="container mx-auto px-4 sm:px-6 max-w-[1200px] relative z-10">
        <div className="flex flex-col items-center mb-10 sm:mb-14 md:mb-16">
          <ChapterMarker number="01" title="Features" className="mb-0" />
        </div>
        
        <div className="flex md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
          {features.map((feature, i) => (
            <div key={feature.id} className="snap-center shrink-0 w-[85vw] sm:w-auto h-full">
              <FeatureCard feature={feature} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
