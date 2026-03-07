import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home';
import Advisory from '@/pages/Advisory';
import Services from '@/pages/Services';
import Markets from '@/pages/Markets';
import Join from '@/pages/Join';
import Careers from '@/pages/Careers';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
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
    </AnimatePresence>
  );
}

function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LenisProvider>
        <ScrollToTop />
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </LenisProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
