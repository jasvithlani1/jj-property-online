import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Home as HomeIcon, TrendingUp, ShieldCheck, ArrowRight, Plus, Star, Quote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';

// ── Data ──────────────────────────────────────────────────────────────────────

const servicesPreview = [
  {
    title: 'First Home Buyers',
    description: 'Navigate the Sydney market with a veteran ally. We unlock off-market access and secure your foundation.',
    icon: <HomeIcon className="w-6 h-6" />,
    color: 'bg-[#E6FBFF]',
    anchor: 'first-home-buyers',
  },
  {
    title: 'Property Investors',
    description: 'Data-driven acquisition. We target high-yield, high-growth assets using 20+ years of local expertise.',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'bg-[#F0F7FF]',
    anchor: 'property-investors',
  },
  {
    title: 'SMSF Property',
    description: 'Strategic superannuation growth through direct property investment. Secure your retirement with precision.',
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'bg-[#F5F5F5]',
    anchor: 'smsf-property',
  },
];

const googleReviews = [
  { name: 'Sarah Jenkins', text: "Alex's off-market knowledge is unmatched. Saved us $150k.", date: '2 weeks ago', rating: 5 },
  { name: 'Michael T.', text: 'Incredibly professional. The data-driven approach gave us total confidence.', date: '1 month ago', rating: 5 },
  { name: 'David & Emma', text: 'We were looking for 8 months. Alex found our dream home in 3 weeks.', date: '3 months ago', rating: 5 },
  { name: 'James R.', text: 'Highly recommend for anyone building an investment portfolio in Sydney.', date: '4 months ago', rating: 5 },
  { name: 'Celine W.', text: 'A seamless, stress-free acquisition from start to finish.', date: '6 months ago', rating: 5 },
  { name: 'Mark H.', text: 'Negotiation skills are top-tier. Worth every cent.', date: '1 year ago', rating: 5 },
  { name: 'Olivia P.', text: 'The strategic property plan changed our entire trajectory. Best decision we made.', date: '1.5 years ago', rating: 5 },
  { name: 'Robert K.', text: 'Exceptional due diligence. He spotted structural issues we missed.', date: '2 years ago', rating: 5 },
];

const row1Reviews = [...googleReviews, ...googleReviews];
const row2Reviews = [...googleReviews].reverse();
const row2Extended = [...row2Reviews, ...row2Reviews];

const faqs = [
  { question: 'Do you only buy properties in Sydney?', answer: 'While Sydney is our primary market and where our deepest off-market networks lie, we also represent clients in select high-growth regional corridors.' },
  { question: 'What is your fee structure?', answer: 'We operate on a transparent fixed-fee or percentage basis depending on the complexity of the brief. This ensures our incentives are perfectly aligned with securing your property at the absolute best price.' },
  { question: 'How long does the process take?', answer: 'On average, our clients secure a property within 30 to 45 days. However, our focus is on precision, not speed. We will never rush an acquisition if the data doesn\'t align with your goals.' },
  { question: 'What makes off-market properties better?', answer: 'Off-market properties allow you to bypass the emotional bidding wars of public auctions. You get first access to premium assets and can negotiate rationally based on pure data.' },
  { question: 'Can you help with SMSF investing?', answer: 'Yes. In fact, SMSF property acquisition is one of our core specialties. We work closely with your financial planner and accountant to ensure strict compliance and targeted growth.' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isReviewPaused, setIsReviewPaused] = useState(false);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let frameId: number;
    const fadeDuration = 0.5;
    const resetDelay = 100;

    const updateFade = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      if (!duration) { frameId = requestAnimationFrame(updateFade); return; }
      let newOpacity = 1;
      if (currentTime < fadeDuration) newOpacity = currentTime / fadeDuration;
      else if (currentTime > duration - fadeDuration) newOpacity = (duration - currentTime) / fadeDuration;
      setOpacity(newOpacity);
      frameId = requestAnimationFrame(updateFade);
    };

    const handleEnded = () => {
      setOpacity(0);
      setTimeout(() => { if (video) { video.currentTime = 0; video.play().catch(() => {}); } }, resetDelay);
    };

    video.addEventListener('ended', handleEnded);
    frameId = requestAnimationFrame(updateFade);
    return () => { video.removeEventListener('ended', handleEnded); cancelAnimationFrame(frameId); };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-sky-50 selection:bg-black/10">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <motion.section
        id="home"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative h-screen bg-white flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-36 md:pt-40"
      >
        <div className="absolute top-[300px] inset-x-0 bottom-0 -z-10">
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/drhnyntss/video/upload/v1774989962/Drone_push-in_Parramatta_202604010157_bogw13.mp4"
            autoPlay muted playsInline
            className="h-full w-full object-cover transition-opacity duration-100"
            style={{ opacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
        </div>

        <h1 className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal leading-[0.95] tracking-[-2.46px] text-black font-serif">
          The <span className="italic text-muted">advantage</span> for <br className="hidden md:block" />
          <span className="italic text-muted">Sydney</span> Property Buyers.
        </h1>

        <p className="animate-fade-rise-delay text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-muted font-sans">
          Securing elite off-market access for home buyers and investors.
          With 20+ years of property and IT expertise, we navigate the noise
          to build your $5M+ portfolio with absolute precision.
        </p>

        <div className="animate-fade-rise-delay-2 flex flex-col sm:flex-row gap-4 mt-12">
          <button onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }} className="rounded-full px-14 py-5 text-base bg-black text-white hover:scale-[1.03] transition-transform duration-300 uppercase tracking-widest font-medium shadow-2xl shadow-black/10 cursor-pointer">
            Book Session
          </button>
          <button onClick={() => { navigate('/case-studies'); window.scrollTo(0, 0); }} className="rounded-full px-14 py-5 text-base border border-black/10 bg-white/50 backdrop-blur-sm text-black hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest font-medium flex items-center justify-center gap-2 cursor-pointer">
            Client Stories
          </button>
        </div>
      </motion.section>

      {/* ── About Alex Preview ───────────────────────────────────────────── */}
      <section id="about" className="relative z-10 py-32 px-8 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6FBFF] text-black border border-black/5 text-xs font-bold uppercase tracking-widest mb-8">
              <span className="block w-2 h-2 rounded-full bg-black animate-pulse" />
              Principal Advisor
            </div>

            <h2 className="text-5xl md:text-6xl font-serif text-black leading-[1.1] mb-8">
              Strategist. Insider. <br />
              <span className="italic text-muted">Your Unfair Advantage.</span>
            </h2>

            <div className="space-y-6 text-lg text-muted leading-relaxed max-w-xl font-sans">
              <p>Alex brings a rare dual perspective to the Sydney market. With <span className="text-black font-semibold">20+ years of deep technical IT systems</span> and property acquisition experience, he treats property search as a high-precision operation.</p>
              <p>He doesn't just find houses — he architecturally dissects market value and leverages data-driven insights to secure assets before they hit public portals.</p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link to="/about" className="group text-sm font-bold uppercase tracking-widest text-black flex items-center gap-2">
                Read Full Profile
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mt-12 p-6 rounded-2xl border border-black/5 bg-neutral-50 flex items-center gap-6">
              <div className="text-3xl font-serif text-black">No. 20543356</div>
              <div className="h-10 w-px bg-black/10" />
              <div className="text-sm font-medium uppercase tracking-widest text-muted">Licensed <br /> Buyers Agent</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-100 shadow-2xl"
          >
            <img src="/alex.png" alt="Alex - Principal Agent" className="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ── Services Preview ─────────────────────────────────────────────── */}
      <section id="services" className="relative z-10 py-32 bg-gradient-to-b from-sky-50 to-sky-100 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif text-black mb-4">Built for results.</h2>
              <p className="text-muted text-lg font-sans max-w-lg">Tailored acquisition strategies for every stage of your property journey.</p>
            </div>
            <button
              onClick={() => { navigate('/services'); window.scrollTo(0, 0); }}
              className="group flex items-center gap-2 shrink-0 text-sm font-bold uppercase tracking-widest text-black border border-black/10 rounded-full px-6 py-3 hover:bg-black hover:text-white transition-all duration-300"
            >
              All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesPreview.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => { navigate(`/services#${service.anchor}`); window.scrollTo(0, 0); }}
                className="p-10 rounded-3xl bg-white border border-black/5 flex flex-col items-start text-left hover:shadow-2xl hover:shadow-black/5 transition-all duration-300 cursor-pointer"
              >
                <div className={`p-4 rounded-2xl ${service.color} mb-8 text-black`}>{service.icon}</div>
                <h3 className="text-2xl font-serif text-black mb-4">{service.title}</h3>
                <p className="text-muted leading-relaxed font-sans mb-8 flex-1">{service.description}</p>
                <span className="mt-auto flex items-center gap-2 group/btn text-sm font-bold uppercase tracking-widest text-black">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────────────── */}
      <section className="relative py-40 px-8 bg-black text-white text-center overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 pointer-events-none" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-8 max-w-4xl mx-auto leading-tight text-white drop-shadow-2xl">
            Start your Sydney <br className="hidden md:block" />success story.
          </h2>
          <button onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }} className="rounded-full px-14 py-5 text-base bg-white text-black hover:scale-[1.03] transition-transform duration-300 uppercase tracking-widest font-medium shadow-2xl shadow-black/20 cursor-pointer">
            Book 30m Strategy Session
          </button>
        </motion.div>
      </section>

      {/* ── Case Studies Preview ─────────────────────────────────────────── */}
      <section id="case-studies" className="relative py-32 bg-gradient-to-b from-sky-50 to-sky-200 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-5xl md:text-7xl font-serif text-black leading-tight mb-4">
                Real world results. <br />
                <span className="italic text-muted">The JJ Advantage.</span>
              </h2>
              <p className="text-muted text-lg font-sans max-w-lg">From first homes to elite investments — curated results that define our standard.</p>
            </div>
            <button
              onClick={() => { navigate('/case-studies'); window.scrollTo(0, 0); }}
              className="group flex items-center gap-2 shrink-0 text-sm font-bold uppercase tracking-widest text-black border border-black/10 rounded-full px-6 py-3 hover:bg-black hover:text-white transition-all duration-300"
            >
              All Case Studies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 70, damping: 20, delay: index * 0.15 }}
                onClick={() => { navigate(`/case-studies/${story.id}`); window.scrollTo(0, 0); }}
                className="group relative rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white shadow-2xl shadow-sky-900/10 overflow-hidden hover:shadow-sky-900/20 transition-all duration-500 cursor-pointer flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted block mb-2">{story.location}</span>
                    <h3 className="text-2xl font-serif text-black mb-1">{story.title}</h3>
                    <span className="text-sm font-bold text-black bg-[#E6FBFF] inline-block px-3 py-1 rounded-full">{story.result}</span>
                  </div>
                  <p className="text-muted font-serif italic text-base flex-1">"{story.shortQuote}"</p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black">
                    <Quote className="w-3.5 h-3.5" />
                    Read Story
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#E6FBFF] blur-[120px] rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#F0F7FF] blur-[120px] rounded-full opacity-40 animate-pulse delay-700" />
      </section>

      {/* ── Google Reviews ───────────────────────────────────────────────── */}
      <section id="reviews" className="relative py-32 bg-white overflow-hidden flex flex-col items-center">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl font-serif text-black font-bold">5.0</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />)}
            </div>
          </div>
          <h2 className="text-3xl font-serif text-black mb-2">Google Verified Results</h2>
          <p className="text-muted font-sans text-sm tracking-widest uppercase">Trusted by Sydney's premium buyers</p>
        </div>

        <div
          className="w-[200vw] sm:w-[150vw] md:w-[120vw] flex flex-col gap-8 -ml-[10vw]"
          onMouseEnter={() => setIsReviewPaused(true)}
          onMouseLeave={() => setIsReviewPaused(false)}
        >
          <div className={`flex gap-6 min-w-max animate-marquee-reverse ${isReviewPaused ? 'pause-animation' : ''}`}>
            {row1Reviews.map((review, i) => (
              <div key={`r1-${i}`} className="w-80 md:w-96 p-8 rounded-3xl bg-neutral-50 border border-black/5 hover:border-black/10 transition-colors shrink-0">
                <div className="flex items-center gap-1 mb-4">{[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-black font-serif text-lg leading-relaxed italic mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold font-sans">{review.name.charAt(0)}</div>
                  <div>
                    <h4 className="text-sm font-bold text-black font-sans">{review.name}</h4>
                    <span className="text-xs text-muted font-sans">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`flex gap-6 min-w-max animate-marquee ${isReviewPaused ? 'pause-animation' : ''}`}>
            {row2Extended.map((review, i) => (
              <div key={`r2-${i}`} className="w-80 md:w-96 p-8 rounded-3xl bg-neutral-50 border border-black/5 hover:border-black/10 transition-colors shrink-0">
                <div className="flex items-center gap-1 mb-4">{[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-black font-serif text-lg leading-relaxed italic mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold font-sans">{review.name.charAt(0)}</div>
                  <div>
                    <h4 className="text-sm font-bold text-black font-sans">{review.name}</h4>
                    <span className="text-xs text-muted font-sans">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="relative py-32 bg-gradient-to-b from-white to-sky-100 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-5xl md:text-6xl font-serif text-black leading-tight mb-6">
              Frequently <br />
              <span className="italic text-muted">asked questions.</span>
            </h2>
            <p className="text-muted text-lg font-sans">Everything you need to know about the JJ Property Partner acquisition process.</p>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-black/10 pb-2">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left hover:bg-neutral-50 rounded-xl px-2 transition-colors group cursor-pointer"
                >
                  <span className={`text-2xl font-serif transition-colors duration-300 ${openFaq === index ? 'text-black' : 'text-muted group-hover:text-black'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 ${openFaq === index ? 'border-black bg-black text-white' : 'border-black/10 text-black group-hover:border-black'}`}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-lg text-muted font-sans leading-relaxed pb-8 pl-2 pr-12">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
