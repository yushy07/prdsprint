import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Check, Type } from "lucide-react";
import { FloatingNav } from "../../components/layout";


const ALL_FONTS = [
  { id: 'Inter', name: 'Inter', description: 'Perfect for SaaS dashboards', preview: 'Build Better' },
  { id: 'Poppins', name: 'Poppins', description: 'Geometric and versatile', preview: 'Design Faster' },
  { id: 'Manrope', name: 'Manrope', description: 'Modern and readable', preview: 'Design Faster' },
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans', description: 'Professional modern look', preview: 'Design Faster' },
  { id: 'DM Sans', name: 'DM Sans', description: 'Clean minimalist design', preview: 'Build Better' },
  { id: 'Outfit', name: 'Outfit', description: 'Friendly and geometric', preview: 'Design Faster' },
  { id: 'Space Grotesk', name: 'Space Grotesk', description: 'Tech & startup interfaces', preview: 'Build Better' },
  { id: 'Geist', name: 'Geist', description: 'Developer focused sans', preview: 'Build Better' },
  { id: 'Urbanist', name: 'Urbanist', description: 'Clean geometry and elegance', preview: 'Build Better' },
  { id: 'Roboto', name: 'Roboto', description: 'Standard Android system font', preview: 'Build Better' },
  { id: 'Google Sans', name: 'Google Sans', description: 'Friendly and approachable', preview: 'Design Faster' },
  { id: 'Noto Sans', name: 'Noto Sans', description: 'Universal and highly readable', preview: 'Design Faster' },
  { id: 'IBM Plex Sans', name: 'IBM Plex Sans', description: 'Technical and precise', preview: 'Design Faster' },
  { id: 'Nunito Sans', name: 'Nunito Sans', description: 'Well-balanced sans serif', preview: 'Design Faster' },
  { id: 'Rubik', name: 'Rubik', description: 'Soft and rounded mobile UI', preview: 'Build Better' },
  { id: 'Work Sans', name: 'Work Sans', description: 'Optimized for screen text', preview: 'Build Better' },
  { id: 'Cabin', name: 'Cabin', description: 'Humanist sans for mobile', preview: 'Build Better' },
  { id: 'Mulish', name: 'Mulish', description: 'Minimalist mobile applications', preview: 'Design Faster' },
  { id: 'Hind', name: 'Hind', description: 'Clean UI and data density', preview: 'Build Better' },
  { id: 'Lexend', name: 'Lexend', description: 'Excellent readability', preview: 'Build Better' },
  { id: 'Sora', name: 'Sora', description: 'App and web product interfaces', preview: 'Design Faster' },
];

const RECOMMENDED_FONTS = {
  website: ['Inter', 'Poppins', 'Manrope', 'Plus Jakarta Sans', 'DM Sans', 'Outfit', 'Space Grotesk', 'Geist', 'Urbanist'],
  android: ['Roboto', 'Google Sans', 'Inter', 'Noto Sans', 'Manrope', 'IBM Plex Sans']
};



export interface Font {
  key?: string | number;
  id: string;
  name: string;
  description: string;
  preview: string;
}

interface FontCardProps {
  key?: string | number;
  font: Font;
  isSelected: boolean;
  onClick: () => void;
  delay: number;
}

function FontCard({ font, isSelected, onClick, delay }: FontCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", bounce: 0.3 }}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`
        relative group w-full flex items-center justify-between rounded-[16px] p-4 sm:p-5 transition-all duration-300 text-left
        ${isSelected 
          ? 'bg-[#10121A]/90 shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(59,130,246,0.15)] z-10' 
          : 'bg-[#0A0B12]/60 hover:bg-[#0E0F15]/80 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)]'
        }
      `}
      style={{ transformStyle: "preserve-3d", fontFamily: `"${font.name}", sans-serif` }}
    >
      {/* Background Glows */}
      <div className={`
        absolute inset-0 transition-opacity duration-700 rounded-[16px] overflow-hidden
        ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
      `}>
        <div className={`
          absolute top-0 left-1/4 -translate-x-1/2 w-[70%] h-[60%] rounded-full blur-[45px] transition-all duration-700
          ${isSelected ? 'bg-cyan-500/15 scale-110' : 'bg-blue-500/5'}
        `} />
        <div className={`
          absolute bottom-0 right-1/4 w-[70%] h-[60%] rounded-full blur-[45px] transition-all duration-700
          ${isSelected ? 'bg-purple-500/15 scale-110' : 'bg-purple-500/5'}
        `} />
      </div>

      {/* Blueprint Shimmer Sweep on Hover */}
      <div className="absolute inset-0 rounded-[16px] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[sweep_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* Premium Border for Selected State */}
      <div className={`
        absolute inset-0 rounded-[16px] transition-all duration-500
        ${isSelected ? 'opacity-100' : 'opacity-0'}
        bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-[1px]
      `}>
        <div className="absolute inset-[1px] rounded-[15px] bg-[#0D0F16]/90 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]" />
      </div>
      
      {/* Static Border for Unselected State */}
      <div className={`
        absolute inset-0 rounded-[16px] border border-white/5 transition-colors duration-500
        ${isSelected ? 'opacity-0' : 'group-hover:border-white/10'}
      `} />

      {/* Selected Checkmark */}
      <AnimatePresence>
        {isSelected && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
            className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)] z-20"
          >
            <Check className="w-3 h-3 text-white drop-shadow-sm" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center gap-4 w-full pr-6">
        {/* Big Aa indicator */}
        <div className={`
          flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-[22px] transition-colors duration-300
          ${isSelected ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30 shadow-[inset_0_0_15px_rgba(34,211,238,0.2)]' : 'bg-white/5 text-gray-400 border border-white/5 group-hover:bg-white/10 group-hover:text-white'}
        `}>
          Aa
        </div>
        
        {/* Font info */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <span className={`text-[15px] font-semibold truncate transition-colors duration-300 ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
            {font.name}
          </span>
          <span className="text-[13px] text-gray-500 truncate transition-colors duration-300 group-hover:text-gray-400">
            {font.description}
          </span>
        </div>

        {/* Live Preview Text */}
        <div className="flex-shrink-0 text-right hidden sm:block">
          <span className={`block text-[14px] transition-colors duration-300 ${isSelected ? 'text-gray-200' : 'text-gray-500 group-hover:text-gray-300'}`}>
            {font.preview}
          </span>
          <span className={`block text-[12px] tracking-[0.1em] transition-colors duration-300 ${isSelected ? 'text-gray-400' : 'text-gray-600 group-hover:text-gray-400'}`}>
            0123456789
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export function TypographyStep({ initialData, onBack, onNext, selectedPlatform, onDataChange }: any) {
  const [fontSelection, setFontSelection] = useState(() => {
    if (!initialData?.font) return { type: 'preset' as const, value: '' };
    const isPreset = ALL_FONTS.some(f => f.id === initialData.font);
    return { type: (isPreset ? 'preset' : 'custom') as "preset" | "custom", value: initialData.font };
  });

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        font: fontSelection.value,
      });
    }
  }, [fontSelection, onDataChange]);

  const selectedPresetFont = fontSelection.type === 'preset' ? fontSelection.value : '';

  // Include fonts from Google Fonts dynamically
  useEffect(() => {
    const fontsToLoad = new Set<string>();
    const recommendedIds = selectedPlatform === 'android' ? RECOMMENDED_FONTS.android : RECOMMENDED_FONTS.website;
    
    recommendedIds.forEach(id => fontsToLoad.add(id));
    
    if (selectedPresetFont) {
      fontsToLoad.add(selectedPresetFont);
    }

    const excludeList = ['Geist', 'Google Sans'];
    const filteredFonts = Array.from(fontsToLoad)
      .filter(id => !excludeList.includes(id))
      .map(id => {
        const font = ALL_FONTS.find(f => f.id === id);
        return font ? font.name : id;
      })
      .filter(name => /^[A-Za-z0-9 -]+$/.test(name))
      .map(name => encodeURIComponent(name.trim().replace(/\s+/g, '+')));

    if (filteredFonts.length === 0) return;

    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${filteredFonts.join('&family=')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [selectedPlatform, selectedPresetFont]);

  const canProceed = fontSelection.value.trim() !== '';

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pb-32 relative z-10 flex flex-col items-start pt-navbar-offset">
      
      {/* Header & Preview Container */}
      <div id="section-font" className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 shrink-0"
        >
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-white mb-3 tracking-tight flex items-center gap-3">
            <span className="w-1.5 h-8 md:h-10 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full inline-block" />
            Choose a <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">font</span>
          </h1>
          <p className="text-gray-300 text-[16px] md:text-[17px] pl-5 font-medium drop-shadow-sm">
            Select a typography style for your project
          </p>
        </motion.div>

        {/* Live Preview Element */}
        <div className="w-full md:w-auto md:max-w-[280px] flex-shrink shrink-0 pointer-events-none hidden sm:block">
          <motion.div 
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[240px] md:max-w-none md:w-56 mx-auto md:mx-0"
          >
            <div className="w-full aspect-[4/3] md:h-48 border border-white/10 rounded-2xl flex flex-col justify-center px-6 backdrop-blur-md bg-[#0A0B12]/60 shadow-2xl relative overflow-hidden">
              {/* Blueprint grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
              
              {/* Content with dynamic font */}
              <div 
                className="relative z-10 transition-all duration-500 flex flex-col" 
                style={{ fontFamily: fontSelection.type === 'custom' && fontSelection.value.trim() !== '' ? fontSelection.value : `"${fontSelection.value || 'Inter'}", sans-serif` }}
              >
                <div className="text-[36px] sm:text-[42px] leading-tight text-white/90 font-medium mb-1 drop-shadow-md">
                  Aa
                </div>
                <div className="text-[14px] sm:text-[16px] text-gray-400 mb-3 truncate">
                  {(fontSelection.type === 'custom' && fontSelection.value.trim() !== '') ? fontSelection.value : (fontSelection.value || 'Select a font')}
                </div>
                <div className="text-[10px] sm:text-[12px] tracking-widest text-cyan-400/80">
                  0123456789
                </div>
              </div>

              {/* Scanning line */}
              <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
              />
            </div>
            
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40 rounded-tl" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-500/40 rounded-br" />
          </motion.div>
        </div>
      </div>

      {/* Recommended Fonts Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full relative z-10 mb-10"
      >
        <h2 className="text-[14px] font-bold text-white/90 uppercase tracking-widest mb-5 flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full ${selectedPlatform === 'android' ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'}`} />
          Recommended for {selectedPlatform === 'android' ? 'Android' : 'Website'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full bg-white/[0.02] p-4 rounded-[24px] border border-white/[0.05] shadow-[inset_0_0_20px_rgba(255,255,255,0.01)]">
          {(() => {
            const recommendedIds = selectedPlatform === 'android' ? RECOMMENDED_FONTS.android : RECOMMENDED_FONTS.website;
            const recommendedFonts = ALL_FONTS.filter(f => recommendedIds.includes(f.id)).sort((a, b) => recommendedIds.indexOf(a.id) - recommendedIds.indexOf(b.id));
            return recommendedFonts.map((font, i) => (
              <FontCard 
                key={font.id} 
                font={font} 
                isSelected={fontSelection.type === 'preset' && fontSelection.value === font.id} 
                onClick={() => {
                  setFontSelection({ type: 'preset', value: font.id });
                }} 
                delay={0.1 + (i * 0.03)}
              />
            ));
          })()}
        </div>
      </motion.div>

      {/* All Fonts Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full relative z-10 mb-12"
      >
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider">
            All Fonts
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          {(() => {
            const recommendedIds = selectedPlatform === 'android' ? RECOMMENDED_FONTS.android : RECOMMENDED_FONTS.website;
            const otherFonts = ALL_FONTS.filter(f => !recommendedIds.includes(f.id));
            return otherFonts.map((font, i) => (
              <FontCard 
                key={font.id} 
                font={font} 
                isSelected={fontSelection.type === 'preset' && fontSelection.value === font.id} 
                onClick={() => {
                  setFontSelection({ type: 'preset', value: font.id });
                }} 
                delay={0.2 + (i * 0.03)}
              />
            ));
          })()}
        </div>
      </motion.div>

      {/* Custom Font Input */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full relative z-10 mt-6"
      >
        <div className="flex items-center gap-4 mb-4 pl-1">
          <h2 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider">
            Advanced
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <div className={`
          w-full rounded-[16px] p-4 sm:p-5 transition-colors duration-500 bg-[#0A0B12]/40 backdrop-blur-md
          ${(fontSelection.type === 'custom' && fontSelection.value.trim() !== '') ? 'border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.05)]' : 'border border-white/5 hover:border-white/10'}
        `}>
          <div className="flex flex-col md:flex-row gap-5 md:items-center">
            <div className="flex gap-4 items-center w-full md:w-auto md:min-w-[280px]">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Type className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-200 text-[15px] font-medium">Custom CSS Font</span>
                <span className="text-gray-500 text-[13px]">Google Fonts or fallback stacks</span>
              </div>
            </div>
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={fontSelection.type === 'custom' ? fontSelection.value : ''}
                onChange={(e) => {
                  setFontSelection({ type: 'custom', value: e.target.value });
                }}
                placeholder="e.g., 'Courier New', monospace"
                className="w-full bg-[#06070A]/80 border border-white/5 rounded-xl px-4 py-3 text-white text-[14px] outline-none focus:border-cyan-500/40 focus:bg-[#06070A] transition-all placeholder:text-gray-600 font-mono shadow-inner"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Gradient Mask to reduce Prism glow intensity at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#06080D] via-[#06080D]/60 to-transparent z-0 pointer-events-none" />

      {/* Navigation Buttons */}
      <div className="w-full mt-16 pt-8 border-t border-white/5 relative z-20">
        <FloatingNav isValid={canProceed}>
          <div className="w-full flex items-center justify-between">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={onBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 text-gray-300 hover:text-white text-[14px] font-medium transition-all duration-300 overflow-hidden shadow-sm cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">Previous</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => {
                if (!canProceed) {
                  const el = document.getElementById('section-font');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.parentElement?.classList.add('ring-2', 'ring-red-500', 'ring-offset-8', 'ring-offset-[#06080D]', 'rounded-3xl', 'transition-all', 'duration-300');
                    setTimeout(() => {
                      el.parentElement?.classList.remove('ring-2', 'ring-red-500', 'ring-offset-8', 'ring-offset-[#06080D]', 'rounded-3xl');
                    }, 1000);
                  }
                } else {
                  onNext();
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              
              data-action="next" className={`
                group relative flex items-center gap-3 px-8 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-500 overflow-hidden
                ${canProceed 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] cursor-pointer' 
                  : 'bg-white/[0.02] text-gray-500 border border-white/5 backdrop-blur-md cursor-pointer hover:bg-white/[0.04]'}
              `}
            >
              {canProceed && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
              {canProceed && (
                <motion.div 
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                />
              )}
              <span className="relative z-10">Next</span>
              <ArrowRight className={`w-4 h-4 relative z-10 transition-transform duration-300 ${canProceed ? 'group-hover:translate-x-1.5' : ''}`} />
            </motion.button>
          </div>
        </FloatingNav>
      </div>
    </div>
  );
}
