import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Menu, X } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { openCalendly } from '../utils/calendly';

const navLinks = [
  { name: 'Home', path: '/', isHash: false },
  { name: 'About us', path: '/about', isHash: false },
  { name: 'Services', path: '/services', isHash: false },
  { name: 'Case Studies', path: '/case-studies', isHash: false },
  { name: 'Reviews', path: '/#reviews', isHash: true },
  { name: 'Blog', path: '/blog', isHash: false },
  { name: 'Contact us', path: '/contact', isHash: false },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, isHash: boolean) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (isHash) {
      const hash = path.split('#')[1];
      if (location.pathname === '/') {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(path);
      }
    } else {
      if (path === '/') {
        if (location.pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[100] w-full">
        {/* Top Banner */}
        <div className="bg-[#011122] text-sky-200/80 py-2 px-6 md:px-8 flex justify-between items-center text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] border-b border-white/5">
          <div className="flex items-center gap-4 md:gap-8">
            <a href="mailto:info@jjpropertypartner.com.au" className="flex items-center gap-2 hover:text-sky-300 transition-colors">
              <Mail className="w-3 md:w-3.5 h-3 md:h-3.5" />
              <span className="hidden sm:inline">info@jjpropertypartner.com.au</span>
            </a>
            <div className="h-3 w-px bg-white/10 hidden md:block" />
            <a href="tel:+61481334458" className="flex items-center gap-2 hover:text-sky-300 transition-colors">
              <Phone className="w-3 md:w-3.5 h-3 md:h-3.5" />
              <span className="hidden sm:inline">+61 481 334 458</span>
            </a>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <span className="hidden xl:inline text-sky-400/50 mr-2">Connect with us:</span>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/jjpropertypartner/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:scale-110"><FaInstagram className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-white transition-all transform hover:scale-110"><FaFacebookF className="w-3.5 h-3.5" /></a>
              <a href="https://www.youtube.com/@JJPropertyPartnerBuyersAgent" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:scale-110"><FaYoutube className="w-3.5 h-3.5" /></a>
              <a href="https://x.com/jjproperty01" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:scale-110"><FaTwitter className="w-3.5 h-3.5" /></a>
              <a href="https://www.linkedin.com/in/alex-buyers-agent-930139403/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:scale-110"><FaLinkedinIn className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="w-full px-6 md:px-8 py-2 flex justify-between items-center bg-[#021f3a]/90 backdrop-blur-md shadow-xl border-b border-sky-500/20 transition-all duration-300">
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center">
              <motion.img
                src="/logo.png"
                alt="JJ Logo"
                className="absolute w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain cursor-pointer max-w-none"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                fetchPriority="high"
                loading="eager"
                width={128}
                height={128}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="font-sans font-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl tracking-widest text-white leading-none uppercase truncate">
                JJ PROPERTY PARTNER
              </div>
              <div className="font-sans font-bold text-[6px] sm:text-[8px] md:text-[9px] lg:text-xs tracking-[0.2em] text-sky-300 leading-none uppercase mt-1.5 truncate">
                YOUR PROPERTY, OUR PRIORITY
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-6 2xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path, link.isHash)}
                className={`group relative text-[13px] 2xl:text-sm font-medium transition-colors hover:text-white cursor-pointer whitespace-nowrap ${isActive(link.path) ? 'text-white' : 'text-[#7dd3fc]'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={openCalendly}
            className="hidden xl:block rounded-full px-6 py-2.5 text-sm bg-gold text-white hover:bg-gold-hover hover:scale-[1.03] transition-all duration-300 uppercase tracking-widest font-bold whitespace-nowrap"
          >
            Book Session
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="xl:hidden p-2 text-white hover:text-sky-300 transition-colors z-[100] relative"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-8 h-8 md:w-10 md:h-10" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm xl:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 z-[9999] w-[80%] max-w-sm bg-[#011122] shadow-2xl flex flex-col p-8 xl:hidden border-l border-sky-900/50"
              >
              {/* Drawer Header */}
              <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col">
                  <div className="font-sans font-black text-sm sm:text-base md:text-lg tracking-widest text-white leading-none uppercase">
                    JJ PROPERTY PARTNER
                  </div>
                  <div className="font-sans font-bold text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] text-gold leading-none uppercase mt-1.5">
                    YOUR PROPERTY, OUR PRIORITY
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded-full"
                  aria-label="Close Mobile Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col gap-6 flex-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path, link.isHash)}
                    className={`text-base uppercase tracking-widest font-bold transition-colors ${isActive(link.path) ? 'text-white pl-2 border-l-2 border-gold' : 'text-[#7dd3fc] hover:text-white'}`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Drawer Footer CTA */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openCalendly();
                }}
                className="mt-6 rounded-full w-full px-6 py-4 text-sm bg-gold text-white font-bold uppercase tracking-widest shadow-2xl hover:bg-gold-hover active:scale-95 transition-all"
              >
                Book Session
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
