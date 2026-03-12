import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FlaskConical, Users, Map, Mail, Linkedin, ChevronDown } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import ParticleField from '@/components/motion/ParticleField';
import MarqueeStrip from '@/components/motion/MarqueeStrip';
import KineticTitle from '@/components/motion/KineticTitle';
import StickyFeatureSection from '@/components/motion/StickyFeatureSection';
import AnimatedStat from '@/components/motion/AnimatedStat';
import VerticalCard from '@/components/cards/VerticalCard';
import SectionEyebrow from '@/components/shared/SectionEyebrow';
import Testimonial from '@/components/shared/Testimonial';
import NewsroomTicker from '@/components/motion/NewsroomTicker';

const heroWords = ['The', 'Scientific', 'Bridge', 'to', 'the', 'Indian', 'Biotech', 'Market.'];

function MissionVisual() {
  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden">
      <img
        src="/images/mission-scientist.jpg"
        alt="Scientist analyzing samples in a biotech research laboratory"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,8,13,0.5) 0%, rgba(6,8,13,0.3) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)' }} />
    </div>
  );
}

export default function Home() {
  const prefersReduced = useReducedMotion();

  const scrollToContent = () => {
    const marquee = document.getElementById('marquee-section');
    marquee?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* HERO — 100vh, no parallax */}
      <div className="relative h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/images/hero-lab.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.3 }}
            loading="eager"
            fetchPriority="high"
          />
          <div className="hero-bg" style={{ opacity: 0.7 }} />
        </div>
        <div className="dot-grid absolute inset-0" />
        <ParticleField />

        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
          <SectionEyebrow>Scientific Advisory & Strategic Consultancy</SectionEyebrow>
          <h1 className="font-heading font-light mt-4 leading-[1.05] flex flex-wrap justify-center gap-x-[0.35em]"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)' }}
          >
            {heroWords.map((word, i) => (
              <motion.span
                key={i}
                className={['Scientific', 'Bridge'].includes(word) ? 'gradient-text' : ''}
                initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
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
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Expert-led market entry for global manufacturers of sophisticated instruments and diagnostic kits.
            We combine technical due diligence with strategic matchmaking to ensure your innovations reach
            India's leading laboratories.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Link to="/join" className="pill-btn pill-btn-primary w-full sm:w-auto">Partner With Us</Link>
            <Link to="/advisory" className="pill-btn pill-btn-outline w-full sm:w-auto">View Our Advisory Model →</Link>
          </motion.div>
        </div>

        <button
          onClick={scrollToContent}
          aria-label="Scroll to content"
          className="absolute bottom-8 p-2 rounded-full transition-colors hover:bg-white/5"
          style={{ color: 'var(--accent)' }}
        >
          <motion.div
            animate={prefersReduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </button>
      </div>

      {/* MARQUEE */}
      <div id="marquee-section">
        <MarqueeStrip />
      </div>

      {/* TRUST BAR removed — no actual institutional partnerships to display */}

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
              <item.icon size={32} style={{ color: 'var(--accent)' }} className="mb-4" />
              <h3 className="font-heading text-xl md:text-2xl font-normal mb-2" style={{ color: '#fff' }}>{item.label}</h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--muted-color)' }}>{item.text}</p>
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
          We act as the technical intermediary between international biotech manufacturers and India's research
          ecosystem — providing scientific due diligence, regulatory guidance, and strategic matchmaking to
          ensure your innovations reach the right laboratories with credibility and precision.
        </p>
        <blockquote className="pl-4 py-2 italic font-heading text-lg" style={{ borderLeft: '2px solid var(--accent)', color: '#fff' }}>
          "We do not merely facilitate transactions; we provide the intellectual and technical framework
          necessary for sophisticated life science technologies to thrive in India's unique ecosystem."
        </blockquote>
        <p className="text-sm" style={{ color: 'var(--muted-color)' }}>— Cypin Scientific Advisory Committee</p>
      </StickyFeatureSection>

      {/* DIVIDER */}
      <div className="flex justify-center py-4">
        <div className="h-px w-[60%]" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent)' }} />
      </div>

      {/* ADVISORY & SERVICES sections removed — content lives on dedicated /advisory and /services pages */}

      {/* MARKETS */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">
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

      {/* TESTIMONIAL */}
      <div style={{ background: 'var(--bg2)' }}>
        <Testimonial
          quote="Cypin's advisory committee provided the scientific credibility and regulatory insight we needed to confidently enter the Indian diagnostics market. Their technical vetting of distribution partners was unparalleled."
          attribution="Global Diagnostics Manufacturer"
          role="Market Entry Client"
        />
      </div>

      {/* NEWSROOM TICKER */}
      <NewsroomTicker />

      {/* JOIN CTA */}
      <section className="section-padding">
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
              <h3 className="font-heading text-2xl font-normal mb-4" style={{ color: '#fff' }}>For Global Manufacturers</h3>
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
              <h3 className="font-heading text-2xl font-normal mb-4" style={{ color: '#fff' }}>For Indian Distributors</h3>
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
      <section className="section-padding text-center" style={{ background: 'var(--bg2)' }}>
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
