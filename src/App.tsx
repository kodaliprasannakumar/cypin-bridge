import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const Advisory = lazy(() => import('@/pages/Advisory'));
const Services = lazy(() => import('@/pages/Services'));
const Markets = lazy(() => import('@/pages/Markets'));
const Join = lazy(() => import('@/pages/Join'));
const Careers = lazy(() => import('@/pages/Careers'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/services" element={<Services />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/join" element={<Join />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smooth: true,
    } as any);
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  return <>{children}</>;
}

const App = () => (
  <BrowserRouter>
    <LenisProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:text-sm"
        style={{ background: 'var(--accent)', color: 'var(--bg)' }}
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <AppRoutes />
      </main>
      <Footer />
    </LenisProvider>
  </BrowserRouter>
);

export default App;
