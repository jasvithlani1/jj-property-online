import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Plus } from 'lucide-react';
import { openCalendly } from '../utils/calendly';
import { useState } from 'react';
import Link from '../components/Link';

const smsfFaqs = [
  {
    question: 'Why buy property within an SMSF?',
    answer: 'Buying property through an SMSF can offer significant tax advantages, including a reduced tax rate on rental income and potential capital gains tax exemptions when you reach the pension phase.'
  },
  {
    question: 'How much do I need in super to buy property?',
    answer: 'Generally, lenders require a minimum balance of $200,000 to $250,000 to cover the deposit, purchasing costs, and required liquidity buffers, though this depends on your specific lender and strategy.'
  },
  {
    question: 'Can I use a mortgage to buy SMSF property?',
    answer: 'Yes, this is typically done through a Limited Recourse Borrowing Arrangement (LRBA). It involves specific legal structures and strictly defined borrowing conditions.'
  },
  {
    question: 'Can I live in the property I buy with my SMSF?',
    answer: 'No. Residential property held in an SMSF must meet the "sole purpose test," meaning it must be for the sole purpose of providing retirement benefits. You or your family cannot live in it.'
  },
  {
    question: 'Do you handle the SMSF setup process?',
    answer: 'We focus exclusively on the property acquisition. We work closely with your accountant, financial planner, or SMSF specialist who handles the legal setup and compliance of the fund itself.'
  }
];

const pillars = [
  {
    title: 'SMSF-Compliant Selection',
    description: 'Investing within super requires a specific lens. We focus on low-maintenance, high-demand residential assets that align with the long-term wealth preservation goals of a self-managed fund.\n\n• Focus on structural integrity\n• High-yield residential assets\n• Low maintenance requirements\n• Long-term growth focus',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Off-Market Sourcing Strategy',
    description: 'We use our nationwide network to find properties that meet the strict criteria for SMSF lending and compliance, often securing deals before they ever reach the public market.\n\n• National network of agents\n• Pre-market opportunities\n• Less competition for quality assets\n• Direct negotiation on your behalf',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'End-to-End Coordination',
    description: 'SMSF purchases involve more "moving parts" than standard buys. We coordinate with your accountant, mortgage broker, and solicitor to ensure the acquisition meets all regulatory requirements.\n\n• Liaison with SMSF specialists\n• Managed due diligence\n• Compliance-focused reporting\n• Settlement support & coordination',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
  }
];

export default function SmsfProperty() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>SMSF Property Buyers Agent AU | JJ Property Partner</title>
        <meta name="description" content="Specialist property acquisition for Self-Managed Super Funds. We find high-performing, compliant residential assets to help grow your retirement wealth." />
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
                Strategic Acquisitions for your{' '}
                <span className="text-gold">Self-Managed Super Fund.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Unlock the power of your super with residential property. We help you identify and secure high-performing, compliant assets nationwide.
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
                Secure Your Retirement with Smart SMSF Property Choices
              </h2>
              <div className="space-y-6 text-lg text-muted font-sans leading-relaxed">
                <p>
                  Investing in residential property through an SMSF is a powerful way to build retirement wealth, but it requires a specialized approach that prioritizes compliance and long-term stability.
                </p>
                <p className="font-semibold text-[#011122]">
                  How JJ Property Partner supports SMSF investors:
                </p>
                <ul className="space-y-4 pt-2">
                  {[
                    "Selection of properties that meet strict SMSF lending and compliance criteria",
                    "Nationwide research to find the best growth and yield opportunities for your fund",
                    "Strategic off-market access to secure quality assets with less competition",
                    "Coordination with your accountant, broker, and solicitor for a seamless purchase",
                    "Expert negotiation to ensure you secure the best possible terms for your fund"
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
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1200"
                alt="Modern Residential Property"
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

        {/* The SMSF Journey Section */}
        <section className="py-16 md:py-24 px-8 bg-[#011122] text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-overlay" />
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white">Your SMSF Acquisition <span className="text-gold">Journey</span></h2>
            <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Strategy & Setup',
                  body: 'We coordinate with your financial professionals to ensure your fund is structured correctly and your investment strategy is property-ready.',
                },
                {
                  step: '02',
                  title: 'Compliant Sourcing',
                  body: 'We identify residential assets that meet SMSF lending requirements and offer the best long-term growth and yield potential.',
                },
                {
                  step: '03',
                  title: 'Managed Due Diligence',
                  body: 'Thorough inspections and professional contract reviews ensure the asset is sound and all SMSF regulatory requirements are met.',
                },
                {
                  step: '04',
                  title: 'Strategic Settlement',
                  body: 'We manage the entire process through to settlement, ensuring a seamless transition and property management setup.',
                },
              ].map((card, i) => (
                <motion.div
                  key={card.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group"
                >
                  <div className="text-gold font-serif text-5xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity">
                    {card.step}
                  </div>
                  <h3 className="text-xl font-serif text-white mb-4">
                    {card.title}
                  </h3>
                  <p className="text-white/60 font-sans text-sm leading-relaxed">
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 px-8 bg-white overflow-hidden border-t border-gold/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-6 py-2 rounded-full bg-gold/5 border border-gold/10 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-6"
              >
                SMSF Compliance
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-serif text-[#011122] mb-8 leading-[1.1]">
                SMSF Property <br />
                <span className="text-gold italic">Requirements.</span>
              </h2>
              <p className="text-xl text-muted font-sans leading-relaxed max-w-2xl mx-auto">
                Investing within super involves specific rules and lending criteria. We help you navigate these requirements to ensure your purchase is both compliant and successful.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line connector */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/10 to-transparent transform md:-translate-x-1/2 hidden sm:block" />

              <div className="flex flex-col gap-12 relative z-10">
                {[
                  { title: "Sole Purpose Test", desc: "The investment must be for the sole purpose of providing retirement benefits to members." },
                  { title: "No Personal Use", desc: "You or your family cannot live in or use the residential property held by your fund." },
                  { title: "Arm's Length", desc: "All transactions must be conducted on a purely commercial, arm's-length basis." },
                  { title: "Lending Rules", desc: "Borrowing is typically done through a Limited Recourse Borrowing Arrangement (LRBA)." },
                  { title: "Liquidity Buffer", desc: "Lenders often require a cash buffer within the fund after the property purchase." },
                  { title: "Single Title", desc: "SMSF borrowing rules usually require the property to be on a single title asset." }
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
                
                <h3 className="text-4xl font-serif text-white mb-6 relative z-10">Discuss Your SMSF Strategy</h3>
                <p className="text-white/60 text-lg mb-10 leading-relaxed relative z-10 max-w-xl mx-auto">
                  Ready to build your retirement wealth? Our free discovery call will review your fund's goals and map out a compliant property acquisition path.
                </p>
                <button
                  onClick={openCalendly}
                  className="rounded-full px-16 py-5 bg-gold text-white text-base font-bold uppercase tracking-widest hover:bg-gold-hover hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer relative z-10 shadow-2xl shadow-gold/20"
                >
                  Book Discovery Call
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20 md:py-32 bg-white px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-5xl md:text-6xl font-serif text-[#011122] leading-tight mb-8">
                SMSF <br />
                <span className="text-gold">Questions.</span>
              </h2>
              <p className="text-muted text-lg font-sans leading-relaxed">Essential insights for buying residential property within super.</p>
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
        <section className="py-20 md:py-32 px-8 bg-[#011122] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-11ee21264004?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-8 leading-tight">
                Secure your <span className="text-gold">future</span> today.
              </h2>
              <p className="text-xl text-white/70 font-sans mb-12 leading-relaxed max-w-2xl mx-auto">
                Ready to explore how residential property can grow your super? Book your free discovery call with Alex today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button
                  onClick={openCalendly}
                  className="rounded-full px-12 py-5 bg-gold text-white text-sm font-bold uppercase tracking-widest hover:bg-gold-hover hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 shadow-2xl shadow-gold/40 cursor-pointer"
                >
                  Book Discovery Call
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
