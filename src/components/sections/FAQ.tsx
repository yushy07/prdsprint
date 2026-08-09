import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useState, useEffect } from "react";
import { ChevronDown, HelpCircle, Send } from "lucide-react";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { SupportCard } from "../support/SupportCard";

function KnowledgeBaseBackground({ activeIndex }: { activeIndex: number | null }) {
  // Pulse trigger when activeIndex changes
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (activeIndex !== null) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 2000);
      return () => clearTimeout(t);
    }
  }, [activeIndex]);

  return (
    <div className="absolute -inset-y-[150px] inset-x-0 pointer-events-none select-none z-0 overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
      {/* Deep Space / Blueprint Canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05050A] to-transparent opacity-90" />
      
      {/* Subtle Grid */}
      <motion.div 
        className="absolute -inset-[100px] opacity-[0.02]"
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

      {/* Network Constellation & Orbital Curves */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 100">
        <motion.path 
          d="M -10 20 Q 30 50, 110 30"
          fill="none"
          stroke="rgba(168, 85, 247, 0.2)"
          strokeWidth="0.1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.path 
          d="M 20 110 Q 50 40, 80 -10"
          fill="none"
          stroke="rgba(59, 130, 246, 0.2)"
          strokeWidth="0.1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Connection lines */}
        <line x1="20" y1="40" x2="50" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="0.1" />
        <line x1="50" y1="60" x2="80" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.1" />
        <line x1="30" y1="20" x2="50" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="0.1" />
        
        {/* Glowing Network Nodes */}
        <circle cx="20" cy="40" r="0.3" fill="rgba(59,130,246,0.5)" />
        <circle cx="50" cy="60" r="0.4" fill="rgba(168,85,247,0.5)" />
        <circle cx="80" cy="30" r="0.3" fill="rgba(6,182,212,0.5)" />
        <circle cx="30" cy="20" r="0.2" fill="rgba(255,255,255,0.3)" />

        {/* The Cyan Pulse */}
        <AnimatePresence>
          {pulse && (
            <motion.circle 
              cx="50" cy="60" r="0.5" fill="rgba(6,182,212,0.8)"
              initial={{ scale: 1, opacity: 1, cx: 20, cy: 40 }}
              animate={{ cx: 50, cy: 60, scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              style={{ filter: 'blur(2px)' }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* Enhanced Floating Question Marks */}
      {[
        { size: 120, x: "10%", y: "20%", rotate: [0, 15, 0], duration: 15, opacity: [0.01, 0.04, 0.01], blur: "blur-[3px]" },
        { size: 200, x: "85%", y: "60%", rotate: [0, -20, 0], duration: 20, opacity: [0.01, 0.03, 0.01], blur: "blur-[6px]" },
        { size: 80, x: "25%", y: "75%", rotate: [10, -10, 10], duration: 12, opacity: [0.02, 0.05, 0.02], blur: "blur-[2px]" },
        { size: 150, x: "75%", y: "15%", rotate: [-10, 15, -10], duration: 18, opacity: [0.01, 0.03, 0.01], blur: "blur-[4px]" }
      ].map((qm, i) => (
        <motion.div 
          key={i}
          className={`absolute font-display font-bold text-white leading-none ${qm.blur}`}
          style={{ fontSize: qm.size, left: qm.x, top: qm.y }}
          animate={{ y: [0, -30, 0], rotate: qm.rotate, opacity: qm.opacity }}
          transition={{ duration: qm.duration, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
        >
          ?
        </motion.div>
      ))}
      
      {/* Ambient Lighting */}
      <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px]" />
      <div className="absolute top-[60%] right-[20%] w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[120px]" />
    </div>
  );
}

const faqs = [
  {
    question: "What exactly is generated in the ZIP file?",
    answer: "You receive a structured PRD package including overview.md, features-functionality.md, tech-architecture.md, theme-configuration.md, ui-ux-guidelines.md, and development-roadmap.md."
  },
  {
    question: "How is this different from asking ChatGPT?",
    answer: "ChatGPT provides unstructured, back-and-forth conversational output. PRDSprint uses a strict guided wizard to enforce architectural constraints and outputs developer-ready Markdown files that AI coding agents (like Cursor) understand perfectly."
  },
  {
    question: "Do I need to know how to code to use this?",
    answer: "Not at all. The wizard guides you through plain-English questions about your idea, target audience, and preferences. Our AI handles translating that into technical architecture."
  },
  {
    question: "Which AI agents work best with the exported PRDs?",
    answer: "The output is optimized for context-window consumption. It works exceptionally well with Cursor, Claude Code, Windsurf, and GitHub Copilot."
  },
  {
    question: "Can I edit the generated PRD after it's created?",
    answer: "Yes. Every generated PRD is fully editable. You can modify the Markdown files, PDF content, architecture, features, and design system before handing them to your team or AI coding assistant."
  },
  {
    question: "How long does it take to generate a PRD?",
    answer: "Most PRDs are generated in under 30 seconds. Generation time depends on project complexity, selected options, and package size."
  }
];

function FAQCard({ faq, isOpen, onClick }: { faq: any, isOpen: boolean, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Cursor-based lighting effect for cards
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 ${
        isOpen 
          ? 'bg-[#0A0A0C]/80 border-purple-500/40 shadow-[0_8px_32px_rgba(168,85,247,0.2)] z-10' 
          : 'bg-[#0A0A0C]/50 border-white/5 hover:border-white/15 hover:bg-[#12121A]/80 z-0'
      }`}
      animate={{
        y: isOpen ? -4 : isHovered ? -2 : 0,
        scale: isOpen ? 1.01 : 1
      }}
      initial={false}
    >
      {/* Hover lighting effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.03), transparent 40%)`
          )
        }}
      />
      
      {/* Active state inner glow */}
      {isOpen && (
        <motion.div 
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.2), transparent 70%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Subtle blueprint illumination for active state */}
      {isOpen && (
        <motion.div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,85,247,0.5) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 0.8 }}
        />
      )}

      <button
        onClick={onClick}
        className="w-full flex items-center gap-4 p-6 text-left focus:outline-none relative z-10"
      >
        {/* Question Icon */}
        <motion.div 
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
            isOpen 
              ? 'bg-purple-500/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
              : 'bg-[#12121A] border-white/10 text-gray-400 group-hover:border-white/30'
          }`}
          animate={isOpen ? { scale: [1, 1.1, 1] } : isHovered ? { y: -2 } : { y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className={`text-sm font-bold ${isOpen ? 'text-purple-300' : 'text-gray-400'}`}>?</span>
        </motion.div>

        <span className={`font-display font-bold text-[16px] md:text-[17px] transition-colors duration-300 flex-1 ${
          isOpen ? 'text-white' : 'text-gray-200'
        }`}>
          {faq.question}
        </span>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? '#A855F7' : '#9CA3AF' }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          className="shrink-0"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Smooth Divider */}
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-6"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            
            <motion.div 
              className="px-6 py-6 pl-[72px] text-[14px] md:text-[15px] text-gray-400 leading-relaxed font-medium"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {faq.answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-14 sm:py-18 md:py-24 lg:py-28 2xl:py-32 relative bg-transparent overflow-x-clip overflow-y-visible">
      <KnowledgeBaseBackground activeIndex={openIndex} />
      
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl lg:max-w-4xl relative z-10">
        <ChapterMarker number="08" title="Questions?" className="mb-3 sm:mb-4" />
        <p className="text-center text-gray-400 mb-10 sm:mb-14 lg:mb-16 max-w-xl mx-auto text-sm sm:text-base">
          Find quick answers to common questions about PRDSprint.
        </p>

        <div className="flex flex-col gap-3.5 sm:gap-5 mb-16 sm:mb-20 lg:mb-24">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <FAQCard 
                faq={faq} 
                isOpen={openIndex === i} 
                onClick={() => setOpenIndex(openIndex === i ? null : i)} 
              />
            </motion.div>
          ))}
        </div>

        {/* Support Panel */}
        <SupportCard />
      </div>
    </section>
  );
}
