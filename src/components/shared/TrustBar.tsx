const partners = [
  'AIIMS Network',
  'ICMR Affiliated',
  'CDSCO Registered',
  'ISO 13485 Partners',
  'Tier-1 Research Hospitals',
  'DBT Certified Labs',
];

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-color)', opacity: 0.6 }}>
        Trusted by teams at
      </span>
      {partners.map((name) => (
        <span key={name}>{name}</span>
      ))}
    </div>
  );
}
