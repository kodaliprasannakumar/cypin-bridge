import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FlaskConical, Users, Map, Mail, Linkedin } from 'lucide-react';
import ParticleField from '@/components/motion/ParticleField';
import MarqueeStrip from '@/components/motion/MarqueeStrip';
import KineticTitle from '@/components/motion/KineticTitle';
import StickyFeatureSection from '@/components/motion/StickyFeatureSection';
import AnimatedStat from '@/components/motion/AnimatedStat';
import PillarCard from '@/components/cards/PillarCard';
import ServiceCard from '@/components/cards/ServiceCard';
import VerticalCard from '@/components/cards/VerticalCard';
import SectionEyebrow from '@/components/shared/SectionEyebrow';

const heroWords = ['The', 'Scientific', 'Bridge', 'to', 'the', 'Indian', 'Biotech', 'Market.'];

function MissionVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center relative" style={{ background: 'var(--bg3)' }}>
      {[120, 80, 40].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${size}%`,
            height: `${size}%`,
            border: '1px solid rgba(62,232,160,0.15)',
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}
      <div className="w-3 h-3 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 20px rgba(62,232,160,0.5)' }} />
    </div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 0.4], ['0%', '-20%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <div>
      {/* HERO */}
      <div ref={heroRef} style={{ height: '200vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          <motion.div className="hero-bg" style={{ scale: bgScale }} />
          <div className="dot-grid absolute inset-0" />
          <ParticleField />

          <motion.div
            className="relative z-10 max-w-4xl mx-auto px-5 text-center"
            style={{ y: textY, opacity: textOpacity }}
          >
            <SectionEyebrow>Scientific Advisory & Strategic Consultancy</SectionEyebrow>
            <h1 className="font-heading font-light mt-4 leading-[1.05] flex flex-wrap justify-center gap-x-[0.35em]"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)' }}
            >
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  className={['Scientific', 'Bridge'].includes(word) ? 'gradient-text' : ''}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  style={{ color: ['Scientific', 'Bridge'].includes(word) ? undefined : '#fff' }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--muted-color)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Expert-led market entry for global manufacturers of sophisticated instruments and diagnostic kits.
              We combine technical due diligence with strategic matchmaking to ensure your innovations reach
              India's leading laboratories.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Link to="/join" className="pill-btn pill-btn-primary">Partner With Us</Link>
              <Link to="/advisory" className="pill-btn pill-btn-outline">View Our Advisory Model →</Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 text-2xl"
            style={{ color: 'var(--accent)' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </div>
      </div>

      {/* MARQUEE */}
      <MarqueeStrip />

      {/* VALUE BAR */}
      <section className="section-padding" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--line)' }}>
          {[
            { icon: FlaskConical, label: 'Scientific Due Diligence', text: 'We evaluate technology for clinical utility, performance compatibility, and research relevance within the Indian laboratory infrastructure.' },
            { icon: Users, label: 'Strategic Matchmaking', text: 'Identifying technically-competent local distributors who possess the cold-chain integrity and biosafety standards your technology demands.' },
            { icon: Map, label: 'Market Intelligence', text: "Navigating the regulatory and infrastructure maze of India's $300B bio-economy with precision and local expertise." },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-8"
              style={{ background: 'var(--bg2)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <item.icon size={28} style={{ color: 'var(--accent)' }} className="mb-4" />
              <h3 className="font-heading text-lg font-light mb-2" style={{ color: '#fff' }}>{item.label}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-color)' }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <StickyFeatureSection
        visual={<MissionVisual />}
        title1="TRANSLATING GLOBAL INNOVATION"
        title2="FOR LOCAL IMPACT."
        eyebrow="Our Mission"
      >
        <p className="text-base leading-relaxed" style={{ color: 'var(--muted-color)' }}>
          We serve as a high-level Scientific Advisory Committee, acting as the technical intermediary between
          international biotechnology giants and the Indian research ecosystem. Our mission is to streamline
          the complexities of market entry, ensuring that life-saving diagnostics and cutting-edge instruments
          are deployed with credibility and precision.
        </p>
        <p className="text-base leading-relaxed" style={{ color: 'var(--muted-color)' }}>
          The Company is established to provide specialized Scientific Advisory and Strategic Consultancy
          services to international biotechnology and life science manufacturers. The primary business involves
          facilitating cross-border market entry by providing high-level technical due diligence, regulatory
          guidance, and strategic matchmaking between global technology providers and localized distribution
          networks within India.
        </p>
        <blockquote className="pl-4 py-2 italic font-heading text-lg" style={{ borderLeft: '2px solid var(--accent)', color: '#fff' }}>
          "We do not merely facilitate transactions; we provide the intellectual and technical framework
          necessary for sophisticated life science technologies to thrive in India's unique ecosystem."
        </blockquote>
        <p className="text-sm" style={{ color: 'var(--muted-color)' }}>— Cypin Scientific Advisory Committee</p>
      </StickyFeatureSection>

      {/* ADVISORY */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionEyebrow>The Advisory Advantage</SectionEyebrow>
          <KineticTitle line1="A SCIENTIFIC COMPASS" line2="FOR THE INDIAN MARKET." className="mb-6" />
          <p className="max-w-3xl text-base leading-relaxed mb-12" style={{ color: 'var(--muted-color)' }}>
            At the core of our organization is a high-level Scientific Advisory Committee composed of seasoned
            experts in biotechnology, clinical diagnostics, and translational research. We bridge the gap
            between global innovation and local implementation through a three-pillared scientific approach.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <motion.div
            className="mt-12 p-8 rounded-lg card-hover"
            style={{ background: 'var(--bg3)', borderLeft: '2px solid var(--accent)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted-color)' }}>
              The Indian biotech sector is sophisticated but fragmented. Success requires more than a distributor;
              it requires a partner who speaks the language of the scientist. Our committee acts as your
              "boots on the ground," providing the credibility and technical oversight needed to transform
              a product launch into a long-term market standard.
            </p>
          </motion.div>
          <div className="mt-8 text-center">
            <Link to="/advisory" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
              Explore Our Full Advisory Model →
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-7xl mx-auto">
          <SectionEyebrow>Our Services</SectionEyebrow>
          <KineticTitle line1="PRECISION-ENGINEERED" line2="MARKET ENTRY." className="mb-6" />
          <p className="max-w-3xl text-base leading-relaxed mb-12" style={{ color: 'var(--muted-color)' }}>
            We provide a comprehensive suite of advisory services designed to navigate the technical,
            regulatory, and commercial complexities of the Indian biotechnology sector.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard
              number="01" tag="Matchmaking" title="Strategic Distributor Matchmaking" delay={0}
              body="We don't just find agents; we identify technical partners. Our committee conducts a multi-tier vetting process to connect you with local distributors who possess the right capabilities."
              bullets={[
                'Proven technical infrastructure: verified cold-chain capabilities and ISO-certified storage',
                'Specialized sales networks with existing relationships in Tier-1 research hospitals and government institutions',
                'Demonstrated ability to provide after-sales calibration and engineering support for high-end instrumentation',
              ]}
            />
            <ServiceCard
              number="02" tag="Due Diligence" title="Technical & Clinical Due Diligence" delay={0.1} tagColor="var(--accent2)"
              body="Before a single unit is shipped, we evaluate the Product-Market Fit within the Indian scientific landscape."
              bullets={[
                'Utility assessment: analyzing how your kits or instruments solve specific challenges in Indian clinical or research sectors',
                'Protocol alignment: ensuring your technology meets local laboratory standards and SOPs',
                'Competitive analysis: a scientific breakdown of the existing landscape to optimize your value proposition',
              ]}
            />
            <ServiceCard
              number="03" tag="Regulatory" title="Regulatory & Compliance Advisory" delay={0.2}
              body="Navigating the Indian regulatory environment requires deep localized expertise. We provide high-level guidance across all compliance dimensions."
              bullets={[
                'CDSCO & DCGI pathways: advising on classification and registration requirements for diagnostic kits and medical devices',
                'Import documentation: assisting with technical documentation required for smooth customs clearance',
                'Quality standards: ensuring compliance with local biosafety and environmental regulations',
              ]}
            />
            <ServiceCard
              number="04" tag="KOL Engagement" title="Key Opinion Leader (KOL) Engagement" delay={0.3} tagColor="var(--gold)"
              body="Building scientific credibility is essential for high-end biotech adoption. Our committee facilitates direct access to India's leading scientific voices."
              bullets={[
                "Scientific roundtables introducing your technology to India's leading scientists and clinicians",
                'Validation studies: advising on pilot programs or multicenter evaluations within Indian institutions',
                'Technical workshops overseeing scientific training of local partners to maintain brand excellence',
              ]}
            />
          </div>
          <div className="mt-8 text-center">
            <Link to="/services" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>View All Services →</Link>
          </div>
        </div>
      </section>

      {/* MARKETS */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionEyebrow>The India Opportunity</SectionEyebrow>
          <KineticTitle line1="A GLOBAL BIOTECH" line2="FRONTIER." className="mb-6" />
          <p className="max-w-3xl text-base leading-relaxed mb-12" style={{ color: 'var(--muted-color)' }}>
            India's bio-economy is on a trajectory to reach $300 billion by 2030, fueled by a surge in precision
            medicine, biopharmaceutical manufacturing, and a national shift toward evidence-based clinical
            diagnostics. For global manufacturers, India is no longer an optional market — it is a strategic necessity.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <AnimatedStat end={300} prefix="$" suffix="B" label="India Bio-Economy by 2030" />
            <AnimatedStat end={12} suffix="%" label="Medical Device Market CAGR" decimals={0} />
            <AnimatedStat end={3} suffix="" label="High-Growth Verticals We Cover" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VerticalCard
              title="Clinical Diagnostics & IVD"
              body="With the Indian medical device market projected to grow at a 12.2% CAGR, there is urgent demand for advanced in-vitro diagnostics, molecular assays, and point-of-care testing kits for chronic and infectious diseases."
              delay={0}
            />
            <VerticalCard
              title="Life Science Research & Genomics"
              body="As India establishes itself as a global hub for genomic research and biosimilars, we facilitate the placement of next-generation sequencers (NGS), high-throughput screening tools, and sophisticated proteomics platforms."
              delay={0.1}
            />
            <VerticalCard
              title="Biopharmaceutical Manufacturing"
              body="We assist manufacturers of bioprocessing equipment and analytical instruments in connecting with India's leading vaccine and biologic producers."
              delay={0.2}
            />
          </div>
          <div className="mt-8 text-center">
            <Link to="/markets" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>Explore Market Intelligence →</Link>
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="section-padding" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-7xl mx-auto">
          <SectionEyebrow>Join Our Ecosystem</SectionEyebrow>
          <KineticTitle line1="COLLABORATE WITH INDIA'S" line2="PREMIER BIOTECH ADVISORY." className="mb-6" />
          <p className="max-w-3xl text-base leading-relaxed mb-12" style={{ color: 'var(--muted-color)' }}>
            Whether you are a global innovator seeking a presence in India or a local distributor with
            world-class technical capabilities, we invite you to join our strategic network.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="p-8 rounded-lg card-hover"
              style={{ background: 'var(--bg3)' }}
              whileHover={{ y: -4 }}
            >
              <h3 className="font-heading text-2xl font-light mb-4" style={{ color: '#fff' }}>For Global Manufacturers</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-color)' }}>
                Take the first step toward India. Submit your product specifications for a preliminary
                Market Fit Assessment and schedule a briefing with our committee to discuss regulatory
                pathways and distributor profiles.
              </p>
              <Link to="/join" className="pill-btn pill-btn-primary w-full text-center">Apply for Market Entry Advisory</Link>
            </motion.div>
            <motion.div
              className="p-8 rounded-lg card-hover"
              style={{ background: 'var(--bg3)' }}
              whileHover={{ y: -4 }}
            >
              <h3 className="font-heading text-2xl font-light mb-4" style={{ color: '#fff' }}>For Indian Distributors</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-color)' }}>
                If your organization prides itself on cold-chain integrity, specialized sales expertise,
                and high-end service support, our committee conducts rigorous technical audits to ensure
                partners meet global manufacturer standards.
              </p>
              <Link to="/join" className="pill-btn pill-btn-outline w-full text-center">Submit Technical Capability Profile</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="section-padding text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-light mb-4" style={{ color: '#fff' }}>
            Ready to Enter the Indian Market?
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted-color)' }}>
            Our Scientific Advisory Committee is available for initial consultations, product evaluations,
            and partnership discussions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:inquiry@cypinscientific.com" className="pill-btn pill-btn-outline inline-flex items-center gap-2">
              <Mail size={16} /> inquiry@cypinscientific.com
            </a>
            <a href="https://linkedin.com/company/cypinscientific" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-outline inline-flex items-center gap-2">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
