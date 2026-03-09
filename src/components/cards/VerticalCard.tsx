import { motion } from 'framer-motion';

interface VerticalCardProps {
  title: string;
  body: string;
  delay?: number;
}

export default function VerticalCard({ title, body, delay = 0 }: VerticalCardProps) {
  return (
    <motion.div
      className="p-6 md:p-8 card-hover rounded-lg"
      style={{ background: 'var(--bg3)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <h4 className="font-heading text-lg md:text-xl font-normal mb-3" style={{ color: '#fff' }}>{title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-color)' }}>{body}</p>
    </motion.div>
  );
}
