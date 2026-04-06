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
            <a href="mailto:alex@jjproperty.com.au" className="flex items-center gap-2 hover:text-sky-300 transition-colors">
              <Mail className="w-3 md:w-3.5 h-3 md:h-3.5" />
              <span className="hidden sm:inline">alex@jjproperty.com.au</span>
            </a>
            <div className="h-3 w-px bg-white/10 hidden md:block" />
            <a href="tel:+61400000000" className="flex items-center gap-2 hover:text-sky-300 transition-colors">
              <Phone className="w-3 md:w-3.5 h-3 md:h-3.5" />
              <span className="hidden sm:inline">+61 400 000 000</span>
            </a>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <span className="hidden lg:inline text-sky-400/50 mr-2">Connect with us:</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-all transform hover:scale-110"><FaInstagram className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-white transition-all transform hover:scale-110"><FaFacebookF className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-white transition-all transform hover:scale-110"><FaYoutube className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-white transition-all transform hover:scale-110"><FaTwitter className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-white transition-all transform hover:scale-110"><FaLinkedinIn className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="w-full px-6 md:px-8 py-2 flex justify-between items-center bg-[#021f3a]/90 backdrop-blur-md shadow-xl border-b border-sky-500/20 transition-all duration-300">
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-4 md:gap-6 hover:opacity-90 transition-opacity">
            <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
              <motion.img
                src="/logo.png"
                alt="JJ Logo"
                className="absolute w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain cursor-pointer max-w-none"
                animate={{ rotate: 360 }}
                whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              />
            </div>
            <div className="flex flex-col">
              <div className="font-serif text-xl md:text-2xl lg:text-3xl tracking-tight text-white leading-none uppercase">
                JJ PROPERTY
              </div>
              <div className="font-serif text-xs md:text-sm lg:text-xl tracking-[0.2em] text-sky-300 leading-none uppercase -mt-0.5">
                PARTNER
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path, link.isHash)}
                className={`group relative text-sm font-medium transition-colors hover:text-white cursor-pointer ${isActive(link.path) ? 'text-white' : 'text-[#7dd3fc]'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-sky-400 transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={openCalendly}
            className="hidden lg:block rounded-full px-6 py-2.5 text-sm bg-sky-500 text-white hover:bg-sky-400 hover:scale-[1.03] transition-all duration-300 uppercase tracking-widest font-bold"
          >
            Book Session
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-sky-300 transition-colors z-[10001] relative"
          >
            {isMenuOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] bg-slate-950 flex flex-col justify-center items-center text-center p-10 lg:hidden"
          >
            <div className="flex flex-col gap-8 w-full max-w-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path, link.isHash)}
                  className="text-4xl font-serif text-white hover:text-sky-400 transition-colors py-3 font-bold block"
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openCalendly();
                }}
                className="mt-6 rounded-full w-full px-8 py-5 text-xl bg-sky-500 text-white font-black uppercase tracking-widest shadow-2xl hover:bg-sky-400 active:scale-95 transition-all"
              >
                Book Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
