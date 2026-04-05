import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { openCalendly } from '../utils/calendly';

const pillars = [
  {
    title: 'Strategic Portfolio Growth',
    description: 'Building a high-performance property portfolio requires structured planning and disciplined execution. At JJ Property Partner PTY LTD, Parramatta, NSW, we operate as a trusted property buyers agent Sydney, focusing on data-driven acquisitions aligned with your financial goals.\n\nThrough suburb-level growth analysis, rental yield assessment, and long-term capital forecasting, we identify assets positioned for sustainable performance, ensuring each acquisition strengthens portfolio scalability, minimises risk, and delivers consistent returns.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900', // Investor vibe
  },
  {
    title: 'Advanced Acquisition Intelligence',
    description: 'As a specialist investment buyers agent Sydney, JJ Property Partner PTY LTD, Parramatta, NSW leverages advanced market intelligence to uncover opportunities before they reach public platforms.\n\nWe identify dual-income properties, granny flat potential, and high-yield assets within emerging growth corridors. Through strong off-market networks, we help clients bypass competition, preserve capital, and secure properties based on verified data insights rather than emotional market pressures.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=900', // Charts/Growth vibe
  },
  {
    title: 'Precision Negotiation and Execution',
    description: 'Execution is where true value is realised. At JJ Property Partner PTY LTD, Parramatta, NSW, we implement tailored negotiation strategies based on vendor motivation, market conditions, and asset positioning. Acting solely in your interest, we maintain strict financial discipline while securing properties at optimal value.\n\nFrom acquisition strategy and due diligence to final settlement, our process is designed to maximise net portfolio returns and support long-term wealth creation.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=900', // House/Asset vibe
  }
];

export default function PropertyInvestors() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Property Investors | JJ Property Partner</title>
        <meta name="description" content="Acquisition strategies engineered for investment precision. Explore our approach to strategic portfolio growth." />
      </Helmet>
      
      <div className="w-full bg-white selection:bg-black/10 pt-32">
        {/* Hero Section */}
        <section className="relative px-8 py-20 md:py-32 bg-[#021f3a] text-white overflow-hidden">
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
                Property Investors
              </div>
              <h1 className="text-4xl md:text-6xl font-serif leading-[1.1] mb-8 max-w-4xl mx-auto">
                Acquisition strategies engineered for{' '}
                <span className="italic text-sky-400">investment precision.</span>
              </h1>
              <p className="text-lg md:text-xl text-sky-100/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Every brief is strategically defined. Every acquisition is optimised for maximum portfolio return. Explore the three core pillars of the JJ Property Partner investment approach.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Pillars */}
        <section className="py-20 md:py-32 px-6 md:px-8 bg-white">
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

        {/* CTA Section */}
        <section className="py-24 px-8 bg-[#011122] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Ready to scale your <span className="italic text-sky-400">portfolio</span>?
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
