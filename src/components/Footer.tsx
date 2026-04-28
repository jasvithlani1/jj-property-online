import { ArrowUp, Mail, Phone, Award, Hash } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Link from './Link';

// Footer uses the global Link component which ensures every nav item opens
// in a new tab per the global navigation policy. mailto:/tel: and hash links are exempt.

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights & Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

const serviceLinks = [
  { label: 'First Home Buyers', href: '/services/first-home-buyers' },
  { label: 'Property Investors', href: '/services/property-investors' },
  { label: 'SMSF Investment', href: '/services/smsf-property' },
];

const socialLinks = [
  { icon: <FaInstagram className="w-4 h-4" />, label: 'Instagram', href: 'https://www.instagram.com/jjpropertypartner/' },
  { icon: <FaFacebookF className="w-4 h-4" />, label: 'Facebook', href: '#' },
  { icon: <FaYoutube className="w-4 h-4" />, label: 'YouTube', href: 'https://www.youtube.com/@JJPropertyPartnerBuyersAgent' },
  { icon: <FaTwitter className="w-4 h-4" />, label: 'Twitter', href: 'https://x.com/jjproperty01' },
  { icon: <FaLinkedinIn className="w-4 h-4" />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/alex-buyers-agent-930139403/' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#011122] text-white pt-8 mt-8 lg:mt-12">

      <div className="max-w-7xl mx-auto px-8 relative z-10 pt-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Logo & Info Column */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="/"
              aria-label="JJ Property Partner – Home"
              className="group flex flex-col md:flex-row items-center gap-6 mb-8"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-2 bg-white/5 rounded-3xl border border-white/10 group-hover:bg-white/10 transition-colors">
                <img src="/logo.png" alt="JJ Property Partner Logo" className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <div className="font-sans font-black text-2xl sm:text-3xl tracking-widest text-white leading-tight uppercase">JJ PROPERTY <br className="hidden sm:block" /> PARTNER</div>
                <div className="font-sans font-bold text-[10px] sm:text-[11px] tracking-[0.25em] text-gold leading-none uppercase mt-3">YOUR PROPERTY, OUR PRIORITY</div>
              </div>
            </Link>
            <p className="text-base text-white/70 font-sans leading-relaxed max-w-sm mb-8 lg:mb-0">
              Australia's premier buyer's agency. We bring a data-driven approach and 20+ years of expertise to your property journey.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-8 border-b border-gold/20 pb-2 inline-block font-sans">Navigation</h4>
            <ul className="space-y-4 font-sans text-white/60 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-label={link.label}
                    className="hover:text-gold hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-8 border-b border-gold/20 pb-2 inline-block font-sans">Services</h4>
            <ul className="space-y-4 font-sans text-white/60 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-label={link.label}
                    className="hover:text-gold hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-8 border-b border-gold/20 pb-2 inline-block font-sans">Connect</h4>
            <ul className="space-y-6 font-sans text-white/60">
              <li className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-3 text-white">
                  <Mail className="w-4 h-4 text-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Email</span>
                </div>
                <Link href="mailto:info@jjpropertypartner.com.au" className="hover:text-gold transition-colors text-sm break-all md:break-normal text-white/80">info@jjpropertypartner.com.au</Link>
              </li>
              <li className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-3 text-white">
                  <Phone className="w-4 h-4 text-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Call</span>
                </div>
                <Link href="tel:+61481334458" className="text-sm hover:text-gold transition-colors text-white/80">+61 481 334 458</Link>
              </li>
              <li className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-3 text-white">
                  <Hash className="w-4 h-4 text-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">ABN</span>
                </div>
                <span className="text-sm text-white/80">71 687 187 113</span>
              </li>
              <li className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-3 text-white">
                  <Award className="w-4 h-4 text-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">License</span>
                </div>
                <span className="text-sm text-white/80">No. 20543356</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Socials */}
        <div className="mt-8 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-gold mb-4">Follow Our Journey</p>
            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={`Follow us on ${s.label}`}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-gold hover:border-gold flex items-center justify-center transition-all hover:scale-110 group shadow-xl"
                >
                  <span className="text-gold group-hover:text-white transition-colors">{s.icon}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5 py-6 px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-white/40 font-sans gap-4 text-center md:text-left">
          <p>© Copyright 2026 JJ Property Partner. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <span className="opacity-30">|</span>
            <Link href="#" className="hover:text-gold transition-colors">Terms</Link>
          </div>
        </div>

        {/* Back to Top — functional trigger, stays in same tab */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-gold hover:bg-gold-hover rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 border-4 border-[#011122] group"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
