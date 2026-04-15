import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Home as HomeIcon, TrendingUp, CheckCircle2, Plus, MessageSquare, Gavel, Map } from 'lucide-react';
import { FaHome, FaChartLine } from 'react-icons/fa';
import { TbHomeShield } from 'react-icons/tb';
import { openCalendly } from '../utils/calendly';
import { useState } from 'react';

const servicesFaqs = [
  {
    question: '1. How can JJ Property Partner assist first home buyers in Australia?',
    answer: 'As a trusted buyers agent for first home buyers in Australia, JJ Property Partner provides end-to-end support — from borrowing capacity and strategy to property search, negotiation, and settlement, plus guidance on grants and stamp duty concessions.'
  },
  {
    question: '2. Do I need a buyers agent as a first home buyer?',
    answer: 'Working with a buyers agent first home buyer Australia specialist ensures you avoid costly mistakes, access better opportunities, and receive expert negotiation support while navigating a complex property market.'
  },
  {
    question: '3. What should I consider before purchasing my first home in Sydney?',
    answer: 'When seeking first home buyer property advice Sydney, consider borrowing capacity, deposit, suburb selection, lifestyle needs, and long-term goals. We help you define a clear strategy before starting your search.'
  },
  {
    question: '4. How do you find off-market properties in Australia?',
    answer: 'As an off market property buyers agent Australia, we leverage strong agent relationships, industry networks, and direct channels to access pre-market and off-market opportunities not available to the public.'
  },
  {
    question: '5. How do you identify the right suburb for investment?',
    answer: 'If you’re planning to buy investment property in Australia with a buyers agent, we analyse growth trends, rental yields, infrastructure, and demographics to identify high-performing suburbs aligned with your goals.'
  },
  {
    question: '6. What is SMSF property investment in Australia?',
    answer: 'An SMSF buyers advocate Australia helps you purchase property through your super fund using compliant structures like LRBA, ensuring the investment meets strict regulatory requirements and retirement objectives.'
  },
  {
    question: '7. Is SMSF property investment right for me?',
    answer: 'SMSF property investment isn’t suitable for everyone. It generally requires a minimum fund balance of around $160,000, strong borrowing capacity within the fund, and a long-term strategy aligned with retirement goals. At JJ Property Partner, we carry out a detailed suitability assessment to ensure this approach aligns with your financial position, risk profile, and long-term objectives before making any recommendation.'
  },
  {
    question: '8. What are buyers agent fees in Australia?',
    answer: 'Buyers agent fees in Australia vary depending on the service scope, typically structured as a fixed fee or percentage. We provide transparent pricing with no hidden costs, aligned to the value delivered.'
  },
  {
    question: '9. What makes JJ Property Partner different from other buyers agents?',
    answer: 'JJ Property Partner stands apart through genuine experience, advanced data insights, and personalised service. Alex has built a $5M+ property portfolio using the same strategies he recommends to clients. His 20+ years in IT enables more sophisticated, data-driven decision-making. Most importantly, every client works directly with Alex - ensuring consistent guidance, accountability, and a high level of expertise throughout the entire buying process.'
  }
];

const services = [
  {
    id: 'first-home-buyers',
    icon: <HomeIcon className="w-8 h-8" />,
    solidIcon: <FaHome className="w-8 h-8" />,
    tag: 'Residential',
    title: 'First Home Buyers',
    subtitle: 'Expert Guidance for Your Most Important Financial Decision',
    description: 'Buying your first property in Australia is a major milestone. JJ Property Partner simplifies the journey with structured, research-driven guidance. Our first home buyer assistance Australia service helps you secure the right property at the right price, based on your budget, lifestyle, borrowing capacity, and long-term goals—without location limitations. What we deliver for first home buyers:',
    benefits: [
      'Comprehensive budget and borrowing capacity review with mortgage broker',
      'Personalised property strategy aligned to your goals and needs',
      'Suburb research assessing growth potential, liveability, infrastructure, and demand',
      'Access to exclusive off-market and pre-market properties across Australia-wide',
      'Professional negotiation securing best price and favourable contract terms',
      'First Home Owner Grant guidance and eligibility assessment support',
      'Full coordination due diligence, legal review, and settlement process'
    ],
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=900',
    accent: 'sky',
    accentClass: 'bg-sky-50 border-sky-100',
    iconClass: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'property-investors',
    icon: <TrendingUp className="w-8 h-8" />,
    solidIcon: <FaChartLine className="w-8 h-8" />,
    tag: 'Investment',
    title: 'Property Investors',
    subtitle: 'Data-Driven Portfolio Growth Across Australia',
    description: 'Building a profitable portfolio requires strategy, timing, and expert insight. As your investment property buyers agent Australia, JJ Property Partner uses advanced data modelling and national market intelligence to identify high-growth, cash-flow positive opportunities, focusing on performance-driven assets rather than location familiarity for smarter, scalable investment decisions. Our investment acquisition approach covers:',
    benefits: [
      'Suburb growth analysis covering cycles, vacancies, rental demand Australia',
      'Identify high-yield dual-income properties including granny flat opportunities Australia',
      'Find value-add properties with renovation, rezoning, emerging corridor potential',
      'Access off-market properties reducing competition and improving purchase pricing',
      'Negotiation strategies tailored to vendor motivation and market conditions',
      'Five to ten year portfolio roadmap guiding future acquisitions',
      'Coordinate closely with your financial adviser, broker, and accountant'
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900',
    accent: 'indigo',
    accentClass: 'bg-indigo-50 border-indigo-100',
    iconClass: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'smsf-property',
    icon: <TbHomeShield className="w-8 h-8" />,
    solidIcon: <TbHomeShield className="w-8 h-8" />,
    tag: 'SMSF',
    title: 'SMSF Property Investment',
    subtitle: 'Compliant, Strategic Property Acquisitions for Your Superannuation Fund',
    description: 'SMSF property investment Australia offers powerful wealth-building opportunities, but strict Act 1993 (SIS Act) compliance is essential to avoid penalties. JJ Property Partner specialises in SMSF property acquisitions, guiding Australian investors through every step while collaborating closely with your accountant, financial adviser, and auditor to ensure a compliant, strategic purchase. Our SMSF service includes:',
    benefits: [
      'SMSF suitability assessment evaluating balance borrowing capacity risk profile',
      'Sole purpose test compliance verified for every property considered',
      'LRBA coordination with compliant lenders for SMSF property finance',
      'High yield low maintenance properties aligned to income goals',
      'Dual occupancy and commercial property options where appropriate considered',
      'Full suburb and due diligence meeting SMSF investment criteria',
      'End to end execution strategy through settlement with advisors'
    ],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=900',
    accent: 'emerald',
    accentClass: 'bg-emerald-50 border-emerald-100',
    iconClass: 'bg-emerald-100 text-emerald-700',
  },
];

export default function Services() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>Property Buying Services Australia | JJ Property Partner</title>
        <meta name="description" content="JJ Property Partner offers expert buyer’s agent services across Australia for first home buyers, property investors, and SMSF property strategies with data-driven results." />
      </Helmet>

      <div className="w-full bg-white selection:bg-black/10 pt-20">

      {/* Hero */}
      <section className="relative px-6 py-16 sm:px-8 sm:py-24 md:pt-32 md:pb-40 bg-[#021f3a] text-white overflow-hidden">
        {/* bg glow blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-600/20 blur-[160px] rounded-full -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-400/10 blur-[120px] rounded-full -z-0 pointer-events-none" />

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
              Acquisition Strategies Built for <br />
              <span className="italic text-sky-300">Precision and Long-Term Wealth.</span>
            </h1>
            <p className="text-xl text-white/60 font-sans max-w-2xl leading-relaxed">
              We provide strategic, confidential negotiation as your dedicated buyers agent, representing only you. Using proven, data-driven techniques, we protect your identity and secure the best possible property price and terms.
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
              initial="initial"
              whileHover="hover"
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
            >
              {/* Text Side */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl ${service.iconClass} group-hover:bg-black group-hover:text-white transition-colors duration-500`}>
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

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => { navigate(`/services/${service.id}`); window.scrollTo(0, 0); }}
                    className="group flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white text-sm font-bold uppercase tracking-widest hover:scale-[1.03] transition-all duration-300 shadow-xl shadow-sky-500/20"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                    className="group flex items-center justify-center gap-2 rounded-full px-8 py-4 border border-black/10 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
                  >
                    Discuss Strategy
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className={`relative h-[320px] sm:h-[480px] md:h-[560px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 md:py-32 px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">Additional Services</h2>
            <div className="h-1 w-20 bg-sky-400 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-left">
            <motion.div initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="bg-white p-10 rounded-3xl border border-black/5 hover:shadow-xl transition-shadow flex flex-col items-center mx-auto text-center">
              <div className="w-16 h-16 bg-sky-50 border border-sky-100 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-2xl font-serif text-black mb-4">Negotiation Only Service</h3>
              <p className="text-muted leading-relaxed font-sans text-base">Already found a property you love? Our property negotiation buyers agent Australia service provides standalone representation, using detailed market data, comparable sales insights, and expert negotiation skills to secure the best possible price and favourable contract terms on your behalf.</p>
            </motion.div>
            
            <motion.div initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1}} className="bg-white p-10 rounded-3xl border border-black/5 hover:shadow-xl transition-shadow flex flex-col items-center mx-auto text-center">
              <div className="w-16 h-16 bg-sky-50 border border-sky-100 rounded-2xl flex items-center justify-center mb-6">
                <Gavel className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-2xl font-serif text-black mb-4">Auction Bidding Representation</h3>
              <p className="text-muted leading-relaxed font-sans text-base">Auctions in Australia are fast-paced and emotionally charged, often leading buyers to overpay. Our auction bidding service Australia offers calm, strategic representation, using a pre-set bidding limit and a data-driven approach based on accurate property valuation and local market competition.</p>
            </motion.div>

            <motion.div initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.2}} className="bg-white p-10 rounded-3xl border border-black/5 hover:shadow-xl transition-shadow flex flex-col items-center mx-auto text-center">
              <div className="w-16 h-16 bg-sky-50 border border-sky-100 rounded-2xl flex items-center justify-center mb-6">
                <Map className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-2xl font-serif text-black mb-4">Portfolio Strategy Sessions</h3>
              <p className="text-muted leading-relaxed font-sans text-base">For investors wanting to plan their next acquisition or restructure their approach, we offer dedicated portfolio strategy sessions - reviewing your existing holdings, modelling future acquisitions, and developing a structured roadmap for wealth growth.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-12 md:py-24 bg-gradient-to-b from-white to-sky-100 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-5xl md:text-6xl font-serif text-black leading-tight mb-6">
              Frequently <br />
              <span className="italic text-muted">asked questions.</span>
            </h2>
            <p className="text-muted text-lg font-sans">Everything you need to know about our specialized acquisition services.</p>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            {servicesFaqs.map((faq, index) => (
              <div key={index} className="border-b border-black/10 pb-2">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left hover:bg-neutral-50 rounded-xl px-2 transition-colors group cursor-pointer"
                >
                  <span className={`text-xl sm:text-2xl font-sans font-semibold transition-colors duration-300 ${openFaq === index ? 'text-[#021f3a]' : 'text-slate-600 group-hover:text-[#021f3a]'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 ${openFaq === index ? 'border-black bg-black text-white' : 'border-black/10 text-black group-hover:border-black'}`}
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
                      <p className="text-lg text-slate-800 font-sans leading-relaxed pb-8 pl-2 pr-12">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
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
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-black mb-8 leading-tight">
              Not sure which service fits? <br />
              <span className="italic text-muted">Let's find out together.</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted font-sans mb-12 max-w-2xl mx-auto">
              Book a free 30-minute call. No pressure, no pitch — just a frank conversation about your property targets.
            </p>
            <button
              onClick={openCalendly}
              className="group rounded-full px-8 sm:px-14 py-4 sm:py-5 bg-black text-white text-sm sm:text-base font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform duration-300 shadow-2xl shadow-black/10 flex items-center gap-3 mx-auto"
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
