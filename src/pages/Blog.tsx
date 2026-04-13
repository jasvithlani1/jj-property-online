import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import SEO from '../components/SEO';

interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: any;
  publishedAt: string;
  categories: { title: string; color: string }[];
  featured?: boolean;
}

export default function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      setEmail("");
    }, 1000);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          mainImage {
            asset,
            alt
          },
          publishedAt,
          featured,
          "categories": categories[]->{ title, color }
        }`;
        const data = await client.fetch(query);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full bg-white selection:bg-black/10 pt-20">
      <SEO 
        title="Market Intelligence & Blog" 
        description="Data-driven analysis and on-the-ground market intelligence from 20+ years inside Sydney's property market." 
      />

      {/* Hero */}
      <section className="relative px-8 pt-20 pb-20 md:pt-32 md:pb-40 bg-[#021f3a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-sky-400 rounded-full blur-[200px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-600 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-[0.2em] text-sky-300 mb-6">
              Market Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.05] mb-6 max-w-4xl">
              Insights for Sydney's{' '}
              <span className="italic text-sky-300">informed buyers.</span>
            </h1>
            <p className="text-xl text-white/60 font-sans max-w-2xl leading-relaxed">
              Data-driven analysis, acquisition strategy, and on-the-ground market intelligence from 20+ years inside Sydney's property market.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Strip */}
      <section className="px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          {['All Articles', 'Market Intelligence', 'Market Analysis', 'SMSF Strategy', 'First Home', 'Strategy'].map((cat) => (
            <button
              key={cat}
              className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-black/10 bg-white text-muted hover:bg-black hover:text-white hover:border-black transition-all duration-300"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Post Grid */}
      <section className="px-8 pb-24 pt-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  onClick={() => { navigate(`/blog/${post.slug.current}`); window.scrollTo(0, 0); }}
                  className="group flex flex-col rounded-[2.5rem] overflow-hidden bg-neutral-50 border border-black/5 hover:border-black/15 hover:shadow-xl hover:shadow-black/8 transition-all duration-500 cursor-pointer"
                >
                  {/* Cover Image */}
                  <div className="relative h-56 overflow-hidden">
                    {post.mainImage && (
                      <img
                        src={urlFor(post.mainImage).width(800).height(600).url()}
                        alt={post.mainImage?.alt || post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      {post.categories?.[0] && (
                        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${post.categories[0].color || 'bg-sky-100 text-sky-800'}`}>
                          {post.categories[0].title}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-8">
                    <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-muted mb-4">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{new Date(post.publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />6 min read</span>
                    </div>

                    <h2 className="text-xl font-serif text-black leading-snug mb-4 group-hover:text-sky-800 transition-colors duration-300 flex-1">
                      {post.title}
                    </h2>

                    <p className="text-muted font-sans text-sm leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black">
                      Read More
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-8 py-20 md:py-40 bg-sky-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-6 leading-tight">
              Market intelligence, <br />
              <span className="italic text-muted">direct to your inbox.</span>
            </h2>
            <p className="text-xl text-muted font-sans mb-10 max-w-xl mx-auto leading-relaxed">
              Join 1,200+ Sydney buyers who receive our monthly market briefing. No spam — just actionable data.
            </p>
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 px-6 bg-[#021f3a] text-sky-100 rounded-2xl border border-sky-400 font-sans shadow-xl inline-block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white text-sm">Successfully Subscribed!</p>
                    <p className="text-xs text-sky-200">You're now on the list for our latest insights.</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 rounded-2xl bg-white border border-black/10 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 transition-all font-sans text-base"
                />
                <button 
                  type="submit" 
                  disabled={isSubscribing}
                  className={`shrink-0 rounded-2xl px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm transition-transform duration-300 flex items-center gap-2 group justify-center ${isSubscribing ? 'opacity-70' : 'hover:scale-[1.03]'}`}
                >
                  {isSubscribing ? 'Sending...' : 'Subscribe'}
                  {!isSubscribing && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            )}
            
            {!isSubscribed && (
              <p className="text-xs text-muted mt-4 uppercase tracking-widest font-bold">No spam. Unsubscribe any time.</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
