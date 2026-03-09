import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PillarCardProps {
  number: string;
  label: string;
  children: ReactNode;
  delay?: number;
  accentColor?: string;
}

export default function PillarCard({ number, label, children, delay = 0, accentColor }: PillarCardProps) {
  return (
    <motion.div
      className="diagonal-card relative overflow-hidden p-6 md:p-8"
      style={{ background: 'var(--bg3)', borderTop: `2px solid ${accentColor || 'var(--accent)'}` }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute top-4 right-6 font-heading text-7xl font-light opacity-[0.06]" style={{ color: '#fff' }}>
        {number}
      </div>
      <h3 className="font-heading text-xl md:text-2xl font-normal mb-3" style={{ color: '#fff' }}>{label}</h3>
      <div className="text-sm leading-relaxed" style={{ color: 'var(--muted-color)' }}>{children}</div>
    </motion.div>
  );
}
