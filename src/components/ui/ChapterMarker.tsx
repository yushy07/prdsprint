import { motion } from "motion/react";

export function ChapterMarker({ number, title, align = "center", className = "mb-10 sm:mb-14 lg:mb-16" }: { number: string, title: string, align?: "left" | "center", className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col gap-3.5 sm:gap-4 ${className} ${align === "center" ? "items-center text-center" : "items-start text-left"}`}
    >
      <span className="text-[12px] sm:text-[13px] font-mono text-cyan-400/80 tracking-[0.2em] uppercase block font-medium">
        {number}
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold tracking-[-0.015em] text-white leading-[1.18] py-1" style={{ wordSpacing: '0.08em' }}>
        {title}
      </h2>
    </motion.div>
  );
}
