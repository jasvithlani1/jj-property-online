import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Home as HomeIcon, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { openCalendly } from '../utils/calendly';

const services = [
  {
    id: 'first-home-buyers',
    icon: <HomeIcon className="w-8 h-8" />,
    tag: 'Residential',
    title: 'First Home Buyers',
    subtitle: 'Navigate Sydney with a seasoned professional.',
    description: 'Purchasing your first home in Sydney is a major financial decision in a highly competitive market. As a trusted first home buyer agent Sydney, we provide structured, data-driven guidance to help you secure the right first home buyer property in Sydney CBD with confidence.',
    benefits: [
      'Access to exclusive off-market and pre-market opportunities',
      'Strategic advice based on data, not emotion',
      'Skilled negotiation for optimal price and terms',
      'Comprehensive due diligence including legal and strata review',
      'Complete end-to-end support from search to settlement'
    ],
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=900',
    accent: 'sky',
    accentClass: 'bg-sky-50 border-sky-100',
    iconClass: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'property-investors',
    icon: <TrendingUp className="w-8 h-8" />,
    tag: 'Investment',
    title: 'Property Investors',
    subtitle: 'Data-driven acquisition at scale.',
    description: 'Building a high-performance investment portfolio requires disciplined analysis, precise market timing, and early access to assets before public pricing. Our investor service is focused on maximizing your portfolio\’s net return.',
    benefits: [
      'Strategic suburb-level growth analysis and selection',
      'Identification of dual-income and value-add opportunities',
      'Exclusive off-market acquisitions to reduce competition',
      'Negotiation strategies aligned with vendor motivations',
      'Structured multi-asset portfolio planning over 12 \- 24 months',
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900',
    accent: 'indigo',
    accentClass: 'bg-indigo-50 border-indigo-100',
    iconClass: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'smsf-property',
    icon: <ShieldCheck className="w-8 h-8" />,
    tag: 'SMSF',
    title: 'SMSF Property',
    subtitle: 'Strategic superannuation growth through direct property investment.',
    description: 'SMSF property investment in Sydney requires precision, compliance, and strategic execution. As a trusted SMSF buyers agent in Parramatta NSW, we combine deep regulatory knowledge with high-level acquisition expertise to protect and grow your superannuation.',
    benefits: [
      'Full compliance with SMSF lending regulations and sole purpose test ',
      'Collaboration with your financial planner, accountant, and SMSF auditor ',
      'Targeting high-yield, low-maintenance assets suited for super funds ',
      'Access to off-market dual-occupancy and mixed-use opportunities',
      'Long-term capital growth aligned with your retirement objectives',
    ],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=900',
    accent: 'emerald',
    accentClass: 'bg-emerald-50 border-emerald-100',
    iconClass: 'bg-emerald-100 text-emerald-700',
  },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white selection:bg-black/10 pt-20">

      {/* Hero */}
      <section className="relative px-8 pt-20 pb-20 md:pt-32 md:pb-40 bg-[#021f3a] text-white overflow-hidden">
        {/* bg glow blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-600/20 blur-[160px] rounded-full -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-400/10 blur-[120px] rounded-full -z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300 mb-8">
              Our Services
            </div>
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.05] mb-8 max-w-4xl">
              Acquisition strategies built for{' '}
              <span className="italic text-sky-300">precision.</span>
            </h1>
            <p className="text-xl text-white/60 font-sans max-w-2xl leading-relaxed">
              Every client brief is distinct, and each acquisition is strategically structured to maximise returns. Discover the three core pillars that define the JJ Property Partner service model.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: '20+', label: 'Years of Experience' },
              { value: '$5M+', label: 'Portfolio Target' },
              { value: '97%', label: 'Client Satisfaction Rate' },
              { value: '100%', label: 'Buyers Representation' },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-3xl font-serif text-white mb-1">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-sky-300/80">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Sections */}
      <section className="py-20 md:py-40 px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-40">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
            >
              {/* Text Side */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl ${service.iconClass}`}>
                    {service.icon}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${service.accentClass} border`}>
                    {service.tag}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-serif text-black mb-4 leading-tight">
                  {service.title}
                </h2>
                <p className="text-lg text-muted font-sans italic mb-6 font-serif">{service.subtitle}</p>
                <p className="text-lg text-muted font-sans leading-relaxed mb-10">
                  {service.description}
                </p>

                <ul className="space-y-4 mb-10">
                  {service.benefits.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3 text-base font-sans text-muted"
                    >
                      <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                      {b}
                    </motion.li>
                  ))}
                </ul>

                <button
                  onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                  className="group flex items-center gap-2 rounded-full px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform duration-300"
                >
                  Discuss This Strategy
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Image Side */}
              <div className={`relative h-[480px] md:h-[560px] rounded-[3rem] overflow-hidden ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Bar */}
      <section className="py-20 md:py-40 px-8 bg-sky-50">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif text-black mb-8 leading-tight">
              Not sure which service fits? <br />
              <span className="italic text-muted">Let's find out together.</span>
            </h2>
            <p className="text-xl text-muted font-sans mb-12 max-w-2xl mx-auto">
              Book a free 30-minute call. No pressure, no pitch — just a frank conversation about your property targets.
            </p>
            <button
              onClick={openCalendly}
              className="group rounded-full px-14 py-5 bg-black text-white text-base font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform duration-300 shadow-2xl shadow-black/10 flex items-center gap-3 mx-auto"
            >
              Book 30m Strategy Session
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
