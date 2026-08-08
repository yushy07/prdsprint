import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/services/admin/api';
import { Save, AlertCircle, Sliders, ShieldAlert } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function Settings() {
  const [localSettings, setLocalSettings] = useState<Record<string, string>>({});
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['adminSettings'],
    queryFn: adminApi.getSettings,
  });

  useEffect(() => {
    if (settings && Array.isArray(settings)) {
      const initial: Record<string, string> = {};
      settings.forEach((s) => {
        const keyName = s.key || s.setting_key;
        if (keyName) {
          const rawVal = s.value ?? s.setting_value ?? '';
          initial[keyName] = typeof rawVal === 'object' ? JSON.stringify(rawVal) : String(rawVal);
        }
      });
      setLocalSettings(initial);
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: string | number | boolean }) => adminApi.updateSetting(key, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSettings'] });
      showToast({ type: 'success', message: 'System configuration updated successfully' });
    },
    onError: (error: Error) => showToast({ type: 'error', message: error.message || 'Failed to update setting' }),
  });

  const handleSave = (key: string) => {
    updateMutation.mutate({ key, value: localSettings[key] });
  };

  const handleChange = (key: string, value: string) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  };

  const settingDefinitions = [
    { key: 'generation_price', label: 'PRD Generation Cost (Credits)', type: 'number', description: 'Credit cost charged to non-admin users for each PRD generation.' },
    { key: 'signup_credits', label: 'Default Welcome Bonus', type: 'number', description: 'Initial credit balance granted automatically to newly registered accounts.' },
    { key: 'retry_limit', label: 'Maximum Retry Threshold', type: 'number', description: 'Maximum retry attempts allowed for transient generation errors.' },
    { key: 'maintenance_mode', label: 'Global Maintenance Mode', type: 'boolean', description: 'Pause new PRD generation requests across all platforms.' },
    { key: 'export_expiry', label: 'PRD Export Expiry (Hours)', type: 'number', description: 'Expiration window for shareable PRD export links.' },
  ];

  return (
    <div className="space-y-6 max-w-4xl text-xs">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Configuration</h1>
        <p className="text-xs text-gray-400 mt-1">
          Adjust platform parameters, credit pricing thresholds, maintenance toggles, and security limits.
        </p>
      </div>

      <div className="bg-[#0f0f13] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5 shadow-xl">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading system parameters...</div>
        ) : (
          settingDefinitions.map((def) => {
            const val = localSettings[def.key] ?? '';
            return (
              <div
                key={def.key}
                className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-white mb-0.5">{def.label}</h3>
                  <p className="text-[11px] text-gray-400">{def.description}</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {def.type === 'boolean' ? (
                    <select
                      value={val}
                      onChange={(e) => handleChange(def.key, e.target.value)}
                      className="flex-1 sm:w-44 px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="true">Enabled</option>
                      <option value="false">Disabled</option>
                    </select>
                  ) : (
                    <input
                      type={def.type}
                      value={val}
                      onChange={(e) => handleChange(def.key, e.target.value)}
                      className="flex-1 sm:w-44 px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  )}
                  <button
                    onClick={() => handleSave(def.key)}
                    disabled={updateMutation.isPending}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Save size={14} />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-300">
        <AlertCircle size={18} className="shrink-0 mt-0.5 text-amber-400" />
        <p className="text-[11px] leading-relaxed">
          <strong>Notice:</strong> Configuration modifications apply in real-time across all active Edge Function workers and frontend sessions. Modifying credit costs or maintenance mode will directly impact active users.
        </p>
      </div>
    </div>
  );
}

