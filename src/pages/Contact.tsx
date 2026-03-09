import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Mail, Linkedin } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import SuccessState from '@/components/shared/SuccessState';

const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Required'),
  email: z.string().trim().email('Valid email required'),
  organization: z.string().trim().min(2, 'Required'),
  iAm: z.string().min(1, 'Required'),
  subject: z.string().trim().min(2, 'Required'),
  message: z.string().trim().min(30, 'Minimum 30 characters'),
});

type ContactData = z.infer<typeof contactSchema>;

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm mb-1 block" style={{ color: '#fff' }}>{label}</label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: 'hsl(0, 84%, 60%)' }} role="alert">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="relative pt-32 section-padding">
        {/* Subtle mesh background for Contact page identity */}
        <div className="mesh-gradient" style={{ opacity: 0.6 }} />
        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <span className="eyebrow mb-4 block">Get In Touch</span>
            <h1 className="font-heading font-light uppercase leading-[1.05] mb-2" style={{ fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', color: '#fff' }}>CONTACT</h1>
            <h1 className="font-heading font-light uppercase leading-[1.05] mb-8" style={{ fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', color: 'var(--accent)' }}>OUR COMMITTEE.</h1>

            {submitted ? (
              <SuccessState
                message="Thank you for reaching out. Our team will review your message and respond promptly."
                timeline="Expected response: 1-2 business days"
                onReset={() => { setSubmitted(false); reset(); }}
                resetLabel="Send another message"
              />
            ) : (
              <form onSubmit={handleSubmit(() => setSubmitted(true))} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Full Name" error={errors.fullName?.message}>
                    <input {...register('fullName')} className="form-input" placeholder="Your full name" aria-invalid={!!errors.fullName} />
                  </FormField>
                  <FormField label="Email" error={errors.email?.message}>
                    <input {...register('email')} type="email" inputMode="email" className="form-input" placeholder="you@company.com" aria-invalid={!!errors.email} />
                  </FormField>
                </div>
                <FormField label="Organization" error={errors.organization?.message}>
                  <input {...register('organization')} className="form-input" placeholder="Your company or institution" aria-invalid={!!errors.organization} />
                </FormField>
                <FormField label="I am a..." error={errors.iAm?.message}>
                  <select {...register('iAm')} className="form-input" aria-invalid={!!errors.iAm}>
                    <option value="">Select</option>
                    {['Global Manufacturer', 'Indian Distributor', 'Scientist/Researcher', 'Investor', 'Press/Media', 'Other'].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Subject" error={errors.subject?.message}>
                  <input {...register('subject')} className="form-input" placeholder="e.g., Market entry inquiry for IVD products" aria-invalid={!!errors.subject} />
                </FormField>
                <FormField label="Message" error={errors.message?.message}>
                  <textarea {...register('message')} className="form-input min-h-[120px]" placeholder="Tell us about your inquiry..." aria-invalid={!!errors.message} />
                </FormField>
                <button type="submit" disabled={isSubmitting} className="pill-btn pill-btn-primary w-full sm:w-auto">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:pt-32">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin size={20} style={{ color: 'var(--accent)' }} className="mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium" style={{ color: '#fff' }}>Corporate Office</h4>
                  <p className="text-sm" style={{ color: 'var(--muted-color)' }}>Hyderabad, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} style={{ color: 'var(--accent)' }} className="mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium" style={{ color: '#fff' }}>Email</h4>
                  <a href="mailto:inquiry@cypinscientific.com" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
                    inquiry@cypinscientific.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Linkedin size={20} style={{ color: 'var(--accent)' }} className="mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium" style={{ color: '#fff' }}>LinkedIn</h4>
                  <a href="https://linkedin.com/company/cypinscientific" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
                    linkedin.com/company/cypinscientific
                  </a>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="mt-12 p-6 rounded-lg" style={{ background: 'var(--bg3)', borderTop: '2px solid var(--accent)' }}>
              <h4 className="text-sm font-medium mb-3" style={{ color: '#fff' }}>Confidentiality Assurance</h4>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-color)' }}>
                All submissions are treated with strict confidentiality. Product specifications, company details,
                and strategic information shared through our forms are protected under our advisory agreement
                and are never disclosed to third parties without explicit written consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
