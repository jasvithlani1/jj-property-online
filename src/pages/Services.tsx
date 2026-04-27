import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, MessageSquare, Gavel, Map, Key, Building2, Landmark, Scales, TrendingUp } from 'lucide-react';
import { FaKey, FaBuilding, FaLandmark } from 'react-icons/fa';
import { openCalendly } from '../utils/calendly';
import { useState } from 'react';

const servicesFaqs = [
  {
    question: 'How can JJ Property Partner help as your first home buyer agent Sydney?',
    answer: 'As your first home buyer agent Sydney, JJ Property Partner guides you from finance planning and property search through to negotiation and settlement, while also helping you understand eligible grants, stamp duty concessions, and the smartest path into the market.'
  },
  {
    question: 'What should I consider before buying my first home in Australia?',
    answer: 'Before purchasing, consider your budget, deposit, borrowing capacity, preferred location, property type, and long-term plans. With first home buyer assistance Australia, JJ Property Partner helps you define a clear strategy so you can buy with more confidence and less stress.'
  },
  {
    question: 'How do you identify the right investment suburb?',
    answer: 'Our research framework analyses suburb growth potential using historical price data, rental yield trends, vacancy rates, infrastructure investment pipelines, population growth forecasts, employment hub proximity, and demographic shifts. We apply this analysis nationally to identify optimal acquisition targets aligned to your specific investment criteria.'
  },
  {
    question: 'How do you choose the right suburb for an investment property?',
    answer: 'We assess each suburb using price trends, rental demand, vacancy rates, planned infrastructure, population growth and access to major employment hubs. This helps us identify high-potential locations across Australia that align with your investment goals and long-term strategy.'
  },
  {
    question: 'What is SMSF property investment and how does it work?',
    answer: 'SMSF property investment involves purchasing real estate through your self-managed superannuation fund under a Limited Recourse Borrowing Arrangement. The property must meet the sole purpose test — meaning it must be held for retirement benefit purposes only. JJ Property Partner guides you through the entire process in coordination with your SMSF advisory team.'
  },
  {
    question: 'How does an SMSF property buyers agent Australia help with property investment?',
    answer: 'An SMSF property buyers agent Australia helps you purchase property through your self-managed super fund using the correct borrowing structure and compliance process. At JJ Property Partner, we work alongside your accountant, adviser, and solicitor to help keep the purchase strategic and compliant.'
  },
  {
    question: 'Is SMSF property investment right for me?',
    answer: 'SMSF property investment suits buyers with at least $160,000+ in super, solid borrowing capacity, and a long-term retirement strategy. It is not the right fit for everyone, which is why we assess your fund structure, goals, and risk position first.'
  },
  {
    question: 'What makes JJ Property Partner different from other buyers agents?',
    answer: 'JJ Property Partner stands apart through Alex’s hands-on approach, backed by 20+ years of IT experience and a personal $5M+ property portfolio across Australia. Clients work directly with Alex and benefit from data-led research, strategic insight, and genuine buyer-only representation.'
  }
];

const services = [
  {
    id: 'first-home-buyers',
    icon: <Key className="w-8 h-8" />,
    solidIcon: <FaKey className="w-8 h-8" />,
    tag: 'Residential',
    title: 'First Home Buyers',
    subtitle: 'Professional Guidance for One of Your Biggest Financial Commitments',
    description: 'Purchasing your first property is both a milestone and a major financial commitment. JJ Property Partner removes the complexity, confusion, and emotional pressure from the process — replacing it with a structured, research-backed approach that delivers the right property at the right price.',
    benefits: [
      'Comprehensive budget and borrowing capacity review in collaboration with your mortgage broker',
      'Personalised property strategy aligned to your goals — owner-occupier, investment, or both',
      'Suburb research evaluating growth potential, liveability, infrastructure, and future demand',
      'Access to off-market and pre-market properties not available to the general public',
      'Professional negotiation to secure the best price and contract terms',
      'First Home Owner Grant guidance and eligibility assessment',
      'Full coordination through due diligence, legal review, and settlement'
    ],
    image: 'https://images.unsplash.com/photo-1513584684374-8bdb7489feef?auto=format&fit=crop&q=80&w=1200',
    accent: 'gold',
    accentClass: 'bg-gold/5 border-gold/20',
    iconClass: 'bg-gold/10 text-gold',
  },
  {
    id: 'property-investors',
    icon: <Building2 className="w-8 h-8" />,
    solidIcon: <FaBuilding className="w-8 h-8" />,
    tag: 'Investment',
    title: 'Property Investors',
    subtitle: 'Data-Backed Property Portfolio Growth Across Australia',
    description: 'Building a profitable investment portfolio demands systematic research, strategic timing, and access to the right opportunities. JJ Property Partner uses advanced data modelling and national market intelligence to identify high-growth, cash-flow positive properties across Australia — prioritising performance metrics over geographical familiarity.',
    benefits: [
      'Suburb-level analysis of growth trends, rental demand, vacancy rates, and market cycles',
      'Identification of high-yield and dual-income property opportunities including granny flats',
      'Find value-add properties including renovation, rezoning, and emerging corridor potential',
      'Access to off-market and pre-market properties across Australia to reduce competition',
      'Negotiation strategies tailored to vendor motivation and market conditions',
      '5 to 10 year portfolio roadmap helping plan your next acquisition systematically',
      'Coordination with your financial adviser, mortgage broker, and accountant'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    accent: 'gold',
    accentClass: 'bg-gold/5 border-gold/20',
    iconClass: 'bg-gold/10 text-gold',
  },
  {
    id: 'smsf-property',
    icon: <Landmark className="w-8 h-8" />,
    solidIcon: <FaLandmark className="w-8 h-8" />,
    tag: 'SMSF',
    title: 'SMSF Property Investment',
    subtitle: 'Secure, Compliant Property Investment for Your Super Fund',
    description: 'Investing in property through a Self-Managed Super Fund is a powerful wealth-building tool, but it carries strict compliance requirements under the SIS Act. JJ Property Partner is one of the few agencies specialising specifically in SMSF acquisitions, working directly with your advisory team to ensure every step is compliant and strategic.',
    benefits: [
      'SMSF suitability assessment evaluating fund balance and borrowing capacity',
      'Sole purpose test compliance verification for every considered property',
      'Limited Recourse Borrowing Arrangement (LRBA) coordination with compliant lenders',
      'High-yield, low-maintenance property sourcing aligned to retirement income goals',
      'Dual occupancy and commercial property options where appropriate',
      'Full suburb and property due diligence meeting strict SMSF investment criteria',
      'End-to-end execution coordinated with your advisory team'
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    accent: 'gold',
    accentClass: 'bg-gold/5 border-gold/20',
    iconClass: 'bg-gold/10 text-gold',
  },
];

export default function Services() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>Property Buying Services Australia | JJ Property Partner</title>
        <meta name="description" content="JJ Property Partner offers expert buyer’s agent services across Australia for first home buyers, property investors, and SMSF property strategies with data-driven results." />
      </Helmet>

      <div className="w-full bg-white selection:bg-gold/20 pt-20">

      {/* Hero */}
      <section className="relative px-6 py-8 sm:px-8 sm:py-10 md:pt-16 md:pb-10 bg-[#011122] text-white overflow-hidden">
        {/* bg glow blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 blur-[160px] rounded-full -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full -z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-7 py-3 rounded-full border border-white/20 bg-white/10 text-sm font-bold uppercase tracking-[0.2em] text-white mb-8 shadow-sm scale-110 origin-center translate-y-[-4px]">
              Our Services
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] mb-8 max-w-4xl">
              Acquisition Strategies Designed for <br />
              <span className="text-gold">Precision and Long-Term Wealth.</span>
            </h1>
            <p className="text-xl text-white/60 font-sans max-w-2xl leading-relaxed">
              JJ Property Partner is an independent buyers agency that works solely for you, guiding you through every stage of the property journey across Australia. Built on independence, smart data-led advice, and personalised service, we give you the confidence to buy with clarity and purpose.
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
              <div key={stat.label} className="p-8 rounded-[2rem] bg-white text-black shadow-[0_0_50px_-12px_rgba(255,255,255,0.4)] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gold/5 pointer-events-none" />
                <p className="relative text-4xl md:text-5xl font-serif text-[#011122] mb-2 font-bold">{stat.value}</p>
                <p className="relative text-xs font-bold uppercase tracking-widest text-gold">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Sections */}
      <section className="py-8 md:py-10 px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                id={service.id}
                initial="initial"
                whileHover="hover"
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
              {/* Text Side */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-6 mb-6 relative">
                  <div className={`absolute -left-2 top-0 w-20 h-20 blur-2xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity ${service.accentClass.replace('bg-','bg-').replace('-50','-400')}`} />
                  <div className={`relative p-4 rounded-[1.25rem] bg-[#011122] border border-white/10 shadow-[0_0_25px_rgba(200,169,106,0.3)] drop-shadow-[0_0_12px_rgba(200,169,106,0.8)] group-hover:-translate-y-1 transition-all duration-500 z-10 text-gold`}>
                    <motion.div
                      variants={{
                        initial: { rotateY: 0 },
                        hover: { rotateY: 180 }
                      }}
                      transition={{ duration: 0.6 }}
                      className="relative w-8 h-8"
                    >
                      <motion.div
                        className="absolute inset-0 h-full w-full flex items-center justify-center"
                        variants={{
                          initial: { opacity: 1, visibility: 'visible' },
                          hover: { opacity: 0, visibility: 'hidden' }
                        }}
                      >
                        {service.icon}
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 h-full w-full flex items-center justify-center"
                        style={{ rotateY: 180 }}
                        variants={{
                          initial: { opacity: 0, visibility: 'hidden' },
                          hover: { opacity: 1, visibility: 'visible' }
                        }}
                      >
                        {service.solidIcon}
                      </motion.div>
                    </motion.div>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full ${service.accentClass} border shadow-sm`}>
                    {service.tag}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-serif text-[#011122] mb-4 leading-tight">
                  {service.title}
                </h2>
                <p className="text-lg text-muted font-serif mb-4">{service.subtitle}</p>
                <p className="text-lg text-muted font-sans leading-relaxed mb-8">
                  {service.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {service.benefits.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3 text-base font-sans text-muted"
                    >
                      <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2" />
                      {b}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => { navigate(`/services/${service.id}`); window.scrollTo(0, 0); }}
                    className="group flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-gold hover:bg-gold-hover text-white text-sm font-bold uppercase tracking-widest hover:scale-[1.03] transition-all duration-300 shadow-xl shadow-gold/20"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                    className="group flex items-center justify-center gap-2 rounded-full px-8 py-4 border border-[#011122]/10 bg-white text-[#011122] text-sm font-bold uppercase tracking-widest hover:bg-[#011122] hover:text-white transition-all duration-300"
                  >
                    Discuss Strategy
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className={`relative h-[320px] sm:h-[520px] md:h-[650px] lg:h-[750px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-8 md:py-10 px-8 bg-neutral-50 border-t border-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-[#011122] mb-6">Additional Services</h2>
            <div className="h-1 w-20 bg-gold mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'Negotiation Only',
                description: 'Already found the right property? Our Negotiation Only Service gives you expert buyer-side representation to help secure the best possible price and favourable contract terms. We use market insights, comparable sales data, and proven negotiation strategies to protect your interests every step of the way.',
                icon: <Scales className="w-7 h-7" />,
                isFeatured: true
              },
              {
                title: 'Auction Bidding',
                description: 'Property auctions can move quickly, and emotional bidding often leads to overpaying. JJ Property Partner provides calm, strategic auction representation with a clear bidding limit agreed in advance, backed by property appraisal, market research, and a disciplined approach designed to protect your interests.',
                icon: <Gavel className="w-7 h-7" />,
                isFeatured: false
              },
              {
                title: 'Portfolio Strategy',
                description: 'For investors planning their next purchase or refining their current approach, our portfolio strategy sessions provide clear, data-led guidance. We review your existing assets, assess future opportunities, and map out a practical strategy designed to support long-term wealth growth across Australia.',
                icon: <TrendingUp className="w-7 h-7" />,
                isFeatured: true
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                className={`group relative p-12 rounded-[3.5rem] border transition-all duration-700 cursor-pointer flex flex-col items-start ${service.isFeatured
                  ? 'bg-[#011122] border-white/10 shadow-2xl shadow-gold/20 md:z-20'
                  : 'bg-white border-gold/5 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10'
                  }`}
              >
                {/* Icon Box - Matching User Inspiration Image */}
                <div className="w-16 h-16 rounded-[1.25rem] bg-[#011122] border border-white/10 flex items-center justify-center text-gold mb-10 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {service.icon}
                </div>

                <h3 className={`text-3xl font-serif mb-6 leading-tight ${service.isFeatured ? 'text-white' : 'text-[#011122] font-semibold'}`}>
                  {service.title}
                </h3>
                <p className={`leading-relaxed font-sans text-lg mb-12 flex-1 ${service.isFeatured ? 'text-white/70' : 'text-muted'}`}>
                  {service.description}
                </p>

                <div className="mt-auto w-full flex items-center justify-between group/link">
                  <span className={`text-[11px] font-black uppercase tracking-[0.25em] transition-all ${service.isFeatured ? 'text-gold group-hover:text-white' : 'text-[#011122] opacity-40 group-hover:opacity-100'
                    }`}>
                    Learn More
                  </span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${service.isFeatured ? 'bg-white/10 group-hover:bg-gold' : 'bg-[#011122]/5 group-hover:bg-[#011122] group-hover:text-white'
                    }`}>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-[3.5rem] border-2 border-gold/0 group-hover:border-gold/20 transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-6 md:py-8 bg-gradient-to-b from-white to-gold/5 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-5xl md:text-6xl font-serif text-[#011122] leading-tight mb-6">
              Frequently <br />
              <span className="text-gold">asked questions.</span>
            </h2>
            <p className="text-muted text-lg font-sans">Everything you need to know about our specialized acquisition services.</p>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            {servicesFaqs.map((faq, index) => (
              <div key={index} className="border-b border-[#011122]/10 pb-2">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left hover:bg-gold/5 rounded-xl px-2 transition-colors group cursor-pointer"
                >
                  <span className={`text-xl sm:text-2xl font-sans font-semibold transition-colors duration-300 ${openFaq === index ? 'text-gold' : 'text-muted group-hover:text-gold'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 ${openFaq === index ? 'border-gold bg-gold text-white shadow-lg' : 'border-[#011122]/10 text-[#011122] group-hover:border-gold group-hover:text-gold'}`}
                  >
                    <Plus className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-lg text-muted font-sans leading-relaxed pb-8 pl-2 pr-12">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bar */}
      <section className="py-8 md:py-10 px-8 bg-gold/5">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-[#011122] mb-8 leading-tight">
              Not sure which service fits? <br />
              <span className="text-gold">Let's find out together.</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted font-sans mb-12 max-w-2xl mx-auto">
              Book a free 30-minute call. No pressure, no pitch — just a frank conversation about your property targets.
            </p>
            <button
              onClick={openCalendly}
              className="group rounded-full px-8 sm:px-14 py-4 sm:py-5 bg-[#011122] text-white text-sm sm:text-base font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform duration-300 shadow-2xl shadow-black/10 flex items-center gap-3 mx-auto"
            >
              Book 30m Strategy Session
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
