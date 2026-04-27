import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { openCalendly } from '../utils/calendly';
import { useState } from 'react';

const smsfFaqs = [
  {
    question: 'Why buy property within an SMSF?',
    answer: 'Purchasing property through an SMSF can offer significant tax advantages, including a flat 15% tax rate on rental income and potential capital gains tax exemptions when the fund enters the pension phase. It also allows for direct control over your retirement assets.'
  },
  {
    question: 'What are the compliance requirements for SMSF property?',
    answer: 'The property must meet the "sole purpose test" of providing retirement benefits, must be purchased at "arm\'s length," and cannot be lived in by the fund members or their relatives. We work closely with your accountant to ensure total compliance.'
  },
  {
    question: 'Can I use leverage (borrow) to buy SMSF property?',
    answer: 'Yes, through a Limited Recourse Borrowing Arrangement (LRBA). This involves a specific legal structure (a Bare Trust) to hold the property. We coordinate with specialist lenders and legal teams to manage this process.'
  },
  {
    question: 'How do you identify properties suitable for SMSF?',
    answer: 'We focus on high-yield assets in growth corridors that offer strong cash flow to support the fund\'s obligations, while also providing capital growth potential for long-term retirement wealth.'
  },
  {
    question: 'What is the role of a buyer\'s agent in an SMSF purchase?',
    answer: 'We provide the expert research, sourcing, and negotiation required to find a high-performing asset, while ensuring the entire acquisition process remains strictly compliant with the SIS Act and your fund\'s investment strategy.'
  }
];

const pillars = [
  {
    title: 'Compliant Strategy & Structure',
    description: 'Every SMSF purchase must align with your fund\'s written investment strategy and the "sole purpose test." We coordinate with your accountant and financial adviser to ensure the property and purchase structure meet all regulatory requirements.\n\n• Alignment with SMSF investment strategy\n• Coordination with accountants & advisers\n• Bare Trust & LRBA coordination\n• SIS Act compliance focus',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Research with Retirement Purpose',
    description: 'We focus on high-yield, low-maintenance properties that provide consistent cash flow to support your fund\'s liquidity needs, while targeting locations with strong 10-20 year capital growth potential.\n\n• High-yield asset identification (typically 5%+)\n• Low-maintenance building selection\n• Data-led growth corridor research\n• Long-term capital upside assessment',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Support Through to Settlement',
    description: 'The SMSF acquisition process has strict documentation requirements. We manage the search, negotiation, and due diligence while ensuring all paperwork—including the contract of sale—is correctly executed in the name of the trustee.\n\n• Correct entity name contract execution\n• Managed building & pest inspections\n• Strategic negotiation & representation\n• Coordination with SMSF legal specialists',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200',
  }
];

export default function SmsfProperty() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>SMSF Property Buyers Agent | JJ Property Partner</title>
        <meta name="description" content="Compliant property acquisition for Self-Managed Super Funds. We identify high-performing, high-yield assets that fit your SMSF investment strategy." />
      </Helmet>
      
      <div className="w-full bg-white selection:bg-gold/20 pt-20">
        {/* Hero Section */}
        <section className="relative px-6 py-12 sm:px-8 sm:py-16 md:pt-24 md:pb-20 bg-[#011122] text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 blur-[160px] rounded-full -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full -z-0 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-7 py-3 rounded-full border border-gold/40 bg-white/10 text-sm font-bold uppercase tracking-[0.2em] text-white mb-8 backdrop-blur-sm">
                SMSF Property
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] mb-8 max-w-5xl mx-auto px-4">
                Compliant Acquisition Strategies for{' '}
                <span className="text-gold">SMSF Success.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Investing through a Self-Managed Super Fund demands absolute precision. We identify high-performing, high-yield assets that meet strict compliance frameworks.
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
                Acquisition Strategies Built for Compliant, Long-Term SMSF Returns
              </h2>
              <div className="space-y-6 text-lg text-muted font-sans leading-relaxed">
                <p>
                  Investing in property through a Self-Managed Super Fund (SMSF) is one of the most powerful wealth-building strategies available to Australians — but it is also one of the most complex.
                </p>
                <p className="font-semibold text-[#011122]">
                  JJ Property Partner provides specialized SMSF support:
                </p>
                <ul className="space-y-4 pt-2">
                  {[
                    "Deep knowledge of SMSF compliance frameworks and SIS Act requirements",
                    "Data-driven property research to identify high-performing, compliant assets",
                    "Specialist coordination with your fund's accountant and legal team",
                    "Strategic focus on high-yield assets to support fund liquidity",
                    "Managed due diligence to protect the integrity of your retirement fund"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2.5" />
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
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200"
                alt="SMSF Legal and Compliance"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Content Pillars */}
        <section className="py-8 md:py-16 px-6 md:px-8 bg-neutral-50">
          <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 0 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={index % 2 === 0 ? 'lg:col-start-2' : ''}>
                  <h2 className="text-3xl md:text-4xl font-serif text-[#011122] mb-6 leading-tight">
                    {pillar.title}
                  </h2>
                  <div className="space-y-4 text-base md:text-lg text-muted font-sans leading-relaxed">
                    {pillar.description.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('• ')) {
                        return (
                          <div key={pIdx} className="space-y-3 mt-4">
                            {paragraph.split('\n').map((item, iIdx) => (
                              <div key={iIdx} className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2.5" />
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

                <div className={`relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl shadow-gold/5 ${index % 2 === 0 ? 'lg:col-start-1' : ''}`}>
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

        {/* SMSF Process Section */}
        <section className="py-16 md:py-24 px-8 bg-[#011122] text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-overlay" />
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

              {/* Left — Sticky Panel */}
              <div className="lg:w-[38%] lg:sticky lg:top-[30vh] lg:self-start">
                <div className="mb-6">
                <div className="h-1 w-16 bg-gold mb-8 rounded-full" />
                <p className="text-white/60 font-sans text-lg leading-relaxed">
                  A specialised 6-step process designed to identify high-performing assets while maintaining total SIS Act compliance for your fund.
                </p>
              </div>
            </div>

              {/* Right — Scrollable Cards with Timeline */}
              <div className="lg:w-[62%] flex flex-col">
                {[
                  {
                    step: '01',
                    title: 'Step 1 - Fund Discovery & Analysis',
                    body: 'We review your SMSF structure, borrowing capacity, and investment objectives to ensure property is a suitable and compliant path for your retirement goals.',
                    image: 'https://images.unsplash.com/photo-1554224155-1696413575b8?auto=format&fit=crop&q=80&w=1200',
                  },
                  {
                    step: '02',
                    title: 'Step 2 - Team Coordination',
                    body: 'We coordinate seamlessly with your financial adviser, accountant, and auditor to ensure every part of the acquisition aligns with your fund’s specific investment strategy.',
                    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
                  },
                  {
                    step: '03',
                    title: 'Step 3 - Data-Driven Market Sourcing',
                    body: 'Using specialist research, we identify high-yield (typically 5%+), low-maintenance properties in high-demand growth corridors specifically suited for SMSF holding.',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
                  },
                  {
                    step: '04',
                    title: 'Step 4 - Compliance-Focused Due Diligence',
                    body: 'Every property undergoes rigorous checks, including arm\'s length valuation assessments and coordination of building and pest inspections to protect fund integrity.',
                    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
                  },
                  {
                    step: '05',
                    title: 'Step 5 - Strategic Negotiation',
                    body: 'We represent your fund in negotiations, ensuring the purchase reflects genuine market value and is secured on the best possible terms for your retirement future.',
                    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200',
                  },
                  {
                    step: '06',
                    title: 'Step 6 - Settlement & Fund Support',
                    body: 'We manage the process through to final settlement, ensuring all documentation—including bare trust arrangements—is correctly handled by your legal team.',
                    image: 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&q=80&w=1200',
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
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold to-gold/20"
                          />
                        </div>
                      )}
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: '-15%' }}
                        transition={{ duration: 0.5, ease: 'backOut' }}
                        className="w-4 h-4 rounded-full bg-gold ring-4 ring-gold/20 absolute left-0 top-[24px] z-10" 
                      />
                    </div>

                    <div className={`flex-1 ${i < arr.length - 1 ? 'pb-12' : ''}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#011122]/90 via-[#011122]/20 to-transparent" />
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold/90 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
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
                  Is an SMSF Property Strategy Right for You?
                </h2>
                <p className="text-lg text-muted font-sans leading-relaxed mb-8">
                  Direct property investment through an SMSF is a powerful but highly regulated path. We help you identify if your fund is ready for this strategic diversification.
                </p>
                <div className="bg-gold/5 border border-gold/10 rounded-3xl p-8">
                  <h3 className="text-xl font-serif text-[#011122] mb-4">SMSF Strategy Discovery Call</h3>
                  <p className="text-muted mb-6 leading-relaxed">
                    Unsure about compliance or property selection? Our discovery call helps you understand how JJ Property Partner identifies high-yield assets that fit your fund's strategy.
                  </p>
                  <button
                    onClick={openCalendly}
                    className="w-full rounded-full py-4 bg-gold text-white text-sm font-bold uppercase tracking-widest hover:bg-gold-hover transition-all duration-300"
                  >
                    Start SMSF Strategy Call
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "Minimum Fund Balance", desc: "Your fund has a combined balance typically exceeding $250k to justify holding costs." },
                    { title: "Compliant Mindset", desc: "You are committed to the strict 'sole purpose test' and regulatory framework." },
                    { title: "Diversification Goal", desc: "You want to reduce reliance on equity markets through tangible property assets." },
                    { title: "Long-Term Holding", desc: "You intend to hold the property into the pension phase for tax efficiency." },
                    { title: "Contribution Capacity", desc: "Your fund has steady contributions to support debt repayment or maintenance." },
                    { title: "Professional Support", desc: "You have (or are building) a team of specialist SMSF advisers and accountants." }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 rounded-[2rem] bg-neutral-50 border border-gold/10 hover:border-gold/20 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                        <Plus className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-serif text-[#011122] mb-2">{item.title}</h4>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why JJ Property Partner Section */}
        <section className="py-20 md:py-32 px-8 bg-[#011122] text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6"
              >
                Why JJ Property Partner for <span className="text-gold">SMSF Acquisitions</span>
              </motion.h2>
              <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { title: "Compliance First", desc: "Absolute focus on SIS Act requirements and fund integrity throughout sourcing." },
                { title: "Specialist Research", desc: "Targeting high-yield properties (5%+) specifically suited for SMSF cash flow." },
                { title: "Team Coordination", desc: "We work directly with your accountant and legal team for seamless execution." },
                { title: "Strategic Selection", desc: "Properties selected for long-term retirement benefits, not short-term speculation." },
                { title: "Conflict Free", desc: "100% independent representation. We work for your fund, not a developer." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gold/20 text-gold flex items-center justify-center mb-6 font-serif text-2xl font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-serif mb-4 text-white">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-sans">{item.desc}</p>
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
                <span className="text-gold">asked questions.</span>
              </h2>
              <p className="text-muted text-lg font-sans leading-relaxed">Essential information for trustees building property portfolios within their SMSF.</p>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              {smsfFaqs.map((faq, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gold/20 pb-2"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between py-6 text-left hover:bg-gold/5 rounded-2xl px-4 transition-all duration-300 group cursor-pointer"
                  >
                    <span className={`text-xl sm:text-2xl font-serif transition-colors duration-300 ${openFaq === index ? 'text-gold' : 'text-muted group-hover:text-gold'}`}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === index ? 'border-gold bg-gold text-white shadow-lg' : 'border-gold/20 text-muted/60 group-hover:border-gold group-hover:text-gold'}`}
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
                        <p className="text-lg text-muted font-sans leading-relaxed pb-8 pl-4 pr-12">{faq.answer}</p>
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
                Secure your <span className="text-gold">fund's future</span> today.
              </h2>
              <p className="text-xl text-white/70 font-sans mb-12 leading-relaxed max-w-2xl mx-auto">
                Ready to explore high-performing property assets for your Self-Managed Super Fund? Book your free, compliant discovery call with Alex today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button
                  onClick={openCalendly}
                  className="rounded-full px-12 py-5 bg-gold text-white text-sm font-bold uppercase tracking-widest hover:bg-gold-hover hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 shadow-2xl shadow-gold/40"
                >
                  Book SMSF Session
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
