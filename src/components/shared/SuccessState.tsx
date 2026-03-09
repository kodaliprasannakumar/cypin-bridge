import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface SuccessStateProps {
  heading?: string;
  message: string;
  timeline?: string;
  onReset?: () => void;
  resetLabel?: string;
}

export default function SuccessState({
  heading = 'Submission Received',
  message,
  timeline,
  onReset,
  resetLabel = 'Submit another',
}: SuccessStateProps) {
  return (
    <motion.div
      className="p-8 rounded-lg text-center"
      style={{ border: '1px solid var(--accent)', background: 'var(--bg3)' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <CheckCircle2 size={48} style={{ color: 'var(--accent)' }} className="mx-auto mb-4" />
      <h3 className="font-heading text-2xl font-normal mb-2" style={{ color: '#fff' }}>
        {heading}
      </h3>
      <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--muted-color)' }}>
        {message}
      </p>
      {timeline && (
        <p className="text-xs mt-3 inline-block px-3 py-1 rounded-full" style={{ background: 'rgba(62,232,160,0.1)', color: 'var(--accent)' }}>
          {timeline}
        </p>
      )}
      {onReset && (
        <button
          onClick={onReset}
          className="block mx-auto mt-6 text-sm hover:underline"
          style={{ color: 'var(--accent2)' }}
        >
          {resetLabel}
        </button>
      )}
    </motion.div>
  );
}
