import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/services/admin/api';
import {
  Users,
  UserX,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  DollarSign,
  CreditCard,
  Zap,
  ArrowDownRight,
  Activity,
  Server,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Link } from 'react-router-dom';

export function Overview() {
  const { data: stats, isLoading: isStatsLoading, error: statsError } = useQuery({
    queryKey: ['adminOverviewStats'],
    queryFn: adminApi.getOverviewStats,
    refetchInterval: 60_000,
  });

  const { data: dailyStats, isLoading: isDailyLoading } = useQuery({
    queryKey: ['adminDailyStats'],
    queryFn: adminApi.getDailyStats,
    refetchInterval: 300_000,
  });

  const { data: providerStats, isLoading: isProviderLoading } = useQuery({
    queryKey: ['adminProviderStats'],
    queryFn: adminApi.getProviderStats,
    refetchInterval: 60_000,
  });

  const { data: recentLogs, isLoading: isLogsLoading } = useQuery({
    queryKey: ['adminRecentLogs'],
    queryFn: adminApi.getAuditLogs,
    refetchInterval: 60_000,
  });

  const { data: systemHealth, isLoading: isHealthLoading } = useQuery({
    queryKey: ['adminSystemHealth'],
    queryFn: adminApi.getSystemHealth,
    refetchInterval: 60_000,
  });

  const statCards = [
    { label: 'Total Users', value: stats?.total_users, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { label: 'Banned Users', value: stats?.banned_users, icon: UserX, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
    { label: 'Total Generations', value: stats?.total_generations, icon: FileText, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
    { label: 'Pending Generations', value: stats?.pending_generations, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'Completed Generations', value: stats?.completed_generations, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Failed Generations', value: stats?.failed_generations, icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
    { label: 'Total Payments', value: stats?.total_payments, icon: DollarSign, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { label: 'Completed Payments', value: stats?.completed_payments, icon: CreditCard, color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
    { label: 'Credits Issued', value: stats?.credits_issued, icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { label: 'Credits Consumed', value: stats?.credits_consumed, icon: ArrowDownRight, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10 border-fuchsia-500/20' },
  ];

  const chartData = (dailyStats || []).slice(-14).map(item => ({
    date: item.date ? new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '',
    Completed: item.completed || 0,
    Failed: item.failed || 0,
    Credits: item.credits_used || 0,
  }));

  const healthBadgeClass = (status?: string) => status === 'healthy'
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    : status === 'unknown'
    ? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    : 'bg-amber-500/10 text-amber-400 border-amber-500/20';

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Overview</h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time platform metrics, system vitals, provider stats, and recent audit trails.
          </p>
        </div>
      </div>

      {statsError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
          <XCircle size={18} />
          <span>Failed to load overview metrics. Please ensure admin RPCs are provisioned.</span>
        </div>
      )}

      {/* 10 Core Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {isStatsLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-28 rounded-xl bg-white/[0.03] border border-white/5 animate-pulse" />
            ))
          : statCards.map((card, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#0f0f13] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-medium text-gray-400 truncate">{card.label}</span>
                  <div className={`p-1.5 rounded-lg border shrink-0 ${card.bg}`}>
                    <card.icon size={15} className={card.color} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">
                  {card.value !== undefined ? card.value.toLocaleString() : '0'}
                </div>
              </div>
            ))}
      </div>

      {/* Charts & System Health Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Generation Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0f0f13] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Daily Generation Trends</h3>
              <p className="text-xs text-gray-400 mt-0.5">Completed vs Failed generations over time</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              14-Day View
            </span>
          </div>

          <div className="h-64 w-full">
            {isDailyLoading ? (
              <div className="h-full w-full rounded-xl bg-white/5 animate-pulse" />
            ) : chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-gray-500">
                No daily generation statistics recorded yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#16161e',
                      borderColor: '#ffffff15',
                      color: '#fff',
                      borderRadius: '10px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="Completed" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
                  <Bar dataKey="Failed" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={32} />
                </RechartsBarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* System Health Status Card */}
        <div className="p-6 rounded-2xl bg-[#0f0f13] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-emerald-400" />
                <h3 className="text-sm font-bold text-white">System Vitals</h3>
              </div>
              <Link to="/admin/system" className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-medium">
                View All <ArrowUpRight size={12} />
              </Link>
            </div>

            {isHealthLoading ? (
              <div className="space-y-3">
                <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
                <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
                <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Database Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${healthBadgeClass(systemHealth?.database_status)}`}>
                    {systemHealth?.database_status || 'unknown'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Storage Buckets</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${healthBadgeClass(systemHealth?.storage_status)}`}>
                    {systemHealth?.storage_status || 'unknown'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Pending Generations</span>
                  <span className="text-xs font-bold text-amber-400">
                    {systemHealth?.pending_generations ?? 0}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Maintenance Mode</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    systemHealth?.maintenance_mode
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {systemHealth?.maintenance_mode ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 text-[11px] text-gray-500 flex items-center justify-between">
            <span>Last checked</span>
            <span className="font-mono text-gray-400">
              {systemHealth?.last_checked ? new Date(systemHealth.last_checked).toLocaleTimeString() : 'Just now'}
            </span>
          </div>
        </div>
      </div>

      {/* Provider Health & Recent Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Provider Success Summary */}
        <div className="p-6 rounded-2xl bg-[#0f0f13] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server size={18} className="text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Provider Performance Summary</h3>
            </div>
            <Link to="/admin/providers" className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-medium">
              Details <ArrowUpRight size={12} />
            </Link>
          </div>

          {isProviderLoading ? (
            <div className="space-y-3">
              <div className="h-16 rounded-xl bg-white/5 animate-pulse" />
              <div className="h-16 rounded-xl bg-white/5 animate-pulse" />
            </div>
          ) : !providerStats || providerStats.length === 0 ? (
            <div className="p-6 text-center text-xs text-gray-500 bg-white/[0.02] rounded-xl border border-white/5">
              No AI provider usage data logged.
            </div>
          ) : (
            <div className="space-y-3">
              {providerStats.slice(0, 3).map((p, i) => {
                const rate = p.success_rate ?? (p.total_requests ? (p.completed / p.total_requests) * 100 : 100);
                const isGood = rate >= 95;
                const isWarning = rate >= 80 && rate < 95;

                return (
                  <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white capitalize">{p.provider || 'Gemini Flash'}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {p.completed?.toLocaleString() || 0} succeeded • {p.failures?.toLocaleString() || 0} failed
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        isGood
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : isWarning
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {rate.toFixed(1)}% Success
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Audit Activity */}
        <div className="p-6 rounded-2xl bg-[#0f0f13] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert size={18} className="text-amber-400" />
              <h3 className="text-sm font-bold text-white">Recent Audit Trail</h3>
            </div>
            <Link to="/admin/logs" className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-medium">
              View All <ArrowUpRight size={12} />
            </Link>
          </div>

          {isLogsLoading ? (
            <div className="space-y-3">
              <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
              <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
            </div>
          ) : !recentLogs || recentLogs.length === 0 ? (
            <div className="p-6 text-center text-xs text-gray-500 bg-white/[0.02] rounded-xl border border-white/5">
              No audit logs recorded yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white truncate">{log.action}</p>
                    <p className="text-[11px] text-gray-400 truncate">
                      By {log.admin_email || 'Admin'} {log.target_user_email ? `→ ${log.target_user_email}` : ''}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-500 shrink-0 font-mono">
                    {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
