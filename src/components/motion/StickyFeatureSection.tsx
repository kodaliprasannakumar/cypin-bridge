import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import KineticTitle from './KineticTitle';

interface StickyFeatureSectionProps {
  visual: ReactNode;
  title1: string;
  title2: string;
  children: ReactNode;
  eyebrow?: string;
}

export default function StickyFeatureSection({ visual, title1, title2, children, eyebrow }: StickyFeatureSectionProps) {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <div ref={containerRef} className="section-padding">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <motion.div
            style={prefersReduced ? {} : { y: imageY }}
            className="aspect-square rounded-lg overflow-hidden relative"
          >
            {visual}
          </motion.div>
        </div>
        <div>
          {eyebrow && <span className="eyebrow mb-4 block">{eyebrow}</span>}
          <KineticTitle line1={title1} line2={title2} className="mb-8" />
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
