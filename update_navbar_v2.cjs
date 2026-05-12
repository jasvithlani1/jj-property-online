const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Update Top Banner for better mobile prominence
const topBannerReplacement = `
        <div className="bg-[#011122] text-gold py-3 px-4 md:px-8 flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] border-b border-white/5">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
            <Link href="mailto:info@jjpropertypartner.com.au" className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/5 border border-white/10 sm:bg-transparent sm:border-none hover:text-[#C8A96A] transition-colors">
              <Mail className="w-4 h-4 md:w-3.5 md:h-3.5" />
              <span className="hidden xs:inline sm:inline">Email</span>
              <span className="hidden lg:inline ml-1">- info@jjpropertypartner.com.au</span>
            </Link>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <Link href="tel:+61481334458" className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/5 border border-white/10 sm:bg-transparent sm:border-none hover:text-[#C8A96A] transition-colors">
              <Phone className="w-4 h-4 md:w-3.5 md:h-3.5" />
              <span className="hidden xs:inline sm:inline">Call</span>
              <span className="hidden lg:inline ml-1">- +61 481 334 458</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <span className="hidden xl:inline text-gold mr-2 uppercase">Connect:</span>
            <div className="flex items-center gap-4">
              <Link href="https://www.instagram.com/jjpropertypartnerbuyersagent/" className="p-1 sm:p-0 hover:text-gold transition-all transform hover:scale-110"><FaInstagram className="w-4 h-4 sm:w-3.5 sm:h-3.5" /></Link>
              <Link href="https://www.facebook.com/jjpropertypartnerbuyersagent/" className="p-1 sm:p-0 hover:text-gold transition-all transform hover:scale-110"><FaFacebookF className="w-4 h-4 sm:w-3.5 sm:h-3.5" /></Link>
              <Link href="https://www.youtube.com/@JJPropertyPartnerBuyersAgent" className="p-1 sm:p-0 hover:text-gold transition-all transform hover:scale-110"><FaYoutube className="w-4 h-4 sm:w-3.5 sm:h-3.5" /></Link>
              <Link href="https://www.linkedin.com/in/jj-property-partner-buyers-agent-930139403/" className="p-1 sm:p-0 hover:text-gold transition-all transform hover:scale-110"><FaLinkedinIn className="w-4 h-4 sm:w-3.5 sm:h-3.5" /></Link>
            </div>
          </div>
        </div>`;

// Find the top banner div and replace it
code = code.replace(/<div className="bg-\[#011122\] text-gold py-3 md:py-2 px-4 sm:px-6 md:px-8 flex justify-between items-center text-\[10px\] sm:text-xs font-bold uppercase tracking-\[0.15em\] border-b border-white\/5">[\s\S]*?<\/div>\s*<\/div>/, topBannerReplacement + '\n        </div>');

// Ensure rotation is continuous on the logo
// (The class animate-slow-spin is already there, but let's make sure it's on the right element)
// The previous step already set it to 12s in CSS.

fs.writeFileSync('src/components/Navbar.tsx', code);
