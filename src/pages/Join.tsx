import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import KineticTitle from '@/components/motion/KineticTitle';
import SectionEyebrow from '@/components/shared/SectionEyebrow';

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm mb-1 block" style={{ color: '#fff' }}>{label}</label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: 'hsl(0, 84%, 60%)' }}>{error}</p>}
    </div>
  );
}

// Manufacturer Form
const mfgSchema = z.object({
  companyName: z.string().trim().min(2, 'Required'),
  contactPerson: z.string().trim().min(2, 'Required'),
  email: z.string().trim().email('Valid email required'),
  country: z.string().trim().min(2, 'Required'),
  productCategory: z.string().min(1, 'Select a category'),
  productDescription: z.string().trim().min(50, 'Minimum 50 characters'),
  targetSegments: z.array(z.string()).min(1, 'Select at least one'),
  certifications: z.string().optional(),
  referral: z.string().optional(),
  additionalContext: z.string().max(500).optional(),
});

const segments = ['Clinical Diagnostics', 'Research Institutions', 'Government Hospitals', 'Private Labs', 'Biopharmaceutical Manufacturers'];

function ManufacturerForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<z.infer<typeof mfgSchema>>({
    resolver: zodResolver(mfgSchema),
    defaultValues: { targetSegments: [] },
  });
  const descLen = (watch('productDescription') || '').length;

  if (submitted) {
    return (
      <div className="p-6 rounded-lg" style={{ border: '1px solid var(--accent)', background: 'var(--bg3)' }}>
        <p style={{ color: 'var(--accent)' }}>Thank you. Our Scientific Advisory Committee will review your submission and be in touch within 5–7 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(() => setSubmitted(true))} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Company Name" error={errors.companyName?.message}>
          <input {...register('companyName')} className="form-input" />
        </FormField>
        <FormField label="Contact Person Name" error={errors.contactPerson?.message}>
          <input {...register('contactPerson')} className="form-input" />
        </FormField>
        <FormField label="Work Email" error={errors.email?.message}>
          <input {...register('email')} type="email" className="form-input" />
        </FormField>
        <FormField label="Country of Origin" error={errors.country?.message}>
          <input {...register('country')} className="form-input" />
        </FormField>
      </div>
      <FormField label="Product Category" error={errors.productCategory?.message}>
        <select {...register('productCategory')} className="form-input">
          <option value="">Select category</option>
          {['Laboratory Instruments', 'Diagnostic Kits', 'Medical Devices', 'Bioprocessing Equipment', 'Analytical Instruments', 'Other'].map(o => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </FormField>
      <FormField label="Product/Technology Description" error={errors.productDescription?.message}>
        <textarea {...register('productDescription')} className="form-input min-h-[120px]" />
        <span className="text-xs mt-1 block" style={{ color: 'var(--muted-color)' }}>{descLen}/50 min</span>
      </FormField>
      <FormField label="Target Indian Market Segment" error={errors.targetSegments?.message}>
        <div className="space-y-2 mt-1">
          {segments.map(s => (
            <label key={s} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--muted-color)' }}>
              <input type="checkbox" value={s} {...register('targetSegments')} className="accent-[var(--accent)]" />
              {s}
            </label>
          ))}
        </div>
      </FormField>
      <FormField label="Current Regulatory Certifications" error={undefined}>
        <input {...register('certifications')} className="form-input" placeholder="CE, FDA, ISO 13485..." />
      </FormField>
      <FormField label="How did you hear about us?" error={undefined}>
        <select {...register('referral')} className="form-input">
          <option value="">Select</option>
          {['LinkedIn', 'Search Engine', 'Conference', 'Referral', 'Other'].map(o => <option key={o}>{o}</option>)}
        </select>
      </FormField>
      <FormField label="Additional Context" error={undefined}>
        <textarea {...register('additionalContext')} className="form-input" maxLength={500} />
      </FormField>
      <button type="submit" disabled={isSubmitting} className="pill-btn pill-btn-primary w-full">
        {isSubmitting ? 'Submitting...' : 'Submit for Market Fit Assessment'}
      </button>
    </form>
  );
}

// Distributor Form
const distSchema = z.object({
  companyName: z.string().trim().min(2, 'Required'),
  contactPerson: z.string().trim().min(2, 'Required'),
  email: z.string().trim().email('Valid email required'),
  cityState: z.string().trim().min(2, 'Required'),
  yearsInOperation: z.coerce.number().min(1, 'Minimum 1 year'),
  productCategories: z.array(z.string()).min(1, 'Select at least one'),
  coldChain: z.string().min(1, 'Required'),
  certifications: z.string().optional(),
  distributionNetwork: z.string().trim().min(30, 'Minimum 30 characters'),
  serviceCapabilities: z.array(z.string()).min(1, 'Select at least one'),
  message: z.string().optional(),
});

const distProducts = ['Lab Instruments', 'IVD/Diagnostics', 'Medical Devices', 'Reagents/Consumables', 'Bioprocessing Equipment'];
const serviceCaps = ['Installation & Commissioning', 'Calibration Services', 'After-Sales Technical Support', 'Field Service Engineers'];

function DistributorForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof distSchema>>({
    resolver: zodResolver(distSchema),
    defaultValues: { productCategories: [], serviceCapabilities: [] },
  });

  if (submitted) {
    return (
      <div className="p-6 rounded-lg" style={{ border: '1px solid var(--accent)', background: 'var(--bg3)' }}>
        <p style={{ color: 'var(--accent)' }}>Thank you. Our committee will review your capability profile and respond shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(() => setSubmitted(true))} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Company Name" error={errors.companyName?.message}>
          <input {...register('companyName')} className="form-input" />
        </FormField>
        <FormField label="Contact Person" error={errors.contactPerson?.message}>
          <input {...register('contactPerson')} className="form-input" />
        </FormField>
        <FormField label="Work Email" error={errors.email?.message}>
          <input {...register('email')} type="email" className="form-input" />
        </FormField>
        <FormField label="City / State" error={errors.cityState?.message}>
          <input {...register('cityState')} className="form-input" />
        </FormField>
      </div>
      <FormField label="Years in Operation" error={errors.yearsInOperation?.message}>
        <input {...register('yearsInOperation')} type="number" min="1" className="form-input" />
      </FormField>
      <FormField label="Current Product Categories" error={errors.productCategories?.message}>
        <div className="space-y-2 mt-1">
          {distProducts.map(s => (
            <label key={s} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--muted-color)' }}>
              <input type="checkbox" value={s} {...register('productCategories')} className="accent-[var(--accent)]" />
              {s}
            </label>
          ))}
        </div>
      </FormField>
      <FormField label="Cold Chain Infrastructure" error={errors.coldChain?.message}>
        <select {...register('coldChain')} className="form-input">
          <option value="">Select</option>
          <option>Full cold chain certified</option>
          <option>Partial cold chain</option>
          <option>No cold chain capability</option>
        </select>
      </FormField>
      <FormField label="ISO or Quality Certifications" error={undefined}>
        <input {...register('certifications')} className="form-input" />
      </FormField>
      <FormField label="Existing Distribution Network" error={errors.distributionNetwork?.message}>
        <textarea {...register('distributionNetwork')} className="form-input min-h-[100px]" placeholder="Describe your geographic reach and key accounts" />
      </FormField>
      <FormField label="Service Capabilities" error={errors.serviceCapabilities?.message}>
        <div className="space-y-2 mt-1">
          {serviceCaps.map(s => (
            <label key={s} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--muted-color)' }}>
              <input type="checkbox" value={s} {...register('serviceCapabilities')} className="accent-[var(--accent)]" />
              {s}
            </label>
          ))}
        </div>
      </FormField>
      <FormField label="Message (optional)" error={undefined}>
        <textarea {...register('message')} className="form-input" />
      </FormField>
      <button type="submit" disabled={isSubmitting} className="pill-btn pill-btn-outline w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Technical Capability Profile'}
      </button>
    </form>
  );
}

export default function Join() {
  const [tab, setTab] = useState<'manufacturer' | 'distributor'>('manufacturer');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="pt-32 section-padding">
        <div className="max-w-3xl mx-auto">
          <SectionEyebrow>Join Our Ecosystem</SectionEyebrow>
          <KineticTitle line1="PARTNER WITH" line2="CYPIN SCIENTIFIC." className="mb-8" />

          {/* Tab switcher */}
          <div className="flex gap-4 mb-10">
            <button
              onClick={() => setTab('manufacturer')}
              className="pill-btn text-sm"
              style={{
                background: tab === 'manufacturer' ? 'var(--accent)' : 'transparent',
                color: tab === 'manufacturer' ? 'var(--bg)' : 'var(--muted-color)',
                border: tab === 'manufacturer' ? 'none' : '1px solid var(--line)',
              }}
            >
              Global Manufacturers
            </button>
            <button
              onClick={() => setTab('distributor')}
              className="pill-btn text-sm"
              style={{
                background: tab === 'distributor' ? 'var(--accent)' : 'transparent',
                color: tab === 'distributor' ? 'var(--bg)' : 'var(--muted-color)',
                border: tab === 'distributor' ? 'none' : '1px solid var(--line)',
              }}
            >
              Indian Distributors
            </button>
          </div>

          {tab === 'manufacturer' ? (
            <div>
              <p className="text-sm mb-8" style={{ color: 'var(--muted-color)' }}>
                Submit your product specifications for a preliminary Market Fit Assessment.
                Our committee will respond within 5–7 business days.
              </p>
              <ManufacturerForm />
            </div>
          ) : (
            <div>
              <p className="text-sm mb-8" style={{ color: 'var(--muted-color)' }}>
                Submit your technical capability profile. Our committee conducts rigorous audits
                to ensure all partners meet the standards of our global manufacturer network.
              </p>
              <DistributorForm />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
