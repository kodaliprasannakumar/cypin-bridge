import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface KineticTitleProps {
  line1: string;
  line2: string;
  className?: string;
}

export default function KineticTitle({ line1, line2, className = '' }: KineticTitleProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="overflow-hidden">
        <motion.h2
          className="font-heading font-light uppercase leading-[1.05]"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 6.5rem)' }}
          initial={{ y: '110%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {line1}
        </motion.h2>
      </div>
      <div className="overflow-hidden">
        <motion.h2
          className="font-heading font-light uppercase leading-[1.05]"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 6.5rem)', color: 'var(--accent)' }}
          initial={{ y: '110%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          {line2}
        </motion.h2>
      </div>
    </div>
  );
}
