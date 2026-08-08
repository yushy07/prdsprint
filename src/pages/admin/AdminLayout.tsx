import { useEffect, useState, useCallback } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  DollarSign,
  Activity,
  Server,
  Settings,
  LogOut,
  RefreshCw,
  ShieldAlert,
  Menu,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function AdminLayout() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const checkAdminAuth = useCallback(async () => {
    try {
      // 1. Check authenticated session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session || !session.user) {
        showToast('Access denied: Authentication session required.', 'error');
        navigate('/', { replace: true });
        return;
      }

      setAdminEmail(session.user.email || 'Admin');

      // 2. Call authoritative backend is_admin() RPC check with user_id parameter signature
      let isUserAdmin = false;
      const { data: rpcData, error: adminRpcError } = await supabase.rpc('is_admin', { user_id: session.user.id });
      if (!adminRpcError && rpcData !== null && rpcData !== undefined) {
        isUserAdmin = Boolean(rpcData);
      }
      
      if (!isUserAdmin) {
        showToast('Access denied: Administrator privileges required.', 'error');
        navigate('/', { replace: true });
        return;
      }

      setIsAdmin(true);
    } catch (err) {
      console.error('Admin authentication check failed:', err);
      showToast('Access denied: Failed to verify administrator status.', 'error');
      navigate('/', { replace: true });
    }
  }, [navigate, showToast]);

  useEffect(() => {
    checkAdminAuth();
  }, [checkAdminAuth]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries();
      showToast('Dashboard data refreshed', 'info');
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      showToast('Signed out of admin session', 'info');
      navigate('/');
    } catch (err) {
      console.error(err);
      navigate('/');
    }
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#070709] text-gray-200">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-medium text-gray-400">Verifying administrator authorization...</p>
      </div>
    );
  }

  const navItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Generations', path: '/admin/generations', icon: FileText },
    { name: 'Credits & Ledger', path: '/admin/credits', icon: CreditCard },
    { name: 'Payments', path: '/admin/payments', icon: DollarSign },
    { name: 'Audit Logs', path: '/admin/logs', icon: ShieldAlert },
    { name: 'Provider Health', path: '/admin/providers', icon: Server },
    { name: 'System Health', path: '/admin/system', icon: Activity },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Lock size={15} />
          </div>
          <span className="font-bold text-base text-white tracking-tight">PRDSprint Admin</span>
        </div>
        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          PROD
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/admin' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-sm'
                  : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-indigo-400' : 'text-gray-400'} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold uppercase shrink-0">
            {adminEmail.charAt(0) || 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{adminEmail}</p>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Authenticated Admin
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#070709] text-gray-200 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 bg-[#0f0f13] border-r border-white/10 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-64 bg-[#0f0f13] border-r border-white/10 flex flex-col z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#070709]">
        {/* Top Header Bar */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-6 bg-[#0f0f13]/80 backdrop-blur-md border-b border-white/10 flex-shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg lg:hidden transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Authoritative RPC Mode
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative"
                title="Admin Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-[#121218] border border-white/10 rounded-xl shadow-2xl p-4 z-50"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">System Status</h4>
                      <span className="text-[10px] text-emerald-400 font-medium">All Systems Operational</span>
                    </div>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-start gap-2.5 p-2 rounded bg-white/5">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-200 font-medium">RPC RPC Integrity Active</p>
                          <p className="text-[10px] text-gray-400">Session verified via Supabase auth.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 p-2 rounded bg-white/5">
                        <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-200 font-medium">Audit Logging</p>
                          <p className="text-[10px] text-gray-400">All administrative mutations are logged.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all ${
                isRefreshing ? 'animate-spin text-indigo-400' : ''
              }`}
              title="Refresh Dashboard Data"
            >
              <RefreshCw size={18} />
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Dynamic Admin Page Outlet */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
