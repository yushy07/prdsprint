import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Zap, 
  FileText, 
  CreditCard, 
  X, 
  ChevronRight,
  CheckCircle2,
  RefreshCw,
  Gift,
  ArrowRight
} from "lucide-react";
import { PLANS, Plan } from "@/data/plans";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import Galaxy from "@/components/effects/Galaxy";
import { supabase } from "@/lib/supabase";
import { useCredits } from "@/context/CreditContext";
import { PlanType } from "@/lib/credits.config";

export function Checkout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshCredits } = useCredits();

  // Get selected plan ID from URL query params (default to 'pro')
  const planParam = searchParams.get("plan")?.toLowerCase() || "pro";
  
  const [selectedPlan, setSelectedPlan] = useState<Plan>(() => {
    return PLANS.find((p) => p.id === planParam) || PLANS.find((p) => p.id === "pro") || PLANS[2];
  });

  const isFreePlan = selectedPlan.id === "free" || selectedPlan.priceNumeric === 0;

  // Keep state synced if query param changes
  useEffect(() => {
    const matched = PLANS.find((p) => p.id === planParam);
    if (matched && matched.id !== selectedPlan.id) {
      setSelectedPlan(matched);
    }
  }, [planParam, selectedPlan.id]);

  // Modal for Change Plan
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false);

  // Paid Payment Gateway State
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showGatewayModal, setShowGatewayModal] = useState(false);
  const [gatewayStep, setGatewayStep] = useState<"connecting" | "success">("connecting");

  // Free Plan Activation State
  const [isActivatingFree, setIsActivatingFree] = useState(false);

  // Sync plan and credits to Context
  const persistPlanAndCredits = async (_planId: string) => {
    await refreshCredits();
  };

  // Handle plan change from modal
  const handleSelectNewPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setSearchParams({ plan: plan.id });
    setIsChangePlanOpen(false);
  };

  // Close or Cancel Checkout
  const handleCloseCheckout = (reason: "cancelled" | "closed" = "closed") => {
    navigate("/dashboard", {
      state: {
        toast: {
          type: "info",
          title: reason === "cancelled" ? "Payment Cancelled" : "Checkout Closed",
          message: reason === "cancelled" ? "Payment process was cancelled. No charges were made." : "You returned to your Dashboard."
        }
      }
    });
  };

  // Proceed to Checkout for Paid Plans
  const handleProceedToCheckout = () => {
    setIsRedirecting(true);
    
    // Simulate initial loading before launching hosted gateway modal
    setTimeout(() => {
      setShowGatewayModal(true);
      setGatewayStep("connecting");

      // Simulate gateway connecting and finishing payment
      setTimeout(async () => {
        await persistPlanAndCredits(selectedPlan.id);
        setGatewayStep("success");
      }, 2200);
    }, 800);
  };

  // Finish Paid Plan Payment Success
  const handleFinishPaidSuccess = () => {
    setShowGatewayModal(false);
    setIsRedirecting(false);
    navigate("/dashboard", {
      state: {
        toast: {
          type: "success",
          title: `${selectedPlan.name} Plan Activated!`,
          message: `🎉 ${selectedPlan.name} Plan activated successfully! ${selectedPlan.creditsNumeric} AI Credits added to your account.`
        }
      }
    });
  };

  // Activate Free Plan directly without payment gateway
  const handleActivateFreePlan = async () => {
    setIsActivatingFree(true);
    await persistPlanAndCredits(selectedPlan.id);

    setTimeout(() => {
      setIsActivatingFree(false);
      navigate("/dashboard", {
        state: {
          toast: {
            type: "success",
            title: "Free Plan Activated!",
            message: "🎉 Your Free Plan is now active! 50 AI Credits have been added to your account."
          }
        }
      });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white font-sans relative overflow-x-hidden selection:bg-purple-500/30">
      <Navbar />

      {/* Galaxy Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction={false}
          density={0.5}
          glowIntensity={0.2}
          saturation={0.5}
          hueShift={240}
          starSpeed={0.2}
          rotationSpeed={0.05}
        />
      </div>

      <div className="relative z-10 pt-navbar-offset pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        

        {/* Page Header - Dynamic for Free vs Paid */}
        <div className="mb-10 text-left">
          {isFreePlan ? (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Plan Activation</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
                Activate Your Free Plan
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                No credit card or payment required. Activate your plan instantly and begin creating PRDs.
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Secure Order Checkout</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
                Complete Your Purchase
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Review your selected plan and continue to our secure payment partner to complete your purchase.
              </p>
            </>
          )}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Selected Plan + Benefits + Confirmation (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Selected Plan Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`relative p-6 sm:p-8 rounded-3xl bg-[#0a0a0e]/80 border backdrop-blur-xl shadow-xl overflow-hidden ${
                isFreePlan ? "border-emerald-500/30 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)]" : "border-purple-500/30 shadow-[0_10px_40px_-10px_rgba(168,85,247,0.2)]"
              }`}
            >
              {/* Background Glow */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at 80% 20%, ${selectedPlan.glowColor}, transparent 70%)`
                }}
              />

              {/* Selected Badge & Change Plan Link */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[11px] font-bold uppercase tracking-wider shadow-md ${
                  isFreePlan 
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600" 
                    : "bg-gradient-to-r from-purple-600 to-blue-600"
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> Selected Plan
                </span>

                <button
                  onClick={() => setIsChangePlanOpen(true)}
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Change Plan
                </button>
              </div>

              {/* Plan Title & Price Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 ${selectedPlan.iconBg}`}>
                    <selectedPlan.icon className={`w-6 h-6 ${selectedPlan.iconColor}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      {selectedPlan.name} Plan
                    </h2>
                    <p className="text-xs text-slate-400">{selectedPlan.description}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    {selectedPlan.price}
                    <span className="text-xs font-normal text-slate-400">{selectedPlan.period}</span>
                  </div>
                  <div className={`text-xs font-semibold mt-0.5 ${selectedPlan.iconColor}`}>
                    ⚡ {selectedPlan.credits} included
                  </div>
                </div>
              </div>

              {/* Plan Core Features */}
              <div className="space-y-3 relative z-10">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Plan Highlights
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedPlan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                        isFreePlan ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300" : "bg-purple-500/20 border-purple-500/30 text-purple-300"
                      }`}>
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Included Benefits Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-6 rounded-3xl bg-[#0a0a0e]/60 border border-white/10 backdrop-blur-xl shadow-xl"
            >
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Included Benefits
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {selectedPlan.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FREE PLAN CONFIRMATION NOTICE */}
            {isFreePlan && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 shrink-0 border border-emerald-500/30">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      Ready to Get Started
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      You're choosing the Free Plan. No payment or credit card is required. Click the button below to activate your plan instantly and begin creating PRDs.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* RIGHT COLUMN: Order Summary + Action CTA + Trust (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Summary & Action Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="p-6 sm:p-7 rounded-3xl bg-[#0a0a0e]/90 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className={`w-4 h-4 ${isFreePlan ? "text-emerald-400" : "text-purple-400"}`} />
                  {isFreePlan ? "Plan Summary" : "Order Summary"}
                </h3>
                <span className="text-[11px] font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                  {isFreePlan ? "Free Tier" : "Monthly Subscription"}
                </span>
              </div>

              {/* Price Breakdown Rows */}
              <div className="space-y-3 text-xs sm:text-sm mb-6">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Selected Plan</span>
                  <span className="font-semibold text-white">{selectedPlan.name} Plan</span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Billing Cycle</span>
                  <span className="font-semibold text-white">{isFreePlan ? "Free Forever" : "Monthly"}</span>
                </div>

                {!isFreePlan && (
                  <div className="flex justify-between items-center text-slate-400">
                    <span>GST Tax (18% Included)</span>
                    <span className="text-slate-300">Included</span>
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                  <div>
                    <div className="text-sm font-bold text-white">
                      {isFreePlan ? "Total Cost" : "Final Amount"}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isFreePlan ? "No payment required" : "Recurring monthly until cancelled"}
                    </div>
                  </div>
                  <div className={`text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text ${
                    isFreePlan 
                      ? "bg-gradient-to-r from-emerald-400 to-teal-300"
                      : "bg-gradient-to-r from-purple-400 via-blue-300 to-cyan-400"
                  }`}>
                    {selectedPlan.price}
                    {!isFreePlan && <span className="text-xs font-normal text-slate-400">/mo</span>}
                  </div>
                </div>
              </div>

              {/* Payment Gateway Info Note (ONLY FOR PAID PLANS) */}
              {!isFreePlan && (
                <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 mb-6 text-left relative overflow-hidden">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 shrink-0 h-fit mt-0.5">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div className="text-xs space-y-1">
                      <h4 className="font-bold text-blue-300">Secure Gateway Checkout</h4>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        You'll be redirected to our trusted payment partner (Cashfree or Razorpay) to complete your payment securely. Your payment information is processed entirely by the payment gateway and is never stored by PRDSprint.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Primary Action Button (Dynamic for Free vs Paid) */}
              {isFreePlan ? (
                <button
                  onClick={handleActivateFreePlan}
                  disabled={isActivatingFree}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base transition-all shadow-[0_4px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.5)] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer group"
                >
                  {isActivatingFree ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Activating Your Free Plan...</span>
                    </>
                  ) : (
                    <>
                      <span>Activate Free Plan</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleProceedToCheckout}
                  disabled={isRedirecting}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-extrabold text-sm sm:text-base transition-all shadow-[0_4px_25px_rgba(168,85,247,0.35)] hover:shadow-[0_6px_30px_rgba(168,85,247,0.5)] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer group"
                >
                  {isRedirecting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Redirecting to Secure Checkout...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Secure Checkout</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              )}

              {/* Trust Indicators / Benefits List */}
              <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5 text-left text-[11px] text-slate-400">
                {isFreePlan ? (
                  <>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Instant account & credit activation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Upgrade or change plan anytime</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Keep your generated projects forever</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>256-Bit SSL Encrypted Payment Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Instant Credit Activation After Successful Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>GST Invoice Available Immediately After Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>Powered securely by Cashfree Payments & Razorpay</span>
                    </div>
                  </>
                )}
              </div>

              {/* Gateway Badges Footer (ONLY FOR PAID PLANS) */}
              {!isFreePlan && (
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-4 text-slate-500 text-[10px] uppercase tracking-widest font-semibold">
                  <span>Cashfree</span>
                  <span>•</span>
                  <span>Razorpay</span>
                  <span>•</span>
                  <span>UPI / Cards / NetBanking</span>
                </div>
              )}
            </motion.div>

          </div>

        </div>
      </div>

      {/* CHANGE PLAN MODAL */}
      <AnimatePresence>
        {isChangePlanOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChangePlanOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Select a Pricing Plan</h3>
                  <p className="text-xs text-slate-400">Choose the plan that best matches your workflow requirements</p>
                </div>
                <button
                  onClick={() => setIsChangePlanOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {PLANS.map((plan) => {
                  const isSelected = selectedPlan.id === plan.id;
                  const Icon = plan.icon;

                  return (
                    <div
                      key={plan.id}
                      onClick={() => handleSelectNewPlan(plan)}
                      className={`
                        p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group
                        ${isSelected 
                          ? "bg-purple-500/10 border-purple-500/50 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/30" 
                          : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"}
                      `}
                    >
                      {plan.popular && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[9px] font-bold uppercase tracking-wider border border-purple-500/30">
                          Recommended
                        </span>
                      )}

                      <div>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 border border-white/10 ${plan.iconBg}`}>
                          <Icon className={`w-4 h-4 ${plan.iconColor}`} />
                        </div>

                        <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                        <p className="text-[11px] text-slate-400 mb-3">{plan.description}</p>

                        <div className="text-2xl font-bold text-white mb-1">
                          {plan.price}
                          <span className="text-xs font-normal text-slate-400">{plan.period}</span>
                        </div>

                        <div className={`text-xs font-semibold mb-4 ${plan.iconColor}`}>
                          {plan.credits}
                        </div>

                        <ul className="space-y-1.5 text-[11px] text-slate-300 mb-4">
                          {plan.features.slice(0, 3).map((feat, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <Check className="w-3 h-3 text-purple-400 shrink-0" />
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-purple-600 text-white"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {isSelected ? "Current Plan" : "Select Plan"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HOSTED GATEWAY REDIRECT SIMULATION MODAL (PAID PLANS ONLY) */}
      <AnimatePresence>
        {showGatewayModal && !isFreePlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => handleCloseCheckout("cancelled")}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0b0c14] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => handleCloseCheckout("cancelled")}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Cancel Payment"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />

              {gatewayStep === "connecting" ? (
                <div className="py-4 space-y-5 relative z-10">
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
                    <div className="p-4 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                      <CreditCard className="w-8 h-8 animate-pulse" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Connecting to Payment Gateway...
                    </h3>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Redirecting securely to Cashfree / Razorpay Hosted Checkout Portal
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300 space-y-1 text-left">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Merchant:</span>
                      <span className="font-semibold text-white">PRDSprint Studio</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Plan:</span>
                      <span className="font-semibold text-white">{selectedPlan.name} Plan</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Amount Payable:</span>
                      <span className="font-bold text-emerald-400">{selectedPlan.price}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => handleCloseCheckout("cancelled")}
                      className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                    >
                      Cancel Payment & Return
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>256-Bit Encrypted Secure Gateway Connection</span>
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-5 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Payment Successful!
                    </h3>
                    <p className="text-xs text-slate-300 max-w-xs mx-auto">
                      Your order for <strong className="text-white">{selectedPlan.name} Plan ({selectedPlan.price})</strong> was completed.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium space-y-1">
                    <div className="flex items-center justify-center gap-1.5 font-bold">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>+{selectedPlan.creditsNumeric} AI Credits Added</span>
                    </div>
                    <p className="text-[11px] text-slate-300">Transaction Ref: PRD-GATEWAY-894102</p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleFinishPaidSuccess}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Return to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
