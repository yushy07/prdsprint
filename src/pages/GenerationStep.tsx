
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCredits } from "@/context/CreditContext";
import { useToast } from "@/context/ToastContext";
import { supabase } from "@/lib/supabase";
import { WizardData } from "@/types/wizard";
import { createPrdZip, GeneratedSections } from "@/lib/zipExport";
import { GoogleAuthModal } from "@/components/auth/GoogleAuthModal";

interface GeneratePrdResponse {
  success?: boolean;
  partial?: boolean;
  status?: string;
  code?: string;
  error?: string;
  message?: string;
  is_admin?: boolean;
  credits_charged?: number;
  credits_refunded?: number;
  net_credits_used?: number;
  remaining_balance?: number;
  download_url?: string;
  export_info?: {
    download_url?: string;
    filename?: string;
    format?: string;
  };
  export?: {
    download_url?: string;
  };
  refund?: {
    amount?: number;
    reason?: string;
  };
  billing?: {
    is_admin?: boolean;
    credits_charged?: number;
    credits_refunded?: number;
    net_credits_used?: number;
    remaining_balance?: number;
  };
  sections?: Record<string, string>;
  completedSections?: string[];
  failedSections?: string[];
  providers?: Record<string, string>;
  errors?: Record<string, { reason: string }>;
}

import { 
  GenerationError, 
  GenerationLoading, 
  GenerationSuccess,
  GenerationBackground 
} from "@/components/generation";
import { STATUS_MESSAGES, AI_INSIGHTS } from "@/components/generation/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

async function getStylePRD(platform: string | null, styleId: string) {
  if (!styleId) return null;
  const normalizedId = styleId.toLowerCase().trim();
  if (platform === 'android') {
    const { ANDROID_STYLE_PRDS } = await import("@/data/androidStylePRDs");
    return ANDROID_STYLE_PRDS[normalizedId] || null;
  }
  const { WEBSITE_STYLE_PRDS } = await import("@/data/websiteStylePRDs");
  return WEBSITE_STYLE_PRDS[normalizedId] || null;
}

interface GenerationStepProps {
  wizardData?: WizardData;
}

export function GenerationStep({ wizardData }: GenerationStepProps) {
  const [progress, setProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [statusText, setStatusText] = useState(STATUS_MESSAGES[0]);
  const [insightIndex, setInsightIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHomeButton, setShowHomeButton] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        setShowHomeButton(true);
      }, 4500);
      return () => clearTimeout(timer);
    } else {
      setShowHomeButton(false);
    }
  }, [isCompleted]);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorCode, setErrorCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [generatedSections, setGeneratedSections] = useState<GeneratedSections | string | null>(null);
  const [isPartial, setIsPartial] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [failedSections, setFailedSections] = useState<string[]>([]);
  const [generationErrors, setGenerationErrors] = useState<Record<string, { reason: string }> | undefined>(undefined);
  const [providers, setProviders] = useState<Record<string, string> | undefined>(undefined);
  
  // Backend billing state
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [creditsCharged, setCreditsCharged] = useState<number | undefined>(undefined);
  const [creditsRefunded, setCreditsRefunded] = useState<number | undefined>(undefined);
  const [netCreditsUsed, setNetCreditsUsed] = useState<number | undefined>(undefined);
  const [remainingBalance, setRemainingBalance] = useState<number | undefined>(undefined);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [exportInfo, setExportInfo] = useState<any>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const { refreshCredits, updateBalance } = useCredits();
  const navigate = useNavigate();
  const toast = useToast();
  
  const hasTriggeredCompletionToast = useRef(false);
  const hasAutoDownloadedRef = useRef(false);
  const isDownloadingRef = useRef(false);
  const generatedSectionsRef = useRef<GeneratedSections | string | null>(null);
  const isGeneratingRef = useRef(false);
  const idempotencyKeyRef = useRef<string | null>(null);
  const backendDownloadUrlRef = useRef<string | null>(null);

  // Helper function to trigger ZIP or signed URL download
  const handleDownload = useCallback(async () => {
    if (isDownloadingRef.current) return;
    isDownloadingRef.current = true;
    setIsDownloading(true);

    try {
      // If backend provided a signed download_url, open it
      if (backendDownloadUrlRef.current) {
        let backendUrl: URL;
        try {
          backendUrl = new URL(backendDownloadUrlRef.current, window.location.origin);
        } catch {
          throw new Error("The download link returned by the server is invalid.");
        }
        if (!['https:', 'http:'].includes(backendUrl.protocol)) {
          throw new Error("The download link returned by the server is unsafe.");
        }
        const downloadWindow = window.open(backendUrl.toString(), '_blank', 'noopener,noreferrer');
        if (!downloadWindow) {
          throw new Error("Your browser blocked the download window. Please allow pop-ups and try again.");
        }
        setDownloadNotice(true);
        toast.success("Download started from backend!", "Download Started");
        return;
      }

      // Fallback to client-side ZIP packaging if needed
      const zipBlob = await createPrdZip(generatedSectionsRef.current, wizardData);
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Product_Requirements_Document.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadNotice(true);
      toast.success("ZIP package downloaded successfully!", "Download Started");
    } catch (err) {
      console.error("ZIP creation failed:", err);
      toast.error("Failed to package ZIP download.", "Download Error");
    } finally {
      setTimeout(() => {
        setDownloadNotice(false);
        setIsDownloading(false);
        isDownloadingRef.current = false;
      }, 2000);
    }
  }, [wizardData, toast]);

  const handleDownloadRef = useRef(handleDownload);
  useEffect(() => {
    handleDownloadRef.current = handleDownload;
  }, [handleDownload]);

  // Real API Generation Call matching live Supabase backend
  const runGeneration = useCallback(async (isNewRetry = false) => {
    // Prevent double-click or duplicate active submission
    if (isGeneratingRef.current) return;
    isGeneratingRef.current = true;

    // Get current authenticated session & Authorization token FIRST
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session || !session.access_token) {
      setHasError(true);
      setErrorCode('AUTH_REQUIRED');
      setErrorMessage('Sign in with Google to generate your PRD');
      toast.error('Sign in with Google to continue.', 'Authentication Required');
      setShowAuthModal(true);
      isGeneratingRef.current = false;
      return;
    }

    setHasError(false);
    setErrorCode("");
    setErrorMessage("");
    setProgress(5);
    setCurrentStageIndex(0);
    setIsCompleted(false);

    // Idempotency Key: Reuse key when recovering same request; generate new key on intentional retry
    if (isNewRetry || !idempotencyKeyRef.current) {
      idempotencyKeyRef.current = crypto.randomUUID();
    }
    const idempotencyKey = idempotencyKeyRef.current;

    // Progress bar ticker
    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) return 90;
        const nextProgress = Math.min(prevProgress + 1, 90);

        if (nextProgress < 25) {
          setCurrentStageIndex(0);
          setStatusText(STATUS_MESSAGES[Math.floor((nextProgress / 25) * 2)]);
        } else if (nextProgress < 50) {
          setCurrentStageIndex(1);
          setStatusText(STATUS_MESSAGES[2 + Math.floor(((nextProgress - 25) / 25) * 2)]);
        } else if (nextProgress < 75) {
          setCurrentStageIndex(2);
          setStatusText(STATUS_MESSAGES[4 + Math.floor(((nextProgress - 50) / 25) * 2)]);
        } else {
          setCurrentStageIndex(3);
          setStatusText(STATUS_MESSAGES[6 + Math.floor(((nextProgress - 75) / 25) * 2)]);
        }

        return nextProgress;
      });
    }, 150);

    try {
      const selectedStylePrd = await getStylePRD(wizardData?.platform || null, wizardData?.designStyle || '');

      const { data, error } = await supabase.functions.invoke<GeneratePrdResponse>('generate-prd', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Idempotency-Key': idempotencyKey,
        },
        body: {
          platform: wizardData?.platform || null,
          frontend: wizardData?.frontend || '',
          backend: wizardData?.backend || '',
          database: wizardData?.database || '',
          theme: wizardData?.theme || '',
          styleId: wizardData?.designStyle || '',
          font: wizardData?.font || '',
          colorPalette: wizardData?.colorPalette || '',
          description: wizardData?.description || '',
          stylePrd: selectedStylePrd ? {
            id: selectedStylePrd.id,
            name: selectedStylePrd.name,
            title: selectedStylePrd.title,
            tagline: selectedStylePrd.tagline,
            markdown: selectedStylePrd.markdown,
            sections: selectedStylePrd.sections,
          } : null,
        }
      });

      clearInterval(progressTimer);

      let errText = '';
      let codeStr = '';

      if (error) {
        errText = error.message;
        if (error.context && typeof error.context.json === 'function') {
          try {
            const errBody = await error.context.json();
            errText = errBody.error || errBody.message || error.message;
            codeStr = errBody.code || errBody.status || '';
          } catch (e) {
            // ignore
          }
        }
      }

      if (data) {
        if (data.code) codeStr = data.code;
        if (data.status && data.status !== 'completed' && data.status !== 'partial' && data.status !== 'processing') {
          codeStr = data.status;
        }
      }

      // Handle specific error codes
      if (codeStr === 'INSUFFICIENT_CREDITS' || errText.includes('INSUFFICIENT_CREDITS') || errText.toLowerCase().includes('insufficient credits')) {
        setHasError(true);
        setErrorCode('INSUFFICIENT_CREDITS');
        const msg = 'Insufficient credits to generate PRD. Please upgrade your plan or purchase additional credits.';
        setErrorMessage(msg);
        toast.error(msg, 'Insufficient Credits');
        refreshCredits();
        return;
      }

      if (codeStr === 'AUTH_REQUIRED' || codeStr === 'AUTHENTICATION_REQUIRED' || errText.includes('AUTH_REQUIRED') || errText.includes('AUTHENTICATION_REQUIRED') || errText.toLowerCase().includes('authentication required') || errText.toLowerCase().includes('sign in')) {
        setHasError(true);
        setErrorCode('AUTH_REQUIRED');
        const msg = 'Sign in with Google to generate your PRD';
        setErrorMessage(msg);
        toast.error('Sign in with Google to continue.', 'Authentication Required');
        setShowAuthModal(true);
        return;
      }

      if (codeStr === 'FORBIDDEN' || errText.includes('FORBIDDEN') || errText.toLowerCase().includes('forbidden')) {
        setHasError(true);
        setErrorCode('FORBIDDEN');
        const msg = 'Access denied. You do not have permission to generate this PRD.';
        setErrorMessage(msg);
        toast.error(msg, 'Access Denied');
        return;
      }

      const hasSections = data?.sections && Object.keys(data.sections).length > 0;
      const generationSucceeded = data && (data.success || data.partial || hasSections);

      if (error || !generationSucceeded) {
        if (!error && data) {
          if (data.errors && Object.keys(data.errors).length > 0) {
            errText = Object.values(data.errors).map((e: any) => e.reason || e.message || '').filter(Boolean).join(', ') || errText;
          } else if (data.failedSections && data.failedSections.length > 0) {
            errText = `Failed sections: ${data.failedSections.join(', ')}`;
          } else if (!data.success) {
            errText = data.error || data.message || 'Generation failed. Please try again.';
          }
        }
        if (!errText) errText = 'Generation failed. Please try again.';
        setHasError(true);
        setErrorCode(codeStr || 'FAILED');
        setErrorMessage(errText);
        toast.error(errText, 'Generation Failed');

        // Check if any refund or remaining balance was returned on failure
        const failRefund = typeof (data?.credits_refunded ?? data?.refund?.amount ?? data?.billing?.credits_refunded) === 'number'
          ? (data?.credits_refunded ?? data?.refund?.amount ?? data?.billing?.credits_refunded)
          : 0;
        if (failRefund > 0) {
          setCreditsRefunded(failRefund);
        }
        const failBalance = typeof (data?.remaining_balance ?? data?.billing?.remaining_balance) === 'number'
          ? (data?.remaining_balance ?? data?.billing?.remaining_balance)
          : undefined;
        if (failBalance !== undefined) {
          setRemainingBalance(failBalance);
          updateBalance(failBalance);
        }

        refreshCredits();
        return;
      }

      // Read billing values directly from backend response (supports nested billing or flat fields)
      const billing = data.billing ?? data;

      const charged = billing.credits_charged ?? 0;
      const refunded = billing.credits_refunded ?? data.refund?.amount ?? 0;
      const netUsed = billing.net_credits_used ?? Math.max(0, charged - refunded);
      const remaining = billing.remaining_balance;
      const isAdminUser = billing.is_admin === true;

      setIsAdmin(isAdminUser);
      setCreditsCharged(charged);
      setCreditsRefunded(refunded);
      setNetCreditsUsed(netUsed);
      if (typeof remaining === 'number') {
        setRemainingBalance(remaining);
        updateBalance(remaining);
      }

      // Signed download url and export info
      const dlUrl = data.download_url || data.export_info?.download_url || data.export?.download_url || null;
      backendDownloadUrlRef.current = dlUrl;
      setDownloadUrl(dlUrl);
      setExportInfo(data.export_info || data.export || null);

      const sections = data.sections || {};
      generatedSectionsRef.current = sections;
      setGeneratedSections(sections);
      
      const isPartialResp = !!data.partial || data.status === 'partial';
      setIsPartial(isPartialResp);
      setCompletedSections(data.completedSections || Object.keys(sections));
      setFailedSections(data.failedSections || []);
      setGenerationErrors(data.errors);
      if (data.providers) setProviders(data.providers);

      setProgress(100);
      setCurrentStageIndex(3);
      setStatusText("PRD generation complete!");

      // Refresh credits/profile from Supabase
      refreshCredits();

      setTimeout(() => {
        setIsCompleted(true);
        if (!hasTriggeredCompletionToast.current) {
          hasTriggeredCompletionToast.current = true;
          if (isPartialResp) {
            toast.warning(`PRD generated with partial results (${data.completedSections?.length || Object.keys(sections).length}/6 sections completed).`, "Partial Success");
          } else {
            toast.success("Your Product Requirements Document is ready!", "PRD Generated");
          }
        }
        if (!hasAutoDownloadedRef.current) {
          hasAutoDownloadedRef.current = true;
          handleDownloadRef.current();
        }
      }, 800);

    } catch (err: unknown) {
      clearInterval(progressTimer);
      const msg = err instanceof Error ? err.message : "An unexpected error occurred during PRD generation.";
      setHasError(true);
      setErrorMessage(msg);
      toast.error(msg, "Error");
      refreshCredits();
    } finally {
      isGeneratingRef.current = false;
    }
  }, [wizardData, toast, refreshCredits, updateBalance]);

  // Resume generation when user completes Google sign-in
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.access_token) {
        if (showAuthModal || errorCode === 'AUTH_REQUIRED') {
          setShowAuthModal(false);
          setHasError(false);
          setErrorCode("");
          setErrorMessage("");
          await refreshCredits();
          // Resume generation once with fresh idempotency key
          runGeneration(true);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [showAuthModal, errorCode, refreshCredits, runGeneration]);

  const hasStartedGeneration = useRef(false);

  useEffect(() => {
    if (!hasStartedGeneration.current) {
      hasStartedGeneration.current = true;
      runGeneration(false);
    }
  }, [runGeneration]);

  // Prevent body scrolling when completion full screen is visible
  useEffect(() => {
    if (isCompleted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCompleted]);

  // Rotating AI Insight Timer
  useEffect(() => {
    if (isCompleted) return;
    const insightTimer = setInterval(() => {
      setInsightIndex((prevIndex) => (prevIndex + 1) % AI_INSIGHTS.length);
    }, 2800);

    return () => clearInterval(insightTimer);
  }, [isCompleted]);

  return (
    <div className={`w-full flex flex-col items-center justify-center overflow-x-hidden text-white transition-all duration-700 ${isCompleted ? "fixed inset-0 z-[100] bg-[#06080D] overflow-y-auto lg:overflow-y-hidden px-4 py-4 sm:py-6 lg:py-8" : "relative min-h-[100dvh] py-6 sm:py-8 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col justify-center"}`}>
      <GenerationBackground 
        isCompleted={isCompleted} 
        prefersReducedMotion={prefersReducedMotion} 
      />
      {/* Main Content Area */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-2xl w-full py-1">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            hasError ? (
              <GenerationError 
                errorMessage={errorMessage} 
                errorCode={errorCode}
                creditsRefunded={creditsRefunded}
                remainingBalance={remainingBalance}
                onRetry={() => runGeneration(true)} 
                onSignIn={() => setShowAuthModal(true)}
              />
            ) : (
              <GenerationLoading
                progress={progress}
                statusText={statusText}
                currentStageIndex={currentStageIndex}
                insightIndex={insightIndex}
              />
            )
          ) : (
            /* COMPLETION SCREEN STATE */
            <GenerationSuccess
              handleDownload={handleDownload}
              downloadNotice={downloadNotice}
              showHomeButton={showHomeButton}
              isPartial={isPartial}
              completedSections={completedSections}
              failedSections={failedSections}
              errors={generationErrors}
              isAdmin={isAdmin}
              creditsCharged={creditsCharged}
              creditsRefunded={creditsRefunded}
              netCreditsUsed={netCreditsUsed}
              remainingBalance={remainingBalance}
              downloadUrl={downloadUrl}
              exportInfo={exportInfo}
              providers={providers}
            />
          )}
        </AnimatePresence>
      </div>
      {/* Bottom Particle Wave Lines Effect */}
      <div className="w-full max-w-3xl mx-auto mt-2 sm:mt-3 pointer-events-none opacity-25">
        <svg className="w-full h-6 sm:h-8" viewBox="0 0 800 60" fill="none">
          <path
            d="M0 30 C 150 10, 300 50, 450 20 C 600 -10, 700 40, 800 25"
            stroke="url(#wave-gradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
          />
          <path
            d="M0 40 C 200 50, 350 10, 500 35 C 650 60, 750 15, 800 30"
            stroke="url(#wave-gradient)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isCompleted ? "#10b981" : "#3b82f6"} />
              <stop offset="50%" stopColor={isCompleted ? "#14b8a6" : "#6366f1"} />
              <stop offset="100%" stopColor={isCompleted ? "#06b6d4" : "#a855f7"} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <GoogleAuthModal 
        isOpen={showAuthModal}
        onClose={async () => {
          setShowAuthModal(false);
          const { data: { session } } = await supabase.auth.getSession();
          if (!session || !session.access_token) {
            navigate('/', { replace: true });
          }
        }}
        title="Authentication Required"
        message="Sign in with Google to generate your PRD"
        redirectPath="/builder?auth=success"
      />
    </div>
  );
}
