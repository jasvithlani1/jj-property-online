import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { openCalendly } from '../utils/calendly';

const pillars = [
  {
    title: 'Strategic SMSF Property Investment',
    description: 'SMSF property investment Sydney requires precision, compliance, and long-term vision. At JJ Property Partner PTY LTD, Parramatta, NSW, we guide clients through complex regulations while delivering strategic acquisition outcomes. As a trusted SMSF buyers agent Sydney NSW, we combine deep compliance expertise with data-driven property selection.\n\nOur approach ensures every investment aligns with superannuation objectives, minimises risk, and supports consistent retirement-focused growth in both Sydney and SMSF property investment Melbourne markets.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=900', // SMSF/Corporate vibe
  },
  {
    title: 'Compliance-Driven Acquisition & Market Access',
    description: 'SMSF investments demand strict adherence to regulatory frameworks. At JJ Property Partner PTY LTD, Parramatta, NSW, we coordinate closely with your financial planner, accountant, and SMSF auditor to ensure full compliance with lending rules and the sole purpose test.\n\nAs an experienced SMSF property buyers agent Gold Coast and Sydney specialist, we identify high-yield, low-maintenance assets while providing access to off-market opportunities, including dual-occupancy and mixed-use properties tailored for superannuation strategies.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900', // Compliance/Meetings vibe
  },
  {
    title: 'Long-Term Growth & End-to-End Execution',
    description: 'Successful SMSF property investment is built on long-term strategy and disciplined execution. At JJ Property Partner PTY LTD, Parramatta, NSW, we focus on securing assets that deliver sustainable capital growth aligned with your retirement horizon.\n\nFrom initial strategy and suburb analysis to negotiation and settlement, our end-to-end service ensures seamless execution. We prioritise performance, compliance, and portfolio strength, helping clients build resilient SMSF property portfolios across Sydney, Melbourne, and key growth regions.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=900', // Solid property asset vibe
  }
];

export default function SmsfProperty() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>SMSF Property | JJ Property Partner</title>
        <meta name="description" content="Acquisition strategies built for compliant precision. Explore our approach to strategic SMSF property investment." />
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
                SMSF Property
              </div>
              <h1 className="text-4xl md:text-6xl font-serif leading-[1.1] mb-8 max-w-4xl mx-auto">
                Acquisition strategies built for{' '}
                <span className="italic text-sky-400">compliant precision.</span>
              </h1>
              <p className="text-lg md:text-xl text-sky-100/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Every SMSF brief is unique. Every acquisition is structured for long-term, compliant returns. Explore the three core pillars of the JJ Property Partner SMSF property investment approach.
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
                Ready to secure your <span className="italic text-sky-400">superannuation growth</span>?
              </h2>
              <p className="text-lg text-sky-100/80 font-sans mb-12">
                Book a free strategy session with our SMSF experts to discuss compliant, high-yield off-market property options.
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
