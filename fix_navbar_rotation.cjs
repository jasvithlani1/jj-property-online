const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// 1. Use Framer Motion for rotation instead of CSS class
// Replace the img with a motion.img
code = code.replace(
  '<img\n                src="/logo.png?v=4"\n                alt="JJ Logo"\n                className="w-full h-full object-contain cursor-pointer animate-slow-spin will-change-transform transform-gpu"\n                style={{ backfaceVisibility: \'hidden\', WebkitBackfaceVisibility: \'hidden\' }}\n                fetchPriority="high"\n                loading="eager"\n                width={128}\n                height={128}\n              />',
  `<motion.img
                src="/logo.png?v=4"
                alt="JJ Logo"
                className="w-full h-full object-contain cursor-pointer"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                fetchPriority="high"
                loading="eager"
                width={128}
                height={128}
              />`
);

// 2. Improve bifurcation in Top Banner
// I'll add a clear divider and separate them more distinctly
const improvedTopBanner = `
        <div className="bg-[#011122] text-gold py-3 px-4 md:px-8 flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] border-b border-white/5">
          {/* Group 1: Contact Methods */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Link href="mailto:info@jjpropertypartner.com.au" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <Mail className="w-4 h-4 text-gold" />
                <span className="inline">Email</span>
              </Link>
              <Link href="tel:+61481334458" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <Phone className="w-4 h-4 text-gold" />
                <span className="inline">Call</span>
              </Link>
            </div>
          </div>

          {/* Group 2: Socials with a clear visual separator on mobile */}
          <div className="flex items-center gap-3 md:gap-5 border-l border-white/10 pl-3 sm:border-none sm:pl-0">
            <span className="hidden sm:inline text-gold/60 text-[9px] uppercase tracking-[0.2em] mr-1">Socials</span>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="https://www.instagram.com/jjpropertypartnerbuyersagent/" className="hover:text-gold transition-all transform hover:scale-110"><FaInstagram className="w-4 h-4 sm:w-3.5 sm:h-3.5" /></Link>
              <Link href="https://www.facebook.com/jjpropertypartnerbuyersagent/" className="hover:text-gold transition-all transform hover:scale-110"><FaFacebookF className="w-4 h-4 sm:w-3.5 sm:h-3.5" /></Link>
              <Link href="https://www.youtube.com/@JJPropertyPartnerBuyersAgent" className="hover:text-gold transition-all transform hover:scale-110"><FaYoutube className="w-4 h-4 sm:w-3.5 sm:h-3.5" /></Link>
              <Link href="https://x.com/jjbuyersagent" className="hover:text-gold transition-all transform hover:scale-110"><FaTwitter className="w-4 h-4 sm:w-3.5 sm:h-3.5" /></Link>
              <Link href="https://www.linkedin.com/in/jj-property-partner-buyers-agent-930139403/" className="hover:text-gold transition-all transform hover:scale-110"><FaLinkedinIn className="w-4 h-4 sm:w-3.5 sm:h-3.5" /></Link>
            </div>
          </div>
        </div>`;

// Replace the top banner div
code = code.replace(/<div className="bg-\[#011122\] text-gold py-3 px-4 md:px-8 flex justify-between items-center text-\[10px\] sm:text-xs font-bold uppercase tracking-\[0.15em\] border-b border-white\/5">[\s\S]*?<\/div>/, improvedTopBanner);

fs.writeFileSync('src/components/Navbar.tsx', code);
