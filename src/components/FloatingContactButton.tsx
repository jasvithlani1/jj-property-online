import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const PHONE_NUMBER = '+61400000000';
const WHATSAPP_NUMBER = '61400000000'; // no + for wa.me
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Alex, I found your website and I'd love to discuss a property acquisition. Can we connect?"
);

export default function FloatingContactButton() {
  return (
    <>
      {/* Call Button (Left Side) */}
      <motion.a
        href={`tel:${PHONE_NUMBER}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[5000] flex items-center gap-3 pl-3 pr-4 md:pl-4 md:pr-5 py-2 md:py-3 rounded-full shadow-2xl text-white font-bold text-xs md:text-sm uppercase tracking-widest bg-[#021f3a] hover:bg-[#033057] transition-colors group"
      >
        <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 shrink-0 group-hover:scale-110 transition-transform">
          <Phone className="w-4 h-4 md:w-5 md:h-5" />
        </span>
        <div className="flex flex-col leading-none">
          <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">Call Alex</span>
          <span className="text-[9px] md:text-[10px] font-normal opacity-70 normal-case tracking-normal mt-0.5 whitespace-nowrap">+61 400 000 000</span>
        </div>
      </motion.a>

      {/* WhatsApp Button (Right Side) */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[5000] flex items-center gap-3 pl-3 pr-4 md:pl-4 md:pr-5 py-2 md:py-3 rounded-full shadow-2xl text-white font-bold text-xs md:text-sm uppercase tracking-widest bg-[#25D366] hover:bg-[#1ebe5d] transition-colors group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-30 pointer-events-none" />
        <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 shrink-0 group-hover:scale-110 transition-transform">
          <FaWhatsapp className="w-4 h-4 md:w-5 md:h-5" />
        </span>
        <div className="flex flex-col leading-none relative">
          <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">WhatsApp</span>
          <span className="text-[9px] md:text-[10px] font-normal opacity-70 normal-case tracking-normal mt-0.5 whitespace-nowrap">Chat instantly</span>
        </div>
      </motion.a>
    </>
  );
}
