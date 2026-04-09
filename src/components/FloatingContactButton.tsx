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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[5000] w-14 h-14 flex items-center justify-center rounded-full shadow-2xl text-white bg-[#021f3a] hover:bg-[#033057] transition-colors"
        aria-label="Call Alex"
      >
        <Phone className="w-6 h-6" />
      </motion.a>

      {/* WhatsApp Button (Right Side) */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[5000] w-14 h-14 flex items-center justify-center rounded-full shadow-2xl text-white bg-[#25D366] hover:bg-[#1ebe5d] transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-30 pointer-events-none" />
        <FaWhatsapp className="w-7 h-7" />
      </motion.a>
    </>
  );
}
