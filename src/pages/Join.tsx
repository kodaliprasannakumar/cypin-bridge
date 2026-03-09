import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, Shield, MessageCircle } from 'lucide-react';
import KineticTitle from '@/components/motion/KineticTitle';
import SectionEyebrow from '@/components/shared/SectionEyebrow';
import SuccessState from '@/components/shared/SuccessState';
import { scrollToFirstError, submitForm } from '@/lib/form-utils';

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm mb-1 block" style={{ color: '#fff' }}>{label}</label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: 'hsl(0, 84%, 60%)' }} role="alert">{error}</p>}
    </div>
  );
}

// ─── Manufacturer Form ──────────────────────────────────────────
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
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof mfgSchema>>({
    resolver: zodResolver(mfgSchema),
    defaultValues: { targetSegments: [] },
  });
  const descLen = (watch('productDescription') || '').length;

  if (submitted) {
    return (
      <SuccessState
        heading="Application Received"
        message="Our Scientific Advisory Committee will review your submission and conduct a preliminary assessment of your product's fit within the Indian market."
        timeline="Expected response: 5-7 business days"
        onReset={() => { setSubmitted(false); reset(); }}
        resetLabel="Submit another product"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(async (data) => { await submitForm(data, 'New Manufacturer Application — Cypin Bridge'); setSubmitted(true); }, scrollToFirstError)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Company Name" error={errors.companyName?.message}>
          <input {...register('companyName')} className="form-input" placeholder="e.g., Roche Diagnostics" aria-invalid={!!errors.companyName} />
        </FormField>
        <FormField label="Contact Person Name" error={errors.contactPerson?.message}>
          <input {...register('contactPerson')} className="form-input" placeholder="e.g., John Smith" aria-invalid={!!errors.contactPerson} />
        </FormField>
        <FormField label="Work Email" error={errors.email?.message}>
          <input {...register('email')} type="email" inputMode="email" className="form-input" placeholder="you@company.com" aria-invalid={!!errors.email} />
        </FormField>
        <FormField label="Country of Origin" error={errors.country?.message}>
          <input {...register('country')} className="form-input" placeholder="e.g., Germany" aria-invalid={!!errors.country} />
        </FormField>
      </div>
      <FormField label="Product Category" error={errors.productCategory?.message}>
        <select {...register('productCategory')} className="form-input" aria-invalid={!!errors.productCategory}>
          <option value="">Select category</option>
          {['Laboratory Instruments', 'Diagnostic Kits', 'Medical Devices', 'Bioprocessing Equipment', 'Analytical Instruments', 'Other'].map(o => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </FormField>
      <FormField label="Product/Technology Description" error={errors.productDescription?.message}>
        <textarea {...register('productDescription')} className="form-input min-h-[120px]" placeholder="Describe your product's key features, intended use, and technical specifications..." aria-invalid={!!errors.productDescription} />
        <span className="text-xs mt-1 block" style={{ color: 'var(--muted-color)' }}>{descLen}/50 min</span>
      </FormField>
      <FormField label="Target Indian Market Segment" error={errors.targetSegments?.message}>
        <fieldset className="space-y-3 mt-1">
          {segments.map(s => (
            <label key={s} className="flex items-center gap-3 text-sm cursor-pointer group" style={{ color: 'var(--muted-color)' }}>
              <input
                type="checkbox"
                value={s}
                {...register('targetSegments')}
                className="w-4 h-4 rounded border-2 appearance-none cursor-pointer checked:bg-[var(--accent)] checked:border-[var(--accent)] transition-colors"
                style={{ borderColor: 'var(--line)', minWidth: '16px', minHeight: '16px' }}
              />
              <span className="group-hover:text-white transition-colors">{s}</span>
            </label>
          ))}
        </fieldset>
      </FormField>
      <FormField label="Current Regulatory Certifications" error={undefined}>
        <input {...register('certifications')} className="form-input" placeholder="e.g., CE, FDA 510(k), ISO 13485" />
      </FormField>
      <FormField label="How did you hear about us?" error={undefined}>
        <select {...register('referral')} className="form-input">
          <option value="">Select</option>
          {['LinkedIn', 'Search Engine', 'Conference', 'Referral', 'Other'].map(o => <option key={o}>{o}</option>)}
        </select>
      </FormField>
      <FormField label="Additional Context" error={undefined}>
        <textarea {...register('additionalContext')} className="form-input" maxLength={500} placeholder="Any additional information about your India market entry goals..." />
      </FormField>
      <button type="submit" disabled={isSubmitting} className="pill-btn pill-btn-primary w-full">
        {isSubmitting ? 'Submitting...' : 'Submit for Market Fit Assessment'}
      </button>
    </form>
  );
}

// ─── Distributor Form ───────────────────────────────────────────
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
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof distSchema>>({
    resolver: zodResolver(distSchema),
    defaultValues: { productCategories: [], serviceCapabilities: [] },
  });

  if (submitted) {
    return (
      <SuccessState
        heading="Profile Received"
        message="Our committee will review your technical capability profile and assess alignment with our global manufacturer network."
        timeline="Expected response: 3-5 business days"
        onReset={() => { setSubmitted(false); reset(); }}
        resetLabel="Submit another profile"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(async (data) => { await submitForm(data, 'New Distributor Application — Cypin Bridge'); setSubmitted(true); }, scrollToFirstError)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Company Name" error={errors.companyName?.message}>
          <input {...register('companyName')} className="form-input" placeholder="e.g., BioScience India Pvt. Ltd." aria-invalid={!!errors.companyName} />
        </FormField>
        <FormField label="Contact Person" error={errors.contactPerson?.message}>
          <input {...register('contactPerson')} className="form-input" placeholder="e.g., Priya Sharma" aria-invalid={!!errors.contactPerson} />
        </FormField>
        <FormField label="Work Email" error={errors.email?.message}>
          <input {...register('email')} type="email" inputMode="email" className="form-input" placeholder="you@company.com" aria-invalid={!!errors.email} />
        </FormField>
        <FormField label="City / State" error={errors.cityState?.message}>
          <input {...register('cityState')} className="form-input" placeholder="e.g., Hyderabad, Telangana" aria-invalid={!!errors.cityState} />
        </FormField>
      </div>
      <FormField label="Years in Operation" error={errors.yearsInOperation?.message}>
        <input {...register('yearsInOperation')} type="number" inputMode="numeric" min="1" className="form-input" placeholder="e.g., 8" aria-invalid={!!errors.yearsInOperation} />
      </FormField>
      <FormField label="Current Product Categories" error={errors.productCategories?.message}>
        <fieldset className="space-y-3 mt-1">
          {distProducts.map(s => (
            <label key={s} className="flex items-center gap-3 text-sm cursor-pointer group" style={{ color: 'var(--muted-color)' }}>
              <input
                type="checkbox"
                value={s}
                {...register('productCategories')}
                className="w-4 h-4 rounded border-2 appearance-none cursor-pointer checked:bg-[var(--accent)] checked:border-[var(--accent)] transition-colors"
                style={{ borderColor: 'var(--line)', minWidth: '16px', minHeight: '16px' }}
              />
              <span className="group-hover:text-white transition-colors">{s}</span>
            </label>
          ))}
        </fieldset>
      </FormField>
      <FormField label="Cold Chain Infrastructure" error={errors.coldChain?.message}>
        <select {...register('coldChain')} className="form-input" aria-invalid={!!errors.coldChain}>
          <option value="">Select</option>
          <option>Full cold chain certified</option>
          <option>Partial cold chain</option>
          <option>No cold chain capability</option>
        </select>
      </FormField>
      <FormField label="ISO or Quality Certifications" error={undefined}>
        <input {...register('certifications')} className="form-input" placeholder="e.g., ISO 9001, ISO 13485" />
      </FormField>
      <FormField label="Existing Distribution Network" error={errors.distributionNetwork?.message}>
        <textarea {...register('distributionNetwork')} className="form-input min-h-[100px]" placeholder="Describe your geographic reach, key accounts, and institutional partnerships..." aria-invalid={!!errors.distributionNetwork} />
      </FormField>
      <FormField label="Service Capabilities" error={errors.serviceCapabilities?.message}>
        <fieldset className="space-y-3 mt-1">
          {serviceCaps.map(s => (
            <label key={s} className="flex items-center gap-3 text-sm cursor-pointer group" style={{ color: 'var(--muted-color)' }}>
              <input
                type="checkbox"
                value={s}
                {...register('serviceCapabilities')}
                className="w-4 h-4 rounded border-2 appearance-none cursor-pointer checked:bg-[var(--accent)] checked:border-[var(--accent)] transition-colors"
                style={{ borderColor: 'var(--line)', minWidth: '16px', minHeight: '16px' }}
              />
              <span className="group-hover:text-white transition-colors">{s}</span>
            </label>
          ))}
        </fieldset>
      </FormField>
      <FormField label="Message (optional)" error={undefined}>
        <textarea {...register('message')} className="form-input" placeholder="Anything else you'd like us to know..." />
      </FormField>
      <button type="submit" disabled={isSubmitting} className="pill-btn pill-btn-outline w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Technical Capability Profile'}
      </button>
    </form>
  );
}

// ─── Page ───────────────────────────────────────────────────────
export default function Join() {
  const [tab, setTab] = useState<'manufacturer' | 'distributor'>('manufacturer');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="pt-32 section-padding">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
          {/* Main Form Column */}
          <div>
            <SectionEyebrow>Join Our Ecosystem</SectionEyebrow>
            <KineticTitle line1="PARTNER WITH" line2="CYPIN SCIENTIFIC." variant="hero" className="mb-8" />

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

            {/* Both forms rendered — visibility toggled to preserve state */}
            <div style={{ display: tab === 'manufacturer' ? 'block' : 'none' }}>
              <p className="text-sm mb-8" style={{ color: 'var(--muted-color)' }}>
                Submit your product specifications for a preliminary Market Fit Assessment.
                Our committee will respond within 5–7 business days.
              </p>
              <ManufacturerForm />
            </div>
            <div style={{ display: tab === 'distributor' ? 'block' : 'none' }}>
              <p className="text-sm mb-8" style={{ color: 'var(--muted-color)' }}>
                Submit your technical capability profile. Our committee conducts rigorous audits
                to ensure all partners meet the standards of our global manufacturer network.
              </p>
              <DistributorForm />
            </div>
          </div>

          {/* Sidebar — Trust Signals */}
          <aside className="hidden lg:block pt-40">
            <div className="sticky top-28 space-y-6">
              <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent2)' }}>What to Expect</h4>

              <div className="flex gap-3 items-start">
                <Clock size={18} style={{ color: 'var(--accent)' }} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#fff' }}>Quick Review</p>
                  <p className="text-xs" style={{ color: 'var(--muted-color)' }}>Our committee reviews submissions within 5-7 business days.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Shield size={18} style={{ color: 'var(--accent)' }} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#fff' }}>Confidential</p>
                  <p className="text-xs" style={{ color: 'var(--muted-color)' }}>All product specifications and company details are protected under strict NDA.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <MessageCircle size={18} style={{ color: 'var(--accent)' }} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#fff' }}>Personal Response</p>
                  <p className="text-xs" style={{ color: 'var(--muted-color)' }}>A dedicated committee member will respond to discuss next steps.</p>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg text-xs leading-relaxed" style={{ background: 'var(--bg3)', borderTop: '2px solid var(--accent)', color: 'var(--muted-color)' }}>
                Questions before submitting? Contact us at{' '}
                <a href="mailto:inquiry@cypinscientific.com" className="hover:underline" style={{ color: 'var(--accent)' }}>
                  inquiry@cypinscientific.com
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
