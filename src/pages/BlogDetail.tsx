import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { blogPosts, type BlogSection } from '../data/blogs';

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case 'heading':
      return (
        <h2 key={index} className="text-3xl md:text-4xl font-serif text-black mt-16 mb-6 leading-tight">
          {section.text}
        </h2>
      );
    case 'subheading':
      return (
        <h3 key={index} className="text-2xl font-serif text-black mt-10 mb-4">
          {section.text}
        </h3>
      );
    case 'paragraph':
      return (
        <p key={index} className="text-xl text-muted font-sans leading-relaxed mb-6">
          {section.text}
        </p>
      );
    case 'quote':
      return (
        <blockquote key={index} className="my-12 pl-8 border-l-4 border-sky-400">
          <p className="text-2xl md:text-3xl font-serif text-black italic leading-snug">
            "{section.text}"
          </p>
        </blockquote>
      );
    case 'list':
      return (
        <ul key={index} className="my-8 space-y-4">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-lg text-muted font-sans leading-relaxed">
              <span className="mt-2 shrink-0 w-2 h-2 rounded-full bg-sky-500" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

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

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = blogPosts[currentIndex - 1] || null;
  const nextPost = blogPosts[currentIndex + 1] || null;

  return (
    <div className="w-full bg-white selection:bg-black/10 pt-32">

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
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-6 ${post.categoryColor}`}>
              {post.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-serif text-black leading-[1.05] mb-8">
              {post.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted font-sans leading-relaxed mb-10">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 pb-10 border-b border-black/8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#021f3a] flex items-center justify-center text-white font-bold font-serif text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-black">{post.author}</p>
                  <p className="text-xs text-muted">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-widest text-muted ml-auto">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto h-[45vh] md:h-[55vh] rounded-[2.5rem] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
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
              {post.content.map((section, i) => renderSection(section, i))}
            </motion.div>

            {/* Author Bio */}
            <div className="mt-20 p-8 rounded-3xl bg-sky-50 border border-sky-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#021f3a] flex items-center justify-center text-white font-bold font-serif text-2xl shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-serif text-black mb-1">{post.author} — {post.authorRole}</p>
                <p className="text-muted font-sans text-sm leading-relaxed">
                  20+ years operating in the Sydney property market. Specialist in off-market acquisition, SMSF strategy, and data-driven buyer representation.
                </p>
              </div>
            </div>

            {/* Prev / Next */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-black/5 pt-12">
              {prevPost && (
                <button
                  onClick={() => { navigate(`/blog/${prevPost.slug}`); window.scrollTo(0, 0); }}
                  className="group flex items-center gap-4 p-6 rounded-2xl bg-neutral-50 border border-black/5 hover:border-black/20 hover:shadow-md transition-all text-left"
                >
                  <ArrowLeft className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Previous</p>
                    <p className="text-base font-serif text-black line-clamp-2">{prevPost.title}</p>
                  </div>
                </button>
              )}
              {nextPost && (
                <button
                  onClick={() => { navigate(`/blog/${nextPost.slug}`); window.scrollTo(0, 0); }}
                  className="group flex items-center justify-end gap-4 p-6 rounded-2xl bg-neutral-50 border border-black/5 hover:border-black/20 hover:shadow-md transition-all text-right md:col-start-2"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Next</p>
                    <p className="text-base font-serif text-black line-clamp-2">{nextPost.title}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
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
                      key={other.slug}
                      onClick={() => { navigate(`/blog/${other.slug}`); window.scrollTo(0, 0); }}
                      className="group flex gap-4 items-center text-left hover:bg-neutral-50 rounded-2xl p-3 -mx-3 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <img src={other.coverImage} alt={other.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1.5 w-fit ${other.categoryColor}`}>{other.category}</span>
                        <p className="text-sm font-serif text-black leading-snug group-hover:text-sky-800 transition-colors line-clamp-2">{other.title}</p>
                        <span className="text-[10px] text-muted mt-1">{other.readTime}</span>
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
