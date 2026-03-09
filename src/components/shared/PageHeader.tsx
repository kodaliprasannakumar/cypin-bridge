import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import KineticTitle from '@/components/motion/KineticTitle';
import SectionEyebrow from '@/components/shared/SectionEyebrow';

interface PageHeaderProps {
  eyebrow: string;
  line1: string;
  line2: string;
  description?: string;
  bgImageUrl?: string;
  children?: ReactNode;
}

export default function PageHeader({ eyebrow, line1, line2, description, bgImageUrl, children }: PageHeaderProps) {
  return (
    <div className="relative pt-32 section-padding pb-12">
      {bgImageUrl && (
        <div
          className="page-header-bg"
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        />
      )}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 30%, transparent 70%, var(--bg) 100%)',
      }} />
      <motion.div
        className="relative max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <KineticTitle line1={line1} line2={line2} variant="hero" className="mb-8" />
        {description && (
          <p className="max-w-3xl text-base leading-relaxed" style={{ color: 'var(--muted-color)' }}>
            {description}
          </p>
        )}
        {children}
      </motion.div>
    </div>
  );
}
