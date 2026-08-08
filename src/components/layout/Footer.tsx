// @ts-nocheck
import { motion, useMotionValue, useTransform } from "motion/react";
import { Twitter, Github, FileText, Shield } from "lucide-react";
import { useState } from "react";

function FooterLink({ icon: Icon, text, variant = 'full' }: { icon: any, text: string, variant?: 'full' | 'compact' }) {
  const [isHovered, setIsHovered] = useState(false);
  
  if (variant === 'compact') {
    return (
      <a 
        href="#" 
        className="group relative flex items-center gap-2 text-[13px] font-medium text-gray-500 hover:text-white transition-colors duration-300 py-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon size={14} className="text-gray-600 group-hover:text-cyan-400 transition-colors duration-300" />
        <span>{text}</span>
      </a>
    );
  }

  return (
    <a 
      href="#" 
      className="group relative flex items-center justify-center gap-2 text-[14px] font-medium text-gray-400 hover:text-white transition-colors duration-300"
      style={{ height: '61px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div animate={isHovered ? { scale: 1.1, rotate: [0, -10, 10, 0] } : { scale: 1 }}>
        <Icon size={16} className="text-gray-500 group-hover:text-cyan-400 transition-colors duration-300" />
      </motion.div>
      <span>{text}</span>
      <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-cyan-400 to-purple-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
    </a>
  );
}

export function Footer({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  if (variant === 'compact') {
    return (
      <footer className="relative w-full pb-6 pt-8 overflow-hidden mt-auto">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="relative rounded-[24px] bg-[#0A0B10] border border-white/5 shadow-2xl flex flex-col md:flex-row items-center justify-between px-8 py-5 gap-6">
            
            {/* Logo & Tagline */}
            <div className="flex items-center gap-4 opacity-90 hover:opacity-100 transition-opacity group/logo">
              <a href="/" className="relative flex items-center justify-center shrink-0 group block">
                <img src="/logo.svg" alt="PRDSprint" className="w-auto h-10 sm:h-12 md:h-14 object-contain transition-transform duration-500 group-hover/logo:scale-105" loading="lazy" />
              </a>
              <div className="flex flex-col">
                <a href="/" className="text-xl font-bold tracking-[-0.01em] text-white leading-tight" style={{ wordSpacing: '0.05em' }}>
                  PRD<span className="text-blue-500">Sprint</span>
                </a>
                <span className="text-gray-500 text-[12px] font-medium">
                  Think it. Structure it. Ship it.
                </span>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <FooterLink icon={Twitter} text="Twitter" variant="compact" />
              <FooterLink icon={Github} text="GitHub" variant="compact" />
              <FooterLink icon={FileText} text="Terms" variant="compact" />
              <FooterLink icon={Shield} text="Privacy" variant="compact" />
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative w-full pb-8 pt-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* The Premium Glass Card Footer */}
        <motion.div 
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl md:rounded-[32px] bg-[#0A0A0C]/80 border border-white/5 backdrop-blur-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] group"
        >
          {/* Ambient Lighting & Blueprint Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #ffffff 1px, transparent 1px),
                linear-gradient(to bottom, #ffffff 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute -top-[100px] left-[20%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-[100px] right-[20%] w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          {/* Cursor-based lighting effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.03), transparent 100%)`
              )
            }}
          />

          {/* Faint Glowing Divider across top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent blur-[1px]" />

          <div className="relative z-10 px-6 sm:px-8 py-10 md:px-12 md:py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-8 text-center md:text-left">
            
            {/* Logo & Tagline */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 group/logo">
              <a href="/" className="relative flex items-center justify-center shrink-0 group block">
                <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <motion.img 
                  src="/logo.svg" loading="lazy" 
                  alt="PRDSprint Icon" 
                  className="object-contain transition-transform duration-500 group-hover/logo:scale-105"
                  style={{ width: '130px', height: '67px', marginLeft: '-1px', marginTop: '-12px', marginBottom: '-13px' }}
                />
              </a>
              <div className="flex flex-col">
                <a href="/" className="text-2xl font-bold tracking-[-0.01em] leading-none text-white" style={{ wordSpacing: '0.05em' }}>
                  PRD<span className="text-blue-500">Sprint</span>
                </a>
                <span className="text-gray-500 text-[13px] font-medium mt-1">
                  Think it. Structure it. Ship it.
                </span>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-x-8" style={{ height: '61px' }}>
              <FooterLink icon={Twitter} text="Twitter" />
              <FooterLink icon={Github} text="GitHub" />
              <FooterLink icon={FileText} text="Terms" />
              <FooterLink icon={Shield} text="Privacy" />
            </div>

          </div>
        </motion.div>
      </div>
    </footer>
  );
}
