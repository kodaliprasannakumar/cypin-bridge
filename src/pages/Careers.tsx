import { motion } from 'framer-motion';
import KineticTitle from '@/components/motion/KineticTitle';
import SectionEyebrow from '@/components/shared/SectionEyebrow';

const roles = [
  { title: 'Scientific Advisor', desc: 'Provide strategic scientific guidance to international biotech manufacturers entering the Indian market.' },
  { title: 'Regulatory Expert', desc: 'Navigate CDSCO pathways and compliance frameworks for medical devices and diagnostic kits.' },
  { title: 'Market Strategist', desc: 'Develop market entry strategies leveraging deep understanding of India\'s biotech landscape.' },
  { title: 'Technical Specialist', desc: 'Evaluate product-market fit and conduct technical due diligence for sophisticated instruments.' },
];

export default function Careers() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="pt-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionEyebrow>Careers</SectionEyebrow>
          <KineticTitle line1="JOIN OUR SCIENTIFIC" line2="ADVISORY COMMITTEE." className="mb-8" />
          <p className="max-w-3xl text-base leading-relaxed mb-12" style={{ color: 'var(--muted-color)' }}>
            We are always seeking distinguished professionals in biotechnology, regulatory affairs, and
            market strategy to strengthen our advisory committee. If you bring deep domain expertise and
            a commitment to scientific rigor, we'd like to hear from you.
          </p>
          <div className="space-y-4 mb-16">
            {roles.map((role, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-lg card-hover flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                style={{ background: 'var(--bg3)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div>
                  <h3 className="font-heading text-xl font-light" style={{ color: '#fff' }}>{role.title}</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--muted-color)' }}>{role.desc}</p>
                </div>
                <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Open</span>
              </motion.div>
            ))}
          </div>

          {/* Career Form */}
          <div className="max-w-2xl">
            <h3 className="font-heading text-2xl font-light mb-6" style={{ color: '#fff' }}>Open Application</h3>
            <CareerFormInline />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const careerSchema = z.object({
  fullName: z.string().trim().min(2, 'Name is required'),
  email: z.string().trim().email('Valid email required'),
  roleInterest: z.string().min(1, 'Select a role'),
  expertise: z.string().trim().min(80, 'Minimum 80 characters'),
});

type CareerData = z.infer<typeof careerSchema>;

function CareerFormInline() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<CareerData>({
    resolver: zodResolver(careerSchema),
  });

  const expertiseLen = (watch('expertise') || '').length;

  if (submitted) {
    return (
      <div className="p-6 rounded-lg" style={{ border: '1px solid var(--accent)', background: 'var(--bg3)' }}>
        <p style={{ color: 'var(--accent)' }}>Thank you for your interest. We'll reach out if there's a match with our current advisory needs.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(() => setSubmitted(true))} className="space-y-5">
      <FormField label="Full Name" error={errors.fullName?.message}>
        <input {...register('fullName')} className="form-input" placeholder="Your name" />
      </FormField>
      <FormField label="Email" error={errors.email?.message}>
        <input {...register('email')} type="email" className="form-input" placeholder="you@company.com" />
      </FormField>
      <FormField label="Role Interest" error={errors.roleInterest?.message}>
        <select {...register('roleInterest')} className="form-input">
          <option value="">Select a role</option>
          <option>Scientific Advisor</option>
          <option>Regulatory Expert</option>
          <option>Market Strategist</option>
          <option>Technical Specialist</option>
        </select>
      </FormField>
      <FormField label="Brief Statement of Expertise" error={errors.expertise?.message}>
        <textarea {...register('expertise')} className="form-input min-h-[120px]" placeholder="Describe your domain expertise..." />
        <span className="text-xs mt-1 block" style={{ color: 'var(--muted-color)' }}>{expertiseLen}/80 characters minimum</span>
      </FormField>
      <button type="submit" disabled={isSubmitting} className="pill-btn pill-btn-primary w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Open Application'}
      </button>
    </form>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm mb-1 block" style={{ color: '#fff' }}>{label}</label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: 'hsl(0, 84%, 60%)' }}>{error}</p>}
    </div>
  );
}
