import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi, CreditTransaction } from '@/services/admin/api';
import {
  Search,
  Plus,
  Minus,
  RefreshCcw,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Filter,
  CreditCard,
  Lock,
  X,
  FileText
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'motion/react';
import { downloadAdminCsv } from '@/lib/adminCsv';

export function Credits() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Credit adjustment modal state
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [targetUserEmail, setTargetUserEmail] = useState('');
  const [actionType, setActionType] = useState<'add' | 'remove' | 'set'>('add');
  const [amount, setAmount] = useState<number>(10);
  const [reason, setReason] = useState('');

  const { showToast } = useToast();
  const queryClient = useQueryClient();

  // Fetch Credit History
  const { data: history, isLoading } = useQuery({
    queryKey: ['adminCreditHistory', search, page],
    queryFn: () => adminApi.getCreditHistoryPage(search, page, pageSize),
  });

  // Credit mutation
  const creditMutation = useMutation({
    mutationFn: async ({ userId, amt, rsn, act }: { userId: string; amt: number; rsn: string; act: 'add' | 'remove' | 'set' }) => {
      if (act === 'add') return adminApi.addCredits(userId, amt, rsn);
      if (act === 'remove') return adminApi.removeCredits(userId, amt, rsn);
      return adminApi.setCredits(userId, amt, rsn);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCreditHistory'] });
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      showToast({ type: 'success', message: 'Credit adjustment completed successfully' });
      setIsAdjustModalOpen(false);
      setTargetUserEmail('');
      setReason('');
    },
    onError: (err: Error) => showToast({ type: 'error', message: err.message || 'Failed to process credit transaction' }),
  });

  const handleAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUserEmail.trim() || !reason.trim()) {
      showToast({ type: 'error', message: 'User email and administrative reason are required.' });
      return;
    }

    try {
      // Find user by email
      const users = await adminApi.getUsers(targetUserEmail.trim());
      const matched = users.find((u) => u.email.toLowerCase() === targetUserEmail.trim().toLowerCase());

      if (!matched) {
        showToast({ type: 'error', message: `User "${targetUserEmail}" not found.` });
        return;
      }

      creditMutation.mutate({
        userId: matched.id,
        amt: amount,
        rsn: reason,
        act: actionType,
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to locate user';
      showToast({ type: 'error', message: errorMsg });
    }
  };

  // Filter history
  const currentPageItems = (history?.data ?? []).filter((item) => typeFilter === 'all' || item.type.toLowerCase() === typeFilter.toLowerCase());
  const totalPages = Math.max(1, Math.ceil((history?.total ?? 0) / pageSize));

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Credits & Ledger History</h1>
          <p className="text-xs text-gray-400 mt-1">
            Auditable transaction history for credit issuances, generation deductions, and manual adjustments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => downloadAdminCsv('prdsprint-credit-ledger.csv', currentPageItems as unknown as Array<Record<string, unknown>>)}
          disabled={!currentPageItems.length}
          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 disabled:opacity-40"
        >Export CSV</button>

        <button
          onClick={() => {
            setTargetUserEmail('');
            setReason('');
            setAmount(10);
            setIsAdjustModalOpen(true);
          }}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          <CreditCard size={15} />
          <span>New Credit Adjustment</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search email, reason, request/generation ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-[#0f0f13] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-gray-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={15} className="text-gray-400 shrink-0" />
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-[#0f0f13] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 capitalize"
          >
            <option value="all">All Types</option>
            <option value="addition">Addition / Grant</option>
            <option value="deduction">Deduction / Usage</option>
            <option value="refund">Refund</option>
            <option value="adjustment">Manual Adjustment</option>
          </select>
        </div>
      </div>

      {/* Credit History Table */}
      <div className="bg-[#0f0f13] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-white/[0.03] text-gray-400 uppercase font-semibold border-b border-white/10">
              <tr>
                <th className="px-6 py-3.5">Timestamp</th>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Transaction Type</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Balance Delta</th>
                <th className="px-6 py-3.5">Description / Reason</th>
                <th className="px-6 py-3.5">Ref IDs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-6 py-4">
                      <div className="h-6 rounded bg-white/5 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : currentPageItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No credit transactions found matching your filters.
                  </td>
                </tr>
              ) : (
                currentPageItems.map((item) => {
                  const isAddition = item.type === 'addition' || item.amount > 0;
                  const isDeduction = item.type === 'deduction' || item.amount < 0;

                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-mono text-[11px] text-gray-400 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleString()}
                      </td>

                      <td className="px-6 py-4 font-semibold text-white">
                        {item.user_email || item.user_id.slice(0, 8)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                              isAddition
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : isDeduction
                                ? 'bg-rose-500/10 text-rose-400'
                                : 'bg-cyan-500/10 text-cyan-400'
                            }`}
                          >
                            {isAddition && <Plus size={12} />}
                            {isDeduction && <Minus size={12} />}
                            {!isAddition && !isDeduction && <RefreshCcw size={12} />}
                          </div>
                          <span className="capitalize font-medium">{item.type}</span>
                        </div>
                      </td>

                      <td
                        className={`px-6 py-4 font-bold ${
                          isAddition ? 'text-emerald-400' : isDeduction ? 'text-rose-400' : 'text-cyan-400'
                        }`}
                      >
                        {isAddition ? '+' : ''}
                        {item.amount}
                      </td>

                      <td className="px-6 py-4 text-gray-400 font-mono text-[11px]">
                        {item.balance_before !== undefined && item.balance_after !== undefined ? (
                          <span>
                            {item.balance_before} → <strong className="text-white">{item.balance_after}</strong>
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>

                      <td className="px-6 py-4 max-w-xs truncate text-gray-300" title={item.description}>
                        {item.description || 'No description provided'}
                      </td>

                      <td className="px-6 py-4 text-gray-500 font-mono text-[10px]">
                        {item.generation_id ? (
                          <span className="flex items-center gap-1 text-indigo-400">
                            <FileText size={11} /> Gen: {item.generation_id.slice(0, 8)}
                          </span>
                        ) : item.request_id ? (
                          <span>Req: {item.request_id.slice(0, 8)}</span>
                        ) : (
                          '—'
                        )}
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
            Showing {currentPageItems.length} of {history?.total ?? 0} transactions
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
              disabled={page >= totalPages || !history?.has_more}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Credit Adjustment Modal */}
      <AnimatePresence>
        {isAdjustModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsAdjustModalOpen(false)}
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
                  <span>Administrative Credit Adjustment</span>
                </h3>
                <button onClick={() => setIsAdjustModalOpen(false)} className="text-gray-400 hover:text-white p-1">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleAdjustSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Target User Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={targetUserEmail}
                    onChange={(e) => setTargetUserEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setActionType('add')}
                    className={`py-2 px-3 rounded-xl font-semibold border cursor-pointer transition-all ${
                      actionType === 'add'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-white/5 text-gray-400 border-white/5'
                    }`}
                  >
                    + Add
                  </button>

                  <button
                    type="button"
                    onClick={() => setActionType('remove')}
                    className={`py-2 px-3 rounded-xl font-semibold border cursor-pointer transition-all ${
                      actionType === 'remove'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                        : 'bg-white/5 text-gray-400 border-white/5'
                    }`}
                  >
                    - Deduct
                  </button>

                  <button
                    type="button"
                    onClick={() => setActionType('set')}
                    className={`py-2 px-3 rounded-xl font-semibold border cursor-pointer transition-all ${
                      actionType === 'set'
                        ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                        : 'bg-white/5 text-gray-400 border-white/5'
                    }`}
                  >
                    = Set Exact
                  </button>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    {actionType === 'set' ? 'New Credit Balance:' : 'Amount:'}
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Administrative Reason / Description <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide justification for auditing..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-gray-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAdjustModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creditMutation.isPending}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-2 cursor-pointer transition-all"
                  >
                    {creditMutation.isPending && (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    <span>Execute Transaction</span>
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
