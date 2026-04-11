import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Plus } from 'lucide-react';
import { openCalendly } from '../utils/calendly';
import { useState } from 'react';

const smsfFaqs = [
  {
    question: 'What Is SMSF Property Investment and How Does It Work?',
    answer: 'SMSF property investment is the process of buying real estate via the self-managed super fund in accordance with the relevant regulations. JJ Property Partner will be glad to guide you through the process.'
  },
  {
    question: 'How Can JJ Property Partner Help with SMSF Property Investments?',
    answer: 'JJ Property Partner offers an all-inclusive package that includes strategy development, SMSF compliance advice, property search and analysis, negotiations, and settlement.'
  },
  {
    question: 'What areas do you cover for SMSF property investment?',
    answer: 'We help you find and invest in quality properties in various parts of Australia, depending on the market\'s growth and demand potential.'
  },
  {
    question: 'How do you ensure SMSF compliance during property purchase?',
    answer: 'Our team collaborates with your financial and legal experts to meet all requirements, including those related to lending laws, legalities, and the sole-purpose test.'
  },
  {
    question: 'What type of properties is appropriate for SMSF investment?',
    answer: 'We recommend high-quality, low-risk properties like dual occupancy homes, mixed-use developments, and rentals with solid demand.'
  },
  {
    question: 'Are off-market SMSF investments available through your services?',
    answer: 'Yes, we use our networks to find off-market deals that give you an edge over other investors.'
  },
  {
    question: 'How do you reduce the risks associated with SMSF property investment?',
    answer: 'We make sure your risk management strategy is considered through compliance and market data analysis.'
  },
  {
    question: 'Are your services coordinated with my financial and legal advisors?',
    answer: 'Absolutely! Our team coordinates your efforts with your accountant, financial advisor, real estate broker, and SMSF audit professional.'
  },
  {
    question: 'What do you provide in your SMSF property investment service?',
    answer: 'We provide strategy development, property research, analysis, compliance assistance, negotiations, and settlement services.'
  },
  {
    question: 'Why should SMSF investors consider JJ Property Partner?',
    answer: 'JJ Property Partner assists investors in developing a strong portfolio by employing a data-driven strategy, national market exposure, and a buyer-centric approach aimed at generating wealth.'
  }
];

const pillars = [
  {
    title: 'Strategically Structuring an SMSF Property Investment',
    description: 'An SMSF property investment involves careful planning, an understanding of financial regulations, and a long-term strategic vision. JJ Property Partner offers expert services in navigating through complex financial laws in Australia while helping you acquire the best properties possible.\n\nAs professional buyers’ agents who solely represent the buyer’s best interest, we utilize our knowledge of financial regulation and thorough research to identify lucrative investment properties all over Australia.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'SMSF-Compliant Purchase & Off-Market Properties',
    description: 'SMSF acquisitions involve many regulations that must be followed. At JJ Property Partner, we work together with your financial adviser, accountant, and SMSF auditor to make sure all of your purchases are compliant with lending policies and sole purpose tests.\n\nWe excel at sourcing investment properties in Australia that can deliver great yields and minimal costs along with offering you access to exclusive off-market properties.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'The Long-Term Vision of Growth and End-to-End Execution',
    description: 'The success of any SMSF property investment relies heavily on long-term vision and planning. JJ Property Partner specializes in acquiring those assets that will generate continuous capital growth and meet your retirement needs.\n\nFrom start to finish, our services include strategy development, suburb analysis, negotiations, and settlements. JJ Property Partner helps its clients to develop SMSF property portfolio in a way that ensures strong performance and strategic diversification throughout Australia.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=900',
  }
];

export default function SmsfProperty() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>SMSF Property Investment Experts AU| JJ Property Partner</title>
        <meta name="description" content="Build wealth with SMSF property investment. JJ Property Partner delivers compliant strategies, off-market deals & long-term growth across Australia." />
      </Helmet>
      
      <div className="w-full bg-white selection:bg-black/10 pt-20">
        {/* Hero Section */}
        <section className="relative px-8 pt-20 pb-20 md:pt-32 md:pb-40 bg-[#021f3a] text-white overflow-hidden">
          {/* bg glow blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-600/20 blur-[160px] rounded-full -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-400/10 blur-[120px] rounded-full -z-0 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full border border-sky-400/30 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300 mb-8 backdrop-blur-sm">
                SMSF Property
              </div>
              <h1 className="text-4xl md:text-6xl font-serif leading-[1.1] mb-8 max-w-4xl mx-auto">
                Acquisition strategies built for{' '}
                <span className="italic text-sky-400">compliant precision.</span>
              </h1>
              <p className="text-lg md:text-xl text-sky-100/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Every SMSF brief is unique. Every acquisition is structured for long-term, compliant returns. Explore the three core pillars of the JJ Property Partner SMSF property investment approach.
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
              <p className="text-muted text-lg font-sans">Essential answers for managing your property investments within an SMSF.</p>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-4">
              {smsfFaqs.map((faq, index) => (
                <div key={index} className="border-b border-black/10 pb-2">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between py-6 text-left hover:bg-neutral-50 rounded-xl px-2 transition-colors group cursor-pointer"
                  >
                    <span className={`text-2xl font-serif transition-colors duration-300 ${openFaq === index ? 'text-black' : 'text-muted group-hover:text-black'}`}>
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
                        <p className="text-lg text-muted font-sans leading-relaxed pb-8 pl-2 pr-12">{faq.answer}</p>
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
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Ready to secure your <span className="italic text-sky-400">superannuation growth</span>?
              </h2>
              <p className="text-lg text-sky-100/80 font-sans mb-12">
                Book a free strategy session with our SMSF experts to discuss compliant, high-yield off-market property options.
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
