import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const PHONE_NUMBER = '+61400000000';
const WHATSAPP_NUMBER = '61400000000'; // no + for wa.me
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Alex, I found your website and I'd love to discuss a property acquisition. Can we connect?"
);

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      sublabel: 'Chat instantly',
      icon: <FaWhatsapp className="w-5 h-5" />,
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
      bgClass: 'bg-[#25D366] hover:bg-[#1ebe5d]',
      external: true,
    },
    {
      id: 'call',
      label: 'Call Alex',
      sublabel: '+61 400 000 000',
      icon: <Phone className="w-5 h-5" />,
      href: `tel:${PHONE_NUMBER}`,
      bgClass: 'bg-[#021f3a] hover:bg-[#033057]',
      external: false,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col items-end gap-3"
          >
            {actions.map((action, i) => (
              <motion.a
                key={action.id}
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.2, delay: i * 0.06 }}
                className={`flex items-center gap-3 pl-4 pr-5 py-3 rounded-full shadow-2xl text-white font-bold text-sm uppercase tracking-widest transition-all duration-300 group cursor-pointer ${action.bgClass}`}
              >
                {/* Icon */}
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 shrink-0 group-hover:scale-110 transition-transform">
                  {action.icon}
                </span>
                {/* Label */}
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-bold tracking-widest uppercase">{action.label}</span>
                  <span className="text-[10px] font-normal opacity-70 normal-case tracking-normal mt-0.5">{action.sublabel}</span>
                </div>
              </motion.a>
            ))}

            {/* Subtle backdrop to guide focus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 -z-10"
              onClick={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-500 ${
          isOpen
            ? 'bg-neutral-800 shadow-neutral-900/40'
            : 'bg-sky-500 shadow-sky-500/40'
        }`}
        aria-label="Contact options"
      >
        {/* Ping ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-30 pointer-events-none" />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
