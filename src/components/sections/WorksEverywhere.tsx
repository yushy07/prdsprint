import { motion, useAnimation, useMotionValue } from "motion/react";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { Code2, Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";

function EcosystemBackground() {
  return (
    <div className="absolute -inset-y-[150px] inset-x-0 pointer-events-none select-none z-0 overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05050A] to-transparent opacity-80" />

      {/* Blueprint grid */}
      <motion.div 
        className="absolute -inset-[100px] opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{ y: [0, -40] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Network Mesh / Curves */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 100">
        <motion.path 
          d="M 20 100 Q 50 50, 80 0"
          fill="none"
          stroke="rgba(59, 130, 246, 1)"
          strokeWidth="0.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M -10 30 Q 50 60, 110 30"
          fill="none"
          stroke="rgba(168, 85, 247, 1)"
          strokeWidth="0.3"
          strokeDasharray="2 2"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -20 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      
      {/* Floating ambient lights */}
      <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px]" />
      <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[100px]" />
      <div className="absolute bottom-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[100px]" />
    </div>
  );
}

const GENERATE_FOR = [
  { name: "React", label: "React", color: "text-[#61DAFB]", bgGlow: "rgba(97,218,251,0.5)" },
  { name: "Next.js", label: "Next.js", color: "text-white", bgGlow: "rgba(255,255,255,0.5)" },
  { name: "Vue", label: "Vue", color: "text-[#4FC08D]", bgGlow: "rgba(79,192,141,0.5)" },
  { name: "Svelte", label: "Svelte", color: "text-[#FF3E00]", bgGlow: "rgba(255,62,0,0.5)" },
  { name: "Kotlin", label: "Kotlin", color: "text-[#7F52FF]", bgGlow: "rgba(127,82,255,0.5)" },
  { name: "Compose", label: "Compose", color: "text-[#4285F4]", bgGlow: "rgba(66,133,244,0.5)" },
  { name: "Flutter", label: "Flutter", color: "text-[#02569B]", bgGlow: "rgba(2,86,155,0.5)" },
  { name: "Firebase", label: "Firebase", color: "text-[#FFCA28]", bgGlow: "rgba(255,202,40,0.5)" },
  { name: "Supabase", label: "Supabase", color: "text-[#3ECF8E]", bgGlow: "rgba(62,207,142,0.5)" },
  { name: "Node.js", label: "Node.js + SQL", color: "text-[#339933]", bgGlow: "rgba(51,153,51,0.5)" },
  { name: "PHP", label: "PHP + SQL", color: "text-[#777BB4]", bgGlow: "rgba(119,123,180,0.5)" },
];

const WORKS_WITH = [
  { name: "Cursor", label: "Cursor", color: "text-white", bgGlow: "rgba(255,255,255,0.5)" },
  { name: "Windsurf", label: "Windsurf", color: "text-[#00C4B6]", bgGlow: "rgba(0,196,182,0.5)" },
  { name: "Claude Code", label: "Claude Code", color: "text-[#D97757]", bgGlow: "rgba(217,119,87,0.5)" },
  { name: "Gemini CLI", label: "Gemini CLI", color: "text-[#1A73E8]", bgGlow: "rgba(26,115,232,0.5)" },
  { name: "GitHub Copilot", label: "GitHub Copilot", color: "text-white", bgGlow: "rgba(255,255,255,0.5)" },
];

function InteractiveLogo({ item, delay }: { item: any, delay: number, key?: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group cursor-default"
    >
      <div className="relative inline-flex items-center gap-3 px-4 py-2 bg-[#0A0A0C]/80 hover:bg-[#12121A] backdrop-blur-md border border-white/5 hover:border-white/20 rounded-xl transition-all duration-500 group-hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        {/* Soft breathing glow idle */}
        <motion.div 
          className="absolute inset-0 rounded-xl blur-md opacity-20 pointer-events-none z-0"
          style={{ backgroundColor: item.bgGlow }}
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 4 }}
        />
        
        {/* Hover intense glow */}
        <div 
          className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-0"
          style={{ backgroundColor: item.bgGlow }}
        />
        
        <BrandIcon name={item.name} className={`w-5 h-5 relative z-10 ${item.color} drop-shadow-[0_0_8px_currentColor]`} />
        <span className="text-[13px] font-semibold text-gray-300 group-hover:text-white transition-colors relative z-10">{item.label}</span>
      </div>
    </motion.div>
  );
}

export function WorksEverywhere() {
  return (
    <section className="py-14 sm:py-18 md:py-24 lg:py-28 2xl:py-32 relative overflow-x-clip overflow-y-visible bg-transparent">
      <EcosystemBackground />
      
      {/* Visual connection between cards */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[80%] max-w-[800px] h-[2px] hidden md:block z-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-sm"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-0 h-full w-[20%] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]"
          animate={{ left: ["-20%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Floating Glass Panel */}
        <div className="w-full max-w-6xl mx-auto rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-[#08080D]/65 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.7),_0_0_40px_rgba(168,85,247,0.03)] p-5 sm:p-8 md:p-10 lg:p-14 relative overflow-hidden">
          {/* Top Edge Glow */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 via-blue-500/40 to-transparent pointer-events-none" />
          
          {/* Ambient Lighting inside Glass */}
          <div className="absolute -top-24 right-1/4 w-[500px] h-[300px] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none" />

          <div className="relative z-10">
            <ChapterMarker number="06" title="Universal Compatibility" className="mb-3 sm:mb-4" />
            <p className="text-center text-gray-400 mb-10 sm:mb-12 lg:mb-16 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
              PRDSprint works seamlessly with your favorite tools and technologies.
            </p>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 relative">
              {/* Card 1: Generate For */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-5 sm:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-[#0A0A0C]/70 backdrop-blur-xl border border-white/10 relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                {/* Card inner gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />

                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-[#12121A] border border-white/10 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 relative group-hover:border-blue-500/30 transition-colors shadow-inner">
                  <Code2 size={24} className="text-blue-400" />
                  <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h4 className="font-display font-semibold text-xl sm:text-2xl mb-2.5 sm:mb-3 text-white">Generate For</h4>
                <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-xs">
                  Generate PRDs for your preferred frameworks, languages, and databases.
                </p>
                
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {GENERATE_FOR.map((item, i) => (
                    <InteractiveLogo key={item.name} item={item} delay={i * 0.05} />
                  ))}
                </div>
              </motion.div>

              {/* Card 2: Works With */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="p-5 sm:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-[#0A0A0C]/70 backdrop-blur-xl border border-white/10 relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                {/* Card inner gradient */}
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/[0.03] to-transparent pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.1),transparent_50%)] pointer-events-none" />

                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-[#12121A] border border-white/10 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 relative group-hover:border-purple-500/30 transition-colors shadow-inner">
                  <Bot size={24} className="text-purple-400" />
                  <div className="absolute inset-0 rounded-2xl bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h4 className="font-display font-semibold text-xl sm:text-2xl mb-2.5 sm:mb-3 text-white">Works With</h4>
                <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-xs">
                  Integrates with the tools you already use to streamline your workflow.
                </p>
                
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {WORKS_WITH.map((item, i) => (
                    <InteractiveLogo key={item.name} item={item} delay={0.2 + (i * 0.05)} />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Tagline */}
            <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
              <motion.div 
                className="inline-flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mr-1.5 sm:mr-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-300">One tool. Any stack.</span>
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">Total flexibility.</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent mix-blend-overlay"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
                  />
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
