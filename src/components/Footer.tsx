import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-[#021f3a] text-white pt-20 mt-32 lg:mt-48">
      {/* Skyline SVG Top Border */}
      <div className="absolute top-0 inset-x-0 -translate-y-full w-full overflow-hidden leading-none">
        <svg viewBox="0 -40 1200 160" preserveAspectRatio="none" className="w-full h-24 lg:h-32 text-[#021f3a]" fill="currentColor">
          <path d="M0,120 L0,100 L20,100 L20,80 L30,80 L30,60 L45,60 L45,30 L60,30 L60,10 L70,10 L70,30 L90,30 L90,60 L110,60 L110,80 L140,80 L140,50 L160,50 L160,0 L180,0 L180,50 L200,50 L200,80 L230,80 L230,60 L245,60 L245,40 L260,40 L260,20 L270,20 L270,70 L290,70 L290,90 L320,90 L320,120 Z" />
          <path d="M300,120 L300,90 L320,90 L320,60 L330,60 L330,40 L345,40 L345,10 L360,10 L360,-10 L370,-10 L370,10 L390,10 L390,40 L410,40 L410,60 L440,60 L440,30 L460,30 L460,-20 L480,-20 L480,30 L500,30 L500,60 L530,60 L530,40 L545,40 L545,20 L560,20 L560,0 L570,0 L570,50 L590,50 L590,70 L620,70 L620,120 Z" transform="translate(280, 0)" />
          <path d="M600,120 L600,70 L620,70 L620,40 L630,40 L630,20 L645,20 L645,-10 L660,-10 L660,-30 L670,-30 L670,-10 L690,-10 L690,20 L710,20 L710,40 L740,40 L740,10 L760,10 L760,-40 L780,-40 L780,10 L800,10 L800,40 L830,40 L830,20 L845,20 L845,0 L860,0 L860,-20 L870,-20 L870,30 L890,30 L890,50 L920,50 L920,120 Z" transform="translate(580, 0)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10 pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Logo & Info Column */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="group flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-2 bg-white/5 rounded-3xl border border-white/10 group-hover:bg-white/10 transition-colors">
                <img src="/logo.png" alt="JJ Logo" className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <div className="font-sans font-black text-2xl sm:text-3xl tracking-widest text-white leading-tight uppercase">JJ PROPERTY <br className="hidden sm:block" /> PARTNER</div>
                <div className="font-sans font-bold text-[10px] sm:text-[11px] tracking-[0.25em] text-sky-400 leading-none uppercase mt-3">YOUR PROPERTY, OUR PRIORITY</div>
              </div>
            </Link>
            <p className="text-base text-sky-200/60 font-sans leading-relaxed max-w-sm mb-8 lg:mb-0">
              Australia's premier buyer's agency. We bring a data-driven approach and 20+ years of expertise to your property journey.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 mb-8 border-b border-sky-400/20 pb-2 inline-block">Navigation</h4>
            <ul className="space-y-4 font-sans text-sky-200/80 text-sm">
              <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:translate-x-1 transition-all inline-block">Home</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:translate-x-1 transition-all inline-block">About Us</Link></li>
              <li><Link to="/services" onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:translate-x-1 transition-all inline-block">Services</Link></li>
              <li><Link to="/case-studies" onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:translate-x-1 transition-all inline-block">Case Studies</Link></li>
              <li><Link to="/blog" onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:translate-x-1 transition-all inline-block">Insights & Blog</Link></li>
              <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 mb-8 border-b border-sky-400/20 pb-2 inline-block">Expertise</h4>
            <ul className="space-y-4 font-sans text-sky-200/80 text-sm">
              <li><Link to="/services/first-home-buyers" onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:translate-x-1 transition-all inline-block">First Home Buyers</Link></li>
              <li><Link to="/services/property-investors" onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:translate-x-1 transition-all inline-block">Property Investors</Link></li>
              <li><Link to="/services/smsf-property" onClick={() => window.scrollTo(0, 0)} className="hover:text-white hover:translate-x-1 transition-all inline-block">SMSF Investment</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 mb-8 border-b border-sky-400/20 pb-2 inline-block">Connect</h4>
            <ul className="space-y-6 font-sans text-sky-200/80">
              <li className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-3 text-white">
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400/60">Email</span>
                </div>
                <a href="mailto:jjpropertypartner@gmail.com" className="hover:text-white transition-colors text-sm break-all md:break-normal">jjpropertypartner@gmail.com</a>
              </li>
              <li className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-3 text-white">
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400/60">Call</span>
                </div>
                <a href="tel:+61481334458" className="text-sm hover:text-white transition-colors">+61 481 334 458</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Socials & Summary */}
        <div className="mt-20 border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-sky-400 mb-6">Follow Our Journey</p>
            <div className="flex items-center gap-4">
              {[
                { icon: <FaInstagram className="w-4 h-4" />, label: 'Instagram', href: 'https://www.instagram.com/jjpropertypartner/' },
                { icon: <FaFacebookF className="w-4 h-4" />, label: 'Facebook', href: '#' },
                { icon: <FaYoutube className="w-4 h-4" />, label: 'YouTube', href: '#' },
                { icon: <FaTwitter className="w-4 h-4" />, label: 'Twitter', href: 'https://x.com/jjproperty01' },
                { icon: <FaLinkedinIn className="w-4 h-4" />, label: 'LinkedIn', href: '#' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-sky-500 hover:border-sky-500 flex items-center justify-center transition-all hover:scale-110 group shadow-xl">
                  <span className="text-sky-400 group-hover:text-white transition-colors">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-sky-800/50 py-6 px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-sky-400 font-sans gap-4 text-center md:text-left">
          <p>© Copyright 2026 JJ Property Partner. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute right-8 -top-6 w-12 h-12 bg-sky-500 hover:bg-sky-400 rounded-full flex items-center justify-center text-white shadow-lg transition-colors border-4 border-[#021f3a]"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </footer>
  );
}
