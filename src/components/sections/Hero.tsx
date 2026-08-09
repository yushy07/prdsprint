import { MouseEvent, useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { Zap, CheckCircle2, Sparkles, Code2, Box, Rocket, ArrowRight, Play } from "lucide-react";

const ROTATING_WORDS = [
  "Generate.",
  "Architect.",
  "Prototype.",
  "Develop.",
  "Optimize.",
  "Deploy.",
  "Launch.",
  "Ship.",
  "Scale.",
  "Transform.",
  "Automate.",
  "Deliver."
];

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentWord = ROTATING_WORDS[index];

  return (
    <span 
      className="relative inline-flex items-center justify-center overflow-visible py-1.5 px-2" 
      style={{ perspective: "1000px" }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ rotateX: -90, opacity: 0, filter: "blur(4px)" }}
          animate={{ rotateX: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ rotateX: 90, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#8B5CF6] whitespace-nowrap px-2 py-1 -mx-2 -my-1"
          style={{ 
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50% -40px"
          }}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const features = [
  { 
    title: "30s Generation", 
    subtitle: "Blazing Fast", 
    icon: <Zap size={18} className="text-amber-400 fill-amber-400" />,
    borderHover: "hover:border-amber-400/50"
  },
  { 
    title: "Ready to Build", 
    subtitle: "Developer Ready", 
    icon: <CheckCircle2 size={18} className="text-emerald-400" />,
    borderHover: "hover:border-emerald-400/50"
  },
  { 
    title: "AI Optimized", 
    subtitle: "Smart Output", 
    icon: <Sparkles size={18} className="text-blue-400 fill-blue-400" />,
    borderHover: "hover:border-blue-400/50"
  },
  { 
    title: "Code-Ready", 
    subtitle: "Clean & Structured", 
    icon: <Code2 size={18} className="text-purple-400" />,
    borderHover: "hover:border-purple-400/50"
  },
  { 
    title: "Smart Parsing", 
    subtitle: "Accurate & Precise", 
    icon: <Box size={18} className="text-pink-400" />,
    borderHover: "hover:border-pink-400/50"
  },
  { 
    title: "Instant Export", 
    subtitle: "Markdown, ZIP & More",
    icon: <Rocket size={18} className="text-rose-400" />,
    borderHover: "hover:border-rose-400/50"
  }
];

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center pt-navbar-offset pb-20 overflow-x-clip overflow-y-visible bg-transparent"
      onMouseMove={handleMouseMove}
    >
      {/* Perspective Grid Background */}
      <div 
        className="absolute -inset-y-[150px] inset-x-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4f4f4f 1px, transparent 1px),
            linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          transform: 'perspective(1000px) rotateX(60deg) scale(2.5) translateY(10%)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
        }}
      />

      {/* Background Star Particles */}
      <div className="absolute -inset-y-[150px] inset-x-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-screen" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }} />

      {/* Sweeping Glowing Lines */}
      {/* Left Purple/Pink Line */}
      <motion.div
        className="absolute left-[-20%] top-[25%] w-[60%] h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent blur-[2px] opacity-70 transform -rotate-12"
        style={{
          y: useTransform(smoothY, [-1, 1], [-30, 30]),
          x: useTransform(smoothX, [-1, 1], [-30, 30]),
        }}
      />
      <motion.div
        className="absolute left-[-10%] top-[15%] w-[40%] h-[200px] bg-fuchsia-600/30 blur-[120px] rounded-full transform -rotate-12 pointer-events-none mix-blend-screen"
        style={{
          y: useTransform(smoothY, [-1, 1], [-30, 30]),
          x: useTransform(smoothX, [-1, 1], [-30, 30]),
        }}
      />

      {/* Right Cyan/Blue Line */}
      <motion.div
        className="absolute right-[-20%] top-[45%] w-[60%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px] opacity-70 transform rotate-12"
        style={{
          y: useTransform(smoothY, [-1, 1], [30, -30]),
          x: useTransform(smoothX, [-1, 1], [30, -30]),
        }}
      />
      <motion.div
        className="absolute right-[-10%] top-[35%] w-[40%] h-[200px] bg-cyan-500/30 blur-[120px] rounded-full transform rotate-12 pointer-events-none mix-blend-screen"
        style={{
          y: useTransform(smoothY, [-1, 1], [30, -30]),
          x: useTransform(smoothX, [-1, 1], [30, -30]),
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full max-w-5xl"
        >
          {/* Headline */}
          <h1 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.75rem] 2xl:text-[6.5rem] font-bold tracking-[-0.02em] text-white leading-[1.15] mb-6 sm:mb-8 py-2 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center" 
            style={{ wordSpacing: '0.05em' }}
          >
            <span className="block whitespace-nowrap px-2 py-1">
              Create. Build.
            </span>
            <span className="block w-full text-center px-2 py-1">
              <RotatingText />
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-medium max-w-2xl leading-relaxed mb-8 sm:mb-10 lg:mb-12">
            Turn any idea into a developer-ready PRD in seconds —<br className="hidden sm:block" />
            structured specs, exact tech stack, design system, and AI-optimized output.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 mb-10 sm:mb-14 lg:mb-16 w-full sm:w-auto max-w-[320px] sm:max-w-none">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <Link to="/builder" className="relative flex items-center justify-center gap-2 h-12 sm:h-13 lg:h-14 px-6 sm:px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white text-base sm:text-lg font-bold rounded-xl transition-all w-full sm:w-auto shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                Generate Free PRD <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
            
            <button className="flex items-center justify-center gap-3 h-12 sm:h-13 lg:h-14 px-6 sm:px-8 bg-[#0A0A0B]/60 hover:bg-[#1A1A1D] border border-white/10 hover:border-white/30 text-gray-300 hover:text-white text-base sm:text-lg font-semibold rounded-xl transition-all w-full sm:w-auto backdrop-blur-md group">
              See How It Works 
              <div className="flex items-center justify-center w-6 sm:w-7 h-6 sm:h-7 rounded-full border border-gray-500 group-hover:border-white transition-colors">
                <Play className="w-2.5 sm:w-3 h-2.5 sm:h-3 ml-0.5 fill-current" />
              </div>
            </button>
          </div>

          {/* Feature Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap justify-center items-center gap-3 lg:gap-4 w-full">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5 p-3.5 sm:p-4 bg-[#0A0A0B]/60 backdrop-blur-xl border border-white/5 rounded-xl text-left transition-all duration-300 ${feature.borderHover} cursor-default lg:min-w-[175px] xl:min-w-[190px] shadow-lg`}
              >
                <div className="flex-shrink-0 flex items-center justify-center w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 rounded-lg bg-white/5 shadow-inner">
                  {feature.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-[13px] font-bold text-gray-200">{feature.title}</span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-gray-500">{feature.subtitle}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
