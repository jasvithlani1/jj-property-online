import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
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
    title: 'Investor-Focused Market Intelligence',
    description: 'At JJ Property Partner, we use IT-backed data analysis to assess investment opportunities across property markets throughout Australia. Instead of relying on broad suburb reports, we apply a more strategic framework that examines:\n\n• Historical price trends and the current market cycle\n• Gross and net rental yields, along with vacancy rate movements\n• Upcoming infrastructure projects such as transport, hospitals, universities, and business hubs\n• Population growth projections and migration trends\n• Supply and demand conditions, including approvals, completions, and available stock\n• Proximity to employment hubs and local economic activity\n• Demographic profiles and socioeconomic movement\n\nThis layered analysis helps identify suburbs with strong upside potential early, allowing our clients to buy at the right stage of the cycle rather than entering after the market has already peaked.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Identifying Properties with Strong Growth',
    description: 'In high-performing locations, we identify the right property types and features that support stronger returns and long-term portfolio growth:\n\n• High-yield residential properties that deliver solid cash flow from the outset\n• Dual income opportunities, including dual occupancy and granny flat potential\n• Value-add properties with renovation, subdivision, or development upside\n• Properties near major infrastructure projects backed by confirmed government funding\n• Emerging growth corridor properties positioned before wider market demand increases',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Negotiating Smarter. Securing Better Outcomes',
    description: 'Finding the right investment property is only one part of the process. Securing it at the right price and under the right conditions is just as important for long-term performance. JJ Property Partner applies tailored negotiation strategies to help property investors purchase with greater clarity and confidence:\n\n• Comparable sales research and independent value assessment\n• Vendor motivation analysis to uncover negotiating advantages\n• Pre-auction strategy with firm limits and bidding direction\n• Contract negotiation including settlement terms, conditions, and deposit structure\n• End-to-end coordination through exchange and settlement',
    image: '/negotiation_meeting.png',
  }
];

export default function PropertyInvestors() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>Property Investors Strategy AU | JJ Property Partner</title>
        <meta name="description" content="Grow your portfolio with expert buyer agents at JJ Property Partner. Data-driven property investment, off-market deals, and nationwide opportunities." />
      </Helmet>
      
      <div className="w-full bg-white selection:bg-black/10 pt-20">
        {/* Hero Section */}
        <section className="relative px-6 py-8 sm:px-8 sm:py-10 md:pt-16 md:pb-16 bg-[#021f3a] text-white overflow-hidden">
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.1] mb-8 max-w-5xl mx-auto px-4">
                Precise Acquisition Strategies for{' '}
                <span className="text-sky-400">Property Investors</span>
              </h1>
              <div className="text-lg md:text-xl text-sky-100/80 font-sans max-w-4xl mx-auto leading-relaxed space-y-6">
                <p>
                  Building a strong investment portfolio takes more than chasing a hotspot or following market noise. It requires clear strategy, careful research, disciplined buying criteria, smart timing, and expert guidance to secure properties that support long-term growth and cash flow.
                </p>
                <p>
                  JJ Property Partner works exclusively for buyers, helping property investors across Australia purchase with confidence. Alex combines 20+ years of IT and data expertise with hands-on experience building a $5M+ portfolio, delivering advice that is strategic, practical, and backed by real-world results.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Smart Investors Choose JJ Property Partner Section */}
        <section className="py-16 md:py-20 px-8 bg-sky-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#011122] mb-6 leading-tight">
                Why Smart Investors Choose JJ Property Partner
              </h2>
              <div className="space-y-6 text-lg text-slate-700 font-sans leading-relaxed">
                <p>
                  Most property investors do their own research, relying on public data that can be outdated, incomplete, or difficult to interpret accurately. As a result, they often compete for the same listed properties, overpay in competitive markets, and miss valuable off-market opportunities where stronger purchases are often secured.
                </p>
                <p className="font-semibold text-[#021f3a]">
                  JJ Property Partner gives investors a clear strategic edge:
                </p>
                <ul className="space-y-4">
                  {[
                    "Access to data-led research and suburb analysis to identify growth opportunities early",
                    "Off-market and pre-market access with less competition and stronger buying positions",
                    "Skilled negotiation that helps secure better terms than going it alone",
                    "A long-term portfolio strategy focused on 5-10 year wealth creation",
                    "Close collaboration with your broker, accountant, and financial adviser"
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
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=900" alt="Smart Investment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>
        </section>

        {/* Our Approach Pillar Introduction */}
        <section className="py-12 md:py-16 px-8 bg-white text-center">
          <div className="max-w-4xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-serif text-[#011122] mb-6">Our Approach to Strategic Property Acquisition</h2>
             <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full" />
          </div>
        </section>

        {/* Content Pillars */}
        <section className="py-8 md:py-10 px-6 md:px-8 bg-white pb-20">
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

        {/* Strategic Portfolio Building Section */}
        <section className="py-16 md:py-24 px-8 bg-[#021f3a] text-white relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-overlay" />
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

              {/* Left — Sticky Panel */}
              <div className="lg:w-[38%] lg:sticky lg:top-[30vh] lg:self-start">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">Our Strategy</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
                  Strategic Portfolio Building for{' '}
                  <span className="text-sky-300">Investors</span>
                </h2>
                <div className="h-1 w-16 bg-sky-400 mb-8 rounded-full" />
                <p className="text-white/60 font-sans text-lg leading-relaxed">
                  Alex has built a personal property portfolio valued at more than $5 million across several Australian states. That hands-on experience shapes an investment approach focused on long-term portfolio growth, not just individual purchases.
                </p>
              </div>

              {/* Right — Scrollable Cards with Timeline */}
              <div className="lg:w-[62%] flex flex-col">
                {[
                  {
                    step: '01',
                    title: 'Step 1 - Investment Thesis & Strategy',
                    body: 'Define a clear investment strategy tailored to your goals, focusing on capital growth, rental yield, or a balanced approach that supports your wealth creation objectives.',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '02',
                    title: 'Step 2 - Long-Term Acquisition Roadmap',
                    body: 'Build a 5 to 10 year acquisition plan aligned with your current income, borrowing power, and risk profile to map out a clear path for sustainable growth.',
                    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '03',
                    title: 'Step 3 - Geographic Diversification',
                    body: 'Spread your property investments across different states and locations to minimise concentration risk and take advantage of varied market cycles across Australia.',
                    image: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '04',
                    title: 'Step 4 - Growth & Cash Flow Balance',
                    body: 'Identify the right balance between high-growth properties and assets that support stronger cash flow to ensure your portfolio remains healthy and manageable.',
                    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
                  },
                  {
                    step: '05',
                    title: 'Step 5 - Future Acquisition Planning',
                    body: 'Plan each purchase with the next one in mind, carefully considering your equity position, finance capacity, and tax planning to keep your momentum going.',
                    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
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
        <section className="relative py-16 md:py-20 bg-gradient-to-b from-white to-sky-50 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-5xl md:text-6xl font-serif text-black leading-tight mb-6">
                Frequently <br />
                <span className="text-muted">asked questions.</span>
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
        <section className="py-16 md:py-20 px-8 bg-[#011122] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Ready to scale your <span className="text-sky-400">portfolio</span>?
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
