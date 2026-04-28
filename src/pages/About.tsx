import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Target, Search, Handshake, BadgeCheck, Briefcase, Building2, MapPin, ArrowRight } from 'lucide-react';
import Link from '../components/Link';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Trusted Buyers Agent Australia | JJ Property Partner</title>
        <meta name="description" content="JJ Property Partner offers expert, data-driven property buying across Australia with off-market access, smart negotiation, and personalized investment strategies." />
      </Helmet>
      
      <div className="w-full bg-white selection:bg-gold/20 pt-20">

      {/* Hero Section */}
      <section className="relative px-8 pt-12 pb-10 md:pt-20 md:pb-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-7 py-3 rounded-full border border-black/10 bg-white text-sm font-bold uppercase tracking-[0.2em] text-black mb-8 shadow-sm scale-110 origin-center translate-y-[-4px]">
              Our Vision
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-black leading-[1.1] mb-6">
              Buy Property with Confidence <br />
              Through <span className="text-muted">Experience, Data and Trust.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted font-sans max-w-lg leading-relaxed">
              We bring analytical precision to the property market, treating every client’s acquisition with the same rigor as our own.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl"
          >
            {/* Property Buying Image */}
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
              alt="Property Buying"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[1.1] hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>

        {/* Dynamic Background */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 blur-[150px] rounded-full opacity-60 -z-10" />
      </section>

      {/* Profile Section */}
      <section className="py-8 md:py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-black leading-tight">
              A Smarter Way to Buy Property, <br />
              <span className="text-muted">Built on Experience, Data, and Trust.</span>
            </h2>
            <div className="space-y-6 text-lg text-muted font-sans leading-relaxed">
              <p>
                <span className="text-black font-semibold">JJ Property Partner</span> was founded by Alex, a licensed buyers agent, seasoned property investor, and IT professional with more than 20 years of experience in technology and real estate. Based in Sydney and working with clients across Australia, Alex brings a data-led and highly strategic approach to property buying that helps clients make confident, well-informed decisions.
              </p>
              <p>
                The name <span className="text-black font-semibold">“JJ”</span> is inspired by Alex’s two daughters, Jessica and Jennifer, and reflects the family values behind the business. That personal foundation shapes every client relationship through honesty, genuine care, and a long-term focus on helping Australians buy the right property with confidence.
              </p>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="md:w-5/12 aspect-[3/4] relative rounded-[3rem] overflow-hidden"
          >
            <img
              src="/buyers-agent-showing.png"
              alt="Buyers Agent Showing Property"
              className="absolute inset-0 w-full h-full object-cover filter hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-3xl font-serif">Alex</p>
              <p className="text-sm font-sans tracking-widest uppercase opacity-80 mt-1">Founder & Principal Advisor</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Track Record & Tech Advantage */}
      <section className="py-8 md:py-10 bg-white px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 md:p-12 rounded-[2rem] shadow-sm border border-gold/10"
          >
            <h3 className="text-3xl font-serif mb-6 text-[#011122]">Alex's Personal Track Record</h3>
            <div className="space-y-4 text-base md:text-lg text-muted font-sans leading-relaxed">
              <p>
                Alex has personally built a property portfolio valued at more than $5 million across multiple Australian states. That experience is grounded in real purchasing decisions made through changing market conditions, interest rate movements, and economic cycles. Every recommendation he gives clients is shaped by the same disciplined research, due diligence, and long-term thinking he applies to his own property strategy.
              </p>
              <p>
                He has also guided a wide range of buyers, from first home buyers entering the market to experienced investors building portfolios exceeding $1 million, as well as SMSF trustees seeking compliant, well-positioned assets to support long-term retirement goals.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#011122] text-white p-10 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[60px]" />
            <h3 className="text-3xl font-serif mb-6 relative z-10">The Technology Advantage</h3>
            <div className="space-y-4 text-base md:text-lg text-white/70 font-sans leading-relaxed relative z-10">
              <p>
                Alex’s background in IT is a core part of how JJ Property Partner approaches property acquisition. With more than 20 years of experience in information technology, he brings strong analytical thinking, data modelling skills, and a systems-based approach to researching property opportunities across Australia.
              </p>
              <p>
                Rather than relying only on broad suburb reports or gut feel, JJ Property Partner assesses multiple data points at once, including price trends, rental yields, vacancy rates, infrastructure plans, population growth, supply and demand, and changing demographics. This allows for sharper suburb selection and better long-term outcomes for clients.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-24 md:py-32 px-8 bg-[#FFFBF2] overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-8xl md:text-[10rem] font-serif text-gold/40 leading-none mb-4 select-none">JJ</div>
            <h2 className="text-3xl md:text-5xl font-serif italic text-[#011122] mb-12">
              A name with purpose. A promise with heart.
            </h2>
            
            <div className="space-y-8 text-lg md:text-xl text-muted font-sans leading-relaxed mb-16">
              <p>
                The initials <span className="text-[#011122] font-semibold">JJ</span> carry deep personal meaning. They represent the two people who inspired Alex to build something lasting — his daughters <span className="text-[#011122] font-medium">Jessica and Jennifer</span>.
              </p>
              <p>
                Every property acquisition, every negotiation, every piece of advice is delivered with the same dedication he puts into building their future.
              </p>
            </div>

            <div className="mb-24">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-gold hover:bg-gold-hover text-[#011122] text-sm font-bold uppercase tracking-[0.2em] rounded-sm shadow-xl transition-all hover:scale-105 active:scale-95 group"
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-12 md:gap-24 relative">
              <div className="flex flex-col items-center">
                <span className="text-7xl md:text-8xl font-serif text-[#011122]">J</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-muted mt-2">Jessica</span>
              </div>
              
              <div className="text-3xl md:text-4xl font-serif text-gold">+</div>
              
              <div className="flex flex-col items-center">
                <span className="text-7xl md:text-8xl font-serif text-[#011122]">J</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-muted mt-2">Jennifer</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-8 md:py-10 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">Our Core Values</h2>
            <div className="h-1 w-20 bg-gold mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="p-8 md:p-10 rounded-[2rem] bg-[#011122] border border-white/5 shadow-2xl hover:bg-[#011830] hover:border-gold/30 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-gold/30 group-hover:text-gold transition-colors">01</span>
                <h4 className="text-2xl font-serif text-white">Truly Independent, Always Buyer-Focused</h4>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">JJ Property Partner is a dedicated buyers-only agency, acting solely in the interests of the buyer at every stage of the property journey. We do not represent sellers, developers, or third parties, so there is never a conflict of interest. Our advice remains completely independent, transparent, and focused on securing the right outcome for you.</p>
            </motion.div>
 
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="p-8 md:p-10 rounded-[2rem] bg-[#011122] border border-white/5 shadow-2xl hover:bg-[#011830] hover:border-gold/30 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-gold/30 group-hover:text-gold transition-colors">02</span>
                <h4 className="text-2xl font-serif text-white">Clear Advice, Every Step</h4>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">We believe property decisions should be backed by clear communication and honest guidance. We are upfront about our fees, research process, market insights, and recommendations from day one. You will always know where you stand and what risks or opportunities exist, so you can move forward with complete confidence.</p>
            </motion.div>
 
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="p-8 md:p-10 rounded-[2rem] bg-[#011122] border border-white/5 shadow-2xl hover:bg-[#011830] hover:border-gold/30 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-gold/30 group-hover:text-gold transition-colors">03</span>
                <h4 className="text-2xl font-serif text-white">Direct Access, Personal Guidance</h4>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">At JJ Property Partner, every client works directly with Alex from the initial strategy session through to settlement. You are not passed between team members or treated like a number. This hands-on approach ensures clear communication, consistent guidance, and a personalized buying experience built on trust, accountability, and genuine attention to your goals.</p>
            </motion.div>
 
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="p-8 md:p-10 rounded-[2rem] bg-[#011122] border border-white/5 shadow-2xl hover:bg-[#011830] hover:border-gold/30 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-gold/30 group-hover:text-gold transition-colors">04</span>
                <h4 className="text-2xl font-serif text-white">Building Wealth for the Long Run</h4>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">Every purchase is approached with a long-term strategy designed to support financial growth, portfolio strength, and lasting security. We work with buyers who want more than a quick transaction, which is why many clients return to us for their second, third, and even fourth property as their goals continue to grow.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-8 md:py-10 px-8 bg-[#011122] text-white relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gold rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/80 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 drop-shadow-lg">Three Pillars of Our Service</h2>
          <p className="text-lg font-sans text-white/70 max-w-2xl mx-auto">
            Our unyielding commitment to precision, anonymity, and market-beating results.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            {
              title: "Data-Driven Precision",
              text: "Backed by over 20 years of analytical experience, we use advanced suburb research and property assessment to guide every recommendation. Our approach is grounded in evidence, not emotion, helping identify true value and long-term growth potential.",
              icon: <Target className="w-8 h-8 text-gold" />
            },
            {
              title: "Off-Market Access",
              text: "Through strong relationships with selling agents and industry professionals across Australia, we help clients access quality off-market and pre-market opportunities, reducing competition and creating better conditions for smarter buying decisions.",
              icon: <Search className="w-8 h-8 text-gold" />
            },
            {
              title: "Executive Representation",
              text: "We act solely in your best interests, managing negotiations with discretion, protecting your privacy, and representing you throughout the purchase process with a strategic, data-led approach designed to secure the right terms.",
              icon: <Handshake className="w-8 h-8 text-gold" />
            }
          ].map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold/30 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="mb-6 p-4 inline-flex bg-white/5 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500">
                {val.icon}
              </div>
              <h3 className="text-2xl font-serif mb-4">{val.title}</h3>
              <p className="text-white/60 font-sans leading-relaxed text-lg">
                {val.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Credentials */}
      <section className="py-8 md:py-8 px-4 sm:px-8 bg-neutral-50 border-t border-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-black">Credentials & Licencing</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { icon: <BadgeCheck className="w-6 h-6 text-gold" />, label: "Buyers Agent Licence", value: "20543356", sub: "" },
              { icon: <Briefcase className="w-6 h-6 text-gold" />, label: "ABN", value: "71 687 187 113", sub: "" },
              { icon: <Building2 className="w-6 h-6 text-gold" />, label: "Business", value: "JJ Property Partner", sub: "PTY LTD" },
              { icon: <MapPin className="w-6 h-6 text-gold" />, label: "Location", value: "Sydney, NSW", sub: "Australia-wide" },
            ].map((cred, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gold/10 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gold/5 rounded-full flex items-center justify-center mb-4">
                  {cred.icon}
                </div>
                <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-2">{cred.label}</h4>
                <p className="text-lg font-serif text-black mb-1">{cred.value}</p>
                {cred.sub && <p className="text-sm font-sans text-muted">{cred.sub}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
