import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminApi, AuditLog } from '@/services/admin/api';
import {
  Search,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  UserCheck,
  FileText,
  Terminal,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AuditLogs() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const { data: logs, isLoading } = useQuery({
    queryKey: ['adminAuditLogs'],
    queryFn: adminApi.getAuditLogs,
  });

  const filteredLogs = (logs || []).filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch =
      (item.admin_email && item.admin_email.toLowerCase().includes(q)) ||
      (item.target_user_email && item.target_user_email.toLowerCase().includes(q)) ||
      (item.action && item.action.toLowerCase().includes(q)) ||
      (item.reason && item.reason.toLowerCase().includes(q)) ||
      (item.id && item.id.toLowerCase().includes(q));

    const matchesAction =
      actionFilter === 'all' || item.action.toLowerCase().includes(actionFilter.toLowerCase());

    return matchesSearch && matchesAction;
  });

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  const currentPageItems = filteredLogs.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Administrative Audit Trail</h1>
          <p className="text-xs text-gray-400 mt-1">
            Immutable log of all administrative actions, credit grants, user bans, and setting overrides.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search admin, target, action, reason..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-[#0f0f13] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-gray-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={15} className="text-gray-400 shrink-0" />
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-[#0f0f13] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 capitalize"
          >
            <option value="all">All Action Types</option>
            <option value="ban">User Ban / Unban</option>
            <option value="credit">Credit Adjustment</option>
            <option value="setting">Setting Update</option>
            <option value="payment">Payment Override</option>
            <option value="retry">Generation Retry</option>
          </select>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-[#0f0f13] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-white/[0.03] text-gray-400 uppercase font-semibold border-b border-white/10">
              <tr>
                <th className="px-6 py-3.5">Timestamp</th>
                <th className="px-6 py-3.5">Admin Account</th>
                <th className="px-6 py-3.5">Action</th>
                <th className="px-6 py-3.5">Target User</th>
                <th className="px-6 py-3.5">Reason / Justification</th>
                <th className="px-6 py-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="px-6 py-4">
                      <div className="h-6 rounded bg-white/5 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : currentPageItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No audit logs found matching "{search}".
                  </td>
                </tr>
              ) : (
                currentPageItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-mono text-[11px] text-gray-400 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {item.admin_email || item.admin_id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold text-[10px] uppercase">
                        {item.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-medium">
                      {item.target_user_email || item.target_user_id?.slice(0, 8) || 'System / N/A'}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-gray-300" title={item.reason}>
                      {item.reason || 'No justification logged'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedLog(item)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-medium text-[11px] transition-colors cursor-pointer"
                      >
                        Inspect Payload
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between text-gray-400">
          <span>
            Showing {currentPageItems.length} of {filteredLogs.length} audit records
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-semibold text-white">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Payload Inspector Modal */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedLog(null)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#121218] border border-white/10 rounded-2xl shadow-2xl p-6 z-10 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Terminal size={16} className="text-indigo-400" />
                  <span>Audit Event Payload Inspector</span>
                </h3>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="text-gray-400 hover:text-white p-1 rounded-md"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3 font-mono text-[11px]">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <p className="text-gray-400">Log ID: <span className="text-white">{selectedLog.id}</span></p>
                  <p className="text-gray-400">Admin: <span className="text-indigo-400 font-bold">{selectedLog.admin_email}</span></p>
                  <p className="text-gray-400">Action: <span className="text-emerald-400 font-bold">{selectedLog.action}</span></p>
                  <p className="text-gray-400">Reason: <span className="text-gray-200">{selectedLog.reason || 'None'}</span></p>
                  <p className="text-gray-400">Timestamp: <span className="text-gray-300">{new Date(selectedLog.created_at).toLocaleString()}</span></p>
                </div>

                <div>
                  <p className="text-gray-400 font-sans font-bold mb-1">State Payload Diff:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Before Data</p>
                      <pre className="p-3 bg-black/60 rounded-xl text-amber-300 border border-white/5 overflow-x-auto text-[10px] max-h-40">
                        {selectedLog.before_data ? JSON.stringify(selectedLog.before_data, null, 2) : 'null'}
                      </pre>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">After Data</p>
                      <pre className="p-3 bg-black/60 rounded-xl text-emerald-300 border border-white/5 overflow-x-auto text-[10px] max-h-40">
                        {selectedLog.after_data ? JSON.stringify(selectedLog.after_data, null, 2) : 'null'}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-white/10">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
                >
                  Close Inspector
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

