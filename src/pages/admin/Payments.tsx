import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi, Payment } from '@/services/admin/api';
import {
  Search,
  CheckCircle,
  RefreshCcw,
  RotateCw,
  ChevronRight,
  ChevronLeft,
  Filter,
  DollarSign,
  X,
  Lock,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'motion/react';

type ActionType = 'verify' | 'refund' | 'resync' | null;
const PAYMENT_GATEWAY_ENABLED = false;

export function Payments() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const [modalReason, setModalReason] = useState<string>('');

  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { data: payments, isLoading } = useQuery({
    queryKey: ['adminPayments'],
    queryFn: adminApi.getPayments,
  });

  const actionMutation = useMutation({
    mutationFn: async ({ id, action, reason }: { id: string; action: 'verify' | 'refund' | 'resync'; reason?: string }) => {
      if (action === 'verify') return adminApi.verifyPayment(id, reason);
      if (action === 'refund') return adminApi.refundPayment(id, reason);
      return adminApi.resyncPayment(id, reason);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['adminPayments'] });
      showToast({ type: 'success', message: `Payment successfully processed: ${variables.action}` });
      setActiveAction(null);
      setSelectedPayment(null);
      setModalReason('');
    },
    onError: (error: Error) => showToast({ type: 'error', message: error.message || 'Payment operation failed' }),
  });

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayment || !activeAction) return;

    if (!modalReason.trim()) {
      showToast({ type: 'error', message: 'Reason is required for administrative audit logs.' });
      return;
    }

    actionMutation.mutate({
      id: selectedPayment.id,
      action: activeAction,
      reason: modalReason,
    });
  };

  const filteredPayments = (payments || []).filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch =
      (item.user_email && item.user_email.toLowerCase().includes(q)) ||
      (item.id && item.id.toLowerCase().includes(q)) ||
      (item.gateway && item.gateway.toLowerCase().includes(q));

    const matchesStatus =
      statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / pageSize));
  const currentPageItems = filteredPayments.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Payments & Subscriptions</h1>
          <p className="text-xs text-gray-400 mt-1">
            Payment gateway integration is deferred until the product is stable. Existing records remain view-only for now.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-300">
        <AlertCircle size={18} className="shrink-0 mt-0.5 text-amber-400" />
        <p className="text-[11px] leading-relaxed">
          <strong>Gateway actions disabled:</strong> verification, refunds, and resync will be enabled only after a payment provider is integrated and tested.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search payment ID, user email, gateway..."
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
            <option value="all">All Payment Statuses</option>
            <option value="completed">Completed</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-[#0f0f13] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-white/[0.03] text-gray-400 uppercase font-semibold border-b border-white/10">
              <tr>
                <th className="px-6 py-3.5">Payment ID</th>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Gateway</th>
                <th className="px-6 py-3.5">Created</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
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
                    No payment records matching "{search}" found.
                  </td>
                </tr>
              ) : (
                currentPageItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-mono text-[11px] text-gray-400">
                      {item.id.slice(0, 12)}...
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {item.user_email || item.user_id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-400">
                      ${item.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full border font-semibold text-[10px] uppercase ${
                          item.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : item.status === 'refunded'
                            ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                            : item.status === 'failed'
                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-400">
                      {item.gateway || 'Stripe'}
                    </td>
                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedPayment(item);
                            setActiveAction('verify');
                            setModalReason('');
                          }}
                          disabled={!PAYMENT_GATEWAY_ENABLED}
                          className="p-1.5 text-gray-400 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Verify Payment"
                        >
                          <CheckCircle size={15} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedPayment(item);
                            setActiveAction('refund');
                            setModalReason('');
                          }}
                          disabled={!PAYMENT_GATEWAY_ENABLED}
                          className="p-1.5 text-gray-400 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Issue Refund"
                        >
                          <RefreshCcw size={15} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedPayment(item);
                            setActiveAction('resync');
                            setModalReason('');
                          }}
                          disabled={!PAYMENT_GATEWAY_ENABLED}
                          className="p-1.5 text-gray-400 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Resync Gateway State"
                        >
                          <RotateCw size={15} />
                        </button>
                      </div>
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
            Showing {currentPageItems.length} of {filteredPayments.length} transactions
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

      {/* Confirmation Modal */}
      <AnimatePresence>
        {activeAction && selectedPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setActiveAction(null)}
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
                  <span className="capitalize">
                    {activeAction} Payment Confirmation
                  </span>
                </h3>
                <button
                  onClick={() => setActiveAction(null)}
                  className="text-gray-400 hover:text-white p-1 rounded-md"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <p className="text-gray-400 font-medium">Payment ID: <span className="font-mono text-white">{selectedPayment.id}</span></p>
                <p className="text-gray-400 font-medium">User: <span className="text-white font-semibold">{selectedPayment.user_email}</span></p>
                <p className="text-gray-400 font-medium">Amount: <span className="text-emerald-400 font-bold">${selectedPayment.amount.toFixed(2)}</span></p>
              </div>

              <form onSubmit={handleActionSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Administrative Reason / Notes <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide justification for audit log tracking..."
                    value={modalReason}
                    onChange={(e) => setModalReason(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-gray-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveAction(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionMutation.isPending}
                    className={`px-5 py-2 rounded-xl text-white font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                      activeAction === 'refund'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : activeAction === 'verify'
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {actionMutation.isPending && (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    <span className="capitalize">Confirm {activeAction}</span>
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
