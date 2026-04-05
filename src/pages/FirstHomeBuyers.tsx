import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { openCalendly } from '../utils/calendly';

const pillars = [
  {
    title: 'Expert Guidance for First Home Buyers',
    description: 'Entering the property market requires clarity and strategy. At JJ Property Partner PTY LTD, Parramatta, NSW, we operate as a trusted first home buyer agent Sydney, assisting clients across key locations including first home buyer Northern Beaches, first home buyer Inner West Sydney, and first home buyer Hills District NSW.\n\nOur approach focuses on understanding your goals, financial position, and long-term plans, ensuring informed decisions while guiding you confidently through every stage of your first property acquisition journey.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Strategic Property Selection & Market Access',
    description: 'Finding the right property in competitive areas like first home buyer property Sydney CBD demands precision and timing. At JJ Property Partner PTY LTD, Parramatta, NSW, we leverage data-driven insights, suburb analysis, and exclusive opportunities to identify properties aligned with your budget and growth potential.\n\nWhether for lifestyle or investment, our expertise ensures you secure value-driven assets while also supporting long-term wealth creation strategies.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'End-to-End Support for Confident Decisions',
    description: 'From initial consultation to final settlement, JJ Property Partner PTY LTD, Parramatta, NSW provides complete support tailored to first home buyers. Our service includes property research, due diligence, negotiation, and transaction management for a seamless experience.\n\nWe collaborate closely with your financial advisors and lending partners to align your purchase with your goals, ensuring transparency, confidence, and a strong foundation for future portfolio growth.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=900',
  }
];

export default function FirstHomeBuyers() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>First Home Buyers | JJ Property Partner</title>
        <meta name="description" content="Acquisition strategies designed for confident first home buyers in Sydney. Discover the three core pillars of the JJ Property Partner approach." />
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
                First Home Buyers
              </div>
              <h1 className="text-4xl md:text-6xl font-serif leading-[1.1] mb-8 max-w-4xl mx-auto">
                Acquisition strategies designed for{' '}
                <span className="italic text-sky-400">confident</span> first home buyers.
              </h1>
              <p className="text-lg md:text-xl text-sky-100/80 font-sans max-w-3xl mx-auto leading-relaxed">
                Every journey is unique. Every purchase is carefully structured to secure the right foundation. Discover the three core pillars of the JJ Property Partner approach for first home buyers.
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
