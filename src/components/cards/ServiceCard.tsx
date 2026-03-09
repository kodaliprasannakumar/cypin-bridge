import { motion } from 'framer-motion';

interface ServiceCardProps {
  number: string;
  tag: string;
  title: string;
  body: string;
  bullets: string[];
  delay?: number;
  tagColor?: string;
}

export default function ServiceCard({ number, tag, title, body, bullets, delay = 0, tagColor }: ServiceCardProps) {
  return (
    <motion.div
      className="diagonal-card relative overflow-hidden p-6 md:p-8"
      style={{ background: 'var(--bg3)' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute top-4 right-6 font-heading text-7xl font-light opacity-[0.06]" style={{ color: '#fff' }}>
        {number}
      </div>
      <div className="teal-top-border mb-4" />
      <span
        className="inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4"
        style={{ background: `${tagColor || 'var(--accent)'}20`, color: tagColor || 'var(--accent)' }}
      >
        {tag}
      </span>
      <h3 className="font-heading text-xl md:text-2xl font-normal mb-3" style={{ color: '#fff' }}>{title}</h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-color)' }}>{body}</p>
      <ul className="space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--muted-color)' }}>
            <span style={{ color: 'var(--accent)' }}>→</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
