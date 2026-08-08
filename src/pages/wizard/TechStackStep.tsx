import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Settings, ArrowRight, ArrowLeft, Sparkles, Wand2, PenLine, Code2, Database } from "lucide-react";
import { FloatingNav } from "../../components/layout";
import { 
  ReactIcon, NextIcon, VueIcon, AngularIcon, SvelteIcon, 
  HTMLIcon, PHPIcon, WordPressIcon, NodeIcon, PythonIcon, 
  FirebaseIcon, SupabaseIcon, RubyIcon, MongoIcon, MySQLIcon, 
  PostgresIcon, SQLiteIcon, FlutterIcon, KotlinIcon
} from "../../components/TechIcons";

const OtherIcon = () => (
  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center font-bold text-gray-400 text-lg">
    O
  </div>
);

const CustomIcon = () => (
  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
    <PenLine className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
  </div>
);

const TECH_OPTIONS = {
  frontend: [
    { id: 'react', name: 'React', icon: <ReactIcon /> },
    { id: 'next', name: 'Next.js', icon: <NextIcon /> },
    { id: 'vue', name: 'Vue', icon: <VueIcon /> },
    { id: 'angular', name: 'Angular', icon: <AngularIcon /> },
    { id: 'svelte', name: 'Svelte', icon: <SvelteIcon /> },
    { id: 'html', name: 'HTML/CSS/JS', icon: <HTMLIcon /> },
    { id: 'php-html', name: 'PHP + HTML', icon: <PHPIcon /> },
    { id: 'wordpress', name: 'WordPress', icon: <WordPressIcon /> },
    { id: 'other-fe', name: 'Other', icon: <OtherIcon />, isOther: true },
    { id: 'custom-fe', name: 'Custom', icon: <CustomIcon />, isCustom: true },
  ],
  backend: [
    { id: 'node', name: 'Node.js', icon: <NodeIcon /> },
    { id: 'python', name: 'Python (Django/Flask)', icon: <PythonIcon /> },
    { id: 'firebase-fn', name: 'Firebase Functions', icon: <FirebaseIcon /> },
    { id: 'supabase-fn', name: 'Supabase', icon: <SupabaseIcon /> },
    { id: 'php', name: 'PHP', icon: <PHPIcon /> },
    { id: 'ruby', name: 'Ruby on Rails', icon: <RubyIcon /> },
    { id: 'other-be', name: 'Other', icon: <OtherIcon />, isOther: true },
    { id: 'custom-be', name: 'Custom', icon: <CustomIcon />, isCustom: true },
  ],
  database: [
    { id: 'firestore', name: 'Firestore', icon: <FirebaseIcon /> },
    { id: 'supabase-db', name: 'Supabase', icon: <SupabaseIcon /> },
    { id: 'mongodb', name: 'MongoDB', icon: <MongoIcon /> },
    { id: 'mysql', name: 'MySQL/SQL', icon: <MySQLIcon /> },
    { id: 'postgres', name: 'PostgreSQL', icon: <PostgresIcon /> },
    { id: 'sqlite', name: 'SQLite', icon: <SQLiteIcon /> },
    { id: 'other-db', name: 'Other', icon: <OtherIcon />, isOther: true },
    { id: 'custom-db', name: 'Custom', icon: <CustomIcon />, isCustom: true },
  ]
};

const ANDROID_TECH_OPTIONS = {
  frontend: [
    { id: 'flutter', name: 'Flutter', subtitle: 'Cross-platform (Dart)', icon: <FlutterIcon /> },
    { id: 'react-native', name: 'React Native', subtitle: 'Cross-platform (JS/TS)', icon: <ReactIcon /> },
    { id: 'kotlin', name: 'Android Native (Kotlin)', subtitle: 'Native Android', icon: <KotlinIcon /> },
    { id: 'other', name: 'Other', subtitle: 'Explore more options', icon: <OtherIcon />, isOther: true },
    { id: 'custom', name: 'Custom', subtitle: 'Use custom tech', icon: <CustomIcon />, isCustom: true },
  ],
  backend: [
    { id: 'firebase', name: 'Firebase', subtitle: 'Backend as a Service', icon: <FirebaseIcon /> },
    { id: 'supabase', name: 'Supabase', subtitle: 'Open Source BaaS', icon: <SupabaseIcon /> },
    { id: 'node-sql', name: 'Node.js + SQL', subtitle: 'Custom Backend', icon: <NodeIcon /> },
    { id: 'php-sql', name: 'PHP + SQL', subtitle: 'Server-side + DB', icon: <PHPIcon /> },
    { id: 'other-be', name: 'Other', subtitle: 'Explore more options', icon: <OtherIcon />, isOther: true },
    { id: 'custom-be', name: 'Custom', subtitle: 'Use custom tech', icon: <CustomIcon />, isCustom: true },
  ]
};

function TechCard({ tech, isSelected, onClick, delay }: any) {
  const isDashed = tech.isOther || tech.isCustom;
  return (
    <motion.button
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.4 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative group w-full flex flex-col items-center justify-center rounded-2xl p-4 sm:p-5 transition-all duration-500 backdrop-blur-xl overflow-hidden
        ${isSelected 
          ? 'bg-black/60 shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_40px_rgba(59,130,246,0.15)]' 
          : 'bg-black/30 hover:bg-black/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
        }
      `}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background Glows */}
      <div className={`
        absolute inset-0 transition-opacity duration-700
        ${isSelected ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'}
      `}>
        {/* Soft breathing glow (idle) / brighter (selected/hover) */}
        <div className={`
          absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] rounded-full blur-[60px] transition-all duration-700
          ${isSelected ? 'bg-cyan-500/30 scale-110' : 'bg-blue-500/15'}
        `} />
        <div className={`
          absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full blur-[70px] transition-all duration-700
          ${isSelected ? 'bg-purple-500/30 scale-110' : 'bg-purple-500/15'}
        `} />
      </div>

      {/* Blueprint Shimmer Sweep on Hover */}
      <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[sweep_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      </div>

      {/* Borders */}
      {isDashed ? (
        <div className={`
          absolute inset-0 rounded-[24px] border border-dashed transition-colors duration-500
          ${isSelected ? 'border-cyan-500/60' : 'border-white/15 group-hover:border-white/30'}
        `} />
      ) : (
        <>
          {/* Cyan-Purple Premium Border for Selected State */}
          <div className={`
            absolute inset-0 rounded-[24px] transition-all duration-500
            ${isSelected ? 'opacity-100' : 'opacity-0'}
            bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-[1px]
          `}>
            <div className="absolute inset-[1px] rounded-[24px] bg-[#0D0F16]/50 backdrop-blur-sm shadow-[inset_0_0_30px_rgba(59,130,246,0.15)]" />
          </div>
          {/* Static Border for Unselected State */}
          <div className={`
            absolute inset-0 rounded-[24px] border transition-colors duration-500
            ${isSelected ? 'opacity-0' : 'border-white/10 group-hover:border-white/20'}
          `} />
        </>
      )}

      {/* Selected Checkmark */}
      <AnimatePresence>
        {isSelected && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.6 }}
            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)] z-20"
          >
            <Check className="w-4 h-4 text-white drop-shadow-md" strokeWidth={3.5} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`
        relative z-10 flex flex-col items-center justify-center transition-all duration-500 w-full
        ${isSelected ? 'scale-105' : 'group-hover:scale-105'}
      `}>
        <div className={`mb-2 flex items-center justify-center h-[42px] w-[42px] sm:h-[48px] sm:w-[48px] transition-all duration-500 ${isSelected ? 'brightness-125 drop-shadow-[0_0_25px_rgba(59,130,246,0.7)]' : 'group-hover:brightness-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]'}`}>
          {tech.icon}
        </div>
        <span className={`text-xs sm:text-sm font-semibold text-center transition-colors duration-500 ${isSelected ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-gray-300 group-hover:text-white'}`}>
          {tech.name}
        </span>
        {tech.subtitle && (
          <span className={`text-[11px] sm:text-xs text-center mt-0.5 transition-colors duration-500 font-medium ${isSelected ? 'text-gray-200' : 'text-gray-500 group-hover:text-gray-300'}`}>
            {tech.subtitle}
          </span>
        )}
      </div>
    </motion.button>
  );
}

export function TechStackStep({ initialData, onBack, onNext, platform = 'website', onDataChange }: any) {
  const [selectedFrontend, setSelectedFrontend] = useState<string | null>(initialData?.frontend || null);
  const [selectedBackend, setSelectedBackend] = useState<string | null>(initialData?.backend || null);
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(initialData?.database || null);

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        frontend: selectedFrontend || '',
        backend: selectedBackend || '',
        database: selectedDatabase || '',
      });
    }
  }, [selectedFrontend, selectedBackend, selectedDatabase, onDataChange]);

  const canProceed = platform === 'website' 
    ? (selectedFrontend || selectedBackend || selectedDatabase)
    : (selectedFrontend || selectedBackend);

  const isAndroid = platform === 'android';
  const currentOptions = isAndroid ? ANDROID_TECH_OPTIONS : TECH_OPTIONS;

  const handleUseRecommended = () => {
    if (isAndroid) {
      setSelectedFrontend('flutter');
      setSelectedBackend('firebase');
    } else {
      setSelectedFrontend('react');
      setSelectedBackend('node');
      setSelectedDatabase('firestore');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-20 relative z-10 flex flex-col items-start pt-navbar-offset">
      {/* Subtle vignette/overlay to improve text separation without dimming background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]" />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-5 sm:mb-6 w-full"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-white mb-2 tracking-tight drop-shadow-md">
          Choose your tech stack
        </h1>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg font-medium drop-shadow-md">
          Select the technologies for your project
        </p>
      </motion.div>

      {/* Recommended Stack */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full mb-6 sm:mb-8"
      >
        <div className="relative overflow-hidden w-full rounded-2xl border border-[#2A2D40] bg-[#0A0B12]/60 backdrop-blur-xl p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 group transition-colors duration-500 hover:border-indigo-500/40 hover:bg-[#0A0B12]/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-0 w-[40%] h-[150%] -translate-y-1/2 bg-indigo-500/10 blur-[60px] pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-500" />
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-50" />
          
          <div className="flex items-center gap-4 sm:gap-5 relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center relative overflow-hidden group-hover:border-indigo-500/50 transition-colors duration-500 shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] shrink-0">
              <div className="absolute inset-0 bg-indigo-400/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-300 relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-indigo-300 mb-0.5 sm:mb-1 drop-shadow-sm">Recommended Stack</h3>
              <p className="text-xs sm:text-sm font-medium text-gray-300">
                {isAndroid 
                  ? "Flutter + Firebase — Cross-platform with built-in backend" 
                  : "React + Node.js + Firestore — A fast, beginner-friendly combo"}
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleUseRecommended}
            className="relative z-10 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/30 text-white text-xs sm:text-sm font-medium flex items-center gap-2 sm:gap-2.5 transition-all duration-300 whitespace-nowrap overflow-hidden group/btn shadow-lg backdrop-blur-md cursor-pointer shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            <Wand2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-300 group-hover/btn:text-white transition-colors duration-300" />
            Use this stack
          </button>
        </div>
      </motion.div>

      {/* Categories */}
      <div className="w-full flex flex-col gap-8 sm:gap-10 relative z-10">
        
        {/* Frontend */} <div id="section-frontend" />
        <div id="section-frontend" className="w-full relative">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 mb-3 sm:mb-4"
          >
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-white/90 tracking-tight">Frontend</h3>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {currentOptions.frontend.map((tech, i) => (
              <TechCard 
                key={tech.id} 
                tech={tech} 
                isSelected={selectedFrontend === tech.id} 
                onClick={() => setSelectedFrontend(tech.id)} 
                delay={0.2 + (i * 0.05)}
              />
            ))}
          </div>
        </div>

        {/* Backend */} <div id="section-backend" />
        <div id="section-backend" className="w-full relative">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-4 mb-3 sm:mb-4"
          >
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-white/90 tracking-tight">
              {isAndroid ? 'Backend + Database' : 'Backend'}
            </h3>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {currentOptions.backend.map((tech, i) => (
              <TechCard 
                key={tech.id} 
                tech={tech} 
                isSelected={selectedBackend === tech.id} 
                onClick={() => setSelectedBackend(tech.id)} 
                delay={0.3 + (i * 0.05)}
              />
            ))}
          </div>
        </div>

        {/* Database */} <div id="section-database" />
        {!isAndroid && (
          <div id="section-database" className="w-full relative">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 mb-3 sm:mb-4"
            >
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white/90 tracking-tight">Database</h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
              {TECH_OPTIONS.database.map((tech, i) => (
                <TechCard 
                  key={tech.id} 
                  tech={tech} 
                  isSelected={selectedDatabase === tech.id} 
                  onClick={() => setSelectedDatabase(tech.id)} 
                  delay={0.4 + (i * 0.05)}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Decorative Blueprint Elements (Right Side) */}
      <div className="absolute right-[-200px] 2xl:right-[-300px] top-[200px] pointer-events-none opacity-0 lg:opacity-[0.2]">
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {isAndroid ? (
            <div className="relative mt-10 right-20">
              {/* Mobile Wireframe */}
              <div className="w-[140px] h-[280px] rounded-3xl border-2 border-cyan-500/30 bg-cyan-900/10 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.1)] relative overflow-hidden flex flex-col p-3">
                <div className="w-12 h-1.5 bg-cyan-500/20 rounded-full mx-auto mb-4" />
                <div className="w-full h-24 rounded-xl border border-dashed border-cyan-500/30 bg-cyan-500/5 mb-3 flex items-center justify-center">
                   <div className="w-8 h-8 rounded-full bg-cyan-500/20 blur-sm" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                   <div className="w-full h-3 rounded-full bg-cyan-500/10" />
                   <div className="w-[80%] h-3 rounded-full bg-cyan-500/10" />
                   <div className="w-[60%] h-3 rounded-full bg-cyan-500/10" />
                </div>
                <div className="w-full mt-auto pt-3 border-t border-cyan-500/20 flex justify-around">
                   <div className="w-4 h-4 rounded-full bg-cyan-500/20" />
                   <div className="w-4 h-4 rounded-full bg-cyan-500/20" />
                   <div className="w-4 h-4 rounded-full bg-cyan-500/20" />
                </div>
                {/* Scanner line */}
                <motion.div 
                  className="absolute left-0 right-0 h-[2px] bg-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              {/* Floating nodes */}
              <div className="absolute -left-16 top-10 w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center backdrop-blur-sm">
                 <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              </div>
              <div className="absolute -right-8 bottom-20 w-16 h-16 rounded-2xl border border-purple-500/30 bg-purple-500/10 rotate-12 backdrop-blur-sm flex items-center justify-center">
                 <Database className="w-6 h-6 text-purple-400/50" />
              </div>
            </div>
          ) : (
            <>
              {/* Floating code cards */}
              <div className="absolute -top-32 right-10 rotate-[15deg]">
                 <div className="w-24 h-16 rounded-xl border border-blue-500/30 bg-blue-500/5 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                    <Code2 className="w-8 h-8 text-blue-400/50" />
                 </div>
              </div>
              
              <div className="absolute -top-12 right-2 rotate-[-10deg]">
                 <div className="w-20 h-20 rounded-xl border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                    <span className="text-2xl font-mono text-purple-400/50">{'</>'}</span>
                 </div>
              </div>

              {/* Server Stacks */}
              <div className="flex flex-col gap-2 relative mt-20">
                 <div className="w-32 h-12 rounded-xl border border-blue-400/20 bg-blue-900/20 backdrop-blur-md flex items-center px-4 relative overflow-hidden">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent" />
                 </div>
                 <div className="w-32 h-12 rounded-xl border border-blue-400/20 bg-blue-900/20 backdrop-blur-md flex items-center px-4 relative overflow-hidden">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" style={{ animationDelay: '0.5s' }} />
                 </div>
                 <div className="w-32 h-12 rounded-xl border border-blue-400/20 bg-blue-900/20 backdrop-blur-md flex items-center px-4 relative overflow-hidden">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" style={{ animationDelay: '1s' }} />
                 </div>
              </div>
            </>
          )}

          {!isAndroid && (
            <div className="mt-20 relative">
               <div className="w-28 h-10 rounded-[50%] border border-purple-400/30 bg-purple-900/20 backdrop-blur-md shadow-[0_10px_20px_rgba(168,85,247,0.1)] relative z-30" />
               <div className="w-28 h-12 rounded-b-[50%] border-b border-l border-r border-purple-400/30 bg-purple-900/20 backdrop-blur-md -mt-5 relative z-20" />
               <div className="w-28 h-12 rounded-b-[50%] border-b border-l border-r border-purple-400/30 bg-purple-900/20 backdrop-blur-md -mt-5 relative z-10" />
               
               <div className="absolute -right-4 -bottom-4 w-14 h-14 rounded-xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-md flex items-center justify-center rotate-12 z-40">
                  <Database className="w-6 h-6 text-blue-400/50" />
               </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full mt-16 pt-8 border-t border-white/5 relative z-20">
        <FloatingNav isValid={canProceed}>
          <div className="w-full flex items-center justify-between">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={onBack}
              className="group relative flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 text-gray-300 hover:text-white text-[13px] font-medium transition-all duration-300 overflow-hidden shadow-sm cursor-pointer"
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
                  // Find first invalid section
                  let targetId = '';
                  if (!selectedFrontend) targetId = 'section-frontend';
                  else if (!selectedBackend) targetId = 'section-backend';
                  else if (!selectedDatabase) targetId = 'section-database';
                  
                  if (targetId) {
                    const el = document.getElementById(targetId);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      // Add flash effect
                      el.parentElement?.classList.add('ring-2', 'ring-red-500', 'ring-offset-8', 'ring-offset-[#06080D]', 'rounded-3xl', 'transition-all', 'duration-300');
                      setTimeout(() => {
                        el.parentElement?.classList.remove('ring-2', 'ring-red-500', 'ring-offset-8', 'ring-offset-[#06080D]', 'rounded-3xl');
                      }, 1000);
                    }
                  }
                } else {
                  onNext();
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              
              data-action="next" className={`
                group relative flex items-center gap-3 px-8 py-3.5 rounded-full text-[13px] font-semibold transition-all duration-500 overflow-hidden
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
