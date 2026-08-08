import { PlanType, PLAN_LIMITS } from '@/lib/credits.config';
import { Star, ShieldCheck } from 'lucide-react';
import { useCredits } from '@/context/CreditContext';

interface PlanBadgeProps {
  plan?: PlanType;
  isAdmin?: boolean;
  className?: string;
}

export function PlanBadge({ plan, isAdmin: propIsAdmin, className = '' }: PlanBadgeProps) {
  const { currentPlan, isAdmin: contextIsAdmin } = useCredits();
  const activeIsAdmin = propIsAdmin ?? contextIsAdmin;
  const activePlan = plan ?? currentPlan;

  if (activeIsAdmin) {
    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[13px] font-bold tracking-wide uppercase bg-purple-500/20 text-purple-300 border-purple-500/40 ${className}`}>
        <ShieldCheck size={13} className="text-purple-400" />
        <span>Administrator</span>
      </div>
    );
  }

  const planConfig = PLAN_LIMITS[activePlan];
  
  let colorClasses = 'bg-white/10 text-white border-white/20';
  if (activePlan === 'starter') colorClasses = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  if (activePlan === 'pro') colorClasses = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  if (activePlan === 'ultimate') colorClasses = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[13px] font-bold tracking-wide uppercase ${colorClasses} ${className}`}>
      {activePlan !== 'free' && <Star size={13} />}
      <span>{planConfig.name}</span>
    </div>
  );
}
