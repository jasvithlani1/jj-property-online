import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Plus } from 'lucide-react';
import { openCalendly } from '../utils/calendly';
import { useState } from 'react';

const investorFaqs = [
  {
    question: 'What type of service can you offer me to invest in properties?',
    answer: 'JJ Property Partner will offer comprehensive buyer agents services including investment strategies, property searching, due diligence, negotiation and acquisition of properties in order for you to develop a strong portfolio of properties.'
  },
  {
    question: 'Can you help me locate the right places to invest on properties?',
    answer: 'We assist in acquiring properties in various regions of Australia taking into account the data, potential and compatibility to the goals of our clients.'
  },
  {
    question: 'How can I be sure that my property investment will be profitable?',
    answer: 'Our way of working entails analysis of suburb potential based on growth potential, rent, infrastructural developments, among other economic factors.'
  },
  {
    question: 'Is there any room to purchase off market property investments?',
    answer: 'Yes, through our vast networks within the real estate industry, we are able to offer our clients off market properties.'
  },
  {
    question: 'What type of property investments can you offer me?',
    answer: 'Our specialty lies in high yield property investments, which include dual income properties, add value properties, among others.'
  },
  {
    question: 'What can I do to reduce the risk involved with investing?',
    answer: 'By conducting an extensive analysis of risks using different methods including financial and market analysis to make sure that the investment made suits your risk profile.'
  },
  {
    question: 'Can you help negotiate property purchase?',
    answer: 'Yes, we employ strategic negotiation techniques using our market knowledge and understanding of vendors to help negotiate favorable terms of sale.'
  },
  {
    question: 'Do you work with my financial advisor or mortgage broker?',
    answer: 'Yes, we work in close coordination with your financial advisors, mortgage brokers, and accountants to align your property investments with your financial goals.'
  },
  {
    question: 'Does your service cater to both inexperienced and experienced investors?',
    answer: 'Yes, our services are geared towards supporting new as well as experienced investors who wish to grow their investment portfolios.'
  },
  {
    question: 'What makes property investors select JJ Property Partner?',
    answer: 'Our real estate expertise combined with market intelligence and data-driven strategy helps you acquire profitable properties throughout Australia.'
  }
];

const pillars = [
  {
    title: 'Property Investors - Strategic Portfolio Growth',
    description: 'It is essential to take a structured and research-based approach to ensure that you build a profitable property portfolio. JJ Property Partner acts as a buyers\' agent that works in the best interest of the buyer and helps its clients acquire properties that meet their financial objectives.\n\nOur approach is built on comprehensive research, including suburb growth analysis, rental yield evaluation, and future capital growth potential. Every acquisition is guided by your individual investment strategy, ensuring a balance between wealth creation and risk management.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Advanced Acquisition Intelligence',
    description: 'JJ Property Partner leverages advanced market intelligence, industry networks, and analytical frameworks to identify high-performing investment opportunities across Australia before they reach the broader market.\n\nOur strategy focuses on identifying high-growth and high-yield opportunities, including dual-income properties, granny flats, and properties located in emerging growth corridors. Through access to off-market opportunities nationwide, we help clients secure premium assets while avoiding unnecessary competition.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Precision Negotiation and Execution',
    description: 'The success of an investment depends not just on the choice of the investment, but also on the accuracy with which it is carried out. JJ Property Partner makes use of customized negotiation tactics depending on seller motivation, market forces, and asset positioning.\n\nOur company takes care of the entire process of purchasing, from strategy formulation and identification of properties for purchase to negotiations and settlement, making the entire investment process seamless and result-oriented.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=900',
  }
];

export default function PropertyInvestors() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>Property Investors Strategy AU | JJ Property Partner</title>
        <meta name="description" content="Grow your portfolio with expert buyer agents at JJ Property Partner. Data-driven property investment, off-market deals, and nationwide opportunities." />
      </Helmet>
      
      <div className="w-full bg-white selection:bg-black/10 pt-20">
        {/* Hero Section */}
        <section className="relative px-6 py-16 sm:px-8 sm:py-24 md:pt-32 md:pb-40 bg-[#021f3a] text-white overflow-hidden">
          {/* bg glow blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-600/20 blur-[160px] rounded-full -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-400/10 blur-[120px] rounded-full -z-0 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-7 py-3 rounded-full border border-sky-400/50 bg-white/10 text-sm font-bold uppercase tracking-[0.2em] text-white mb-8 backdrop-blur-sm scale-110 origin-center translate-y-[-4px]">
                Property Investors
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif leading-[1.1] mb-8 max-w-4xl mx-auto px-4">
                Acquisition strategies engineered for{' '}
                <span className="italic text-sky-400">investment precision.</span>
              </h1>
              <p className="text-lg md:text-xl text-sky-100/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Every brief is strategically defined. Every acquisition is optimised for maximum portfolio return. Explore the three core pillars of the JJ Property Partner investment approach.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Pillars */}
        <section className="py-20 md:py-40 px-6 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-32">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Text Side */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="w-6 h-6 text-sky-500" />
                    <span className="text-sm font-bold uppercase tracking-widest text-sky-600">
                      Pillar 0{index + 1}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-[#011122] mb-6 leading-tight">
                    {pillar.title}
                  </h2>
                  <div className="space-y-4 text-base md:text-lg text-muted font-sans leading-relaxed whitespace-pre-wrap">
                    {pillar.description}
                  </div>
                </div>

                {/* Image Side */}
                <div className={`relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/5 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
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
              <p className="text-muted text-lg font-sans">Strategic insights for property investors building nationwide portfolios.</p>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-4">
              {investorFaqs.map((faq, index) => (
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
                      <Plus className="w-5 h-5" />
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

        {/* CTA Section */}
        <section className="py-20 md:py-40 px-8 bg-[#011122] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Ready to scale your <span className="italic text-sky-400">portfolio</span>?
              </h2>
              <p className="text-lg text-sky-100/80 font-sans mb-12">
                Book a free strategy session to discuss your investment criteria and discover exclusive off-market opportunities.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={openCalendly}
                  className="rounded-full px-10 py-4 bg-sky-500 text-white text-sm font-bold uppercase tracking-widest hover:bg-sky-400 hover:scale-[1.03] transition-all duration-300 shadow-xl shadow-sky-500/20"
                >
                  Book Session
                </button>
                <button
                  onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                  className="rounded-full px-10 py-4 border border-sky-400/30 bg-white/5 text-white text-sm font-bold uppercase tracking-widest hover:bg-sky-500 hover:border-sky-500 transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
