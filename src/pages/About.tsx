import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Target, Search, Handshake, BadgeCheck, Briefcase, Building2, MapPin } from 'lucide-react';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Trusted Buyers Agent Australia | JJ Property Partner</title>
        <meta name="description" content="JJ Property Partner offers expert, data-driven property buying across Australia with off-market access, smart negotiation, and personalized investment strategies." />
      </Helmet>
      
      <div className="w-full bg-white selection:bg-black/10 pt-20">

      {/* Hero Section */}
      <section className="relative px-8 pt-20 pb-20 md:pt-32 md:pb-24 bg-sky-50 overflow-hidden">
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
              Strategic Vision. <br />
              <span className="italic text-muted line-through decoration-1 decoration-sky-300">Tactical</span> Execution.
            </h1>
            <p className="text-lg sm:text-xl text-muted font-sans max-w-lg leading-relaxed">
              We bring clinical precision to Sydney's emotional property market. Your portfolio's growth is our single, uncompromising metric.
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
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[1.1]"
            />
          </motion.div>
        </div>

        {/* Dynamic Background */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E6FBFF] blur-[150px] rounded-full opacity-60 -z-10" />
      </section>

      {/* Profile Section */}
      <section className="py-20 md:py-24 px-8">
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
              <span className="italic text-muted">Built on Experience, Data, and Trust.</span>
            </h2>
            <div className="space-y-6 text-lg text-muted font-sans leading-relaxed">
              <p>
                <span className="text-black font-semibold">JJ Property Partner</span> was founded by Alex, a licensed buyers agent, seasoned property investor, and IT professional with over 20 years of experience. Based in Sydney and assisting clients across Australia, he applies a highly analytical, data-driven approach to property buying that sets him apart from typical buyers agents.
              </p>
              <p>
                The name <span className="text-black font-semibold">“JJ”</span> reflects Alex’s daughters, Jessica and Jennifer, and represents a strong family-first philosophy. This drives a commitment to honesty, long-term thinking, and treating every client’s property journey with genuine care and dedication.
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
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900"
              alt="JJ Property Partner HQ"
              className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
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
      <section className="py-20 md:py-24 bg-sky-50 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 md:p-12 rounded-[2rem] shadow-sm border border-sky-100/50"
          >
            <h3 className="text-3xl font-serif mb-6 text-[#021f3a]">Alex's Personal Track Record</h3>
            <div className="space-y-4 text-base md:text-lg text-muted font-sans leading-relaxed">
              <p>
                Alex has personally built a property portfolio exceeding $5 million across multiple Australian states, giving him genuine, hands-on experience in navigating changing market conditions, interest rate cycles, and economic shifts. This is not just theory - it’s practical knowledge gained from making real investment decisions. Every recommendation he provides is backed by the same disciplined approach and due diligence he applies to his own property portfolio.
              </p>
              <p>
                He has supported a wide range of clients across Australia, from first home buyers entering the market for the first time to experienced investors growing portfolios beyond $1 million. Alex also works with SMSF trustees looking for compliant, high-performing property investments, offering tailored guidance at every stage of the buying journey.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#021f3a] text-white p-10 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[60px]" />
            <h3 className="text-3xl font-serif mb-6 relative z-10">The Technology Advantage</h3>
            <div className="space-y-4 text-base md:text-lg text-white/70 font-sans leading-relaxed relative z-10">
              <p>
                Alex’s background in IT isn’t just a bonus - it underpins the entire approach at JJ Property Partner. With over 20 years of experience in information technology, Alex brings advanced expertise in data modelling, analytical thinking, and system-based decision-making to property buying. This allows first home buyers and investors across Australia to benefit from a far more structured and informed strategy when entering the market.
              </p>
              <p>
                Rather than relying on generic suburb reports or gut instinct, JJ Property Partner uses in-depth analytical models that assess key metrics such as price trends, rental yields, vacancy rates, infrastructure plans, population growth, and supply-demand balance - helping clients secure smarter, high-performing property outcomes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">Our Core Values</h2>
            <div className="h-1 w-20 bg-sky-400 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="p-8 md:p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-sky-50 border transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-sky-200 group-hover:text-sky-400 transition-colors">01</span>
                <h4 className="text-2xl font-serif text-[#021f3a]">Independence & Zero Conflict of Interest</h4>
              </div>
              <p className="text-muted text-base md:text-lg leading-relaxed">JJ Property Partner is a buyers-only agency. We never act for sellers, developers, or any third party that could create a conflict of interest. Every recommendation is made solely in the client's best financial interest. We receive no referral commissions or kickbacks from any source — our only income is the agreed service fee paid by our client.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="p-8 md:p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-sky-50 border transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-sky-200 group-hover:text-sky-400 transition-colors">02</span>
                <h4 className="text-2xl font-serif text-[#021f3a]">Transparency in Everything</h4>
              </div>
              <p className="text-muted text-base md:text-lg leading-relaxed">From fee structures to market assessments, we believe our clients deserve complete transparency at every stage. We explain our research methodology, share our data, and provide honest assessments even when the honest answer is not what a client hoped to hear.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="p-8 md:p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-sky-50 border transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-sky-200 group-hover:text-sky-400 transition-colors">03</span>
                <h4 className="text-2xl font-serif text-[#021f3a]">Founder-Led, Personal Service</h4>
              </div>
              <p className="text-muted text-base md:text-lg leading-relaxed">Unlike many agencies where clients are handed off to junior staff, every JJ Property Partner client works directly and exclusively with Alex from the first strategy session through to settlement. This ensures consistency, accountability, and a genuinely personalised service.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="p-8 md:p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-sky-50 border transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-sky-200 group-hover:text-sky-400 transition-colors">04</span>
                <h4 className="text-2xl font-serif text-[#021f3a]">Long-Term Wealth Focus</h4>
              </div>
              <p className="text-muted text-base md:text-lg leading-relaxed">We are not transactional. Our goal is not simply to complete a purchase — it is to help clients build lasting financial security through strategic property investment. Many of our clients return for their second, third, and fourth property acquisitions because they trust the process and value the outcomes.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 md:py-24 px-8 bg-[#021f3a] text-white relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-sky-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500 rounded-full blur-[140px]" />
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
              text: "20+ years of data-driven expertise guiding suburb analysis. We assess properties based on facts, not emotion, helping Australian buyers secure fair value and strong long-term growth potential.",
              icon: <Target className="w-8 h-8 text-sky-400" />
            },
            {
              title: "Off-Market Access",
              text: "Strong relationships with selling agents across Australia give our clients access to exclusive off-market and pre-market properties, reducing competition and helping secure better prices with stronger negotiating leverage.",
              icon: <Search className="w-8 h-8 text-sky-400" />
            },
            {
              title: "Executive Representation",
              text: "We provide strategic, confidential negotiation as your dedicated buyers agent, representing only you. Using proven, data-driven techniques, we protect your identity and secure the best possible property price and terms.",
              icon: <Handshake className="w-8 h-8 text-sky-400" />
            }
          ].map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-sky-400/30 transition-all duration-300 backdrop-blur-sm group"
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
      <section className="py-16 md:py-20 px-4 sm:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-black">Credentials & Licencing</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { icon: <BadgeCheck className="w-6 h-6 text-sky-500" />, label: "Buyers Agent Licence", value: "20543356", sub: "" },
              { icon: <Briefcase className="w-6 h-6 text-sky-500" />, label: "ABN", value: "71 687 187 113", sub: "" },
              { icon: <Building2 className="w-6 h-6 text-sky-500" />, label: "Business", value: "JJ Property Partner", sub: "PTY LTD" },
              { icon: <MapPin className="w-6 h-6 text-sky-500" />, label: "Location", value: "Sydney, NSW", sub: "Australia-wide" },
            ].map((cred, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mb-4">
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
