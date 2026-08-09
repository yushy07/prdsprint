// @ts-nocheck
import { motion, AnimatePresence } from "motion/react";
import { BrandLogoChip } from "@/components/ui/BrandIcon";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { FolderOpen, Folder, FileText, Package, Download, CheckCircle2 } from "lucide-react";
import { MotionButton } from "@/components/ui/MotionButton";
import { useState, useEffect } from "react";

function DigitalArchiveBackground() {
  return (
    <div className="absolute -inset-y-[150px] inset-x-0 pointer-events-none select-none z-0" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
      {/* Base Gradient - Modified to blend seamlessly */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent" />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-[20%] left-[10%] opacity-[0.02] blur-sm text-cyan-100"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <Folder size={120} />
      </motion.div>
      <motion.div 
        className="absolute top-[60%] right-[15%] opacity-[0.02] blur-sm text-cyan-100"
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <FileText size={150} />
      </motion.div>
      <motion.div 
        className="absolute top-[40%] left-[40%] opacity-[0.015] blur-md text-cyan-100"
        animate={{ y: [0, -40, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <Package size={200} />
      </motion.div>

      {/* Code Snippets */}
      <motion.div 
        className="absolute top-[10%] right-[30%] opacity-[0.03] blur-[1px] font-mono text-[10px] text-cyan-300"
        animate={{ y: [0, -10, 0], opacity: [0.01, 0.03, 0.01] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <pre>{`interface AppState {
  user: User | null;
  settings: Theme;
}`}</pre>
      </motion.div>

      <motion.div 
        className="absolute bottom-[20%] left-[30%] opacity-[0.03] blur-[1px] font-mono text-[10px] text-blue-300"
        animate={{ y: [0, 15, 0], opacity: [0.01, 0.03, 0.01] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <pre>{`export function generatePRD() {
  return compile({
    format: 'zip',
    compress: true
  });
}`}</pre>
      </motion.div>

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
    </div>
  );
}

const OUTPUT_FILES = [
  "overview.md",
  "features-functionality.md",
  "tech-architecture.md",
  "theme-configuration.md",
  "ui-ux-guidelines.md",
  "development-roadmap.md"
];

const AGENTS = ["Cursor", "Claude Code", "Gemini CLI", "OpenAI Codex", "Windsurf"];

function PremiumPackagingAnimation() {
  const [phase, setPhase] = useState("reset");
  const [currentFileIndex, setCurrentFileIndex] = useState(-1);
  const [folderState, setFolderState] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    const runSequence = async () => {
      while (!isCancelled) {
        // Reset
        setPhase("reset");
        setFolderState(0);
        setCurrentFileIndex(-1);
        await new Promise(r => setTimeout(r, 1200));
        if (isCancelled) break;

        for (let i = 0; i < OUTPUT_FILES.length; i++) {
          setCurrentFileIndex(i);
          
          setPhase("file-appear");
          await new Promise(r => setTimeout(r, 600));
          if (isCancelled) break;

          setPhase("file-readable");
          await new Promise(r => setTimeout(r, 700));
          if (isCancelled) break;

          setPhase("file-slide");
          await new Promise(r => setTimeout(r, 1000));
          if (isCancelled) break;

          setPhase("folder-open");
          await new Promise(r => setTimeout(r, 400));
          if (isCancelled) break;

          setPhase("file-enter");
          await new Promise(r => setTimeout(r, 600));
          if (isCancelled) break;

          setPhase("folder-close");
          setFolderState(i + 1);
          await new Promise(r => setTimeout(r, 400));
          if (isCancelled) break;

          setPhase("file-pause");
          await new Promise(r => setTimeout(r, 600));
          if (isCancelled) break;
        }

        if (isCancelled) break;

        setPhase("folder-full-pause");
        await new Promise(r => setTimeout(r, 1800));
        if (isCancelled) break;

        setPhase("gather-energy");
        await new Promise(r => setTimeout(r, 800));
        if (isCancelled) break;

        setPhase("vibrate");
        await new Promise(r => setTimeout(r, 600));
        if (isCancelled) break;

        setPhase("compress");
        await new Promise(r => setTimeout(r, 800));
        if (isCancelled) break;

        setPhase("zip-emerge");
        await new Promise(r => setTimeout(r, 1400));
        if (isCancelled) break;

        setPhase("zip-settle");
        await new Promise(r => setTimeout(r, 700));
        if (isCancelled) break;

        setPhase("package-showcase");
        await new Promise(r => setTimeout(r, 2800));
        if (isCancelled) break;
      }
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, []);

  const isFolderOpen = phase === "folder-open" || phase === "file-enter";

  let folderAnimate = { scale: 1, opacity: 1, y: 0, rotate: 0, x: 0 };
  let folderGlow = 0;

  if (folderState === 1) folderAnimate.scale = 1.02;
  if (folderState === 2) folderAnimate.scale = 1.04;
  if (folderState >= 3) { folderAnimate.scale = 1.06; folderGlow = 0.4; }
  if (folderState === OUTPUT_FILES.length) { folderAnimate.scale = 1.08; folderGlow = 0.8; }

  if (phase === "gather-energy") {
    folderAnimate.scale = 1.15;
    folderGlow = 1.5;
  }
  if (phase === "vibrate") {
    folderAnimate.scale = 1.15;
    folderAnimate.x = [-4, 4, -4, 4, -2, 2, 0];
    folderAnimate.transition = { duration: 0.6 };
    folderGlow = 2;
  }
  if (phase === "compress") {
    folderAnimate.scale = 0.4;
    folderAnimate.opacity = 0.8;
    folderGlow = 3;
  }
  if (phase === "zip-emerge") {
    folderAnimate.scale = 0;
    folderAnimate.opacity = 0;
    folderAnimate.y = 50;
  }
  if (phase === "zip-settle" || phase === "package-showcase" || phase === "reset") {
    folderAnimate.scale = 0;
    folderAnimate.opacity = 0;
  }
  if (phase === "reset") {
    folderAnimate = { scale: 1, opacity: 1, y: 0, rotate: 0, x: 0 };
  }

  let packageAnimate = { y: 100, opacity: 0, scale: 0.8 };
  if (phase === "zip-emerge") {
    packageAnimate = { y: 20, opacity: 1, scale: 0.95 };
  } else if (phase === "zip-settle") {
    packageAnimate = { y: 0, opacity: 1, scale: 1.05 };
  } else if (phase === "package-showcase") {
    packageAnimate = { y: 0, opacity: 1, scale: 1 };
  } else if (phase === "reset") {
    packageAnimate = { y: -40, opacity: 0, scale: 0.9 };
  }

  const fileAnim = { y: -20, opacity: 0, scale: 0.8, rotate: 0 };
  if (phase === "file-appear") {
    fileAnim.y = -140;
    fileAnim.opacity = 1;
    fileAnim.scale = 1;
  } else if (phase === "file-readable") {
    fileAnim.y = -140;
    fileAnim.opacity = 1;
    fileAnim.scale = 1.05;
  } else if (phase === "file-slide") {
    fileAnim.y = -70;
    fileAnim.opacity = 1;
    fileAnim.scale = 0.9;
    fileAnim.rotate = 5;
  } else if (phase === "folder-open") {
    fileAnim.y = -60;
    fileAnim.opacity = 1;
    fileAnim.scale = 0.85;
    fileAnim.rotate = 8;
  } else if (phase === "file-enter") {
    fileAnim.y = 10;
    fileAnim.opacity = 0;
    fileAnim.scale = 0.5;
    fileAnim.rotate = 0;
  } else {
    fileAnim.opacity = 0;
  }

  return (
    <div className="relative h-full min-h-[300px] sm:min-h-[330px] w-full bg-[#0A0A0C]/80 backdrop-blur-xl border border-white/[0.05] rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6),_inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center overflow-hidden p-4">
      
      {/* Background depth layers */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />
      {/* Scanline */}
      <motion.div 
        className="absolute left-0 right-0 h-[2px] bg-cyan-500/10 blur-[2px]"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      {/* Blueprint dots */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Central Animation Area */}
      <div className="relative w-full h-[220px] flex flex-col items-center justify-center z-10 pointer-events-none">
        
        {/* FOLDER */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div 
            className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
            animate={folderAnimate}
            transition={folderAnimate.transition || { type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Folder Glow */}
            <motion.div 
              className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-xl"
              animate={{ opacity: folderGlow }}
            />
            <motion.div
              className="relative w-full h-full bg-[#0A0A0C]/90 rounded-2xl border flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md overflow-hidden"
              animate={{ 
                borderColor: folderState >= OUTPUT_FILES.length ? "rgba(6,182,212,0.6)" : "rgba(6,182,212,0.2)",
                boxShadow: folderState >= OUTPUT_FILES.length ? "0 0 50px rgba(6,182,212,0.4)" : "0 0 30px rgba(6,182,212,0.15)"
              }}
            >
              {isFolderOpen ? (
                <FolderOpen size={44} className="text-cyan-400 relative z-20" />
              ) : (
                <Folder size={44} className="text-cyan-400 relative z-20" />
              )}
              
              {/* Silhouette inside folder */}
              {folderState >= OUTPUT_FILES.length - 1 && (
                <div className="absolute top-1.5 w-10 h-12 border border-cyan-400/30 rounded bg-cyan-500/10 opacity-60 flex items-center justify-center z-10">
                   <FileText size={16} className="text-cyan-400/50" />
                </div>
              )}

              {/* Tiny indicators */}
              {folderState > 0 && (
                 <div className="absolute bottom-2 flex gap-1 z-20">
                   {[...Array(OUTPUT_FILES.length)].map((_, i) => (
                      <div key={i} className={`w-1 h-1 rounded-full ${i < folderState ? 'bg-cyan-400 shadow-[0_0_5px_#00ffff]' : 'bg-white/10'}`} />
                   ))}
                 </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* COMPRESSION PARTICLES */}
        <AnimatePresence>
          {(phase === "gather-energy" || phase === "vibrate" || phase === "compress") && (
             <motion.div 
               className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
             >
               {[...Array(8)].map((_, i) => (
                 <motion.div
                   key={i}
                   className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#00ffff]"
                   initial={{ 
                     x: Math.cos(i * Math.PI / 4) * 150, 
                     y: Math.sin(i * Math.PI / 4) * 150,
                     opacity: 0
                   }}
                   animate={{ 
                     x: 0, y: 0, opacity: [0, 1, 0] 
                   }}
                   transition={{ 
                     duration: 1.2, 
                     repeat: Infinity, 
                     delay: i * 0.1, 
                     ease: "easeIn" 
                   }}
                 />
               ))}
             </motion.div>
          )}
        </AnimatePresence>

        {/* ACTIVE FILE */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111115]/95 backdrop-blur-md border border-cyan-500/40 px-3.5 py-1.5 rounded-lg shadow-[0_15px_30px_rgba(0,0,0,0.8)] flex items-center gap-2 text-xs font-mono text-cyan-50 whitespace-nowrap z-30"
          animate={fileAnim}
          transition={{ 
            type: "spring", 
            stiffness: 120, 
            damping: 18, 
            opacity: { duration: 0.3 } 
          }}
        >
          <FileText size={14} className="text-cyan-400" />
          {currentFileIndex >= 0 ? OUTPUT_FILES[currentFileIndex] : ""}
        </motion.div>

        {/* FINAL PACKAGE */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
          animate={packageAnimate}
          transition={{ type: "spring", stiffness: 90, damping: 15 }}
        >
          <div className="relative p-3.5 sm:p-4 bg-[#0E0E12]/95 backdrop-blur-xl border border-cyan-500/50 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col items-center w-full max-w-[220px] sm:max-w-[230px]">
            {/* Inner bloom */}
            <motion.div 
               className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-xl pointer-events-none"
               animate={{ opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-500/40 mb-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] relative z-10">
              <Package size={22} className="text-cyan-400" />
            </div>
            
            <div className="font-mono font-bold text-xs sm:text-sm text-white mb-1 relative z-10">PRDSprint_PRD_Package.zip</div>
            
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium mb-3 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 relative z-10 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
              <CheckCircle2 size={12} className="animate-pulse" /> Ready for download
            </div>
            
            <div className="w-full relative z-10 pointer-events-auto">
              <MotionButton size="sm" className="w-full gap-1.5 relative bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs py-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
                <Download size={14} /> Download Package
              </MotionButton>
            </div>
          </div>

          {/* Completion pulse & particles when showcase starts */}
          <AnimatePresence>
             {phase === "package-showcase" && (
                <motion.div 
                   className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[250px] z-0 pointer-events-none"
                   initial={{ opacity: 1, scale: 0.9 }}
                   animate={{ opacity: 0, scale: 1.2 }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                >
                   <div className="w-full h-full border-2 border-cyan-400 rounded-3xl" />
                </motion.div>
             )}
          </AnimatePresence>
          <AnimatePresence>
             {phase === "package-showcase" && (
               <motion.div 
                 className="absolute inset-0 pointer-events-none z-30"
                 initial={{ opacity: 1 }}
                 animate={{ opacity: 0 }}
                 transition={{ duration: 2.5, ease: "easeOut" }}
               >
                 {[...Array(12)].map((_, i) => (
                   <motion.div
                     key={i}
                     className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#00ffff]"
                     initial={{ x: 0, y: 0, scale: 1 }}
                     animate={{ 
                       x: (Math.random() - 0.5) * 300, 
                       y: (Math.random() - 0.5) * 300, 
                       scale: 0 
                     }}
                     transition={{ duration: 1.5 + Math.random() * 1, ease: "easeOut" }}
                   />
                 ))}
               </motion.div>
             )}
          </AnimatePresence>
        </motion.div>
      </div>

    </div>
  );
}


export function OutputPackage() {
  return (
    <section className="relative flex flex-col justify-center py-10 sm:py-14 md:py-18 bg-transparent z-10">
      <DigitalArchiveBackground />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Floating Glass Panel */}
        <div className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-[#08080D]/65 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7),_0_0_30px_rgba(0,255,255,0.03)] p-4 sm:p-6 md:p-8 lg:p-9 relative overflow-hidden">
          {/* Top Edge Glow */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 via-blue-500/40 to-transparent pointer-events-none" />
          
          {/* Ambient Lighting inside Glass */}
          <div className="absolute -top-24 right-1/3 w-[500px] h-[300px] bg-cyan-500/5 rounded-full blur-[110px] pointer-events-none" />

          <div className="relative z-10">
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
              <div className="flex flex-col gap-4 lg:gap-5">
                <ChapterMarker number="05" title="The Output Package" align="left" className="mb-0" />
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold tracking-[-0.01em] text-white leading-tight" style={{ wordSpacing: '0.05em' }}>
                  Everything you need to <span className="text-cyan-400">start building</span> immediately.
                </h3>
                
                <p className="text-xs sm:text-sm lg:text-base text-white/60 leading-relaxed font-medium">
                  We compile your entire project into a neat, organized structure. Just unzip and hand it to your developers or your favorite AI coding assistant.
                </p>
                
                <div className="bg-[#0A0A0C]/80 backdrop-blur-md border border-white/10 rounded-xl p-3.5 sm:p-4 font-mono text-[11px] sm:text-xs shadow-xl">
                  <div className="flex items-center gap-2 mb-2.5 text-white font-bold text-xs sm:text-sm">
                    <FolderOpen size={16} className="text-cyan-400" /> PRDSprint_PRD_Package.zip
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {OUTPUT_FILES.map((file, i) => (
                      <motion.div
                        key={file}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                        viewport={{ once: true }}
                        className="text-white/50 pl-3 sm:pl-4 flex items-center gap-2 hover:text-cyan-300 transition-colors"
                      >
                        <span className="text-white/20">{i === OUTPUT_FILES.length - 1 ? "└── " : "├── "}</span>
                        <FileText size={12} className="text-white/30" />
                        {file}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Ready for</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {AGENTS.map((agent, i) => (
                      <motion.div 
                        key={agent}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <BrandLogoChip name={agent} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="w-full">
                <PremiumPackagingAnimation />
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col md:hidden gap-6">
              <div className="flex flex-col gap-3">
                <ChapterMarker number="05" title="The Output Package" align="left" className="mb-0" />
                
                <h3 className="text-2xl font-display font-semibold tracking-[-0.01em] text-white leading-tight" style={{ wordSpacing: '0.05em' }}>
                  Everything you need to <span className="text-cyan-400">start building</span> immediately.
                </h3>
                
                <p className="text-sm text-white/60 leading-relaxed font-medium">
                  We compile your entire project into a neat, organized structure. Just unzip and hand it to your developers or your favorite AI coding assistant.
                </p>
              </div>
              
              <div className="w-full h-[260px] relative">
                <PremiumPackagingAnimation />
              </div>

              <div className="bg-[#0A0A0C]/80 backdrop-blur-md border border-white/10 rounded-xl p-4 font-mono text-xs shadow-xl">
                <div className="flex items-center gap-2 mb-3 text-white font-bold text-sm">
                    <FolderOpen size={16} className="text-cyan-400" /> PRDSprint_PRD_Package.zip
                </div>
                <div className="flex flex-col gap-1.5">
                  {OUTPUT_FILES.map((file, i) => (
                    <motion.div
                      key={file}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      viewport={{ once: true }}
                      className="text-white/50 pl-4 flex items-center gap-2"
                    >
                      <span className="text-white/20">{i === OUTPUT_FILES.length - 1 ? "└── " : "├── "}</span>
                      <FileText size={12} className="text-white/30" />
                      {file}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Ready for</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {AGENTS.map((agent, i) => (
                    <BrandLogoChip key={agent} name={agent} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
