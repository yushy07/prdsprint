/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ToastProvider } from "@/context/ToastContext";
import { CreditProvider } from "@/context/CreditContext";
import { QueryProvider } from "@/components/QueryProvider";
import { AdminErrorBoundary } from "@/components/admin/AdminErrorBoundary";
import { AdminLoadingState } from "@/components/admin/AdminPageState";
import { Legal } from "@/pages/Legal";

const Home = lazy(() => import("@/pages/Home").then(module => ({ default: module.Home })));
const Dashboard = lazy(() => import("@/pages/Dashboard").then(module => ({ default: module.Dashboard })));
const Builder = lazy(() => import("@/pages/Builder").then(module => ({ default: module.Builder })));
const Checkout = lazy(() => import("@/pages/Checkout").then(module => ({ default: module.Checkout })));

// Admin
const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout").then(m => ({ default: m.AdminLayout })));
const Overview = lazy(() => import("@/pages/admin/Overview").then(m => ({ default: m.Overview })));
const Users = lazy(() => import("@/pages/admin/Users").then(m => ({ default: m.Users })));
const Credits = lazy(() => import("@/pages/admin/Credits").then(m => ({ default: m.Credits })));
const Generations = lazy(() => import("@/pages/admin/Generations").then(m => ({ default: m.Generations })));
const Payments = lazy(() => import("@/pages/admin/Payments").then(m => ({ default: m.Payments })));
const AuditLogs = lazy(() => import("@/pages/admin/AuditLogs").then(m => ({ default: m.AuditLogs })));
const Analytics = lazy(() => import("@/pages/admin/Analytics").then(m => ({ default: m.Analytics })));
const Providers = lazy(() => import("@/pages/admin/Providers").then(m => ({ default: m.Providers })));
const SystemHealth = lazy(() => import("@/pages/admin/SystemHealth").then(m => ({ default: m.SystemHealth })));
const Settings = lazy(() => import("@/pages/admin/Settings").then(m => ({ default: m.Settings })));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (!window.location.hash && !pathname.startsWith('/admin')) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    if (!hash && !pathname.startsWith('/admin')) {
      const performScrollToTop = () => {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };
      performScrollToTop();
      const frameId = requestAnimationFrame(performScrollToTop);
      const timerId = setTimeout(performScrollToTop, 50);
      return () => { cancelAnimationFrame(frameId); clearTimeout(timerId); };
    }
  }, [pathname, hash, navType]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname.startsWith('/admin') ? 'admin' : location.pathname}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full min-h-screen bg-[#030305]"
      >
        <Suspense fallback={location.pathname.startsWith('/admin') ? <AdminLoadingState /> : <div className="w-full min-h-screen bg-[#030305]" />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="/privacy" element={<Legal />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminErrorBoundary><AdminLayout /></AdminErrorBoundary>}>
              <Route index element={<Overview />} />
              <Route path="users" element={<Users />} />
              <Route path="credits" element={<Credits />} />
              <Route path="generations" element={<Generations />} />
              <Route path="payments" element={<Payments />} />
              <Route path="logs" element={<AuditLogs />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="providers" element={<Providers />} />
              <Route path="system" element={<SystemHealth />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function RouteScrollProvider() {
  const location = useLocation();
  const content = (
    <>
      <ScrollToTop />
      <AnimatedRoutes />
    </>
  );

  // Admin has its own fixed shell and scroll container. Lenis attaches to the
  // document and would otherwise capture wheel events before that container.
  return location.pathname.startsWith('/admin') ? content : <SmoothScroll>{content}</SmoothScroll>;
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryProvider>
        <ToastProvider>
          <CreditProvider>
            <BrowserRouter>
              <RouteScrollProvider />
            </BrowserRouter>
          </CreditProvider>
        </ToastProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
