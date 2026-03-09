import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: 'var(--bg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center max-w-lg">
        <div className="font-heading text-[8rem] md:text-[12rem] font-light leading-none gradient-text mb-4">
          404
        </div>
        <h1 className="font-heading text-2xl md:text-3xl font-normal mb-4" style={{ color: '#fff' }}>
          Page Not Found
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--muted-color)' }}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="pill-btn pill-btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <Link to="/contact" className="pill-btn pill-btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
