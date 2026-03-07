const items = [
  'Scientific Due Diligence', 'Strategic Matchmaking', 'CDSCO Advisory',
  'KOL Engagement', 'Regulatory Pathways', 'Market Intelligence',
  'Technical Due Diligence', 'Distributor Vetting'
];

function MarqueeContent() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-6 whitespace-nowrap">
          <span>{item}</span>
          <span style={{ color: 'var(--accent)' }}>·</span>
        </span>
      ))}
    </>
  );
}

export default function MarqueeStrip() {
  return (
    <div
      className="overflow-hidden py-4"
      style={{
        background: '#0a0d14',
        borderTop: '1px solid rgba(62,232,160,0.15)',
        borderBottom: '1px solid rgba(62,232,160,0.15)',
      }}
    >
      <div className="marquee-track gap-6" style={{
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: 'var(--muted-color)',
      }}>
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}
