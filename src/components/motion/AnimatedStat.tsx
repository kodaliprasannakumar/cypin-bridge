import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface AnimatedStatProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

export default function AnimatedStat({ end, prefix = '', suffix = '', decimals = 0, label }: AnimatedStatProps) {
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(prefersReduced ? end : 0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || prefersReduced) return;
    let start: number | null = null;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Number((eased * end).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, decimals, prefersReduced]);

  return (
    <div ref={ref} className="p-6 md:p-8 card-hover teal-top-border" style={{ background: 'var(--bg2)' }}>
      <div className="font-heading text-4xl md:text-5xl font-light" style={{ color: 'var(--accent)' }}>
        {prefix}{count}{suffix}
      </div>
      <div className="mt-2 text-sm" style={{ color: 'var(--muted-color)' }}>{label}</div>
    </div>
  );
}
