// @ts-nocheck
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { FileCode2, Database, Key, LayoutTemplate, Palette, Loader2, CheckCircle2 } from "lucide-react";

function AIProcessingCoreBackground() {
  return (
    <div className="absolute -inset-y-[150px] inset-x-0 pointer-events-none select-none z-0" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
      
      {/* Concentric Circles */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-500/5 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-purple-500/5 rounded-full border-dashed"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Rotating Hexagon */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.03]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <polygon points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" className="text-blue-500" />
        </svg>
      </motion.div>

      {/* Pulse Waves */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-blue-400/20"
        animate={{ scale: [1, 50], opacity: [0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-purple-400/20"
        animate={{ scale: [1, 50], opacity: [0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2 }}
      />

      {/* Holographic Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          initial={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            left: `${50 + (Math.random() * 80 - 40)}%`,
            top: `${50 + (Math.random() * 80 - 40)}%`,
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
}

export function Generator() {
  const [activeTask, setActiveTask] = useState(0);
  const tasks = [
    { name: "Analyzing Description", icon: Key },
    { name: "Configuring Tech Stack", icon: Database },
    { name: "Generating Architecture", icon: FileCode2 },
    { name: "Building Design System", icon: LayoutTemplate },
    { name: "Packaging ZIP", icon: Palette },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTask((prev) => (prev + 1) % (tasks.length + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [tasks.length]);

  return (
    <section className="relative py-14 sm:py-18 md:py-24 lg:py-28 2xl:py-32 bg-transparent overflow-x-clip overflow-y-visible">
      <AIProcessingCoreBackground />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Floating Glass Panel */}
        <div className="w-full max-w-6xl mx-auto rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-[#08080D]/65 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.7),_0_0_40px_rgba(59,130,246,0.03)] p-5 sm:p-8 md:p-10 lg:p-14 relative overflow-hidden">
          {/* Top Edge Glow */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 via-blue-500/40 to-transparent pointer-events-none" />
          
          {/* Ambient Lighting inside Glass */}
          <div className="absolute -top-24 left-1/3 w-[500px] h-[300px] bg-blue-500/5 rounded-full blur-[110px] pointer-events-none" />

          <div className="relative z-10">
            <ChapterMarker number="04" title="Live Generation" />
            
            {/* Desktop Layout - Orbital */}
            <div className="hidden md:flex relative w-full max-w-4xl mx-auto items-center justify-center h-[clamp(380px,46vh,480px)] mt-8 sm:mt-12 md:mt-14">
              {/* Center Hub */}
              <div className="absolute w-32 md:w-36 lg:w-40 h-32 md:h-36 lg:h-40 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 flex items-center justify-center z-10">
                <div className="w-20 md:w-22 lg:w-24 h-20 md:h-22 lg:h-24 rounded-full bg-[#3B82F6] flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                  <span className="text-white font-mono font-bold text-base md:text-lg animate-pulse">AI</span>
                </div>
              </div>

              {/* Orbiting Tasks */}
              {tasks.map((task, i) => {
                const isCompleted = activeTask > i;
                const isCurrent = activeTask === i;
                
                const statusColor = isCompleted 
                  ? "#10B981" 
                  : isCurrent 
                    ? "#3B82F6" 
                    : "#374151";

                const angle = (i * (360 / tasks.length)) * (Math.PI / 180) - (Math.PI / 2);
                const radius = 200;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={task.name}
                    className="absolute flex flex-col items-center gap-3 z-20"
                    style={{ x, y }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-[#0A0A0C] border flex items-center justify-center shadow-lg transition-colors duration-500"
                      style={{ borderColor: statusColor, color: statusColor }}
                      animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
                    >
                      <task.icon size={20} />
                    </motion.div>
                    
                    <div className="bg-[#0A0A0C] px-3 py-1.5 rounded-full border border-white/10 shadow-sm flex items-center gap-2 transition-colors duration-500">
                      <span className="text-xs font-mono font-bold transition-colors duration-500" style={{ color: isCompleted ? '#10B981' : isCurrent ? '#3B82F6' : '#9CA3AF' }}>
                        {task.name}
                      </span>
                      {isCompleted ? (
                        <CheckCircle2 size={12} className="text-[#10B981]" />
                      ) : isCurrent ? (
                        <Loader2 size={12} className="text-[#3B82F6] animate-spin" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* SVG Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                {tasks.map((task, i) => {
                  const angle = (i * (360 / tasks.length)) * (Math.PI / 180) - (Math.PI / 2);
                  const radius = 200;
                  const x2 = Math.cos(angle) * radius;
                  const y2 = Math.sin(angle) * radius;
                  const isCompleted = activeTask > i;
                  const isCurrent = activeTask === i;

                  return (
                    <g style={{ transform: "translate(50%, 50%)" }} key={i}>
                      <line 
                        x1={0} y1={0} 
                        x2={x2} y2={y2} 
                        stroke="rgba(255,255,255,0.1)" 
                        strokeWidth="1" 
                        strokeDasharray="4 4"
                      />
                      <motion.line 
                        x1={0} y1={0} 
                        x2={x2} y2={y2} 
                        stroke="#3B82F6" 
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isCompleted ? 1 : isCurrent ? [0, 1, 0] : 0 }}
                        transition={
                          isCurrent 
                            ? { duration: 2, repeat: Infinity, ease: "linear" } 
                            : { duration: 0.5 }
                        }
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Mobile Layout - Vertical Stack */}
            <div className="flex md:hidden flex-col items-center mt-12 relative w-full">
              {/* Central AI Node */}
              <div className="w-24 h-24 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 flex items-center justify-center z-10 mb-8 relative">
                <div className="absolute inset-0 bg-[#3B82F6]/10 blur-xl rounded-full" />
                <div className="w-16 h-16 rounded-full bg-[#3B82F6] flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)] relative z-10">
                  <span className="text-white font-mono font-bold text-lg animate-pulse">AI</span>
                </div>
                
                {/* Vertical Line descending from AI */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-[#3B82F6]/50 to-transparent -z-10" style={{ height: '1000px' }} />
              </div>

              <div className="flex flex-col gap-6 w-full max-w-sm">
                {tasks.map((task, i) => {
                  const isCompleted = activeTask > i;
                  const isCurrent = activeTask === i;
                  
                  const statusColor = isCompleted 
                    ? "#10B981" 
                    : isCurrent 
                      ? "#3B82F6" 
                      : "#374151";

                  return (
                    <motion.div
                      key={task.name}
                      className="flex items-center gap-4 bg-[#0A0A0C]/80 backdrop-blur-md p-3 rounded-2xl border shadow-lg relative"
                      style={{ borderColor: isCurrent ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.05)' }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="w-12 h-12 rounded-xl bg-[#12121A] border flex-shrink-0 flex items-center justify-center transition-colors duration-500"
                        style={{ borderColor: statusColor, color: statusColor }}
                        animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
                      >
                        <task.icon size={20} />
                      </motion.div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <span className="text-sm font-mono font-bold transition-colors duration-500" style={{ color: isCompleted ? '#10B981' : isCurrent ? '#3B82F6' : '#9CA3AF' }}>
                          {task.name}
                        </span>
                      </div>
                      
                      <div className="w-8 flex justify-center">
                        {isCompleted ? (
                          <CheckCircle2 size={16} className="text-[#10B981]" />
                        ) : isCurrent ? (
                          <Loader2 size={16} className="text-[#3B82F6] animate-spin" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-gray-600" />
                        )}
                      </div>
                      
                      {/* Connection line indicator to the main vertical line */}
                      {isCurrent && (
                         <motion.div 
                           className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-4 h-[2px] bg-[#3B82F6]"
                           initial={{ scaleX: 0, originX: 1 }}
                           animate={{ scaleX: 1 }}
                           transition={{ duration: 0.3 }}
                         />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}