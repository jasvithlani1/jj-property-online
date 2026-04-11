import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp, Mail, Phone } from 'lucide-react';
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

          {/* Logo Column */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="JJ Logo" className="w-12 h-12 object-contain" />
              <div className="flex flex-col">
                <div className="font-sans font-black text-lg tracking-widest text-white leading-none uppercase pr-4">JJ PROPERTY PARTNER</div>
                <div className="font-sans font-bold text-[8px] md:text-[9px] tracking-[0.2em] text-sky-300 leading-none uppercase mt-1.5">YOUR PROPERTY, OUR PRIORITY</div>
              </div>
            </div>
            <p className="text-sm text-sky-200/60 font-sans leading-relaxed">
              Sydney's premier buyer's agency. Precision. Discretion. Results.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 font-serif tracking-wide">Quick Links</h4>
            <ul className="space-y-3 font-sans text-sky-200">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About us</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 font-serif tracking-wide">Services</h4>
            <ul className="space-y-3 font-sans text-sky-200">
              <li><Link to="/services/first-home-buyers" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">First Home Buyers</Link></li>
              <li><Link to="/services/property-investors" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">Property Investors</Link></li>
              <li><Link to="/services/smsf-property" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">SMSF Property</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 font-serif tracking-wide">Contact Us</h4>
            <ul className="space-y-4 font-sans text-sky-200">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                <a href="mailto:jjpropertypartner@gmail.com" className="hover:text-white transition-colors text-sm whitespace-nowrap">jjpropertypartner@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-400 shrink-0" />
                <a href="tel:+61481334458" className="text-sm hover:text-white transition-colors">+61 481 334 458 (Alex)</a>
              </li>
            </ul>
          </div>

          {/* Subscribe + Socials */}
          <div className="lg:col-span-1 flex flex-col">
            <h4 className="text-lg font-bold mb-6 font-serif tracking-wide">Subscribe</h4>
            <div className="relative mb-8">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent border-b border-sky-700 pb-2 text-white placeholder:text-sky-400 focus:outline-none focus:border-white transition-colors text-sm font-sans"
              />
              <button className="absolute right-0 top-0 text-white hover:text-sky-300 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2.5 mt-auto">
              {[
                { icon: <FaInstagram className="w-3.5 h-3.5 text-white" />, label: 'Instagram', href: 'https://www.instagram.com/jjpropertypartner/' },
                { icon: <FaFacebookF className="w-3.5 h-3.5 text-white" />, label: 'Facebook', href: '#' },
                { icon: <FaYoutube className="w-3.5 h-3.5 text-white" />, label: 'YouTube', href: '#' },
                { icon: <FaTwitter className="w-3.5 h-3.5 text-white" />, label: 'Twitter', href: 'https://x.com/jjproperty01' },
                { icon: <FaLinkedinIn className="w-3.5 h-3.5 text-white" />, label: 'LinkedIn', href: '#' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-8 h-8 rounded-full bg-sky-600 hover:bg-sky-500 flex items-center justify-center transition-all hover:scale-110">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-sky-800/50 py-6 px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-sky-400 font-sans gap-4">
          <p>© Copyright 2026 JJ Property Partner. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
          <p className="md:text-right">
            Designed & Developed by <span className="text-white font-bold ml-1 tracking-wider">AETHERA</span>
          </p>
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
