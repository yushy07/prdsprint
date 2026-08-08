import { useCredits } from '@/context/CreditContext';
import { Clock, Plus, Minus, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';

export function CreditHistoryTimeline() {
  const { history } = useCredits();

  if (history.length === 0) return null;

  return (
    <div className="bg-[#0A0B10] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      
      <div className="flex justify-between items-end mb-8 relative z-10">
        <div>
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Clock className="text-blue-400" size={20} />
            Credit History
          </h2>
          <p className="text-gray-400 text-sm">Recent transactions and usage</p>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {history.slice(0, 10).map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                item.type === 'addition' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                item.type === 'deduction' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {item.type === 'addition' && <Plus size={16} />}
                {item.type === 'deduction' && <Minus size={16} />}
                {item.type === 'refund' && <RefreshCcw size={16} />}
              </div>
              
              <div>
                <p className="text-sm font-semibold text-white">{item.description}</p>
                <p className="text-xs text-gray-500">{new Date(item.date).toLocaleString(undefined, {
                  month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                })}</p>
              </div>
            </div>
            
            <div className={`font-bold ${
              item.type === 'addition' ? 'text-emerald-400' :
              item.type === 'deduction' ? 'text-red-400' :
              'text-blue-400'
            }`}>
              {item.type === 'addition' ? '+' : ''}{item.amount}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
