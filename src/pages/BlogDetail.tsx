import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar, CheckCircle2, MessageSquare, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import SEO from '../components/SEO';
import { openCalendly } from '../utils/calendly';
import Link from '../components/Link';
import { blogPosts as localBlogPosts } from '../data/blogs';

interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: any;
  publishedAt: string;
  body: any[];
  author: { name: string; image: any; bio: any };
  categories: { title: string; color: string }[];
  seo?: { metaTitle: string; metaDescription: string; ogImage: any };
  faqs?: { question: string; answer: string }[];
}

const ptComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-5xl font-serif text-[#011122] mt-20 mb-8 leading-tight first:mt-0 text-center">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl font-serif text-[#011122] mt-14 mb-6 text-center">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-xl text-muted font-sans leading-relaxed mb-8 text-center">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-16 pl-10 border-l-4 border-gold relative">
        <div className="absolute -left-2 top-0 w-4 h-4 bg-gold rounded-full blur-md opacity-20" />
        <p className="text-2xl md:text-3xl font-serif text-[#011122] leading-snug italic">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="my-10 space-y-6 mb-12">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-center justify-center gap-5 text-lg md:text-xl text-muted font-sans leading-relaxed">
        <CheckCircle2 className="mt-1.5 shrink-0 w-6 h-6 text-gold opacity-80" />
        <div>{children}</div>
      </li>
    ),
  },
};

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<SanityPost | null>(null);
  const [otherPosts, setOtherPosts] = useState<SanityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          excerpt,
          mainImage {
            asset,
            alt
          },
          publishedAt,
          body,
          author-> { name, image, bio },
          "categories": categories[]->{ title, color },
          seo,
          faqs
        }`;
        let data = await client.fetch(query, { slug });
        
        if (!data) {
          const localPost = localBlogPosts.find(p => p.slug === slug);
          if (localPost) {
            data = {
              _id: localPost.id,
              title: localPost.title,
              slug: { current: localPost.slug },
              excerpt: localPost.excerpt,
              mainImage: { asset: { _ref: localPost.coverImage }, isLocal: true },
              publishedAt: localPost.date,
              body: localPost.content.map(section => {
                if (section.type === 'list') {
                  return section.items?.map(item => ({
                    _type: 'block',
                    style: 'normal',
                    listItem: 'bullet',
                    children: [{ _type: 'span', text: item }]
                  }));
                }
                if (section.type === 'quote') {
                  return {
                    _type: 'block',
                    style: 'blockquote',
                    children: [{ _type: 'span', text: section.text }]
                  };
                }
                return {
                  _type: 'block',
                  style: section.type === 'heading' ? 'h2' : section.type === 'subheading' ? 'h3' : 'normal',
                  children: [{ _type: 'span', text: section.text }]
                };
              }).flat(),
              author: { name: localPost.author, image: null, bio: localPost.authorRole },
              categories: [{ title: localPost.category, color: localPost.categoryColor }],
              seo: localPost.seo
            };
          }
        }
        setPost(data);

        const otherQuery = `*[_type == "post" && slug.current != $slug][0...3] {
          _id,
          title,
          slug,
          mainImage,
          "categories": categories[]->{ title, color }
        }`;
        const others = await client.fetch(otherQuery, { slug });
        setOtherPosts(others);

      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-40 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gold/5 pt-40 text-center px-8">
        <h1 className="text-5xl font-serif text-[#011122] mb-4">Article Not Found</h1>
        <p className="text-muted font-sans mb-2 text-lg">We couldn't find the article you were looking for.</p>
        <Link
          href="/blog"
          className="rounded-full px-8 py-4 bg-[#011122] text-white font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white selection:bg-gold/20 ">
      <SEO 
        title={post.seo?.metaTitle || post.title} 
        description={post.seo?.metaDescription || post.excerpt}
        image={post.seo?.ogImage || post.mainImage}
        article={true}
      />

      {/* ── Editorial Header ─────────────────────────────────────────── */}
      <header className="relative pt-44 pb-20 overflow-hidden bg-[#011122]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
              <Link
                href="/blog"
                className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-gold hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
              <div className="w-px h-4 bg-white/20" />
              {post.categories?.[0] && (
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
                  {post.categories[0].title}
                </span>
              )}
              <div className="flex items-center gap-6 ml-auto text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  {new Date(post.publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  8 Min Read
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-serif text-white leading-[1.1] mb-12 max-w-5xl mx-auto text-center">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-16 rounded-2xl border border-gold/30 p-1.5">
                <div className="w-full h-full rounded-xl bg-gold/10 flex items-center justify-center text-gold font-serif text-2xl overflow-hidden">
                  {post.author?.image ? (
                    <img src={urlFor(post.author.image).url()} alt={post.author.name} className="w-full h-full object-cover" />
                  ) : (
                    post.author?.name?.charAt(0) || 'A'
                  )}
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-white uppercase tracking-widest">{post.author?.name || 'Alex'}</p>
                <p className="text-xs text-white/50 uppercase tracking-[0.2em] font-bold">Licensed Buyers Agent, JJ Property Partner</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Featured Image ──────────────────────────────────────────── */}
      <section className="relative px-4 md:px-8 -mt-10 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-7xl mx-auto h-[50vh] md:h-[80vh] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-black/40 border-8 border-white"
        >
          {post.mainImage ? (
            <img
              src={post.mainImage.isLocal ? post.mainImage.asset._ref : urlFor(post.mainImage).url()}
              alt={post.mainImage?.alt || post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#011122]" />
          )}
        </motion.div>
      </section>

      {/* ── Article Content ─────────────────────────────────────────── */}
      <section className="px-8 pb-32 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Main Content Body */}
          <article className="lg:col-span-8 lg:pr-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose-container"
            >
              {post.body ? (
                <PortableText value={post.body} components={ptComponents} />
              ) : (
                <p className="text-muted italic">Content loading...</p>
              )}

              {/* FAQ Section */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-24 border-t-2 border-gold/10 pt-20">
                  <div className="mb-16">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-4 block">Information Resource</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#011122] flex items-center gap-4">
                      <MessageSquare className="w-10 h-10 text-gold" />
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <div className="space-y-16">
                    {post.faqs.map((faq, idx) => (
                      <div key={idx} className="group border-b border-[#011122]/5 pb-16 last:border-0">
                        <h4 className="text-2xl md:text-3xl font-serif text-[#011122] mb-6 group-hover:text-gold transition-colors">
                          {faq.question}
                        </h4>
                        <p className="text-xl text-muted font-sans leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-10">
              
              {/* Strategy Session Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-[3rem] bg-[#011122] text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 blur-[60px] rounded-full group-hover:bg-gold/30 transition-colors" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold mb-6">Take the next step</h3>
                <h2 className="text-2xl md:text-3xl font-serif mb-6 leading-tight">
                  Ready to buy with confidence?
                </h2>
                <p className="text-white/60 font-sans leading-relaxed mb-10">
                  Our active roster is strictly limited. Book a complimentary 30-minute session to discuss your brief.
                </p>
                
                <button
                  onClick={openCalendly}
                  className="w-full py-5 rounded-2xl bg-gold text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-[#011122] transition-all duration-500 shadow-xl shadow-gold/20 flex items-center justify-center gap-3 group/btn"
                >
                  Book Strategy Session
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                  <div className="flex items-center gap-4 text-xs font-bold text-white/60 hover:text-white transition-colors cursor-pointer">
                    <Phone className="w-4 h-4 text-gold" />
                    0481 33 44 58
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-white/60 hover:text-white transition-colors cursor-pointer">
                    <Mail className="w-4 h-4 text-gold" />
                    info@jjpropertypartner.com.au
                  </div>
                </div>
              </motion.div>

              {/* Related Reading */}
              {otherPosts.length > 0 && (
                <div className="p-10 rounded-[3rem] border border-[#011122]/5">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted mb-8">Related Intelligence</h3>
                  <div className="space-y-8">
                    {otherPosts.map((other) => (
                      <Link
                        key={other._id}
                        href={`/blog/${other.slug.current}`}
                        className="group flex flex-col gap-2"
                      >
                        <p className="text-lg font-serif text-[#011122] group-hover:text-gold transition-colors leading-snug">
                          {other.title}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                          Read Full Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* ── Newsletter Section ────────────────────────────────────────── */}
      <section className="py-32 px-8 bg-[#011122] relative overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gold/5 blur-[180px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
            Market Intelligence, <span className="text-gold">directly to you.</span>
          </h2>
          <p className="text-xl text-white/60 font-sans mb-12 leading-relaxed">
            Join Sydney's most informed buyers. Receive data-led market analysis and off-market opportunities every month.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-8 py-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-all"
            />
            <button className="px-10 py-5 rounded-2xl bg-gold hover:bg-gold-hover text-white font-bold uppercase tracking-widest text-sm transition-transform hover:scale-105 active:scale-95">
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
// Trigger rebuild
