import { motion } from 'framer-motion';
import { ShieldCheck, Target, Search } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full bg-white selection:bg-black/10 pt-20">

      {/* Hero Section */}
      <section className="relative px-8 pt-20 pb-20 md:pt-32 md:pb-40 bg-sky-50 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-black/5 bg-white text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-6 shadow-sm">
              Our Vision
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-black leading-[1.1] mb-6">
              Strategic Vision. <br />
              <span className="italic text-muted line-through decoration-1 decoration-sky-300">Tactical</span> Execution.
            </h1>
            <p className="text-xl text-muted font-sans max-w-lg leading-relaxed">
              We bring clinical precision to Sydney's emotional property market. Your portfolio's growth is our single, uncompromising metric.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl"
          >
            {/* Sydney Lifestyle Image */}
            <img
              src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1200"
              alt="Sydney Architecture"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[1.1]"
            />
          </motion.div>
        </div>

        {/* Dynamic Background */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E6FBFF] blur-[150px] rounded-full opacity-60 -z-10" />
      </section>

      {/* Profile Section */}
      <section className="py-20 md:py-40 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-black leading-tight">
              A dual expertise. <br />
              <span className="italic text-muted">A singular advantage.</span>
            </h2>
            <div className="space-y-6 text-lg text-muted font-sans leading-relaxed">
              <p>
                As Principal Advisor at <span className="text-black font-semibold">JJ Property Partner PTY LTD</span>, Parramatta, NSW, Alex combines 20+ years of enterprise IT systems expertise with high-level property acquisition strategy.
              </p>
              <p>
                With a $5M+ personal portfolio and proven client results, he delivers data-driven decisions, advanced suburb modelling, and precise due diligence.
              </p>
              <p>
                As a licensed, independent buyers agent (Lic. No. 20543356), he represents only buyers with zero conflict. Specialising in SMSF and portfolio growth, Alex provides end-to-end service, securing high-performing assets across Sydney through strategy, negotiation, and long-term wealth planning.
              </p>
            </div>

            <div className="p-6 mt-8 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Licensed Professional</p>
                <p className="text-black font-serif text-2xl">No. 20543356</p>
              </div>
              <img src="/logo.png" alt="JJ Property Logo" className="w-16 h-16 opacity-50 grayscale" />
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
              src="/alex.png"
              alt="Alex - Principal"
              className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-2xl font-serif">Alex</p>
              <p className="text-sm font-sans tracking-widest uppercase opacity-80 mt-1">Principal Advisor</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-40 px-8 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-sky-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 drop-shadow-lg">The JJ Property Standard.</h2>
          <p className="text-lg font-sans text-white/70 max-w-2xl mx-auto">
            Our unyielding commitment to precision, anonymity, and market-beating results.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {[
            {
              title: "Data-Driven Precision",
              text: "Emotion-led decisions often lead to overpayment. With 20+ years of analytical expertise, we evaluate true market value through advanced data modelling, ensuring disciplined, evidence-based acquisitions.",
              icon: <Target className="w-8 h-8 text-sky-400" />
            },
            {
              title: "Off-Market Access",
              text: "Premium properties are rarely publicly listed. Through established industry relationships, we provide access to exclusive off-market opportunities unavailable to the general market.",
              icon: <Search className="w-8 h-8 text-sky-400" />
            },
            {
              title: "Executive Representation",
              text: "We deliver strategic negotiation with complete discretion. Acting solely in your interest, we protect your identity and apply proven, data-backed tactics to secure optimal outcomes.",
              icon: <ShieldCheck className="w-8 h-8 text-sky-400" />
            }
          ].map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
            >
              <div className="mb-6 p-4 inline-flex bg-white/5 rounded-2xl border border-white/5">
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
    </div>
  );
}
