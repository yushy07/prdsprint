import { motion } from "motion/react";

const logos1 = [
  { name: "Claude Code", icon: <div className="text-orange-500 font-serif font-bold text-xl leading-none">*</div> },
  { name: "Antigravity", icon: <div className="text-blue-400 font-bold text-xl italic leading-none">A</div> },
  { name: "OpenCode", icon: <div className="w-5 h-5 border-2 border-white rounded-[4px] flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-[1px]"></div></div> },
  { name: "Windsurf", icon: <div className="text-teal-400 font-bold text-xl leading-none">W</div> },
  { name: "v0", icon: <div className="text-white font-bold text-lg leading-none tracking-normal">v0</div> },
  { name: "Bolt.new", icon: <div className="text-yellow-400 font-bold text-lg leading-none italic">bolt</div> },
  { name: "Replit", icon: <div className="grid grid-cols-2 gap-0.5"><div className="w-2 h-2 bg-orange-500 rounded-sm"></div><div className="w-2 h-2 bg-orange-500 rounded-sm"></div><div className="w-2 h-2 bg-orange-500 rounded-sm"></div></div> },
];

export function TrustStrip() {
  return (
    <div className="py-6 sm:py-8 lg:py-10 bg-transparent overflow-x-clip overflow-y-visible relative">
      <div className="container mx-auto px-4 sm:px-6 text-center mb-5 sm:mb-6 lg:mb-8">
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-8 bg-indigo-500/50"></div>
          <h3 className="text-[11px] text-gray-300 uppercase tracking-[0.2em] font-bold">
            SUPPORTED BY
          </h3>
          <div className="h-[1px] w-8 bg-indigo-500/50"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl flex flex-col gap-4">
        {/* Row 1 */}
        <div className="relative flex items-center rounded-full border border-white/10 bg-[#0A0A0B]/40 backdrop-blur-md overflow-hidden">
          {/* Edge Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none rounded-l-full" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none rounded-r-full" />
          
          <div className="flex-1 flex items-center py-4 px-12">
            <div className="flex w-max">
              <motion.div 
                className="flex items-center gap-12"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                {[...logos1, ...logos1, ...logos1].map((logo, i) => (
                  <div key={`r1-${i}`} className="flex items-center gap-3 group hover:-translate-y-[2px] transition-all duration-300">
                    <div className="opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all duration-300">{logo.icon}</div>
                    <span className="font-semibold text-gray-400 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300 whitespace-nowrap text-[15px]">{logo.name}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-700 ml-12"></div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative flex items-center rounded-full border border-white/10 bg-[#0A0A0B]/40 backdrop-blur-md overflow-hidden">
           {/* Edge Fades */}
           <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none rounded-l-full" />
           <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none rounded-r-full" />
          
          <div className="flex-1 flex items-center py-4 px-12">
            <div className="flex w-max">
              <motion.div 
                className="flex items-center gap-12"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              >
                {[...logos1, ...logos1, ...logos1].map((logo, i) => (
                  <div key={`r2-${i}`} className="flex items-center gap-3 group hover:-translate-y-[2px] transition-all duration-300">
                    <div className="opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all duration-300">{logo.icon}</div>
                    <span className="font-semibold text-gray-400 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300 whitespace-nowrap text-[15px]">{logo.name}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-700 ml-12"></div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
