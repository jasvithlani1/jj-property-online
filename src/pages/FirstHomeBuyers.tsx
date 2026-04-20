import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Plus } from 'lucide-react';
import { openCalendly } from '../utils/calendly';
import { useState } from 'react';

const firstHomeFaqs = [
  {
    question: 'What does JJ Property Partner do for first home buyers?',
    answer: 'JJ Property Partner supports first home buyers from start to finish, helping with strategy, budget planning, suburb research, property shortlisting, due diligence, negotiation, and settlement support. Alex personally manages every step, making the process clearer, smoother, and far less overwhelming.'
  },
  {
    question: 'Do I need a buyers agent if I already know where I want to buy?',
    answer: 'Even if you already know the area, a buying first home Australia buyers agent can add real value by reviewing suburb data, identifying stronger streets and property types, uncovering off-market options, and negotiating a better result on your behalf.'
  },
  {
    question: 'How do you access off-market properties as a buyers agent?',
    answer: 'We access off-market properties through long-standing relationships with selling agents, property managers, and industry contacts across Australia. Because trusted buyers agents can move quickly and professionally, we are often introduced to opportunities before they are publicly advertised.'
  },
  {
    question: 'Do you assist with the First Home Owner Grant as a buyers agent?',
    answer: 'Yes. As a first home owner grant buyers agent, we help you understand available grants and government schemes, check your eligibility, and work alongside your mortgage broker to align these benefits with your buying strategy, budget, and purchase timeline.'
  },
  {
    question: 'Can JJ Property Partner help me buy property outside NSW?',
    answer: 'Absolutely. JJ Property Partner helps first home buyers purchase property across Australia, not just in NSW. We provide the research, due diligence, and buyer representation needed to make an interstate purchase feel clear, secure, and far less stressful.'
  },
  {
    question: 'What does your service cost for first home buyers?',
    answer: 'Our fees are fully transparent and explained upfront, so you know exactly what to expect. Depending on the service, we offer fixed-fee or percentage-based pricing. In many cases, the savings achieved through smart buying and negotiation can outweigh the fee.'
  }
];

const pillars = [
  {
    title: 'Why First Home Buyers Should Have an Independent Buyers Agent',
    description: 'Buying your first home can feel exciting, but it also comes with real pressure. In a standard property transaction, the selling agent works for the vendor, which means their role is to secure the best outcome for the seller, not for you.\n\nAn independent buyers agent works solely in your best interest. At JJ Property Partner, we guide first home buyers through every stage of the process, helping you avoid costly mistakes, negotiate with confidence, and secure the right property on the right terms.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Smart Property Strategies for Confident First Home Buyers',
    description: 'Buying your first home in Australia can feel overwhelming, with rising prices, complex grants, fast-moving auctions, and too much conflicting advice making the process harder than it should be. Without the right support, it is easy to overpay or choose a property that does not suit your long-term goals.\n\nJJ Property Partner gives first home buyers independent, end-to-end representation focused entirely on their best interests. With 20+ years of IT and property experience, Alex helps you identify the right property, assess the right location, and negotiate the right outcome anywhere across Australia.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=crop&q=80&w=900',
  },
  {
    title: 'The JJ Property Partner Advantage',
    description: '',
    advantages: [
      { label: 'Access', text: 'Quality off-market and pre-market properties unavailable to the general public.' },
      { label: 'Research', text: 'Data-driven suburb analysis using detailed performance metrics across Australia.' },
      { label: 'Negotiation', text: 'Professional, disciplined negotiation that consistently outperforms self-representation.' },
      { label: 'Clarity', text: 'End-to-end guidance that removes the confusion and emotional pressure of buying.' },
      { label: 'Independence', text: '100% on your side — acting solely in your interest with zero conflicts.' },
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=900',
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
              <div className="inline-block px-7 py-3 rounded-full border border-sky-400/50 bg-white/10 text-sm font-bold uppercase tracking-[0.2em] text-white mb-8 backdrop-blur-sm scale-110 origin-center translate-y-[-4px]">
                First Home Buyers
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif leading-[1.1] mb-8 max-w-4xl mx-auto px-4">
                Smart Property Strategies for <br />
                <span className="italic text-sky-400">Confident</span> First Home Buyers.
              </h1>
              <p className="text-lg md:text-xl text-sky-100/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Buying your first home in Australia can feel overwhelming, with rising prices, complex grants, fast-moving auctions, and too much conflicting advice making the process harder than it should be. Without the right support, it is easy to overpay or choose a property that does not suit your long-term goals.
              </p>
              <p className="text-base md:text-lg text-sky-100/60 font-sans max-w-3xl mx-auto leading-relaxed mt-4">
                JJ Property Partner gives first home buyers independent, end-to-end representation focused entirely on their best interests. With 20+ years of IT and property experience, Alex helps you identify the right property, assess the right location, and negotiate the right outcome anywhere across Australia.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Pillars */}
        <section className="py-16 md:py-24 px-6 md:px-8 bg-white">
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
                  {pillar.advantages ? (
                    <ul className="space-y-4">
                      {pillar.advantages.map((adv: { label: string; text: string }, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-base md:text-lg text-muted font-sans leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-1" />
                          <span><span className="font-bold text-black">{adv.label}:</span> {adv.text}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-4 text-base md:text-lg text-muted font-sans leading-relaxed whitespace-pre-wrap">
                      {pillar.description}
                    </div>
                  )}
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

        {/* ── What We Do — Sticky Scroll Section ──────────────────────── */}
        <section className="py-16 md:py-24 px-6 md:px-8 bg-[#021f3a] text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

              {/* Left — Sticky Panel */}
              <div className="lg:w-[38%] lg:sticky lg:top-[30vh] lg:self-start">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">Our Process</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
                  What We Do for{' '}
                  <span className="italic text-sky-300">First Home Buyers</span>
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
                    body: 'We start by getting a clear picture of where you stand financially and what you want to achieve. That includes your borrowing capacity, deposit, eligibility for first home buyer incentives, stamp duty savings, preferred timeframe, and long-term plans. From there, we create a well-defined property brief that shapes every step of the buying process.',
                    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '02',
                    title: 'Step 2 - Property Strategy & Suburb Research',
                    body: 'Before we start inspecting properties, we map out a clear buying strategy tailored to your goals, budget, and lifestyle. Using data-led suburb research, we assess key factors such as price growth, market demand, infrastructure, local amenities, and long-term potential to identify the right locations across Australia, not just the areas you may already be considering.',
                    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '03',
                    title: 'Step 3 - Property Identification & Off-Market Access',
                    body: 'We carry out a proactive and well-structured property search, tapping into our network of selling agents, attending inspections, and tracking off-market opportunities to uncover the right properties before they hit the open market. This gives our clients access to quality homes that are often never publicly advertised.',
                    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '04',
                    title: 'Step 4 - Due Diligence',
                    body: 'Every property we shortlist is carefully assessed through detailed due diligence, including comparable sales research, coordination of building and pest inspections, contract review with your solicitor, strata checks where required, and flood or bushfire risk assessments.',
                    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '05',
                    title: 'Step 5 - Negotiation & Auction Representation',
                    body: 'We negotiate on your behalf for private treaty purchases or represent you at auction with a clear, pre-agreed strategy. Using property value, seller motivation, and market competition, we work to secure the right property on the best possible terms with confidence and discipline.',
                    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '06',
                    title: 'Step 6 - Settlement & Post-Purchase Support',
                    body: 'We work closely with your solicitor, mortgage broker, and all key parties to keep everything moving smoothly through to settlement. Even after your purchase is complete, we stay on hand to answer questions and support your next property decisions.',
                    image: 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&q=80&w=800',
                  },
                ].map((card, i, arr) => (
                  <div key={card.step} className="flex items-stretch gap-4 md:gap-6 relative">

                    {/* Timeline Rail */}
                    <div className="relative w-4 shrink-0">
                      {/* Connecting line spanning from current dot to next dot */}
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
                      {/* Dot */}
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: '-15%' }}
                        transition={{ duration: 0.5, ease: 'backOut' }}
                        className="w-4 h-4 rounded-full bg-sky-400 ring-4 ring-sky-400/20 absolute left-0 top-[24px] z-10" 
                      />
                    </div>

                    {/* Card Container with padding-bottom instead of margin to allow timeline continuity */}
                    <div className={`flex-1 ${i < arr.length - 1 ? 'pb-12' : ''}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 hover:border-sky-400/30 transition-all duration-300 group"
                      >
                        {/* Card Image */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#021f3a]/90 via-[#021f3a]/20 to-transparent" />
                          {/* Step badge */}
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-sky-500/90 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                            Step {card.step}
                          </div>
                        </div>

                        {/* Card Body */}
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
        <section className="py-16 md:py-24 px-8 bg-[#011122] text-white">
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
