import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="w-full bg-sky-50 selection:bg-black/10 pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative px-8 pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-black/5 bg-white text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-6 shadow-sm">
            Contact Us
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-black leading-tight mb-6">
            Direct access to Sydney's <br className="hidden md:block" />
            <span className="italic text-muted line-through decoration-1 decoration-sky-300">public</span> elite market.
          </h1>
          <p className="text-xl text-muted font-sans max-w-2xl mx-auto leading-relaxed">
            Reach out for a confidential strategy deep-dive. We strictly limit our active client roster to ensure uncompromised precision for every acquisition.
          </p>
        </motion.div>
      </section>

      {/* Main Content: Contact Cards & Form */}
      <section className="relative px-8 z-10">
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 lg:p-16 border border-black/5 overflow-hidden relative">
          {/* Subtle bg glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6FBFF] blur-[150px] rounded-full opacity-60 -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
            {/* Left Column: Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-4xl font-serif text-black leading-tight mb-10">
                Let's discuss your targets.
              </h2>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-5 group">
                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 group-hover:bg-black group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Direct Email</h4>
                    <a href="mailto:alex@jjproperty.com.au" className="text-xl font-serif text-black hover:text-sky-600 transition-colors">
                      alex@jjproperty.com.au
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5 group">
                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 group-hover:bg-black group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Executive Line</h4>
                    <a href="tel:+61400000000" className="text-xl font-serif text-black hover:text-sky-600 transition-colors">
                      +61 400 000 000
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-5 group">
                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300 shadow-sm">
                    <FaWhatsapp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted mb-1">WhatsApp</h4>
                    <a href="https://wa.me/61400000000" target="_blank" rel="noopener noreferrer" className="text-xl font-serif text-black hover:text-[#25D366] transition-colors">
                      Message us instantly
                    </a>
                  </div>
                </div>

                {/* Service Areas */}
                <div className="flex items-start gap-5 group pt-4">
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-black shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Service Territories</h4>
                    <p className="text-lg font-serif text-black leading-relaxed">
                      Sydney CBD, Parramatta, <br />Northern Beaches, Eastern Suburbs
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 p-8 md:p-10 rounded-[2.5rem] border border-black/5 shadow-xl shadow-sky-900/5 relative"
            >
              <h3 className="text-2xl font-serif text-black mb-8">Request a Call</h3>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="E.g. John Doe"
                    className="w-full px-5 py-4 rounded-2xl bg-neutral-50/50 border border-black/5 focus:bg-white focus:border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all outline-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-5 py-4 rounded-2xl bg-neutral-50/50 border border-black/5 focus:bg-white focus:border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all outline-none font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="0400 000 000"
                      className="w-full px-5 py-4 rounded-2xl bg-neutral-50/50 border border-black/5 focus:bg-white focus:border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all outline-none font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Purchasing Goal</label>
                  <select defaultValue="" className="w-full px-5 py-4 rounded-2xl bg-neutral-50/50 border border-black/5 focus:bg-white focus:border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all outline-none font-sans appearance-none cursor-pointer">
                    <option value="" disabled>Select an option...</option>
                    <option value="owner-occupier">Owner Occupier / First Home</option>
                    <option value="investment">Investment Property</option>
                    <option value="smsf">SMSF Acquisition</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Brief Overview (Optional)</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us a bit about what you are looking to achieve..."
                    className="w-full px-5 py-4 rounded-2xl bg-neutral-50/50 border border-black/5 focus:bg-white focus:border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all outline-none font-sans resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button type="button" className="w-full rounded-2xl px-6 py-5 text-sm bg-black text-white hover:scale-[1.02] transition-transform duration-300 uppercase tracking-widest font-bold shadow-xl shadow-black/10 flex items-center justify-center gap-2 group">
                    Submit Inquiry
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-[10px] text-muted uppercase tracking-widest mt-4">
                    Strictly confidential. No spam.
                  </p>
                </div>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
