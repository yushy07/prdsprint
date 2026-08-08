// @ts-nocheck
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Check, Sparkles, Gift, Rocket, Crown, Gem, Info } from "lucide-react";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { SiStripe, SiVisa, SiMastercard, SiRazorpay } from "react-icons/si";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PLANS, Plan } from "@/data/plans";
import Galaxy from "@/components/effects/Galaxy";
import { useCredits } from "@/context/CreditContext";

function PricingCard({ plan, index }: { plan: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { currentPlan } = useCredits();
  
  const isCurrentPlan = currentPlan === plan.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-6 sm:p-7 lg:p-8 rounded-2xl sm:rounded-[32px] border ${
        plan.popular
          ? 'bg-[#0A0A0C]/80 border-purple-500/30 lg:scale-[1.02] z-10 shadow-[0_8px_40px_-10px_rgba(168,85,247,0.3)]'
          : 'bg-[#0A0A0C]/60 border-white/5 z-0 hover:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
      } flex flex-col h-full group backdrop-blur-xl transition-all duration-500 hover:-translate-y-2`}
    >
      {/* Recommended Badge */}
      {plan.popular && (
        <motion.div 
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-[0_4px_15px_rgba(168,85,247,0.5)] z-20 overflow-hidden"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={12} className="text-purple-200" /> RECOMMENDED
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent mix-blend-overlay"
            animate={{ x: ["-200%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          />
        </motion.div>
      )}

      {/* Soft inner glow on hover */}
      <div 
        className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at 50% -20%, ${plan.glowColor}, transparent 70%)`
        }}
      />

      {/* Moving light reflection border */}
      <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
        />
      </div>

      {/* Dedicated card neon bloom underneath (for Pro) */}
      {plan.popular && (
        <div className="absolute -inset-2 bg-purple-500/10 rounded-[40px] blur-[30px] -z-10 group-hover:bg-purple-500/25 transition-colors duration-500" />
      )}

      <div className="mb-8 relative z-10">
        <motion.div 
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/5 shadow-inner ${plan.iconBg}`}
          animate={isHovered ? { y: -4, scale: 1.05 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <plan.icon size={22} className={plan.iconColor} />
          {/* Breathing glow behind icon */}
          <motion.div 
            className="absolute inset-0 rounded-xl blur-lg pointer-events-none"
            style={{ backgroundColor: plan.glowColor }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        <h3 className="text-2xl font-display font-bold mb-2 text-white tracking-[-0.01em]" style={{ wordSpacing: '0.05em' }}>{plan.name}</h3>
        <p className="text-sm text-gray-400 mb-6 font-medium">{plan.description}</p>
        
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-display font-bold text-white tracking-[-0.02em]">{plan.price}</span>
          <span className="text-gray-400 font-medium text-sm">{plan.period}</span>
        </div>
        
        <div className={`text-[14px] font-semibold mt-2 ${plan.iconColor}`}>{plan.credits}</div>
      </div>

      {/* Features list */}
      <div className="flex-1 flex flex-col gap-4 mb-8 relative z-10">
        {plan.features.map((feature: string, i: number) => (
          <motion.div 
            key={feature} 
            className="flex items-start gap-3 group/feature"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + i * 0.05, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-white/5 border border-white/10 group-hover/feature:border-${plan.color}-400/50 transition-colors`}>
              <Check size={12} className={plan.popular ? "text-purple-400" : "text-gray-400 group-hover/feature:text-white"} />
            </div>
            <span className="text-[14px] text-gray-300 group-hover/feature:text-white transition-colors leading-snug font-medium">{feature}</span>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <button 
        onClick={() => !isCurrentPlan && navigate(`/checkout?plan=${plan.id}`)}
        disabled={isCurrentPlan}
        className={`relative w-full h-12 rounded-xl font-bold text-sm transition-all duration-300 z-10 overflow-hidden group/btn ${
          isCurrentPlan 
            ? 'bg-white/10 text-white/50 cursor-not-allowed border border-white/5'
            : plan.popular
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_4px_15px_rgba(168,85,247,0.4)] hover:shadow-[0_6px_25px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer'
              : 'bg-[#12121A] border border-white/10 text-white hover:bg-white/5 hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer'
        }`}
      >
        {/* Light sweep on button hover */}
        {!isCurrentPlan && <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:animate-[sweep_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />}
        <span className="relative z-10">{isCurrentPlan ? 'Current Plan' : (plan.priceNumeric === 0 ? 'Current Plan' : 'Upgrade')}</span>
      </button>
    </motion.div>
  );
}

export function Pricing() {
  const plans = PLANS;

  return (
    <section id="pricing" className="py-14 sm:py-18 md:py-24 lg:py-28 2xl:py-32 relative bg-transparent overflow-x-clip overflow-y-visible">
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction={false}
          density={0.3}
          glowIntensity={0.2}
          saturation={0.3}
          hueShift={240}
          starSpeed={0.1}
          rotationSpeed={0.02}
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <ChapterMarker number="07" title="Simple, Transparent Pricing" className="mb-3 sm:mb-4" />
        <p className="text-center text-gray-400 mb-10 sm:mb-14 lg:mb-16 max-w-2xl mx-auto text-sm sm:text-base">
          Pick the plan that fits your workflow. Upgrade, downgrade, or cancel anytime.
        </p>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto items-stretch overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-auto md:px-0">
          {plans.map((plan, i) => (
            <div key={plan.name} className="snap-center shrink-0 w-[85vw] md:w-auto h-full flex flex-col">
              <PricingCard plan={plan} index={i} />
            </div>
          ))}
        </div>

        {/* Trust Note & Logos */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 lg:mt-20 max-w-2xl mx-auto flex flex-col items-center gap-6 sm:gap-8"
        >
          {/* Note */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#0A0A0C]/80 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] group hover:border-white/20 transition-colors w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 relative z-10">
              <Info size={18} className="text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <p className="text-[14px] text-gray-400 leading-relaxed text-left relative z-10 font-medium">
              Credits reset every month. Unused credits do not roll over.<br/>
              Android generations consume additional credits.
            </p>
          </div>

          {/* Payment Trust Logos */}
          <div className="flex flex-col items-center gap-4">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-600">Secure Payments via</span>
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <SiStripe size={24} className="text-[#635BFF]" />
              </div>
              <div className="w-12 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <SiVisa size={24} className="text-[#1434CB]" />
              </div>
              <div className="w-12 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <SiMastercard size={24} className="text-[#EB001B]" />
              </div>
              <div className="w-12 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <SiRazorpay size={24} className="text-[#0C2471]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
