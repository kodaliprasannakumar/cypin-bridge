import { motion } from 'framer-motion';
import ServiceCard from '@/components/cards/ServiceCard';
import PageHeader from '@/components/shared/PageHeader';

const LAB_IMG = '/images/lab-equipment.jpg';

export default function Services() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader
        eyebrow="Our Services"
        line1="PRECISION-ENGINEERED"
        line2="MARKET ENTRY."
        bgImageUrl={LAB_IMG}
        description="We provide a comprehensive suite of advisory services designed to navigate the technical, regulatory, and commercial complexities of the Indian biotechnology sector."
      />
      <div className="section-padding pt-0">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard number="01" tag="Matchmaking" title="Strategic Distributor Matchmaking" delay={0}
              body="We don't just find agents; we identify technical partners. Our committee conducts a multi-tier vetting process to connect you with local distributors who possess the right capabilities."
              bullets={['Proven technical infrastructure: verified cold-chain capabilities and ISO-certified storage', 'Specialized sales networks with existing relationships in Tier-1 research hospitals and government institutions', 'Demonstrated ability to provide after-sales calibration and engineering support for high-end instrumentation']}
            />
            <ServiceCard number="02" tag="Due Diligence" title="Technical & Clinical Due Diligence" delay={0.1} tagColor="var(--accent2)"
              body="Before a single unit is shipped, we evaluate the Product-Market Fit within the Indian scientific landscape."
              bullets={['Utility assessment: analyzing how your kits or instruments solve specific challenges in Indian clinical or research sectors', 'Protocol alignment: ensuring your technology meets local laboratory standards and SOPs', 'Competitive analysis: a scientific breakdown of the existing landscape to optimize your value proposition']}
            />
            <ServiceCard number="03" tag="Regulatory" title="Regulatory & Compliance Advisory" delay={0.2}
              body="Navigating the Indian regulatory environment requires deep localized expertise. We provide high-level guidance across all compliance dimensions."
              bullets={['CDSCO & DCGI pathways: advising on classification and registration requirements for diagnostic kits and medical devices', 'Import documentation: assisting with technical documentation required for smooth customs clearance', 'Quality standards: ensuring compliance with local biosafety and environmental regulations']}
            />
            <ServiceCard number="04" tag="KOL Engagement" title="Key Opinion Leader (KOL) Engagement" delay={0.3} tagColor="var(--gold)"
              body="Building scientific credibility is essential for high-end biotech adoption. Our committee facilitates direct access to India's leading scientific voices."
              bullets={["Scientific roundtables introducing your technology to India's leading scientists and clinicians", 'Validation studies: advising on pilot programs or multicenter evaluations within Indian institutions', 'Technical workshops overseeing scientific training of local partners to maintain brand excellence']}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
