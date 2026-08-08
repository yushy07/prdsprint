import { motion } from "motion/react";
import { 
  Globe,
  Smartphone,
  Laptop,
  Bot,
  Settings
} from "lucide-react";
import Hyperspeed from "../effects/Hyperspeed";

interface GenerationBackgroundProps {
  isCompleted: boolean;
  prefersReducedMotion: boolean;
}

export function GenerationBackground({ 
  isCompleted, 
  prefersReducedMotion 
}: GenerationBackgroundProps) {
  return (
    <>
      {/* Full-Screen Animated Hyperspeed Background */}
      {!prefersReducedMotion && !isCompleted && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
          <Hyperspeed
            effectOptions={{
              onSpeedUp: () => {},
              onSlowDown: () => {},
              distortion: 'turbulentDistortion',
              length: 400,
              roadWidth: 10,
              islandWidth: 2,
              lanesPerRoad: 3,
              fov: 90,
              fovSpeedUp: 90,
              speedUp: 0,
              carLightsFade: 0.4,
              totalSideLightSticks: 20,
              lightPairsPerRoadWay: 30,
              shoulderLinesWidthPercentage: 0.05,
              brokenLinesWidthPercentage: 0.1,
              brokenLinesLengthPercentage: 0.5,
              lightStickWidth: [0.12, 0.5],
              lightStickHeight: [1.3, 1.7],
              movingAwaySpeed: [20, 40],
              movingCloserSpeed: [-40, -60],
              carLightsLength: [400 * 0.03, 400 * 0.1],
              carLightsRadius: [0.03, 0.08],
              carWidthPercentage: [0.3, 0.5],
              carShiftX: [-0.8, 0.8],
              carFloorSeparation: [0, 5],
              colors: {
                roadColor: 0x06080D,
                islandColor: 0x06080D,
                background: 0x06080D,
                shoulderLines: 0x131B2F,
                brokenLines: 0x131B2F,
                leftCars: [0x3B82F6, 0x6366F1, 0x8B5CF6],
                rightCars: [0xA855F7, 0x8B5CF6, 0x6366F1],
                sticks: 0x3B82F6,
              }
            }}
          />
        </div>
      )}

      {/* Background Lighting & Glows (Shifts mood on completion) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className={`absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[130px] pointer-events-none transition-all duration-1000 ${
            isCompleted 
              ? "bg-emerald-600/20" 
              : "bg-blue-600/15 animate-pulse"
          }`} 
          style={{ animationDuration: '6s' }} 
        />
        <div 
          className={`absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[130px] pointer-events-none transition-all duration-1000 ${
            isCompleted 
              ? "bg-cyan-600/20" 
              : "bg-purple-600/15 animate-pulse"
          }`} 
          style={{ animationDuration: '8s' }} 
        />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0f_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0f_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Floating Wireframe Background Illustrations */}
      {!isCompleted && (<>
      {/* Left Wireframe: Desktop Browser & Globe */}
      <div className="absolute left-4 lg:left-10 top-8 w-56 lg:w-72 pointer-events-none hidden md:block opacity-20">
        <div className="relative">
          <div className="absolute -top-8 -left-5 w-16 h-16 rounded-full border border-blue-400/30 flex items-center justify-center">
            <Globe className="w-10 h-10 text-blue-400/40" />
          </div>
          <div className="bg-[#0e1222]/80 border border-white/10 rounded-xl p-2.5 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-2.5 border-b border-white/10 pb-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
              <div className="w-2 h-2 rounded-full bg-green-400/50" />
              <div className="ml-2 h-2 w-24 bg-white/10 rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-1.5">
              <div className="col-span-1 h-14 rounded-lg bg-white/5 border border-white/5 p-1.5 flex flex-col justify-between">
                <div className="w-5 h-5 rounded bg-blue-400/20 flex items-center justify-center">
                  <Laptop className="w-3 h-3 text-blue-400/60" />
                </div>
                <div className="h-1.5 w-8 bg-white/20 rounded" />
              </div>
              <div className="col-span-2 h-14 rounded-lg bg-white/5 border border-white/5 p-1.5 space-y-1">
                <div className="h-1.5 w-3/4 bg-white/20 rounded" />
                <div className="h-1.5 w-full bg-white/10 rounded" />
                <div className="h-1.5 w-2/3 bg-white/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Wireframe: Mobile App & Bot */}
      <div className="absolute right-4 lg:right-10 top-8 w-48 lg:w-56 pointer-events-none hidden md:block opacity-20">
        <div className="relative flex flex-col items-end">
          <div className="mb-1.5 p-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400/60">
            <Bot className="w-5 h-5" />
          </div>
          <div className="w-44 bg-[#0e1222]/80 border border-white/10 rounded-2xl p-2.5 shadow-2xl backdrop-blur-sm">
            <div className="w-8 h-1 bg-white/20 rounded-full mx-auto mb-2" />
            <div className="h-20 bg-white/5 border border-white/5 rounded-xl p-2 space-y-1.5">
              <div className="h-1.5 w-10 bg-purple-400/30 rounded" />
              <div className="h-8 bg-white/5 rounded-lg border border-white/5" />
              <div className="h-1.5 w-16 bg-white/10 rounded" />
            </div>
            <div className="mt-1.5 flex justify-between items-center px-1">
              <div className="w-3.5 h-3.5 rounded-full bg-white/10" />
              <Settings className="w-3 h-3 text-slate-500" />
            </div>
          </div>
        </div>
      </div>

      </>)}
    </>
  );
}
