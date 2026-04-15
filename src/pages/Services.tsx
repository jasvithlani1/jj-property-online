import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Home as HomeIcon, TrendingUp, CheckCircle2, Plus } from 'lucide-react';
import { FaHome, FaChartLine } from 'react-icons/fa';
import { TbHomeShield } from 'react-icons/tb';
import { openCalendly } from '../utils/calendly';
import { useState } from 'react';

const servicesFaqs = [
  {
    question: 'How can JJ Property Partner assist first home buyers?',
    answer: 'JJ Property Partner assists first home buyers from start to finish, from determining your ability to borrow to finding the appropriate property across Australia.'
  },
  {
    question: 'What should one consider before purchasing their first home?',
    answer: 'One must take into consideration their finances, objectives, and market conditions. JJ Property Partner assists you in determining the growth prospects, fundamentals, and value for your investment.'
  },
  {
    question: 'What makes JJ Property Partner different?',
    answer: 'We are dedicated buyer’s agents. We don’t sell property, we represent you. Every decision is backed by data, strategy, and your personal goals.'
  },
  {
    question: 'How do I select an appropriate investment property in Australia?',
    answer: 'Criteria may include growth prospects, demand for rentals, infrastructure, and economic conditions. We locate these areas across Australia that match our criteria.'
  },
  {
    question: 'Is it possible for a novice investor to invest in real estate?',
    answer: 'Yes. With the correct knowledge and approach, a beginner can construct solid portfolios.'
  },
  {
    question: 'How many properties should one own?',
    answer: 'There is no set number. Rather, one should concentrate on constructing a diverse portfolio according to their financial capability and objectives.'
  },
  {
    question: 'What is SMSF property investment?',
    answer: 'It allows you to invest your superannuation into property under strict compliance rules to support long-term retirement growth.'
  },
  {
    question: 'Is SMSF property right for everyone?',
    answer: 'Not always. It requires financial capacity, compliance understanding, and a long-term outlook. We help assess suitability based on your situation.'
  },
  {
    question: 'How do you support SMSF buyers?',
    answer: 'We work alongside your advisors to ensure compliance while sourcing and securing the right investment aligned with your retirement strategy.'
  }
];

const services = [
  {
    id: 'first-home-buyers',
    icon: <HomeIcon className="w-8 h-8" />,
    solidIcon: <FaHome className="w-8 h-8" />,
    tag: 'Residential',
    title: 'First-Time Buyers',
    subtitle: 'Confident and decisive market entry.',
    description: 'Investing in your first home is perhaps the most critical financial investment you will ever make. Instead of tying you down to one location alone, we ensure that you get access to some of the finest opportunities in Australia depending on your objectives, affordability, and preferences. At your service as your buying agents, we free you from all the uncertainty.',
    benefits: [
      'Exclusive access to off-market/pre-market properties throughout the nation',
      'Decision making supported by data analysis instead of emotion',
      'Highly skilled negotiating techniques for favorable terms',
      'Extensive due diligence for every property purchase',
      'Complete assistance starting from planning till settlement'
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
    subtitle: 'Massive data-driven acquisitions.',
    description: 'An effective portfolio demands strategic planning, timing, and availability of suitable investments. Our investment philosophy lies in selecting the most promising growth and yield markets throughout Australia, not merely a single area. Our team works exclusively for the benefit of the buyer to guarantee that all acquisitions fit into your overall wealth plan.',
    benefits: [
      'Strategic suburb selection based on nationwide research',
      'Focus on high-growth and cash flow-positive deals',
      'Access to exclusive listings to minimize competition',
      'Negotiation strategies customized based on seller motivations',
      'Professional portfolio planning over a 5 – 10 year horizon',
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
    title: 'Growing SMSF through Property Investments',
    subtitle: 'Compliance-first wealth building.',
    description: 'Investing in property through an SMSF demands adherence to compliance laws and proper strategies. We make this easier for you by helping find suitable property investments that meet all the necessary compliance and financing requirements, working across national property investment opportunities.',
    benefits: [
      'Advice that meets all SMSF compliance requirements',
      'Working closely with your accountants and financial advisers',
      'Investment in maintenance-free and highly profitable assets',
      'Specialised property investments such as dual income properties',
      'Asset selection to achieve retirement goals',
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
              Acquisition strategies built for{' '}
              <span className="italic text-sky-300">precision.</span>
            </h1>
            <p className="text-xl text-white/60 font-sans max-w-2xl leading-relaxed">
              JJ Property Partner operates as a dedicated buyer’s agent, representing your interests only - sourcing, evaluating, and securing property opportunities across Australia.
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
