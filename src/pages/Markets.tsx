import { motion } from 'framer-motion';
import AnimatedStat from '@/components/motion/AnimatedStat';
import VerticalCard from '@/components/cards/VerticalCard';
import PageHeader from '@/components/shared/PageHeader';

const INDIA_IMG = 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=80&auto=format&fit=crop';

export default function Markets() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader
        eyebrow="The India Opportunity"
        line1="A GLOBAL BIOTECH"
        line2="FRONTIER."
        bgImageUrl={INDIA_IMG}
        description="India's bio-economy is on a trajectory to reach $300 billion by 2030, fueled by a surge in precision medicine, biopharmaceutical manufacturing, and a national shift toward evidence-based clinical diagnostics. For global manufacturers, India is no longer an optional market — it is a strategic necessity."
      />
      <div className="section-padding pt-0">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <AnimatedStat end={300} prefix="$" suffix="B" label="India Bio-Economy by 2030" />
            <AnimatedStat end={12} suffix="%" label="Medical Device Market CAGR" />
            <AnimatedStat end={3} label="High-Growth Verticals We Cover" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VerticalCard title="Clinical Diagnostics & IVD" body="With the Indian medical device market projected to grow at a 12.2% CAGR, there is urgent demand for advanced in-vitro diagnostics, molecular assays, and point-of-care testing kits for chronic and infectious diseases." delay={0} />
            <VerticalCard title="Life Science Research & Genomics" body="As India establishes itself as a global hub for genomic research and biosimilars, we facilitate the placement of next-generation sequencers (NGS), high-throughput screening tools, and sophisticated proteomics platforms." delay={0.1} />
            <VerticalCard title="Biopharmaceutical Manufacturing" body="We assist manufacturers of bioprocessing equipment and analytical instruments in connecting with India's leading vaccine and biologic producers." delay={0.2} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
