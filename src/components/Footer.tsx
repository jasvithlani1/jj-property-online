import { useState, useEffect } from 'react';
import { ArrowUp, Mail, Phone, Award, Hash, MapPin } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter, FaLinkedinIn, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import Link from './Link';
import { client } from '../lib/sanity';

const ICON_MAP: Record<string, JSX.Element> = {
  instagram: <FaInstagram className="w-4 h-4" />,
  facebook:  <FaFacebookF  className="w-4 h-4" />,
  youtube:   <FaYoutube    className="w-4 h-4" />,
  twitter:   <FaTwitter    className="w-4 h-4" />,
  linkedin:  <FaLinkedinIn className="w-4 h-4" />,
  tiktok:    <FaTiktok     className="w-4 h-4" />,
  whatsapp:  <FaWhatsapp   className="w-4 h-4" />,
};

interface SocialLink { _key: string; platform: string; icon: string; url: string; }
interface FooterData {
  address?: string;
  email?: string;
  phone?: string;
  abn?: string;
  reaLicence?: string;
  socialLinks?: SocialLink[];
}

const fallbackFooterData: FooterData = {
  address: '6-10 Charles Street, Parramatta, NSW 2150',
  email: 'info@jjpropertypartner.com.au',
  phone: '+61 481 334 458',
  abn: '71 687 187 113',
  reaLicence: 'No. 20543356',
  socialLinks: [
    { _key: 'instagram', platform: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/jjpropertypartnerbuyersagent/' },
    { _key: 'facebook',  platform: 'Facebook',  icon: 'facebook',  url: 'https://www.facebook.com/jjpropertypartnerbuyersagent/' },
    { _key: 'youtube',   platform: 'YouTube',   icon: 'youtube',   url: 'https://www.youtube.com/@JJPropertyPartnerBuyersAgent' },
    { _key: 'twitter',   platform: 'X / Twitter', icon: 'twitter', url: 'https://x.com/jjbuyersagent' },
    { _key: 'linkedin',  platform: 'LinkedIn',  icon: 'linkedin',  url: 'https://www.linkedin.com/in/jj-property-partner-buyers-agent-930139403/' },
  ],
};

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

const serviceLinks = [
  { label: 'First Home Buyers', href: '/services/first-home-buyers' },
  { label: 'Property Investors', href: '/services/property-investors' },
  { label: 'SMSF Investment', href: '/services/smsf-property' },
  { label: 'Commercial Property', href: '/services/commercial-property' },
];

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData>(fallbackFooterData);

  useEffect(() => {
    client
      .fetch<FooterData>(
        `*[_type == "siteFooter" && _id == "siteFooter"][0]{ address, email, phone, abn, reaLicence, socialLinks }`
      )
      .then((data) => {
        if (data) setFooterData({ ...fallbackFooterData, ...data });
      })
      .catch(() => {});
  }, []);

  const { address, email, phone, abn, reaLicence, socialLinks } = footerData;

  return (
    <footer className="relative bg-[#011122] text-white pt-6 md:pt-8">

      <div className="max-w-7xl mx-auto px-8 relative z-10 pt-4 pb-4 md:pt-6 md:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-8">

          {/* Logo & Info Column */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link
              href="/"
              aria-label="JJ Property Partner – Home"
              className="group flex flex-row items-center text-left gap-4 mb-6 md:mb-8"
            >
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center p-2 bg-white/5 rounded-3xl border border-white/10 group-hover:bg-white/10 transition-colors">
                <img src="/logo.png?v=7" alt="JJ Property Partner Logo" className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <div className="font-sans font-black text-base sm:text-4xl tracking-widest text-white leading-tight uppercase">JJ PROPERTY <br className="hidden sm:block" /> PARTNER</div>
                <div className="font-sans font-bold text-[9px] sm:text-sm tracking-[0.25em] text-gold leading-none uppercase mt-1.5">YOUR PROPERTY, OUR PRIORITY</div>
              </div>
            </Link>
            <p className="text-base text-white/70 font-sans leading-relaxed max-w-sm mx-auto lg:mx-0">
              Australia's premier buyer's agency. We bring a data-driven approach and 20+ years of expertise to your property journey.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-gold mb-4 md:mb-8 border-b border-gold/20 pb-2 inline-block font-sans">Navigation</h4>
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
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-gold mb-4 md:mb-8 border-b border-gold/20 pb-2 inline-block font-sans">Services</h4>
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
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-gold mb-4 md:mb-8 border-b border-gold/20 pb-2 inline-block font-sans">Connect</h4>
            <ul className="space-y-6 font-sans text-white/60">
              {address && (
                <li className="flex flex-col items-center lg:items-start gap-2">
                  <div className="flex items-center gap-3 text-white">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gold">Address</span>
                  </div>
                  <span className="text-sm text-white/80">{address}</span>
                </li>
              )}
              {email && (
                <li className="flex flex-col items-center lg:items-start gap-2">
                  <div className="flex items-center gap-3 text-white">
                    <Mail className="w-4 h-4 text-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gold">Email</span>
                  </div>
                  <Link href={`mailto:${email}`} className="hover:text-gold transition-colors text-sm break-all md:break-normal text-white/80">{email}</Link>
                </li>
              )}
              {phone && (
                <li className="flex flex-col items-center lg:items-start gap-2">
                  <div className="flex items-center gap-3 text-white">
                    <Phone className="w-4 h-4 text-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gold">Call</span>
                  </div>
                  <Link href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm hover:text-gold transition-colors text-white/80">{phone}</Link>
                </li>
              )}
              {abn && (
                <li className="flex flex-col items-center lg:items-start gap-2">
                  <div className="flex items-center gap-3 text-white">
                    <Hash className="w-4 h-4 text-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gold">ABN</span>
                  </div>
                  <span className="text-sm text-white/80">{abn}</span>
                </li>
              )}
              {reaLicence && (
                <li className="flex flex-col items-center lg:items-start gap-2">
                  <div className="flex items-center gap-3 text-white">
                    <Award className="w-4 h-4 text-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gold">REA Licence</span>
                  </div>
                  <span className="text-sm text-white/80">{reaLicence}</span>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Socials */}
        <div className="mt-4 border-t border-white/5 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="text-[13px] font-bold uppercase tracking-[0.4em] text-gold mb-4">Follow Our Journey</p>
            <div className="flex items-center gap-4">
              {(socialLinks ?? []).map((s) => (
                <Link
                  key={s._key}
                  href={s.url}
                  aria-label={`Follow us on ${s.platform}`}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-gold hover:border-gold flex items-center justify-center transition-all hover:scale-110 group shadow-xl"
                >
                  <span className="text-gold group-hover:text-white transition-colors">{ICON_MAP[s.icon] ?? null}</span>
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
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <span className="opacity-30">|</span>
            <Link href="/terms-and-conditions" className="hover:text-gold transition-colors">Terms</Link>
          </div>
        </div>

        {/* Back to Top — functional trigger, stays in same tab */}
        <button
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); if (window.scrollY === 0) window.scrollTo(0,0); }}
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-gold hover:bg-gold-hover rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 border-4 border-[#011122] group"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
