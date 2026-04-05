import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import SEO from '../components/SEO';

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
}

const ptComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl font-serif text-black mt-16 mb-6 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-serif text-black mt-10 mb-4">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-xl text-muted font-sans leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-12 pl-8 border-l-4 border-sky-400">
        <p className="text-2xl md:text-3xl font-serif text-black italic leading-snug">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="my-8 space-y-4">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-4 text-lg text-muted font-sans leading-relaxed">
        <span className="mt-2 shrink-0 w-2 h-2 rounded-full bg-sky-500" />
        {children}
      </li>
    ),
  },
};

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
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
          seo
        }`;
        const data = await client.fetch(query, { slug });
        setPost(data);

        // Fetch other posts
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
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-40 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 pt-40 text-center px-8">
        <h1 className="text-5xl font-serif text-black mb-4">Article Not Found</h1>
        <p className="text-muted font-sans mb-10 text-lg">We couldn't find the article you were looking for.</p>
        <button
          onClick={() => navigate('/blog')}
          className="rounded-full px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white selection:bg-black/10 pt-32">
      <SEO 
        title={post.seo?.metaTitle || post.title} 
        description={post.seo?.metaDescription || post.excerpt}
        image={post.seo?.ogImage || post.mainImage}
        article={true}
      />

      {/* Back nav */}
      <div className="px-8 pt-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => { navigate('/blog'); window.scrollTo(0, 0); }}
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Articles
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header className="px-8 pt-10 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {post.categories?.[0] && (
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-6 ${post.categories[0].color || 'bg-sky-100 text-sky-800'}`}>
                {post.categories[0].title}
              </span>
            )}

            <h1 className="text-4xl md:text-6xl font-serif text-black leading-[1.05] mb-8">
              {post.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted font-sans leading-relaxed mb-10">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 pb-10 border-b border-black/8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#021f3a] flex items-center justify-center text-white font-bold font-serif text-lg overflow-hidden">
                  {post.author?.image ? (
                    <img src={urlFor(post.author.image).url()} alt={post.author.name} className="w-full h-full object-cover" />
                  ) : (
                    post.author?.name?.charAt(0) || 'A'
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-black">{post.author?.name || 'Alex'}</p>
                  <p className="text-xs text-muted">Principal Advisor, JJ Property Partner</p>
                </div>
              </div>
              <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-widest text-muted ml-auto">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(post.publishedAt).toLocaleDateString()}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />6 min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto h-[45vh] md:h-[55vh] rounded-[2.5rem] overflow-hidden">
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).url()}
              alt={post.mainImage?.alt || post.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Article Body + Sidebar */}
      <div className="px-8 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Main Content */}
          <article className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <PortableText value={post.body} components={ptComponents} />
            </motion.div>

            {/* Author Bio */}
            <div className="mt-20 p-8 rounded-3xl bg-sky-50 border border-sky-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#021f3a] flex items-center justify-center text-white font-bold font-serif text-2xl shrink-0 overflow-hidden">
                {post.author?.image ? (
                  <img src={urlFor(post.author.image).width(200).height(200).url()} alt={post.author.name} className="w-full h-full object-cover" />
                ) : (
                   post.author?.name?.charAt(0) || 'A'
                )}
              </div>
              <div>
                <p className="text-lg font-serif text-black mb-1">{post.author?.name || 'Alex'} — Principal Advisor</p>
                <p className="text-muted font-sans text-sm leading-relaxed">
                  20+ years operating in the Sydney property market. Specialist in off-market acquisition, SMSF strategy, and data-driven buyer representation.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-40 flex flex-col gap-8">
              {/* CTA Card */}
              <div className="p-8 rounded-[2.5rem] bg-[#021f3a] text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 mb-4">Work With Us</p>
                <h3 className="text-2xl font-serif mb-4 leading-snug">Ready to act on this intelligence?</h3>
                <p className="text-white/60 font-sans text-sm leading-relaxed mb-8">
                  Our active roster is strictly limited. Book a confidential strategy call to discuss your brief.
                </p>
                <button
                  onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                  className="w-full rounded-2xl px-6 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Book Strategy Call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* More Articles */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-6">More Articles</p>
                <div className="flex flex-col gap-5">
                  {otherPosts.map((other) => (
                    <button
                      key={other._id}
                      onClick={() => { navigate(`/blog/${other.slug.current}`); window.scrollTo(0, 0); }}
                      className="group flex gap-4 items-center text-left hover:bg-neutral-50 rounded-2xl p-3 -mx-3 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        {other.mainImage && (
                          <img src={urlFor(other.mainImage).width(200).height(200).url()} alt={other.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        {other.categories?.[0] && (
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1.5 w-fit ${other.categories[0].color || 'bg-sky-100 text-sky-800'}`}>{other.categories[0].title}</span>
                        )}
                        <p className="text-sm font-serif text-black leading-snug group-hover:text-sky-800 transition-colors line-clamp-2">{other.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
