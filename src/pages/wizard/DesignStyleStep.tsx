import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Check, Paintbrush, Sparkles } from "lucide-react";
import { useCredits } from "@/context/CreditContext";
import { useToast } from "@/context/ToastContext";
import { canUseWebsiteStyle } from "@/lib/credits.config";
import { UpgradeModal } from "@/components/credits/UpgradeModal";
import { Lock } from "lucide-react";
import { FloatingNav } from "../../components/layout";

const STYLES = [
  { id: 'essence', name: 'Essence' },
  { id: 'aurora', name: 'Aurora' },
  { id: 'crystal', name: 'Crystal' },
  { id: 'velvet', name: 'Velvet' },
  { id: 'executive', name: 'Executive' },
  { id: 'spark', name: 'Spark' },
  { id: 'nova', name: 'Nova' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'forge', name: 'Forge' },
  { id: 'flow', name: 'Flow' },
  { id: 'mosaic', name: 'Mosaic' },
  { id: 'prestige', name: 'Prestige' }
];
const ANDROID_STYLES = [
  {
    "id": "pure",
    "name": "Pure",
    "description": "Minimal, clean, distraction-free"
  },
  {
    "id": "pulse",
    "name": "Pulse",
    "description": "Modern, social, vibrant"
  },
  {
    "id": "prism",
    "name": "Prism",
    "description": "Premium, futuristic"
  },
  {
    "id": "command",
    "name": "Command",
    "description": "Enterprise, efficient"
  },
  {
    "id": "bloom",
    "name": "Bloom",
    "description": "Wellness, calming"
  },
  {
    "id": "quantum",
    "name": "Quantum",
    "description": "AI-first, futuristic"
  },
  {
    "id": "flow",
    "name": "Flow",
    "description": "Guided, intuitive"
  },
  {
    "id": "grid",
    "name": "Grid",
    "description": "Modular, organized"
  },
  {
    "id": "prestige",
    "name": "Prestige",
    "description": "Luxury, premium"
  },
  {
    "id": "forge",
    "name": "Forge",
    "description": "Powerful, confident"
  },
  {
    "id": "joy",
    "name": "Joy",
    "description": "Playful, cheerful"
  },
  {
    "id": "canvas",
    "name": "Canvas",
    "description": "Reading-focused, editorial"
  }
];

const PreviewWrapper = ({ children, isLarge, bgClass, extra }: any) => (
  <div className={`
w-full h-full ${bgClass} overflow-hidden relative flex items-center justify-center`}>
    {extra}
    <div 
      className={`
absolute origin-center transition-transform duration-500 z-10 flex items-center justify-center ${
        isLarge ? 'w-[114%] h-[114%] scale-[0.88] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.5]'
      }`}
    >
      <div className="w-full h-full flex flex-col justify-center">
        {children}
      </div>
    </div>
  </div>
);

const StylePreview = ({ styleId, isLarge }: { styleId: string, isLarge?: boolean }) => {
  switch (styleId) {
    case 'essence':
      return (
        <PreviewWrapper isLarge={isLarge} bgClass="bg-[#F8F9FA]">
          <div className="w-full h-full flex flex-col p-12">
            <div className="flex justify-between items-center mb-16">
              <div className="w-10 h-10 bg-black rounded-full"></div>
              <div className="flex gap-8">
                <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-24 bg-black rounded-full"></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center max-w-2xl">
              <div className="h-20 w-[90%] bg-black rounded-full mb-6"></div>
              <div className="h-20 w-[70%] bg-black rounded-full mb-10"></div>
              <div className="h-6 w-[60%] bg-gray-300 rounded-full mb-12"></div>
              <div className="flex gap-6">
                <div className="h-14 w-40 bg-black rounded-full"></div>
                <div className="h-14 w-40 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </PreviewWrapper>
      );
    case 'aurora':
      return (
        <PreviewWrapper isLarge={isLarge} bgClass="bg-[#FDFBFF]" extra={
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-30%] right-[-10%] w-[70%] h-[70%] bg-violet-400/40 rounded-full blur-[120px] mix-blend-multiply"></div>
            <div className="absolute bottom-[-30%] left-[-10%] w-[70%] h-[70%] bg-fuchsia-400/40 rounded-full blur-[120px] mix-blend-multiply"></div>
            <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-cyan-400/20 rounded-full blur-[100px] mix-blend-multiply"></div>
          </div>
        }>
          <div className="w-full h-full p-10 flex flex-col relative z-10">
            <div className="h-16 w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(99,102,241,0.08)] rounded-full flex items-center px-8 justify-between shrink-0 mb-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_4px_16px_rgba(168,85,247,0.4)]"></div>
              <div className="h-10 w-36 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full shadow-[0_4px_16px_rgba(168,85,247,0.3)]"></div>
            </div>
            <div className="flex-1 flex gap-8">
              <div className="flex-1 bg-white/70 backdrop-blur-2xl shadow-[0_20px_40px_rgba(99,102,241,0.1)] border border-white rounded-[2rem] p-10 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 blur-[60px] rounded-full"></div>
                <div className="h-14 w-[80%] bg-indigo-950 rounded-full mb-6 relative z-10"></div>
                <div className="h-14 w-[60%] bg-indigo-950 rounded-full mb-8 relative z-10"></div>
                <div className="h-5 w-[70%] bg-indigo-200 rounded-full mb-12 relative z-10"></div>
                <div className="flex gap-4 relative z-10">
                  <div className="h-16 w-48 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full shadow-[0_8px_24px_rgba(168,85,247,0.4)]"></div>
                  <div className="h-16 w-48 bg-white rounded-full border-2 border-indigo-50 shadow-sm"></div>
                </div>
              </div>
              <div className="w-[35%] flex flex-col gap-8">
                <div className="flex-1 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-[2rem] shadow-[0_20px_40px_rgba(168,85,247,0.3)] p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-6 shadow-inner"></div>
                  <div className="h-6 w-full bg-white/90 rounded-full mb-4"></div>
                  <div className="h-6 w-[70%] bg-white/60 rounded-full"></div>
                </div>
                <div className="h-48 bg-white/70 backdrop-blur-2xl shadow-[0_20px_40px_rgba(99,102,241,0.1)] border border-white rounded-[2rem] p-8 flex flex-col justify-end">
                  <div className="h-5 w-full bg-indigo-100 rounded-full mb-3"></div>
                  <div className="h-5 w-[80%] bg-indigo-100 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </PreviewWrapper>
      );
    case 'crystal':
      return (
        <PreviewWrapper isLarge={isLarge} bgClass="bg-[#0f172a]" extra={
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[0%] left-[10%] w-[60%] h-[60%] bg-blue-500/30 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[0%] right-[10%] w-[60%] h-[60%] bg-teal-500/20 rounded-full blur-[120px]"></div>
          </div>
        }>
          <div className="w-full h-full p-10 flex gap-8">
            <div className="w-[28%] bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-8 flex flex-col gap-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="h-5 w-full bg-white/20 rounded-full"></div>
                <div className="h-5 w-[80%] bg-white/10 rounded-full"></div>
                <div className="h-5 w-[90%] bg-white/10 rounded-full"></div>
                <div className="h-5 w-[70%] bg-white/10 rounded-full"></div>
              </div>
              <div className="mt-auto h-40 bg-gradient-to-br from-blue-500/20 to-teal-500/20 border border-white/10 rounded-[1.5rem] backdrop-blur-md p-6 flex flex-col justify-end">
                <div className="h-4 w-[60%] bg-white/40 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-8">
              <div className="h-20 w-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[1.5rem] flex items-center px-10 justify-between shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                 <div className="h-6 w-64 bg-white/30 rounded-full"></div>
                 <div className="h-12 w-40 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
              </div>
              <div className="flex-1 bg-white/[0.04] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col gap-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px]"></div>
                <div className="h-12 w-[60%] bg-white/50 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.2)]"></div>
                <div className="h-6 w-[40%] bg-white/20 rounded-full mb-4"></div>
                <div className="grid grid-cols-2 gap-8 flex-1">
                  <div className="bg-white/5 rounded-[1.5rem] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-6 flex flex-col justify-between">
                    <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                    <div className="h-4 w-[80%] bg-white/20 rounded-full"></div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-[1.5rem] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-6 flex flex-col justify-between">
                    <div className="w-12 h-12 bg-blue-400/30 rounded-full"></div>
                    <div className="h-4 w-[80%] bg-white/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PreviewWrapper>
      );
    case 'velvet':
      return (
        <PreviewWrapper isLarge={isLarge} bgClass="bg-[#F0F3F8]">
          <div className="w-full h-full flex flex-col p-10 gap-10">
            <div className="w-full h-24 bg-[#F0F3F8] rounded-[2rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_10px_20px_rgba(0,0,0,0.04)] flex items-center px-10 justify-between shrink-0">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-blue-400 shadow-[0_6px_16px_rgba(96,165,250,0.5),inset_0_-2px_4px_rgba(0,0,0,0.1)]"></div>
                <div className="h-6 w-32 bg-slate-700 rounded-full"></div>
              </div>
              <div className="flex gap-6">
                <div className="h-5 w-20 bg-slate-300 rounded-full shadow-inner"></div>
                <div className="h-5 w-20 bg-slate-300 rounded-full shadow-inner"></div>
              </div>
            </div>
            <div className="flex-1 flex gap-10">
              <div className="flex-1 bg-[#F0F3F8] rounded-[3rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_20px_40px_rgba(0,0,0,0.06)] p-12 flex flex-col gap-10">
                <div className="h-12 w-[70%] bg-slate-700 rounded-full shadow-sm"></div>
                <div className="flex-1 bg-white/50 rounded-[2rem] shadow-[inset_0_4px_8px_rgba(0,0,0,0.02)] p-10 flex flex-col justify-center gap-6">
                  <div className="h-6 w-full bg-slate-200 rounded-full"></div>
                  <div className="h-6 w-[80%] bg-slate-200 rounded-full"></div>
                  <div className="h-6 w-[60%] bg-slate-200 rounded-full"></div>
                </div>
              </div>
              <div className="w-[35%] flex flex-col gap-10">
                <div className="flex-1 bg-blue-400 rounded-[3rem] shadow-[0_20px_40px_rgba(96,165,250,0.4),inset_0_-4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(255,255,255,0.4)] p-10 flex flex-col justify-between">
                  <div className="w-20 h-20 bg-white/20 rounded-full shadow-inner flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/90 rounded-full shadow-sm"></div>
                  </div>
                  <div className="h-6 w-full bg-white/90 rounded-full shadow-sm"></div>
                </div>
                <div className="h-48 bg-[#F0F3F8] rounded-[2rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_10px_20px_rgba(0,0,0,0.04)] p-8 flex flex-col justify-end gap-4">
                  <div className="h-5 w-full bg-slate-300 rounded-full shadow-inner"></div>
                  <div className="h-5 w-[70%] bg-slate-300 rounded-full shadow-inner"></div>
                </div>
              </div>
            </div>
          </div>
        </PreviewWrapper>
      );
    case 'executive':
      return (
        <PreviewWrapper isLarge={isLarge} bgClass="bg-[#F1F5F9]">
          <div className="w-[95%] h-[95%] bg-white rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden flex flex-col">
            <div className="h-16 bg-[#0F172A] flex items-center px-8 justify-between shrink-0 shadow-md z-10">
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <div className="h-4 w-32 bg-slate-100 rounded-sm"></div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="h-8 w-64 bg-slate-800 rounded-md shadow-inner border border-slate-700"></div>
                <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1 flex bg-slate-50">
              <div className="w-[22%] border-r border-slate-200 bg-white p-6 flex flex-col gap-6">
                <div className="h-4 w-[60%] bg-slate-400 rounded-sm mb-4"></div>
                <div className="h-4 w-full bg-blue-50 rounded-md p-3 border-l-4 border-blue-600 flex items-center">
                  <div className="h-3 w-full bg-blue-700 rounded-sm"></div>
                </div>
                <div className="h-4 w-[90%] bg-slate-100 rounded-sm"></div>
                <div className="h-4 w-[85%] bg-slate-100 rounded-sm"></div>
                <div className="h-4 w-[80%] bg-slate-100 rounded-sm"></div>
                <div className="mt-auto h-12 w-full bg-slate-100 rounded-md border border-slate-200"></div>
              </div>
              <div className="flex-1 p-8 flex flex-col gap-8 overflow-hidden">
                <div className="flex justify-between items-end">
                  <div className="h-8 w-64 bg-slate-800 rounded-sm"></div>
                  <div className="h-10 w-32 bg-blue-600 rounded-md shadow-sm"></div>
                </div>
                <div className="flex gap-6 h-32 shrink-0">
                  <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm p-6 flex flex-col justify-between">
                    <div className="h-4 w-24 bg-slate-500 rounded-sm"></div>
                    <div className="h-8 w-32 bg-slate-900 rounded-sm"></div>
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm p-6 flex flex-col justify-between">
                    <div className="h-4 w-24 bg-slate-500 rounded-sm"></div>
                    <div className="h-8 w-32 bg-slate-900 rounded-sm"></div>
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm p-6 flex flex-col justify-between border-t-4 border-t-blue-600">
                    <div className="h-4 w-24 bg-slate-500 rounded-sm"></div>
                    <div className="h-8 w-32 bg-slate-900 rounded-sm"></div>
                  </div>
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
                  <div className="h-14 border-b border-slate-200 bg-slate-50 flex items-center px-6">
                    <div className="h-4 w-48 bg-slate-700 rounded-sm"></div>
                  </div>
                  <div className="p-6 flex flex-col gap-5 flex-1 justify-center">
                    <div className="h-4 w-full bg-slate-100 rounded-sm"></div>
                    <div className="h-4 w-full bg-slate-100 rounded-sm"></div>
                    <div className="h-4 w-full bg-slate-100 rounded-sm"></div>
                    <div className="h-4 w-[70%] bg-slate-100 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PreviewWrapper>
      );
    case 'spark':
      return (
        <PreviewWrapper isLarge={isLarge} bgClass="bg-[#FFFBEC]">
          <div className="w-full h-full p-10 flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FFE5A3] rounded-full blur-[80px]"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#FFB5E8] rounded-full blur-[60px]"></div>
            <div className="h-24 bg-[#FFB5E8] border-[4px] border-black rounded-[2rem] shadow-[8px_8px_0px_rgba(0,0,0,1)] flex items-center px-8 justify-between shrink-0 relative z-10 transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white border-[4px] border-black rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#B5DEFF] rounded-full border-2 border-black"></div>
                </div>
                <div className="h-8 w-40 bg-black rounded-full"></div>
              </div>
              <div className="h-14 w-40 bg-[#B5DEFF] border-[4px] border-black rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <div className="h-4 w-20 bg-black rounded-full"></div>
              </div>
            </div>
            <div className="flex-1 flex gap-8 relative z-10">
              <div className="w-[35%] bg-white border-[4px] border-black rounded-[2.5rem] shadow-[12px_12px_0px_rgba(0,0,0,1)] p-8 flex flex-col gap-6 transform rotate-2">
                <div className="flex-1 bg-[#FCF6BD] border-[4px] border-black rounded-[1.5rem] relative overflow-hidden">
                   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                </div>
                <div className="h-8 w-[90%] bg-black rounded-full mt-4"></div>
                <div className="h-6 w-[70%] bg-black/40 rounded-full"></div>
                <div className="h-16 w-full bg-[#CAFFBF] border-[4px] border-black rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] mt-auto flex items-center justify-center">
                   <div className="h-4 w-24 bg-black rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-8">
                <div className="h-40 bg-[#B5DEFF] border-[4px] border-black rounded-[2.5rem] shadow-[12px_12px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-center transform -rotate-2 relative overflow-hidden shrink-0">
                  <div className="absolute right-[-20px] top-[-20px] text-9xl opacity-20">✨</div>
                  <div className="h-12 w-[80%] bg-black rounded-full mb-4"></div>
                  <div className="h-6 w-[50%] bg-black/50 rounded-full"></div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-8">
                  <div className="bg-[#FFD6A5] border-[4px] border-black rounded-[2rem] shadow-[8px_8px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-between hover:-translate-y-2 transition-transform">
                    <div className="w-16 h-16 bg-white border-[4px] border-black rounded-full"></div>
                    <div className="h-6 w-full bg-black rounded-full"></div>
                  </div>
                  <div className="bg-[#CAFFBF] border-[4px] border-black rounded-[2rem] shadow-[8px_8px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-between hover:-translate-y-2 transition-transform">
                    <div className="w-16 h-16 bg-white border-[4px] border-black rounded-full"></div>
                    <div className="h-6 w-full bg-black rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PreviewWrapper>
      );
    case 'nova':
      return (
        <PreviewWrapper isLarge={isLarge} bgClass="bg-[#020617]" extra={
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,transparent_20%,#020617_100%)]"></div>
          </div>
        }>
          <div className="w-full h-full p-10 flex flex-col gap-8 relative z-10">
             <div className="h-20 bg-[#0f172a]/80 backdrop-blur-md border-y border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.1)] flex items-center px-10 justify-between shrink-0">
                <div className="flex gap-6 items-center">
                   <div className="w-6 h-6 bg-cyan-400 rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.6)]"></div>
                   <div className="h-4 w-48 bg-cyan-100 rounded-sm"></div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-32 bg-cyan-950 border border-cyan-500/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-cyan-400/10"></div>
                     <div className="h-3 w-16 bg-cyan-400 rounded-sm shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                  </div>
                </div>
             </div>
             <div className="flex-1 flex gap-8">
                <div className="flex-1 flex flex-col gap-8">
                   <div className="flex-1 bg-[#0f172a]/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.08),inset_0_0_20px_rgba(6,182,212,0.05)] p-8 relative overflow-hidden flex flex-col">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                      <div className="h-6 w-64 bg-cyan-50 rounded-sm mb-8"></div>
                      <div className="flex-1 w-full border border-cyan-500/20 rounded-xl relative flex items-end p-6 gap-3 bg-[#020617]/50">
                         <div className="flex-1 h-[30%] bg-gradient-to-t from-cyan-500/40 to-cyan-400/10 border-t border-cyan-400"></div>
                         <div className="flex-1 h-[50%] bg-gradient-to-t from-cyan-500/40 to-cyan-400/10 border-t border-cyan-400"></div>
                         <div className="flex-1 h-[40%] bg-gradient-to-t from-cyan-500/40 to-cyan-400/10 border-t border-cyan-400"></div>
                         <div className="flex-1 h-[80%] bg-gradient-to-t from-cyan-400/60 to-cyan-300/20 border-t-2 border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] relative">
                           <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-cyan-950 border border-cyan-400 px-3 py-1 rounded text-[10px] text-cyan-400 whitespace-nowrap">99.9%</div>
                         </div>
                         <div className="flex-1 h-[60%] bg-gradient-to-t from-cyan-500/40 to-cyan-400/10 border-t border-cyan-400"></div>
                         <div className="flex-1 h-[45%] bg-gradient-to-t from-cyan-500/40 to-cyan-400/10 border-t border-cyan-400"></div>
                      </div>
                   </div>
                </div>
                <div className="w-[35%] bg-[#0f172a]/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.08),inset_0_0_20px_rgba(6,182,212,0.05)] p-8 flex flex-col gap-6 relative overflow-hidden">
                   <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px]"></div>
                   <div className="h-6 w-40 bg-cyan-50 rounded-sm mb-6"></div>
                   
                   <div className="h-20 bg-cyan-950/50 border border-cyan-500/40 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden">
                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400"></div>
                     <div className="w-12 h-12 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 flex items-center justify-center">
                       <div className="w-6 h-6 rounded-full bg-cyan-400/20"></div>
                     </div>
                     <div className="flex-1 flex flex-col gap-2">
                       <div className="h-3 w-full bg-cyan-100/80 rounded-sm"></div>
                       <div className="h-3 w-[60%] bg-cyan-400/50 rounded-sm"></div>
                     </div>
                   </div>
                   
                   <div className="h-20 bg-[#020617]/50 border border-cyan-500/20 rounded-xl p-4 flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-950/30"></div>
                     <div className="flex-1 flex flex-col gap-2">
                       <div className="h-3 w-full bg-cyan-100/40 rounded-sm"></div>
                       <div className="h-3 w-[40%] bg-cyan-500/30 rounded-sm"></div>
                     </div>
                   </div>
                   
                   <div className="h-20 bg-[#020617]/50 border border-cyan-500/20 rounded-xl p-4 flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-950/30"></div>
                     <div className="flex-1 flex flex-col gap-2">
                       <div className="h-3 w-full bg-cyan-100/40 rounded-sm"></div>
                       <div className="h-3 w-[50%] bg-cyan-500/30 rounded-sm"></div>
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </PreviewWrapper>
      );
    case 'vintage':
      return (
        <PreviewWrapper isLarge={isLarge} bgClass="bg-[#EAE4D9]">
          <div className="w-full h-full p-8 flex justify-center items-center shadow-[inset_0_0_100px_rgba(0,0,0,0.05)]">
             <div className="w-[90%] max-w-5xl bg-[#F4F1EA] border border-[#3E3832] h-[95%] flex flex-col relative shadow-[10px_10px_0px_rgba(62,56,50,0.1),0_20px_40px_rgba(0,0,0,0.1)]">
                <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-[#3E3832]/20"></div>
                <div className="absolute top-0 bottom-0 right-12 w-[1px] bg-[#3E3832]/20"></div>
                
                <div className="h-24 border-b-2 border-[#3E3832] flex items-center justify-between px-16 shrink-0 relative z-10 bg-[#F4F1EA]">
                   <div className="h-8 w-48 bg-[#2C2825]"></div>
                   <div className="flex gap-8 items-center">
                      <div className="h-4 w-16 bg-[#2C2825]/80"></div>
                      <div className="h-4 w-16 bg-[#2C2825]/80"></div>
                      <div className="h-10 w-32 bg-[#2C2825] flex items-center justify-center">
                        <div className="h-3 w-16 bg-[#F4F1EA]"></div>
                      </div>
                   </div>
                </div>
                <div className="flex-1 flex">
                   <div className="w-[55%] p-16 border-r border-[#3E3832] flex flex-col gap-8 relative">
                      <div className="absolute top-0 right-0 w-16 h-16 border-b border-l border-[#3E3832]/20"></div>
                      <div className="h-4 w-32 bg-[#D33F31] mb-4"></div>
                      <div className="h-20 w-[95%] bg-[#2C2825]"></div>
                      <div className="h-20 w-[85%] bg-[#2C2825]"></div>
                      <div className="mt-12 flex flex-col gap-4">
                         <div className="h-4 w-full bg-[#3E3832]/30"></div>
                         <div className="h-4 w-full bg-[#3E3832]/30"></div>
                         <div className="h-4 w-full bg-[#3E3832]/30"></div>
                         <div className="h-4 w-[70%] bg-[#3E3832]/30"></div>
                      </div>
                   </div>
                   <div className="flex-1 p-12 flex flex-col gap-8 bg-[#EAE4D9]/30">
                      <div className="w-full flex-1 bg-[#D9D3C8] border-2 border-[#3E3832] p-4 flex flex-col justify-end relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
                        <div className="h-12 w-full bg-[#3E3832]/10 backdrop-blur-sm border-t border-[#3E3832] flex items-center px-4 relative z-10">
                           <div className="h-3 w-32 bg-[#2C2825]/80"></div>
                        </div>
                      </div>
                      <div className="h-48 w-full border-t border-b border-[#3E3832] py-6 flex gap-6">
                        <div className="flex-1 bg-[#2C2825]"></div>
                        <div className="flex-1 flex flex-col gap-3">
                          <div className="h-4 w-full bg-[#3E3832]/40"></div>
                          <div className="h-4 w-full bg-[#3E3832]/40"></div>
                          <div className="h-4 w-[60%] bg-[#3E3832]/40"></div>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </PreviewWrapper>
      );
    case 'forge':
      return (
        <PreviewWrapper isLarge={isLarge} bgClass="bg-[#E5E5E5]">
          <div className="w-full h-full p-10 flex flex-col gap-8 font-sans">
             <div className="h-24 bg-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] flex items-center px-10 justify-between shrink-0 hover:translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all">
                <div className="h-10 w-64 bg-black"></div>
                <div className="flex gap-6">
                  <div className="h-6 w-24 bg-black/10 flex items-center justify-center"><div className="h-2 w-12 bg-black"></div></div>
                  <div className="h-6 w-24 bg-black/10 flex items-center justify-center"><div className="h-2 w-12 bg-black"></div></div>
                  <div className="h-14 w-40 bg-black flex items-center justify-center hover:bg-[#FF3B30] transition-colors cursor-pointer">
                     <div className="h-4 w-20 bg-white"></div>
                  </div>
                </div>
             </div>
             <div className="flex-1 flex gap-8">
                <div className="flex-1 bg-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] p-12 flex flex-col justify-center gap-12 relative overflow-hidden">
                   <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FFD60A] border-4 border-black rounded-full mix-blend-multiply"></div>
                   <div className="flex flex-col gap-6 relative z-10">
                      <div className="h-24 w-[90%] bg-black"></div>
                      <div className="h-24 w-[75%] bg-black"></div>
                   </div>
                   <div className="flex gap-6 relative z-10">
                      <div className="h-20 w-48 bg-[#FF3B30] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                        <div className="h-4 w-24 bg-white"></div>
                      </div>
                      <div className="h-20 w-48 bg-[#007AFF] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                        <div className="h-4 w-24 bg-white"></div>
                      </div>
                   </div>
                </div>
                <div className="w-[32%] flex flex-col gap-8">
                   <div className="flex-1 bg-[#FFD60A] border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-between hover:translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all">
                      <div className="flex flex-col gap-4">
                        <div className="h-10 w-full bg-black"></div>
                        <div className="h-10 w-[70%] bg-black"></div>
                      </div>
                      <div className="h-16 w-16 bg-white border-4 border-black rounded-full mt-8"></div>
                   </div>
                   <div className="h-48 bg-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] p-8 flex flex-col gap-4">
                      <div className="h-4 w-full bg-black/20"></div>
                      <div className="h-4 w-full bg-black/20"></div>
                      <div className="h-4 w-[60%] bg-black/20"></div>
                      <div className="mt-auto h-12 w-full bg-black"></div>
                   </div>
                </div>
             </div>
          </div>
        </PreviewWrapper>
      );
    case 'flow':
      return (
        <PreviewWrapper isLarge={isLarge} bgClass="bg-[#F8FAFC]">
          <div className="w-[90%] h-[90%] max-w-6xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex overflow-hidden">
             <div className="w-72 bg-slate-50/50 border-r border-slate-100 flex flex-col shrink-0">
                <div className="h-20 border-b border-slate-100 flex items-center px-8 shrink-0">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-blue-600 rounded-lg shadow-sm"></div>
                     <div className="h-5 w-32 bg-slate-800 rounded-md"></div>
                   </div>
                </div>
                <div className="p-6 flex flex-col gap-2">
                   <div className="h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center px-4 shrink-0 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)] gap-3">
                      <div className="w-5 h-5 bg-blue-500 rounded-md"></div>
                      <div className="h-3 w-24 bg-blue-700 rounded-sm"></div>
                   </div>
                   <div className="h-12 hover:bg-slate-100/50 rounded-xl flex items-center px-4 shrink-0 gap-3">
                      <div className="w-5 h-5 bg-slate-300 rounded-md"></div>
                      <div className="h-3 w-28 bg-slate-500 rounded-sm"></div>
                   </div>
                   <div className="h-12 hover:bg-slate-100/50 rounded-xl flex items-center px-4 shrink-0 gap-3">
                      <div className="w-5 h-5 bg-slate-300 rounded-md"></div>
                      <div className="h-3 w-20 bg-slate-500 rounded-sm"></div>
                   </div>
                </div>
                <div className="mt-auto p-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                    <div className="flex flex-col gap-2">
                      <div className="h-3 w-24 bg-slate-700 rounded-sm"></div>
                      <div className="h-2 w-16 bg-slate-400 rounded-sm"></div>
                    </div>
                  </div>
                </div>
             </div>
             <div className="flex-1 flex flex-col bg-white">
                <div className="h-20 border-b border-slate-100 flex items-center px-10 justify-between shrink-0">
                   <div className="flex items-center gap-4">
                     <div className="h-6 w-48 bg-slate-800 rounded-md"></div>
                     <div className="h-6 w-16 bg-slate-100 rounded-full"></div>
                   </div>
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-slate-50 rounded-full border border-slate-200"></div>
                     <div className="h-10 w-32 bg-blue-600 rounded-xl shadow-sm shadow-blue-600/20 flex items-center justify-center">
                       <div className="h-3 w-16 bg-white rounded-sm"></div>
                     </div>
                   </div>
                </div>
                <div className="flex-1 p-10 flex flex-col gap-8 bg-slate-50/30 overflow-auto">
                   <div className="grid grid-cols-3 gap-6">
                     <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
                       <div className="h-4 w-24 bg-slate-400 rounded-sm"></div>
                       <div className="h-8 w-32 bg-slate-800 rounded-sm"></div>
                     </div>
                     <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
                       <div className="h-4 w-24 bg-slate-400 rounded-sm"></div>
                       <div className="h-8 w-32 bg-slate-800 rounded-sm"></div>
                     </div>
                     <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
                       <div className="h-4 w-24 bg-slate-400 rounded-sm"></div>
                       <div className="h-8 w-32 bg-slate-800 rounded-sm"></div>
                     </div>
                   </div>
                   <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col gap-6">
                      <div className="h-5 w-40 bg-slate-800 rounded-md"></div>
                      <div className="h-px w-full bg-slate-100"></div>
                      <div className="flex flex-col gap-6">
                        <div className="flex gap-6 items-start">
                           <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                             <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
                           </div>
                           <div className="flex-1 flex flex-col gap-3 pt-1">
                              <div className="h-4 w-48 bg-slate-800 rounded-sm"></div>
                              <div className="h-3 w-full bg-slate-200 rounded-sm"></div>
                              <div className="h-3 w-[85%] bg-slate-200 rounded-sm"></div>
                           </div>
                        </div>
                        <div className="h-px w-full bg-slate-50"></div>
                        <div className="flex gap-6 items-start">
                           <div className="w-12 h-12 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center shrink-0">
                             <div className="w-5 h-5 bg-slate-300 rounded-sm"></div>
                           </div>
                           <div className="flex-1 flex flex-col gap-3 pt-1">
                              <div className="h-4 w-40 bg-slate-800 rounded-sm"></div>
                              <div className="h-3 w-full bg-slate-200 rounded-sm"></div>
                              <div className="h-3 w-[60%] bg-slate-200 rounded-sm"></div>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </PreviewWrapper>
      );
    case 'mosaic':
      return (
        <PreviewWrapper isLarge={isLarge} bgClass="bg-[#F3F4F6]">
          <div className="w-full h-full p-8 flex flex-col gap-6">
             <div className="h-24 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center px-10 justify-between shrink-0">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-black rounded-xl shadow-lg"></div>
                  <div className="h-6 w-40 bg-gray-800 rounded-full"></div>
                </div>
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-white rounded-full border border-gray-100 shadow-sm"></div>
                  <div className="h-12 w-32 bg-black rounded-full shadow-md flex items-center justify-center">
                    <div className="h-3 w-16 bg-white rounded-full"></div>
                  </div>
                </div>
             </div>
             <div className="flex-1 grid grid-cols-4 grid-rows-3 gap-6">
                <div className="col-span-2 row-span-2 bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 p-10 flex flex-col justify-between overflow-hidden relative">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2"></div>
                   <div className="flex flex-col gap-4 relative z-10">
                     <div className="h-4 w-24 bg-blue-500 rounded-full"></div>
                     <div className="h-10 w-[80%] bg-gray-900 rounded-full"></div>
                     <div className="h-10 w-[60%] bg-gray-900 rounded-full"></div>
                   </div>
                   <div className="h-40 bg-gray-50 rounded-[1.5rem] mt-8 flex items-end p-6 gap-4 border border-gray-100">
                      <div className="flex-1 h-[40%] bg-blue-400 rounded-t-xl"></div>
                      <div className="flex-1 h-[70%] bg-blue-500 rounded-t-xl shadow-lg"></div>
                      <div className="flex-1 h-[50%] bg-blue-400 rounded-t-xl"></div>
                      <div className="flex-1 h-[90%] bg-indigo-500 rounded-t-xl shadow-lg"></div>
                      <div className="flex-1 h-[65%] bg-blue-400 rounded-t-xl"></div>
                   </div>
                </div>
                <div className="col-span-1 row-span-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] shadow-[0_10px_30px_rgba(99,102,241,0.2)] p-8 flex flex-col justify-between text-white">
                   <div className="w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center"></div>
                   <div className="flex flex-col gap-2">
                     <div className="h-8 w-24 bg-white rounded-full shadow-sm"></div>
                     <div className="h-4 w-32 bg-white/60 rounded-full"></div>
                   </div>
                </div>
                <div className="col-span-1 row-span-1 bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-50 p-8 flex flex-col justify-between">
                   <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                     <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                   </div>
                   <div className="flex flex-col gap-2">
                     <div className="h-8 w-20 bg-gray-900 rounded-full"></div>
                     <div className="h-4 w-28 bg-gray-400 rounded-full"></div>
                   </div>
                </div>
                <div className="col-span-2 row-span-1 bg-[#111827] rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-8 flex items-center justify-between overflow-hidden relative">
                   <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-[40px]"></div>
                   <div className="flex flex-col gap-4 relative z-10">
                      <div className="h-8 w-56 bg-white rounded-full"></div>
                      <div className="h-4 w-32 bg-gray-400 rounded-full"></div>
                   </div>
                   <div className="h-16 w-16 bg-emerald-500 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)] border-4 border-[#111827] relative z-10 flex items-center justify-center"></div>
                </div>
                <div className="col-span-4 row-span-1 bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 p-8 flex items-center justify-between px-10">
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center">
                      <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="h-6 w-48 bg-gray-900 rounded-full"></div>
                      <div className="h-4 w-32 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-12 w-32 bg-gray-100 rounded-full"></div>
                    <div className="h-12 w-32 bg-black rounded-full"></div>
                  </div>
                </div>
             </div>
          </div>
        </PreviewWrapper>
      );
    case 'prestige':
      return (
        <PreviewWrapper isLarge={isLarge} bgClass="bg-[#050505]">
          <div className="w-full h-full p-12 flex justify-center items-center relative overflow-hidden">
             <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#C5A880]/10 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#C5A880]/10 rounded-full blur-[120px]"></div>
             <div className="w-[95%] max-w-6xl bg-[#0A0A0A] border border-[#2A2A2A] h-full flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-10">
                <div className="h-24 border-b border-[#2A2A2A] flex items-center justify-between px-12 shrink-0 bg-[#0A0A0A]/80 backdrop-blur-xl">
                   <div className="h-6 w-12 bg-[#C5A880]"></div>
                   <div className="flex gap-12">
                      <div className="h-3 w-20 bg-[#888888]"></div>
                      <div className="h-3 w-20 bg-[#EAEAEA]"></div>
                      <div className="h-3 w-20 bg-[#888888]"></div>
                   </div>
                   <div className="flex gap-4 items-center">
                     <div className="h-10 w-32 border border-[#C5A880]/30 flex items-center justify-center">
                       <div className="h-3 w-16 bg-[#C5A880]"></div>
                     </div>
                   </div>
                </div>
                <div className="flex-1 flex">
                   <div className="w-[45%] p-16 flex flex-col justify-center gap-10">
                      <div className="h-3 w-32 bg-[#C5A880] tracking-widest uppercase"></div>
                      <div className="flex flex-col gap-6">
                        <div className="h-14 w-[95%] bg-[#EAEAEA]"></div>
                        <div className="h-14 w-[75%] bg-[#EAEAEA]"></div>
                      </div>
                      <div className="flex flex-col gap-4 mt-4">
                        <div className="h-4 w-[90%] bg-[#888888]/60"></div>
                        <div className="h-4 w-[85%] bg-[#888888]/60"></div>
                        <div className="h-4 w-[60%] bg-[#888888]/60"></div>
                      </div>
                      <div className="h-14 w-48 bg-[#C5A880] mt-8 flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                        <div className="h-4 w-24 bg-[#0A0A0A]"></div>
                      </div>
                   </div>
                   <div className="flex-1 border-l border-[#2A2A2A] p-12 flex flex-col">
                      <div className="w-full flex-1 bg-[#121212] border border-[#222222] relative overflow-hidden flex items-center justify-center group">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>
                         <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-[#C5A880]/5"></div>
                         <div className="w-64 h-64 rounded-full border-[1px] border-[#C5A880]/20 flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-700">
                            <div className="w-48 h-48 rounded-full border-[1px] border-[#C5A880]/40 flex items-center justify-center">
                               <div className="w-32 h-32 rounded-full border-[1px] border-[#C5A880]/60 bg-[#C5A880]/5 backdrop-blur-sm shadow-[0_0_40px_rgba(197,168,128,0.1)]"></div>
                            </div>
                         </div>
                         <div className="absolute bottom-8 right-8 h-4 w-32 bg-[#C5A880]/40"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </PreviewWrapper>
      );
    default:
      return null;
  }
};


const MobilePreviewWrapper = ({ children, isLarge, bgClass, extra }: any) => (
  <div className={`
w-full h-full ${bgClass} overflow-hidden relative flex items-center justify-center`}>
    {extra}
    <div 
      className={`
absolute origin-center transition-transform duration-500 z-10 flex items-center justify-center ${
        isLarge ? 'w-[390px] h-[844px] scale-[0.58] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'w-[390px] h-[844px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] scale-[0.9]'
      }`}
    >
      <div className="w-[390px] h-[844px] bg-white rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col shrink-0 relative ring-8 ring-white/20">
        <div className="h-12 w-full flex justify-between items-center px-6 shrink-0 z-50 absolute top-0 left-0 mix-blend-difference text-white">
          <span className="font-semibold text-[14px]">9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-4 rounded-full border-2 border-current"></div>
            <div className="w-4 h-4 rounded-full border-2 border-current"></div>
            <div className="w-5 h-3 rounded-[3px] bg-current"></div>
          </div>
        </div>
        <div className="flex-1 w-full h-full flex flex-col relative z-10">
          {children}
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/20 rounded-full z-50 mix-blend-difference" />
      </div>
    </div>
  </div>
);


const MobileThumbnailWrapper = ({ children, bgClass, extra }: any) => (
  <div className={`
w-full h-full ${bgClass} overflow-hidden relative flex justify-center items-start pt-8 group-hover:pt-6 transition-all duration-500`}>
    {extra}
    <div className="w-[85%] max-w-[240px] aspect-[9/16] bg-white rounded-t-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col relative ring-[6px] ring-white/20 group-hover:ring-white/40 transition-all duration-500">
       <div className="h-10 w-full flex justify-between items-center px-5 shrink-0 z-50 absolute top-0 left-0 mix-blend-difference text-white">
          <span className="font-semibold text-[11px] tracking-wider">9:41</span>
       </div>
       <div className="flex-1 w-full h-full flex flex-col relative z-10">
          {children}
       </div>
    </div>
  </div>
);

const AndroidStyleThumb = ({ styleId }: { styleId: string }) => {
  const tasks = [
    { title: 'Design Review', time: '10:00 AM', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', bgLight: 'bg-blue-100', text: 'text-blue-500' },
    { title: 'Team Sync', time: '1:30 PM', icon: 'M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4z', bgLight: 'bg-purple-100', text: 'text-purple-500' }
  ];

  switch (styleId) {
    case 'pure':
      return (
        <MobileThumbnailWrapper bgClass="bg-slate-200">
          <div className="w-full h-full bg-white flex flex-col font-sans text-slate-800">
            <div className="h-20 px-5 pt-10 flex justify-between items-center shrink-0">
              <div className="text-[20px] font-semibold tracking-tight">Tasks</div>
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-medium text-[12px]">AL</div>
            </div>
            <div className="px-5 mb-6 shrink-0">
              <div className="text-[12px] text-slate-500 mb-2">3 pending today</div>
              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[40%] bg-slate-800 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1 px-5 flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={tasks[0].icon}/></svg>
                </div>
                <div className="flex-1 border-b border-slate-100 pb-3">
                  <div className="font-medium text-[14px]">{tasks[0].title}</div>
                  <div className="text-[12px] text-slate-500 mt-0.5">{tasks[0].time}</div>
                </div>
              </div>
            </div>
          </div>
        </MobileThumbnailWrapper>
      );
    case 'pulse':
      return (
        <MobileThumbnailWrapper bgClass="bg-gradient-to-br from-fuchsia-100 to-cyan-100">
          <div className="w-full h-full bg-[#09090B] flex flex-col font-sans text-white relative">
            <div className="absolute top-[-30%] right-[-30%] w-[200px] h-[200px] bg-fuchsia-600/40 blur-[50px] rounded-full mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-[20%] left-[-30%] w-[200px] h-[200px] bg-cyan-600/30 blur-[50px] rounded-full mix-blend-screen pointer-events-none"></div>
            <div className="h-24 px-5 pt-10 flex justify-between items-end pb-4 shrink-0 relative z-10">
              <div className="text-[24px] font-bold tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Tasks</div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fuchsia-600 to-orange-500 flex items-center justify-center font-bold text-[12px] shadow-[0_0_15px_rgba(192,38,211,0.5)]">AL</div>
            </div>
            <div className="px-5 mb-5 shrink-0 relative z-10">
              <div className="w-full bg-white/10 border border-white/20 rounded-2xl p-3 backdrop-blur-md">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="px-5 flex flex-col gap-3 relative z-10">
              <div className="bg-white/10 p-3 rounded-2xl flex gap-3 items-center backdrop-blur-md border border-white/10">
                <div className={`
w-10 h-10 rounded-xl ${tasks[0].bgLight} bg-opacity-20 flex items-center justify-center ${tasks[0].text}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={tasks[0].icon}/></svg>
                </div>
                <div>
                  <div className="font-semibold text-[14px] text-white/90">{tasks[0].title}</div>
                  <div className="text-[11px] text-white/50">{tasks[0].time}</div>
                </div>
              </div>
            </div>
          </div>
        </MobileThumbnailWrapper>
      );
    case 'prism':
      return (
        <MobileThumbnailWrapper bgClass="bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
          <div className="w-full h-full bg-[#E8F0FE] flex flex-col font-sans text-slate-800 relative">
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 opacity-70"></div>
            <div className="h-28 px-5 pt-12 flex flex-col justify-between shrink-0 relative z-10">
              <div className="flex justify-between items-center w-full">
                <div className="w-8 h-8 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/60">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
                </div>
              </div>
              <div className="text-[28px] font-bold text-slate-800 drop-shadow-sm">Tasks</div>
            </div>
            <div className="px-4 mt-2 relative z-10">
              <div className="bg-white/50 backdrop-blur-xl rounded-[20px] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/70">
                <div className="flex justify-between items-end mb-3">
                  <div className="text-[13px] font-semibold text-slate-700">Progress</div>
                  <div className="text-[20px] font-bold text-indigo-600 leading-none">40%</div>
                </div>
                <div className="h-1.5 w-full bg-white/60 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </MobileThumbnailWrapper>
      );
    case 'command':
      return (
        <MobileThumbnailWrapper bgClass="bg-zinc-300">
          <div className="w-full h-full bg-[#F4F4F5] flex flex-col font-mono text-zinc-900 border-x border-zinc-300">
            <div className="h-12 px-4 pt-6 flex justify-between items-center border-b border-zinc-300 bg-zinc-100 shrink-0">
              <div className="text-[12px] font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-zinc-900"></div>SYS.TASKS
              </div>
            </div>
            <div className="p-4 border-b border-zinc-300 bg-white shrink-0">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-bold">STATUS</div>
              <div className="flex items-center gap-3">
                <div className="text-[20px] font-bold leading-none">3</div>
                <div className="flex-1 h-3 bg-zinc-100 border border-zinc-300">
                  <div className="w-[40%] bg-zinc-800 h-full"></div>
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="bg-white border border-zinc-300 p-2 flex gap-3 items-center">
                <div className="text-[10px] font-bold text-zinc-400 w-10 text-right border-r border-zinc-200 pr-2">10:00</div>
                <div className="flex-1">
                  <div className="font-bold text-[12px] uppercase">Design</div>
                </div>
              </div>
              <div className="bg-white border border-zinc-300 p-2 flex gap-3 items-center">
                <div className="text-[10px] font-bold text-zinc-400 w-10 text-right border-r border-zinc-200 pr-2">13:30</div>
                <div className="flex-1">
                  <div className="font-bold text-[12px] uppercase">Sync</div>
                </div>
              </div>
            </div>
          </div>
        </MobileThumbnailWrapper>
      );
    case 'bloom':
      return (
        <MobileThumbnailWrapper bgClass="bg-[#F0E6E4]">
          <div className="w-full h-full bg-[#FAF6F5] flex flex-col font-serif text-[#4A3B39]">
            <div className="h-20 px-6 pt-10 flex justify-between items-center shrink-0">
              <div className="text-[24px] font-medium tracking-tight">Today</div>
            </div>
            <div className="px-6 mb-5 shrink-0">
              <div className="bg-[#F0E6E4] rounded-[20px] p-5 text-center">
                <div className="text-[13px] font-sans text-[#8A7673] mb-1">Gentle Reminder</div>
                <div className="text-[18px] font-medium text-[#4A3B39]">3 tasks</div>
                <div className="mt-3 flex justify-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#D4A373]"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-[#E5B5B5]"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-[#A3B1C6]"></div>
                </div>
              </div>
            </div>
            <div className="px-5 font-sans">
              <div className="bg-white p-4 rounded-[20px] flex gap-4 items-center shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
                <div className={`
w-10 h-10 rounded-full ${tasks[0].bgLight} bg-opacity-40 flex items-center justify-center ${tasks[0].text}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={tasks[0].icon}/></svg>
                </div>
                <div>
                  <div className="font-medium text-[14px] text-[#4A3B39]">{tasks[0].title}</div>
                  <div className="text-[12px] text-[#8A7673]">{tasks[0].time}</div>
                </div>
              </div>
            </div>
          </div>
        </MobileThumbnailWrapper>
      );
    case 'quantum':
      return (
        <MobileThumbnailWrapper bgClass="bg-black relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          <div className="w-full h-full bg-[#030308] flex flex-col font-sans text-white relative border border-indigo-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]"></div>
            <div className="h-16 px-5 pt-8 flex justify-between items-center shrink-0">
              <div className="text-[16px] font-medium tracking-widest uppercase text-cyan-400 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></div>
                TSK
              </div>
            </div>
            <div className="px-5 mb-5 shrink-0">
              <div className="w-full bg-[#080812] border border-cyan-500/40 rounded p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></div>
                <div className="text-[10px] font-mono text-cyan-500/80 uppercase tracking-widest mb-2">Core Progress</div>
                <div className="flex gap-1 h-1 w-full">
                   {[1,2,3,4,5,6].map(n => (
                     <div key={n} className={`
flex-1 h-full ${n <= 2 ? 'bg-cyan-400 shadow-[0_0_5px_#22d3ee]' : 'bg-indigo-900/50'}`}></div>
                   ))}
                </div>
              </div>
            </div>
            <div className="px-5 flex flex-col gap-3">
              <div className="bg-gradient-to-r from-[#0A0A1A] to-transparent border-l border-indigo-500/30 p-3 flex gap-3 items-center">
                <div className="w-8 h-8 bg-[#050510] flex items-center justify-center border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={tasks[0].icon}/></svg>
                </div>
                <div>
                  <div className="font-medium text-[12px] text-indigo-100 uppercase">{tasks[0].title}</div>
                </div>
              </div>
            </div>
          </div>
        </MobileThumbnailWrapper>
      );
    case 'flow':
      return (
        <MobileThumbnailWrapper bgClass="bg-teal-100">
          <div className="w-full h-full bg-white flex flex-col font-sans text-slate-800">
            <div className="h-24 px-6 pt-10 flex justify-between items-center shrink-0">
              <div>
                 <div className="text-[12px] text-slate-400 font-medium">Oct 24</div>
                 <div className="text-[22px] font-bold text-slate-800 tracking-tight">Timeline</div>
              </div>
            </div>
            <div className="flex-1 px-6 flex flex-col relative">
              <div className="absolute left-[38px] top-4 bottom-10 w-[2px] bg-teal-50"></div>
              <div className="flex flex-col gap-6 relative z-10 mt-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 pt-1 text-right">
                     <div className="text-[11px] font-bold text-slate-800">10:00</div>
                  </div>
                  <div className="relative pt-2">
                     <div className="w-3 h-3 rounded-full bg-white border-[3px] border-teal-500 absolute top-1.5 left-1/2 -translate-x-1/2 z-10"></div>
                  </div>
                  <div className="flex-1 bg-white border border-slate-100 rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                     <div className="font-semibold text-[14px] text-slate-800">{tasks[0].title}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MobileThumbnailWrapper>
      );
    case 'grid':
      return (
        <MobileThumbnailWrapper bgClass="bg-stone-300">
          <div className="w-full h-full bg-[#F5F5F4] flex flex-col font-sans text-stone-900 p-3 gap-3">
            <div className="h-12 pt-6 flex justify-between items-center shrink-0 px-2">
               <div className="text-[20px] font-bold tracking-tight">Tasks</div>
            </div>
            <div className="flex gap-3 shrink-0 h-32">
               <div className="flex-1 bg-stone-900 rounded-[20px] p-4 flex flex-col justify-between text-white relative overflow-hidden">
                 <div className="absolute -right-4 -top-4 w-16 h-16 bg-stone-800 rounded-full blur-xl"></div>
                 <div className="text-[28px] font-semibold leading-none">3</div>
                 <div className="text-[12px] text-stone-400 font-medium">Pending</div>
               </div>
               <div className="w-1/3 flex flex-col gap-3">
                 <div className="flex-1 bg-[#D4D4D8] rounded-[16px] flex items-center justify-center">
                   <div className="text-[16px] font-bold">40%</div>
                 </div>
                 <div className="flex-1 bg-white rounded-[16px] flex items-center justify-center shadow-sm">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                 </div>
               </div>
            </div>
            <div className="bg-white rounded-[20px] p-4 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-center">
                 <div className={`
w-10 h-10 rounded-xl ${tasks[0].bgLight} flex items-center justify-center ${tasks[0].text}`}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={tasks[0].icon}/></svg>
                 </div>
                 <div className="text-[11px] font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded-md">{tasks[0].time}</div>
              </div>
              <div className="font-semibold text-[15px]">{tasks[0].title}</div>
            </div>
          </div>
        </MobileThumbnailWrapper>
      );
    case 'prestige':
      return (
        <MobileThumbnailWrapper bgClass="bg-zinc-800">
          <div className="w-full h-full bg-[#111111] flex flex-col font-serif text-[#EBEBEB]">
            <div className="h-20 px-5 pt-10 flex justify-between items-center shrink-0">
              <div className="text-[26px] font-normal tracking-tight">Agenda</div>
              <div className="text-[11px] font-sans tracking-[0.2em] text-[#A38A59] uppercase">Today</div>
            </div>
            <div className="px-5 mb-8 shrink-0">
              <div className="w-full border border-[#2A2A2A] p-4 relative">
                 <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#A38A59]"></div>
                 <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#A38A59]"></div>
                 <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#A38A59]"></div>
                 <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#A38A59]"></div>
                 <div className="flex justify-between items-center font-sans">
                   <div className="text-[10px] uppercase tracking-widest text-[#888888]">Overview</div>
                   <div className="text-[12px] text-[#A38A59]">03/08</div>
                 </div>
              </div>
            </div>
            <div className="px-5 flex flex-col gap-5">
               <div className="flex gap-4 items-center">
                  <div className="font-sans text-[11px] text-[#888888] tracking-widest w-12">{tasks[0].time.split(' ')[0]}</div>
                  <div className="flex-1 border-b border-[#2A2A2A] pb-4 flex justify-between items-center">
                     <div className="text-[15px] font-normal text-[#EBEBEB]">{tasks[0].title}</div>
                  </div>
               </div>
            </div>
          </div>
        </MobileThumbnailWrapper>
      );
    case 'forge':
      return (
        <MobileThumbnailWrapper bgClass="bg-[#C6F91F]">
          <div className="w-full h-full bg-[#1A1A1A] flex flex-col font-sans">
            <div className="h-16 px-4 pt-6 flex justify-between items-center shrink-0 border-b-4 border-[#C6F91F]">
              <div className="text-[24px] font-black text-white italic tracking-tighter uppercase skew-x-[-10deg]">TASKS</div>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="w-full bg-[#C6F91F] p-4 shadow-[4px_4px_0_rgba(255,255,255,1)] shrink-0 text-black flex flex-col">
                <div className="text-[11px] font-black uppercase tracking-widest mb-1">Status</div>
                <div className="text-[28px] font-black italic uppercase leading-none skew-x-[-5deg] mb-3">3 PEND</div>
                <div className="w-full h-2 bg-black border-[1.5px] border-black">
                  <div className="h-full w-[40%] bg-white"></div>
                </div>
              </div>
              <div className="w-full bg-zinc-800 border-2 border-zinc-700 p-3 flex justify-between items-center mt-2">
                 <div>
                   <div className="text-[15px] font-black text-white uppercase italic skew-x-[-5deg]">{tasks[0].title}</div>
                 </div>
              </div>
            </div>
          </div>
        </MobileThumbnailWrapper>
      );
    case 'joy':
      return (
        <MobileThumbnailWrapper bgClass="bg-sky-200">
          <div className="w-full h-full bg-[#FFF8E7] flex flex-col font-sans">
            <div className="h-20 px-5 pt-8 flex justify-between items-center shrink-0">
               <div className="w-10 h-10 bg-amber-300 rounded-[14px] shadow-[0_4px_0_rgba(217,119,6,1)] border-[2.5px] border-amber-600 flex items-center justify-center text-amber-900">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
               </div>
               <div className="text-[22px] font-black text-slate-800">Tasks!</div>
            </div>
            <div className="px-5 mb-5 shrink-0">
               <div className="w-full bg-white rounded-[24px] p-5 shadow-[0_8px_0_rgba(203,213,225,1)] border-[3px] border-slate-200 text-center relative">
                 <div className="absolute -top-3 -right-3 w-10 h-10 bg-sky-400 rounded-full border-[3px] border-sky-600 flex items-center justify-center text-white font-black text-[16px] shadow-[0_4px_0_rgba(2,132,199,1)]">3</div>
                 <div className="text-[18px] font-black text-slate-800 mb-1">Keep it up!</div>
                 <div className="w-full h-3 bg-slate-100 rounded-full border-[2px] border-slate-200 overflow-hidden mt-3">
                    <div className="h-full w-[40%] bg-emerald-400 rounded-full"></div>
                 </div>
               </div>
            </div>
            <div className="px-5">
               <div className="w-full bg-white rounded-[20px] shadow-[0_6px_0_rgba(203,213,225,1)] border-[3px] border-slate-200 p-3 flex items-center gap-3">
                 <div className="w-10 h-10 bg-rose-300 rounded-[12px] border-[2px] border-rose-600 flex items-center justify-center text-white shadow-inner">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d={tasks[0].icon}/></svg>
                 </div>
                 <div className="flex-1">
                    <div className="text-[15px] font-black text-slate-800">{tasks[0].title}</div>
                 </div>
               </div>
            </div>
          </div>
        </MobileThumbnailWrapper>
      );
    case 'canvas':
      return (
        <MobileThumbnailWrapper bgClass="bg-[#E0E0E0]">
          <div className="w-full h-full bg-[#FAFAFA] flex flex-col font-serif">
            <div className="h-14 px-5 pt-4 flex justify-between items-center shrink-0 absolute top-0 w-full z-10 mix-blend-difference text-white">
              <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </div>
            </div>
            <div className="w-full h-48 bg-[#E0E0E0] shrink-0 relative flex items-end p-5">
              <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&q=80" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="relative z-10 w-full">
                <div className="text-[28px] font-serif text-white leading-none mb-1">Agenda</div>
              </div>
            </div>
            <div className="flex-1 px-5 py-6 flex flex-col bg-[#FAFAFA] -mt-4 rounded-t-xl relative z-10">
               <div className="flex gap-4 border-b border-slate-200 pb-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden shrink-0">
                     <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex-1">
                     <div className="text-[15px] font-serif font-bold text-slate-900 leading-tight mb-1">{tasks[0].title}</div>
                     <div className="text-[11px] font-sans text-slate-500">{tasks[0].time}</div>
                  </div>
               </div>
            </div>
          </div>
        </MobileThumbnailWrapper>
      );
    default:
      return null;
  }
};

const AndroidStylePreview = ({ styleId, isLarge }: { styleId: string, isLarge?: boolean }) => {
  const tasks = [
    { title: 'Design Review', time: '10:00 AM', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', color: 'bg-blue-500', text: 'text-blue-500', bgLight: 'bg-blue-100', border: 'border-blue-200' },
    { title: 'Team Sync', time: '1:30 PM', icon: 'M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4z', color: 'bg-purple-500', text: 'text-purple-500', bgLight: 'bg-purple-100', border: 'border-purple-200' },
    { title: 'App Update', time: '3:00 PM', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', color: 'bg-emerald-500', text: 'text-emerald-500', bgLight: 'bg-emerald-100', border: 'border-emerald-200' }
  ];

  if (!isLarge) return <AndroidStyleThumb styleId={styleId} />;
  switch (styleId) {
    case 'pure':
      return (
        <MobilePreviewWrapper isLarge={isLarge} bgClass="bg-slate-100">
          <div className="w-full h-full bg-white flex flex-col font-sans text-slate-800">
            <div className="h-24 px-6 pt-12 flex justify-between items-center shrink-0">
              <div className="text-[24px] font-semibold tracking-tight">Tasks</div>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-medium">AL</div>
            </div>
            <div className="px-6 mb-8 shrink-0">
              <div className="text-[14px] text-slate-500 mb-2">3 pending today</div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[40%] bg-slate-800 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1 px-6 flex flex-col gap-4 overflow-hidden">
              {tasks.map((t, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={t.icon}/></svg>
                  </div>
                  <div className="flex-1 border-b border-slate-100 pb-4">
                    <div className="font-medium text-[16px]">{t.title}</div>
                    <div className="text-[14px] text-slate-500 mt-0.5">{t.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-10 right-6 w-14 h-14 bg-slate-900 rounded-full shadow-lg flex items-center justify-center z-10 text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            </div>
          </div>
        </MobilePreviewWrapper>
      );
    case 'pulse':
      return (
        <MobilePreviewWrapper isLarge={isLarge} bgClass="bg-fuchsia-50">
          <div className="w-full h-full bg-[#09090B] flex flex-col font-sans text-white relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-fuchsia-600/30 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-[300px] h-[300px] bg-cyan-600/20 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>
            <div className="h-28 px-6 pt-12 flex justify-between items-end pb-4 shrink-0 relative z-10">
              <div className="text-[32px] font-bold tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Tasks</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-600 to-orange-500 flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(192,38,211,0.4)]">AL</div>
            </div>
            <div className="px-6 mb-6 shrink-0 relative z-10">
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <div className="text-[13px] text-white/60 uppercase tracking-wider font-semibold mb-2">Progress</div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex-1 px-6 flex flex-col gap-3 overflow-hidden relative z-10">
              {tasks.map((t, i) => (
                <div key={i} className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl flex gap-4 items-center">
                  <div className={`
w-12 h-12 rounded-xl ${t.bgLight} bg-opacity-20 flex items-center justify-center ${t.text}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={t.icon}/></svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[16px] text-white/90">{t.title}</div>
                    <div className="text-[13px] text-white/50 mt-1">{t.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-8 right-1/2 translate-x-1/2 w-16 h-16 bg-gradient-to-r from-fuchsia-600 to-cyan-500 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.5)] flex items-center justify-center z-10 text-white cursor-pointer hover:scale-105 transition-transform">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            </div>
          </div>
        </MobilePreviewWrapper>
      );
    case 'prism':
      return (
        <MobilePreviewWrapper isLarge={isLarge} bgClass="bg-blue-50">
          <div className="w-full h-full bg-[#E8F0FE] flex flex-col font-sans text-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 opacity-60"></div>
            <div className="h-32 px-6 pt-14 flex flex-col justify-between shrink-0 relative z-10">
              <div className="flex justify-between items-center w-full">
                <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/60">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/60 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" className="w-full h-full object-cover"/>
                </div>
              </div>
              <div className="text-[32px] font-bold text-slate-800 drop-shadow-sm">Tasks</div>
            </div>
            <div className="flex-1 px-4 pb-4 flex flex-col gap-4 overflow-hidden relative z-10 mt-4">
              <div className="bg-white/40 backdrop-blur-xl rounded-[24px] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60">
                <div className="flex justify-between items-end mb-4">
                  <div className="text-[15px] font-semibold text-slate-700">Daily Progress</div>
                  <div className="text-[24px] font-bold text-indigo-600 leading-none">40%</div>
                </div>
                <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3">
                {tasks.map((t, i) => (
                  <div key={i} className="bg-white/50 backdrop-blur-md p-4 rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-white/60 flex gap-4 items-center">
                    <div className={`
w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center ${t.text} shadow-sm border border-white/80`}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={t.icon}/></svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[16px] text-slate-800">{t.title}</div>
                      <div className="text-[13px] font-medium text-slate-500">{t.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20">
              <div className="h-14 w-14 bg-white/70 backdrop-blur-xl rounded-full border border-white/80 shadow-lg flex items-center justify-center text-indigo-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              </div>
            </div>
          </div>
        </MobilePreviewWrapper>
      );
    case 'command':
      return (
        <MobilePreviewWrapper isLarge={isLarge} bgClass="bg-zinc-200">
          <div className="w-full h-full bg-[#F4F4F5] flex flex-col font-mono text-zinc-900 border-x border-zinc-300">
            <div className="h-14 px-4 pt-4 flex justify-between items-center border-b border-zinc-300 bg-zinc-100 shrink-0">
              <div className="text-[14px] font-bold tracking-tight flex items-center gap-2">
                <div className="w-3 h-3 bg-zinc-900"></div>
                SYS.TASKS
              </div>
              <div className="text-[12px] bg-zinc-300 px-2 py-0.5 font-bold">USR_AL</div>
            </div>
            <div className="p-4 border-b border-zinc-300 bg-white shrink-0">
              <div className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2 font-bold">STATUS_REPORT</div>
              <div className="flex items-center gap-3">
                <div className="text-[24px] font-bold leading-none">3</div>
                <div className="text-[12px] text-zinc-500 leading-tight">PENDING<br/>ITEMS</div>
                <div className="flex-1 ml-4 h-4 bg-zinc-100 border border-zinc-300 flex">
                  <div className="w-[40%] bg-zinc-800 h-full"></div>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden bg-[#F4F4F5]">
              {tasks.map((t, i) => (
                <div key={i} className="bg-white border border-zinc-300 p-3 flex gap-4 items-center group hover:border-zinc-500 transition-colors">
                  <div className="text-[12px] font-bold text-zinc-400 w-12 text-right border-r border-zinc-200 pr-3">{t.time.split(' ')[0]}</div>
                  <div className="flex-1">
                    <div className="font-bold text-[14px] text-zinc-900 uppercase">{t.title}</div>
                    <div className="text-[11px] text-zinc-500 uppercase flex items-center gap-2 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
                      SCHEDULED
                    </div>
                  </div>
                  <div className="w-6 h-6 border border-zinc-300 flex items-center justify-center text-zinc-400">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-zinc-300 bg-white shrink-0">
              <div className="w-full h-12 bg-zinc-900 text-white flex items-center justify-center text-[13px] font-bold uppercase tracking-widest cursor-pointer hover:bg-zinc-800">
                [ + NEW TASK ]
              </div>
            </div>
          </div>
        </MobilePreviewWrapper>
      );
    case 'bloom':
      return (
        <MobilePreviewWrapper isLarge={isLarge} bgClass="bg-rose-50">
          <div className="w-full h-full bg-[#FAF6F5] flex flex-col font-serif text-[#4A3B39]">
            <div className="h-24 px-8 pt-10 flex justify-between items-center shrink-0">
              <div className="text-[28px] font-medium tracking-tight">Today</div>
              <div className="w-12 h-12 rounded-full overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" className="w-full h-full object-cover"/>
              </div>
            </div>
            <div className="px-8 mb-6 shrink-0">
              <div className="bg-[#F0E6E4] rounded-[24px] p-6 text-center">
                <div className="text-[15px] font-sans text-[#8A7673] mb-1">Gentle Reminder</div>
                <div className="text-[20px] font-medium text-[#4A3B39]">You have 3 tasks</div>
                <div className="mt-4 flex justify-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-[#D4A373]"></div>
                   <div className="w-2 h-2 rounded-full bg-[#E5B5B5]"></div>
                   <div className="w-2 h-2 rounded-full bg-[#A3B1C6]"></div>
                </div>
              </div>
            </div>
            <div className="flex-1 px-6 flex flex-col gap-4 overflow-hidden font-sans">
              {tasks.map((t, i) => (
                <div key={i} className="bg-white p-5 rounded-[24px] flex gap-5 items-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <div className={`
w-14 h-14 rounded-full ${t.bgLight} bg-opacity-40 flex items-center justify-center ${t.text}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={t.icon}/></svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-[17px] text-[#4A3B39]">{t.title}</div>
                    <div className="text-[14px] text-[#8A7673] mt-1">{t.time}</div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#E8E2E1]"></div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#4A3B39] rounded-full shadow-xl flex items-center justify-center z-10 text-[#FAF6F5]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
            </div>
          </div>
        </MobilePreviewWrapper>
      );
    case 'quantum':
      return (
        <MobilePreviewWrapper isLarge={isLarge} bgClass="bg-indigo-950">
          <div className="w-full h-full bg-[#030308] flex flex-col font-sans text-white relative overflow-hidden border border-indigo-500/20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px]"></div>
            
            <div className="h-20 px-6 pt-10 flex justify-between items-center shrink-0 relative z-10">
              <div className="text-[20px] font-medium tracking-widest uppercase text-cyan-400 flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                TSK_MGR
              </div>
              <div className="text-[12px] font-mono text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded">SYS_ON</div>
            </div>
            
            <div className="px-6 mb-8 shrink-0 relative z-10">
              <div className="w-full bg-[#080812] border border-cyan-500/30 rounded-lg p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#22d3ee]"></div>
                <div className="text-[11px] font-mono text-cyan-500/70 uppercase tracking-widest mb-3">Core Progress</div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-[28px] font-light text-white leading-none">40<span className="text-[16px] text-cyan-500">%</span></div>
                </div>
                <div className="flex gap-1 h-1.5 w-full">
                   {[1,2,3,4,5,6,7,8,9,10].map(n => (
                     <div key={n} className={`
flex-1 h-full ${n <= 4 ? 'bg-cyan-400 shadow-[0_0_5px_#22d3ee]' : 'bg-indigo-900/50'}`}></div>
                   ))}
                </div>
              </div>
            </div>
            
            <div className="flex-1 px-6 flex flex-col gap-4 overflow-hidden relative z-10">
              {tasks.map((t, i) => (
                <div key={i} className="bg-gradient-to-r from-[#080812] to-transparent border-l border-b border-indigo-500/20 p-4 flex gap-5 items-center relative">
                  <div className="absolute left-0 top-0 w-[2px] h-0 bg-cyan-400 transition-all group-hover:h-full"></div>
                  <div className={`
w-10 h-10 bg-[#0A0A1A] flex items-center justify-center border border-indigo-500/30 text-cyan-400`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={t.icon}/></svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-[15px] text-indigo-100 tracking-wide uppercase">{t.title}</div>
                    <div className="text-[12px] font-mono text-indigo-500 mt-1 flex items-center gap-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {t.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 shrink-0 relative z-10">
              <div className="w-full h-14 bg-gradient-to-r from-cyan-900/40 to-indigo-900/40 border border-cyan-500/50 flex items-center justify-center text-[13px] font-mono font-medium text-cyan-300 uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.15)] cursor-pointer hover:bg-cyan-900/60 transition-all">
                Initialize Task
              </div>
            </div>
          </div>
        </MobilePreviewWrapper>
      );
    case 'flow':
      return (
        <MobilePreviewWrapper isLarge={isLarge} bgClass="bg-teal-50">
          <div className="w-full h-full bg-white flex flex-col font-sans text-slate-800">
            <div className="h-28 px-8 pt-12 flex justify-between items-center shrink-0">
              <div>
                 <div className="text-[14px] text-slate-400 font-medium mb-1">October 24</div>
                 <div className="text-[28px] font-bold text-slate-800 tracking-tight">Timeline</div>
              </div>
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
            </div>
            <div className="flex-1 px-8 flex flex-col overflow-hidden relative">
              <div className="absolute left-[51px] top-6 bottom-10 w-[2px] bg-teal-50"></div>
              
              <div className="flex flex-col gap-8 relative z-10 mt-6">
                {tasks.map((t, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 pt-2 text-right">
                       <div className="text-[13px] font-bold text-slate-800">{t.time.split(' ')[0]}</div>
                       <div className="text-[11px] text-slate-400 font-medium">{t.time.split(' ')[1]}</div>
                    </div>
                    <div className="relative pt-3">
                       <div className={`
w-4 h-4 rounded-full bg-white border-[4px] ${i === 0 ? 'border-teal-500' : 'border-slate-300'} absolute top-2 left-1/2 -translate-x-1/2 z-10`}></div>
                    </div>
                    <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                       <div className="font-semibold text-[16px] text-slate-800">{t.title}</div>
                       <div className="text-[14px] text-slate-500 mt-1 flex items-center gap-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                          In Progress
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-10 right-8 w-14 h-14 bg-teal-500 rounded-full shadow-[0_8px_20px_rgba(20,184,166,0.3)] flex items-center justify-center z-10 text-white cursor-pointer hover:scale-105 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            </div>
          </div>
        </MobilePreviewWrapper>
      );
    case 'grid':
      return (
        <MobilePreviewWrapper isLarge={isLarge} bgClass="bg-stone-100">
          <div className="w-full h-full bg-[#F5F5F4] flex flex-col font-sans text-stone-900 p-4 gap-4">
            <div className="h-16 pt-4 flex justify-between items-center shrink-0 px-2">
               <div className="text-[24px] font-bold tracking-tight">Tasks</div>
               <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
               </div>
            </div>
            <div className="flex gap-4 shrink-0 h-40">
               <div className="flex-1 bg-stone-900 rounded-[28px] p-5 flex flex-col justify-between text-white relative overflow-hidden">
                 <div className="absolute -right-4 -top-4 w-24 h-24 bg-stone-800 rounded-full blur-2xl"></div>
                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                 </div>
                 <div>
                   <div className="text-[32px] font-semibold leading-none">3</div>
                   <div className="text-[14px] text-stone-400 font-medium">Pending</div>
                 </div>
               </div>
               <div className="w-1/3 flex flex-col gap-4">
                 <div className="flex-1 bg-[#D4D4D8] rounded-[24px] p-4 flex flex-col justify-between items-center">
                   <div className="text-[20px] font-bold">40%</div>
                   <div className="text-[12px] font-medium text-stone-600">Done</div>
                 </div>
                 <div className="flex-1 bg-white rounded-[24px] flex items-center justify-center shadow-sm text-stone-400 hover:text-stone-900 hover:bg-stone-50 cursor-pointer">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                 </div>
               </div>
            </div>
            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
               {tasks.map((t, i) => (
                 <div key={i} className="bg-white rounded-[28px] p-5 shadow-sm flex flex-col gap-4 shrink-0">
                    <div className="flex justify-between items-center">
                       <div className={`
w-12 h-12 rounded-xl ${t.bgLight} flex items-center justify-center ${t.text}`}>
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={t.icon}/></svg>
                       </div>
                       <div className="text-[13px] font-bold text-stone-400 bg-stone-100 px-3 py-1.5 rounded-lg">{t.time}</div>
                    </div>
                    <div>
                       <div className="font-semibold text-[18px]">{t.title}</div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </MobilePreviewWrapper>
      );
    case 'prestige':
      return (
        <MobilePreviewWrapper isLarge={isLarge} bgClass="bg-zinc-900">
          <div className="w-full h-full bg-[#111111] flex flex-col font-serif text-[#EBEBEB]">
            <div className="h-28 px-6 pt-12 flex justify-between items-center shrink-0">
              <div className="text-[32px] font-normal tracking-tight">Agenda</div>
              <div className="text-[14px] font-sans tracking-[0.2em] text-[#A38A59] uppercase">Today</div>
            </div>
            
            <div className="px-6 mb-10 shrink-0">
              <div className="w-full border border-[#2A2A2A] p-6 relative">
                 <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#A38A59]"></div>
                 <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#A38A59]"></div>
                 <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#A38A59]"></div>
                 <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#A38A59]"></div>
                 
                 <div className="flex justify-between items-center font-sans">
                   <div className="text-[12px] uppercase tracking-widest text-[#888888]">Overview</div>
                   <div className="text-[14px] text-[#A38A59]">03 / 08</div>
                 </div>
                 <div className="mt-4 h-[1px] w-full bg-[#2A2A2A]">
                   <div className="h-[1px] w-[37.5%] bg-[#A38A59]"></div>
                 </div>
              </div>
            </div>
            
            <div className="flex-1 px-6 flex flex-col gap-6 overflow-hidden">
               {tasks.map((t, i) => (
                 <div key={i} className="flex gap-5 items-center group">
                    <div className="font-sans text-[13px] text-[#888888] tracking-widest w-16">{t.time.split(' ')[0]}</div>
                    <div className="flex-1 border-b border-[#2A2A2A] pb-6 flex justify-between items-center group-hover:border-[#A38A59] transition-colors">
                       <div className="text-[18px] font-normal text-[#EBEBEB]">{t.title}</div>
                       <div className="w-8 h-8 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#A38A59]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="p-6 shrink-0">
               <div className="w-full h-14 border border-[#A38A59] flex items-center justify-center font-sans text-[12px] uppercase tracking-[0.2em] text-[#A38A59] hover:bg-[#A38A59] hover:text-[#111111] transition-colors cursor-pointer">
                 Schedule Task
               </div>
            </div>
          </div>
        </MobilePreviewWrapper>
      );
    case 'forge':
      return (
        <MobilePreviewWrapper isLarge={isLarge} bgClass="bg-zinc-800">
          <div className="w-full h-full bg-[#1A1A1A] flex flex-col font-sans">
            <div className="h-20 px-5 pt-8 flex justify-between items-center shrink-0 border-b-4 border-[#C6F91F]">
              <div className="text-[28px] font-black text-white italic tracking-tighter uppercase skew-x-[-10deg]">TASKS</div>
              <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center text-white">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
            </div>
            <div className="flex-1 p-5 flex flex-col overflow-hidden gap-5">
              <div className="w-full bg-[#C6F91F] p-5 shadow-[6px_6px_0_rgba(255,255,255,1)] shrink-0 text-black flex flex-col">
                <div className="text-[14px] font-black uppercase tracking-widest mb-1">Status</div>
                <div className="text-[40px] font-black italic uppercase leading-none skew-x-[-5deg] mb-4">3 PENDING</div>
                <div className="w-full h-3 bg-black border-2 border-black">
                  <div className="h-full w-[40%] bg-white"></div>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-2">
                {tasks.map((t, i) => (
                  <div key={i} className="w-full bg-zinc-800 border-2 border-zinc-700 p-4 flex justify-between items-center hover:border-white transition-colors">
                     <div>
                       <div className="text-[18px] font-black text-white uppercase italic skew-x-[-5deg]">{t.title}</div>
                       <div className="text-[13px] font-bold text-zinc-400 uppercase mt-1">{t.time}</div>
                     </div>
                     <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MobilePreviewWrapper>
      );
    case 'joy':
      return (
        <MobilePreviewWrapper isLarge={isLarge} bgClass="bg-amber-100">
          <div className="w-full h-full bg-[#FFF8E7] flex flex-col font-sans">
            <div className="h-24 px-6 pt-10 flex justify-between items-center shrink-0">
               <div className="w-14 h-14 bg-amber-300 rounded-[20px] shadow-[0_6px_0_rgba(217,119,6,1)] border-[3px] border-amber-600 flex items-center justify-center text-amber-900">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
               </div>
               <div className="text-[28px] font-black text-slate-800">Tasks!</div>
            </div>
            
            <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
               <div className="w-full bg-white rounded-[32px] p-6 shadow-[0_12px_0_rgba(203,213,225,1)] border-[4px] border-slate-200 shrink-0 text-center relative">
                 <div className="absolute -top-4 -right-4 w-12 h-12 bg-sky-400 rounded-full border-[3px] border-sky-600 flex items-center justify-center text-white font-black text-[20px] shadow-[0_4px_0_rgba(2,132,199,1)]">3</div>
                 <div className="text-[22px] font-black text-slate-800 mb-1">Keep it up!</div>
                 <div className="text-[14px] font-bold text-slate-500 mb-5">You're doing great today.</div>
                 <div className="w-full h-4 bg-slate-100 rounded-full border-[2px] border-slate-200 overflow-hidden">
                    <div className="h-full w-[40%] bg-emerald-400 rounded-full"></div>
                 </div>
               </div>
               
               <div className="flex flex-col gap-4 shrink-0">
                  {tasks.map((t, i) => {
                    const colors = [
                      { bg: 'bg-rose-300', border: 'border-rose-600', shadow: 'shadow-[0_6px_0_rgba(225,29,72,1)]', iconBg: 'bg-white', iconColor: 'text-rose-500' },
                      { bg: 'bg-amber-300', border: 'border-amber-600', shadow: 'shadow-[0_6px_0_rgba(217,119,6,1)]', iconBg: 'bg-white', iconColor: 'text-amber-600' },
                      { bg: 'bg-sky-300', border: 'border-sky-600', shadow: 'shadow-[0_6px_0_rgba(2,132,199,1)]', iconBg: 'bg-white', iconColor: 'text-sky-600' }
                    ];

  if (!isLarge) return <AndroidStyleThumb styleId={styleId} />;

                    const c = colors[i % colors.length];
                    return (
                      <div key={i} className={`
w-full bg-white rounded-[28px] shadow-[0_8px_0_rgba(203,213,225,1)] border-[4px] border-slate-200 p-4 flex items-center gap-4`}>
                        <div className={`
w-14 h-14 ${c.bg} rounded-[16px] border-[3px] ${c.border} flex items-center justify-center text-white shadow-inner`}>
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d={t.icon}/></svg>
                        </div>
                        <div className="flex-1">
                           <div className="text-[18px] font-black text-slate-800">{t.title}</div>
                           <div className="text-[14px] font-bold text-slate-500">{t.time}</div>
                        </div>
                      </div>
                    );
                  })}
               </div>
            </div>
            
            <div className="absolute bottom-6 right-6 w-16 h-16 bg-emerald-400 rounded-full shadow-[0_8px_0_rgba(5,150,105,1)] border-[4px] border-emerald-600 flex items-center justify-center text-white cursor-pointer active:translate-y-2 active:shadow-none transition-all z-20">
               <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
          </div>
        </MobilePreviewWrapper>
      );
    case 'canvas':
      return (
        <MobilePreviewWrapper isLarge={isLarge} bgClass="bg-[#EFEFEF]">
          <div className="w-full h-full bg-[#FAFAFA] flex flex-col font-serif">
            <div className="h-16 px-6 pt-4 flex justify-between items-center shrink-0 absolute top-0 w-full z-10 mix-blend-difference text-white">
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </div>
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
            </div>
            <div className="w-full h-72 bg-[#E0E0E0] shrink-0 relative flex items-end p-6">
              <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="relative z-10 w-full">
                <div className="bg-white text-black px-3 py-1 inline-flex text-[11px] font-sans font-bold tracking-widest uppercase mb-3">
                  Workspace
                </div>
                <div className="text-[36px] font-serif text-white leading-none mb-1">Today's Agenda</div>
                <div className="text-[14px] font-sans text-white/80">3 tasks remaining</div>
              </div>
            </div>
            <div className="flex-1 px-6 py-8 flex flex-col bg-[#FAFAFA] -mt-4 rounded-t-2xl relative z-10">
               <div className="flex flex-col gap-6">
                 {tasks.map((t, i) => (
                   <div key={i} className="flex gap-5 border-b border-slate-200 pb-6">
                      <div className="w-12 h-12 bg-slate-100 rounded-full overflow-hidden shrink-0">
                         <img src={`https://images.unsplash.com/photo-${i===0?'1507003211169-0a1dd7228f2d':i===1?'1573496359142-b8d87734a5a2':'1487222477894-8943e31ef7b2'}?w=100&h=100&fit=crop`} className="w-full h-full object-cover"/>
                      </div>
                      <div className="flex-1">
                         <div className="text-[18px] font-serif font-bold text-slate-900 leading-tight mb-1">{t.title}</div>
                         <div className="text-[13px] font-sans text-slate-500">{t.time} &mdash; Remote</div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </MobilePreviewWrapper>
      );

    default:
      return null;
  }
};

export function DesignStyleStep({ initialData, onBack, onNext, selectedPlatform, onDataChange }: any) {
  const activeStyles = selectedPlatform === 'android' ? ANDROID_STYLES : STYLES;
  const ActiveStylePreview = selectedPlatform === 'android' ? AndroidStylePreview : StylePreview;
  
  const [selectedStyle, setSelectedStyle] = useState<string | null>(initialData?.designStyle || null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const { currentPlan, isAdmin } = useCredits();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        designStyle: selectedStyle || '',
      });
    }
  }, [selectedStyle, onDataChange]);

  useEffect(() => {
    if (selectedStyle) {
      const exists = activeStyles.some(s => s.id === selectedStyle);
      if (selectedPlatform === "website" && exists && !isAdmin && !canUseWebsiteStyle(currentPlan, selectedStyle)) {
        showToast("info", "Style Unavailable", "Your selected style requires a premium plan. Please select a free style.");
        setSelectedStyle(null);
        return;
      }
      if (!exists) setSelectedStyle(null);
    }
  }, [selectedPlatform, activeStyles, selectedStyle, currentPlan, isAdmin]);

  const handleSelectStyle = (styleId: string) => {
    if (selectedPlatform === "website" && !isAdmin && !canUseWebsiteStyle(currentPlan, styleId)) {
      setShowUpgradeModal(true);
      return;
    }
    setSelectedStyle(styleId);

    // Smooth auto-scroll to preview container if it's currently outside viewport or obscured
    setTimeout(() => {
      if (!previewRef.current) return;
      const rect = previewRef.current.getBoundingClientRect();
      const navbarHeight = 90; // Clearance for top clearance

      // Check if preview top is comfortably below top clear area and bottom is visible or within view
      const isTopVisible = rect.top >= (navbarHeight - 20) && rect.top < (window.innerHeight * 0.7);
      
      if (!isTopVisible) {
        const targetY = window.scrollY + rect.top - navbarHeight;
        
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(Math.max(0, targetY), { duration: 0.8 });
        } else {
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth'
          });
        }
      }
    }, 50);
  };

  const canProceed = selectedStyle !== null;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pb-32 relative z-10 flex flex-col items-start pt-navbar-offset">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8 w-full relative z-10 flex items-center gap-4"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-sm shrink-0">
          <Paintbrush className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-white mb-1.5 tracking-tight">
            Choose your <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">style</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Pick a visual style for your project
          </p>
        </div>
      </motion.div>

      {/* Preview Section: Compact Placeholder initially, Expanded Showcase when selected */}
      {!selectedStyle ? (
        <motion.div
          ref={previewRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl mx-auto rounded-2xl border border-dashed border-white/20 bg-[#090A0F]/80 p-6 shadow-xl relative z-10 mb-8 sm:mb-10 text-center flex flex-col items-center justify-center min-h-[160px] backdrop-blur-md"
        >
          <div className="w-11 h-11 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-2.5 text-purple-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
            {selectedPlatform === 'android' ? 'Select an Android Template to Preview' : 'Select a Website Template to Preview'}
          </h3>
          <p className="text-xs text-gray-400">
            Choose a style below to see a live preview
          </p>
        </motion.div>
      ) : (
        <motion.div
          ref={previewRef}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full relative z-10 mb-10 sm:mb-14 flex justify-center scroll-mt-28 sm:scroll-mt-32"
        >
          <div className={`
w-full rounded-[28px] border border-white/10 bg-[#090A0F] p-3 shadow-[0_16px_48px_rgba(0,0,0,0.7)] relative transition-all duration-300 ${selectedPlatform === 'android' ? 'max-w-[320px] h-[520px] sm:h-[540px]' : 'max-w-3xl lg:max-w-4xl aspect-[16/9]'}`}>
             <AnimatePresence mode="wait">
               <motion.div
                 key={selectedStyle}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.2 }}
                 className="w-full h-full rounded-[18px] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border border-white/[0.03]"
               >
                 <ActiveStylePreview styleId={hoveredStyle || selectedStyle} isLarge={true} />
               </motion.div>
             </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Style Grid Gallery */}
      <motion.div
        id="section-style-gallery"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full relative z-10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {activeStyles.map((style, i) => {
            const isSelected = selectedStyle === style.id;
            const isLocked = selectedPlatform === "website" && !isAdmin && !canUseWebsiteStyle(currentPlan, style.id);
            return (
              <motion.button
                key={style.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + (i * 0.02) }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectStyle(style.id)}
                onMouseEnter={() => setHoveredStyle(style.id)}
                onMouseLeave={() => setHoveredStyle(null)}
                className={`

                  ${isLocked ? "opacity-60 grayscale-[30%]" : ""} relative group w-full flex flex-col items-center transition-all duration-300 text-center ${isLocked ? "" : "cursor-pointer"}
                  ${isSelected ? '-translate-y-2 z-20' : 'hover:-translate-y-1 z-10'}
                `}
              >
                {/* Premium Card Container */}
                <div className={`

                  relative w-full rounded-[24px] bg-[#090A0F] flex flex-col p-2.5 transition-all duration-500
                  ${isSelected 
                    ? 'shadow-[0_12px_32px_rgba(0,0,0,0.8)] border border-transparent' 
                    : 'shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.6)] border border-white/5 hover:border-white/10'
                  }
                `}>
                  {/* Selected Accent Border */}
                  {isLocked && (
                    <div className="absolute top-4 right-4 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(168,85,247,0.2)] z-30">
                      <Lock size={8} />
                      <span>Starter+</span>
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute inset-[-1px] rounded-[24px] bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 z-[-1] opacity-70" />
                  )}

                  {/* Thumbnail Preview Area */}
                  <div className="w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-[#06070A] relative z-0 shadow-[inset_0_0_12px_rgba(0,0,0,0.5)] border border-white/[0.02]">
                     {/* Overlay to prevent interaction and add slight dark tint if not selected */}
                     <div className={`
absolute inset-0 z-20 transition-colors duration-300 pointer-events-none ${isSelected ? 'bg-transparent' : 'bg-black/40 group-hover:bg-black/20'}`} />
                     <ActiveStylePreview styleId={style.id} isLarge={false} />
                  </div>
                  
                  {/* Label Area */}
                  <div className="pt-3 pb-1 px-1 flex items-center justify-between">
                    <span className={`
text-[13px] font-medium transition-colors duration-300 ${isSelected ? 'text-white font-semibold' : 'text-gray-400 group-hover:text-gray-200'}`}>
                      {style.name}
                    </span>
                    
                    {/* Selected Checkmark */}
                    <div className={`

                      w-[22px] h-[22px] rounded-full border flex items-center justify-center transition-all duration-300
                      ${isSelected ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent shadow-[0_2px_8px_rgba(59,130,246,0.5)]' : 'border-white/10 bg-white/5 opacity-0 group-hover:opacity-100'}
                    `}>
                      <Check className={`
w-3 h-3 ${isSelected ? 'text-white' : 'text-gray-400'}`} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

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
                  const el = document.getElementById('section-style-gallery');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                } else {
                  onNext();
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-action="next"
              className={`

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
              <ArrowRight className={`
w-4 h-4 relative z-10 transition-transform duration-300 ${canProceed ? 'group-hover:translate-x-1.5' : ''}`} />
            </motion.button>
          </div>
        </FloatingNav>
      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title="Unlock Premium Styles"
        body="This premium website style is available with Starter, Pro, and Ultimate plans."
      />
      </div>
    </div>
  );
}
