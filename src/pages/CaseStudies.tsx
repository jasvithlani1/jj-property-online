import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import SEO from '../components/SEO';

interface SanityCaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  resultText: string;
  location: string;
  shortQuote?: string;
  mainImage: any;
  tag?: string;
  tagColor?: string;
  stats: { label: string; value: string }[];
}

export default function CaseStudies() {
  const navigate = useNavigate();
  const [studies, setStudies] = useState<SanityCaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const query = `*[_type == "caseStudy"] | order(_createdAt desc) {
          _id,
          title,
          slug,
          resultText,
          location,
          shortQuote,
          mainImage {
            asset,
            alt
          },
          tag,
          tagColor,
          stats
        }`;
        const data = await client.fetch(query);
        setStudies(data);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudies();
  }, []);

  return (
    <div className="w-full bg-white selection:bg-black/10 pt-20">
      <SEO 
        title="Client Success & Case Studies" 
        description="Real briefs. Real markets. Real results. A curated selection of acquisitions that demonstrate the precision of our approach." 
      />

      {/* Hero */}
      <section className="relative px-8 pt-20 pb-20 md:pt-32 md:pb-40 overflow-hidden bg-sky-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6FBFF] blur-[150px] rounded-full opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block px-7 py-3 rounded-full border border-black/10 bg-white text-sm font-bold uppercase tracking-[0.2em] text-black mb-8 shadow-sm scale-110 origin-center translate-y-[-4px]">
              Client Results
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-black leading-[1.05] mb-8 max-w-5xl mx-auto">
              The JJ Property Advantage
              <br />
              <span className="italic text-muted">in action.</span>
            </h1>
            <p className="text-xl text-muted font-sans max-w-2xl mx-auto leading-relaxed">
              Real briefs. Real markets. Real results. A curated selection of acquisitions that demonstrate the precision of our approach.
            </p>
          </motion.div>

          {/* Summary stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 flex flex-wrap justify-center gap-6"
          >
            {[
              { value: '5.0', label: 'Google Rating', icon: <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> },
              { value: '$5M+', label: 'Total Assets Managed' },
              { value: '100%', label: 'Buyer-Side Only' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 px-6 py-4 rounded-[1.25rem] bg-[#021f3a] shadow-xl border border-sky-900/50 hover:-translate-y-1 transition-transform duration-300">
                {stat.icon && stat.icon}
                <span className="text-2xl font-serif text-white">{stat.value}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#7DD3FC]">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 md:py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {studies.map((study, index) => (
                <motion.article
                  key={study._id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
                  onClick={() => { navigate(`/case-studies/${study.slug.current}`); window.scrollTo(0, 0); }}
                  className="group relative rounded-[2.5rem] overflow-hidden bg-neutral-50 border border-black/5 hover:border-black/15 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 cursor-pointer flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    {study.mainImage && (
                      <img
                        src={urlFor(study.mainImage).width(800).height(600).url()}
                        alt={study.mainImage?.alt || study.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Tag overlay */}
                    <div className="absolute top-4 left-4">
                      <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${study.tagColor || 'bg-sky-100 text-sky-800'}`}>
                        {study.tag || 'Acquisition'}
                      </span>
                    </div>

                    {/* Result chip */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-widest">{study.location}</p>
                        <p className="text-white text-xl font-serif">{study.resultText}</p>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-8">
                    <h2 className="text-2xl font-serif text-black mb-4 group-hover:text-sky-800 transition-colors duration-300">
                      {study.title}
                    </h2>
                    {study.shortQuote && (
                      <p className="text-muted font-sans text-base leading-relaxed italic flex-1">
                        "{study.shortQuote}"
                      </p>
                    )}

                    {/* Stats Pills */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {study.stats?.slice(0, 2).map((s) => (
                        <div key={s.label} className="px-4 py-2 rounded-full bg-white border border-black/5 text-xs font-bold uppercase tracking-widest text-black">
                          {s.value} <span className="font-normal text-muted normal-case tracking-normal">{s.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black group/btn">
                      <span className="group-hover:underline underline-offset-4 transition-all">Read Full Case Study</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-8 bg-[#021f3a] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-400 rounded-full blur-[200px]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Ready to write your <br />
              <span className="italic text-sky-300">own success story?</span>
            </h2>
            <p className="text-xl text-white/60 font-sans mb-12 max-w-xl mx-auto">
              Speak directly with Alex about your brief. Our active roster is strictly limited — enquire now.
            </p>
            <button
              onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
              className="group rounded-full px-14 py-5 bg-sky-500 hover:bg-sky-400 text-white text-base font-bold uppercase tracking-widest hover:scale-[1.03] transition-all duration-300 shadow-2xl shadow-sky-900/20 flex items-center gap-3 mx-auto"
            >
              Start Your Brief
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Latest Acquisition Showcase */}
      <section className="py-24 px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-serif text-[#021f3a] mb-6">Explore our latest property acquisitions</h2>
              <p className="text-lg text-muted font-sans max-w-3xl mx-auto leading-relaxed">
                Strategically selected for high growth, strong rental yields, and long-term value. Every purchase is backed by thorough research and due diligence to ensure smart investments.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="flex flex-col lg:flex-row bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-black/5"
          >
            {/* Stats Table */}
            <div className="flex-1 p-10 md:p-14 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#021f3a] opacity-60 mb-1">Purchase Price</span>
                  <span className="text-2xl font-serif text-black font-bold">$675,100</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#021f3a] opacity-60 mb-1">Configuration</span>
                  <span className="text-xl font-sans text-black font-semibold">4 / 2 / 2</span>
                </div>
                
                <div className="flex flex-col pt-4 border-t border-black/5">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#021f3a] opacity-60 mb-1">Purchase Month</span>
                  <span className="text-xl font-sans text-black font-semibold">Dec-24</span>
                </div>
                <div className="flex flex-col pt-4 border-t border-black/5">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#021f3a] opacity-60 mb-1">Rental</span>
                  <span className="text-xl font-sans text-black font-semibold">$750 PW</span>
                </div>
                
                <div className="flex flex-col pt-4 border-t border-black/5">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#021f3a] opacity-60 mb-1">Current Value (Jan-25)</span>
                  <span className="text-xl font-serif text-sky-600 font-bold">$690,000</span>
                </div>
                <div className="flex flex-col pt-4 border-t border-black/5">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#021f3a] opacity-60 mb-1">Land Size</span>
                  <span className="text-xl font-sans text-black font-semibold">600 sqm</span>
                </div>

                <div className="flex flex-col pt-4 border-t border-black/5">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#021f3a] opacity-60 mb-1">Capital Growth</span>
                  <span className="text-2xl font-serif text-emerald-600 font-bold">+$15,000</span>
                </div>
                <div className="flex flex-col pt-4 border-t border-black/5">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#021f3a] opacity-60 mb-1">Rental Yield</span>
                  <span className="text-2xl font-serif text-sky-600 font-bold">5.80%</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="lg:w-[50%] relative min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200" 
                alt="Latest acquisition property" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
