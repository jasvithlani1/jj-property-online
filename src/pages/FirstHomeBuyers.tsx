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
    title: 'Why First Home Buyers Need Independent Representation',
    description: 'When you buy through a traditional real estate process, the selling agent is legally obligated to act in the vendor\'s best interest — not yours. That means every negotiation, every open home conversation, and every contract discussion is handled by someone working against you.\n\nFor a buyers agent first home buyer in Australia, this can be especially challenging. A licensed buyers agent changes that dynamic entirely. We sit on your side of the table. Our goal is to get you the best property at the best price on the best terms — and we are contractually obligated to act exclusively in your interest.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Smart Property Buying in Australia Made Simple',
    description: 'Securing the right property in Australia\'s competitive market takes more than browsing listings. It requires a clear strategy and access to opportunities others miss. At JJ Property Partner, we identify high-quality properties using data-driven insights such as suburb growth, rental yields, infrastructure, and demographics.\n\nWe also unlock off-market opportunities to give you an advantage. Our goal is to help you secure a property that delivers immediate value while supporting strong long-term capital growth.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'The JJ Property Partner Advantage for First Home Buyers',
    description: '',
    advantages: [
      { label: 'Access', text: 'Discover off-market and pre-market properties not available to the public.' },
      { label: 'Research', text: 'Make informed decisions with data-driven suburb analysis using 10+ key metrics.' },
      { label: 'Negotiation', text: 'Achieve better outcomes with expert negotiation that outperforms DIY approaches.' },
      { label: 'Clarity', text: 'Enjoy a smooth, stress-free process with clear, end-to-end guidance.' },
      { label: 'Independence', text: 'Get unbiased advice with 100% representation and zero conflicts of interest throughout your buying journey.' },
    ],
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
              <div className="inline-block px-7 py-3 rounded-full border border-sky-400/50 bg-white/10 text-sm font-bold uppercase tracking-[0.2em] text-white mb-8 backdrop-blur-sm scale-110 origin-center translate-y-[-4px]">
                First Home Buyers
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif leading-[1.1] mb-8 max-w-4xl mx-auto px-4">
                Acquisition Strategies Designed for{' '}
                <span className="italic text-sky-400">Confident</span> First Home Buyers.
              </h1>
              <p className="text-lg md:text-xl text-sky-100/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Buying your first home in Australia is increasingly complex, with rising prices, competitive auctions, and confusing grant schemes making the process overwhelming. Without expert support, costly mistakes are easy to make — which is why first home buyer assistance across Australia is more important than ever.
              </p>
              <p className="text-base md:text-lg text-sky-100/60 font-sans max-w-3xl mx-auto leading-relaxed mt-4">
                JJ Property Partner offers dedicated, independent guidance from start to finish. Alex combines over 20 years of IT and property expertise to help you secure the right property, in the right location, at the right price — anywhere in Australia.
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
        <section className="py-20 md:py-32 px-6 md:px-8 bg-[#021f3a] text-white">
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
                    title: 'Strategy & Financial Clarity',
                    body: 'We begin with a thorough understanding of your situation: your borrowing capacity, deposit, first home buyer grant eligibility, stamp duty concessions, target timeline, and long-term property goals. This session produces a clear acquisition brief that guides every subsequent decision.',
                    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '02',
                    title: 'Property Strategy & Suburb Research',
                    body: 'Rather than immediately browsing listings, we first build a strategic framework for your purchase. Using our data modelling approach, we assess suburbs against multiple performance metrics — growth trajectory, rental yield, vacancy rates, infrastructure investment, and demographic trends.',
                    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '03',
                    title: 'Property Identification & Off-Market Access',
                    body: 'We conduct an active, structured property search — engaging our network of selling agents, attending inspections, and monitoring off-market channels to identify suitable opportunities before they reach public listings. Our clients gain access to properties that are never advertised.',
                    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '04',
                    title: 'Due Diligence',
                    body: 'Every shortlisted property undergoes thorough due diligence including comparable sales analysis, pest and building inspection coordination, legal contract review in collaboration with your solicitor, body corporate review (for strata), and flood or bushfire overlay checks.',
                    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '05',
                    title: 'Negotiation & Auction Representation',
                    body: 'We negotiate on your behalf at private treaty or represent you at auction using a pre-agreed strategy based on property valuation, vendor motivation, and competitive analysis. Professional negotiation consistently delivers better outcomes than buyers self-representing.',
                    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '06',
                    title: 'Settlement & Post-Purchase Support',
                    body: 'We coordinate with your solicitor, broker, and all relevant parties through to final settlement. Post-purchase, we remain available to answer questions and assist with future planning.',
                    image: 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&q=80&w=800',
                  },
                ].map((card, i, arr) => (
                  <div key={card.step} className="flex gap-6 items-start">

                    {/* Timeline Rail */}
                    <div className="hidden lg:flex flex-col items-center shrink-0 pt-[18px]">
                      {/* Dot */}
                      <div className="w-4 h-4 rounded-full bg-sky-400 ring-4 ring-sky-400/20 shrink-0 z-10" />
                      {/* Connecting line to next card */}
                      {i < arr.length - 1 && (
                        <div className="w-px flex-1 min-h-[2rem] bg-gradient-to-b from-sky-400/60 to-sky-400/10 mt-2" />
                      )}
                    </div>

                    {/* Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className={`flex-1 rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 hover:border-sky-400/30 transition-all duration-300 group ${i < arr.length - 1 ? 'mb-8' : ''}`}
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
