import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, CheckCircle2, MessageSquare, Phone, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock, PortableTextComponents } from '@portabletext/react';
import type { SanityImageSource } from '@sanity/image-url';
import PageSEO from '../components/PageSEO';
import Breadcrumb from '../components/Breadcrumb';
import { openCalendly } from '../utils/calendly';
import Link from '../components/Link';
import { blogPosts as localBlogPosts } from '../data/blogs';

// Must mirror the array in Blog.tsx exactly so detail page image = list page image
const blogCoverImages = [
  '/images/acquisitions/user_img_blog_2.png',
  '/images/blog/blog_2.png',
  '/images/blog/blog_3.png',
  '/images/blog/blog_4.png',
  '/images/blog/blog_5.png',
  '/images/acquisitions/aus_house_1.png',
  '/images/acquisitions/prop_1.png',
  '/images/acquisitions/prop_2.png',
  '/images/acquisitions/prop_3.png',
  '/images/acquisitions/user_prop_10.png',
  '/images/acquisitions/user_prop_11.png',
  '/images/acquisitions/aus_house_2.png',
];

interface PostImage {
  asset?: { _ref?: string };
  alt?: string;
  isLocal?: boolean;
}

interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: PostImage;
  publishedAt: string;
  body: PortableTextBlock[];
  author: { name: string; image: SanityImageSource; bio: PortableTextBlock[] };
  categories: { title: string; color: string }[];
  faqs?: { question: string; answer: string }[];
  seoModule?: import('../types/seo').SeoModule;
  seo?: { metaTitle?: string; metaDescription?: string };
}

const replaceEmDash = (node: React.ReactNode): React.ReactNode => {
  if (typeof node === 'string') {
    return node.replace(/—/g, '-');
  }
  if (Array.isArray(node)) {
    return node.map(replaceEmDash);
  }
  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    if (element.props?.children) {
      return React.cloneElement(element, {
        ...element.props,
        children: replaceEmDash(element.props.children)
      });
    }
  }
  return node;
};

const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const img = value as { asset?: { _ref?: string }; alt?: string };
      if (!img?.asset?._ref) return null;
      return (
        <div className="my-8 rounded-[1rem] overflow-hidden border border-black/5 shadow-sm">
          <img
            src={urlFor(img as SanityImageSource).url()}
            alt={img.alt || 'Blog Image'}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-lg md:text-xl font-sans font-black text-gold mt-6 mb-2 leading-tight first:mt-0 text-center uppercase tracking-wide">
        {replaceEmDash(children)}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base md:text-lg font-sans font-black text-gold mt-4 mb-2 text-center uppercase tracking-wide">
        {replaceEmDash(children)}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-xs md:text-sm text-muted font-sans leading-relaxed mb-3 text-left">
        {replaceEmDash(children)}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 py-2 px-6 border-l-2 border-gold bg-gold/5 rounded-r-xl relative text-left">
        <p className="text-sm md:text-base font-sans font-black text-[#011122] leading-snug italic">
          {replaceEmDash(children)}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-3 space-y-1.5 mb-3 max-w-none">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-xs md:text-sm text-muted font-sans leading-relaxed">
        <CheckCircle2 className="shrink-0 w-4 h-4 text-gold opacity-80 mt-0.5" />
        <div className="text-left">{replaceEmDash(children)}</div>
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
          faqs
        }`;
        let data = await client.fetch(query, { slug });
        
        if (!data) {
          const localPost = localBlogPosts.find(p => p.slug === slug);
          if (localPost) {
            // Fetch Sanity slugs so we compute the same index as Blog.tsx
            let matchedCover = localPost.coverImage;
            try {
              const sanitySlugsData: string[] = await client.fetch(`*[_type == "post"].slug.current`);
              const sanitySlugs = new Set(sanitySlugsData || []);
              const filteredLocalPosts = localBlogPosts.filter(p => !sanitySlugs.has(p.slug));
              const localIdx = filteredLocalPosts.findIndex(p => p.slug === slug);
              if (localIdx !== -1) {
                matchedCover = blogCoverImages[localIdx % blogCoverImages.length];
              }
            } catch {
              // fallback to coverImage from data file
            }

            data = {
              _id: localPost.id,
              title: localPost.title,
              slug: { current: localPost.slug },
              excerpt: localPost.excerpt,
              mainImage: { asset: { _ref: matchedCover }, isLocal: true },
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

      } catch {
        // silently fall back
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-32 bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gold/5 pt-32 text-center px-8">
        <h1 className="text-4xl font-sans font-black text-[#011122] mb-4">Article Not Found</h1>
        <p className="text-muted font-sans mb-2 text-base">We couldn't find the article you were looking for.</p>
        <Link
          href="/blog"
          className="rounded-full px-8 py-3.5 bg-[#011122] text-white font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white selection:bg-gold/20">
      <PageSEO
        title={post?.seoModule?.metaTitle || post?.seo?.metaTitle || post?.title}
        description={post?.seoModule?.metaDescription || post?.seo?.metaDescription || post?.excerpt}
        seoModule={post?.seoModule}
        path={`/blog/${slug}`}
        breadcrumbs={[{ name: 'Blog', url: '/blog' }, { name: post?.title || 'Article', url: `/blog/${slug}` }]}
        type="article"
      />

      {/* ── Author JSON-LD ─────────────────────────────────────────── */}
      {post?.author?.name && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: post.author.name,
              ...(post.author.image ? { image: urlFor(post.author.image).width(200).url() } : {}),
            }, null, 0)}
          </script>
        </Helmet>
      )}

      {/* ── Editorial Header ─────────────────────────────────────────── */}
      <header className="relative pt-32 md:pt-40 pb-10 overflow-hidden bg-[#011122]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <Breadcrumb
                items={[
                  { name: 'Blog', url: '/blog' },
                  { name: post.title || 'Article' },
                ]}
                variant="dark"
              />
              {post.categories?.[0] && (
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                  {post.categories[0].title}
                </span>
              )}
            </div>
            <div className="flex items-center justify-center gap-4 mb-4 text-xs font-bold uppercase tracking-[0.15em] text-gold">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold" />
                {new Date(post.publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gold" />
                8 Min Read
              </div>
            </div>

            <h1 className="text-2xl md:text-5xl lg:text-6xl font-sans font-black text-white leading-tight mb-6 max-w-4xl mx-auto text-center tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-full overflow-hidden px-2">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl border border-gold/30 overflow-hidden shrink-0">
                {post.author?.image ? (
                  <img src={urlFor(post.author.image).url()} alt={post.author.name} className="w-full h-full object-cover" />
                ) : (
                  <img src="/author-profile.jpg" alt={post.author?.name || 'Alex'} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="text-left min-w-0">
                <p className="text-[11px] sm:text-sm font-bold text-white uppercase tracking-widest leading-none mb-1 whitespace-nowrap">{post.author?.name || 'Alex'}</p>
                <p className="text-[7.5px] sm:text-[10px] text-white/50 uppercase tracking-[0.15em] font-bold whitespace-nowrap overflow-hidden text-ellipsis">Licensed Buyers Agent, JJ Property Partner</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Featured Image — sits in white section, below the navy header ── */}
      <section className="relative px-4 md:px-8 pt-8 mb-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto rounded-[1.5rem] overflow-hidden border border-black/5 shadow-md bg-neutral-100 aspect-[16/9] relative"
        >
          {post.mainImage ? (
            <img
              src={post.mainImage.isLocal ? post.mainImage.asset?._ref ?? '' : urlFor(post.mainImage as SanityImageSource).url()}
              alt={post.mainImage?.alt || post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-[#011122]" />
          )}
        </motion.div>
      </section>

      {/* ── Article Content (Vertically Tightened post image) ─────────── */}
      <section className="px-4 md:px-8 pb-12 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 animate-none">
          
          {/* Main Content Body */}
          <article className="lg:col-span-8 lg:pr-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose-container"
            >
              {post.body ? (
                <PortableText value={post.body} components={ptComponents} />
              ) : (
                <p className="text-muted text-xs italic">Content loading...</p>
              )}

              {/* FAQ Section */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-6 border-t border-gold/10 pt-5">
                  <div className="mb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gold mb-1 block">Information Resource</span>
                    <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-gold animate-none" />
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <div className="space-y-2">
                    {post.faqs.map((faq, idx) => (
                      <div key={idx} className="group border-b border-[#011122]/5 pb-2 pt-1.5 last:border-0">
                        <h3 className="text-sm md:text-base font-sans font-black text-[#011122] mb-0.5 group-hover:text-gold transition-colors">
                          {faq.question}
                        </h3>
                        <p className="text-xs md:text-sm text-muted font-sans leading-snug">
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
            <div className="sticky top-24 space-y-6">
              
              {/* Strategy Session Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-[1.75rem] bg-[#011122] text-white relative overflow-hidden group shadow-md"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 blur-[60px] rounded-full group-hover:bg-gold/30 transition-colors" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-1">Take the next step</p>
                <h2 className="text-xl md:text-2xl font-sans font-black mb-2 leading-tight">
                  Ready to buy with confidence?
                </h2>
                <p className="text-xs text-white/60 font-sans leading-relaxed mb-6">
                  Our active roster is strictly limited. Book a complimentary 30-minute session to discuss your brief.
                </p>
                
                <button
                  onClick={openCalendly}
                  className="w-full py-3.5 rounded-xl bg-gold text-white font-bold uppercase tracking-widest text-[9px] hover:bg-white hover:text-[#011122] transition-all duration-300 shadow-md flex items-center justify-center gap-2 group/btn"
                >
                  Book Strategy Session
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <a href="tel:+61481334458" className="flex items-center gap-3 text-xs font-bold text-white/60 hover:text-white transition-colors cursor-pointer">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    0481 33 44 58
                  </a>
                  <a href="mailto:info@jjpropertypartner.com.au" className="flex items-center gap-3 text-xs font-bold text-white/60 hover:text-white transition-colors cursor-pointer">
                    <Mail className="w-4 h-4 text-gold shrink-0" />
                    info@jjpropertypartner.com.au
                  </a>
                </div>
              </motion.div>

              {/* Related Reading */}
              {otherPosts.length > 0 && (
                <div className="p-6 rounded-[1.75rem] border border-[#011122]/5 bg-white shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4">Related Intelligence</h3>
                  <div className="space-y-4">
                    {otherPosts.map((other) => (
                      <Link
                        key={other._id}
                        href={`/blog/${other.slug.current}`}
                        className="group flex flex-col gap-1"
                      >
                        <p className="text-sm font-sans font-black text-[#011122] group-hover:text-gold transition-colors leading-snug">
                          {other.title}
                        </p>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-muted">
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
      <section className="py-8 px-6 bg-[#011122] relative overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gold/5 blur-[180px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-4xl font-sans font-black text-white mb-2 leading-tight">
            Market Intelligence, <span className="text-gold">directly to you.</span>
          </h2>
          <p className="text-sm md:text-base text-white/60 font-sans mb-6 leading-relaxed">
            Join Sydney's most informed buyers. Receive data-led market analysis and off-market opportunities every month.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold text-xs transition-all"
            />
            <button className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-hover text-white font-bold uppercase tracking-widest text-xs transition-transform hover:scale-105 active:scale-95">
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
