import { motion } from 'framer-motion';
import { ArrowRight, Star, Bed, Bath, Car, Maximize, TrendingUp, Percent } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import SEO from '../components/SEO';
import Link from '../components/Link';
import { caseStudies as localCaseStudies } from '../data/caseStudies';
import { acquisitions } from '../data/acquisitions';

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
  dealDone?: boolean;
  stats: { label: string; value: string }[];
}

export default function CaseStudies() {
  const [studies, setStudies] = useState<SanityCaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const studiesQuery = `*[_type == "caseStudy"] | order(_createdAt desc) {
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
          dealDone,
          stats
        }`;
        const pageQuery = `*[_type == "caseStudiesPage"][0] {
          seo,
          hero
        }`;

        const [studiesData, pageData] = await Promise.all([
          client.fetch(studiesQuery),
          client.fetch(pageQuery)
        ]);

        
        // Map local case studies to match Sanity format
        const formattedLocalStudies = localCaseStudies.map(local => ({
          _id: local.id,
          title: local.title,
          slug: { current: local.id },
          resultText: local.result,
          location: local.location,
          shortQuote: local.shortQuote,
          mainImage: { asset: { _ref: local.image }, isLocal: true }, // Mark as local for conditional rendering
          tag: local.tag,
          tagColor: local.tagColor,
          stats: local.stats
        }));

        setStudies([...studiesData, ...formattedLocalStudies]);
        if (pageData) setPageData(pageData);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudies();
  }, []);

  return (
    <div className="w-full bg-white selection:bg-gold/20 ">
      <SEO 
        title={pageData?.seo?.metaTitle || "Client Success & Case Studies"} 
        description={pageData?.seo?.metaDescription || "Real briefs. Real markets. Real results. A curated selection of acquisitions that demonstrate the precision of our approach."} 
        image={pageData?.seo?.ogImage}
        keywords={pageData?.seo?.keywords}
      />

      {/* Hero */}
      <section className="relative px-8 pt-36 md:pt-40 pb-2 overflow-hidden bg-gold/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blur-[150px] rounded-full opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block px-7 py-3 rounded-full border border-[#011122]/10 bg-white text-sm font-bold uppercase tracking-[0.2em] text-[#011122] mb-2 shadow-sm">
              {pageData?.hero?.badge || "Client Results"}
            </div>
            <h1 className="text-4xl md:text-8xl font-serif text-[#011122] leading-[1.1] md:leading-none mb-6 max-w-5xl mx-auto tracking-tight px-4 md:px-0">
              {pageData?.hero?.heading?.includes('Advantage') ? (
                <>The JJ Property Advantage <br className="hidden md:block" /> <span className="text-gold">in Action.</span></>
              ) : pageData?.hero?.heading || (
                <>The JJ Property Advantage <br className="hidden md:block" /> <span className="text-gold">in Action.</span></>
              )}
            </h1>
            <p className="text-xl text-muted font-sans max-w-2xl mx-auto leading-relaxed">
              {pageData?.hero?.subheading || "Real briefs. Real markets. Real results. A curated selection of acquisitions that demonstrate the precision of our approach."}
            </p>
          </motion.div>

          {/* Summary stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 flex flex-wrap justify-center gap-4"
          >
            {(pageData?.hero?.stats || [
              { value: '5.0', label: 'Google Rating', iconName: 'Star' },
              { value: '$6M+', label: 'Total Assets Managed' },
              { value: '100%', label: 'Buyer-Side Only' },
            ]).map((stat: any) => (
              <div key={stat.label} className="flex items-center gap-3 px-6 py-4 rounded-[1.25rem] bg-[#011122] shadow-xl border border-gold/20 hover:-translate-y-1 transition-transform duration-300">
                {stat.iconName === 'Star' && <Star className="w-4 h-4 fill-amber-400 text-amber-400" />}
                <span className="text-2xl font-serif text-white">{stat.value}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-gold">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-4 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-2">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {studies.map((study, index) => (
                <Link
                  key={study._id}
                  href={`/case-studies/${study.slug.current}`}
                  className="flex"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                    className="group relative rounded-[2.5rem] overflow-hidden bg-white border border-black/5 hover:border-gold/30 hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col w-full"
                  >
                    {/* Image Container */}
                    <div className="relative h-72 overflow-hidden">
                      {study.mainImage && !study.mainImage.isLocal ? (
                        <img
                          src={urlFor(study.mainImage).width(800).height(600).url()}
                          alt={study.mainImage?.alt || study.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      ) : (
                        study.mainImage && study.mainImage.isLocal ? (
                          <img
                            src={study.mainImage.asset._ref}
                            alt={study.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          />
                        ) : (
                          <img
                            src={`https://images.unsplash.com/photo-${index % 2 === 0 ? '1512917774080-9991f1c4c750' : '1600585154340-be6161a56a0c'}?auto=format&fit=crop&q=80&w=800`}
                            alt={study.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          />
                        )
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#011122]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Overlay Result */}
                      <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="text-white font-serif text-xl">{study.resultText?.replace(/—/g, '-')}</span>
                      </div>
                      
                      {/* Deal Done Badge */}
                      {study.dealDone && (
                        <div className="absolute top-4 right-4 bg-gold text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg border border-white/20 backdrop-blur-sm z-10 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Deal Done
                        </div>
                      )}
                    </div>

                    {/* Minimalist Body */}
                    <div className="flex flex-col p-8 md:p-10 items-center text-center">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{study.location}</span>
                        <div className="h-px w-8 bg-gold/30" />
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-serif text-[#011122] mb-2 group-hover:text-gold transition-colors duration-300 leading-tight">
                        {study.title}
                      </h2>

                      <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#011122] group-hover:gap-4 transition-all duration-300">
                        <span>View Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-4 px-8 bg-[#011122] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold rounded-full blur-[200px]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-2 leading-tight">
              Ready to write your <br />
              <span className="text-gold">own success story?</span>
            </h2>
            <p className="text-xl text-white/60 font-sans mb-3 max-w-xl mx-auto">
              Speak directly with Alex about your brief. Our active roster is strictly limited — enquire now.
            </p>
            <Link
              href="/contact"
              className="group rounded-full px-14 py-5 bg-gold hover:bg-gold-hover text-white text-base font-bold uppercase tracking-widest hover:scale-[1.03] transition-all duration-300 shadow-2xl shadow-gold/20 flex items-center gap-3 mx-auto w-fit"
            >
              Start Your Brief
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Acquisition Showcase */}
      <section className="py-4 px-8 bg-neutral-50 border-t border-gold/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-serif text-[#011122] mb-2">Explore our latest property acquisitions</h2>
              <p className="text-lg text-muted font-sans leading-relaxed text-left">
                Strategically selected for high growth, strong rental yields, and long-term value. Every purchase is backed by thorough research and due diligence to ensure smart investments.
              </p>
            </motion.div>
          </div>

          <div className="space-y-5">
            {acquisitions.map((prop, i) => {
              const [beds, baths, cars] = prop.config.split(' / ');
              return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                className="flex flex-col lg:flex-row bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 hover:border-gold/30 transition-colors duration-500"
              >
                {/* Stats Table */}
                <div className="flex-1 p-10 md:p-14 flex flex-col justify-center items-center text-center">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="text-sm font-bold uppercase tracking-[0.3em] text-gold">{prop.city}</span>
                    <div className="h-px w-12 bg-gold/30" />
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Purchase Price</span>
                      <span className="text-2xl font-serif text-[#011122] font-bold">{prop.price}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Configuration</span>
                      <div className="flex items-center justify-center gap-4 mt-0.5">
                        <div className="flex items-center gap-1.5" title="Bedrooms">
                          <Bed className="w-5 h-5 text-gold" />
                          <span className="text-xl font-sans text-[#011122] font-semibold">{beds}</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Bathrooms">
                          <Bath className="w-5 h-5 text-gold" />
                          <span className="text-xl font-sans text-[#011122] font-semibold">{baths}</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Car Spaces">
                          <Car className="w-5 h-5 text-gold" />
                          <span className="text-xl font-sans text-[#011122] font-semibold">{cars}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col pt-4 border-t border-gold/10">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Purchase Month</span>
                      <span className="text-xl font-sans text-[#011122] font-semibold">{prop.month}</span>
                    </div>
                    <div className="flex flex-col pt-4 border-t border-gold/10">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Market Rent</span>
                      <span className="text-xl font-sans text-[#011122] font-semibold">{prop.rental}</span>
                    </div>
                    
                    <div className="flex flex-col pt-4 border-t border-gold/10">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Current Value</span>
                      <span className="text-xl font-serif text-gold font-bold">{prop.value}</span>
                    </div>
                    <div className="flex flex-col pt-4 border-t border-gold/10">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Land Size</span>
                      <div className="flex items-center justify-center gap-2">
                        <Maximize className="w-4 h-4 text-gold" />
                        <span className="text-xl font-sans text-[#011122] font-semibold">{prop.size}</span>
                      </div>
                    </div>

                    <div className="flex flex-col pt-4 border-t border-gold/10">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Capital Growth</span>
                      <div className="flex items-center justify-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        <span className="text-2xl font-serif text-emerald-600 font-bold">{prop.growth}</span>
                      </div>
                    </div>
                    <div className="flex flex-col pt-4 border-t border-gold/10">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Rental Yield</span>
                      <div className="flex items-center justify-center gap-2">
                        <Percent className="w-5 h-5 text-gold" />
                        <span className="text-2xl font-serif text-gold font-bold">{prop.yield}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="lg:w-[50%] relative min-h-[400px]">
                  <img 
                    src={prop.image} 
                    alt={`${prop.city} property`} 
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-10 lg:opacity-100" />
                  
                  {/* Deal Done Badge */}
                  {prop.dealDone && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg border border-white/20 backdrop-blur-sm z-10 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Deal Done
                    </div>
                  )}
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </section>
    </div>
  );
}
