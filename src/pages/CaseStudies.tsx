import { motion } from 'framer-motion';
import { ArrowRight, Star, Bed, Bath, Car, Maximize, TrendingUp, Coins, Calendar, LineChart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import PageSEO from '../components/PageSEO';
import Link from '../components/Link';
import { caseStudies as localCaseStudies } from '../data/caseStudies';
import { acquisitions as localAcquisitions } from '../data/acquisitions';

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
  isLocal?: boolean;
  stats: { label: string; value: string }[];
}

export default function CaseStudies() {
  const [studies, setStudies] = useState<SanityCaseStudy[]>([]);
  const [acquisitionsList, setAcquisitionsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const studiesQuery = `*[_type == "caseStudy"] | order(caseNumber asc, _createdAt desc) {
          _id,
          title,
          slug,
          resultText,
          location,
          shortQuote,
          caseNumber,
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
  seoModule {
    metaTitle,
    metaDescription,
    ogImage { asset, hotspot },
    canonicalUrl,
    noIndex,
    schemaModules[] {
      _type, enabled,
      _type == "faqSchema" => { faqs[]{ _key, question, answer } },
      _type == "reviewSchema" => { ratingValue, ratingCount, bestRating, worstRating },
      _type == "serviceSchema" => { serviceName, serviceDescription, areaServed },
      _type == "articleSchema" => { articleType, authorName, publishedDate, modifiedDate }
    }
  },
          hero
        }`;

        const acquisitionsQuery = `*[_type == "acquisition"] {
          _id,
          city,
          state,
          dealDone,
          price,
          config,
          month,
          rental,
          value,
          size,
          growth,
          yield,
          image {
            asset,
            alt
          }
        }`;

        const [studiesData, pageData, acquisitionsData] = await Promise.all([
          client.fetch(studiesQuery),
          client.fetch(pageQuery),
          client.fetch(acquisitionsQuery)
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

        const sanitySlugs = (studiesData || []).map((s: any) => s.slug?.current).filter(Boolean);
        const filteredLocalStudies = formattedLocalStudies.filter((s: any) => !sanitySlugs.includes(s.slug.current));
        setStudies([...(studiesData || []), ...filteredLocalStudies]);
        if (pageData) setPageData(pageData);
        if (acquisitionsData && acquisitionsData.length > 0) {
          setAcquisitionsList(acquisitionsData);
        } else {
          setAcquisitionsList(localAcquisitions);
        }
      } catch (error) {
        console.error('Error fetching case studies:', error);
        // Fallback to local data if Sanity is unavailable
        setStudies(localCaseStudies.map(local => ({
          _id: local.id,
          title: local.title,
          slug: { current: local.id },
          resultText: local.result,
          location: local.location,
          shortQuote: local.shortQuote,
          mainImage: { asset: { _ref: local.image }, isLocal: true },
          tag: local.tag,
          tagColor: local.tagColor,
          dealDone: undefined,
          isLocal: true,
          stats: local.stats
        })));
        setAcquisitionsList(localAcquisitions);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudies();
  }, []);

  return (
    <div className="w-full bg-white selection:bg-gold/20 ">
      <PageSEO
        title={"Client Success & Case Studies"}
        description={"Real briefs. Real markets. Real results. A curated selection of acquisitions that demonstrate the precision of our approach."}
        seoModule={pageData?.seoModule}
        path="/case-studies"
        breadcrumbs={[{ name: 'Case Studies', url: '/case-studies' }]}
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
                <span className="text-2xl font-serif text-white flex items-center gap-2">
                  {stat.value === '5.0' ? '5' : (stat.value === '$5M+' ? '$6M+' : stat.value)}
                  {(stat.iconName === 'Star' || stat.icon === 'Star' || stat.label.toLowerCase().includes('google rating') || stat.label.toLowerCase().includes('google reviews')) && <Star className="w-5 h-5 fill-amber-400 text-amber-400" />}
                </span>
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
              {studies.filter(s => s.slug?.current || s.isLocal).map((study, index) => (
                <Link
                  key={study._id}
                  href={`/case-studies/${study.slug?.current}`}
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
                    <div className="relative h-72 overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center border-b border-black/5">
                      {study.mainImage && (study.mainImage.isLocal || study.mainImage.asset) ? (
                        !study.mainImage.isLocal ? (
                          <img
                            src={urlFor(study.mainImage).width(800).height(600).url()}
                            alt={study.mainImage?.alt || study.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          />
                        ) : (
                          <img
                            src={study.mainImage.asset?._ref}
                            alt={study.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          />
                        )
                      ) : (
                        <div className="text-gold font-serif text-sm tracking-wider uppercase opacity-45 font-semibold">JJ Property</div>
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
                    <div className="flex flex-col flex-1 p-8 md:p-10 items-center text-center">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-px w-8 bg-gold/30" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                          {study.location ? study.location.split(',').pop()?.trim() : ''}
                        </span>
                        <div className="h-px w-8 bg-gold/30" />
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-serif text-[#011122] mb-2 group-hover:text-gold transition-colors duration-300 leading-tight flex-1">
                        {study.title}
                      </h2>

                      <div className="mt-auto flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#011122] group-hover:gap-4 transition-all duration-300">
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
            {[...acquisitionsList].sort((a, b) => {
              const parseDate = (mStr: string) => {
                if (!mStr) return 0;
                const parts = mStr.split('-');
                if (parts.length < 2) return 0;
                const [mon, yr] = parts;
                const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(mon);
                return new Date(2000 + parseInt(yr), monthIndex).getTime();
              };
              return parseDate(b.month) - parseDate(a.month);
            }).map((prop, i) => {
              const [beds, baths, cars] = (prop.config || '0 / 0 / 0').split(' / ');
              return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                className="flex flex-col lg:flex-row bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 hover:border-gold/30 transition-colors duration-500"
              >
                {/* Stats Table */}
                <div className="flex-1 p-5 min-[380px]:p-8 md:p-14 flex flex-col justify-center items-center text-center">
                  <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
                    <div className="h-px w-12 bg-gold/30" />
                    <span className="text-sm font-bold uppercase tracking-[0.3em] text-gold">{prop.state}</span>
                    <div className="h-px w-12 bg-gold/30" />
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 min-[380px]:gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6 w-full">
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Purchase Price</span>
                      <span className="text-lg min-[380px]:text-xl sm:text-2xl font-serif text-[#011122] font-bold">{prop.price}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Configuration</span>
                      <div className="flex items-center justify-center gap-1.5 min-[380px]:gap-2 sm:gap-3 mt-0.5 flex-wrap">
                        <div className="flex items-center gap-1 min-[380px]:gap-1.5" title="Bedrooms">
                          <Bed className="w-3.5 h-3.5 min-[380px]:w-4 min-[380px]:h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
                          <span className="text-sm min-[380px]:text-base sm:text-xl font-sans text-[#011122] font-semibold">{beds}</span>
                        </div>
                        <div className="flex items-center gap-1 min-[380px]:gap-1.5" title="Bathrooms">
                          <Bath className="w-3.5 h-3.5 min-[380px]:w-4 min-[380px]:h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
                          <span className="text-sm min-[380px]:text-base sm:text-xl font-sans text-[#011122] font-semibold">{baths}</span>
                        </div>
                        <div className="flex items-center gap-1 min-[380px]:gap-1.5" title="Car Spaces">
                          <Car className="w-3.5 h-3.5 min-[380px]:w-4 min-[380px]:h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
                          <span className="text-sm min-[380px]:text-base sm:text-xl font-sans text-[#011122] font-semibold">{cars}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col pt-3 sm:pt-4 border-t border-gold/10">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Purchase Month</span>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
                        <span className="text-base sm:text-xl font-sans text-[#011122] font-semibold">{prop.month}</span>
                      </div>
                    </div>
                    <div className="flex flex-col pt-3 sm:pt-4 border-t border-gold/10">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Market Rent</span>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
                        <span className="text-base sm:text-xl font-sans text-[#011122] font-semibold">{prop.rental}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col pt-3 sm:pt-4 border-t border-gold/10">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Current Value</span>
                      <span className="text-base sm:text-xl font-serif text-gold font-bold">{prop.value}</span>
                    </div>
                    <div className="flex flex-col pt-3 sm:pt-4 border-t border-gold/10">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Land Size</span>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0" />
                        <span className="text-base sm:text-xl font-sans text-[#011122] font-semibold">{prop.size}</span>
                      </div>
                    </div>

                    <div className="flex flex-col pt-3 sm:pt-4 border-t border-gold/10">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Capital Growth</span>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                        <span className="text-lg min-[380px]:text-xl sm:text-2xl font-serif text-emerald-600 font-bold">{prop.growth}</span>
                      </div>
                    </div>
                    <div className="flex flex-col pt-3 sm:pt-4 border-t border-gold/10">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#011122] opacity-60 mb-1">Rental Yield</span>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <LineChart className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
                        <span className="text-lg min-[380px]:text-xl sm:text-2xl font-serif text-gold font-bold">{prop.yield}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="lg:w-[50%] relative min-h-[400px] bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center border-l border-black/5">
                  {prop.image ? (
                    <img 
                      src={prop.image.asset ? urlFor(prop.image).width(800).height(600).url() : (typeof prop.image === 'string' ? prop.image : '')} 
                      alt={`${prop.city} property`} 
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="text-gold font-serif text-sm tracking-wider uppercase opacity-40">JJ Property</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-10 lg:opacity-100" />
                  
                  {/* Deal Done Badge */}
                  {prop.dealDone !== false && (
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
