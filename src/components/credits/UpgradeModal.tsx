import { motion, AnimatePresence } from 'motion/react';
import { Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: string;
}

export function UpgradeModal({ 
  isOpen, 
  onClose,
  title = "Unlock Premium Features",
  body = "Upgrade to a premium plan to access advanced capabilities and generate more PRDs."
}: UpgradeModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#06080D]/80 backdrop-blur-md"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-[#0A0D14] border border-white/10 rounded-[24px] p-8 overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
          
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
            <Lock className="text-purple-400" size={24} />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
          
          <p className="text-gray-400 text-[15px] leading-relaxed mb-8">
            {body}
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors text-[14px]"
            >
              Maybe Later
            </button>
            <button
              onClick={() => {
                onClose();
                navigate('/#pricing');
              }}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 text-[14px]"
            >
              <span>Upgrade Now</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
