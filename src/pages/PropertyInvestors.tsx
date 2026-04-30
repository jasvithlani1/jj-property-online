import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Plus } from 'lucide-react';
import { openCalendly } from '../utils/calendly';
import { useState } from 'react';
import Link from '../components/Link';

const investorFaqs = [
  {
    question: 'How do you identify high-growth suburbs for investors?',
    answer: 'We use a data-driven framework that analyses vacancy rates, yield trends, infrastructure investment, and population growth drivers across Australia to identify areas with strong capital growth potential.'
  },
  {
    question: 'Can you help with off-market investment properties?',
    answer: 'Yes. We have an extensive network of sales agents across Australia, giving our clients access to properties before they are listed on major portals like realestate.com.au or Domain.'
  },
  {
    question: 'What types of properties do you recommend for long-term growth?',
    answer: 'We typically focus on well-located residential houses and dual-occupancy properties in established or high-growth corridors that offer a balance of capital upside and sustainable rental yield.'
  },
  {
    question: 'How do you manage the due diligence process?',
    answer: 'We coordinate everything from building and pest inspections to contract reviews with your solicitor, ensuring every purchase is backed by thorough research and professional scrutiny.'
  },
  {
    question: 'What is your fee structure for property investors?',
    answer: 'We offer transparent, fixed or percentage-based fee structures tailored to the complexity of your search and acquisition strategy. We discuss this clearly during our initial discovery call.'
  }
];

const pillars = [
  {
    title: 'Data-Led Research & Selection',
    description: 'We use professional analysis tools to identify high-performing suburbs nationwide. Our research focuses on areas with confirmed infrastructure projects, low vacancy rates, and strong population growth.\n\n• National market exposure\n• Suburb-specific growth drivers\n• Detailed yield & vacancy analysis\n• Infrastructure & development tracking',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Off-Market Property Sourcing',
    description: 'Access properties that never reach the public portals. We use our deep industry network to uncover high-quality investment opportunities with less competition and better buying terms.\n\n• Early access to pre-market deals\n• Exclusive off-market opportunities\n• Direct relationships with sales agents\n• Reduced competition on quality assets',
    image: 'https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Strategic Portfolio Execution',
    description: 'We don\'t just buy a house; we execute an acquisition strategy. Every purchase is carefully assessed for its role in your 5-10 year wealth creation plan, equity growth, and future borrowing capacity.\n\n• Professional negotiation representation\n• Managed due diligence & inspections\n• Strategic auction representation\n• Settlement coordination & support',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
  }
];

export default function PropertyInvestors() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>Property Investment Buyers Agent AU | JJ Property Partner</title>
        <meta name="description" content="Strategic property acquisition for serious investors. Use data-driven research and off-market access to build a high-performing property portfolio." />
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
                Property Investors
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] mb-8 max-w-5xl mx-auto px-4">
                Acquisition Strategies Engineered for{' '}
                <span className="text-gold">Investment Precision.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Building a high-performing property portfolio requires more than guesswork. It demands systematic research, strategic timing, and professional execution.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-12 md:py-20 px-8 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#011122] mb-6 leading-tight">
                Precise Acquisition Strategies for Property Investors
              </h2>
              <div className="space-y-6 text-lg text-muted font-sans leading-relaxed">
                <p>
                  Building a high-performing property investment portfolio demands systematic research, disciplined acquisition criteria, strategic timing, and professional execution at every stage.
                </p>
                <p className="font-semibold text-[#011122]">
                  JJ Property Partner gives investors a clear strategic edge:
                </p>
                <ul className="space-y-4 pt-2">
                  {[
                    "Access to data-led research and suburb analysis to identify growth opportunities early",
                    "Off-market and pre-market access with less competition and stronger buying positions",
                    "Skilled negotiation that helps secure better terms than going it alone",
                    "A long-term portfolio strategy focused on 5-10 year wealth creation",
                    "Close collaboration with your broker, accountant, and financial adviser"
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
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
                alt="Modern Residential Building"
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

        {/* Strategic Portfolio Section */}
        <section className="py-12 md:py-20 px-8 bg-[#011122] text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-overlay" />
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

              {/* Left — Sticky Panel */}
              <div className="lg:w-[38%] lg:sticky lg:top-[30vh] lg:self-start">
                <div className="mb-6">
                <div className="h-1 w-16 bg-gold mb-8 rounded-full" />
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                  Strategic Portfolio <br />
                  <span className="text-gold">Execution</span>
                </h2>
                <p className="text-white/60 font-sans text-lg leading-relaxed">
                  Alex has built a personal property portfolio valued at more than $5 million across several Australian states. That hands-on experience shapes an investment approach focused on long-term portfolio growth, not just individual purchases.
                </p>
              </div>
            </div>

              {/* Right — Scrollable Cards with Timeline */}
              <div className="lg:w-[62%] flex flex-col">
                {[
                  {
                    step: '01',
                    title: 'Step 1 - Investment Thesis & Strategy',
                    body: 'Define a clear investment strategy tailored to your goals, focusing on capital growth, rental yield, or a balanced approach that supports your wealth creation objectives.',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
                  },
                  {
                    step: '02',
                    title: 'Step 2 - Long-Term Acquisition Roadmap',
                    body: 'Build a 5 to 10 year acquisition plan aligned with your current income, borrowing power, and risk profile to map out a clear path for sustainable growth.',
                    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
                  },
                  {
                    step: '03',
                    title: 'Step 3 - Geographic Diversification',
                    body: 'Spread your property investments across different states and locations to minimise concentration risk and take advantage of varied market cycles across Australia.',
                    image: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=1200',
                  },
                  {
                    step: '04',
                    title: 'Step 4 - Growth & Cash Flow Balance',
                    body: 'Identify the right balance between high-growth properties and assets that support stronger cash flow to ensure your portfolio remains healthy and manageable.',
                    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200',
                  },
                  {
                    step: '05',
                    title: 'Step 5 - Future Acquisition Planning',
                    body: 'Plan each purchase with the next one in mind, carefully considering your equity position, finance capacity, and tax planning to keep your momentum going.',
                    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200',
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

        <section className="py-16 md:py-24 px-8 bg-white overflow-hidden border-t border-gold/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-6 py-2 rounded-full bg-gold/5 border border-gold/10 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-6"
              >
                Investor Readiness
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-serif text-[#011122] mb-8 leading-[1.1]">
                Is Property Investment <br />
                <span className="text-gold italic">Right for You?</span>
              </h2>
              <p className="text-xl text-muted font-sans leading-relaxed max-w-2xl mx-auto">
                Strategic property investment is a long-term commitment to wealth creation. We help you determine if your current position aligns with a successful acquisition strategy.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line connector */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/10 to-transparent transform md:-translate-x-1/2 hidden sm:block" />

              <div className="flex flex-col gap-12 relative z-10">
                {[
                  { title: "Minimum Equity", desc: "You have available equity in your home or a deposit of at least $100k-$150k." },
                  { title: "Long-Term Mindset", desc: "You view property as a 10-20 year wealth creation vehicle, not a quick win." },
                  { title: "Stable Cash Flow", desc: "You have a steady income to support property holding costs and maintenance." },
                  { title: "Borrowing Power", desc: "You have a clear understanding of your current and future borrowing capacity." },
                  { title: "Risk Appetite", desc: "You are comfortable with market cycles and understand the role of leverage." },
                  { title: "Strategic Goals", desc: "You have clear retirement or lifestyle goals that property will help fund." }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-20`}
                  >
                    <div className="flex-1 text-center md:text-left">
                      <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'} gap-4`}>
                        <span className="text-gold font-sans text-xs font-black uppercase tracking-[0.3em]">0{idx + 1}</span>
                        <h4 className={`text-3xl font-serif text-[#011122] ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>{item.title}</h4>
                        <p className={`text-base text-muted leading-relaxed font-sans max-w-sm ${idx % 2 === 0 ? 'md:text-right ml-auto' : 'md:text-left mr-auto'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-center shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-gold shadow-[0_0_20px_rgba(200,169,106,0.3)] z-10 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gold animate-pulse" />
                      </div>
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-32 max-w-3xl mx-auto"
            >
              <div className="bg-[#011122] text-white rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden group text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] -mr-32 -mt-32 group-hover:bg-gold/20 transition-colors" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 blur-[80px] -ml-32 -mb-32" />
                
                <h3 className="text-4xl font-serif text-white mb-6 relative z-10">Investor Strategy Session</h3>
                <p className="text-white/60 text-lg mb-10 leading-relaxed relative z-10 max-w-xl mx-auto">
                  Ready to build a nationwide portfolio? Our free session will review your current equity, borrowing power, and investment objectives to map out a clear path forward.
                </p>
                <button
                  onClick={openCalendly}
                  className="rounded-full px-16 py-5 bg-gold text-white text-base font-bold uppercase tracking-widest hover:bg-gold-hover hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer relative z-10 shadow-2xl shadow-gold/20"
                >
                  Discuss My Strategy
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why JJ Property Partner Section */}
        <section className="pt-16 md:pt-24 pb-8 md:pb-12 px-8 bg-[#011122] text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6"
              >
                Why JJ Property Partner for <span className="text-gold">Investor Success</span>
              </motion.h2>
              <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { title: "IT-Powered Research", desc: "Alex's background in data analysis gives you an unfair advantage in selection." },
                { title: "Proven Experience", desc: "Built from Alex's personal $5M+ portfolio across multiple Australian states." },
                { title: "Off-Market Access", desc: "Direct access to properties before they hit the market, reducing competition." },
                { title: "Portfolio Mindset", desc: "We don't just buy a house; we build a strategic 5-10 year acquisition plan." },
                { title: "Zero Conflict", desc: "100% buyer's representation with no ties to developers or projects." }
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
        <section className="relative pt-8 md:pt-12 pb-4 md:pb-6 bg-white px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-5xl md:text-6xl font-serif text-[#011122] leading-tight mb-8">
                Frequently <br />
                <span className="text-gold">asked questions.</span>
              </h2>
              <p className="text-muted text-lg font-sans leading-relaxed">Strategic insights for property investors building nationwide portfolios.</p>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              {investorFaqs.map((faq, index) => (
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
                    <span className={`text-xl sm:text-2xl font-sans font-semibold transition-colors duration-300 ${openFaq === index ? 'text-gold' : 'text-muted group-hover:text-gold'}`}>
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
        <section className="pt-4 md:pt-6 pb-20 md:pb-32 px-8 bg-[#011122] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-8 leading-tight">
                Build your <span className="text-gold">portfolio</span> with precision.
              </h2>
              <p className="text-xl text-white/70 font-sans mb-12 leading-relaxed max-w-2xl mx-auto">
                Ready to take your property investment strategy to the next level? Book your free, no-obligation strategy session with Alex today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button
                  onClick={openCalendly}
                  className="rounded-full px-12 py-5 bg-gold text-white text-sm font-bold uppercase tracking-widest hover:bg-gold-hover hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 shadow-2xl shadow-gold/40 cursor-pointer"
                >
                  Book Free Session
                </button>
                <Link
                  href="/contact"
                  className="rounded-full px-12 py-5 border border-white/20 bg-white/5 text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#011122] transition-all duration-300"
                >
                  Message Alex
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
