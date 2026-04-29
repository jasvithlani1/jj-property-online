import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import SEO from '../components/SEO';
import { openCalendly } from '../utils/calendly';
import Link from '../components/Link';

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
        const data = await client.fetch(query, { slug: id });
        setStudy(data);

        // Fetch other studies
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
        <p className="text-muted font-sans mb-10 text-lg">We couldn't find the case study you were looking for.</p>
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
    <div className="w-full bg-white selection:bg-gold/20 pt-12">
      <SEO 
        title={study.seo?.metaTitle || study.title} 
        description={study.seo?.metaDescription || study.outcome.substring(0, 160)}
        image={study.seo?.ogImage || study.mainImage}
      />

      {/* Back navigation */}
      <div className="px-8 pt-12 pb-0 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/case-studies"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Case Studies
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative mt-4 mx-4 md:mx-8 h-[50vh] md:h-[65vh] rounded-[3rem] overflow-hidden">
        {study.mainImage ? (
          <img
            src={urlFor(study.mainImage).url()}
            alt={study.mainImage?.alt || study.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={`https://images.unsplash.com/photo-${study.title.length % 2 === 0 ? '1512917774080-9991f1c4c750' : '1600585154340-be6161a56a0c'}?auto=format&fit=crop&q=80&w=1200`}
            alt={study.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm border border-gold/10 ${study.tagColor || 'bg-gold/10 text-gold'}`}>
                {study.tag || 'Acquisition'}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-sm font-sans">
                <MapPin className="w-3.5 h-3.5" />
                {study.location}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-4">
              {study.title}
            </h1>
            <p className="text-2xl font-serif text-gold">{study.resultText}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="px-8 py-8 md:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {study.stats?.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="p-6 md:p-8 rounded-2xl bg-gold/5 border border-gold/10 text-center"
              >
                <p className="text-3xl md:text-4xl font-serif text-[#011122] mb-2">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="px-8 py-8 md:py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col gap-16">

            {/* Client */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">The Client</p>
              <p className="text-xl md:text-2xl font-sans text-muted leading-relaxed">{study.client}</p>
            </motion.div>

            {/* The Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 md:p-12 rounded-3xl bg-neutral-50 border border-gold/5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#011122] mb-6">The Challenge</p>
              <p className="text-xl md:text-2xl font-serif text-[#011122] leading-relaxed">{study.challenge}</p>
            </motion.div>

            {/* The Strategy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">The Strategy</p>
              <p className="text-xl md:text-2xl font-sans text-muted leading-relaxed">{study.strategy}</p>
            </motion.div>

            {/* The Outcome */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 md:p-12 rounded-3xl bg-[#011122] text-white"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold mb-6">The Outcome</p>
              <p className="text-xl md:text-2xl font-serif leading-relaxed">{study.outcome}</p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5 flex flex-col gap-8">
            {/* Pull Quote */}
            {study.shortQuote && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="sticky top-28 p-6 md:p-8 rounded-[2.5rem] bg-gold/5 border border-gold/10"
              >
                <Quote className="w-10 h-10 text-gold mb-6 fill-gold/10" />
                <p className="text-2xl md:text-3xl font-serif text-[#011122] leading-snug mb-8">
                  "{study.shortQuote}"
                </p>
                <div className="h-px bg-gold/10 mb-8" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted">— JJ Property Partner Client</p>
                <p className="text-sm text-muted mt-1">{study.location}</p>

                <button
                  onClick={openCalendly}
                  className="mt-10 w-full rounded-2xl px-6 py-5 bg-[#011122] text-white font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Book 30m Strategy Session
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </aside>
        </div>
      </section>

      {/* Property Image Gallery */}
      {study.gallery && study.gallery.length > 0 && (
        <section className="px-8 pb-10 md:pb-12">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-serif text-[#011122] mb-8">Property Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {study.gallery.map((img: any, idx: number) => (
                <div key={idx} className="rounded-3xl overflow-hidden aspect-square md:aspect-video relative group border border-black/5 shadow-sm">
                  {img && (
                    <img 
                      src={urlFor(img).url()} 
                      alt={img.alt || 'Gallery image'} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Case Studies */}
      <section className="px-8 py-8 md:py-10 bg-gold/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-[#011122] mb-10">More Client Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherStudies.map((other) => (
              <Link
                key={other._id}
                href={`/case-studies/${other.slug.current}`}
                className="group flex gap-6 p-6 rounded-2xl bg-white border border-gold/5 hover:border-gold/20 hover:shadow-xl transition-all duration-300 cursor-pointer items-center"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                  {other.mainImage ? (
                    <img src={urlFor(other.mainImage).width(200).height(200).url()} alt={other.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <img src={`https://images.unsplash.com/photo-${other.title.length % 2 === 0 ? '1512917774080-9991f1c4c750' : '1600585154340-be6161a56a0c'}?auto=format&fit=crop&q=80&w=200`} alt={other.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full mb-2 inline-block w-fit ${other.tagColor || 'bg-gold/10 text-gold'}`}>{other.tag || 'Acquisition'}</span>
                  <p className="text-lg font-serif text-[#011122] mb-1 group-hover:text-gold transition-colors">{other.title}</p>
                  <p className="text-sm text-muted font-sans">{other.resultText} · {other.location}</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto shrink-0 text-muted group-hover:text-[#011122] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
