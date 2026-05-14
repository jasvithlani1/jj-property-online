import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { openCalendly } from '../utils/calendly';
import Link from '../components/Link';
import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import SEO from '../components/SEO';

const commercialFaqs = [
  {
    question: 'How do you find high-growth suburbs for commercial property investors?',
    answer: 'We use a data-led framework that reviews vacancy rates, rental yield trends, infrastructure spending and population growth across Australia to pinpoint suburbs with strong long-term capital growth potential.'
  },
  {
    question: 'Can you help with off-market investment properties?',
    answer: 'Yes. We have an extensive network of sales agents across Australia, giving our clients access to properties before they are listed on major portals like realestate.com.au or Domain.'
  },
  {
    question: 'Do you help investors compare commercial properties before buying?',
    answer: 'Yes. We assess location, rental potential, lease terms, tenant quality, yield, future growth prospects and risk factors so you can make a more informed commercial property decision.'
  },
  {
    question: 'What types of commercial properties do you recommend for long-term growth?',
    answer: 'We generally focus on well-positioned commercial properties in established or emerging growth corridors that offer strong tenant appeal, future capital upside, and reliable rental income potential.'
  },
  {
    question: 'How do you manage due diligence for commercial property purchases?',
    answer: 'We coordinate key checks, from building and pest inspections to contract reviews with your solicitor, ensuring every purchase is supported by detailed research and professional assessment.'
  },
  {
    question: 'What is your fee structure for commercial property investors?',
    answer: 'We offer clear fixed-fee or percentage-based structures, depending on your commercial property brief, search requirements, and acquisition strategy. Everything is discussed upfront during your initial discovery call.'
  }
];

const pillars = [
  {
    title: 'Data-Driven Research & Property Selection',
    description: 'We use professional market research to identify strong commercial property opportunities across Australia. Our analysis focuses on suburbs with planned infrastructure, low vacancy levels, population growth, and long-term investment potential.\n\n• National commercial market insight\n• Suburb-based growth indicators\n• Yield and vacancy performance review\n• Infrastructure and development monitoring',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Off-Market Commercial Property Access',
    description: 'Access commercial assets before they appear on public listing portals. Through strong agent relationships and market connections, we help investors uncover quality opportunities with less buyer competition and stronger negotiation potential.\n\n• Early access to pre-market commercial deals\n• Exclusive off-market investment opportunities\n• Direct relationships with commercial sales agents\n• Reduced competition on high-quality assets',
    image: 'https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Commercial Portfolio Planning',
    description: 'We don’t just secure a commercial property; we plan a portfolio move. Every acquisition is assessed for its place in your 5-10-year investment strategy, income potential, equity growth, and future lending capacity.\n\n• Professional negotiation representation\n• Managed due diligence and property inspections\n• Strategic auction and offer representation\n• Settlement coordination and ongoing support',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
  }
];

export default function CommercialProperty() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const query = `*[_type == "servicePage" && slug.current == "commercial-property"][0] {
          seo,
          hero,
          intro,
          pillars,
          process,
          readiness,
          whyJJ,
          faqs,
          finalCta
        }`;
        const data = await client.fetch(query);
        if (data) setPageData(data);
      } catch (err) {
        console.error('Error fetching Commercial Property page data:', err);
      }
    };
    fetchPageData();
  }, []);

  return (
    <>
      <SEO 
        title={pageData?.seo?.metaTitle || "Commercial Property Investment Buyers Agent AU"}
        description={pageData?.seo?.metaDescription || "Strategic property acquisition for serious businesses and commercial investors. Use data-driven research and off-market access to build a high-performing property portfolio."}
        image={pageData?.seo?.ogImage}
        keywords={pageData?.seo?.keywords}
      />
      
      <div className="w-full bg-white selection:bg-gold/20 ">
        {/* Hero Section */}
        <section className="pt-32 md:pt-44 relative px-6 py-2 sm:px-8 sm:py-4 md:pb-4 bg-[#011122] text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 blur-[160px] rounded-full -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full -z-0 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-7 py-3 rounded-full border border-gold/40 bg-white/10 text-sm font-bold uppercase tracking-[0.2em] text-white mb-6 backdrop-blur-sm">
                {pageData?.hero?.badge === "Commercial Property Strategies with Investment Precision." ? "Commercial Property" : (pageData?.hero?.badge || "Commercial Property")}
              </div>
              <h1 className="text-4xl sm:text-4xl md:text-5xl font-serif leading-[1.1] mb-6 max-w-5xl mx-auto px-4 text-gold">
                {pageData?.hero?.heading || "Acquisition Strategies Engineered for Investment Precision."}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-sans max-w-3xl mx-auto leading-relaxed">
                {pageData?.hero?.subheading || "Commercial property investment requires more than assumption. It needs structured market research, strategic acquisition planning, and expert execution to build long-term portfolio performance."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-2 md:py-1 px-8 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#011122] mb-6 leading-tight">
                {pageData?.intro?.heading || "Commercial Acquisition Strategies for Smart Property Investors"}
              </h2>
              <div className="space-y-2 text-lg text-muted font-sans leading-relaxed">
                <p>
                  {pageData?.intro?.content || "Creating a strong commercial property portfolio requires market-led research, clear acquisition benchmarks, strategic timing, and expert execution throughout the process."}
                </p>
                <p className="font-semibold text-[#011122]">
                  {pageData?.intro?.benefitTitle || "JJ Property Partner gives investors a sharper strategic advantage"}
                </p>
                <ul className="space-y-4 pt-2">
                  {(pageData?.intro?.benefits || [
                    "Data-backed research and suburb analysis to uncover commercial growth opportunities sooner",
                    "Off-market and pre-market property access with reduced competition and stronger buying leverage",
                    "Experienced negotiation support to help secure stronger terms than buying independently",
                    "A long-term portfolio strategy designed around 5-10-year wealth creation",
                    "Coordinated support with your broker, accountant, and financial adviser for informed decisions"
                  ]).map((item: string, idx: number) => (
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
                src={pageData?.intro?.image ? urlFor(pageData.intro.image).url() : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"}
                alt="Modern Commercial Building"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Content Pillars */}
        <section className="py-1 md:py-2 px-6 md:px-8 bg-neutral-50">
          <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-12">
            {(pageData?.pillars || pillars).map((pillar: any, index: number) => (
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
                    {(pillar.description || "").split('\n\n').map((paragraph: string, pIdx: number) => {
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
                    src={pillar.image?.asset ? urlFor(pillar.image).url() : (typeof pillar.image === 'string' ? pillar.image : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200")}
                    alt={pillar.title}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Strategic Portfolio Section */}
        <section className="py-2 md:py-1 px-8 bg-[#011122] text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-overlay" />
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

              {/* Left — Sticky Panel */}
              <div className="lg:w-[38%] lg:sticky lg:top-[30vh] lg:self-start">
                <div className="mb-6">
                  <div className="h-1 w-16 bg-gold mb-8 rounded-full" />
                  <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                    {pageData?.process?.heading || (
                      <>Commercial Portfolio <br /> <span className="text-gold">Strategy</span></>
                    )}
                  </h2>
                  <p className="text-white/60 font-sans text-lg leading-relaxed">
                    {pageData?.process?.description || "Alex’s personal experience building a $5 million-plus property portfolio across multiple Australian states supports a strategic commercial investment approach focused on sustainable portfolio growth, not only single property acquisitions."}
                  </p>
                </div>
              </div>

              {/* Right — Scrollable Cards with Timeline */}
              <div className="lg:w-[62%] flex flex-col">
                {(pageData?.process?.steps || [
                  { stepNumber: '01', title: 'Step 1 - Investment Strategy & Acquisition Thesis', body: 'Build a clear commercial acquisition thesis aligned with your investment goals, whether targeting capital growth, strong rental yield, or a balanced strategy that supports long-term wealth creation.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200' },
                  { stepNumber: '02', title: 'Step 2 - Strategic Long-Term Property Acquisition Plan', body: 'Develop a 5-to-10-year commercial acquisition plan aligned with your income, borrowing capacity, and risk appetite, creating a clear roadmap for sustainable portfolio growth.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200' },
                  { stepNumber: '03', title: 'Step 3 - Strategic Location Diversification', body: 'Diversify your commercial property investments across key Australian locations to reduce concentration risk and capture growth opportunities across different market cycles.', image: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=1200' },
                  { stepNumber: '04', title: 'Step 4 - Balancing Growth Potential with Cash Flow', body: 'Balance future capital growth with reliable rental income by choosing commercial assets that keep your portfolio stable, manageable, and positioned for long-term returns.', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200' },
                  { stepNumber: '05', title: 'Step 5 - Plan Future Property Acquisitions', body: 'Plan every purchase with future growth in mind, reviewing equity, borrowing capacity, and tax considerations to support steady progress toward your next commercial property acquisition.', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200' }
                ]).map((card: any, i: number, arr: any[]) => (
                  <div key={card.stepNumber || i} className="flex items-stretch gap-4 md:gap-6 relative">
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

                    <div className={`flex-1 ${i < arr.length - 1 ? 'pb-4' : ''}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={card.image?.asset ? urlFor(card.image).url() : (typeof card.image === 'string' ? card.image : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200")}
                            alt={card.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#011122]/90 via-[#011122]/20 to-transparent" />
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold/90 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                            Step {card.stepNumber || (i + 1)}
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

        <section className="py-2 md:py-1 px-8 bg-white overflow-hidden border-t border-gold/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-6 py-2 rounded-full bg-gold/5 border border-gold/10 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4"
              >
                {pageData?.readiness?.badge || "Commercial Investor Readiness"}
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#011122] mb-4 leading-[1.1]">
                {pageData?.readiness?.heading || (
                  <>Is Commercial Property Investment <br /> <span className="text-gold ">Right for You?</span></>
                )}
              </h2>
              <p className="text-xl text-muted font-sans leading-relaxed max-w-2xl mx-auto">
                {pageData?.readiness?.description || "Strategic commercial property investment is a long-term commitment to wealth creation. We help determine whether your current position aligns with a successful commercial acquisition strategy."}
              </p>
            </div>

            <div className="relative">
              {/* Vertical line connector */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/10 to-transparent transform md:-translate-x-1/2 hidden sm:block" />

              <div className="flex flex-col gap-12 relative z-10">
                {(pageData?.readiness?.items || [
                  { title: "Capital Position", description: "You have usable equity in your home or a deposit of at least $100k-$150k." },
                  { title: "Commercial Outlook", description: "You see commercial property as a long-term wealth strategy, not a short-term gain." },
                  { title: "Reliable Income", description: "You have steady cash flow to manage loan repayments, vacancies, and holding costs." },
                  { title: "Finance Readiness", description: "You understand your borrowing capacity and how lenders assess commercial property finance." },
                  { title: "Market Confidence", description: "You are comfortable with lease terms, market cycles, risk, and commercial property leverage." },
                  { title: "Investment Direction", description: "You have clear income, retirement, or portfolio goals that property can help support." }
                ]).map((item: any, idx: number) => (
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
                        <span className="text-gold font-sans text-xs font-bold uppercase tracking-[0.3em]">0{idx + 1}</span>
                        <h4 className={`text-3xl font-serif text-[#011122] ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>{item.title}</h4>
                        <p className={`text-base text-muted leading-relaxed font-sans max-w-sm ${idx % 2 === 0 ? 'md:text-right ml-auto' : 'md:text-left mr-auto'}`}>
                          {item.description || item.desc}
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
              className="mt-4 max-w-3xl mx-auto"
            >
              <div className="bg-[#011122] text-white rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden group text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] -mr-32 -mt-4 group-hover:bg-gold/20 transition-colors" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 blur-[80px] -ml-32 -mb-3" />
                
                <h3 className="text-4xl font-serif text-white mb-6 relative z-10">{pageData?.readiness?.cta?.title || "Commercial Property Strategy Session"}</h3>
                <p className="text-white/60 text-lg mb-2 leading-relaxed relative z-10 max-w-xl mx-auto">
                  {pageData?.readiness?.cta?.description || "Ready to build a stronger national portfolio? Our free session reviews your available equity, borrowing capacity, and investment goals to help map a clear, practical path forward."}
                </p>
                <button
                  onClick={openCalendly}
                  className="rounded-full px-16 py-5 bg-gold text-white text-base font-bold uppercase tracking-widest hover:bg-gold-hover hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer relative z-10 shadow-2xl shadow-gold/20"
                >
                  {pageData?.readiness?.cta?.buttonText || "Discuss My Strategy"}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why JJ Property Partner Section */}
        <section className="pt-2 pb-2 px-8 bg-[#011122] text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6"
              >
                {pageData?.whyJJ?.heading || (
                  <>Why JJ Property Partner Drives <span className="text-gold">Investor Success</span></>
                )}
              </motion.h2>
              <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {(pageData?.whyJJ?.reasons || [
                { title: "IT-Powered Research", desc: "Alex’s IT and data analysis background gives you a sharper edge when assessing commercial property opportunities." },
                { title: "Proven Portfolio", desc: "Built on Alex’s personal $6M+ property portfolio across multiple Australian states." },
                { title: "Off-Market Access", desc: "Gain access to commercial properties before they reach the open market, helping reduce buyer competition." },
                { title: "Portfolio Planning", desc: "We do not focus on one purchase only. We help shape a strategic 5-10 year acquisition plan." },
                { title: "Buyer-Only Advice", desc: "100% buyer representation with no developer ties, project affiliations, or selling-side conflicts." }
              ]).map((item: any, idx: number) => (
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
                  <p className="text-sm text-white/60 leading-relaxed font-sans">{item.description || item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative pt-2 pb-2 bg-white px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-4xl md:text-5xl font-serif text-[#011122] leading-tight mb-8">
                Frequently <br />
                <span className="text-gold">asked questions.</span>
              </h2>
              <p className="text-muted text-lg font-sans leading-relaxed">Strategic insights for property businesses and commercial investors building nationwide portfolios.</p>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              {(pageData?.faqs || commercialFaqs).map((faq: any, index: number) => (
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
        <section className="pt-2 pb-4 px-8 bg-[#011122] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-4xl md:text-5xl font-serif mb-8 leading-tight">
                {pageData?.finalCta?.heading || (
                  <>Strengthen Your Investment <br /> <span className="text-gold ">Advantage.</span></>
                )}
              </h2>
              <p className="text-xl text-white/70 font-sans mb-3 leading-relaxed max-w-2xl mx-auto">
                {pageData?.finalCta?.description || "Ready to move your commercial property investment strategy forward? Book your free, no-obligation strategy session with Alex today."}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button
                  onClick={openCalendly}
                  className="rounded-full px-12 py-5 bg-gold text-white text-sm font-bold uppercase tracking-widest hover:bg-gold-hover hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 shadow-2xl shadow-gold/40 cursor-pointer"
                >
                  {pageData?.finalCta?.primaryButtonText || "Book Free Session"}
                </button>
                <Link
                  href="/contact"
                  className="rounded-full px-12 py-5 border border-white/20 bg-white/5 text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#011122] transition-all duration-300"
                >
                  {pageData?.finalCta?.secondaryButtonText || "Message Alex"}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
