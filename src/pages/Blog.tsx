import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import PageSEO from '../components/PageSEO';
import Link from '../components/Link';
import type { SanityImage, SanityImageSource } from '../types/sanity';

interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: SanityImage;
  publishedAt: string;
  categories: { title: string; color: string }[];
  featured?: boolean;
}

export default function Blog() {
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [allPosts, setAllPosts] = useState<SanityPost[]>([]);
  const [activeFilter, setActiveFilter] = useState('All Articles');
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [categories, setCategories] = useState<string[]>(['All Articles']);

  const [fetchError, setFetchError] = useState(false);

  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1000);
  };

  const handleFilter = (cat: string) => {
    setActiveFilter(cat);
    if (cat === 'All Articles') {
      setPosts(allPosts);
    } else {
      setPosts(
        allPosts.filter(p =>
          p.categories?.some(
            c => c.title?.trim().toLowerCase() === cat.trim().toLowerCase()
          )
        )
      );
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          mainImage { asset, alt },
          publishedAt,
          featured,
          "categories": categories[]->{ title, color }
        }`;

        const pageQuery = `*[_type == "blogPage"][0] {
          seoModule {
            metaTitle, metaDescription,
            ogImage { asset, hotspot },
            canonicalUrl, noIndex,
            schemaModules[] {
              _type, enabled,
              _type == "faqSchema" => { faqs[]{ _key, question, answer } },
              _type == "reviewSchema" => { ratingValue, ratingCount, bestRating, worstRating },
              _type == "serviceSchema" => { serviceName, serviceDescription, areaServed },
              _type == "articleSchema" => { articleType, authorName, publishedDate, modifiedDate }
            }
          },
          hero, newsletter
        }`;

        const [postsData, pageData] = await Promise.all([
          client.fetch(postsQuery),
          client.fetch(pageQuery),
        ]);

        const sorted: SanityPost[] = (postsData || []).sort(
          (a: SanityPost, b: SanityPost) => {
            const aTime = new Date(a.publishedAt).getTime();
            const bTime = new Date(b.publishedAt).getTime();
            if (isNaN(aTime) && isNaN(bTime)) return 0;
            if (isNaN(aTime)) return 1;
            if (isNaN(bTime)) return -1;
            return bTime - aTime;
          }
        );

        setAllPosts(sorted);
        setPosts(sorted);

        const uniqueCats = Array.from(
          new Set(
            sorted.flatMap(p =>
              (p.categories || [])
                .map((c: { title: string; color: string }) => c.title?.trim())
                .filter(
                  (t: string | undefined): t is string =>
                    !!t &&
                    t.toLowerCase() !== 'all article' &&
                    t.toLowerCase() !== 'all articles'
                )
            )
          )
        ).sort();
        setCategories(['All Articles', ...uniqueCats]);

        if (pageData) setPageData(pageData);
      } catch {
        setFetchError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full bg-white selection:bg-gold/20">
      <PageSEO
        title={'Market Intelligence & Blog'}
        description={
          pageData?.seo?.metaDescription ||
          "Data-driven analysis and on-the-ground market intelligence from 20+ years inside Sydney's property market."
        }
        seoModule={pageData?.seoModule}
        path="/blog"
        breadcrumbs={[{ name: 'Blog', url: '/blog' }]}
      />

      {/* Hero */}
      <section className="pt-28 pb-2 md:pt-36 md:pb-3 relative px-8 bg-[#011122] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gold rounded-full blur-[200px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-7 py-3 rounded-full border border-white/20 bg-white/10 text-sm font-bold uppercase tracking-[0.2em] text-white mb-2 shadow-sm">
              {pageData?.hero?.badge || 'Market Intelligence'}
            </div>
            <h1 className="text-5xl md:text-8xl font-serif leading-[1.05] mb-6 max-w-4xl mx-auto">
              {pageData?.hero?.heading?.includes('informed') ? (
                <>Insights for Sydney's <span className="text-gold">informed buyers.</span></>
              ) : (
                pageData?.hero?.heading || (
                  <>Insights for Sydney's <span className="text-gold">informed buyers.</span></>
                )
              )}
            </h1>
            <p className="text-xl text-white/60 font-sans max-w-2xl leading-relaxed">
              {pageData?.hero?.subheading ||
                "Data-driven analysis, acquisition strategy, and on-the-ground market intelligence from 20+ years inside Sydney's property market."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Strip */}
      <section className="px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-[#011122] text-white border-[#011122]'
                  : 'border-[#011122]/10 bg-white text-muted hover:bg-[#011122] hover:text-white hover:border-[#011122]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Post Grid */}
      <section className="px-8 pb-2 pt-2">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold" />
            </div>
          ) : fetchError ? (
            <div className="text-center py-16">
              <p className="text-muted font-sans text-lg">Unable to load articles. Please try refreshing the page.</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted font-sans text-lg">No articles in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {posts.map((post, i) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="flex"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: i * 0.05 }}
                    className="group flex flex-col rounded-[2.5rem] overflow-hidden bg-neutral-50 border border-gold/5 hover:border-gold/20 hover:shadow-xl hover:shadow-gold/10 transition-all duration-500 cursor-pointer w-full"
                  >
                    {/* Cover Image */}
                    <div className="relative h-56 overflow-hidden">
                      {post.mainImage?.asset ? (
                        <img
                          src={urlFor(post.mainImage as SanityImageSource).width(800).height(600).url()}
                          alt={post.mainImage?.alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#011122]/10" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-8 items-center text-center">
                      <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-muted mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString('en-AU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />6 min read
                        </span>
                      </div>

                      <h2 className="text-xl font-serif text-[#011122] leading-snug mb-2 group-hover:text-gold transition-colors duration-300 flex-1">
                        {post.title}
                      </h2>

                      <p className="text-muted font-sans text-sm leading-relaxed mb-8 line-clamp-3">
                        {post.excerpt?.replace(/—/g, '-')}
                      </p>

                      <div className="mt-auto flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#011122]">
                        Read More
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-8 py-6 bg-gold/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#011122] mb-2 leading-tight">
              {pageData?.newsletter?.heading || (
                <>
                  Market intelligence, <br />{' '}
                  <span className="text-gold">direct to your inbox.</span>
                </>
              )}
            </h2>
            <p className="text-xl text-muted font-sans mb-4 max-w-xl mx-auto leading-relaxed">
              {pageData?.newsletter?.description ||
                'Join 1,200+ Sydney buyers who receive our monthly market briefing.'}
            </p>
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 px-6 bg-[#011122] rounded-2xl border border-gold font-sans shadow-xl inline-block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white text-sm">Successfully Subscribed!</p>
                    <p className="text-xs text-gold/60">
                      {pageData?.newsletter?.successMessage ||
                        "You're now on the list for our latest insights."}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 rounded-2xl bg-white border border-gold/10 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all font-sans text-base"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className={`shrink-0 rounded-2xl px-8 py-4 bg-gold hover:bg-gold-hover text-white font-bold uppercase tracking-widest text-sm transition-transform duration-300 flex items-center gap-2 group justify-center ${
                    isSubscribing ? 'opacity-70' : 'hover:scale-[1.03]'
                  }`}
                >
                  {isSubscribing ? 'Sending...' : pageData?.newsletter?.buttonText || 'Subscribe'}
                  {!isSubscribing && (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
