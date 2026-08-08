import { BadgeCheck, User } from "lucide-react";

export function UserInfo({ user }: { user: any }) {
  const name = user?.user_metadata?.full_name || 'User';
  const email = user?.email || '';

  return (
    <div className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl mb-4">
      <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
        <User size={18} className="text-cyan-400" />
      </div>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-[15px] truncate">{name}</span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider shrink-0">
            <BadgeCheck size={10} />
            <span>Verified Account</span>
          </div>
        </div>
        <span className="text-gray-400 text-[13px] truncate">{email}</span>
      </div>
    </div>
  );
}
