import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Quote } from 'lucide-react';
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
  client: string;
  challenge: string;
  strategy: string;
  outcome: string;
  stats: { label: string; value: string }[];
  seo?: { metaTitle: string; metaDescription: string; ogImage: any };
}

export default function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
          seo
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400" />
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 pt-40 text-center px-8">
        <h1 className="text-5xl font-serif text-black mb-4">Case Study Not Found</h1>
        <p className="text-muted font-sans mb-10 text-lg">We couldn't find the case study you were looking for.</p>
        <button
          onClick={() => navigate('/case-studies')}
          className="rounded-full px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
        >
          Back to Case Studies
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white selection:bg-black/10 pt-32">
      <SEO 
        title={study.seo?.metaTitle || study.title} 
        description={study.seo?.metaDescription || study.outcome.substring(0, 160)}
        image={study.seo?.ogImage || study.mainImage}
      />

      {/* Back navigation */}
      <div className="px-8 pt-6 pb-0">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => { navigate('/case-studies'); window.scrollTo(0, 0); }}
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Case Studies
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative mt-8 mx-4 md:mx-8 h-[50vh] md:h-[65vh] rounded-[3rem] overflow-hidden">
        {study.mainImage && (
          <img
            src={urlFor(study.mainImage).url()}
            alt={study.mainImage?.alt || study.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${study.tagColor || 'bg-sky-100 text-sky-800'}`}>
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
            <p className="text-2xl font-serif text-sky-300">{study.resultText}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {study.stats?.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="p-6 md:p-8 rounded-2xl bg-sky-50 border border-sky-100 text-center"
              >
                <p className="text-3xl md:text-4xl font-serif text-black mb-2">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="px-8 py-12 md:py-20">
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
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-600 mb-4">The Client</p>
              <p className="text-xl md:text-2xl font-sans text-muted leading-relaxed">{study.client}</p>
            </motion.div>

            {/* The Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 md:p-12 rounded-3xl bg-neutral-50 border border-black/5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-black mb-6">The Challenge</p>
              <p className="text-xl md:text-2xl font-serif text-black leading-relaxed">{study.challenge}</p>
            </motion.div>

            {/* The Strategy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-600 mb-4">The Strategy</p>
              <p className="text-xl md:text-2xl font-sans text-muted leading-relaxed">{study.strategy}</p>
            </motion.div>

            {/* The Outcome */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 md:p-12 rounded-3xl bg-[#021f3a] text-white"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-6">The Outcome</p>
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
                className="sticky top-40 p-8 md:p-10 rounded-[2.5rem] bg-sky-50 border border-sky-100"
              >
                <Quote className="w-10 h-10 text-sky-300 mb-6 fill-sky-100" />
                <p className="text-2xl md:text-3xl font-serif text-black leading-snug italic mb-8">
                  "{study.shortQuote}"
                </p>
                <div className="h-px bg-sky-200 mb-8" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted">— JJ Property Partner Client</p>
                <p className="text-sm text-muted mt-1">{study.location}</p>

                <button
                  onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                  className="mt-10 w-full rounded-2xl px-6 py-5 bg-black text-white font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2 group"
                >
                  Start Your Brief
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </aside>
        </div>
      </section>

      {/* Other Case Studies */}
      <section className="px-8 py-20 bg-sky-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-black mb-10">More Client Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherStudies.map((other, i) => (
              <motion.div
                key={other._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                onClick={() => { navigate(`/case-studies/${other.slug.current}`); window.scrollTo(0, 0); }}
                className="group flex gap-6 p-6 rounded-2xl bg-white border border-black/5 hover:border-black/15 hover:shadow-xl transition-all duration-300 cursor-pointer items-center"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                  {other.mainImage && (
                    <img src={urlFor(other.mainImage).width(200).height(200).url()} alt={other.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full mb-2 inline-block w-fit ${other.tagColor || 'bg-sky-100 text-sky-800'}`}>{other.tag || 'Acquisition'}</span>
                  <p className="text-lg font-serif text-black mb-1 group-hover:text-sky-800 transition-colors">{other.title}</p>
                  <p className="text-sm text-muted font-sans">{other.resultText} · {other.location}</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto shrink-0 text-muted group-hover:text-black group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
