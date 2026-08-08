import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, ArrowLeft, Shuffle, Waves, Moon, Sun, Cloud, 
  Sparkles, Trees, Leaf, Globe, Crown, Coffee, Activity, 
  Zap, Monitor, Layers, Contrast, Droplet, Sunrise, Camera, Check,
  Palette, Heart, Building, Cherry, Shield, Type, Brush, AlertCircle
} from "lucide-react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { FloatingNav } from "../../components/layout";

const PALETTES = [

  { type: 'palette', id: 'ocean-breeze', name: 'Ocean Breeze', icon: Waves, colors: ['#38BDF8', '#818CF8', '#C084FC', '#0F172A', '#334155', '#94A3B8'] },
  { type: 'palette', id: 'midnight-sky', name: 'Midnight Sky', icon: Moon, colors: ['#60A5FA', '#3B82F6', '#1D4ED8', '#0B1120', '#1E293B', '#64748B'] },
  { type: 'palette', id: 'sunset-glow', name: 'Sunset Glow', icon: Sun, colors: ['#FB923C', '#F43F5E', '#FDA4AF', '#170F0E', '#3F2C2A', '#D4D4D8'] },
  { type: 'palette', id: 'lavender-dream', name: 'Lavender Dream', icon: Cloud, colors: ['#A78BFA', '#C084FC', '#E879F9', '#1E1B4B', '#312E81', '#A5B4FC'] },
  { type: 'palette', id: 'aurora-night', name: 'Aurora Night', icon: Sparkles, colors: ['#34D399', '#2DD4BF', '#818CF8', '#064E3B', '#0F766E', '#99F6E4'] },
  { type: 'palette', id: 'summer-vibes', name: 'Summer Vibes', icon: Trees, colors: ['#FDE047', '#4ADE80', '#2DD4BF', '#14532D', '#115E59', '#D9F99D'] },
  { type: 'palette', id: 'forest-calm', name: 'Forest Calm', icon: Leaf, colors: ['#A3E635', '#84CC16', '#EAB308', '#022C22', '#064E3B', '#D9F99D'] },
  { type: 'palette', id: 'deep-space', name: 'Deep Space', icon: Globe, colors: ['#8B5CF6', '#6D28D9', '#4C1D95', '#0F172A', '#1E293B', '#CBD5E1'] },
  { type: 'palette', id: 'royal-indigo', name: 'Royal Indigo', icon: Crown, colors: ['#6366F1', '#4F46E5', '#4338CA', '#1E1B4B', '#312E81', '#C7D2FE'] },
  { type: 'palette', id: 'coffee-house', name: 'Coffee House', icon: Coffee, colors: ['#B45309', '#92400E', '#78350F', '#271C19', '#45291D', '#FDE68A'] },
  { type: 'palette', id: 'crimson-pulse', name: 'Crimson Pulse', icon: Activity, colors: ['#F43F5E', '#E11D48', '#BE123C', '#2A0E12', '#4C1D24', '#FECDD3'] },
  { type: 'palette', id: 'electric-blue', name: 'Electric Blue', icon: Zap, colors: ['#2563EB', '#1D4ED8', '#1E40AF', '#0F172A', '#1E293B', '#BFDBFE'] },
  { type: 'palette', id: 'cyber-neon', name: 'Cyber Neon', icon: Zap, colors: ['#2DD4BF', '#A78BFA', '#F472B6', '#09090B', '#18181B', '#E4E4E7'] },
  { type: 'palette', id: 'retro-wave', name: 'Retro Wave', icon: Monitor, colors: ['#F43F5E', '#8B5CF6', '#38BDF8', '#170F1C', '#2E1E36', '#E9D5FF'] },
  { type: 'palette', id: 'slate-modern', name: 'Slate Modern', icon: Layers, colors: ['#64748B', '#475569', '#334155', '#0F172A', '#1E293B', '#E2E8F0'] },
  { type: 'palette', id: 'monochrome-pro', name: 'Monochrome Pro', icon: Contrast, colors: ['#52525B', '#3F3F46', '#27272A', '#09090B', '#18181B', '#F4F4F5'] },
  { id: 'mint-fresh', name: 'Mint Fresh', icon: Droplet, colors: ['#6EE7B7', '#34D399', '#10B981', '#064E3B', '#047857', '#A7F3D0'] },
  { type: 'palette', id: 'tropical-lagoon', name: 'Tropical Lagoon', icon: Waves, colors: ['#22D3EE', '#06B6D4', '#0891B2', '#083344', '#164E63', '#CFFAFE'] },
  { type: 'palette', id: 'amber-dusk', name: 'Amber Dusk', icon: Sunrise, colors: ['#FBBF24', '#F59E0B', '#D97706', '#2A1C0B', '#452A0E', '#FDE68A'] },
  { type: 'palette', id: 'vintage-warmth', name: 'Vintage Warmth', icon: Camera, colors: ['#D97706', '#B45309', '#92400E', '#381E0A', '#583111', '#FEF3C7'] },

];

const GRADIENTS = [
  { id: 'sunset', name: 'Sunset', type: 'gradient', icon: Sun, from: '#FF7A59', to: '#F43F8C', previewColors: ["#FDE68A","#FF7A59","#F43F8C"], colors: ['#FDE68A','#FDD080','#FEBB76','#FEA56D','#FF9063','#FF7A59','#FD7062','#FB666A','#FA5D73','#F8537B','#F64984','#F43F8C'] },
  { id: 'ocean', name: 'Ocean', type: 'gradient', icon: Waves, from: '#00C2FF', to: '#2563EB', previewColors: ["#BAE6FD","#00C2FF","#2563EB"], colors: ['#BAE6FD','#95DFFD','#70D8FE','#4AD0FE','#25C9FF','#00C2FF','#06B2FC','#0CA2F8','#1393F5','#1983F2','#1F73EE','#2563EB'] },
  { id: 'purple-dream', name: 'Purple Dream', type: 'gradient', icon: Sparkles, from: '#A855F7', to: '#6366F1', previewColors: ["#E9D5FF","#A855F7","#6366F1"], colors: ['#E9D5FF','#DCBBFD','#CFA2FC','#C288FA','#B56FF9','#A855F7','#9D58F6','#915BF5','#865EF4','#7A60F3','#6F63F2','#6366F1'] },
  { id: 'mint-fresh', name: 'Mint Fresh', type: 'gradient', icon: Leaf, from: '#34D399', to: '#10B981', previewColors: ["#A7F3D0","#34D399","#10B981"], colors: ['#A7F3D0','#90EDC5','#79E6BA','#62E0AF','#4BD9A4','#34D399','#2ECF95','#28CA91','#22C68D','#1CC289','#16BD85','#10B981'] },
  { id: 'coral-bliss', name: 'Coral Bliss', type: 'gradient', icon: Heart, from: '#FF6B6B', to: '#FFB86C', previewColors: ["#FFEDD5","#FF6B6B","#FFB86C"], colors: ['#FFEDD5','#FFD3C0','#FFB9AB','#FF9F95','#FF8580','#FF6B6B','#FF786B','#FF856B','#FF926C','#FF9E6C','#FFAB6C','#FFB86C'] },
  { id: 'skyline', name: 'Skyline', type: 'gradient', icon: Building, from: '#38BDF8', to: '#8B5CF6', previewColors: ["#BAE6FD","#38BDF8","#8B5CF6"], colors: ['#BAE6FD','#A0DEFC','#86D6FB','#6CCDFA','#52C5F9','#38BDF8','#46ADF8','#549DF7','#628DF7','#6F7CF7','#7D6CF6','#8B5CF6'] },
  { id: 'lime-pop', name: 'Lime Pop', type: 'gradient', icon: Zap, from: '#A3E635', to: '#22D3EE', previewColors: ["#D9F99D","#A3E635","#22D3EE"], colors: ['#D9F99D','#CEF588','#C3F173','#B9EE5F','#AEEA4A','#A3E635','#8EE354','#78E073','#63DD92','#4DD9B0','#38D6CF','#22D3EE'] },
  { id: 'berry-fusion', name: 'Berry Fusion', type: 'gradient', icon: Cherry, from: '#F472B6', to: '#7C3AED', previewColors: ["#FBCFE8","#F472B6","#7C3AED"], colors: ['#FBCFE8','#FABCDE','#F8AAD4','#F797CA','#F585C0','#F472B6','#E069BF','#CC5FC8','#B856D2','#A44DDB','#9043E4','#7C3AED'] },
];

const CUSTOM_ROLES = [
  { type: 'palette', id: 'primary', label: 'Primary', description: 'Main brand color', icon: Crown },
  { type: 'palette', id: 'secondary', label: 'Secondary', description: 'Supporting color', icon: Shield },
  { type: 'palette', id: 'accent', label: 'Accent', description: 'Highlights & CTAs', icon: Zap },
  { type: 'palette', id: 'background', label: 'Background', description: 'App/website background', icon: Monitor },
  { type: 'palette', id: 'surface', label: 'Surface', description: 'Cards, Containers, Dialogs', icon: Layers },
  { type: 'palette', id: 'text', label: 'Text', description: 'Main text color', icon: Type },
];

function PaletteCard({ palette, isSelected, onClick, delay }: any) {
  const Icon = palette.icon;
  
  return (
    <motion.button
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.4 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative group w-full flex items-center justify-between rounded-[24px] p-6 transition-all duration-500
        ${isSelected 
          ? 'bg-[#090A0F] shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.2)] -translate-y-1' 
          : 'bg-[#090A0F]/95 hover:bg-[#090A0F] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1'
        }
      `}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Background Glows (toned down to preserve color accuracy) */}
      <div className={`
        absolute inset-0 transition-opacity duration-700 rounded-[24px] overflow-hidden pointer-events-none
        ${isSelected ? 'opacity-30' : 'opacity-0 group-hover:opacity-10'}
      `}>
        <div className={`
          absolute top-0 left-1/4 -translate-x-1/2 w-[70%] h-[60%] rounded-full blur-[50px] transition-all duration-700
          ${isSelected ? 'bg-cyan-500/10 scale-110' : 'bg-blue-500/5'}
        `} />
        <div className={`
          absolute bottom-0 right-1/4 w-[70%] h-[60%] rounded-full blur-[50px] transition-all duration-700
          ${isSelected ? 'bg-purple-500/10 scale-110' : 'bg-purple-500/5'}
        `} />
      </div>

      {/* Blueprint Shimmer Sweep on Hover */}
      <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[sweep_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* Premium Border for Selected State */}
      <div className={`
        absolute inset-0 rounded-[24px] transition-all duration-500
        ${isSelected ? 'opacity-100' : 'opacity-0'}
        bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-[1px]
      `}>
        <div className="absolute inset-[1px] rounded-[23px] bg-black/40 backdrop-blur-md shadow-[inset_0_0_30px_rgba(59,130,246,0.15)]" />
      </div>
      
      {/* Static Border for Unselected State */}
      <div className={`
        absolute inset-0 rounded-[24px] border transition-colors duration-500
        ${isSelected ? 'opacity-0' : 'border-white/10 group-hover:border-white/20'}
      `} />

      {/* Selected Checkmark */}
      <AnimatePresence>
        {isSelected && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.6 }}
            className="absolute top-[18px] right-[18px] w-[24px] h-[24px] rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)] z-20"
          >
            <Check className="w-4 h-4 text-white drop-shadow-md" strokeWidth={3.5} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center gap-6">
        {/* Colors Grid with neutral backing for color accuracy */}
        <div className="flex flex-col gap-2 bg-[#050505] p-3 rounded-[16px] border border-white/10 shadow-inner">
          <div className="flex gap-2">
            {palette.colors.slice(0, 3).map((color: string, i: number) => (
              <div 
                key={i} 
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-sm transition-all duration-500 border border-white/5
                  ${isSelected ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] scale-105' : 'group-hover:scale-105'}
                `}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {palette.colors.slice(3, 6).map((color: string, i: number) => (
              <div 
                key={i} 
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-sm transition-all duration-500 border border-white/5
                  ${isSelected ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] scale-105' : 'group-hover:scale-105'}
                `}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        
        <span className={`text-[16px] font-semibold transition-colors duration-500 ${isSelected ? 'text-white drop-shadow-md' : 'text-gray-300 group-hover:text-white'}`}>
          {palette.name}
        </span>
      </div>

      <div className={`relative z-10 mr-4 transition-all duration-500 ${isSelected ? 'opacity-30' : 'opacity-10 group-hover:opacity-20'}`}>
        <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
      </div>
    </motion.button>
  );
}

function GradientCard({ gradient, isSelected, onClick, delay }: any) {
  const Icon = gradient.icon;
  
  return (
    <motion.button
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", bounce: 0.4 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative group w-full flex items-center justify-between rounded-[24px] p-6 transition-all duration-500
        ${isSelected 
          ? 'bg-[#090A0F] shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(236,72,153,0.2)] -translate-y-1' 
          : 'bg-[#090A0F]/95 hover:bg-[#090A0F] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1'
        }
      `}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Background Glows (toned down to preserve color accuracy) */}
      <div className={`
        absolute inset-0 transition-opacity duration-700 rounded-[24px] overflow-hidden pointer-events-none
        ${isSelected ? 'opacity-30' : 'opacity-0 group-hover:opacity-10'}
      `}>
        <div className={`
          absolute top-0 left-1/4 -translate-x-1/2 w-[70%] h-[60%] rounded-full blur-[50px] transition-all duration-700
          ${isSelected ? 'bg-pink-500/10 scale-110' : 'bg-pink-500/5'}
        `} />
        <div className={`
          absolute bottom-0 right-1/4 w-[70%] h-[60%] rounded-full blur-[50px] transition-all duration-700
          ${isSelected ? 'bg-purple-500/10 scale-110' : 'bg-purple-500/5'}
        `} />
      </div>

      {/* Blueprint Shimmer Sweep on Hover */}
      <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[sweep_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* Premium Border for Selected State */}
      <div className={`
        absolute inset-0 rounded-[24px] transition-all duration-500
        ${isSelected ? 'opacity-100' : 'opacity-0'}
        bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-[1px]
      `}>
        <div className="absolute inset-[1px] rounded-[23px] bg-black/40 backdrop-blur-md shadow-[inset_0_0_30px_rgba(236,72,153,0.15)]" />
      </div>
      
      {/* Static Border for Unselected State */}
      <div className={`
        absolute inset-0 rounded-[24px] border transition-colors duration-500
        ${isSelected ? 'opacity-0' : 'border-white/10 group-hover:border-white/20'}
      `} />

      {/* Selected Checkmark */}
      <AnimatePresence>
        {isSelected && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.6 }}
            className="absolute top-[18px] right-[18px] w-[24px] h-[24px] rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.6)] z-20"
          >
            <Check className="w-4 h-4 text-white drop-shadow-md" strokeWidth={3.5} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center gap-6 w-full">
        {/* Gradient and Colors in a neutral container */}
        <div className="flex flex-col gap-3 bg-[#050505] p-3 rounded-[16px] border border-white/10 shadow-inner">
          <div 
            className={`w-[110px] sm:w-[130px] h-[44px] rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500
              ${isSelected ? 'border border-white/20 scale-[1.02]' : 'border border-white/10 group-hover:scale-[1.02]'}
            `}
            style={{ background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})` }}
          >
             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_4s_linear_infinite] opacity-50 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="flex gap-[10px] justify-center">
            {gradient.previewColors.map((color: string, i: number) => (
              <div 
                key={i} 
                className={`w-[22px] h-[22px] rounded-full shadow-sm transition-all duration-500 border border-white/5
                  ${isSelected ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] scale-110' : 'group-hover:scale-110'}
                `}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex flex-col items-start flex-1 justify-center">
          <span className={`text-[16px] font-semibold transition-colors duration-500 ${isSelected ? 'text-white drop-shadow-md' : 'text-gray-300 group-hover:text-white'}`}>
            {gradient.name}
          </span>
          <span className={`text-[13px] font-mono mt-1.5 transition-colors duration-500 ${isSelected ? 'text-gray-300 opacity-100' : 'text-gray-500 group-hover:text-gray-400'}`}>
            {gradient.from} &rarr; {gradient.to}
          </span>
        </div>

        <div className={`relative z-10 mr-2 transition-all duration-500 ${isSelected ? 'opacity-40' : 'opacity-10 group-hover:opacity-20'}`}>
          <Icon className={`w-8 h-8 ${isSelected ? 'text-purple-400' : 'text-white group-hover:text-purple-300'}`} strokeWidth={1.5} />
        </div>
      </div>
    </motion.button>
  );
}

function CustomColorRow({ role, color, onChange, isActive, onOpen, onClose }: any) {
  const Icon = role.icon;
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, onClose]);

  return (
    <div className="relative group/row">
      <motion.div 
        className={`
          flex items-center gap-4 sm:gap-6 p-2 sm:p-3 rounded-xl transition-all duration-300
          ${isActive 
            ? 'bg-[#10121A] border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]' 
            : 'bg-transparent border border-transparent hover:bg-white/[0.02] hover:border-white/5'
          }
        `}
      >
        {/* Large Swatch */}
        <button 
          onClick={onOpen}
          aria-label={`Select color ${color}`}
          className={`
            w-10 h-10 sm:w-12 sm:h-12 rounded-[10px] shadow-sm border transition-all duration-300 shrink-0 cursor-pointer
            ${isActive ? 'border-white/20 scale-105' : 'border-white/10 group-hover/row:scale-105'}
          `}
          style={{ backgroundColor: color }}
        />
        
        {/* Texts */}
        <div className="flex-1 flex flex-col justify-center min-w-[120px]">
          <span className={`text-[15px] sm:text-[16px] font-semibold transition-colors duration-300 ${isActive ? 'text-white drop-shadow-sm' : 'text-gray-200 group-hover/row:text-white'}`}>
            {role.label}
          </span>
          <span className="text-[13px] sm:text-[14px] text-gray-400 transition-colors duration-300 group-hover/row:text-gray-300">
            {role.description}
          </span>
        </div>

        {/* HEX Input */}
        <div 
          onClick={onOpen}
          className={`
            flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border transition-all duration-300 bg-[#06070A] cursor-text
            ${isActive ? 'border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.15)]' : 'border-white/5 group-hover/row:border-white/15'}
          `}
        >
          <span className="text-gray-500 font-mono text-[13px] sm:text-[14px]">#</span>
          <HexColorInput
            color={color}
            onChange={onChange}
            prefixed={false}
            alpha={false}
            className="bg-transparent border-none outline-none w-[60px] sm:w-[70px] text-gray-200 font-mono text-[13px] sm:text-[14px] uppercase p-0 focus:ring-0 focus:text-white"
            onClick={(e) => e.stopPropagation()}
            onFocus={onOpen}
          />
        </div>

        {/* Mini Preview */}
        <div 
          className="hidden sm:block w-7 h-7 sm:w-8 sm:h-8 rounded-[8px] border border-white/10 shadow-sm shrink-0 transition-transform duration-300 group-hover/row:scale-110"
          style={{ backgroundColor: color }}
        />

        {/* Semantic Icon */}
        <div className="w-8 sm:w-10 flex justify-center shrink-0">
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-gray-600 group-hover/row:text-purple-400'}`} strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Popover */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, type: "spring", bounce: 0.4 }}
            className="absolute z-[100] right-0 sm:right-auto sm:left-4 sm:translate-x-0 bottom-[calc(100%+16px)] p-4 rounded-2xl border border-white/10 bg-[#0A0B12]/95 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(34,211,238,0.15)] flex flex-col gap-4"
          >
            <div className="custom-color-picker">
              <HexColorPicker color={color} onChange={onChange} />
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-black/40 border border-white/5">
               <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: color }} />
               <span className="text-gray-400 font-mono text-sm uppercase">{(color || '').replace('#', '')}</span>
            </div>

            <style>{`
              .custom-color-picker .react-colorful {
                width: 220px;
                height: 220px;
              }
              .custom-color-picker .react-colorful__pointer {
                width: 24px;
                height: 24px;
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.5);
                border-radius: 50%;
              }
              .custom-color-picker .react-colorful__hue {
                height: 14px;
                border-radius: 7px;
                margin-top: 16px;
                box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
              }
              .custom-color-picker .react-colorful__saturation {
                border-radius: 12px;
                border-bottom: none;
                box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ColorsThemeStep({ initialData, onBack, onNext, onDataChange }: any) {
  const [activeTab, setActiveTab] = useState(
    initialData?.colorPalette?.type === 'gradient' ? 'gradient' :
    initialData?.colorPalette?.type === 'custom' ? 'custom' : 'solid'
  );
  
  const [selectedPalette, setSelectedPalette] = useState<string | null>(
    initialData?.colorPalette?.type === 'palette' ? initialData.colorPalette.id : null
  );
  const [selectedGradient, setSelectedGradient] = useState<string | null>(
    initialData?.colorPalette?.type === 'gradient' ? initialData.colorPalette.id : null
  );
  const [selectedTheme, setSelectedTheme] = useState<string | null>(initialData?.theme || null);
  const [themeError, setThemeError] = useState(false);
  const [customColors, setCustomColors] = useState<any>(
    initialData?.colorPalette?.type === 'custom' && initialData?.colorPalette?.customRoles ? initialData.colorPalette.customRoles : {
    primary: '#3B82F6',
    secondary: '#64748B',
    accent: '#06B6D4',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F8FAFC'
  });
  const [activeColorRole, setActiveColorRole] = useState<string | null>(null);

  useEffect(() => {
    if (onDataChange) {
      let paletteValue: any = '';
      if (activeTab === 'solid') {
        const p = PALETTES.find(p => p.id === selectedPalette);
        paletteValue = p ? { ...p, type: 'palette' } : '';
      } else if (activeTab === 'gradient') {
        const g = GRADIENTS.find(g => g.id === selectedGradient);
        paletteValue = g ? { ...g, type: 'gradient' } : '';
      } else {
        paletteValue = { 
          id: 'custom', 
          name: 'Custom', 
          type: 'custom', 
          colors: [
            customColors.primary,
            customColors.secondary,
            customColors.accent,
            customColors.background,
            customColors.surface,
            customColors.text
          ],
          customRoles: customColors
        };
      }
      onDataChange({
        colorPalette: paletteValue,
        theme: selectedTheme || '',
      });
    }
  }, [selectedPalette, selectedGradient, selectedTheme, activeTab, customColors, onDataChange]);


  const activePaletteData = PALETTES.find(p => p.id === selectedPalette);
  const activeGradientData = GRADIENTS.find(g => g.id === selectedGradient);

  const handleShuffle = () => {
    if (activeTab === 'solid') {
      const available = PALETTES.filter(p => p.id !== selectedPalette);
      const random = available[Math.floor(Math.random() * available.length)];
      setSelectedPalette(random.id);
    } else if (activeTab === 'gradient') {
      const available = GRADIENTS.filter(g => g.id !== selectedGradient);
      const random = available[Math.floor(Math.random() * available.length)];
      setSelectedGradient(random.id);
    }
  };

  const isColorSelected = activeTab === 'solid' ? selectedPalette !== null : activeTab === 'gradient' ? selectedGradient !== null : true;
  const canProceed = isColorSelected && selectedTheme !== null;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pb-24 relative z-10 flex flex-col items-start pt-navbar-offset">
      
      {/* Subtle vignette/overlay to improve text separation without dimming background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,transparent_60%)] scale-150" />
      
      {/* Decorative Top Right Element */}
      <div className="absolute right-0 top-0 pointer-events-none opacity-[0.4]">
        <motion.div 
          animate={{ rotate: [0, 5, -5, 0], y: [-5, 5, -5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="relative mt-8 mr-8"
        >
          <div className="w-32 h-32 rounded-full border-2 border-purple-500/20 bg-purple-500/5 flex items-center justify-center backdrop-blur-md shadow-[0_0_40px_rgba(168,85,247,0.1)] relative">
             <Palette className="w-12 h-12 text-purple-400/50" />
             <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-blue-400/40" />
             <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-cyan-400/40" />
          </div>
          <div className="absolute -inset-6 border border-dashed border-blue-500/20 rounded-full animate-[spin_40s_linear_infinite]" />
          <div className="absolute -inset-10 border border-purple-500/10 rounded-full animate-[spin_60s_linear_infinite_reverse]" />
        </motion.div>
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 md:mb-12 w-full relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6"
      >
        <div className="flex-1">
          <div className="relative inline-block">
            {/* Subtle glow behind the heading */}
            <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none -z-10" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Colors & Theme
            </h1>
          </div>
          <p className="text-white/90 text-[17px] font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Choose a starting palette. Every color can be customized later.
          </p>
        </div>

        <div id="section-theme" className="w-full md:w-auto shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-lg flex flex-col justify-center">
          <div className="flex items-center justify-between gap-6 mb-3">
             <div className="flex flex-col">
               <h3 className="text-[14px] font-semibold text-white/90 drop-shadow-md flex items-center gap-1.5 m-0 leading-tight">
                 Theme Support <span className="text-red-400 text-[10px] font-normal">*</span>
               </h3>
               <p className="text-gray-400 text-[11px] mt-0.5">Choose supported appearance modes.</p>
             </div>
             {themeError && !selectedTheme && (
              <span className="text-amber-400 text-[11px] flex items-center gap-1 font-medium bg-amber-400/10 px-2 py-1 rounded-md">
                <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" /> Required
              </span>
             )}
          </div>
          <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2">
            <ThemeButton 
              title="Light" 
              icon={<Sun className="w-3.5 h-3.5" />} 
              isSelected={selectedTheme === 'light'} 
              onClick={() => { setSelectedTheme('light'); setThemeError(false); }} 
            />
            <ThemeButton 
              title="Dark" 
              icon={<Moon className="w-3.5 h-3.5" />} 
              isSelected={selectedTheme === 'dark'} 
              onClick={() => { setSelectedTheme('dark'); setThemeError(false); }} 
            />
            <ThemeButton 
              title="Both" 
              icon={<Monitor className="w-3.5 h-3.5" />} 
              isSelected={selectedTheme === 'system'} 
              onClick={() => { setSelectedTheme('system'); setThemeError(false); }} 
            />
          </div>
        </div>
      </motion.div>

      {/* Top Preview Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full mb-8 relative z-10"
      >
        <div className="relative overflow-hidden w-full rounded-2xl border border-[#2A2D40] bg-[#0A0B12]/80 backdrop-blur-md p-4 px-6 flex items-center justify-between group transition-colors duration-500 hover:border-indigo-500/30">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-0 w-[40%] h-[150%] -translate-y-1/2 bg-blue-500/10 blur-[50px] pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-50" />
          
          <div className="flex items-center gap-8 relative z-10">
            {/* Color Swatch Preview */}
            <div className="flex gap-2.5 h-12 items-center">
              <AnimatePresence mode="wait">
                {activeTab === 'solid' ? (
                  activePaletteData ? (
                    <motion.div
                      key="solid-active"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-2.5 h-12 items-center"
                    >
                      {activePaletteData.colors.map((color, i) => (
                        <motion.div 
                          key={`solid-${activePaletteData.id}-${i}`}
                          initial={{ opacity: 0, scale: 0.5, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.4, type: "spring", bounce: 0.5, delay: i * 0.05 }}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-white/10"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="solid-empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-2.5 h-12 items-center"
                    >
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div 
                          key={`empty-solid-${i}`}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] bg-white/5 border border-white/5"
                        />
                      ))}
                    </motion.div>
                  )
                ) : activeTab === 'gradient' ? (
                  activeGradientData ? (
                    <motion.div
                      key="gradient-active"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 h-12 items-center"
                    >
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                        className="w-[120px] h-10 sm:h-12 rounded-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-white/20 relative overflow-hidden"
                        style={{ background: `linear-gradient(to right, ${activeGradientData.from}, ${activeGradientData.to})` }}
                      >
                         <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_linear_infinite]" />
                      </motion.div>
                      <div className="flex gap-2.5 items-center">
                        {activeGradientData.colors.map((color, i) => (
                          <motion.div 
                            key={`grad-color-${activeGradientData.id}-${i}`}
                            initial={{ opacity: 0, scale: 0.5, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.4, type: "spring", bounce: 0.5, delay: 0.1 + (i * 0.05) }}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.2)] border border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="gradient-empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4 h-12 items-center"
                    >
                      <div className="w-[120px] h-10 sm:h-12 rounded-[14px] bg-white/5 border border-white/5" />
                      <div className="flex gap-2.5 items-center">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div 
                            key={`empty-grad-${i}`}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/5"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )
                ) : (
                  <motion.div
                    key="custom-active"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-2.5 h-12 items-center"
                  >
                    {Object.values(customColors).map((color, i) => (
                      <motion.div 
                        key={`custom-top-${i}`}
                        initial={{ opacity: 0, scale: 0.5, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0.5, delay: i * 0.05 }}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-white/10"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="hidden sm:block">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={activeTab === 'solid' ? (activePaletteData ? activePaletteData.name : 'empty') : activeTab === 'gradient' ? (activeGradientData ? activeGradientData.name : 'empty-grad') : 'custom-palette'}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="text-[17px] text-white/90 font-semibold drop-shadow-sm"
                >
                  {activeTab === 'solid' 
                    ? (activePaletteData ? activePaletteData.name : 'Select a palette') 
                    : activeTab === 'gradient'
                      ? (activeGradientData ? activeGradientData.name : 'Select a gradient')
                      : 'Custom Palette'}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          
          <button 
            onClick={handleShuffle}
            disabled={activeTab === 'custom'}
            className="relative z-10 px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-[13px] font-medium flex items-center gap-2 transition-all duration-300 whitespace-nowrap overflow-hidden group/btn cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            <Shuffle className="w-4 h-4 text-cyan-400 group-hover/btn:text-white transition-colors duration-300" />
            Shuffle
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex p-1.5 rounded-[14px] border border-white/5 bg-[#0A0B12]/80 mb-8 relative z-10 backdrop-blur-md"
      >
        <button 
          onClick={() => setActiveTab('solid')}
          className={`flex-1 py-3 rounded-[10px] text-[14px] font-medium transition-all duration-300 relative cursor-pointer ${activeTab === 'solid' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
          {activeTab === 'solid' && (
            <motion.div 
              layoutId="paletteTab" 
              className="absolute inset-0 rounded-[10px] bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.02)] border border-white/10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            >
               <div className="absolute -bottom-[1px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-70" />
            </motion.div>
          )}
          <span className="relative z-10">Palettes</span>
        </button>
        <button 
          onClick={() => setActiveTab('gradient')}
          className={`flex-1 py-3 rounded-[10px] text-[14px] font-medium transition-all duration-300 relative cursor-pointer ${activeTab === 'gradient' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
          {activeTab === 'gradient' && (
            <motion.div 
              layoutId="paletteTab" 
              className="absolute inset-0 rounded-[10px] bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.02)] border border-white/10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            >
               <div className="absolute -bottom-[1px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-70" />
            </motion.div>
          )}
          <span className="relative z-10">Gradients</span>
        </button>
        <button 
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-3 rounded-[10px] text-[14px] font-medium transition-all duration-300 relative cursor-pointer ${activeTab === 'custom' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
          {activeTab === 'custom' && (
            <motion.div 
              layoutId="paletteTab" 
              className="absolute inset-0 rounded-[10px] bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.02)] border border-white/10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            >
               <div className="absolute -bottom-[1px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-70" />
            </motion.div>
          )}
          <span className="relative z-10">Create Your Own</span>
        </button>
      </motion.div>

      {/* Palette/Gradient Grid */}
      <div className="w-full relative z-10 mb-16 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'solid' && (
            <motion.div 
              key="solid-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
            >
              {PALETTES.map((palette, i) => (
                <PaletteCard 
                  key={palette.id} 
                  palette={palette} 
                  isSelected={selectedPalette === palette.id} 
                  onClick={() => setSelectedPalette(palette.id)} 
                  delay={0.1 + (i * 0.03)}
                />
              ))}
            </motion.div>
          )}
          
          {activeTab === 'gradient' && (
            <motion.div 
              key="gradient-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
            >
              {GRADIENTS.map((gradient, i) => (
                <GradientCard 
                  key={gradient.id} 
                  gradient={gradient} 
                  isSelected={selectedGradient === gradient.id} 
                  onClick={() => setSelectedGradient(gradient.id)} 
                  delay={0.1 + (i * 0.03)}
                />
              ))}
            </motion.div>
          )}

          {activeTab === 'custom' && (
            <motion.div
              key="custom-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-[#0A0B12]/80 border border-[#2A2D40] rounded-[24px] p-6 relative backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-3 mb-6 px-3">
                <Brush className="w-[18px] h-[18px] text-cyan-400" strokeWidth={2.5} />
                <h2 className="text-[16px] font-semibold text-white">Pick your own colors</h2>
              </div>
              
              <div className="flex flex-col gap-2 relative">
                {CUSTOM_ROLES.map((role) => (
                  <CustomColorRow 
                    key={role.id}
                    role={role}
                    color={customColors[role.id as keyof typeof customColors]}
                    onChange={(newColor: string) => setCustomColors(prev => ({ ...prev, [role.id]: newColor }))}
                    isActive={activeColorRole === role.id}
                    onOpen={() => setActiveColorRole(role.id)}
                    onClose={() => setActiveColorRole(null)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>



      {/* Navigation Buttons */}
      <div className="w-full mt-12 pt-8 border-t border-white/5 relative z-20">
        <FloatingNav isValid={canProceed}>
          <div className="w-full flex items-center justify-between">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
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
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={() => {
                if (!canProceed) {
                  if (!selectedTheme) {
                    setThemeError(true);
                    const el = document.getElementById('section-theme');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  } else {
                    let targetId = '';
                    if (activeTab === 'solid' && !selectedPalette) targetId = 'section-palette';
                    else if (activeTab === 'gradient' && !selectedGradient) targetId = 'section-gradient';
                    
                    if (targetId) {
                      const el = document.getElementById(targetId);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }
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

function ThemeButton({ title, icon, isSelected, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        relative group flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-300 overflow-hidden cursor-pointer flex-1 min-w-[80px]
        ${isSelected 
          ? 'bg-white/10 text-white shadow-md' 
          : 'bg-black/20 hover:bg-white/5 text-gray-400 hover:text-gray-200 border border-white/5 hover:border-white/10'
        }
      `}
    >
      {isSelected && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 to-purple-500/15" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
          <div className="absolute inset-0 rounded-xl border border-indigo-400/30 shadow-[inset_0_0_15px_rgba(99,102,241,0.15)]" />
        </>
      )}
      <span className={`relative z-10 transition-colors ${isSelected ? 'text-indigo-300' : 'text-gray-400 group-hover:text-gray-200'}`}>{icon}</span>
      <span className="relative z-10 text-[13px] font-medium whitespace-nowrap">{title}</span>
    </button>
  );
}
