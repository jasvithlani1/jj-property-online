import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ArrowRight, MapPin, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import SEO from '../components/SEO';
import { openCalendly } from '../utils/calendly';
import Link from '../components/Link';
import { caseStudies as localCaseStudies } from '../data/caseStudies';

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
  client: string;
  challenge: string;
  strategy: string;
  outcome: string;
  stats: { label: string; value: string }[];
  seo?: { metaTitle: string; metaDescription: string; ogImage: any };
  gallery?: any[];
  propertyDetails?: { label: string; value: string }[];
}

export default function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const [study, setStudy] = useState<SanityCaseStudy | null>(null);
  const [otherStudies, setOtherStudies] = useState<SanityCaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const query = `*[_type == "caseStudy" && slug.current == $slug][0] {
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
          client,
          challenge,
          strategy,
          outcome,
          stats,
          seo,
          gallery
        }`;
        
        const localStudy = localCaseStudies.find(s => s.id === id);
        let data = null;
        
        if (localStudy) {
          data = {
            _id: localStudy.id,
            title: localStudy.title,
            slug: { current: localStudy.id },
            resultText: localStudy.result,
            location: localStudy.location,
            shortQuote: localStudy.shortQuote,
            mainImage: { asset: { _ref: localStudy.image }, isLocal: true },
            tag: localStudy.tag,
            tagColor: localStudy.tagColor,
            client: localStudy.client,
            challenge: localStudy.challenge,
            strategy: localStudy.strategy,
            outcome: localStudy.outcome,
            stats: localStudy.stats,
            propertyDetails: localStudy.propertyDetails
          };
        } else {
          data = await client.fetch(query, { slug: id });
        }
        setStudy(data);

        const othersQuery = `*[_type == "caseStudy" && slug.current != $slug][0...2] {
          _id,
          title,
          slug,
          resultText,
          location,
          mainImage,
          tag,
          tagColor
        }`;
        
        let others = [];
        try {
          others = await client.fetch(othersQuery, { slug: id });
        } catch (e) {
          console.error("Sanity others query failed, using fallback");
        }
        
        if (!others || others.length === 0) {
          const fallbackOthers = localCaseStudies
            .filter(s => s.id !== id)
            .slice(0, 2)
            .map(local => ({
              _id: local.id,
              title: local.title,
              slug: { current: local.id },
              resultText: local.result,
              location: local.location,
              mainImage: { asset: { _ref: local.image }, isLocal: true },
              tag: local.tag,
              tagColor: local.tagColor,
              client: local.client,
              challenge: local.challenge,
              strategy: local.strategy,
              outcome: local.outcome,
              stats: local.stats
            }));
          setOtherStudies(fallbackOthers);
        } else {
          setOtherStudies(others);
        }

      } catch (error) {
        console.error('Error fetching case study:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudy();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-32 bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold" />
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gold/5 pt-32 text-center px-8">
        <h1 className="text-4xl font-sans font-black text-[#011122] mb-4">Case Study Not Found</h1>
        <p className="text-muted font-sans mb-2 text-base">We couldn't find the case study you were looking for.</p>
        <Link
          href="/case-studies"
          className="rounded-full px-8 py-3.5 bg-[#011122] text-white font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
        >
          Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white selection:bg-gold/20">
      <SEO 
        title={study.seo?.metaTitle || study.title} 
        description={study.seo?.metaDescription || study.outcome?.substring(0, 160)}
        image={study.seo?.ogImage || (study.mainImage?.isLocal ? study.mainImage.asset._ref : study.mainImage)}
      />

      {/* ── Editorial Hero ─────────────────────────────────────────────── */}
      <section className="relative w-full pt-28 md:pt-32 pb-6 overflow-hidden bg-gold/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blur-[150px] rounded-full opacity-60 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center pt-2 md:pt-4"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-[9px] font-black uppercase tracking-widest">
                {study.tag || 'Case Study'}
              </span>
              <span className="text-muted/60 text-xs font-sans uppercase tracking-[0.15em] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                {study.location}
              </span>
            </div>

            <h1 className="text-2xl md:text-5xl lg:text-6xl font-sans font-black text-[#011122] leading-tight mb-2 max-w-4xl tracking-tight">
              {study.title}
            </h1>
            
            <p className="text-base font-sans text-gold font-black uppercase tracking-wider">{study.resultText}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Image ─────────────────────────────────────────────── */}
      <section className="relative px-4 md:px-8 -mt-4 mb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-6xl mx-auto h-[30vh] md:h-[42vh] rounded-[1.5rem] overflow-hidden shadow-lg border border-black/5"
        >
          {study.mainImage && !study.mainImage.isLocal ? (
            <img src={urlFor(study.mainImage).url()} alt={study.title} className="w-full h-full object-cover" />
          ) : (
            <img src={study.mainImage?.asset?._ref || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"} alt={study.title} className="w-full h-full object-cover" />
          )}
        </motion.div>
      </section>

      {/* ── Editorial Narrative & Sidebar ──────────────────────────────── */}
      <section className="py-2 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          
          {/* Narrative Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Client Context */}
            {study.client && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-1.5"
              >
                <h2 className="text-sm md:text-base font-sans font-black uppercase tracking-wider text-gold">1. Background</h2>
                <div className="text-sm text-muted/95 font-sans leading-relaxed space-y-3 max-w-none">
                  {study.client.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </motion.div>
            )}

            {/* The Brief & Challenge */}
            {study.challenge && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-1.5 pt-1"
              >
                <h2 className="text-sm md:text-base font-sans font-black uppercase tracking-wider text-gold">2. The Property Brief</h2>
                <div className="text-sm text-muted/95 font-sans leading-relaxed space-y-3 max-w-none">
                  {study.challenge.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </motion.div>
            )}

            {/* The Strategy */}
            {study.strategy && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-1.5 pt-1"
              >
                <h2 className="text-sm md:text-base font-sans font-black uppercase tracking-wider text-gold">3. Why This Property Made Sense</h2>
                <div className="text-sm text-muted/95 font-sans leading-relaxed space-y-3 max-w-none">
                  {study.strategy.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </motion.div>
            )}

            {/* The Final Outcome & Value (Highly Highlighted, No Step Number) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-[1.75rem] bg-[#011122] text-white space-y-3 relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 blur-[60px] rounded-full pointer-events-none" />
              <h2 className="text-[11px] font-sans font-black uppercase tracking-wider text-gold">The Final Outcome & Value Created</h2>
              <p className="text-base md:text-lg font-sans text-white/95 leading-relaxed">
                {study.outcome}
              </p>
            </motion.div>

            {/* Minimalist Delivered Value Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-[1.75rem] border border-gold/15 bg-gold/5 relative overflow-hidden"
            >
              <h3 className="text-xs font-sans font-black text-[#011122] mb-3 uppercase tracking-wider">Strategic Advantages Delivered</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  { title: "Off-Market Advantage", desc: "Secured ahead of public listing, eliminating competition." },
                  { title: "Value Optimization", desc: "Acquired below independent valuation threshold." },
                  { title: "Risk Mitigation", desc: "Comprehensive due diligence uncovered zero hidden issues." },
                  { title: "Strategic Terms", desc: "Flexible settlement periods tailored to the client brief." }
                ].map((item, i) => (
                  <div key={i} className="space-y-0.5">
                    <h4 className="font-sans font-black text-[#011122] text-xs">{item.title}</h4>
                    <p className="text-muted text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Editorial Sidebar */}
          <aside className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Property Specification Dossier Table */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-24 space-y-4"
            >
              <div className="border border-gold/15 bg-white rounded-[1.75rem] p-6 md:p-8 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[50px] rounded-full pointer-events-none" />
                <h3 className="text-[10px] font-sans font-black uppercase tracking-wider text-[#011122] mb-4 pb-2.5 border-b border-gold/10">Property Acquisition Details</h3>
                
                <div className="space-y-3">
                  {study.propertyDetails ? (
                    study.propertyDetails.map((detail, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px] py-1.5 border-b border-black/5 last:border-0">
                        <span className="font-sans font-black text-[#011122] uppercase tracking-wider text-[9px] opacity-60 shrink-0">{detail.label}</span>
                        <span className="font-sans font-semibold text-[#011122] text-right ml-4">{detail.value}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-between items-center text-[11px] py-1.5 border-b border-black/5">
                        <span className="font-sans font-black text-[#011122] uppercase tracking-wider text-[9px] opacity-60">Location</span>
                        <span className="font-sans font-semibold text-[#011122] text-right ml-4">{study.location}</span>
                      </div>
                      {study.stats?.map((stat, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[11px] py-1.5 border-b border-black/5 last:border-0">
                          <span className="font-sans font-black text-[#011122] uppercase tracking-wider text-[9px] opacity-60 shrink-0">{stat.label}</span>
                          <span className="font-sans font-semibold text-[#011122] text-right ml-4">{stat.value}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* Consultation Booking card */}
              <div className="p-6 rounded-[1.75rem] bg-gold/5 border border-gold/15 flex flex-col items-center text-center space-y-3 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[50px] rounded-full pointer-events-none" />
                <h4 className="text-sm font-sans font-black text-[#011122] uppercase tracking-wide">Ready to achieve a similar result?</h4>
                <p className="text-[11px] text-muted leading-relaxed">Speak directly with Alex about your brief. Our active client capacity is strictly limited.</p>
                <button
                  onClick={openCalendly}
                  className="w-full py-3.5 rounded-xl bg-[#011122] hover:bg-gold text-white font-bold uppercase tracking-widest text-[9px] transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 group/btn"
                >
                  Start Your Success Story
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Client Quote */}
              {study.shortQuote && (
                <div className="p-6 rounded-[1.75rem] bg-neutral-50 border border-black/5 relative shadow-sm">
                  <Quote className="w-5 h-5 text-gold/30 mb-2" />
                  <p className="text-xs font-sans italic text-muted leading-relaxed mb-3">"{study.shortQuote}"</p>
                  <p className="text-[9px] font-sans font-black uppercase tracking-wider text-[#011122]">— Verified Client Result</p>
                </div>
              )}
            </motion.div>
          </aside>
        </div>
      </section>

      {/* ── Gallery Showcase ───────────────────────────────────────────── */}
      {study.gallery && study.gallery.length > 0 && (
        <section className="py-6 px-4 md:px-8 bg-neutral-50 border-t border-b border-black/5 mb-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[10px] font-sans font-black uppercase tracking-wider text-gold mb-6 text-center">Acquisition Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {study.gallery.map((img: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-xl overflow-hidden aspect-square md:aspect-video relative group border border-black/5 shadow-sm"
                >
                  <img src={urlFor(img).url()} alt="Property View" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Next Stories ────────────────────────────────────────────────── */}
      <section className="py-8 px-4 md:px-8 bg-white border-t border-black/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[10px] font-sans font-black uppercase tracking-wider text-gold mb-6 text-center">Continue Exploring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherStudies.map((other) => (
              <Link
                key={other._id}
                href={`/case-studies/${other.slug.current}`}
                className="group flex flex-col md:flex-row gap-5 p-6 rounded-[1.75rem] bg-neutral-50 border border-transparent hover:border-gold/20 hover:bg-white hover:shadow-lg transition-all duration-500"
              >
                <div className="w-full md:w-28 h-28 rounded-xl overflow-hidden shrink-0 shadow-sm">
                  <img 
                    src={other.mainImage?.isLocal ? other.mainImage.asset._ref : (other.mainImage ? urlFor(other.mainImage).width(300).height(300).url() : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750")} 
                    alt={other.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] font-sans font-black uppercase tracking-wider text-gold mb-1">{other.tag || 'Acquisition'}</span>
                  <h3 className="text-base font-sans font-black text-[#011122] mb-1 group-hover:text-gold transition-colors line-clamp-2">{other.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                    Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
