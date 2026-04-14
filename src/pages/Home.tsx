import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Home as HomeIcon, TrendingUp, ShieldCheck, ArrowRight, Plus, Star, Quote } from 'lucide-react';
import { FaHome, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { openCalendly, initInlineCalendly } from '../utils/calendly';
import { caseStudies } from '../data/caseStudies';
import { client } from '../lib/sanity';

// ── Data ──────────────────────────────────────────────────────────────────────

const servicesPreview = [
  {
    title: 'First Home Buyer',
    description: 'You will be confidently and decisively guided through your property market journey by clarifying your budget and strategy, and helping you to locate the proper property anywhere in Australia.',
    icon: <HomeIcon className="w-6 h-6" />,
    solidIcon: <FaHome className="w-6 h-6" />,
    color: 'bg-[#E6FBFF]',
    anchor: 'first-home-buyers',
  },
  {
    title: 'Property Investors',
    description: 'Utilising a data-driven approach, you will identify properties with the most growth potential and rental return through multiple Australian property markets.',
    icon: <TrendingUp className="w-6 h-6" />,
    solidIcon: <FaChartLine className="w-6 h-6" />,
    color: 'bg-[#F0F7FF]',
    anchor: 'property-investors',
  },
  {
    title: 'SMSF Property',
    description: 'Strategic property acquisitions for superannuation funds require accurate acquisition and compliance processes. Each property is invested towards meeting your long-term retirement objectives.',
    icon: <ShieldCheck className="w-6 h-6" />,
    solidIcon: <FaShieldAlt className="w-6 h-6" />,
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

const faqs = [
  {
    question: 'Will you assist clients in the purchase of real estate throughout Australia?',
    answer: 'JJ Property Partner can assist clients in various locations in Australia and therefore is not limited to one city or one state as every property search is based on a strategy. The strategy used to identify the right property for the client is based on the growth potential of the area, the rental yield, and the client\'s long-term wealth goals rather than based solely on geographic boundaries.'
  },
  {
    question: 'Could you explain the role of a buyer’s agent and how you plan to represent me?',
    answer: 'The role of a buyer’s agent is that of advocating solely for the buyer’s interest. The JJ Property Partner will take care of all the procedures in the buying process from making a buying strategy, doing the research, property search, negotiation, and acquisition of the property.'
  },
  {
    question: 'Which types of clients do you work with?',
    answer: 'JJ Property Partner offers services to first-time home purchasers, property investors and self-managed superannuation fund (SMSF) clients. We offer you a tailored approach to your real estate by creating an investment strategy based on your financial goals and risk tolerance whether you are buying your first property or building a multi-state portfolio.'
  },
  {
    question: 'How do you determine which property I should buy?',
    answer: 'The buyers\' agent uses a data-driven process to identify appropriate property and make informed recommendations based on the property\'s growth trends, rental yield, infrastructure developing with the property, vacancy rate of the property, change in demographics, and similar property values within each market throughout Australia and therefore understand that it would be wise to select high-performing properties.'
  },
  {
    question: 'Do you have any opportunities for off-market Buying Properties?',
    answer: 'Absolutely! Our clients have the advantage of accessing off-market and pre-market properties. One of the major benefits of purchasing an off-market property is that they are not advertised for sale. Thus, by purchasing an off-market property you will have to compete against fewer buyers and you will have more negotiating power when it comes time to negotiate.'
  },
  {
    question: 'Do you create a buying strategy for clients?',
    answer: 'Yes. All of our clients start off with a complete buying strategy which consists of: Setting your goals. Creating a long-term plan/roadmap for future purchases. Identifying key areas to invest in throughout Australia. Evaluating what reports will be required based on your investment objectives. Finding a short and long term, affordable purchase option for you.'
  },
  {
    question: 'How long does it usually take to acquire my property?',
    answer: 'Generally, our clients can acquire their property within 30 to 45 days from when they initially offered to purchase their desired property. It is also crucial for us to consider that we get our clients\' ideal property, thus time is not always essential than acquiring the right property.'
  },
  {
    question: 'Do you assist clients investing in property through their super fund (SMSF)?',
    answer: 'JJ Property Partner works with your financial planner (if applicable), accountant and SMSF auditor to ensure that you are remaining compliant while at the same time securing investment Properties that are consistent with your superannuation and long-term goal.'
  },
  {
    question: 'How much do you charge for your services?',
    answer: 'Our fees are completely transparent. We can provide clients with either fixed fee structures, or fee structures based on a percentage depending on the complexity of their requirements; the goal of all our clients is to provide value to the customer by providing greater opportunities to select better properties and negotiate better.'
  },
  {
    question: 'What makes JJ Property Partner different from other buyers’ agents?',
    answer: 'The difference lies in the combination of real estate expertise and advanced data analysis. With a background in IT and a proven property portfolio across Australia, the approach is strategic, analytical, and focused on long-term wealth creation rather than transactional buying.'
  }
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const [opacity, setOpacity] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isReviewPaused, setIsReviewPaused] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = `*[_type == "review"] | order(order asc, _createdAt desc) {
          name,
          text,
          rating,
          date,
          authorImage
        }`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setReviews(data);
        } else {
          setReviews(googleReviews);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews(googleReviews);
      }
    };
    fetchReviews();
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Carousel Auto-scroll effect
  const isPausedRef = useRef(false);
  useEffect(() => {
    isPausedRef.current = isReviewPaused;
  }, [isReviewPaused]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let rafId: number;
    let exactScrollLeft = el.scrollLeft;

    const animateScroll = () => {
      if (!isPausedRef.current && !isDragging.current) {
        // Keep exactScrollLeft in sync if user manually scrolled
        if (Math.abs(exactScrollLeft - el.scrollLeft) > 2) {
           exactScrollLeft = el.scrollLeft;
        }
        
        exactScrollLeft += 0.8;
        el.scrollLeft = exactScrollLeft;
        
        // Seamless reset
        const totalWidth = el.scrollWidth;
        const singleSetWidth = totalWidth / 4;
        
        if (el.scrollLeft >= singleSetWidth * 2) {
          exactScrollLeft -= singleSetWidth;
          el.scrollLeft = exactScrollLeft;
        }
      } else {
        exactScrollLeft = el.scrollLeft;
      }
      rafId = requestAnimationFrame(animateScroll);
    };
    rafId = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Desktop Mouse Dragging handlers for Carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsReviewPaused(true);
    if (!carouselRef.current) return;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftStart.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force play immediately to fix the issue where mobile/safari browsers defer autoplay until scroll
    video.play().catch(() => {
      // Ignore autoplay prevention errors, it will play on interaction
    });

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
      setTimeout(() => { if (video) { video.currentTime = 0; video.play().catch(() => { }); } }, resetDelay);
    };

    video.addEventListener('ended', handleEnded);
    frameId = requestAnimationFrame(updateFade);
    return () => { video.removeEventListener('ended', handleEnded); cancelAnimationFrame(frameId); };
  }, []);

  useEffect(() => {
    // Manually initialize the inline Calendly widget using the dynamic loader
    initInlineCalendly('calendly-inline-widget');
  }, []);

  return (
    <>
      <Helmet>
        <title>Buyers Agent Parramatta AU | JJ Property Partner</title>
        <meta name="description" content="JJ Property Partner Parramatta offers expert buyers agent services across Australia with data-driven strategies, off-market access, and wealth-focused property acquisition." />
      </Helmet>

      <div ref={containerRef} className="relative w-full bg-sky-50 selection:bg-black/10">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <motion.section
        id="home"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#011122] pt-20 lg:pt-32"
      >
        {/* Video Background — full coverage */}
        <div className="absolute inset-0 -z-20">
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/drhnyntss/video/upload/v1774989962/Drone_push-in_Parramatta_202604010157_bogw13.mp4"
            autoPlay muted playsInline preload="auto"
            className="h-full w-full object-cover transition-opacity duration-100"
            style={{ opacity }}
          />
        </div>

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#011122]/85 via-[#021f3a]/75 to-[#011122]/90 pointer-events-none" />

        {/* Decorative accent glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <h1 className="animate-fade-rise text-4xl sm:text-6xl md:text-7xl lg:text-8xl max-w-7xl font-normal leading-[1.05] sm:leading-[0.95] tracking-tight sm:tracking-[-2.46px] text-white font-serif drop-shadow-lg px-4 sm:px-0">
          The <span className="italic text-sky-400">advantage</span> for <br className="hidden md:block" />
          <span className="italic text-sky-400">Sydney</span> Property Buyers.
        </h1>

        <p className="animate-fade-rise-delay text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-sky-100/80 font-sans drop-shadow-md">
          Securing elite off-market access for home buyers and investors.
          With 20+ years of property and IT expertise, we navigate the noise
          to build your $5M+ portfolio with absolute precision.
        </p>

        <div className="animate-fade-rise-delay-2 flex flex-col sm:flex-row gap-4 mt-12">
          <button onClick={openCalendly} className="rounded-full px-14 py-5 text-base bg-sky-500 text-white hover:bg-sky-400 hover:scale-[1.03] transition-all duration-300 uppercase tracking-widest font-medium shadow-2xl shadow-sky-500/30 cursor-pointer">
            Book Session
          </button>
          <button onClick={() => { navigate('/case-studies'); window.scrollTo(0, 0); }} className="rounded-full px-14 py-5 text-base border border-sky-400/30 bg-white/10 backdrop-blur-sm text-white hover:bg-sky-500 hover:border-sky-500 transition-all duration-300 uppercase tracking-widest font-medium flex items-center justify-center gap-2 cursor-pointer">
            Client Stories
          </button>
        </div>
      </motion.section>

      {/* ── About Alex Preview ───────────────────────────────────────────── */}
      <section id="about" className="relative z-10 py-12 md:py-24 px-8 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E6FBFF] text-black border border-black/10 text-sm font-bold uppercase tracking-widest mb-10 shadow-sm scale-110 origin-left">
              <span className="block w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
              Principal Advisor
            </div>

            <h2 className="text-5xl md:text-6xl font-serif text-black leading-[1.1] mb-8">
              Strategist. Insider. <br />
              <span className="italic text-muted">Your Unfair Advantage.</span>
            </h2>

            <div className="space-y-6 text-lg text-muted leading-relaxed max-w-xl font-sans">
              <p>As an experienced builder of his own <span className="text-black font-semibold">$5 million property portfolio</span>, Alex uses a systematic, research-based methodology to ensure sustainable growth and risk management for every client.</p>
              <p>With firsthand knowledge about different cycles in the Australian real estate market, <span className='text-black font-semibold'>JJ Property Partner</span> offers sound strategies, unbiased opinions, and exclusive off-market access in alignment with your vision.</p>
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
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900" 
              alt="JJ Property Partner HQ" 
              className="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-700" 
              loading="lazy" 
              width="600"
              height="600"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ── Services Preview ─────────────────────────────────────────────── */}
      <section id="services" className="relative z-10 py-12 md:py-24 bg-gradient-to-b from-sky-50 to-sky-100 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif text-black mb-4">Strategic Property Acquisition Solutions.</h2>
              <p className="text-muted text-lg font-sans max-w-lg">Customised acquisition strategies developed to help you through every phase of your property journey across Australia.</p>
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
                initial="initial"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => { navigate(`/services#${service.anchor}`); window.scrollTo(0, 0); }}
                className="p-10 rounded-3xl bg-white border border-black/5 flex flex-col items-start text-left hover:shadow-2xl hover:shadow-black/5 transition-all duration-300 cursor-pointer group"
              >
                <div className={`p-4 rounded-2xl ${service.color} mb-8 text-black group-hover:bg-black group-hover:text-white transition-colors duration-500`}>
                  <motion.div
                    variants={{
                      initial: { rotateY: 0 },
                      hover: { rotateY: 180 }
                    }}
                    transition={{ duration: 0.6 }}
                    className="relative w-6 h-6"
                  >
                    <motion.div
                      className="absolute inset-0 h-full w-full flex items-center justify-center"
                      variants={{
                        initial: { opacity: 1, visibility: 'visible' },
                        hover: { opacity: 0, visibility: 'hidden' }
                      }}
                    >
                      {service.icon}
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 h-full w-full flex items-center justify-center"
                      style={{ rotateY: 180 }}
                      variants={{
                        initial: { opacity: 0, visibility: 'hidden' },
                        hover: { opacity: 1, visibility: 'visible' }
                      }}
                    >
                      {service.solidIcon}
                    </motion.div>
                  </motion.div>
                </div>
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
      <section className="relative py-20 md:py-40 px-8 bg-gradient-to-b from-[#021f3a] to-[#011122] text-white text-center overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video 
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021f3a] via-[#021f3a]/40 to-[#021f3a]/80 pointer-events-none" />
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
          <button onClick={openCalendly} className="rounded-full px-14 py-5 text-base bg-sky-500 text-white hover:bg-sky-400 hover:scale-[1.03] transition-all duration-300 uppercase tracking-widest font-medium shadow-2xl shadow-sky-500/30 cursor-pointer">
            Book Free Session
          </button>
        </motion.div>
      </section>

      {/* ── Case Studies Preview ─────────────────────────────────────────── */}
      <section id="case-studies" className="relative py-12 md:py-24 bg-gradient-to-b from-sky-50 to-sky-200 px-8 overflow-hidden">
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
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    loading="lazy"
                    width={800}
                    height={450}
                  />
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
      <section id="reviews" className="relative py-12 md:py-24 bg-white overflow-hidden flex flex-col items-center">
        <div className="mb-10 md:mb-16 text-center">
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
          ref={carouselRef}
          className="w-full flex gap-6 overflow-x-auto no-scrollbar px-8 pb-8 cursor-grab active:cursor-grabbing select-none"
          onPointerEnter={(e) => { if(e.pointerType === 'mouse') setIsReviewPaused(true); }}
          onPointerLeave={(e) => { if(e.pointerType === 'mouse') { setIsReviewPaused(false); isDragging.current = false; } }}
          onTouchStart={() => { setIsReviewPaused(true); }}
          onTouchEnd={() => { setIsReviewPaused(false); isDragging.current = false; }}
          onTouchCancel={() => { setIsReviewPaused(false); isDragging.current = false; }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => { setIsReviewPaused(false); isDragging.current = false; }}
        >
          {[...reviews, ...reviews, ...reviews, ...reviews].map((review, i) => (
            <div key={`r-${i}`} className="w-80 md:w-96 p-8 rounded-3xl bg-neutral-50 border border-black/5 hover:border-black/10 transition-colors shrink-0 flex flex-col h-[320px] md:h-[350px]">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-black font-serif text-lg leading-relaxed italic mb-6 line-clamp-4 md:line-clamp-5 overflow-hidden">
                "{review.text}"
              </p>
              <div className="mt-auto flex items-center gap-3 pt-4 border-t border-black/5">
                {review.authorImage ? (
                  <img src={review.authorImage} alt={review.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold font-sans shrink-0">{review.name.charAt(0)}</div>
                )}
                <div>
                  <h3 className="text-sm font-bold text-black font-sans">{review.name}</h3>
                  <span className="text-xs text-muted font-sans">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="relative py-12 md:py-24 bg-gradient-to-b from-white to-sky-100 px-8">
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
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between py-6 text-left hover:bg-neutral-50 rounded-xl px-2 transition-colors group cursor-pointer"
                >
                  <span className={`text-xl sm:text-2xl font-sans font-semibold transition-colors duration-300 ${openFaq === index ? 'text-[#021f3a]' : 'text-slate-600 group-hover:text-[#021f3a]'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 ${openFaq === index ? 'border-black bg-black text-white' : 'border-black/10 text-black group-hover:border-black'}`}
                    aria-hidden="true"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-lg text-slate-800 font-sans leading-relaxed pb-8 pl-2 pr-12">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Calendly Booking ────────────────────────────────────────────────── */}
      <section className="relative py-24 bg-white px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-7 py-3 rounded-full border border-sky-400/20 bg-sky-50 text-sm font-bold uppercase tracking-[0.2em] text-sky-600 mb-8 shadow-sm scale-110 origin-center translate-y-[-4px]">
              Take the next step
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-black leading-tight mb-6">
              Book your <span className="italic text-muted">strategy session.</span>
            </h2>
            <p className="text-xl text-muted font-sans max-w-2xl mx-auto leading-relaxed">
              Select a date and time that suits you for a confidential 30-minute consultation with Alex.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-2xl border border-black/5 overflow-hidden min-h-[700px] relative z-10"
        >
          <div 
            id="calendly-inline-widget"
            className="w-full h-[700px]" 
          />
        </motion.div>

        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-50 rounded-full blur-[120px] opacity-60 -z-10" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E6FBFF] rounded-full blur-[100px] opacity-40 -z-10" />
      </section>

    </div>
    </>
  );
}
