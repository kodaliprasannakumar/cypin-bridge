import { motion } from 'framer-motion';
import PillarCard from '@/components/cards/PillarCard';
import PageHeader from '@/components/shared/PageHeader';

const DNA_IMG = '/images/dna-helix.jpg';

export default function Advisory() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader
        eyebrow="The Advisory Advantage"
        line1="A SCIENTIFIC COMPASS"
        line2="FOR THE INDIAN MARKET."
        bgImageUrl={DNA_IMG}
        description="At the core of our organization is a high-level Scientific Advisory Committee composed of seasoned experts in biotechnology, clinical diagnostics, and translational research. We bridge the gap between global innovation and local implementation through a three-pillared scientific approach."
      />
      <div className="section-padding pt-0">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <PillarCard number="01" label="Technical Due Diligence" delay={0}>
              We conduct rigorous evaluations of your instruments and kits to determine their clinical utility,
              performance compatibility, and research relevance within the Indian laboratory infrastructure.
            </PillarCard>
            <PillarCard number="02" label="Infrastructure Synergy" delay={0.1}>
              We identify and vet local distribution partners not just on their sales reach, but on their
              technical capacity — ensuring they possess the cold-chain integrity, calibration expertise,
              and biosafety standards your technology demands.
            </PillarCard>
            <PillarCard number="03" label="Strategic Market Alignment" delay={0.2}>
              We provide high-level guidance on navigating the Indian regulatory landscape (CDSCO) and
              aligning your product positioning with the priorities of India's top-tier research institutions
              and healthcare providers.
            </PillarCard>
          </div>
          <div className="p-8 rounded-lg card-hover" style={{ background: 'var(--bg3)', borderLeft: '2px solid var(--accent)' }}>
            <h3 className="font-heading text-xl font-normal mb-4" style={{ color: '#fff' }}>Why Advisory?</h3>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted-color)' }}>
              The Indian biotech sector is sophisticated but fragmented. Success requires more than a distributor;
              it requires a partner who speaks the language of the scientist. Our committee acts as your
              "boots on the ground," providing the credibility and technical oversight needed to transform
              a product launch into a long-term market standard.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
