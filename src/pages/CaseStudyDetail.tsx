import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ArrowRight, MapPin, Quote, Target, TrendingUp, ShieldCheck } from 'lucide-react';
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
        
        let data = await client.fetch(query, { slug: id });
        
        if (!data) {
          const localStudy = localCaseStudies.find(s => s.id === id);
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
              stats: localStudy.stats
            };
          }
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
        const others = await client.fetch(othersQuery, { slug: id });
        setOtherStudies(others);

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
      <div className="flex justify-center py-40 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold" />
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gold/5 pt-40 text-center px-8">
        <h1 className="text-5xl font-serif text-[#011122] mb-4">Case Study Not Found</h1>
        <p className="text-muted font-sans mb-2 text-lg">We couldn't find the case study you were looking for.</p>
        <Link
          href="/case-studies"
          className="rounded-full px-8 py-4 bg-[#011122] text-white font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
        >
          Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white selection:bg-gold/20 ">
      <SEO 
        title={study.seo?.metaTitle || study.title} 
        description={study.seo?.metaDescription || study.outcome?.substring(0, 160)}
        image={study.seo?.ogImage || (study.mainImage?.isLocal ? study.mainImage.asset._ref : study.mainImage)}
      />

      {/* ── Editorial Hero ─────────────────────────────────────────────── */}
      <section className="relative w-full pt-44 lg:pt-48 pb-16 overflow-hidden bg-[#011122]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-5 py-2 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs font-black uppercase tracking-widest">
                {study.tag || 'Case Study'}
              </span>
              <div className="flex items-center gap-2 text-white/50 text-sm font-sans uppercase tracking-[0.2em]">
                <MapPin className="w-4 h-4 text-gold" />
                {study.location}
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-8 max-w-5xl">
              {study.title}
            </h1>
            
            <div className="flex flex-wrap items-end gap-x-12 gap-y-6">
               <div className="flex flex-col">
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 mb-2">Primary Result</span>
                 <p className="text-2xl md:text-4xl font-serif text-gold">{study.resultText}</p>
               </div>
               {study.stats?.slice(0, 1).map((s) => (
                 <div key={s.label} className="flex flex-col border-l border-white/10 pl-12">
                   <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 mb-2">{s.label}</span>
                   <p className="text-2xl md:text-4xl font-serif text-white">{s.value}</p>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Impact Gallery ─────────────────────────────────────────────── */}
      <section className="relative px-4 md:px-8 -mt-8 mb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-7xl mx-auto h-[50vh] md:h-[70vh] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-black/30 border border-white/5"
        >
          {study.mainImage && !study.mainImage.isLocal ? (
            <img src={urlFor(study.mainImage).url()} alt={study.title} className="w-full h-full object-cover" />
          ) : (
            <img src={study.mainImage?.asset?._ref || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"} alt={study.title} className="w-full h-full object-cover" />
          )}
        </motion.div>
      </section>

      {/* ── Key Performance Indicators ─────────────────────────────────── */}
      <section className="py-2  px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {study.stats?.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-neutral-50 border border-black/5 hover:border-gold/30 transition-all duration-500 group"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted mb-4 group-hover:text-gold transition-colors">{stat.label}</p>
                <p className="text-3xl md:text-4xl font-serif text-[#011122]">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Detailed Narrative ─────────────────────────────────────────── */}
      <section className="py-2  px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Narrative Content */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* The Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-12 top-0 text-[10rem] font-serif text-gold/5 leading-none pointer-events-none select-none">01</div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#011122] mb-4 flex items-center gap-4">
                <Target className="w-8 h-8 text-gold" />
                The Brief & Challenge
              </h2>
              <div className="prose prose-xl prose-gold max-w-none text-muted font-sans leading-relaxed space-y-6">
                {study.challenge?.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </motion.div>

            {/* The Strategy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-12 top-0 text-[10rem] font-serif text-gold/5 leading-none pointer-events-none select-none">02</div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#011122] mb-4 flex items-center gap-4">
                <TrendingUp className="w-8 h-8 text-gold" />
                The Strategic Approach
              </h2>
              <div className="prose prose-xl prose-gold max-w-none text-muted font-sans leading-relaxed space-y-6">
                {study.strategy?.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </motion.div>

            {/* Benefits Table / List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 md:p-14 rounded-[3.5rem] bg-[#011122] text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] rounded-full" />
              <h2 className="text-3xl md:text-4xl font-serif mb-4 flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-gold" />
                Key Benefits Delivered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { title: "Off-Market Advantage", desc: "Secured ahead of public listing, eliminating competition." },
                  { title: "Value Optimization", desc: "Acquired below independent valuation threshold." },
                  { title: "Risk Mitigation", desc: "Comprehensive due diligence uncovered zero hidden issues." },
                  { title: "Strategic Terms", desc: "Flexible settlement periods tailored to the client brief." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="text-gold font-black uppercase tracking-widest text-[10px]">Benefit {i + 1}</span>
                    <h4 className="text-xl font-serif text-white">{item.title}</h4>
                    <p className="text-white/60 text-sm font-sans">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Editorial Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-12">
            
            {/* Outcome Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className="p-10 rounded-[3rem] bg-gold/5 border border-gold/10 relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[60px] rounded-full group-hover:bg-gold/20 transition-colors" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold mb-4">The Final Outcome</h3>
                <div className="prose prose-lg text-[#011122] font-serif leading-relaxed mb-8 ">
                  {study.outcome}
                </div>
                <div className="h-px bg-gold/10 mb-8" />
                
                {study.shortQuote && (
                  <div className="mb-10">
                    <Quote className="w-8 h-8 text-gold/30 mb-4" />
                    <p className="text-lg font-sans text-muted  leading-relaxed mb-4">"{study.shortQuote}"</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-black">— Verified Client Result</p>
                  </div>
                )}

                <button
                  onClick={openCalendly}
                  className="w-full py-5 rounded-2xl bg-[#011122] text-white font-bold uppercase tracking-widest text-[10px] hover:bg-gold transition-all duration-500 shadow-xl shadow-gold/10 flex items-center justify-center gap-3 group/btn"
                >
                  Start Your Success Story
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* ── Gallery Showcase ───────────────────────────────────────────── */}
      {study.gallery && study.gallery.length > 0 && (
        <section className="py-2  px-8 bg-neutral-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-5xl font-serif text-[#011122]">Acquisition Gallery</h2>
              <div className="h-px flex-1 bg-gold/10 mx-8 hidden md:block" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {study.gallery.map((img: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-3xl overflow-hidden aspect-square md:aspect-video relative group border border-black/5 shadow-xl"
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
      <section className="py-4  px-8 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-4 text-center">Continue Exploring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {otherStudies.map((other) => (
              <Link
                key={other._id}
                href={`/case-studies/${other.slug.current}`}
                className="group flex flex-col md:flex-row gap-8 p-10 rounded-[3rem] bg-neutral-50 border border-transparent hover:border-gold/20 hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-full md:w-48 h-48 rounded-[2rem] overflow-hidden shrink-0 shadow-lg">
                  <img src={other.mainImage ? urlFor(other.mainImage).width(400).height(400).url() : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"} alt={other.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gold mb-3">{other.tag || 'Acquisition'}</span>
                  <h3 className="text-2xl font-serif text-[#011122] mb-4 group-hover:text-gold transition-colors">{other.title}</h3>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted">
                    Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
