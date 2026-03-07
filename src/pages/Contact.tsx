import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Mail, Linkedin } from 'lucide-react';
import KineticTitle from '@/components/motion/KineticTitle';
import SectionEyebrow from '@/components/shared/SectionEyebrow';

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
      {error && <p className="text-xs mt-1" style={{ color: 'hsl(0, 84%, 60%)' }}>{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="pt-32 section-padding">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <SectionEyebrow>Get In Touch</SectionEyebrow>
            <KineticTitle line1="CONTACT" line2="OUR COMMITTEE." className="mb-8" />

            {submitted ? (
              <div className="p-6 rounded-lg" style={{ border: '1px solid var(--accent)', background: 'var(--bg3)' }}>
                <p style={{ color: 'var(--accent)' }}>Thank you. Our team will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(() => setSubmitted(true))} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Full Name" error={errors.fullName?.message}>
                    <input {...register('fullName')} className="form-input" />
                  </FormField>
                  <FormField label="Email" error={errors.email?.message}>
                    <input {...register('email')} type="email" className="form-input" />
                  </FormField>
                </div>
                <FormField label="Organization" error={errors.organization?.message}>
                  <input {...register('organization')} className="form-input" />
                </FormField>
                <FormField label="I am a..." error={errors.iAm?.message}>
                  <select {...register('iAm')} className="form-input">
                    <option value="">Select</option>
                    {['Global Manufacturer', 'Indian Distributor', 'Scientist/Researcher', 'Investor', 'Press/Media', 'Other'].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Subject" error={errors.subject?.message}>
                  <input {...register('subject')} className="form-input" />
                </FormField>
                <FormField label="Message" error={errors.message?.message}>
                  <textarea {...register('message')} className="form-input min-h-[120px]" />
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
                  <p className="text-sm" style={{ color: 'var(--muted-color)' }}>India</p>
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}
