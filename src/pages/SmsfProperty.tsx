import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { openCalendly } from '../utils/calendly';
import { useState } from 'react';

const smsfFaqs = [
  {
    question: 'What is a Limited Recourse Borrowing Arrangement (LRBA)?',
    answer: 'A Limited Recourse Borrowing Arrangement, or LRBA, is the structure that allows an SMSF to borrow for a single investment property. The loan is secured only against that asset, not the rest of the fund, and must be set up carefully with SMSF lending and compliance requirements in mind.'
  },
  {
    question: 'Can I live in a residential property purchased through my SMSF?',
    answer: 'No. Under SMSF rules, you and any related party cannot live in a residential property owned by the fund. The investment must satisfy the sole purpose test and exist only to support retirement benefits, not personal use.'
  },
  {
    question: 'Which properties work best for SMSF property investment in Australia?',
    answer: 'The right property usually offers strong rental demand, low ongoing maintenance, solid long-term growth, and clear compliance suitability. Well-located residential homes and selected commercial assets may both be appropriate.'
  },
  {
    question: 'How do you help keep an SMSF property purchase compliant?',
    answer: 'We build compliance into every stage. We work alongside your financial adviser, accountant, and auditor to support SIS Act requirements and confirm the structure is appropriate.'
  },
  {
    question: 'Can an SMSF buy off-market property in Australia?',
    answer: 'Yes. We help SMSF buyers access off-market property opportunities across Australia through our trusted agent network, giving you a significant advantage in securing quality assets.'
  }
];

const pillars = [
  {
    title: 'Pillar 1 - Structured Right with Expert Guidance',
    description: 'Before we shortlist any property, we make sure your SMSF is properly set up and the acquisition structure is compliant from the outset. We work closely with your financial team to ensure alignment with your retirement strategy.\n\n• Acquisition structure review\n• SIS Act compliance alignment\n• Advisory team coordination\n• Borrowing capacity assessment',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Pillar 2 - SMSF Property Research with Purpose',
    description: 'Not every property is the right fit for an SMSF. We apply a data-driven research process tailored specifically to SMSF acquisition, identifying high-yield, low-maintenance assets in high-demand growth corridors.\n\n• High-yield asset identification\n• Low-maintenance property selection\n• Capital growth analysis\n• National market research',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Pillar 3 - Strategic Support Through to Settlement',
    description: 'SMSF purchases involve more moving parts and stricter documentation. We manage the entire process—from sourcing to coordinating bare trust arrangements and contract management.\n\n• Bare trust coordination\n• Contract management\n• Managed due diligence\n• Settlement oversight',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900',
  }
];

export default function SmsfProperty() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>SMSF Property Investment | JJ Property Partner</title>
        <meta name="description" content="Compliant acquisition strategies for SMSF property success. Data-driven research and expert guidance for your retirement fund investments." />
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
                SMSF Property
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] mb-8 max-w-5xl mx-auto px-4">
                Acquisition Strategies Built for{' '}
                <span className="text-sky-400">Compliant, Long-Term</span> SMSF Returns
              </h1>
              <p className="text-xl md:text-2xl text-sky-100/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Investing in property through an SMSF is one of the most powerful wealth-building strategies available — but it demands professional execution and strict compliance.
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
                Why SMSF Property Needs a Different Strategy
              </h2>
              <div className="space-y-6 text-lg text-slate-700 font-sans leading-relaxed">
                <p>
                  SMSF property buying is not the same as a standard investment purchase. It needs a far more careful and compliant approach from the very beginning.
                </p>
                <ul className="space-y-4 pt-2">
                  {[
                    "The property must satisfy the sole purpose test for retirement benefits",
                    "Finance must usually be set up through a Limited Recourse Borrowing Arrangement (LRBA)",
                    "Every part of the purchase must be completed at genuine market value",
                    "The fund must hold enough liquidity to manage repayments and expenses",
                    "Strict alignment with the SIS Act compliance framework is mandatory"
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
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200"
                alt="SMSF Planning"
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

        {/* SMSF Process Timeline Section */}
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
                  SMSF Property{' '}
                  <span className="text-sky-300">Acquisition Process</span>
                </h2>
                <div className="h-1 w-16 bg-sky-400 mb-8 rounded-full" />
                <p className="text-white/60 font-sans text-lg leading-relaxed">
                  A specialised 6-step process designed to identify high-performing assets while maintaining total SIS Act compliance for your fund.
                </p>
              </div>

              {/* Right — Scrollable Cards with Timeline */}
              <div className="lg:w-[62%] flex flex-col">
                {[
                  {
                    step: '01',
                    title: 'Step 1 - Fund Discovery & Analysis',
                    body: 'We review your SMSF structure, borrowing capacity, and investment objectives to ensure property is a suitable and compliant path for your retirement goals.',
                    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '02',
                    title: 'Step 2 - Team Coordination',
                    body: 'We coordinate seamlessly with your financial adviser, accountant, and auditor to ensure every part of the acquisition aligns with your fund’s specific investment strategy.',
                    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '03',
                    title: 'Step 3 - Data-Driven Market Sourcing',
                    body: 'Using specialist research, we identify high-yield (typically 5%+), low-maintenance properties in high-demand growth corridors specifically suited for SMSF holding.',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '04',
                    title: 'Step 4 - Compliance-Focused Due Diligence',
                    body: 'Every property undergoes rigorous checks, including arm\'s length valuation assessments and coordination of building and pest inspections to protect fund integrity.',
                    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '05',
                    title: 'Step 5 - Strategic Negotiation',
                    body: 'We represent your fund in negotiations, ensuring the purchase reflects genuine market value and is secured on the best possible terms for your retirement future.',
                    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '06',
                    title: 'Step 6 - Settlement & Fund Support',
                    body: 'We manage the process through to final settlement, ensuring all documentation—including bare trust arrangements—is correctly handled by your legal team.',
                    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
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
                  Is SMSF Property a Smart Move?
                </h2>
                <p className="text-lg text-slate-700 font-sans leading-relaxed mb-8">
                  SMSF property is a specialised path that requires careful consideration of your financial position and long-term retirement objectives.
                </p>
                <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8">
                  <h3 className="text-xl font-serif text-[#021f3a] mb-4">SMSF Strategy Session</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Unsure if your fund is ready? Our free strategy session will review your position honestly and guide you towards the right professionals where required.
                  </p>
                  <button
                    onClick={openCalendly}
                    className="w-full rounded-full py-4 bg-[#021f3a] text-white text-sm font-bold uppercase tracking-widest hover:bg-sky-600 transition-all duration-300"
                  >
                    Assess My Situation
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "Fund Balance", desc: "Your SMSF has a balance of around $160k+ to maintain liquidity and diversification." },
                    { title: "Steady Contributions", desc: "The fund has reliable income to support a compliant borrowing arrangement." },
                    { title: "Time Horizon", desc: "You have at least 10 years until retirement, allowing time for capital growth." },
                    { title: "Strategic Clarity", desc: "Your fund has a documented strategy that explicitly includes property." },
                    { title: "Advisory Approval", desc: "Your accountant or adviser has confirmed the approach suits your situation." },
                    { title: "Risk Awareness", desc: "You understand the compliance obligations and SIS Act fund requirements." }
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
                Why JJ Property Partner for <span className="text-sky-400">SMSF Success</span>
              </motion.h2>
              <div className="h-1.5 w-24 bg-sky-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { title: "Specialist Knowledge", desc: "Specialist SMSF property expertise backed by strong SIS Act compliance knowledge." },
                { title: "Personal Experience", desc: "Built from Alex's personal $5M+ portfolio experience across Australian cycles." },
                { title: "Advisory Coordination", desc: "We coordinate seamlessly with your adviser, accountant, auditor, and lender." },
                { title: "Data-Driven Research", desc: "Research identifying compliant, high-performing assets for your retirement fund." },
                { title: "Zero Conflict", desc: "Buyer-only advice with zero conflicts, hidden commissions, or developer ties." }
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
              <p className="text-slate-600 text-lg font-sans leading-relaxed">Everything you need to know about purchasing property through your Self-Managed Super Fund.</p>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              {smsfFaqs.map((faq, index) => (
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
                Secure your <span className="text-sky-400">retirement future.</span>
              </h2>
              <p className="text-xl text-sky-100/70 font-sans mb-12 leading-relaxed max-w-2xl mx-auto">
                Ready to explore compliant, high-performing property investments for your SMSF? Book your free, no-obligation strategy session today.
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
                  Message Alex
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
