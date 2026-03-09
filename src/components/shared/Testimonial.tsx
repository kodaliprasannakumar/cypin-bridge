import { motion } from 'framer-motion';

interface TestimonialProps {
  quote: string;
  attribution: string;
  role?: string;
}

export default function Testimonial({ quote, attribution, role }: TestimonialProps) {
  return (
    <motion.div
      className="max-w-3xl mx-auto text-center py-16 px-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-12 h-px mx-auto mb-8" style={{ background: 'var(--gold)' }} />
      <blockquote
        className="font-heading text-2xl md:text-3xl font-light italic leading-relaxed mb-6"
        style={{ color: '#fff' }}
      >
        "{quote}"
      </blockquote>
      <div className="text-sm" style={{ color: 'var(--gold)' }}>
        — {attribution}
      </div>
      {role && (
        <div className="text-xs mt-1" style={{ color: 'var(--muted-color)' }}>
          {role}
        </div>
      )}
      <div className="w-12 h-px mx-auto mt-8" style={{ background: 'var(--gold)' }} />
    </motion.div>
  );
}
