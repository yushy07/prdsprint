import { Zap } from 'lucide-react';

interface CreditBadgeProps {
  credits: number;
  className?: string;
}

export function CreditBadge({ credits, className = '' }: CreditBadgeProps) {
  return (
    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-[13px] \${className}`}>
      <Zap size={13} className="text-cyan-400" />
      <span>{credits} Credits</span>
    </div>
  );
}
