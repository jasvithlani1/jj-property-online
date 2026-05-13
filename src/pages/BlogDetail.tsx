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
      <h2 className="text-3xl md:text-5xl font-serif text-[#011122] mt-16 mb-8 leading-tight first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl font-serif text-[#011122] mt-12 mb-6">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-xl text-muted font-sans leading-relaxed mb-8">
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
    bullet: ({ children }: any) => <ul className="my-10 space-y-6">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-5 text-lg md:text-xl text-muted font-sans leading-relaxed">
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

      {/* ── Progress Bar ─────────────────────────────────────────────── */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gold origin-left z-[100]"
        style={{ scaleX: 0 }} // Will be updated by scroll
      />

      {/* ── Editorial Header ─────────────────────────────────────────── */}
      <header className="relative pt-32 pb-12 overflow-hidden bg-[#011122]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-10">
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
            </div>

            <h1 className="text-4xl md:text-7xl font-serif text-white leading-[1.1] mb-12">
              {post.title}
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-gold/30 p-1">
                  <div className="w-full h-full rounded-full bg-gold/10 flex items-center justify-center text-gold font-serif text-xl overflow-hidden">
                    {post.author?.image ? (
                      <img src={urlFor(post.author.image).url()} alt={post.author.name} className="w-full h-full object-cover" />
                    ) : (
                      post.author?.name?.charAt(0) || 'A'
                    )}
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white uppercase tracking-widest">{post.author?.name || 'Alex'}</p>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Principal Advisor</p>
                </div>
              </div>

              <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
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
          </motion.div>
        </div>
      </header>

      {/* ── Featured Image ──────────────────────────────────────────── */}
      <section className="relative px-4 md:px-8 -mt-16 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-6xl mx-auto h-[50vh] md:h-[75vh] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-black/40 border-8 border-white"
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
                <div className="mt-24 border-t border-gold/10 pt-20">
                  <h2 className="text-4xl md:text-5xl font-serif text-[#011122] mb-12 flex items-center gap-4">
                    <MessageSquare className="w-10 h-10 text-gold" />
                    Common Questions
                  </h2>
                  <div className="space-y-12">
                    {post.faqs.map((faq, idx) => (
                      <div key={idx} className="group">
                        <h4 className="text-xl md:text-2xl font-serif text-[#011122] mb-4 group-hover:text-gold transition-colors">
                          {faq.question}
                        </h4>
                        <p className="text-lg text-muted font-sans leading-relaxed">
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
                className="p-10 rounded-[3rem] bg-gold/5 border border-gold/10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[60px] rounded-full group-hover:bg-gold/20 transition-colors" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold mb-6">Take the next step</h3>
                <h2 className="text-2xl md:text-3xl font-serif text-[#011122] mb-6 leading-tight">
                  Ready to buy with confidence?
                </h2>
                <p className="text-muted font-sans leading-relaxed mb-10">
                  Book a complimentary 30-minute strategy session with Alex to discuss your specific property goals.
                </p>
                
                <button
                  onClick={openCalendly}
                  className="w-full py-5 rounded-2xl bg-[#011122] text-white font-bold uppercase tracking-widest text-[10px] hover:bg-gold transition-all duration-500 shadow-xl shadow-gold/10 flex items-center justify-center gap-3 group/btn"
                >
                  Book Strategy Session
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4 text-xs font-bold text-muted hover:text-[#011122] transition-colors cursor-pointer">
                    <Phone className="w-4 h-4 text-gold" />
                    0481 33 44 58
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-muted hover:text-[#011122] transition-colors cursor-pointer">
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
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
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
