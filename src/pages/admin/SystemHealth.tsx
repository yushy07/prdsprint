import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/services/admin/api';
import { Database, HardDrive, Cpu, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { AdminEmptyState, AdminErrorState, AdminLoadingState } from '@/components/admin/AdminPageState';

export function SystemHealth() {
  const { data: health, isLoading, error, refetch } = useQuery({
    queryKey: ['adminSystemHealth'],
    queryFn: adminApi.getSystemHealth,
  });

  if (error) {
    return <AdminErrorState title="System health unavailable" message="Failed to establish communication with the health checkers." onRetry={() => refetch()} />;
  }

  const getStatusColor = (status?: string) => {
    if (!status) return 'text-gray-400';
    const s = status.toLowerCase();
    if (s.includes('healthy') || s.includes('ok') || s === 'online') return 'text-emerald-400';
    if (s.includes('degraded') || s.includes('warning')) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className="space-y-6 text-xs">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Infrastructure Health</h1>
        <p className="text-xs text-gray-400 mt-1">
          Live status monitoring for database connectivity, storage capacity, queue latency, and maintenance flags.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading ? (
          <div className="col-span-full"><AdminLoadingState title="Checking infrastructure health" /></div>
        ) : (
          <>
            <div className="p-5 rounded-2xl bg-[#0f0f13] border border-white/10 flex items-center gap-4 hover:border-white/20 transition-all shadow-xl">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Database size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium">PostgreSQL Database</p>
                <p className={`text-base font-bold capitalize mt-0.5 ${getStatusColor(health?.database_status)}`}>
                  {health?.database_status || 'Operational'}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f0f13] border border-white/10 flex items-center gap-4 hover:border-white/20 transition-all shadow-xl">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <HardDrive size={20} className="text-purple-400" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium">Supabase Storage</p>
                <p className={`text-base font-bold capitalize mt-0.5 ${getStatusColor(health?.storage_status)}`}>
                  {health?.storage_status || 'Operational'}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f0f13] border border-white/10 flex items-center gap-4 hover:border-white/20 transition-all shadow-xl">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Cpu size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium">Generation Queue</p>
                <p className="text-base font-bold text-white mt-0.5">
                  {health?.pending_generations || 0} pending
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f0f13] border border-white/10 flex items-center gap-4 hover:border-white/20 transition-all shadow-xl">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Clock size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium">Last Ping</p>
                <p className="text-xs font-mono font-semibold text-white mt-0.5">
                  {health?.last_checked ? new Date(health.last_checked).toLocaleTimeString() : 'Just now'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
