import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PageHeader from '@/components/shared/PageHeader';
import SuccessState from '@/components/shared/SuccessState';

const PHARMA_IMG = 'https://images.unsplash.com/photo-1581093458791-9d42e3c2fd56?w=1920&q=80&auto=format&fit=crop';

const roles = [
  { title: 'Scientific Advisor', desc: 'Provide strategic scientific guidance to international biotech manufacturers entering the Indian market.' },
  { title: 'Regulatory Expert', desc: 'Navigate CDSCO pathways and compliance frameworks for medical devices and diagnostic kits.' },
  { title: 'Market Strategist', desc: 'Develop market entry strategies leveraging deep understanding of India\'s biotech landscape.' },
  { title: 'Technical Specialist', desc: 'Evaluate product-market fit and conduct technical due diligence for sophisticated instruments.' },
];

const careerSchema = z.object({
  fullName: z.string().trim().min(2, 'Name is required'),
  email: z.string().trim().email('Valid email required'),
  roleInterest: z.string().min(1, 'Select a role'),
  expertise: z.string().trim().min(80, 'Minimum 80 characters'),
});

type CareerData = z.infer<typeof careerSchema>;

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm mb-1 block" style={{ color: '#fff' }}>{label}</label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: 'hsl(0, 84%, 60%)' }} role="alert">{error}</p>}
    </div>
  );
}

function CareerFormInline() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<CareerData>({
    resolver: zodResolver(careerSchema),
  });

  const expertiseLen = (watch('expertise') || '').length;

  if (submitted) {
    return (
      <SuccessState
        message="Thank you for your interest. We'll reach out if there's a match with our current advisory needs."
        timeline="We review applications on a rolling basis"
        onReset={() => { setSubmitted(false); reset(); }}
        resetLabel="Submit another application"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(() => setSubmitted(true))} className="space-y-5" noValidate>
      <FormField label="Full Name" error={errors.fullName?.message}>
        <input {...register('fullName')} className="form-input" placeholder="Your full name" aria-invalid={!!errors.fullName} />
      </FormField>
      <FormField label="Email" error={errors.email?.message}>
        <input {...register('email')} type="email" inputMode="email" className="form-input" placeholder="you@company.com" aria-invalid={!!errors.email} />
      </FormField>
      <FormField label="Role Interest" error={errors.roleInterest?.message}>
        <select {...register('roleInterest')} className="form-input" aria-invalid={!!errors.roleInterest}>
          <option value="">Select a role</option>
          <option>Scientific Advisor</option>
          <option>Regulatory Expert</option>
          <option>Market Strategist</option>
          <option>Technical Specialist</option>
        </select>
      </FormField>
      <FormField label="Brief Statement of Expertise" error={errors.expertise?.message}>
        <textarea {...register('expertise')} className="form-input min-h-[120px]" placeholder="Describe your domain expertise, years of experience, and key achievements in your field..." aria-invalid={!!errors.expertise} />
        <span className="text-xs mt-1 block" style={{ color: 'var(--muted-color)' }}>{expertiseLen}/80 characters minimum</span>
      </FormField>
      <button type="submit" disabled={isSubmitting} className="pill-btn pill-btn-primary w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Open Application'}
      </button>
    </form>
  );
}

export default function Careers() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader
        eyebrow="Careers"
        line1="JOIN OUR SCIENTIFIC"
        line2="ADVISORY COMMITTEE."
        bgImageUrl={PHARMA_IMG}
        description="We are always seeking distinguished professionals in biotechnology, regulatory affairs, and market strategy to strengthen our advisory committee. If you bring deep domain expertise and a commitment to scientific rigor, we'd like to hear from you."
      />
      <div className="section-padding pt-0">
        <div className="max-w-7xl mx-auto">
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
              >
                <div>
                  <h3 className="font-heading text-xl font-normal" style={{ color: '#fff' }}>{role.title}</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--muted-color)' }}>{role.desc}</p>
                </div>
                <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Open</span>
              </motion.div>
            ))}
          </div>

          <div className="max-w-2xl">
            <h3 className="font-heading text-2xl font-normal mb-6" style={{ color: '#fff' }}>Open Application</h3>
            <CareerFormInline />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
