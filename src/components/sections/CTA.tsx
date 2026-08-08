// @ts-nocheck
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { BrandLogoChip } from "@/components/ui/BrandIcon";
import { ArrowRight, Play, Zap, Sparkles, Code2, MonitorPlay, DownloadCloud, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

function DocumentAsset({ type }: { type: string }) {
  if (type === "markdown") {
    return (
      <div className="w-full h-full flex flex-col gap-1.5 p-3">
        <div className="w-1/3 h-1.5 bg-blue-400/40 rounded-full mb-1" />
        <div className="w-3/4 h-1 bg-white/20 rounded-full" />
        <div className="w-full h-1 bg-white/20 rounded-full" />
        <div className="w-5/6 h-1 bg-white/20 rounded-full" />
        <div className="w-1/2 h-1 bg-white/10 rounded-full mt-2" />
        <div className="w-2/3 h-1 bg-white/10 rounded-full" />
      </div>
    );
  }
  if (type === "flowchart") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-2">
        <div className="w-8 h-4 border border-cyan-400/30 rounded-md" />
        <div className="w-0.5 h-3 bg-white/20" />
        <div className="flex gap-2">
          <div className="w-6 h-4 border border-purple-400/30 rounded-md" />
          <div className="w-6 h-4 border border-blue-400/30 rounded-md" />
        </div>
      </div>
    );
  }
  if (type === "wireframe") {
    return (
      <div className="w-full h-full flex flex-col gap-1 p-2 border border-white/5 rounded-lg">
        <div className="w-full h-3 border-b border-white/5 flex items-center px-1 gap-1">
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="w-1 h-1 rounded-full bg-white/20" />
        </div>
        <div className="flex-1 flex gap-1 mt-1">
          <div className="w-1/4 h-full bg-white/5 rounded-sm" />
          <div className="flex-1 h-full flex flex-col gap-1">
            <div className="w-full h-1/2 bg-white/10 rounded-sm" />
            <div className="w-full h-1/2 flex gap-1">
              <div className="flex-1 bg-white/5 rounded-sm" />
              <div className="flex-1 bg-white/5 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type === "api") {
    return (
      <div className="w-full h-full flex flex-col gap-1 p-3 font-mono">
        <div className="text-[6px] text-purple-400/60">POST /api/v1/prd</div>
        <div className="text-[5px] text-white/30 ml-2">{"{"}</div>
        <div className="text-[5px] text-cyan-400/50 ml-4">"title": "App",</div>
        <div className="text-[5px] text-cyan-400/50 ml-4">"stack": "React"</div>
        <div className="text-[5px] text-white/30 ml-2">{"}"}</div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col gap-2 p-3">
      <div className="w-full h-1 bg-white/20 rounded-full" />
      <div className="w-3/4 h-1 bg-white/20 rounded-full" />
    </div>
  );
}

function LaunchSequenceBackground() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute -inset-y-[150px] inset-x-0 pointer-events-none select-none z-0 overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)' }}>
      {/* Central Radial Glow & Ambient Bloom */}
      <motion.div 
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(168,85,247,0.1) 50%, transparent 100%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full blur-[150px]"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated Blueprint Energy Rings & Orbital Lines */}
      <svg className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-20" viewBox="0 0 1000 1000">
        <motion.circle cx="500" cy="500" r="300" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 8"
          animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle cx="500" cy="500" r="450" fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="1" strokeDasharray="2 10"
          animate={{ rotate: -360 }} transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle cx="500" cy="500" r="600" fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="1" strokeDasharray="1 20"
          animate={{ rotate: 360 }} transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Connection lines between floating elements (approximate coords based on absolute positioning) */}
        <motion.path 
          d="M 150 300 Q 300 450 500 500"
          fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="0.5" strokeDasharray="5 5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 5, ease: "easeOut" }}
        />
        <motion.path 
          d="M 850 250 Q 700 400 500 500"
          fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="0.5" strokeDasharray="5 5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 5, ease: "easeOut" }}
        />
        <motion.path 
          d="M 200 700 Q 350 600 500 500"
          fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" strokeDasharray="5 5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 5, ease: "easeOut" }}
        />
        <motion.path 
          d="M 750 800 Q 650 650 500 500"
          fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="5 5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 5, ease: "easeOut" }}
        />
      </svg>

      {/* Subtle Moving Blueprint Dots & Grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Arrival Effect Pulse */}
      <AnimatePresence>
        {pulse && (
          <motion.div 
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "circOut" }}
          />
        )}
      </AnimatePresence>

      {/* Tech Elements and Connected Developer Assets */}
      {[
        { name: "React", type: "wireframe", x: "12%", y: "25%", docX: "5%", docY: "15%", delay: 0, rotate: 10 },
        { name: "Next.js", type: "markdown", x: "82%", y: "20%", docX: "75%", docY: "10%", delay: 1, rotate: -8 },
        { name: "Cursor", type: "api", x: "15%", y: "65%", docX: "8%", docY: "55%", delay: 2, rotate: -12 },
        { name: "GitHub Copilot", type: "flowchart", x: "75%", y: "70%", docX: "82%", docY: "75%", delay: 0.5, rotate: 15 },
        { name: "Node.js", type: "markdown", x: "25%", y: "85%", docX: "20%", docY: "95%", delay: 1.5, rotate: -5 }
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
        >
          {/* Tech Badge */}
          <motion.div
            className="absolute z-10"
            style={{ left: item.x, top: item.y }}
            animate={{ rotate: [item.rotate, item.rotate + 5, item.rotate] }}
            transition={{ duration: 10 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 blur-md rounded-full" />
              <BrandLogoChip name={item.name} />
              
              {/* Converging particles from badge */}
              <motion.div 
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400/50 rounded-full blur-[1px]"
                animate={{ 
                  x: [0, (window.innerWidth / 2) - parseInt(item.x) * (window.innerWidth/100)], 
                  y: [0, (window.innerHeight / 2) - parseInt(item.y) * (window.innerHeight/100)],
                  opacity: [0, 1, 0],
                  scale: [1, 0]
                }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeIn", delay: i * 1.5 }}
              />
            </div>
          </motion.div>

          {/* Connected Dev Asset */}
          <motion.div
            className="absolute w-24 h-32 bg-[#0A0A0C]/80 backdrop-blur-sm rounded-xl border border-white/5 opacity-40 hover:opacity-60 transition-opacity flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            style={{ left: item.docX, top: item.docY }}
            animate={{ rotate: [item.rotate - 10, item.rotate - 5, item.rotate - 10] }}
            transition={{ duration: 14 + i, repeat: Infinity, ease: "easeInOut", delay: item.delay + 1 }}
          >
            <DocumentAsset type={item.type} />
          </motion.div>
        </motion.div>
      ))}

      {/* Tiny Floating Particles converging */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-[1.5px] h-[1.5px] bg-white/40 rounded-full ${i > 15 ? "hidden md:block" : ""}`}
          
          initial={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0
          }}
          animate={{
            left: '50%',
            top: '50%',
            opacity: [0, 0.8, 0],
            scale: [1, 0.5]
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 8
          }}
        />
      ))}
    </div>
  );
}

function FeatureChip({ icon: Icon, text, delay }: { icon: any, text: string, delay: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      animate={isHovered ? { y: -2, scale: 1.02 } : { y: 0, scale: 1 }}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0A0C]/80 border border-white/5 backdrop-blur-md overflow-hidden group cursor-default transition-colors hover:border-white/20"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(40px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 100%)`
          )
        }}
      />
      <motion.div
        animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <Icon size={14} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
      </motion.div>
      <span className="text-[13px] font-medium text-gray-300 group-hover:text-white transition-colors">
        {text}
      </span>
    </motion.div>
  );
}

export function CTA() {
  return (
    <section className="py-16 sm:py-20 md:py-28 lg:py-32 2xl:py-40 relative bg-transparent overflow-x-clip overflow-y-visible flex items-center justify-center">
      <LaunchSequenceBackground />
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center max-w-4xl flex flex-col items-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.25rem] font-display font-bold tracking-[-0.015em] mb-4 sm:mb-6 leading-[1.18] py-2" style={{ wordSpacing: '0.05em' }}
        >
          <span className="text-white">Ready to stop prompting?</span>
          <br/>
          <span className="bg-gradient-to-r from-[#00B4D8] via-[#3B82F6] to-[#8B5CF6] text-transparent bg-clip-text mt-2 inline-block px-2 py-1 -mx-2 -my-1">
            Start building.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-base sm:text-[17px] max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 leading-relaxed"
        >
          Turn any idea into a developer-ready PRD in seconds — structured specs, exact tech stack, design system, and AI-optimized output.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-xl mx-auto relative"
        >
          {/* Radial glow beneath primary button */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/20 blur-[40px] pointer-events-none -z-10" />

          {/* Primary CTA */}
          <Link to="/builder" className="group relative flex items-center justify-center w-full sm:w-auto h-[52px] sm:h-[58px] lg:h-[60px] px-7 sm:px-9 lg:px-10 rounded-2xl font-display font-bold text-base lg:text-[17px] text-white shadow-[0_8px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div 
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
            />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles size={18} className="text-blue-100" />
              <span>Generate Free PRD</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Secondary Demo Button */}
          <button className="group w-full sm:w-auto h-[52px] sm:h-[58px] lg:h-[60px] px-7 sm:px-9 lg:px-10 rounded-2xl font-display font-medium text-base lg:text-[17px] text-white bg-[#0A0A0C]/80 border border-white/10 hover:bg-[#12121A] hover:border-white/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl flex items-center justify-center gap-3">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite] pointer-events-none" />
            
            <div className="relative w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              {/* Expanding pulse */}
              <motion.div 
                className="absolute inset-0 border border-white/20 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <Play size={12} className="text-white ml-0.5" fill="currentColor" />
            </div>
            <span>Watch 1 Minute Demo</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-sm text-gray-500 font-medium"
        >
          Generate your first production-ready PRD in under 30 seconds.
        </motion.div>

        {/* Feature Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
          <FeatureChip icon={Zap} text="30s Generation" delay={0.4} />
          <FeatureChip icon={Sparkles} text="AI Optimized" delay={0.5} />
          <FeatureChip icon={Code2} text="Smart Parsing" delay={0.6} />
          <FeatureChip icon={MonitorPlay} text="Code-Ready" delay={0.7} />
          <FeatureChip icon={DownloadCloud} text="Instant Export" delay={0.8} />
        </div>
      </div>
    </section>
  );
}
