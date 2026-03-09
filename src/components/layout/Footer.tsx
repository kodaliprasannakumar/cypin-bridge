import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin } from 'lucide-react';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Advisory', to: '/advisory' },
  { label: 'Services', to: '/services' },
  { label: 'Markets', to: '/markets' },
  { label: 'Careers', to: '/careers' },
  { label: 'Join Us', to: '/join' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)' }}>
      <div className="max-w-7xl mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="font-heading text-xl font-normal mb-3" style={{ color: '#fff' }}>
            Cypin<span style={{ color: 'var(--accent)' }}>.</span>Scientific
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-color)' }}>
            Scientific Advisory & Strategic Consultancy for international biotechnology manufacturers entering the Indian market.
          </p>
        </div>
        {/* Nav */}
        <div>
          <h4 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: 'var(--accent2)' }}>Navigation</h4>
          <div className="flex flex-col gap-2">
            {footerLinks.map(l => (
              <Link key={l.to} to={l.to} className="text-sm hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--muted-color)' }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: 'var(--accent2)' }}>Contact</h4>
          <div className="flex flex-col gap-3 text-sm" style={{ color: 'var(--muted-color)' }}>
            <div className="flex items-center gap-2"><MapPin size={14} /> Hyderabad, India · Serving Global Clients</div>
            <a href="mailto:inquiry@cypinscientific.com" className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
              <Mail size={14} /> inquiry@cypinscientific.com
            </a>
            <a href="https://linkedin.com/company/cypinscientific" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
      {/* Trust strip */}
      <div className="border-t border-[var(--line)] px-5 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs uppercase tracking-widest" style={{ color: 'var(--muted-color)', opacity: 0.6 }}>
          <span>ISO Compliant Partners</span>
          <span>·</span>
          <span>CDSCO Advisory Experts</span>
          <span>·</span>
          <span>Confidential Process</span>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-[var(--line)] px-5 py-5 text-center text-xs" style={{ color: 'var(--muted-color)' }}>
        &copy; {new Date().getFullYear()} Cypin Scientific Advisory. All rights reserved. · Hyderabad, India · Global
      </div>
    </footer>
  );
}
