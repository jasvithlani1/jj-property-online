import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const PHONE_NUMBER = '+61481334458';
const WHATSAPP_NUMBER = '61481334458'; // no + for wa.me
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Alex, I found your website and I'd love to discuss a property acquisition. Can we connect?"
);

export default function FloatingContactButton() {
  return (
    <>
      {/* Call Button (Left Side) */}
      <motion.a
        href={`tel:${PHONE_NUMBER}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[5000] w-14 h-14 flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(14,165,233,0.3)] text-sky-400 bg-white/10 backdrop-blur-xl border border-sky-400/30 transition-all duration-300 group"
        aria-label="Call Alex"
      >
        <span className="absolute inset-0 rounded-full bg-sky-400/20 animate-ping opacity-20 pointer-events-none group-hover:block hidden" />
        <Phone className="w-6 h-6 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
      </motion.a>

      {/* WhatsApp Button (Right Side) */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(37, 211, 102, 0.2)' }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[5000] w-14 h-14 flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] text-[#25D366] bg-white/10 backdrop-blur-xl border border-[#25D366]/30 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-pulse opacity-30 pointer-events-none" />
        <FaWhatsapp className="w-7 h-7 drop-shadow-[0_0_8px_rgba(37,211,102,0.5)]" />
      </motion.a>
    </>
  );
}
