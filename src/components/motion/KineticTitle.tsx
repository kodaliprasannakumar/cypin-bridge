import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface KineticTitleProps {
  line1: string;
  line2: string;
  className?: string;
  variant?: 'hero' | 'section';
}

export default function KineticTitle({ line1, line2, className = '', variant = 'section' }: KineticTitleProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  const fontSize = variant === 'hero'
    ? 'clamp(2.4rem, 7vw, 6.5rem)'
    : 'clamp(1.8rem, 5vw, 4rem)';

  const isHero = variant === 'hero';

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="overflow-hidden">
        <motion.h2
          className="font-heading font-light uppercase leading-[1.05]"
          style={{ fontSize }}
          initial={prefersReduced ? {} : isHero ? { y: '110%' } : { opacity: 0, y: 20 }}
          animate={
            prefersReduced
              ? {}
              : inView
                ? isHero ? { y: '0%' } : { opacity: 1, y: 0 }
                : {}
          }
          transition={
            isHero
              ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.5, ease: 'easeOut' }
          }
        >
          {line1}
        </motion.h2>
      </div>
      <div className="overflow-hidden">
        <motion.h2
          className="font-heading font-light uppercase leading-[1.05]"
          style={{ fontSize, color: 'var(--accent)' }}
          initial={prefersReduced ? {} : isHero ? { y: '110%' } : { opacity: 0, y: 20 }}
          animate={
            prefersReduced
              ? {}
              : inView
                ? isHero ? { y: '0%' } : { opacity: 1, y: 0 }
                : {}
          }
          transition={
            isHero
              ? { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }
              : { duration: 0.5, ease: 'easeOut', delay: 0.1 }
          }
        >
          {line2}
        </motion.h2>
      </div>
    </div>
  );
}
