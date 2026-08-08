import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Check, Sparkles, Edit3, Layout, ShoppingCart, Users, GraduationCap, Briefcase, CheckSquare, Smartphone, Heart, Wallet } from "lucide-react";
import { FloatingNav } from "../../components/layout";
import { useToast } from "@/context/ToastContext";

const QUICK_STARTS = [
  {
    id: 'saas',
    title: 'SaaS Platform',
    icon: <Layout className="w-5 h-5 text-emerald-400" />,
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    description: 'Create a multi-tenant B2B platform with user authentication, subscription billing, team collaboration, and real-time analytics.',
    content: `I want to build a modern B2B SaaS platform designed for remote teams to streamline project management and collaboration. The platform solves workflow fragmentation by bringing task tracking, document sharing, and real-time team communication into a single unified workspace. Target users can easily manage projects, monitor team progress with interactive dashboards, and customize team workflows for an effortless product experience.`
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Store',
    icon: <ShoppingCart className="w-5 h-5 text-blue-400" />,
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    description: 'Build an online storefront featuring intuitive product catalogs, secure payment checkout, user wishlists, and order tracking.',
    content: `I want to launch a high-conversion e-commerce storefront for a modern retail brand. Designed for mobile and desktop shoppers, the app helps customers effortlessly discover and purchase products. Core features include an interactive product catalog with smart filtering, visual search, detailed item showcases, customer reviews, a seamless shopping cart, and one-tap checkout to deliver an inspiring, frictionless shopping journey.`
  },
  {
    id: 'social',
    title: 'Social Platform',
    icon: <Users className="w-5 h-5 text-amber-400" />,
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Design a community hub with customizable user profiles, algorithmic activity feeds, threaded discussions, and real-time messaging.',
    content: `I want to create a community-driven social platform where creators and enthusiasts can connect and share ideas. The platform solves online clutter by offering a clean space for authentic discussions, rich media posts, and interest-based groups. Users can build personalized profiles, explore algorithmic activity feeds, participate in comment threads, and engage through direct messaging for a fluid, interactive community experience.`
  },
  {
    id: 'learning',
    title: 'Learning Platform',
    icon: <GraduationCap className="w-5 h-5 text-purple-400" />,
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    description: 'Develop an educational LMS with video course modules, interactive quizzes, student progress tracking, and instructor portals.',
    content: `I want to build an interactive learning platform designed for students and professionals seeking to master new skills. The app addresses fragmented online courses by organizing structured video modules, progress tracking, and interactive quizzes in a single hub. Learners can easily explore course catalogs, track their learning milestones, complete practice exercises, and earn skill certificates through an intuitive, distraction-free interface.`
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    icon: <Briefcase className="w-5 h-5 text-pink-400" />,
    iconBg: 'bg-pink-500/10 border-pink-500/20',
    description: 'Craft a responsive portfolio showcasing featured case studies, client testimonials, interactive about section, and contact form.',
    content: `I want to create a striking personal portfolio website to showcase creative work and engineering projects to potential clients and employers. The site solves low engagement by presenting interactive case studies, a visual skills timeline, and client testimonials in an elegant layout. Visitors can explore project details, view live demonstrations, and reach out through an integrated contact form for a polished, professional presentation.`
  },
  {
    id: 'productivity',
    title: 'Productivity App',
    icon: <CheckSquare className="w-5 h-5 text-cyan-400" />,
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    description: 'Create a workflow management app with customizable Kanban boards, calendar views, task reminders, and progress analytics.',
    content: `I want to build a workspace productivity application designed for teams and individuals to organize daily projects and personal goals. The app solves task chaos by providing customizable Kanban boards, flexible list views, and a unified calendar schedule. Users can seamlessly create tasks, organize priorities, set due dates, and track project progress through a clean, fast interface optimized for daily focus and productivity.`
  }
];

const ANDROID_QUICK_STARTS = [
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    description: 'Build an AI-powered assistant with chat, voice interactions, visual image understanding, and automated personal workflows.',
    content: `I want to build an intuitive AI assistant app for Android designed to help busy professionals and students streamline daily tasks. The app acts as a personal companion that understands conversational chat, voice commands, and uploaded images. Users can ask questions, analyze photos, generate quick summaries, and execute smart action prompts through a fast, responsive mobile interface built for effortless daily interaction.`
  },
  {
    id: 'productivity',
    title: 'Productivity App',
    icon: <CheckSquare className="w-5 h-5 text-blue-400" />,
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    description: 'Create a workspace for tasks, notes, reminders, calendars, habit tracking, and seamless team collaboration.',
    content: `I want to build a feature-rich Android productivity app crafted for individuals and teams to master daily tasks and schedules. The app replaces scattered notes with a central hub combining task lists, rich notes, calendar events, and habit trackers. Users can organize priority agendas, set goal milestones, and manage shared team projects through an elegant, gesture-friendly mobile layout that keeps them organized on the go.`
  },
  {
    id: 'social',
    title: 'Social App',
    icon: <Users className="w-5 h-5 text-amber-400" />,
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Design a vibrant community platform featuring interactive profiles, real-time messaging, media sharing, and instant push notifications.',
    content: `I want to develop a vibrant Android social application where users with shared interests can connect, share media, and communicate in real time. The app solves feed clutter by offering curated community channels, interactive profiles, and direct chat. Users can publish photo and video posts, react to content, participate in group discussions, and build meaningful relationships through a sleek, engaging mobile social experience.`
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce App',
    icon: <ShoppingCart className="w-5 h-5 text-purple-400" />,
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    description: 'Launch a mobile storefront with intuitive product discovery, secure one-tap checkout, wishlists, and real-time order tracking.',
    content: `I want to create a mobile e-commerce app for Android that delivers a seamless shopping experience for retail customers. The app solves slow browsing by featuring a visual homepage, category filters, interactive product showcases, customer reviews, and a quick shopping cart. Customers can easily discover trending items, save items to wishlists, and complete purchases through a fast, delightful mobile storefront.`
  },
  {
    id: 'fitness',
    title: 'Fitness & Health App',
    icon: <Heart className="w-5 h-5 text-pink-400" />,
    iconBg: 'bg-pink-500/10 border-pink-500/20',
    description: 'Develop a health companion featuring workout plans, nutrition logging, daily goals, activity insights, and wearable integration.',
    content: `I want to create a health and fitness companion app for Android designed to help active users establish workout habits and track wellness goals. The app solves inconsistent training by offering guided workout routines, daily step logging, meal tracking, and health insight charts. Users can log daily activities, monitor fitness progress, and stay motivated through a vibrant, highly responsive coaching experience.`
  },
  {
    id: 'finance',
    title: 'Finance App',
    icon: <Wallet className="w-5 h-5 text-cyan-400" />,
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    description: 'Build a personal finance dashboard with budget planning, expense tracking, secure banking payments, and financial analytics.',
    content: `I want to build a personal finance app for Android that helps users take control of their spending, budgets, and savings. Designed for young professionals, the app simplifies money management with automated expense categorization, custom budget targets, and cash flow visualizers. Users can track daily transactions, monitor spending limits, and review financial trends through a clean, intuitive dashboard built for clarity.`
  }
];

const ANDROID_PRODUCT_FORMATS = [
  'Productivity',
  'Social',
  'AI',
  'E-Commerce',
  'Finance',
  'Health & Fitness',
  'Education',
  'Entertainment',
  'Travel',
  'Utilities'
];

const PRODUCT_FORMATS = [
  'Website',
  'Web Application',
  'Mobile Application',
  'Desktop Application',
  'Dashboard'
];

export function ProjectDetailsStep({ initialData, onBack, onNext, selectedPlatform, onDataChange }: any) {
  const toast = useToast();
  
  const activeQuickStarts = selectedPlatform === 'android' ? ANDROID_QUICK_STARTS : QUICK_STARTS;
  const activeProductFormats = selectedPlatform === 'android' ? ANDROID_PRODUCT_FORMATS : PRODUCT_FORMATS;
  
  const [selectedQuickStart, setSelectedQuickStart] = useState<string | null>(() => {
    if (!initialData?.description) return null;
    const match = activeQuickStarts.find(q => q.content === initialData.description);
    return match ? match.id : null;
  });
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [description, setDescription] = useState(initialData?.description || '');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        description: description || '',
      });
    }
  }, [description, onDataChange]);

  const handleQuickStartSelect = (id: string) => {
    setSelectedQuickStart(id);
    const qs = activeQuickStarts.find(q => q.id === id);
    if (qs) {
      setDescription(qs.content);
    }
  };

  const isFormValid = description.trim().length >= 30;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pb-32 relative z-10 flex flex-col items-start pt-navbar-offset">
      {/* Decorative Top Right Element - Blueprint Document */}
      <div className="absolute right-0 top-0 pointer-events-none opacity-60">
        <motion.div 
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative mt-4 mr-4"
        >
          {/* Document outline */}
          <div className="w-64 h-48 rounded-xl border border-blue-500/20 bg-blue-900/10 backdrop-blur-sm relative overflow-hidden -rotate-6 transform origin-bottom-right">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
             
             {/* Document lines */}
             <div className="absolute top-8 left-8 right-16 h-2 bg-blue-400/20 rounded-full" />
             <div className="absolute top-14 left-8 right-24 h-2 bg-blue-400/20 rounded-full" />
             <div className="absolute top-20 left-8 right-12 h-2 bg-blue-400/20 rounded-full" />
             <div className="absolute top-26 left-8 right-20 h-2 bg-blue-400/20 rounded-full" />
             
             {/* Pen graphic */}
             <motion.div 
               animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-6 right-6 w-12 h-12 bg-purple-500/20 border border-purple-500/40 rounded-full flex items-center justify-center rotate-45 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
             >
               <Edit3 className="w-6 h-6 text-purple-400" />
             </motion.div>
          </div>
          
          <div className="absolute top-1/2 -left-12 w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />
        </motion.div>
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-14 w-full relative z-10 flex items-center gap-5"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
          <div className="w-16 h-16 rounded-[20px] bg-white/[0.02] border border-white/10 flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md relative z-10">
            <Sparkles className="w-7 h-7 text-blue-300 drop-shadow-sm" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-white tracking-tight">
            {selectedPlatform === 'android' ? 'Describe your ' : 'Describe your '}
            <span className="bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-400 text-transparent bg-clip-text drop-shadow-sm">
              {selectedPlatform === 'android' ? 'Android app' : 'project'}
            </span>
          </h1>
          <p className="text-gray-400/90 text-[16px] md:text-[17px] font-medium">
            {selectedPlatform === 'android' ? 'Choose an Android app template or describe your app idea.' : 'Choose a template or write your own description.'}
          </p>
        </div>
      </motion.div>

      {/* Section 1: Quick Start */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full relative z-10 mb-14"
      >
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-[14px] font-bold text-white/90 uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            Quick Start
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {activeQuickStarts.map((starter, i) => {
            const isSelected = selectedQuickStart === starter.id;
            return (
              <motion.button
                key={starter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + (i * 0.05) }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleQuickStartSelect(starter.id)}
                className={`
                  relative group w-full flex items-start gap-5 rounded-[24px] p-5 transition-all duration-300 text-left backdrop-blur-md
                  ${isSelected 
                    ? 'bg-[#06080D]/80 shadow-[0_12px_32px_rgba(0,0,0,0.6)]' 
                    : 'bg-[#06080D]/60 hover:bg-[#06080D]/75 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]'
                  }
                `}
              >
                {/* Premium Border with Inner Highlight */}
                <div className={`
                  absolute inset-0 rounded-[24px] pointer-events-none transition-all duration-300
                  ${isSelected 
                    ? 'border border-blue-500/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_20px_rgba(59,130,246,0.1)]' 
                    : 'border border-white/5 group-hover:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                  }
                `} />

                {/* Selected Checkmark */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, type: "spring", bounce: 0.6 }}
                      className="absolute top-4 right-4 w-[22px] h-[22px] rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-[0_2px_8px_rgba(59,130,246,0.4)] z-20"
                    >
                      <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`
                  relative z-10 w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 border transition-all duration-300 shadow-sm
                  ${starter.iconBg}
                  ${isSelected ? 'scale-105' : 'group-hover:scale-105'}
                `}>
                  {starter.icon}
                </div>
                
                <div className="relative z-10 flex flex-col pt-0.5 pr-6">
                  <span className={`text-[15px] font-semibold transition-colors duration-300 mb-1.5 ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                    {starter.title}
                  </span>
                  <span className="text-[13.5px] text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                    {starter.description}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Section 2: Product Format */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full relative z-10 mb-14"
      >
        <div className="mb-5 flex items-center gap-4">
          <h2 className="text-[14px] font-bold text-white/90 uppercase tracking-widest">
            {selectedPlatform === 'android' ? 'App Category' : 'Product Format'} <span className="text-gray-500 font-normal ml-1">(Optional)</span>
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        
        <div className="flex flex-wrap gap-2.5">
          {activeProductFormats.map((format) => {
            const isSelected = selectedFormat === format;
            return (
              <button
                key={format}
                onClick={() => setSelectedFormat(isSelected ? null : format)}
                className={`
                  px-5 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-300 border backdrop-blur-sm shadow-sm
                  ${isSelected 
                    ? 'bg-white/10 border-white/20 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)]' 
                    : 'bg-[#06080D]/40 border-white/5 text-gray-400 hover:bg-[#06080D]/60 hover:border-white/10 hover:text-gray-200'
                  }
                `}
              >
                {format}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Section 3: Project Description */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full relative z-10 mb-12"
      >
        <div className="mb-5 flex items-center gap-4">
          <h2 className="text-[14px] font-bold text-white/90 uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            Project Description <span className="text-purple-400 font-normal ml-0.5">*</span>
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        
        <div className="relative w-full rounded-[24px] bg-[#06080D]/60 border border-white/5 overflow-hidden focus-within:border-purple-400/30 focus-within:ring-1 focus-within:ring-purple-400/30 transition-all duration-300 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
           <textarea id="section-description"
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             placeholder={selectedPlatform === 'android' ? "Describe your Android app idea, target audience, core features, user flow, authentication, offline capabilities, notifications, integrations, monetization strategy, and any additional requirements." : "Describe your project in detail..."}
             className="w-full h-56 bg-transparent p-6 text-gray-200 text-[15.5px] resize-none outline-none leading-relaxed placeholder:text-gray-500/70"
           />
           
           <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-end bg-gradient-to-t from-[#06080D] via-[#06080D]/90 to-transparent pointer-events-none">
             <div className="flex items-center gap-4 text-[13px] text-gray-500">
               <span>{description.length}/1000 characters</span>
               <span className={description.trim().length >= 30 ? "text-emerald-400/80" : ""}>
                 At least 30 required
               </span>
             </div>
             {selectedPlatform === 'android' && (
               <div className="w-full text-left mt-2 text-[12.5px] text-gray-500/60">
                 Examples: AI assistant, expense tracker, fitness app, habit tracker, food delivery app, social network, learning app.
               </div>
             )}
           </div>
        </div>
      </motion.div>

      {/* Section 4: Additional Notes */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full relative z-10"
      >
        <div className="mb-5 flex items-center gap-4">
          <h2 className="text-[14px] font-bold text-white/90 uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            Additional Notes <span className="text-gray-500 font-normal ml-1">(Optional)</span>
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        
        <div className="relative w-full rounded-[24px] bg-[#06080D]/60 border border-white/5 overflow-hidden focus-within:border-blue-400/30 focus-within:ring-1 focus-within:ring-blue-400/30 transition-all duration-300 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
           <textarea
             value={notes}
             onChange={(e) => setNotes(e.target.value)}
             placeholder="Any specific constraints, preferences, or context the AI should consider..."
             className="w-full h-36 bg-transparent p-6 text-gray-200 text-[15.5px] resize-none outline-none leading-relaxed placeholder:text-gray-500/70"
           />
           <div className="absolute bottom-5 right-5 pointer-events-none opacity-20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
           </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="w-full mt-16 pt-8 border-t border-white/5 relative z-20">
        <FloatingNav isValid={isFormValid}>
          <div className="w-full flex items-center justify-between">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
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
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => {
                if (!isFormValid) {
                  toast.warning("Please enter a description of at least 30 characters to generate your PRD.", "Description Required");
                  let targetId = '';
                  targetId = 'section-description';
                  
                  if (targetId) {
                    const el = document.getElementById(targetId);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      el.parentElement?.classList.add('ring-2', 'ring-amber-500/50', 'ring-offset-8', 'ring-offset-[#06080D]', 'rounded-3xl', 'transition-all', 'duration-300');
                      setTimeout(() => {
                        el.parentElement?.classList.remove('ring-2', 'ring-amber-500/50', 'ring-offset-8', 'ring-offset-[#06080D]', 'rounded-3xl');
                      }, 1200);
                    }
                  }
                } else {
                  onNext({ quickStart: selectedQuickStart, format: selectedFormat, description, notes });
                }
              }}
              
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-action="next" className={`
                group relative flex items-center gap-3 px-8 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-500 overflow-hidden
                ${isFormValid 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] cursor-pointer' 
                  : 'bg-white/[0.02] text-gray-500 border border-white/5 backdrop-blur-md cursor-pointer hover:bg-white/[0.04]'
                }
              `}
            >
              {isFormValid && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div 
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                  />
                </>
              )}
              <Sparkles className={`w-4 h-4 relative z-10 transition-transform duration-300 ${isFormValid ? 'group-hover:rotate-12' : ''}`} />
              <span className="relative z-10">Generate PRD</span>
            </motion.button>
          </div>
        </FloatingNav>
      </div>
    </div>
  );
}
