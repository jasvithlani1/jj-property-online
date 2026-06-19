/**
 * Seeds siteHeader and siteFooter singleton documents in Sanity
 * with the existing data from the frontend components.
 */
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Read token from .env
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const tokenMatch = envContent.match(/VITE_SANITY_WRITE_TOKEN=(.+)/);
if (!tokenMatch) { console.error('Token not found'); process.exit(1); }
const token = tokenMatch[1].trim();

const client = createClient({
  projectId: '7c1xj4wj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

const socialLinks = [
  { _key: 'instagram', platform: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/jjpropertypartnerbuyersagent/' },
  { _key: 'facebook',  platform: 'Facebook',  icon: 'facebook',  url: 'https://www.facebook.com/jjpropertypartnerbuyersagent/' },
  { _key: 'youtube',   platform: 'YouTube',   icon: 'youtube',   url: 'https://www.youtube.com/@JJPropertyPartnerBuyersAgent' },
  { _key: 'twitter',   platform: 'X / Twitter', icon: 'twitter', url: 'https://x.com/jjbuyersagent' },
  { _key: 'linkedin',  platform: 'LinkedIn',  icon: 'linkedin',  url: 'https://www.linkedin.com/in/jj-property-partner-buyers-agent-930139403/' },
];

async function seed() {
  // ── siteHeader ──────────────────────────────────────────────────────────
  await client.createOrReplace({
    _id: 'siteHeader',
    _type: 'siteHeader',
    socialLinks,
  });
  console.log('✓ siteHeader seeded');

  // ── siteFooter ──────────────────────────────────────────────────────────
  await client.createOrReplace({
    _id: 'siteFooter',
    _type: 'siteFooter',
    address: '6-10 Charles Street, Parramatta, NSW 2150',
    email: 'info@jjpropertypartner.com.au',
    phone: '+61 481 334 458',
    abn: '71 687 187 113',
    reaLicence: 'No. 20543356',
    socialLinks,
  });
  console.log('✓ siteFooter seeded');
}

seed().catch((err) => { console.error(err); process.exit(1); });
