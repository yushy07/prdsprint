import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi, User, UserDetails } from '@/services/admin/api';
import {
  Search,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Edit3,
  MinusCircle,
  PlusCircle,
  X,
  ChevronRight,
  ChevronLeft,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  Lock,
  FileText,
  DollarSign,
  History
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'motion/react';

type ModalType = 'add_credits' | 'remove_credits' | 'set_credits' | 'ban' | 'unban' | null;

export function Users() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalAmount, setModalAmount] = useState<number>(10);
  const [modalReason, setModalReason] = useState<string>('');

  const { showToast } = useToast();
  const queryClient = useQueryClient();

  // Fetch Users
  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers', search, page],
    queryFn: () => adminApi.getUsersPage(search, page, pageSize),
  });

  // Fetch Detailed User Info when selected
  const { data: userDetails, isLoading: isDetailsLoading } = useQuery<UserDetails>({
    queryKey: ['adminUserDetails', selectedUser?.id],
    queryFn: () => adminApi.getUserDetails(selectedUser!.id),
    enabled: !!selectedUser,
  });

  // Ban / Unban Mutation
  const banMutation = useMutation({
    mutationFn: async ({ id, reason, isBanned }: { id: string; reason: string; isBanned: boolean }) => {
      if (isBanned) {
        return adminApi.unbanUser(id, reason);
      } else {
        return adminApi.banUser(id, reason);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminUserDetails', variables.id] });
      showToast(variables.isBanned ? 'User successfully unbanned' : 'User successfully banned', 'success');
      setActiveModal(null);
      setModalReason('');
    },
    onError: (err: Error) => showToast(err.message || 'Failed to update ban status', 'error'),
  });

  // Credits Mutation
  const creditsMutation = useMutation({
    mutationFn: async ({ id, amount, reason, action }: { id: string; amount: number; reason: string; action: 'add' | 'remove' | 'set' }) => {
      if (action === 'add') return adminApi.addCredits(id, amount, reason);
      if (action === 'remove') return adminApi.removeCredits(id, amount, reason);
      return adminApi.setCredits(id, amount, reason);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminUserDetails', variables.id] });
      showToast('User credits updated successfully', 'success');
      setActiveModal(null);
      setModalReason('');
    },
    onError: (err: Error) => showToast(err.message || 'Failed to update user credits', 'error'),
  });

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !activeModal) return;

    if (!modalReason.trim()) {
      showToast('Reason is required for administrative audit logs.', 'error');
      return;
    }

    if (activeModal === 'ban') {
      banMutation.mutate({ id: selectedUser.id, reason: modalReason, isBanned: false });
    } else if (activeModal === 'unban') {
      banMutation.mutate({ id: selectedUser.id, reason: modalReason, isBanned: true });
    } else if (activeModal === 'add_credits') {
      creditsMutation.mutate({ id: selectedUser.id, amount: Math.max(1, modalAmount), reason: modalReason, action: 'add' });
    } else if (activeModal === 'remove_credits') {
      creditsMutation.mutate({ id: selectedUser.id, amount: Math.max(1, modalAmount), reason: modalReason, action: 'remove' });
    } else if (activeModal === 'set_credits') {
      creditsMutation.mutate({ id: selectedUser.id, amount: Math.max(0, modalAmount), reason: modalReason, action: 'set' });
    }
  };

  // Filter & Pagination
  const totalPages = Math.max(1, Math.ceil((users?.total ?? 0) / pageSize));
  const currentPageUsers = users?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">User Management</h1>
          <p className="text-xs text-gray-400 mt-1">
            Search users, adjust credit balances, ban/unban accounts, and verify ledger consistency.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search email, name, or ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-[#0f0f13] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0f0f13] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/[0.03] text-gray-400 uppercase font-semibold border-b border-white/10">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Plan</th>
                <th className="px-6 py-3.5">Credits</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Joined</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="px-6 py-4">
                      <div className="h-6 rounded bg-white/5 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : currentPageUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-xs">
                    No users matching "{search}" found.
                  </td>
                </tr>
              ) : (
                currentPageUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{user.email}</p>
                          <p className="text-[10px] text-gray-400">{user.name || user.full_name || 'No display name'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold text-[10px] uppercase">
                        {user.plan_tier || user.plan || 'Free'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">
                      {(user.credits_balance ?? user.credits ?? 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {user.is_banned ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-semibold text-[10px] flex items-center gap-1 w-max">
                          <ShieldAlert size={11} /> Banned
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[10px] flex items-center gap-1 w-max">
                          <ShieldCheck size={11} /> Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-all flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <span>Details</span>
                        <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>
            Showing {currentPageUsers.length} of {users?.total ?? 0} users
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
              disabled={page >= totalPages || !users?.has_more}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* User Details Drawer */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedUser(null)}
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
                    {selectedUser.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{selectedUser.email}</h3>
                    <p className="text-[11px] text-gray-400 font-mono">ID: {selectedUser.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 space-y-6 flex-1 overflow-y-auto text-xs">
                {/* Ledger & Activity Stats Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-gray-400 text-[11px] mb-1">Credit Balance</p>
                    <p className="text-2xl font-bold text-white">
                      {selectedUser.credits !== undefined ? selectedUser.credits.toLocaleString() : 0}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-gray-400 text-[11px] mb-1">Ledger Consistency</p>
                    <div className="mt-1">
                      {userDetails?.ledger_consistent === false ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold text-[10px] flex items-center gap-1 w-max">
                          <AlertCircle size={12} /> Discrepancy Detected
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[10px] flex items-center gap-1 w-max">
                          <CheckCircle2 size={12} /> Verified Consistent
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">Account Telemetry</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-lg bg-white/5">
                      <FileText size={14} className="text-indigo-400 mx-auto mb-1" />
                      <p className="font-bold text-white text-sm">{userDetails?.generation_count ?? '—'}</p>
                      <p className="text-[10px] text-gray-400">Generations</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/5">
                      <DollarSign size={14} className="text-emerald-400 mx-auto mb-1" />
                      <p className="font-bold text-white text-sm">{userDetails?.payment_count ?? '—'}</p>
                      <p className="text-[10px] text-gray-400">Payments</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/5">
                      <History size={14} className="text-cyan-400 mx-auto mb-1" />
                      <p className="font-bold text-white text-sm">{userDetails?.transaction_count ?? '—'}</p>
                      <p className="text-[10px] text-gray-400">Ledger Logs</p>
                    </div>
                  </div>
                </div>

                {/* Credit Management Actions */}
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">Credit Operations</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setModalAmount(10);
                        setModalReason('');
                        setActiveModal('add_credits');
                      }}
                      className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer"
                    >
                      <PlusCircle size={18} />
                      <span>Add Credits</span>
                    </button>

                    <button
                      onClick={() => {
                        setModalAmount(10);
                        setModalReason('');
                        setActiveModal('remove_credits');
                      }}
                      className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer"
                    >
                      <MinusCircle size={18} />
                      <span>Deduct</span>
                    </button>

                    <button
                      onClick={() => {
                        setModalAmount(selectedUser.credits || 0);
                        setModalReason('');
                        setActiveModal('set_credits');
                      }}
                      className="p-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-400 font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer"
                    >
                      <Edit3 size={18} />
                      <span>Set Balance</span>
                    </button>
                  </div>
                </div>

                {/* Ban / Unban Security Controls */}
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">Access Control</h4>
                  {selectedUser.is_banned ? (
                    <button
                      onClick={() => {
                        setModalReason('');
                        setActiveModal('unban');
                      }}
                      className="w-full p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <ShieldCheck size={16} />
                      <span>Unban User Account</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setModalReason('');
                        setActiveModal('ban');
                      }}
                      className="w-full p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <ShieldAlert size={16} />
                      <span>Ban User Account</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation & Reason Dialog Modal */}
      <AnimatePresence>
        {activeModal && selectedUser && (
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
                    {activeModal === 'ban' && 'Ban User Confirmation'}
                    {activeModal === 'unban' && 'Unban User Confirmation'}
                    {activeModal === 'add_credits' && 'Add Credits'}
                    {activeModal === 'remove_credits' && 'Deduct Credits'}
                    {activeModal === 'set_credits' && 'Set Exact Credit Balance'}
                  </span>
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="text-gray-400 hover:text-white p-1 rounded-md"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <p className="text-gray-400 font-medium">Target User:</p>
                <p className="font-bold text-white text-xs">{selectedUser.email}</p>
                <p className="text-[10px] text-gray-500 font-mono">Current Credits: {selectedUser.credits}</p>
              </div>

              <form onSubmit={handleModalSubmit} className="space-y-4">
                {/* Credit Amount Input */}
                {['add_credits', 'remove_credits', 'set_credits'].includes(activeModal) && (
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">
                      {activeModal === 'set_credits' ? 'New Credit Balance:' : 'Credit Amount:'}
                    </label>
                    <input
                      type="number"
                      min={0}
                      required
                      value={modalAmount}
                      onChange={(e) => setModalAmount(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                )}

                {/* Required Reason Input */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Administrative Reason <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide detailed justification for audit logs..."
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
                    disabled={banMutation.isPending || creditsMutation.isPending}
                    className={`px-5 py-2 rounded-xl text-white font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                      activeModal === 'ban'
                        ? 'bg-red-600 hover:bg-red-700'
                        : activeModal === 'remove_credits'
                        ? 'bg-rose-600 hover:bg-rose-700'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {(banMutation.isPending || creditsMutation.isPending) && (
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
