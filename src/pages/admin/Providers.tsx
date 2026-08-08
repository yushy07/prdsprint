import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/services/admin/api';
import { Server, CheckCircle2, XCircle, Activity, Cpu, AlertTriangle } from 'lucide-react';

export function Providers() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminProviderStats'],
    queryFn: adminApi.getProviderStats,
  });

  return (
    <div className="space-y-6 text-xs">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">AI Providers Telemetry</h1>
        <p className="text-xs text-gray-400 mt-1">
          Monitor model performance, completion success rates, and failure metrics across AI inference providers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-[#0f0f13] border border-white/10 animate-pulse"></div>
          ))
        ) : !stats || stats.length === 0 ? (
          <div className="col-span-full p-8 bg-[#0f0f13] border border-white/10 rounded-2xl text-center text-gray-400">
            No provider telemetry recorded yet.
          </div>
        ) : (
          stats.map((provider) => (
            <div
              key={provider.provider}
              className="p-5 rounded-2xl bg-[#0f0f13] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <Server size={18} className="text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white capitalize">{provider.provider}</h3>
                      <p className="text-[10px] text-gray-400 font-mono">
                        Requests: {provider.total_requests.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full border font-semibold text-[10px] flex items-center gap-1 ${
                      provider.success_rate >= 95
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : provider.success_rate >= 80
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}
                  >
                    <Activity size={11} />
                    {provider.success_rate.toFixed(1)}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-emerald-400" /> Completed
                    </p>
                    <p className="text-base font-bold text-white">{provider.completed.toLocaleString()}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
                      <XCircle size={12} className="text-rose-400" /> Failures
                    </p>
                    <p className="text-base font-bold text-white">{provider.failures.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {provider.recent_errors && provider.recent_errors.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/5">
                  <p className="text-[10px] text-gray-400 font-semibold mb-1 flex items-center gap-1">
                    <AlertTriangle size={11} className="text-amber-400" /> Recent Error Log:
                  </p>
                  <p className="text-[10px] text-rose-300 font-mono truncate bg-black/40 p-2 rounded-lg">
                    {provider.recent_errors[0]}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

