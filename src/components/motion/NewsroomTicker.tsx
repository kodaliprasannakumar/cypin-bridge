import { Newspaper } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const headlines = [
  'India targets $300B bio-economy by 2030 — Department of Biotechnology',
  'CDSCO streamlines medical device registration for global manufacturers',
  'India-US trade: zero-tariff framework under discussion for biotech imports',
  'National Biopharma Mission Phase II funding approved — ₹2,500 Cr allocation',
  'Make in India: 100% FDI permitted in medical devices sector',
  'ICMR expands diagnostic testing network to 500+ labs nationwide',
];

function TickerContent() {
  return (
    <>
      {headlines.map((item, i) => (
        <span key={i} className="flex items-center gap-5 whitespace-nowrap">
          <Newspaper size={14} style={{ color: 'var(--accent2)', opacity: 0.7 }} className="shrink-0" />
          <span>{item}</span>
        </span>
      ))}
    </>
  );
}

export default function NewsroomTicker() {
  const prefersReduced = useReducedMotion();

  return (
    <section aria-label="Newsroom" className="overflow-hidden py-3" style={{ background: 'var(--bg3)' }}>
      <div className="max-w-7xl mx-auto px-5 mb-2">
        <span
          className="inline-block text-[0.6rem] uppercase tracking-[0.2em] px-2 py-0.5 rounded"
          style={{ color: 'var(--accent2)', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}
        >
          Newsroom
        </span>
      </div>
      <div
        className={prefersReduced ? 'flex gap-8 justify-center flex-wrap px-5' : 'newsroom-track gap-8'}
        style={{
          fontSize: '0.8rem',
          letterSpacing: '0.02em',
          color: 'var(--muted-color)',
        }}
      >
        <TickerContent />
        {!prefersReduced && <TickerContent />}
      </div>
    </section>
  );
}
