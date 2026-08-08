import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Monitor, Globe, Check, Settings } from "lucide-react";
import { FloatingNav, Navbar, BuilderBackground } from "../components/layout";
import { PlatformSelectionStep } from "./wizard/PlatformSelectionStep";
import { TechStackStep } from "./wizard/TechStackStep";
import { ColorsThemeStep } from "./wizard/ColorsThemeStep";
import { TypographyStep } from "./wizard/TypographyStep";
import { DesignStyleStep } from "./wizard/DesignStyleStep";
import { ProjectDetailsStep } from "./wizard/ProjectDetailsStep";
import { GenerationStep } from "./GenerationStep";
import { GenerationSummaryModal } from "@/components/credits/GenerationSummaryModal";
import { GoogleAuthModal } from "@/components/auth/GoogleAuthModal";
import { useCredits } from "@/context/CreditContext";
import { useToast } from "@/context/ToastContext";
import { supabase } from "@/lib/supabase";
import { PLAN_LIMITS } from "@/lib/credits.config";
import { GenerationConfig } from "@/lib/creditCalculator";

export interface ColorPalette {
  id: string;
  name: string;
  type: "palette" | "gradient" | "custom";
  colors: string[];
  icon?: any;
  from?: string;
  to?: string;
  previewColors?: string[];
  customRoles?: Record<string, string>;
}

export interface WizardData {
  platform: string | null;
  frontend: string;
  backend: string;
  database: string;
  colorPalette: ColorPalette | null | string;
  font: string;
  theme: string;
  designStyle: string;
  description: string;
}

function StepScrollHandler({ step }: { step: number }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const scrollContainers = document.querySelectorAll('.overflow-auto, .overflow-y-auto, [style*="overflow: auto"], [style*="overflow-y: auto"]');
      scrollContainers.forEach(container => {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [step]);
  return null;
}

export function Builder() {
  const navigate = useNavigate();
  const toast = useToast();
  const { currentPlan, isAdmin, refreshCredits } = useCredits();
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const [wizardData, setWizardData] = useState<WizardData>({
    platform: null,
    frontend: '',
    backend: '',
    database: '',
    colorPalette: '',
    font: '',
    theme: '',
    designStyle: '',
    description: '',
  });
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Restore wizard state if returning from Google Auth redirect or if stored locally
  useEffect(() => {
    async function restoreWizardAndAuth() {
      try {
        const savedState = localStorage.getItem('prd_wizard_data');
        if (savedState) {
          const parsed = JSON.parse(savedState);
          if (parsed.wizardData) setWizardData(parsed.wizardData);
          if (parsed.selectedPlatform) setSelectedPlatform(parsed.selectedPlatform);
          if (parsed.step) setStep(parsed.step);

          if (parsed.pendingGeneration) {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.access_token) {
              localStorage.removeItem('prd_wizard_data');
              await refreshCredits();
              setStep(7);
            }
          }
        }
      } catch (err) {
        console.error("Failed to restore wizard state:", err);
      }

      const params = new URLSearchParams(window.location.search);
      if (params.get('auth') === 'success') {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }

    restoreWizardAndAuth();
  }, [refreshCredits]);

  // Handle auto-resuming generation upon Google sign in
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.access_token) {
        if (showAuthModal) {
          setShowAuthModal(false);
          await refreshCredits();
          localStorage.removeItem('prd_wizard_data');
          setIsNavigating(true);
          setStep(7);
          setTimeout(() => setIsNavigating(false), 500);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [showAuthModal, refreshCredits]);

  useEffect(() => {
    if (!isAdmin && !PLAN_LIMITS[currentPlan].androidUnlocked && (selectedPlatform === "android" || wizardData.platform === "android")) {
      setSelectedPlatform(null);
      setWizardData(prev => ({ ...prev, platform: null }));
      if (step > 1) {
        setStep(1);
      }
    }
  }, [currentPlan, isAdmin, selectedPlatform, wizardData.platform, step]);

  const updateWizardData = useCallback((updates: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...updates }));
  }, []);

  // Keyboard shortcuts & beforeunload
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with inputs/textareas
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          // Previous
          if (step > 1) {
            setStep(prev => prev - 1);
          }
        } else {
          // Next
          // Wait, we need to know if the current step is valid.
          // Since Builder doesn't know validation status of children easily, 
          // we might just trigger the Next button's click via a global event or class.
          const nextBtn = document.querySelector('button:not([disabled])[data-action="next"]') as HTMLButtonElement;
          if (nextBtn) nextBtn.click();
        }
      } else if (e.key === 'Escape') {
        // e.g. close modals
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, setStep]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (step > 1 || selectedPlatform) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [step, selectedPlatform]);

  
      const [isNavigating, setIsNavigating] = useState(false);

  
  
  const handleNext = () => {
    if (isNavigating) return;
    if (selectedPlatform && step === 1) {
      setIsNavigating(true);
      setStep(2);
      setTimeout(() => setIsNavigating(false), 500);
    }
  };


  
    const globalHandleNext = () => {
    if (isNavigating) return;
    
    // If we are at step 6, show modal instead of going directly to step 7
    if (step === 6) {
      setShowGenerationModal(true);
      return;
    }
    
    setIsNavigating(true);
    setStep(s => s + 1);
    setTimeout(() => setIsNavigating(false), 500);
  };
  
  const handleConfirmGeneration = async () => {
    // Check whether a valid Supabase session exists
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || !session.access_token) {
      // Save wizard state to preserve every field entered
      localStorage.setItem('prd_wizard_data', JSON.stringify({
        wizardData,
        selectedPlatform,
        step: 6,
        pendingGeneration: true
      }));

      // Prevent generation request completely & open Google Sign-In modal
      setShowGenerationModal(false);
      setShowAuthModal(true);
      toast.error('Sign in with Google to continue.', 'Authentication Required');
      return;
    }

    // Authenticated: clear temporary stored state and proceed
    localStorage.removeItem('prd_wizard_data');
    setShowGenerationModal(false);
    setIsNavigating(true);
    setStep(7);
    setTimeout(() => setIsNavigating(false), 500);
  };

  const globalHandleBack = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    setStep(s => s - 1);
    setTimeout(() => setIsNavigating(false), 500);
  };


  
  return (
    <div className="min-h-screen bg-[#06080D] flex flex-col items-center justify-start relative overflow-x-hidden text-white font-sans selection:bg-blue-500/30">
      {!showGenerationModal && step !== 7 && <Navbar />}
      
      <GenerationSummaryModal 
        isOpen={showGenerationModal}
        onClose={() => setShowGenerationModal(false)}
        onConfirm={handleConfirmGeneration}
        config={{
          platform: (wizardData.platform === 'android' ? 'android' : 'website') as 'android' | 'website',
          complexity: (wizardData.backend || wizardData.database) ? 'advanced' : 'simple',
          features: [
            ...(wizardData.backend ? ['api'] : []),
            ...(wizardData.database ? ['database'] : [])
          ],
          style: wizardData.designStyle || 'minimalist',
          techStack: wizardData.frontend || 'react-tailwind',
          projectPrompt: wizardData.description
        }}
      />

      <GoogleAuthModal 
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
        }}
        title="Authentication Required"
        message="Sign in with Google to generate your PRD"
        redirectPath="/builder?auth=success"
      />
            
      {/* Background System */}
      <BuilderBackground step={step} />

      {/* Main Content */}
      {/* Handle scroll on step change */}
      <StepScrollHandler step={step} />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        {step === 1 ? (
          <PlatformSelectionStep
            selectedPlatform={selectedPlatform}
            onSelectPlatform={(platform) => {
              setSelectedPlatform(platform);
              updateWizardData({ platform });
            }}
            onNext={handleNext}
          />
        ) : step === 2 ? (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full"
          >
            <TechStackStep platform={selectedPlatform} initialData={wizardData} onBack={globalHandleBack} onNext={globalHandleNext} onDataChange={updateWizardData} />
          </motion.div>
        ) : step === 3 ? (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full"
          >
            <ColorsThemeStep initialData={wizardData} onBack={globalHandleBack} onNext={globalHandleNext} onDataChange={updateWizardData} />
          </motion.div>
        ) : step === 4 ? (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full"
          >
            <TypographyStep initialData={wizardData} onBack={globalHandleBack} onNext={globalHandleNext} selectedPlatform={selectedPlatform} onDataChange={updateWizardData} />
          </motion.div>
        ) : step === 5 ? (
          <motion.div 
            key="step5"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full"
          >
            <DesignStyleStep initialData={wizardData} onBack={globalHandleBack} onNext={globalHandleNext} selectedPlatform={selectedPlatform} onDataChange={updateWizardData} />
          </motion.div>
        ) : step === 6 ? (
          <motion.div 
            key="step6"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full"
          >
            <ProjectDetailsStep initialData={wizardData} onBack={globalHandleBack} onNext={globalHandleNext} selectedPlatform={selectedPlatform} onDataChange={updateWizardData} />
          </motion.div>
        ) : (
          <motion.div 
            key="step7"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 w-full"
          >
            <GenerationStep wizardData={wizardData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
