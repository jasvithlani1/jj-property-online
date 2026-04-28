import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Home as HomeIcon, TrendingUp, ArrowRight, Plus, Star, Quote } from 'lucide-react';
import { FaHome, FaChartLine } from 'react-icons/fa';
import { TbHomeShield } from 'react-icons/tb';
import { openCalendly, initInlineCalendly } from '../utils/calendly';
import { caseStudies } from '../data/caseStudies';
import { client } from '../lib/sanity';
import Link from '../components/Link';

// ── Data ──────────────────────────────────────────────────────────────────────

const servicesPreview = [
  {
    title: 'First Home Buyers',
    description: "Buying your first home is a major milestone, and having the right guidance makes all the difference. We help you clarify your budget, assess borrowing capacity, find the right property, and negotiate strongly so you can buy with confidence.",
    icon: <HomeIcon className="w-6 h-6" />,
    solidIcon: <FaHome className="w-6 h-6" />,
    color: 'bg-gold/5',
    anchor: 'first-home-buyers',
  },
  {
    title: 'Property Investors',
    description: "Building a strong property portfolio takes strategy, not guesswork. At JJ Property Partner, we use data-led research to identify high-growth, high-yield opportunities across Australia, helping you secure smart investments that match your income goals and risk profile.",
    icon: <TrendingUp className="w-6 h-6" />,
    solidIcon: <FaChartLine className="w-6 h-6" />,
    color: 'bg-gold/10',
    anchor: 'property-investors',
  },
  {
    title: 'SMSF Property',
    description: "Buying property through an SMSF comes with strict rules, and getting it right matters. We work closely with your specialists to secure compliant, investment-grade properties that align with your long-term retirement goals.",
    icon: <TbHomeShield className="w-6 h-6" />,
    solidIcon: <TbHomeShield className="w-6 h-6" />,
    color: 'bg-gold/5',
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
    question: 'Do you help clients buy property across Australia?',
    answer: 'Yes. JJ Property Partner works with buyers across Australia. We take a strategy-first approach, identifying the right locations based on growth potential, rental returns, and your long-term property goals, rather than limiting your search to one city or state.'
  },
  {
    question: 'What does a buyer’s agent actually do?',
    answer: 'A buyer’s agent works solely for you, not the seller. They handle the full buying process, including strategy, property research, shortlist creation, inspections, negotiations, and settlement support, while protecting your interests and helping you buy with greater confidence.'
  },
  {
    question: 'Who do you work with?',
    answer: 'We work with first home buyers, owner-occupiers, property investors, and SMSF buyers across Australia. Whether you need guidance in a competitive market or a clear long-term buying strategy, our advice is tailored to your goals, budget, and risk profile.'
  },
  {
    question: 'How do you find the right property for me?',
    answer: 'We combine local market insight with data-backed research to shortlist properties that match your goals. We assess suburb performance, rental demand, vacancy levels, future infrastructure, and comparable sales to help you buy with clarity and confidence.'
  },
  {
    question: 'Can you help us access off-market property opportunities?',
    answer: 'Yes. We regularly source off-market and pre-market properties through our trusted industry network. This gives our clients early access to quality opportunities, less competition from other buyers, and a stronger position when it comes to negotiating with confidence.'
  },
  {
    question: 'How quickly can you help me secure the right property?',
    answer: 'Most buyers secure a suitable property within 30 to 60 days of getting started. The timeframe depends on your brief, market conditions, and property type, but our focus is always on securing the right property, not rushing the process.'
  },
  {
    question: 'How are your buyer’s agent fees structured?',
    answer: 'Our fees are straightforward and clearly explained from the start. Depending on the level of support you need, we offer fixed-fee or percentage-based options, with a focus on securing better property outcomes, stronger negotiations, and long-term value.'
  },
  {
    question: 'Why do buyers choose JJ Property Partner over other buyer’s agents?',
    answer: 'JJ Property Partner offers a more personal, strategy-led service. You deal directly with Alex, who combines 20+ years of IT and property experience, a $5M+ personal portfolio, and specialised SMSF knowledge, with no handovers to junior staff.'
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isReviewPaused, setIsReviewPaused] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

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
        if (Math.abs(exactScrollLeft - el.scrollLeft) > 2) {
          exactScrollLeft = el.scrollLeft;
        }

        exactScrollLeft += 0.8;
        el.scrollLeft = exactScrollLeft;

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
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => { });

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
    initInlineCalendly('calendly-inline-widget');
  }, []);

  return (
    <>
      <Helmet>
        <title>Buyers Agent Parramatta AU | JJ Property Partner</title>
        <meta name="description" content="JJ Property Partner Parramatta offers expert buyers agent services across Australia with data-driven strategies, off-market access, and wealth-focused property acquisition." />
      </Helmet>

      <div ref={containerRef} className="relative w-full bg-white selection:bg-gold/20">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <motion.section
          id="home"
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#011122] pt-12 lg:pt-20"
        >
          <div className="absolute inset-0 -z-20">
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/drhnyntss/video/upload/v1774989962/Drone_push-in_Parramatta_202604010157_bogw13.mp4"
              autoPlay muted playsInline preload="auto"
              className="h-full w-full object-cover transition-opacity duration-100"
              style={{ opacity }}
            />
          </div>

          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#011122]/85 via-[#011122]/75 to-[#011122]/90 pointer-events-none" />

          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/10 blur-[120px] rounded-full pointer-events-none -z-10" />

          <h1 className="animate-fade-rise text-4xl sm:text-6xl md:text-7xl lg:text-8xl max-w-7xl font-normal leading-[1.05] sm:leading-[0.95] tracking-tight sm:tracking-[-2.46px] text-white font-serif drop-shadow-lg px-4 sm:px-0">
            Strategist. <span className="text-gold">Insider.</span> <br className="hidden md:block" />
            Your <span className="text-gold">Dedicated</span> Advocate.
          </h1>

          <p className="animate-fade-rise-delay text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-white/70 font-sans drop-shadow-md">
            JJ Property Partner — Your Trusted Buyers Agent in Australia.
            Bridging the gap between real estate and technology with a data-backed approach to your next property acquisition.
          </p>

          <div className="animate-fade-rise-delay-2 flex flex-col sm:flex-row gap-4 mt-12">
            <button onClick={openCalendly} className="rounded-full px-14 py-5 text-base bg-gold text-white hover:bg-gold-hover hover:scale-[1.03] transition-all duration-300 uppercase tracking-widest font-medium shadow-2xl shadow-gold/30 cursor-pointer">
              Book Session
            </button>
            <Link href="/case-studies" className="rounded-full px-14 py-5 text-base border border-gold/30 bg-white/10 backdrop-blur-sm text-white hover:bg-gold hover:border-gold transition-all duration-300 uppercase tracking-widest font-medium flex items-center justify-center gap-2 cursor-pointer">
              Client Stories
            </Link>
          </div>
        </motion.section>

        {/* ── About Alex Preview ───────────────────────────────────────────── */}
        <section id="about" className="relative z-10 py-6 md:py-8 px-8 bg-gradient-to-b from-white to-neutral-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 text-gold border border-gold/20 text-sm font-bold uppercase tracking-widest mb-10 shadow-sm scale-110 origin-left">
                <span className="block w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                Principal Advisor
              </div>

              <h2 className="text-5xl md:text-6xl font-serif text-black leading-[1.1] mb-8">
                Property Strategist. <br />
                <span className="text-muted">Dedicated Buyer Advocate.</span>
              </h2>

              <div className="space-y-6 text-lg text-muted leading-relaxed max-w-xl font-sans">
                <p>Alex is a licensed buyer’s agent and the founder of <span className="text-black font-semibold">JJ Property Partner</span>. With more than 20 years of experience bridging the gap between real estate and technology, Alex provides a sophisticated, data-backed approach to property acquisition.</p>
                <p>JJ stands for Jessica and Jennifer — Alex's two daughters — reflecting a family-first philosophy built on honesty and genuine care. As an active investor with a <span className="text-black font-semibold">$5M+ portfolio</span>, he offers firsthand knowledge of market cycles and wealth generation.</p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link href="/about" className="group text-sm font-bold uppercase tracking-widest text-black flex items-center gap-2">
                  Read Full Profile
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="mt-12 p-5 sm:p-6 sm:px-8 rounded-[1.25rem] border border-white/10 bg-[#011122] shadow-xl inline-flex items-center gap-6 relative overflow-hidden group/box w-fit">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover/box:opacity-100 transition-opacity duration-700" />
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80 mb-1.5">Licence No.</span>
                    <span className="text-xl sm:text-2xl font-serif text-white">20543356</span>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-gold/20"></div>
                  <div className="w-full sm:hidden h-px bg-gold/20"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80 mb-1.5">ABN</span>
                    <span className="text-xl sm:text-2xl font-serif text-white">71 687 187 113</span>
                  </div>
                </div>
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
                src="/advisor-parramatta.png"
                alt="Alex - Principal Property Strategist"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
                width="600"
                height="600"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011122]/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* ── Services Preview ─────────────────────────────────────────────── */}
        <section id="services" className="relative z-10 py-12 md:py-20 bg-white px-8 overflow-hidden border-t border-black/5">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gold/5 blur-[120px] rounded-full -z-10" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 blur-[100px] rounded-full -z-10" />

          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 relative">
              <div className="relative">
                <div className="absolute -left-12 -top-12 text-[12rem] font-serif text-gold/5 -z-10 pointer-events-none select-none">Services</div>
                <h2 className="text-5xl md:text-7xl font-serif text-black mb-6 leading-tight">Our Core <span className="text-gold">Services.</span></h2>
                <p className="text-muted text-xl font-sans max-w-xl leading-relaxed">From elite residential acquisitions to high-yield investment portfolios, we provide the precision and insight you need to move with total confidence.</p>
              </div>
              <Link
                href="/services"
                className="group flex items-center gap-3 shrink-0 text-sm font-bold uppercase tracking-widest text-black border-2 border-black/5 rounded-full px-8 py-4 hover:bg-black hover:text-white transition-all duration-500 shadow-sm"
              >
                View Full Spectrum
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {servicesPreview.map((service, index) => (
                <Link
                  key={service.title}
                  href={`/services#${service.anchor}`}
                  className={`group relative p-12 rounded-[3.5rem] border transition-all duration-700 cursor-pointer flex flex-col items-start ${index !== 1
                    ? 'bg-[#011122] border-white/10 shadow-2xl shadow-gold/10 md:z-20'
                    : 'bg-white border-black/5 hover:border-gold/20 hover:shadow-2xl hover:shadow-gold/10'
                    }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    className="w-full h-full flex flex-col items-start"
                  >
                    <div className={`p-5 rounded-[2rem] mb-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6 ${index !== 1 ? 'bg-gold text-white shadow-[0_0_30px_rgba(200,169,106,0.3)]' : `bg-gold/5 text-gold group-hover:bg-gold group-hover:text-white`
                      }`}>
                      <div className="w-8 h-8 flex items-center justify-center">
                        {service.icon}
                      </div>
                    </div>

                    <h3 className={`text-3xl font-serif mb-6 leading-tight ${index !== 1 ? 'text-white' : 'text-black font-semibold'}`}>
                      {service.title}
                    </h3>
                    <p className={`leading-relaxed font-sans text-lg mb-12 flex-1 ${index !== 1 ? 'text-white/70' : 'text-muted'}`}>
                      {service.description}
                    </p>

                    <div className="mt-auto w-full flex items-center justify-between group/link">
                      <span className={`text-[11px] font-black uppercase tracking-[0.25em] transition-all ${index !== 1 ? 'text-gold group-hover:text-white' : 'text-black opacity-40 group-hover:opacity-100'
                        }`}>
                        Learn More
                      </span>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${index !== 1 ? 'bg-white/10 group-hover:bg-gold' : 'bg-black/5 group-hover:bg-black group-hover:text-white'
                        }`}>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-[3.5rem] border-2 border-gold/0 group-hover:border-gold/20 transition-colors pointer-events-none" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Difference Section ───────────────────────────────────────────── */}
        <section className="pt-10 pb-6 md:pt-12 md:pb-8 px-8 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-6xl font-serif text-black leading-tight mb-8">
                  The JJ Property <br />
                  <span className="text-muted">Partner Difference.</span>
                </h2>
                <p className="text-lg text-muted font-sans leading-relaxed mb-8 max-w-xl">
                  Most buyers enter the market without professional representation, negotiating against agents who act only for the vendor. At <span className="text-black font-semibold">JJ Property Partner</span>, we level the playing field by working exclusively for you — with zero conflicts of interest and 100% dedication to your goals.
                </p>
                <div className="space-y-4">
                  {[
                    "100% buyer's agent representation — no ties to developers",
                    "Built on real experience with a personal $5M+ portfolio",
                    "20+ years of IT expertise applied to research & data",
                    "Exclusive access to off-market and pre-market properties",
                    "Founder-led service managed personally by Alex",
                    "Transparent, fixed or percentage-based fee structures",
                    "Australia-wide support guided by performance data",
                    "5-star Google reviewed — verified results"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-lg text-muted font-sans">
                      <div className="w-2 h-2 rounded-full bg-gold shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 mt-12">
                    <div className="aspect-[4/5] rounded-[2rem] bg-neutral-100 overflow-hidden shadow-2xl">
                      <img src="/broker-handing-keys.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Broker handing over keys" />
                    </div>
                    <div className="aspect-square rounded-[2rem] bg-neutral-100 overflow-hidden shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Property 2" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="aspect-square rounded-[2rem] bg-neutral-100 overflow-hidden shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Property 3" />
                    </div>
                    <div className="aspect-[4/5] rounded-[2rem] bg-neutral-100 overflow-hidden shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Property 4" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gold rounded-full blur-[100px] opacity-20 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Process Section ──────────────────────────────────────────────── */}
        <section className="pt-6 pb-12 md:pt-8 md:pb-16 px-8 bg-white text-[#011122] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-7 py-3 rounded-full border border-gold/20 bg-gold/5 text-sm font-bold uppercase tracking-[0.2em] text-gold mb-8 shadow-sm scale-110 origin-center translate-y-[-4px]">
                How We Work
              </div>
              <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-tight text-[#011122]">
                Our Proven <span className="text-gold italic font-serif">5-Step</span> Buying Approach
              </h2>
              <p className="text-xl text-muted font-sans max-w-2xl mx-auto leading-relaxed">
                A structured, data-led process designed to secure your ideal property with complete confidence.
              </p>
            </div>

            <div className="relative">
              {/* Desktop Connecting Line */}
              <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-gold/20 z-0" />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
                {[
                  {
                    num: "1",
                    title: "Strategy Session",
                    desc: "Free 30-minute mapping of your goals, budget, timeline and property criteria."
                  },
                  {
                    num: "2",
                    title: "Suburb Research",
                    desc: "Data-driven analysis of growth potential, yield, vacancy rates and infrastructure pipelines."
                  },
                  {
                    num: "3",
                    title: "Due Diligence",
                    desc: "Legal, structural and financial checks on every shortlisted property before you commit."
                  },
                  {
                    num: "4",
                    title: "Negotiation",
                    desc: "Strategic representation at private treaty or auction based on market data and vendor motivation."
                  },
                  {
                    num: "5",
                    title: "Settlement",
                    desc: "Full coordination with your solicitor, broker and advisers through to handover and beyond."
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Circle Marker */}
                    <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center text-[#011122] text-2xl font-serif mb-8 shadow-[0_8px_30px_rgb(200,169,106,0.3)] group-hover:scale-110 transition-transform duration-500 relative">
                      {item.num}
                      <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20 pointer-events-none group-hover:block hidden" />
                    </div>

                    <h3 className="text-xl font-serif text-[#011122] mb-4 leading-tight font-medium">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-muted leading-relaxed font-sans px-4">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Section ──────────────────────────────────────────────────── */}
        <section className="relative py-6 md:py-8 px-8 bg-gradient-to-b from-[#011122] to-[#011122] text-white text-center overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <video
              src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#011122] via-[#011122]/40 to-[#011122]/80 pointer-events-none" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-8 max-w-4xl mx-auto leading-tight text-white drop-shadow-2xl">
              Start your Real Estate <br className="hidden md:block" />success story.
            </h2>
            <button onClick={openCalendly} className="rounded-full px-14 py-5 text-base bg-gold text-white hover:bg-gold-hover hover:scale-[1.03] transition-all duration-300 uppercase tracking-widest font-medium shadow-2xl shadow-gold/30 cursor-pointer">
              Book Free Session
            </button>
          </motion.div>
        </section>

        {/* ── Case Studies Preview ─────────────────────────────────────────── */}
        <section id="case-studies" className="relative py-6 md:py-8 bg-gradient-to-b from-gold/5 to-gold/10 px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-5xl md:text-7xl font-serif text-black leading-tight mb-4">
                  Real world results. <br />
                  <span className="text-muted">The JJ Advantage.</span>
                </h2>
                <p className="text-muted text-lg font-sans max-w-lg">From first homes to elite investments — curated results that define our standard.</p>
              </div>
              <Link
                href="/case-studies"
                className="group flex items-center gap-2 shrink-0 text-sm font-bold uppercase tracking-widest text-black border border-black/10 rounded-full px-6 py-3 hover:bg-black hover:text-white transition-all duration-300"
              >
                All Case Studies
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((story, index) => (
                <Link
                  key={story.id}
                  href={`/case-studies/${story.id}`}
                  className="group relative rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white shadow-2xl shadow-gold/10 overflow-hidden hover:shadow-gold/20 transition-all duration-500 cursor-pointer flex flex-col"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 70, damping: 20, delay: index * 0.15 }}
                    className="w-full h-full flex flex-col"
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
                        <span className="text-sm font-bold text-gold bg-gold/10 inline-block px-3 py-1 rounded-full">{story.result}</span>
                      </div>
                      <p className="text-muted font-serif text-base flex-1">"{story.shortQuote}"</p>
                      <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black">
                        <Quote className="w-3.5 h-3.5" />
                        Read Story
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gold/5 blur-[120px] rounded-full opacity-30 animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/10 blur-[120px] rounded-full opacity-40 animate-pulse delay-700" />
        </section>

        {/* ── Google Reviews ───────────────────────────────────────────────── */}
        <section id="reviews" className="relative py-6 md:py-8 bg-white overflow-hidden flex flex-col items-center">
          <div className="mb-10 md:mb-16 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl font-serif text-black font-bold">5.0</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />)}
              </div>
            </div>
            <h2 className="text-3xl font-serif text-black mb-2">Google Verified Results</h2>
            <p className="text-muted font-sans text-sm tracking-widest uppercase">Trusted by Australia's premium buyers</p>
          </div>

          <div
            ref={carouselRef}
            className="w-full flex gap-6 overflow-x-auto no-scrollbar px-8 pb-8 cursor-grab active:cursor-grabbing select-none"
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setIsReviewPaused(true); }}
            onPointerLeave={(e) => { if (e.pointerType === 'mouse') { setIsReviewPaused(false); isDragging.current = false; } }}
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
                <p className="text-black font-serif text-lg leading-relaxed mb-6 line-clamp-4 md:line-clamp-5 overflow-hidden">
                  "{review.text}"
                </p>
                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-black/5">
                  {('authorImage' in review && review.authorImage) ? (
                    <img src={review.authorImage} alt={review.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold font-sans shrink-0">{review.name.charAt(0)}</div>
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
        <section className="relative py-6 md:py-8 bg-gradient-to-b from-white to-neutral-50 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-5xl md:text-6xl font-serif text-black leading-tight mb-6">
                Frequently <br />
                <span className="text-muted">asked questions.</span>
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
                    <span className={`text-xl sm:text-2xl font-sans font-semibold transition-colors duration-300 ${openFaq === index ? 'text-gold' : 'text-muted group-hover:text-gold'}`}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 ${openFaq === index ? 'border-gold bg-gold text-white shadow-lg' : 'border-black/10 text-black group-hover:border-gold group-hover:text-gold'}`}
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
                        <p className="text-lg text-muted font-sans leading-relaxed pb-8 pl-2 pr-12">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Calendly Booking ────────────────────────────────────────────────── */}
        <section className="relative py-10 md:py-12 bg-neutral-50 px-8 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-7 py-3 rounded-full border border-gold/20 bg-gold/5 text-sm font-bold uppercase tracking-[0.2em] text-gold mb-8 shadow-sm scale-110 origin-center translate-y-[-4px]">
                Take the next step
              </div>
              <h2 className="text-5xl md:text-6xl font-serif text-black leading-tight mb-6">
                Book your <span className="text-muted">strategy session.</span>
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
            className="max-w-5xl mx-auto bg-neutral-50 rounded-[2rem] shadow-2xl border border-black/5 overflow-hidden min-h-[700px] relative z-10"
          >
            <div
              id="calendly-inline-widget"
              className="w-full h-[700px]"
            />
          </motion.div>

          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] opacity-60 -z-10" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] opacity-40 -z-10" />
        </section>

      </div>
    </>
  );
}
