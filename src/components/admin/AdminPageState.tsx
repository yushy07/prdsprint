import { AlertCircle, Loader2, RefreshCw, SearchX, ShieldX } from 'lucide-react';

type StateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function AdminLoadingState({ title = 'Loading admin workspace' }: StateProps) {
  return (
    <div className="min-h-[280px] rounded-2xl border border-white/10 bg-[#0f0f13] flex flex-col items-center justify-center gap-3 text-gray-400">
      <Loader2 size={26} className="animate-spin text-indigo-400" aria-hidden="true" />
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-gray-500">Connecting to the operations data layer…</p>
    </div>
  );
}

export function AdminErrorState({ title = 'Unable to load this admin page', message = 'The backend did not return usable data.', onRetry }: StateProps) {
  return (
    <div role="alert" className="min-h-[280px] rounded-2xl border border-rose-500/20 bg-rose-500/5 flex flex-col items-center justify-center gap-3 text-center px-6">
      <AlertCircle size={26} className="text-rose-400" aria-hidden="true" />
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="max-w-md text-xs text-rose-200/70">{message}</p>
      {onRetry && <button onClick={onRetry} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-indigo-400"><RefreshCw size={14} /> Retry</button>}
    </div>
  );
}

export function AdminEmptyState({ title = 'Nothing to show yet', message = 'No records match the current filters.' }: StateProps) {
  return <div className="min-h-[220px] rounded-2xl border border-white/10 bg-[#0f0f13] flex flex-col items-center justify-center gap-3 text-center px-6"><SearchX size={25} className="text-gray-500" /><p className="text-sm font-semibold text-white">{title}</p><p className="text-xs text-gray-500">{message}</p></div>;
}

export function AdminForbiddenState() {
  return <div role="alert" className="min-h-[280px] rounded-2xl border border-amber-500/20 bg-amber-500/5 flex flex-col items-center justify-center gap-3 text-center px-6"><ShieldX size={26} className="text-amber-400" /><p className="text-sm font-semibold text-white">Administrator permission required</p><p className="text-xs text-amber-200/70">Your session is valid, but it does not have access to this workspace.</p></div>;
}
