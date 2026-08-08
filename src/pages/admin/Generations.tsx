import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi, Generation } from '@/services/admin/api';
import {
  Search,
  RotateCcw,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  Lock,
  Layers,
  Cpu,
  RefreshCw,
  Coins,
  FileCode2,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'motion/react';

type ModalType = 'retry' | 'fail' | null;

export function Generations() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalReason, setModalReason] = useState<string>('');

  const { showToast } = useToast();
  const queryClient = useQueryClient();

  // Fetch Generations
  const { data: generations, isLoading } = useQuery({
    queryKey: ['adminGenerations'],
    queryFn: adminApi.getGenerations,
  });

  // Retry Mutation
  const retryMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      return adminApi.retryGeneration(id, reason);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminGenerations'] });
      showToast({ type: 'success', message: 'Generation request queued for retry' });
      setActiveModal(null);
      setModalReason('');
      setSelectedGeneration(null);
    },
    onError: (error: Error) => showToast({ type: 'error', message: error.message || 'Failed to retry generation' }),
  });

  // Fail Mutation
  const failMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      return adminApi.markGenerationFailed(id, reason);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminGenerations'] });
      showToast({ type: 'success', message: 'Generation marked as failed' });
      setActiveModal(null);
      setModalReason('');
      setSelectedGeneration(null);
    },
    onError: (error: Error) => showToast({ type: 'error', message: error.message || 'Failed to mark generation as failed' }),
  });

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGeneration || !activeModal) return;

    if (!modalReason.trim()) {
      showToast({ type: 'error', message: 'Reason is required for administrative audit logs.' });
      return;
    }

    if (activeModal === 'retry') {
      retryMutation.mutate({ id: selectedGeneration.id, reason: modalReason });
    } else if (activeModal === 'fail') {
      failMutation.mutate({ id: selectedGeneration.id, reason: modalReason });
    }
  };

  // Filter & Pagination
  const filteredGenerations = (generations || []).filter((gen) => {
    const q = search.toLowerCase();
    const matchesSearch =
      (gen.user_email && gen.user_email.toLowerCase().includes(q)) ||
      (gen.id && gen.id.toLowerCase().includes(q)) ||
      (gen.platform && gen.platform.toLowerCase().includes(q)) ||
      (gen.provider_used && gen.provider_used.toLowerCase().includes(q)) ||
      (gen.error_details && gen.error_details.toLowerCase().includes(q));

    const matchesStatus =
      statusFilter === 'all' || gen.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredGenerations.length / pageSize));
  const currentPageItems = filteredGenerations.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Generations Audit & Control</h1>
          <p className="text-xs text-gray-400 mt-1">
            Monitor real-time PRD generation requests, inspect provider telemetry, and trigger manual retries.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search email, ID, platform, provider, error..."
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
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-[#0f0f13] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 capitalize"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
            <option value="partial">Partial</option>
          </select>
        </div>
      </div>

      {/* Generations Table */}
      <div className="bg-[#0f0f13] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-white/[0.03] text-gray-400 uppercase font-semibold border-b border-white/10">
              <tr>
                <th className="px-6 py-3.5">Generation ID</th>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Provider / Platform</th>
                <th className="px-6 py-3.5">Credits Charged</th>
                <th className="px-6 py-3.5">Created</th>
                <th className="px-6 py-3.5 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-6 py-4">
                      <div className="h-6 rounded bg-white/5 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : currentPageItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No PRD generations matching "{search}" found.
                  </td>
                </tr>
              ) : (
                currentPageItems.map((gen) => {
                  const isCompleted = gen.status === 'completed';
                  const isProcessing = gen.status === 'processing';
                  const isFailed = gen.status === 'failed';
                  const isPartial = gen.status === 'partial';

                  return (
                    <tr key={gen.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4 font-mono text-[11px] text-gray-400">
                        {gen.id.slice(0, 10)}...
                      </td>

                      <td className="px-6 py-4 font-semibold text-white">
                        {gen.user_email || gen.user_id.slice(0, 8)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full border font-semibold text-[10px] uppercase flex items-center gap-1 w-max ${
                            isCompleted
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : isProcessing
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              : isFailed
                              ? 'bg-red-500/10 text-red-400 border-red-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}
                        >
                          {isCompleted && <CheckCircle2 size={11} />}
                          {isProcessing && <Clock size={11} className="animate-spin" />}
                          {isFailed && <XCircle size={11} />}
                          {isPartial && <AlertTriangle size={11} />}
                          {gen.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-300">
                          <Cpu size={13} className="text-indigo-400 shrink-0" />
                          <span>{gen.provider_used || 'Gemini'}</span>
                          {gen.platform && (
                            <span className="px-1.5 py-0.2 rounded bg-white/5 text-[9px] text-gray-400 border border-white/5">
                              {gen.platform}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-bold text-white">
                        {gen.credits_charged === 0 ? (
                          <span className="text-emerald-400 font-semibold">Free (0)</span>
                        ) : (
                          <span>{gen.net_credits_used ?? gen.credits_charged ?? gen.credits_used ?? 0}</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
                        {new Date(gen.started_at || gen.created_at || Date.now()).toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedGeneration(gen)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-all flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <span>Details</span>
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between text-gray-400">
          <span>
            Showing {currentPageItems.length} of {filteredGenerations.length} records
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

      {/* Generation Inspection Drawer */}
      <AnimatePresence>
        {selectedGeneration && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedGeneration(null)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg bg-[#0f0f13] border-l border-white/10 h-full flex flex-col shadow-2xl z-10"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">PRD Generation Details</h3>
                    <p className="text-[11px] text-gray-400 font-mono">ID: {selectedGeneration.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGeneration(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 space-y-6 flex-1 overflow-y-auto text-xs">
                {/* Status & Credits Overview */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-gray-400 text-[11px] mb-1">Status</p>
                    <span
                      className={`px-2.5 py-0.5 rounded-full border font-semibold text-[10px] uppercase inline-flex items-center gap-1 ${
                        selectedGeneration.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : selectedGeneration.status === 'processing'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : selectedGeneration.status === 'failed'
                          ? 'bg-red-500/10 text-red-400 border-red-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {selectedGeneration.status}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-gray-400 text-[11px] mb-1">Credits Charged</p>
                    <p className="text-xl font-bold text-white flex items-center gap-1.5">
                      <Coins size={16} className="text-amber-400" />
                      <span>{selectedGeneration.credits_charged ?? selectedGeneration.credits_used ?? 0}</span>
                    </p>
                  </div>
                </div>

                {/* Account & Provider Telemetry */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">Execution Metadata</h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="text-gray-400">User Email:</span>
                      <span className="font-semibold text-white">{selectedGeneration.user_email || '—'}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="text-gray-400">AI Provider:</span>
                      <span className="font-semibold text-indigo-400">{selectedGeneration.provider_used || 'Gemini'}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="text-gray-400">Platform:</span>
                      <span className="font-semibold text-white">{selectedGeneration.platform || 'Web'}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="text-gray-400">Retry Count:</span>
                      <span className="font-semibold text-white">{selectedGeneration.retry_count ?? 0}</span>
                    </div>
                    <div className="flex justify-between pb-1.5">
                      <span className="text-gray-400">Created At:</span>
                      <span className="font-mono text-[10px] text-gray-300">
                        {new Date(selectedGeneration.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Failure Trace (If Present) */}
                {selectedGeneration.error_details && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 space-y-2">
                    <h4 className="font-bold text-red-400 text-xs flex items-center gap-1.5">
                      <XCircle size={15} /> Error Details
                    </h4>
                    <pre className="text-[10px] font-mono text-red-300 whitespace-pre-wrap bg-black/40 p-3 rounded-lg overflow-x-auto">
                      {selectedGeneration.error_details}
                    </pre>
                  </div>
                )}

                {/* Failed Sections (If Present) */}
                {selectedGeneration.failed_sections && selectedGeneration.failed_sections.length > 0 && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <h4 className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                      <AlertTriangle size={15} /> Failed PRD Sections
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedGeneration.failed_sections.map((sec, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded text-[10px] font-mono">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Administrative Operations */}
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">Administrative Controls</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setModalReason('');
                        setActiveModal('retry');
                      }}
                      className="p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <RotateCcw size={16} />
                      <span>Retry Generation</span>
                    </button>

                    <button
                      onClick={() => {
                        setModalReason('');
                        setActiveModal('fail');
                      }}
                      className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <XCircle size={16} />
                      <span>Mark as Failed</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation & Reason Modal */}
      <AnimatePresence>
        {activeModal && selectedGeneration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setActiveModal(null)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#121218] border border-white/10 rounded-2xl shadow-2xl p-6 z-10 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Lock size={16} className="text-indigo-400" />
                  <span>
                    {activeModal === 'retry' && 'Queue Retry Request'}
                    {activeModal === 'fail' && 'Mark Generation as Failed'}
                  </span>
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="text-gray-400 hover:text-white p-1 rounded-md"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 font-mono text-[11px]">
                <p className="text-gray-400">Target Generation:</p>
                <p className="font-bold text-white text-xs">{selectedGeneration.id}</p>
                <p className="text-gray-400">User: {selectedGeneration.user_email}</p>
              </div>

              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Administrative Justification <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide reason for auditing..."
                    value={modalReason}
                    onChange={(e) => setModalReason(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-gray-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={retryMutation.isPending || failMutation.isPending}
                    className={`px-5 py-2 rounded-xl text-white font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                      activeModal === 'retry' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {(retryMutation.isPending || failMutation.isPending) && (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    <span>Confirm Action</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

