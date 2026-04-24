import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { openCalendly } from '../utils/calendly';
import { useState } from 'react';

const fhbFaqs = [
  {
    question: 'How does a buyer\'s agent help a first home buyer?',
    answer: 'We provide end-to-end support—from identifying the right suburbs and properties to handling inspections, due diligence, and skilled negotiation. Our goal is to save you time, reduce stress, and ensure you don\'t overpay for your first home.'
  },
  {
    question: 'Can you help with off-market properties?',
    answer: 'Yes. We use our extensive network of agents and industry contacts to access properties before they hit the open market, giving you a significant advantage over other buyers.'
  },
  {
    question: 'What grants and incentives are available for first home buyers?',
    answer: 'Depending on your state and purchase price, you may be eligible for the First Home Owner Grant (FHOG), stamp duty concessions, or the First Home Guarantee scheme. We help you understand these options as part of our strategy session.'
  },
  {
    question: 'How do you determine the right price for a property?',
    answer: 'We use professional data tools and comparable sales analysis to determine the true market value of a property, ensuring you make a confident offer based on facts, not emotion.'
  },
  {
    question: 'What is the cost of your service for first home buyers?',
    answer: 'We offer flexible fee structures tailored to your budget and the level of service required. We discuss this transparently during our initial discovery call.'
  }
];

const pillars = [
  {
    title: 'Financial Clarity & Buying Power',
    description: 'The first step to a successful purchase is knowing exactly where you stand. We help you coordinate with specialist brokers to understand your borrowing capacity, deposit requirements, and eligibility for all available government grants and stamp duty concessions.\n\n• Borrowing capacity assessment\n• Deposit strategy planning\n• Government grant eligibility checks\n• Stamp duty savings analysis',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Suburb Research & Strategy',
    description: 'We don\'t just look at houses; we look at markets. Using data-driven research, we identify suburbs across Australia that offer the best value, growth potential, and lifestyle fit for your specific budget.\n\n• Suburb performance data\n• Infrastructure & growth analysis\n• Market demand tracking\n• Location-specific risk assessment',
    image: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Due Diligence & Expert Negotiation',
    description: 'Buying your first home shouldn\'t be a gamble. We manage every aspect of the search and negotiation, ensuring you avoid costly mistakes and secure the property on the best possible terms.\n\n• Contract review coordination\n• Building & pest management\n• Strategic auction representation\n• Private treaty negotiation',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=900',
  }
];

export default function FirstHomeBuyers() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>First Home Buyer Specialist | JJ Property Partner</title>
        <meta name="description" content="Expert guidance for first home buyers in Australia. From deposit strategy to final settlement, we help you secure your first home with confidence." />
      </Helmet>
      
      <div className="w-full bg-white selection:bg-black/10 pt-20">
        {/* Hero Section */}
        <section className="relative px-6 py-12 sm:px-8 sm:py-16 md:pt-24 md:pb-20 bg-[#021f3a] text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-600/20 blur-[160px] rounded-full -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-400/10 blur-[120px] rounded-full -z-0 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-7 py-3 rounded-full border border-sky-400/50 bg-white/10 text-sm font-bold uppercase tracking-[0.2em] text-white mb-8 backdrop-blur-sm">
                First Home Buyers
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] mb-8 max-w-5xl mx-auto px-4">
                Your Journey to Home Ownership,{' '}
                <span className="text-sky-400">Simplified & Strategic.</span>
              </h1>
              <p className="text-xl md:text-2xl text-sky-100/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Stop guessing and start moving. We provide the data, strategy, and negotiation power to help you secure your first home without the stress of overpaying.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 md:py-24 px-8 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#011122] mb-6 leading-tight">
                Stop Searching, Start Finding
              </h2>
              <div className="space-y-6 text-lg text-slate-700 font-sans leading-relaxed">
                <p>
                  Most first home buyers spend months scrolling through real estate portals, only to be outbid at auction or find themselves discouraged by rising prices. At JJ Property Partner, we flip the script.
                </p>
                <p className="font-semibold text-[#021f3a]">
                  We give first home buyers a clear professional edge:
                </p>
                <ul className="space-y-4 pt-2">
                  {[
                    "Access to off-market properties before they reach the public",
                    "Data-backed suburb research to ensure you buy in a growth area",
                    "Professional negotiation to secure the lowest possible price",
                    "Expert guidance on grants, stamp duty, and borrowing capacity",
                    "Complete peace of mind through managed due diligence"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-sky-500 shrink-0 mt-2.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=1200"
                alt="Happy Home Owners"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Content Pillars */}
        <section className="py-8 md:py-16 px-6 md:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h2 className="text-3xl md:text-4xl font-serif text-[#011122] mb-6 leading-tight">
                    {pillar.title}
                  </h2>
                  <div className="space-y-4 text-base md:text-lg text-slate-600 font-sans leading-relaxed">
                    {pillar.description.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('• ')) {
                        return (
                          <div key={pIdx} className="space-y-3 mt-4">
                            {paragraph.split('\n').map((item, iIdx) => (
                              <div key={iIdx} className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-sky-500 shrink-0 mt-2.5" />
                                <span>{item.replace('• ', '')}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return <p key={pIdx}>{paragraph}</p>;
                    })}
                  </div>
                </div>

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

        {/* Process Timeline Section */}
        <section className="py-16 md:py-24 px-8 bg-[#021f3a] text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-overlay" />
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

              {/* Left — Sticky Panel */}
              <div className="lg:w-[38%] lg:sticky lg:top-[30vh] lg:self-start">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">Our Process</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
                  What We Do for{' '}
                  <span className="text-sky-300">First Home Buyers</span>
                </h2>
                <div className="h-1 w-16 bg-sky-400 mb-8 rounded-full" />
                <p className="text-white/60 font-sans text-lg leading-relaxed">
                  From financial clarity to final settlement, JJ Property Partner manages every step of your first home purchase — so you can move forward with confidence, not guesswork.
                </p>
              </div>

              {/* Right — Scrollable Cards with Timeline */}
              <div className="lg:w-[62%] flex flex-col">
                {[
                  {
                    step: '01',
                    title: 'Step 1 - Strategy & Financial Clarity',
                    body: 'We start by getting a clear picture of where you stand financially, including borrowing capacity, deposit, and eligibility for first home buyer incentives and stamp duty savings.',
                    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '02',
                    title: 'Step 2 - Suburb Research & Targeting',
                    body: 'Using data-led research, we assess price growth, market demand, and local infrastructure to identify the right locations across Australia that fit your lifestyle and budget.',
                    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '03',
                    title: 'Step 3 - Off-Market Property Sourcing',
                    body: 'We tap into our industry network to find properties before they hit realestate.com.au or Domain, giving you access to quality homes without the public competition.',
                    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '04',
                    title: 'Step 4 - Due Diligence & Checks',
                    body: 'Every shortlist property is carefully assessed through detailed research, coordination of building and pest inspections, and contract review with your solicitor.',
                    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '05',
                    title: 'Step 5 - Negotiation & Securing the Deal',
                    body: 'We represent you at auction or in private treaty negotiations, using market data and discipline to secure the property on the best possible terms.',
                    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '06',
                    title: 'Step 6 - Settlement & Keys',
                    body: 'We work with your solicitor and mortgage broker through to final settlement, ensuring a smooth handover so you can celebrate your new home.',
                    image: 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&q=80&w=800',
                  },
                ].map((card, i, arr) => (
                  <div key={card.step} className="flex items-stretch gap-4 md:gap-6 relative">
                    <div className="relative w-4 shrink-0">
                      {i < arr.length - 1 && (
                        <div className="absolute top-[32px] bottom-[-24px] left-1/2 -translate-x-1/2 w-px bg-white/10 overflow-hidden z-0">
                          <motion.div 
                            initial={{ height: '0%' }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: false, margin: '-25% 0px -25% 0px' }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-sky-400 to-sky-400/20"
                          />
                        </div>
                      )}
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: '-15%' }}
                        transition={{ duration: 0.5, ease: 'backOut' }}
                        className="w-4 h-4 rounded-full bg-sky-400 ring-4 ring-sky-400/20 absolute left-0 top-[24px] z-10" 
                      />
                    </div>

                    <div className={`flex-1 ${i < arr.length - 1 ? 'pb-12' : ''}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 hover:border-sky-400/30 transition-all duration-300 group"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#021f3a]/90 via-[#021f3a]/20 to-transparent" />
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-sky-500/90 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                            Step {card.step}
                          </div>
                        </div>
                        <div className="p-8">
                          <h3 className="text-xl md:text-2xl font-serif text-white mb-3 leading-snug">
                            {card.title}
                          </h3>
                          <p className="text-white/60 font-sans text-base leading-relaxed">
                            {card.body}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section className="py-16 md:py-24 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <h2 className="text-4xl md:text-5xl font-serif text-[#011122] mb-6 leading-tight">
                  Are You Ready for Your First Home?
                </h2>
                <p className="text-lg text-slate-700 font-sans leading-relaxed mb-8">
                  Buying your first home is a huge milestone. We help you identify if you're ready to make the leap and what steps you need to take to get there.
                </p>
                <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8">
                  <h3 className="text-xl font-serif text-[#021f3a] mb-4">First Home Strategy Session</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Unsure where to start? Our free discovery call will help you understand your budget, available grants, and the buying process from start to finish.
                  </p>
                  <button
                    onClick={openCalendly}
                    className="w-full rounded-full py-4 bg-[#021f3a] text-white text-sm font-bold uppercase tracking-widest hover:bg-sky-600 transition-all duration-300"
                  >
                    Start My Journey
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "Stable Income", desc: "A consistent employment history helps secure a mortgage and build buying power." },
                    { title: "Deposit Ready", desc: "Having a 5-10% deposit saved, or access to a family guarantee, is a great starting point." },
                    { title: "Grant Eligibility", desc: "You may qualify for FHOG or stamp duty exemptions that can save you thousands." },
                    { title: "Primary Residence", desc: "You plan to live in the home for at least the first 6-12 months after purchase." },
                    { title: "Borrowing Capacity", desc: "You have a clear understanding of your budget and pre-approval status." },
                    { title: "Goal Clarity", desc: "You have a clear idea of your lifestyle needs and preferred locations." }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-sky-200 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-sky-500/10 text-sky-600 flex items-center justify-center mb-4 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                        <Plus className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-serif text-[#011122] mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why JJ Property Partner Section */}
        <section className="py-20 md:py-32 px-8 bg-[#011122] text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6"
              >
                Why JJ Property Partner for <span className="text-sky-400">First Home Success</span>
              </motion.h2>
              <div className="h-1.5 w-24 bg-sky-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { title: "Guided Support", desc: "Step-by-step guidance through the entire process, from finance to keys." },
                { title: "Market Access", desc: "Access to off-market properties not available on common real estate portals." },
                { title: "Data-Led Insights", desc: "Using professional tools to identify growth suburbs and avoid overpaying." },
                { title: "Expert Negotiation", desc: "Skilled representation to help you secure your home on better terms." },
                { title: "Zero Conflict", desc: "We work exclusively for you. No developer ties or hidden commissions." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-6 font-serif text-2xl font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-serif mb-4 text-sky-100">{item.title}</h3>
                  <p className="text-sm text-sky-100/60 leading-relaxed font-sans">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20 md:py-32 bg-white px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-5xl md:text-6xl font-serif text-[#011122] leading-tight mb-8">
                Frequently <br />
                <span className="text-sky-500">asked questions.</span>
              </h2>
              <p className="text-slate-600 text-lg font-sans leading-relaxed">Everything you need to know about buying your first home with expert representation.</p>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              {fhbFaqs.map((faq, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-slate-200 pb-2"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between py-6 text-left hover:bg-slate-50 rounded-2xl px-4 transition-all duration-300 group cursor-pointer"
                  >
                    <span className={`text-xl sm:text-2xl font-serif transition-colors duration-300 ${openFaq === index ? 'text-[#021f3a]' : 'text-slate-700 group-hover:text-sky-600'}`}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === index ? 'border-[#021f3a] bg-[#021f3a] text-white shadow-lg' : 'border-slate-200 text-slate-400 group-hover:border-sky-500 group-hover:text-sky-500'}`}
                    >
                      <Plus className="w-6 h-6" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="text-lg text-slate-600 font-sans leading-relaxed pb-8 pl-4 pr-12">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-8 bg-[#011122] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-8 leading-tight">
                Secure your <span className="text-sky-400">first home</span> today.
              </h2>
              <p className="text-xl text-sky-100/70 font-sans mb-12 leading-relaxed max-w-2xl mx-auto">
                Ready to stop scrolling and start finding? Book your free, no-obligation strategy session to understand how we can help you get the keys faster.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button
                  onClick={openCalendly}
                  className="rounded-full px-12 py-5 bg-sky-500 text-white text-sm font-bold uppercase tracking-widest hover:bg-sky-400 hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 shadow-2xl shadow-sky-500/40"
                >
                  Book Free Session
                </button>
                <button
                  onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                  className="rounded-full px-12 py-5 border border-white/20 bg-white/5 text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#011122] transition-all duration-300"
                >
                  Contact Alex
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
