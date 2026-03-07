import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Advisory', to: '/advisory' },
  { label: 'Services', to: '/services' },
  { label: 'Markets', to: '/markets' },
  { label: 'Careers', to: '/careers' },
  { label: 'Join Us', to: '/join' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0.85, 0.97]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgb(6,8,13)', opacity: bgOpacity }}
      />
      <div className="relative h-[68px] max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-heading text-xl tracking-wide" style={{ color: '#fff' }}>
          Cypin<span style={{ color: 'var(--accent)' }}>.</span>Scientific
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm transition-colors duration-200 hover:text-[var(--accent)]"
              style={{ color: location.pathname === l.to ? 'var(--accent)' : 'var(--muted-color)' }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden md:inline-flex pill-btn pill-btn-primary text-sm">
            Contact Us
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden relative"
            style={{ background: 'var(--bg2)' }}
          >
            <div className="px-5 py-6 flex flex-col gap-4">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={l.to}
                    className="text-lg font-heading"
                    style={{ color: location.pathname === l.to ? 'var(--accent)' : '#fff' }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" className="pill-btn pill-btn-primary mt-2 text-center">
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
