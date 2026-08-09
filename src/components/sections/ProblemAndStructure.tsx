import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { MessageSquare, FileText, Package } from "lucide-react";

// The messages and their idle positions in the chaos cloud (left area)
const CHAT_MESSAGES = [
  { text: "Use Firebase", x: "10%", y: "15%", delay: 0 },
  { text: "Actually use Supabase", x: "18%", y: "30%", delay: 0.2 },
  { text: "Make it responsive", x: "5%", y: "45%", delay: 0.4 },
  { text: "Switch to Next.js", x: "22%", y: "60%", delay: 0.6 },
  { text: "Add Authentication", x: "8%", y: "75%", delay: 0.8 },
  { text: "Use Tailwind", x: "15%", y: "90%", delay: 1.0 },
  { text: "Add Dark Mode", x: "25%", y: "20%", delay: 1.2 },
  { text: "Can you redesign?", x: "20%", y: "85%", delay: 1.4 },
  { text: "Optimize performance", x: "32%", y: "40%", delay: 1.6 },
  { text: "Build Android version", x: "12%", y: "55%", delay: 1.8 }
];

function AssemblyLabBackground() {
  return (
    <div className="absolute -inset-y-[150px] inset-x-0 pointer-events-none select-none z-0" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
      
      
      {/* Layer 1: Animated Grain */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Layer 2: Blueprint Texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Layer 3: Environment Assets (Graphs & Folders) */}
      <div className="absolute inset-0 opacity-[0.04]">
        {/* Wireframe UI Box */}
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[250px] border border-white/50 rounded-xl" />
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[40px] border-b border-white/50 flex items-center px-4 gap-2">
          <div className="w-2 h-2 rounded-full bg-white/50" />
          <div className="w-2 h-2 rounded-full bg-white/50" />
          <div className="w-2 h-2 rounded-full bg-white/50" />
        </div>
        
        {/* Dependency Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none" stroke="currentColor" fill="none">
           <path d="M 0 350 L 250 350 C 300 350, 300 450, 350 450 L 1000 450" strokeWidth="1" className="text-white/50" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
           <path d="M 0 650 L 350 650 C 400 650, 400 550, 450 550 L 1000 550" strokeWidth="1" className="text-cyan-400" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Tree hierarchy text */}
        <div className="absolute top-[60%] left-[8%] font-mono text-[10px] text-white/50 whitespace-pre">
          {`src/
  components/
    ui/
    sections/
  lib/
    utils.ts
  App.tsx`}
        </div>

        {/* Terminal Cursor Blink */}
        <motion.div 
          className="absolute bottom-[20%] left-[10%] w-2 h-4 bg-cyan-500/50"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Layer 5: Ambient Cinematic Lighting */}
      
      
      <motion.div 
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-cyan-900/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function TransformationCore({ className }: { className?: string }) {
  return (
    <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] flex items-center justify-center pointer-events-none z-10">
      {/* Holographic Chamber / Energy */}
      <motion.div 
        className="absolute w-[180px] h-[180px] rounded-full bg-[conic-gradient(from_0deg,_transparent,_rgba(0,255,255,0.1),_transparent)] blur-[10px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Rotating Tech Rings */}
      <motion.div 
        className="absolute w-[250px] h-[250px] rounded-full border border-cyan-500/20 border-l-cyan-400/50"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute w-[300px] h-[300px] rounded-full border border-blue-500/10 border-r-blue-400/40 border-dashed"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Scanning Beam */}
      <motion.div 
        className="absolute w-[200px] h-[2px] bg-cyan-400/40 blur-[2px]"
        animate={{ y: [-120, 120, -120], opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Circuitry Nodes Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
        <path d="M 200 50 L 200 100 M 350 200 L 300 200 M 200 350 L 200 300 M 50 200 L 100 200" stroke="currentColor" className="text-cyan-500" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}

function DeveloperPackage({ pulse, className }: { pulse?: boolean, className?: string }) {
  return (
    <motion.div 
      className={className || "absolute right-[8%] top-[50%] -translate-y-1/2 w-[320px] rounded-2xl bg-[#0A0A0B]/60 backdrop-blur-xl border p-6 flex flex-col gap-4 z-20"}
      animate={{ 
        scale: pulse ? 1.05 : 1, 
        borderColor: pulse ? "rgba(0, 255, 255, 0.4)" : "rgba(255,255,255,0.1)",
        boxShadow: pulse ? "0 0 40px rgba(0,255,255,0.2)" : "0 20px 40px rgba(0,0,0,0.5)"
      }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
          <Package size={24} className="text-cyan-400" />
        </div>
        <div>
          <h3 className="text-white font-medium text-[15px]">PRDSprint_PRD_Package.zip</h3>
          <p className="text-cyan-400/80 text-[11px] font-mono mt-1 tracking-wider uppercase">Ready for production</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-2.5 font-mono text-[11px] text-white/50 ml-2">
        <div className="flex items-center gap-3 hover:text-cyan-300 transition-colors"><FileText size={14} /> ├── overview.md</div>
        <div className="flex items-center gap-3 hover:text-cyan-300 transition-colors"><FileText size={14} /> ├── features-functionality.md</div>
        <div className="flex items-center gap-3 hover:text-cyan-300 transition-colors"><FileText size={14} /> ├── tech-architecture.md</div>
        <div className="flex items-center gap-3 hover:text-cyan-300 transition-colors"><FileText size={14} /> ├── theme-configuration.md</div>
        <div className="flex items-center gap-3 hover:text-cyan-300 transition-colors"><FileText size={14} /> └── development-roadmap.md</div>
      </div>
    </motion.div>
  );
}

function ChaosBubble({ msg, index, activeIndex }: { msg: any, index: number, activeIndex: number, key?: string | number }) {
  const isActive = index === activeIndex;
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (isActive) {
      setStage(1); // Glow & Start Move (0s)
      const t1 = setTimeout(() => setStage(2), 1200); // Dissolve (1.2s)
      const t2 = setTimeout(() => setStage(0), 4000); // Reset at end of cycle
      return () => { clearTimeout(t1); clearTimeout(t2); }
    } else {
      setStage(0);
    }
  }, [isActive]);

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        left: stage === 0 ? msg.x : '50%',
        top: stage === 0 ? msg.y : '50%',
        x: stage === 0 ? 0 : '-50%',
        y: stage === 0 ? 0 : '-50%',
        scale: stage === 2 ? 0 : 1,
        opacity: stage === 2 ? 0 : (isActive ? 1 : 0.4),
        boxShadow: isActive ? "0 0 30px rgba(0, 255, 255, 0.4)" : "0 0 0px rgba(0,0,0,0)",
        borderColor: isActive ? "rgba(0, 255, 255, 0.6)" : "rgba(255,255,255,0.05)",
        zIndex: isActive ? 50 : 10
      }}
      transition={{ 
        duration: stage === 1 ? 1.0 : 0.5,
        ease: stage === 1 ? "easeInOut" : "easeOut"
      }}
      className="absolute px-5 py-2.5 rounded-xl border bg-[#0A0A0B]/80 text-[13px] backdrop-blur-md text-white whitespace-nowrap flex items-center gap-2.5 cursor-default transition-colors"
    >
      <MessageSquare size={14} className={isActive ? "text-cyan-400" : "text-white/30"} />
      {msg.text}
    </motion.div>
  );
}

function DocumentProjectile({ activeIndex }: { activeIndex: number }) {
  const [stage, setStage] = useState(0);
  
  useEffect(() => {
    setStage(0); // Hidden at center
    const t1 = setTimeout(() => setStage(1), 1500); // Appear at center, move to right
    const t2 = setTimeout(() => setStage(2), 2500); // Arrive at package and dissolve
    return () => { clearTimeout(t1); clearTimeout(t2); }
  }, [activeIndex]);

  return (
    <motion.div
      initial={false}
      animate={{
        left: stage === 0 ? '50%' : '76%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        scale: stage === 0 ? 0 : (stage === 1 ? 1 : 0.5),
        opacity: stage === 0 ? 0 : (stage === 1 ? 1 : 0),
      }}
      transition={{ 
        duration: stage === 1 ? 1.0 : 0.2,
        ease: "easeInOut" 
      }}
      className="absolute z-40 p-3 rounded-xl bg-blue-500/10 border border-blue-400/30 text-blue-300 shadow-[0_0_20px_rgba(0,100,255,0.3)] backdrop-blur-md"
    >
      <FileText size={28} />
    </motion.div>
  );
}

function ParticleBurst({ activeIndex }: { activeIndex: number }) {
  const [burst, setBurst] = useState(false);
  
  useEffect(() => {
    const t = setTimeout(() => setBurst(true), 1200); // Trigger when bubble dissolves
    const t2 = setTimeout(() => setBurst(false), 2000);
    return () => { clearTimeout(t); clearTimeout(t2); }
  }, [activeIndex]);

  if (!burst) return null;

  return (
    <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
       {[...Array(16)].map((_, i) => (
         <motion.div
           key={i}
           className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#00ffff]"
           initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
           animate={{
             x: (Math.random() - 0.5) * 250,
             y: (Math.random() - 0.5) * 250,
             opacity: 0,
             scale: 0
           }}
           transition={{ duration: 0.6 + Math.random() * 0.2, ease: "easeOut" }}
         />
       ))}
    </div>
  );
}

function MobileStoryEngine() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCycle(c => c + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const activeIndex = cycle % CHAT_MESSAGES.length;

  return (
    <div className="w-full flex flex-col items-center gap-12 py-8 relative">
       {/* Vertical connection line */}
       <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent left-1/2 -translate-x-1/2 z-0" />
       
       {/* Chaos Area */}
       <div className="relative z-10 w-full flex flex-col gap-4">
         {CHAT_MESSAGES.slice(0,3).map((msg, i) => (
           <div key={i} className={`px-4 py-3 rounded-xl border bg-[#0A0A0B]/80 text-[13px] backdrop-blur-md text-white/80 border-white/5 w-64 mx-auto flex items-center gap-3 transition-colors duration-500 ${i === activeIndex ? "border-cyan-500/50 shadow-[0_0_20px_rgba(0,255,255,0.2)] text-cyan-400" : ""}`}>
             <MessageSquare size={14} className={i === activeIndex ? "text-cyan-400" : "text-white/30"} />
             {msg.text}
           </div>
         ))}
       </div>

       {/* Core Area */}
       <div className="relative z-10 scale-75 h-[300px] w-[300px] flex items-center justify-center -my-10">
         <TransformationCore className="absolute inset-0 w-full h-full flex items-center justify-center z-30" />
       </div>

       {/* Package Area */}
       <div className="relative z-10">
         <DeveloperPackage className="w-[320px] max-w-[90vw] mx-auto rounded-2xl bg-[#0A0A0B]/60 backdrop-blur-xl border border-white/10 p-6 flex flex-col gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-20" />
       </div>
    </div>
  );
}

function StoryEngine() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle(c => c + 1);
    }, 4000); // 4 seconds per cycle
    return () => clearInterval(interval);
  }, []);

  const activeIndex = cycle % CHAT_MESSAGES.length;
  const [packagePulse, setPackagePulse] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPackagePulse(true), 2500); // When document arrives
    const t2 = setTimeout(() => setPackagePulse(false), 3000); // Reset pulse
    return () => { clearTimeout(t1); clearTimeout(t2); }
  }, [activeIndex]);

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[500px]">
      {/* 1. Chaos Area */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[35%] pointer-events-auto">
        {CHAT_MESSAGES.map((msg, i) => (
           <ChaosBubble key={i} msg={msg} index={i} activeIndex={activeIndex} />
        ))}
      </div>

      {/* 2. Core Area */}
      <TransformationCore />
      <ParticleBurst activeIndex={activeIndex} />
      <DocumentProjectile activeIndex={activeIndex} />

      {/* 3. Package Area */}
      <DeveloperPackage pulse={packagePulse} />
    </div>
  );
}

export function ProblemAndStructure() {
  const [scale, setScale] = useState(1);

  // Scale down the cinematic composition for smaller screens
  useEffect(() => {
    const handleResize = () => {
      const containerWidth = Math.min(window.innerWidth - 80, 1024); // Max 5xl minus container padding
      setScale(Math.min(containerWidth / 1024, 1));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative py-14 sm:py-18 md:py-24 lg:py-28 2xl:py-32 bg-transparent overflow-x-clip overflow-y-visible flex flex-col justify-center">
      <AssemblyLabBackground />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Floating Glass Container Panel */}
        <div className="w-full max-w-6xl mx-auto rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-[#08080D]/65 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.7),_0_0_40px_rgba(0,255,255,0.03)] p-5 sm:p-8 md:p-10 lg:p-14 relative overflow-hidden flex flex-col items-center text-center">
          {/* Subtle Top Highlight Edge Glow */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 via-blue-500/40 to-transparent pointer-events-none" />
          
          {/* Ambient Lighting inside Glass */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[110px] pointer-events-none" />

          <div className="w-full flex flex-col items-center text-center max-w-2xl relative z-10">
            <ChapterMarker number="02" title="We bring the structure." className="mb-0" />
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 sm:mt-6 md:mt-8 text-white/60 text-base sm:text-lg md:text-xl font-medium leading-relaxed"
            >
              Watch chaotic ideas and scattered requirements instantly organize into a clear, production-ready developer package.
            </motion.p>
          </div>
          
          {/* Scaling wrapper for mobile/desktop responsiveness */}
          <div className="w-full flex justify-center overflow-hidden mt-8 sm:mt-10 md:mt-12 relative z-10">
            <div 
              style={{ 
                transform: `scale(${scale})`, 
                transformOrigin: 'top center',
                width: 1024,
                height: 500 * scale
              }}
            >
              <StoryEngine />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
