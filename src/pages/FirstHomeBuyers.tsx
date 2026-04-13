import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Plus } from 'lucide-react';
import { openCalendly } from '../utils/calendly';
import { useState } from 'react';

const firstHomeFaqs = [
  {
    question: 'What does JJ Property Partner do for first home buyers?',
    answer: 'It offers end-to-end services for buying property throughout Australia, including strategic services, property acquisition, negotiation, and post-settlement services.'
  },
  {
    question: 'Which locations do you cover?',
    answer: 'JJ Property Partner assists those who wish to purchase properties in any part of Australia.'
  },
  {
    question: 'How can you help in choosing the best property?',
    answer: 'Through thorough research, we assist in selecting properties that match your budget and long-term intentions.'
  },
  {
    question: 'Do you help access off-market properties?',
    answer: 'Certainly, we give access to such properties in different parts of Australia.'
  },
  {
    question: 'Do you negotiate the prices?',
    answer: 'Certainly, our firm assists in the entire process of negotiating prices.'
  },
  {
    question: 'Do you help plan your finances?',
    answer: 'We work alongside your financial advisors to make sure that your purchase matches your finances.'
  },
  {
    question: 'Can this be used by home buyers and investors?',
    answer: 'This service caters to both home buyers and first time investors.'
  },
  {
    question: 'What services do you offer under this end-to-end service?',
    answer: 'We offer consultation, strategic advice, property search, due diligence, negotiation, and post-settlement services.'
  },
  {
    question: 'How can transparency be ensured?',
    answer: 'We ensure there is good communication, thorough reporting, and frank advice for the whole process.'
  },
  {
    question: 'Why would you opt for JJ Property Partner?',
    answer: 'Our data-driven approach, access to the national markets, and individual buyer representation will help you find the right property anywhere in Australia.'
  }
];

const pillars = [
  {
    title: 'First Home Buyers - National Guidance',
    description: 'Home purchase is a landmark moment which needs clarity, proper planning, and adequate guidance. Being a committed buyers agent, JJ Property Partner assists buyers in finding the most suitable property regardless of the location within Australia.\n\nThe strategy employed by our agents revolves around identifying and understanding your objectives, your finances and future plans. Whether you have decided to buy the house as your place of residence or initiate investments in property, we will assist you at making the best possible decision anywhere in Australia.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Property Strategy & Off-Market Properties Nationwide',
    description: 'Buying the most suitable property especially in highly competitive markets calls for a lot more besides browsing through listings. What is needed is a proper strategy and access to properties which might not be available to all.\n\nWe find high-quality properties throughout Australia by searching across suburb growth potential, rental return, infrastructure projects and demographics. We also offer access to off-market properties which give our clients the edge in their buying process, helping secure assets that will create immediate value.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'End-to-End Guidance for Assured Decision-Making',
    description: 'JJ Property Partner offers end-to-end guidance during your entire journey of purchasing a new property. As your personal buyers’ agent, we act on your behalf at every step of the process.\n\nWe handle everything from researching properties, due diligence, negotiations, and managing the transaction until completion. In addition, we collaborate with your mortgage agents and financial advisers to integrate your purchase with your financial plan, ensuring you set a solid base for future real estate investments.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=900',
  }
];

export default function FirstHomeBuyers() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>First Home Buyers Australia | JJ Property Partner</title>
        <meta name="description" content="Expert guidance for first home buyers across Australia. JJ Property Partner offers strategy, off-market access and end-to-end support for confident buying." />
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
              <div className="inline-block px-5 py-2 rounded-full border border-sky-400/30 bg-white/5 text-xs font-bold uppercase tracking-[0.2em] text-sky-300 mb-8 backdrop-blur-sm">
                First Home Buyers
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif leading-[1.1] mb-8 max-w-4xl mx-auto px-4">
                Acquisition strategies designed for{' '}
                <span className="italic text-sky-400">confident</span> first home buyers.
              </h1>
              <p className="text-lg md:text-xl text-sky-100/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Every journey is unique. The process of buying a home requires multiple steps which lead to achieving the best possible outcome. The JJ Property Partner approach for first home buyers consists of three essential elements which form its foundation.
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
              <p className="text-muted text-lg font-sans">Essential information for first home buyers navigating the Australian market.</p>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-4">
              {firstHomeFaqs.map((faq, index) => (
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
                Ready to secure your <span className="italic text-sky-400">first home</span>?
              </h2>
              <p className="text-lg text-sky-100/80 font-sans mb-12">
                Book a free strategy session to discuss your goals and understand how our data-driven approach can give you the advantage.
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
