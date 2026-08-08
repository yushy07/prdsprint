// @ts-nocheck
import { useEffect } from "react";
import { motion, useMotionValue, animate, useTransform, MotionValue } from "motion/react";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { Monitor, Code2, Palette, FileText, Sparkles, LucideIcon, Zap } from "lucide-react";

const STEPS = [
  { id: "01", label: "Platform", icon: Monitor, desc: "Pick Web or Android", color: "#3B82F6", colorRgba: "rgba(59, 130, 246" },
  { id: "02", label: "Tech Stack", icon: Code2, desc: "Choose your stack\nfrontend + backend", color: "#14B8A6", colorRgba: "rgba(20, 184, 166" },
  { id: "03", label: "Style", icon: Palette, desc: "Select your theme\nand design system", color: "#8B5CF6", colorRgba: "rgba(139, 92, 246" },
  { id: "04", label: "Description", icon: FileText, desc: "Describe your idea\nin detail", color: "#EC4899", colorRgba: "rgba(236, 72, 153" },
  { id: "05", label: "Generate", icon: Sparkles, desc: "AI processes and builds\nyour PRD instantly", color: "#F59E0B", colorRgba: "rgba(245, 158, 11" },
];

function WorkflowBackground() {
  return (
    <div className="absolute -inset-y-[150px] inset-x-0 pointer-events-none select-none z-0" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05050A] to-transparent opacity-80" />
      
      {/* Moving Blueprint Grid */}
      <motion.div 
        className="absolute -inset-[100px] opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{ y: [0, 40] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Ambient Colored Depth Lighting */}
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px]" />
      <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[100px]" />
    </div>
  );
}

function GenerateCompletion({ progress, step }: { progress: MotionValue<number>, step: any }) {
  const burstOpacity = useTransform(progress, [4.4, 4.6, 5.5, 6], [0, 1, 1, 0]);
  const burstScale = useTransform(progress, [4.4, 5.5], [0.8, 1.5]);
  const ringScale = useTransform(progress, [4.6, 5.5], [0.5, 2.5]);
  const ringOpacity = useTransform(progress, [4.6, 4.8, 5.5], [0, 1, 0]);

  return (
    <motion.div 
      className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden rounded-2xl"
    >
      <motion.div 
        className="absolute w-[200%] h-[200%] blur-3xl mix-blend-screen"
        style={{ opacity: burstOpacity, scale: burstScale, backgroundColor: `${step.colorRgba}, 0.2)` }}
      />
      <motion.div 
        className="absolute w-32 h-32 rounded-full border border-cyan-300"
        style={{ opacity: ringOpacity, scale: ringScale }}
      />
      {/* Confetti particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ opacity: burstOpacity }}
          animate={{
            x: [0, (Math.random() - 0.5) * 150],
            y: [0, (Math.random() - 0.5) * 150],
            scale: [1, 0],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            repeatDelay: 6, // Sync with 7-sec cycle (triggers roughly every cycle)
          }}
        />
      ))}
    </motion.div>
  );
}

function StepCard({ step, index, progress }: { step: typeof STEPS[0], index: number, progress: MotionValue<number>, key?: string | number }) {
  const activeIntensity = useTransform(progress,
    [index - 0.2, index + 0.2, index + 0.8, index + 1.2],
    [0, 1, 1, 0]
  );
  
  const isCompleted = useTransform(progress,
    [index + 0.8, index + 1.2, 6, 7],
    [0, 1, 1, 0]
  );
  
  const isFinal = index === 4;

  const cardBorderColor = useTransform(activeIntensity, [0, 1], ["rgba(255,255,255,0.05)", `${step.colorRgba}, 0.5)`]);
  const cardBgColor = useTransform(activeIntensity, [0, 1], ["rgba(10,10,12,0.6)", `${step.colorRgba}, 0.12)`]);
  const cardY = useTransform(activeIntensity, [0, 1], [0, -4]);
  
  // Numbered circle status
  const circleBorder = useTransform(activeIntensity, [0, 1], ["rgba(255,255,255,0.1)", `${step.colorRgba}, 1)`]);
  const circleBg = useTransform(activeIntensity, [0, 1], ["rgba(10,10,12,1)", `${step.colorRgba}, 0.2)`]);
  const circleText = useTransform(activeIntensity, [0, 1], ["rgba(255,255,255,0.4)", `${step.colorRgba}, 1)`]);

  return (
    <motion.div className="relative mt-4 h-full flex flex-col z-10 group" style={{ y: cardY }}>
      {/* Numbered Circle Status Indicator */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold z-30 transition-shadow duration-300 backdrop-blur-md"
        style={{ 
          borderColor: circleBorder,
          backgroundColor: circleBg,
          color: circleText,
          borderWidth: 1,
          scale: useTransform(activeIntensity, [0, 1], [1, 1.15]),
          boxShadow: useTransform(activeIntensity, [0, 1], ["0 0 0 rgba(0,0,0,0)", `0 0 20px ${step.colorRgba}, 0.6)`])
        }}
      >
        {step.id}
        {/* Completion pulse ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border border-white"
          style={{
            borderColor: step.color,
            scale: useTransform(isCompleted, [0, 0.2, 1], [1, 1.6, 1.6]),
            opacity: useTransform(isCompleted, [0, 0.2, 1], [0, 0.5, 0]),
          }}
        />
      </motion.div>

      {/* Card Body */}
      <motion.div 
        className="flex-1 flex flex-col items-center text-center px-4 py-8 rounded-2xl backdrop-blur-xl relative overflow-hidden"
        style={{
          borderWidth: 1,
          borderColor: cardBorderColor,
          backgroundColor: cardBgColor,
          boxShadow: useTransform(activeIntensity, [0, 1], ["0 8px 32px rgba(0,0,0,0.3)", `0 12px 40px ${step.colorRgba}, 0.2)`])
        }}
      >
        {/* Subtle blueprint pattern overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '12px 12px',
          }}
        />

        {/* Ambient colored lighting beneath card (radial gradient inside) */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none opacity-0"
          style={{
            opacity: activeIntensity,
            background: `radial-gradient(circle at 50% 0%, ${step.colorRgba}, 0.2), transparent 70%)`
          }}
        />

        {/* Icon Container */}
        <div className="relative w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-5 z-10 transition-transform duration-500 ease-out shadow-inner">
          <motion.div style={{ scale: useTransform(activeIntensity, [0, 1], [1, 1.1]) }}>
            <step.icon size={22} color={step.color} className="relative z-10" />
          </motion.div>
          
          {/* Active Icon Glow */}
          <motion.div 
            className="absolute inset-0 rounded-2xl blur-md pointer-events-none z-0"
            style={{ 
              backgroundColor: step.color,
              opacity: useTransform(activeIntensity, [0, 1], [0, 0.5]) 
            }}
          />
        </div>

        <h3 className="text-white font-semibold text-[16px] mb-2 tracking-normal z-10" style={{ wordSpacing: '0.05em' }}>{step.label}</h3>
        <p className="text-gray-400 text-[13px] leading-relaxed whitespace-pre-line z-10 max-w-[120px] mx-auto">{step.desc}</p>
        {step.logos && (
            <motion.div 
              className="flex justify-center items-center gap-2 mt-4 z-10"
              style={{ opacity: activeIntensity }}
            >
              {step.logos.map((logo: string) => (
                <BrandIcon key={logo} name={logo} className="w-4 h-4 text-white drop-shadow-md" />
              ))}
            </motion.div>
        )}
        
        {/* Generate specific completion animation */}
        {isFinal && (
           <GenerateCompletion progress={progress} step={step} />
        )}
      </motion.div>
    </motion.div>
  );
}

function MobileWorkflowConnector({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute top-[32px] bottom-0 left-[16px] w-[1px] z-0 md:hidden block">
      {/* Base dotted line */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 50%, transparent 50%)', backgroundSize: '1px 8px' }} />
      
      {/* Flowing energy pulse line */}
      <motion.div 
        className="absolute top-0 -translate-x-1/2 w-[2px] h-[25%] bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-[1px]"
        style={{
          top: useTransform(progress, [0, 5], ["-10%", "100%"]),
          opacity: useTransform(progress, [0, 0.2, 4.8, 5.2, 7], [0, 1, 1, 0, 0]),
        }}
      />
    </div>
  );
}

function WorkflowConnector({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute top-[16px] left-[10%] right-[10%] h-[1px] z-0 hidden md:block">
      {/* Base dotted line */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.15) 50%, transparent 50%)', backgroundSize: '8px 1px' }} />
      
      {/* Flowing energy pulse line */}
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 h-[2px] w-[25%] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]"
        style={{
          left: useTransform(progress, [0, 5], ["-10%", "100%"]),
          opacity: useTransform(progress, [0, 0.2, 4.8, 5.2, 7], [0, 1, 1, 0, 0]),
        }}
      />
      
      {/* Glowing data packets (tiny dots moving along) */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
          style={{
            left: useTransform(progress, p => {
              const adjustedP = p - (i * 0.1); 
              return `${(adjustedP / 5) * 100}%`;
            }),
            opacity: useTransform(progress, p => {
              const adjustedP = p - (i * 0.1);
              if (adjustedP < 0 || adjustedP > 5.2) return 0;
              return 1;
            })
          }}
        />
      ))}
    </div>
  );
}

export function HowItWorks() {
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, 7, {
      duration: 14,
      ease: "linear",
      repeat: Infinity,
    });
    return controls.stop;
  }, [progress]);

  return (
    <section id="how-it-works" className="py-14 sm:py-18 md:py-24 lg:py-28 2xl:py-32 relative bg-transparent overflow-x-clip overflow-y-visible">
      <WorkflowBackground />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Floating Glass Panel */}
        <div className="w-full max-w-6xl mx-auto rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-[#08080D]/65 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.7),_0_0_40px_rgba(59,130,246,0.03)] p-5 sm:p-8 md:p-10 lg:p-14 relative overflow-hidden">
          {/* Top Edge Glow */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 via-purple-500/40 to-transparent pointer-events-none" />
          
          {/* Ambient Lighting inside Glass */}
          <div className="absolute -top-24 right-1/4 w-[500px] h-[300px] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none" />

          <div className="relative z-10">
            <ChapterMarker number="03" title="How PRDSprint Works" className="mb-3 sm:mb-4" />
            <p className="text-center text-gray-400 mb-10 sm:mb-14 lg:mb-16 text-sm sm:text-base md:text-lg">From idea to complete PRD in five simple steps.</p>
            
            <div className="relative">
              <WorkflowConnector progress={progress} />
              <MobileWorkflowConnector progress={progress} />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-5 relative ml-6 md:ml-0">
                {STEPS.map((step, i) => (
                  <StepCard key={step.id} step={step} index={i} progress={progress} />
                ))}
              </div>
            </div>

            {/* Premium Status Bar */}
            <div className="flex justify-center mt-10 sm:mt-14 lg:mt-16">
              <div className="inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#0A0A0C]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                {/* Animated Light Sweep */}
                <motion.div 
                  className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                  animate={{ x: ["-200%", "400%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                />
                
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-blue-400 fill-blue-400" />
                  <span className="text-xs sm:text-[13px] font-medium text-gray-200 tracking-wide">AI-Powered</span>
                </div>
                <motion.span className="w-1 h-1 rounded-full bg-white/20" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
                <span className="text-xs sm:text-[13px] font-medium text-gray-400 tracking-wide">Fast</span>
                <motion.span className="w-1 h-1 rounded-full bg-white/20" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
                <span className="text-xs sm:text-[13px] font-medium text-gray-400 tracking-wide">Accurate</span>
                <motion.span className="w-1 h-1 rounded-full bg-white/20" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} />
                <span className="text-xs sm:text-[13px] font-medium text-gray-400 tracking-wide">Developer-Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
