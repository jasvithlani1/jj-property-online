# JJ Property Partner — Project Handover Document

**Prepared:** June 2026  
**Project:** JJ Property Partner Website  
**Live site:** https://jjpropertypartner.com.au  
**Sanity Studio:** https://jjpropertypartner.sanity.studio  
**GitHub repo:** (your private repo URL)

---

## Contents

**Part 1 — Technical Handover (for developers)**
1. [Project Overview](#1-project-overview)
2. [Tech Stack & Versions](#2-tech-stack--versions)
3. [Repository Structure](#3-repository-structure)
4. [Local Development Setup](#4-local-development-setup)
5. [Environment Variables](#5-environment-variables)
6. [GitHub Secrets (CI/CD)](#6-github-secrets-cicd)
7. [Build & Deployment Pipeline](#7-build--deployment-pipeline)
8. [Sanity CMS — Developer Notes](#8-sanity-cms--developer-notes)
9. [Hostinger Server Configuration](#9-hostinger-server-configuration)
10. [Security Architecture](#10-security-architecture)
11. [Performance Optimisations](#11-performance-optimisations)
12. [Known Limitations & Decisions](#12-known-limitations--decisions)

**Part 2 — CMS User Guide (for content editors)**
13. [Accessing Sanity Studio](#13-accessing-sanity-studio)
14. [Studio Navigation & Publishing](#14-studio-navigation--publishing)
15. [Header](#15-header)
16. [Footer](#16-footer)
17. [Site Settings](#17-site-settings)
18. [Home Page](#18-home-page)
19. [About Page](#19-about-page)
20. [Services Overview Page](#20-services-overview-page)
21. [Service Pages (4 individual services)](#21-service-pages-4-individual-services)
22. [Case Studies](#22-case-studies)
23. [Property Acquisitions](#23-property-acquisitions)
24. [Blog Posts](#24-blog-posts)
25. [Blog Page Settings](#25-blog-page-settings)
26. [Authors](#26-authors)
27. [Categories](#27-categories)
28. [Contact Page](#28-contact-page)
29. [Reviews](#29-reviews)
30. [Inquiries (Contact Form Submissions)](#30-inquiries-contact-form-submissions)
31. [Privacy Policy Page](#31-privacy-policy-page)
32. [Terms & Conditions Page](#32-terms--conditions-page)
33. [SEO Module (on every page)](#33-seo-module-on-every-page)
34. [Image Upload Guidelines](#34-image-upload-guidelines)
35. [Troubleshooting & FAQ](#35-troubleshooting--faq)

---

# PART 1 — TECHNICAL HANDOVER

## 1. Project Overview

JJ Property Partner is a client-side rendered (CSR) single-page application (SPA) built with React 19 + TypeScript + Vite. Content is managed through a Sanity CMS backend. The site is deployed to a Hostinger shared hosting account via GitHub Actions on every push to `main`.

The contact form sends emails via a PHP script (`send-email.php`) hosted on the server that calls the Brevo transactional email API. All Sanity write operations (storing inquiry documents) also go through this PHP script, keeping secrets off the client entirely.

---

## 2. Tech Stack & Versions

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19 |
| Language | TypeScript | 5.x |
| Bundler | Vite | 8 |
| Styling | Tailwind CSS | 4 |
| Animation | Framer Motion | latest |
| Routing | React Router DOM | 6 |
| CMS | Sanity | 3 (Studio v3) |
| CMS client | `@sanity/client` | latest |
| Image URL builder | `@sanity/image-url` | latest |
| Rich text renderer | `@portabletext/react` | latest |
| Icons | Lucide React | latest |
| Email service | Brevo (transactional API) | — |
| Hosting | Hostinger (shared) | — |
| CI/CD | GitHub Actions | — |
| Font: Sans | Inter | loaded from Google Fonts |
| Font: Serif | Instrument Serif | loaded from Google Fonts |

---

## 3. Repository Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD: build + FTP deploy to Hostinger
├── cms/                        # Separate Sanity Studio project
│   ├── schemas/                # All CMS schema definitions (21 schemas)
│   ├── sanity.config.ts        # Studio configuration + desk structure
│   ├── sanity.cli.ts           # projectId: 7c1xj4wj, studioHost: jjpropertypartner
│   └── package.json
├── public/                     # Static assets served as-is
│   ├── config.php              # SERVER ONLY — NEVER commit. Holds secrets.
│   ├── send-email.php          # Contact form handler + Sanity write endpoint
│   ├── *.jpg / *.png           # Static images (logo, fallback images)
│   └── images/                 # Nested image directories
├── scripts/
│   └── compress-images.cjs     # One-time image compression utility (jimp)
├── src/
│   ├── components/             # Shared UI components (Navbar, Footer, PageSEO…)
│   ├── lib/
│   │   └── sanity.ts           # Sanity client + urlFor() helper
│   ├── pages/                  # One file per route
│   ├── styles/
│   │   └── theme.css           # Tailwind v4 @theme — design tokens
│   ├── types/
│   │   └── sanity.ts           # Shared SanityImage interface
│   ├── utils/
│   │   └── calendly.ts         # Lazily loads Calendly widget
│   ├── App.css                 # Marquee animations, no-scrollbar utility
│   ├── App.tsx                 # Routes
│   └── main.tsx                # Entry point
├── index.html                  # Google Fonts + meta base
├── vite.config.ts              # Build config with vendor chunk splitting
├── tailwind.config.ts
└── package.json
```

**Key note:** `public/config.php` is in `.gitignore` and must NEVER be committed. It contains all server-side secrets. If you clone or re-deploy to a new server, you must manually create this file on the server (see [Section 9](#9-hostinger-server-configuration)).

---

## 4. Local Development Setup

**Prerequisites:** Node.js 20+, npm

```bash
# 1. Clone the repository
git clone <repo-url>
cd "JJ prop V2"

# 2. Install frontend dependencies
npm install

# 3. Create .env file in project root
cp .env.example .env
# Edit .env — fill in VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET

# 4. Start dev server
npm run dev
# → http://localhost:3000
```

**To run the CMS Studio locally:**
```bash
cd cms
npm install
npm run dev
# → http://localhost:3333
```

**Available npm scripts (root):**
| Script | Purpose |
|---|---|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the `dist/` folder locally |
| `npm run typecheck` | TypeScript check without building |
| `npm run lint` | ESLint check |

---

## 5. Environment Variables

Create a `.env` file in the project root. These variables are baked into the frontend bundle at build time.

```env
VITE_SANITY_PROJECT_ID=7c1xj4wj
VITE_SANITY_DATASET=production
```

**What each variable does:**

| Variable | Purpose | Required |
|---|---|---|
| `VITE_SANITY_PROJECT_ID` | Sanity project ID for GROQ queries | Yes |
| `VITE_SANITY_DATASET` | Sanity dataset name (`production`) | Yes |

> There is **no** `VITE_SANITY_WRITE_TOKEN`. Write operations were deliberately removed from the browser bundle. All writes go through the PHP server.

---

## 6. GitHub Secrets (CI/CD)

The GitHub Actions workflow reads these secrets at build/deploy time. Set them at:  
`GitHub Repo → Settings → Secrets and variables → Actions`

| Secret name | Value |
|---|---|
| `VITE_SANITY_PROJECT_ID` | `7c1xj4wj` |
| `VITE_SANITY_DATASET` | `production` |
| `FTP_SERVER` | Hostinger FTP hostname |
| `FTP_USERNAME` | Hostinger FTP username |
| `FTP_PASSWORD` | Hostinger FTP password |

> If you previously had `VITE_SANITY_WRITE_TOKEN` in GitHub Secrets, delete it — it is no longer needed and should not be present.

---

## 7. Build & Deployment Pipeline

**How it works:**

1. Developer pushes to the `main` branch on GitHub
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers automatically
3. Actions runner: installs dependencies → runs `npm run build` with Sanity env vars
4. The `dist/` folder is FTP-uploaded to Hostinger root using `SamKirkland/FTP-Deploy-Action@v4.3.5`
5. `dangerous-clean-slate: true` wipes the server directory before uploading (ensures stale files are removed)
6. `exclude: **/config.php` protects the server-only secrets file from being deleted during the wipe

**Build output (vendor chunk split):**
- `vendor-react.js` — React + React DOM + React Router (~249 KB)
- `vendor-sanity.js` — Sanity client + image URL builder (~117 KB)
- `vendor-motion.js` — Framer Motion (~140 KB)
- `index.js` — Application code (~156 KB)
- CSS files split per route via `cssCodeSplit: true`

**To trigger a deploy manually:** Push any commit to `main`, or use the GitHub Actions "Run workflow" button.

**Deploy time:** Approximately 2–4 minutes from push to live.

---

## 8. Sanity CMS — Developer Notes

**Project details:**
- Project ID: `7c1xj4wj`
- Dataset: `production`
- Studio URL: https://jjpropertypartner.sanity.studio
- API version pinned to: `2024-03-12`
- CDN: disabled (`useCdn: false`) — always reads from the live API

**Sanity client (`src/lib/sanity.ts`):**
```ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '7c1xj4wj',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-03-12',
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

**Adding a new schema:**
1. Create `cms/schemas/myNewType.ts`
2. Import and register it in `cms/sanity.config.ts` → `schema.types` array
3. Add a `S.listItem()` entry in the `deskTool` structure function
4. In the frontend, write a GROQ query using `client.fetch()`

**Singleton documents** (only one can exist — Header, Footer, Site Settings):
- Enforced via the `document.newDocumentOptions` and `document.actions` hooks in `sanity.config.ts`
- These are fetched by `documentId` (e.g., `*[_type == "siteHeader"][0]`)

**Write operations (contact form → inquiry storage):**
All Sanity writes go through `public/send-email.php`. The PHP script uses the Sanity Mutations REST API with the write token from `config.php`. This means the write token never appears in the client bundle.

**CMS schemas location:** `cms/schemas/` (21 files)

---

## 9. Hostinger Server Configuration

The site runs on Hostinger shared hosting. PHP is available server-side for the contact form and Sanity write operations.

**Files that must exist on the server but are NOT in the repository:**

### `config.php` (in the public web root)

This file is gitignored and must be created manually on the server. Structure:

```php
<?php
define('BREVO_API_KEY', 'your-brevo-api-key-here');
define('SANITY_WRITE_TOKEN', 'your-sanity-write-token-here');
define('SANITY_PROJECT_ID', '7c1xj4wj');
define('SANITY_DATASET', 'production');
```

**To get the Sanity write token:**  
Sanity Studio → `https://www.sanity.io/manage/project/7c1xj4wj` → API → Tokens → Create new token (Editor or above)

**To get the Brevo API key:**  
Brevo dashboard → SMTP & API → API Keys

### `send-email.php`

This file IS in the repository under `public/` and is uploaded by the deployment. It handles:
1. Receiving the contact form POST
2. Sending a transactional email via Brevo
3. Writing an `inquiry` document to Sanity

CORS is restricted to `jjpropertypartner.com.au` and `www.jjpropertypartner.com.au`.

---

## 10. Security Architecture

| Concern | How it's handled |
|---|---|
| Sanity write token | Lives in server-only `config.php`, never in the browser bundle |
| Brevo API key | Lives in server-only `config.php` |
| `config.php` in deployment | Excluded via `exclude: **/config.php` in deploy.yml |
| `config.php` in git | Listed in `.gitignore` — verified never committed |
| CORS on PHP | Restricted to production domain only |
| Sanity read token | Not needed — dataset is public read |
| Client-side writes | Completely removed; all via PHP REST calls |
| Calendly widget | Loaded lazily via `src/utils/calendly.ts` (deferred script injection) |

**Security checklist for new environments:**
- [ ] Confirm `config.php` is NOT in git history (`git log --all -- public/config.php`)
- [ ] Confirm `VITE_SANITY_WRITE_TOKEN` is NOT in GitHub Secrets (delete if found)
- [ ] Manually create `config.php` on the server via Hostinger file manager or SSH
- [ ] Verify CORS origin in `send-email.php` matches the production domain

---

## 11. Performance Optimisations

The following optimisations were applied during this project:

| Area | Change |
|---|---|
| Fonts | Fixed Google Fonts link to load Inter + Instrument Serif (previously loaded unused Montserrat + Playfair Display) |
| CSS dead code | Deleted `src/index.css` (orphaned file with wrong font variables, never imported) |
| CSS scaffolding | Deleted 184 lines of Vite template scaffolding from `src/App.css` |
| Bundle splitting | Vite `manualChunks` function splits react, sanity, and framer-motion into separate vendor chunks |
| Source maps | Disabled in production build (`sourcemap: false`) |
| CSS splitting | `cssCodeSplit: true` — CSS loaded per route |
| Images | Converted 9 photo PNGs → JPEG at 85% quality (saved ~4.87 MB total) |
| Logo | Resized logo.png from 1024px to 256px (saved 919 KB) |
| Calendly | Deferred script injection — only loads when user clicks booking button |

**Remaining performance opportunities (not yet implemented):**
- Lazy-load page components (React.lazy + Suspense for route-level code splitting)
- Add `loading="lazy"` to below-the-fold `<img>` tags
- Consider Sanity image CDN transforms (`?auto=format&fit=crop`)
- Add `<link rel="preconnect">` for Sanity CDN domain

---

## 12. Known Limitations & Decisions

**CSR only (no SSR/SSG):** The site is a plain React SPA. There is no server-side rendering. SEO relies on Sanity-sourced meta tags injected into `<head>` via the `PageSEO` component. Initial page load requires the JS bundle to execute before content renders.

**Blog newsletter is a UI simulation:** The newsletter subscribe form on the Blog page (using `handleSubscribe`) currently uses `setTimeout` to show a success state — it does not actually subscribe anyone to anything. A real newsletter integration (Brevo contacts API, Mailchimp, etc.) would need to be wired up.

**Static blog data in `src/data/blogs.ts`:** Six blog posts exist as static TypeScript data in addition to Sanity-fetched posts. The blog page fetches from Sanity only; the static data file is a leftover from before Sanity was wired up. The static posts are not shown on the live site; only Sanity posts are.

**`useState<any>` for CMS data:** Many page components use `useState<any>` for the raw Sanity page data objects (e.g., `pageData`, `headerData`). This is intentional — fully typing every possible GROQ result shape is not justified for this project. Only specific known interfaces (e.g., `SanityPost`, `SanityImage`) have been given proper types.

**Sanity CDN disabled:** `useCdn: false` means every data fetch hits the live API. This ensures content is always fresh but is slightly slower. For a high-traffic site, consider enabling the CDN and using cache invalidation webhooks.

**`esbuild.drop` not available in Vite 8:** Console dropping (stripping `console.*` calls from the production bundle) was attempted but is not supported by Vite 8's TypeScript types. `console.error` calls have been removed from source; `console.warn` dev-only warnings are acceptable.

---

---

# PART 2 — CMS USER GUIDE

> This section is written for non-technical users who manage content through the Sanity Studio. No coding knowledge is required.

---

## 13. Accessing Sanity Studio

The Sanity Studio is your content management dashboard. Think of it as the "back office" of the website.

**URL:** https://jjpropertypartner.sanity.studio

**To log in:**
1. Go to https://jjpropertypartner.sanity.studio in your browser
2. Click **"Log in with Google"** or **"Log in with email"**
3. Use the same email address that was invited to the Sanity project
4. You will land on the Studio dashboard

**If you cannot log in:**
- Make sure you are using the correct email address
- Ask the project administrator to check your invite at https://www.sanity.io/manage/project/7c1xj4wj → Members

---

## 14. Studio Navigation & Publishing

### Finding your way around

When you log in, you'll see a **sidebar on the left** with icons. The main area shows a list of content sections. Click any section to open it.

The sidebar sections, top to bottom:
- **⚙️ Site Settings** — Global SEO, analytics tracking codes, schema markup
- **🏠 Home Page** — Hero slides, service previews, process steps, FAQs
- **ℹ️ About Page** — Your profile, credentials, values, tech stack section
- **🔧 Service Pages** — Individual service page content (FHB, Investors, SMSF, Commercial)
- **📋 Services Overview** — The main /services page hero and intro
- **📞 Contact Page** — Contact page hero and contact details
- **💼 Case Studies** — Individual client case study records
- **📈 Property Acquisitions** — The "Recent Acquisitions" ticker/grid entries
- **📁 Case Studies Page** — Hero and stats bar for the /case-studies page
- **✍️ Blog Posts** — Individual articles
- **📰 Blog Page** — Hero and newsletter section for the /blog page
- **⚖️ Privacy Policy** — Privacy policy sections
- **⚖️ Terms & Conditions** — T&C sections
- **👤 Authors** — Blog post authors
- **🏷️ Categories** — Blog post categories
- **⭐ Reviews** — Google-style reviews shown on the site
- **📩 Inquiries** — Contact form submissions (read-only)
- **🔗 Header** — Navigation links, Calendly URL, phone, email, social links
- **🦶 Footer** — Logo, brand info, address, social links

### Making changes and publishing

Sanity has a **Draft / Published** system:

- When you edit anything, changes are saved as a **draft** — they are NOT live on the website yet
- To make changes go live, click the **"Publish"** button (green button, top right of each document)
- You can discard unsaved changes by clicking **"Discard changes"**

**Step-by-step to update any content:**
1. Click the section in the left sidebar
2. Click the document you want to edit (or the only document if it's a singleton)
3. Make your changes in the form fields
4. Click **"Publish"** (top right) when ready
5. Wait 10–30 seconds, then refresh the live website to see the change

> **Important:** Changes to Header, Footer, and Site Settings affect every page on the website. Double-check before publishing these.

---

## 15. Header

**What it controls:** The top navigation bar that appears on every page.

**How to edit:** Sidebar → 🔗 Header (at the bottom of the list)

### Fields

| Field | What it does | Example |
|---|---|---|
| **Calendly URL** | The booking link that opens when visitors click "Book a Call" | `https://calendly.com/your-name/30min` |
| **Email** | Contact email shown in the nav (mobile) | `hello@jjpropertypartner.com.au` |
| **Phone** | Phone number shown in the nav | `+61 400 000 000` |
| **Social Links** | List of social media links (icon + URL) | Facebook, LinkedIn, Instagram URLs |

### How to update the booking link

1. Go to your Calendly account and copy the event link
2. Open Header in the Studio
3. Paste the new URL in the **Calendly URL** field
4. Click **Publish**

### How to add a social link

1. In the Social Links section, click **"Add item"**
2. Choose the platform from the dropdown (Facebook, Instagram, LinkedIn, etc.)
3. Paste the full URL to your social profile
4. Click **Publish**

---

## 16. Footer

**What it controls:** The footer that appears at the bottom of every page.

**How to edit:** Sidebar → 🦶 Footer (at the bottom of the list)

### Fields

| Field | What it does |
|---|---|
| **Logo** | Footer logo image (upload a PNG or SVG, recommended 200px wide) |
| **Brand Name** | Company name displayed in the footer |
| **Tagline** | Short tagline under the brand name |
| **Description** | Paragraph about the company |
| **Address** | Full street address |
| **Email** | Contact email in the footer |
| **Phone** | Contact phone in the footer |
| **ABN** | Australian Business Number |
| **REA Licence** | Real estate licence number |
| **Social Links** | Same as header — icon + URL pairs |

---

## 17. Site Settings

**What it controls:** SEO defaults, analytics tracking codes, schema markup for Google, and advanced settings.

**How to edit:** Sidebar → ⚙️ Site Settings

> **This section is for advanced users.** Incorrect changes here can affect how Google indexes the site.

### Fields

| Field | What it does |
|---|---|
| **Site Title** | Default browser tab title and SEO title fallback |
| **Site URL** | Full URL of the website (e.g., `https://jjpropertypartner.com.au`) |
| **GTM ID** | Google Tag Manager container ID (e.g., `GTM-XXXXXXX`) |
| **GA ID** | Google Analytics 4 measurement ID (e.g., `G-XXXXXXXXXX`) |
| **GSC Verification Code** | Google Search Console HTML meta tag verification code |
| **Organization Schema** | Structured data for the business (name, URL, logo, contact) |
| **Person Schema** | Structured data for the principal (name, job title, image) |
| **Robots Disallow** | Paths that search engines should NOT index (e.g., `/admin`) |
| **Custom Header Scripts** | Any scripts to inject into `<head>` (e.g., third-party analytics) |
| **Custom Footer Scripts** | Any scripts to inject before `</body>` |
| **LLMs.txt Content** | Content for the `/llms.txt` file (AI crawler guidance) |
| **Default OG Image** | Fallback image for social media link previews |

---

## 18. Home Page

**What it controls:** The content of the main homepage at `/`.

**How to edit:** Sidebar → 🏠 Home Page → click the single document

### Hero Slides

The homepage hero is a rotating slideshow. Each slide has:
- **Heading** — Large text (e.g., "Sydney's Premier Buyers Agency")
- **Subheading** — Smaller descriptive text below the heading
- **Image** — Background or side image for the slide

**To add a new hero slide:**
1. Click the **+** button in the Hero Slides section
2. Fill in Heading, Subheading, and upload an Image
3. Click Publish

**CTA Text:** The "Book a Call" button text can be changed in the **CTA Text** field.

### Services Preview Section

Shows a grid of services on the homepage. Each item has:
- **Icon** — Choose from dropdown
- **Title** — Service name
- **Description** — Short description
- **Link** — URL slug for the service page (e.g., `/services/first-home-buyer`)

### About Preview Section

Short "About" teaser section on the homepage:
- **Badge** — Small label above the heading (e.g., "About JJ Property")
- **Heading** — Section heading
- **Description** — Paragraph text
- **Stats** — Key stats shown in boxes (e.g., "200+ Clients", "$150M+ Transacted")
- **Image** — Photo of the principal/team

### Difference Section

The "Why Choose Us" section:
- **Heading** — Section heading
- **Points** — List of differentiators, each with a Title and Description

### Process Section

The "How It Works" steps:
- **Heading** — Section heading
- **Steps** — Ordered list of steps, each with a Step Number, Title, and Description

### Work Highlights (Case Studies)

The "Recent Work" section on the homepage pulls from **Case Study** documents. To update which case studies appear:
- Go to the **Case Studies** section and make sure the ones you want to feature are published
- In the Home Page document, open **Work Highlights Section** and use the reference picker to select case studies

### FAQs

A list of frequently asked questions:
- Each FAQ has a **Question** and **Answer** field
- Click **"Add item"** to add a new FAQ
- Drag the handle (≡) on the left to reorder FAQs

---

## 19. About Page

**What it controls:** The `/about` page content.

**How to edit:** Sidebar → ℹ️ About Page → click the single document

### Profile Section

| Field | What it does |
|---|---|
| **Badge** | Small label above the heading |
| **Heading** | Main heading (e.g., your name) |
| **Quote** | Pull quote displayed prominently |
| **Description** | Biographical paragraphs (rich text — supports bold, italic, lists) |
| **Image** | Your profile photo |
| **Stats** | Key numbers (e.g., "20+ Years Experience") |

### Purpose Section

The "Our Purpose" or mission section:
- **Heading**, **Description**, **Image**

### Track Record Section

Statistics and achievements:
- **Heading**, list of **Stats** with numbers and labels

### Tech Advantage Section

The "Technology-Driven" section:
- **Heading**, **Description**, list of **Features** shown as cards

### Values Section

List of company values. Each value has:
- **Title** — Value name
- **Description** — What it means
- **Icon** — Choose from dropdown

### Pillars Section

A section showing the key pillars/principles of the business:
- **Heading**, **Description**, list of **Pillars** (each with Title and Description)

### Credentials

Licences, certifications, and memberships:
- **REA Number**, **REBAA Membership**, **PIPA Membership**, etc.

---

## 20. Services Overview Page

**What it controls:** The `/services` page that lists all services.

**How to edit:** Sidebar → 📋 Services Overview → click the document

### Fields

- **Hero:** Badge, Heading, Subheading
- **Service List:** Each entry is a card showing: Icon, Title, Description, Link
- **Additional Services:** A secondary list of services
- **FAQs:** General services FAQs
- **Final CTA:** The call-to-action section at the bottom (Heading, Description, Button Text)

---

## 21. Service Pages (4 individual services)

**What they control:** The individual service detail pages:
- `/services/first-home-buyer` — First Home Buyers
- `/services/property-investors` — Property Investors
- `/services/smsf-property` — SMSF Property
- `/services/commercial-property` — Commercial Property

**How to edit:** Sidebar → 🔧 Service Pages → click a service name

### Fields (same structure for all 4)

| Field | What it does |
|---|---|
| **Title** | Service name (used in navigation) |
| **Order** | Number that determines display order (1 = first) |
| **Hero** | Badge, Heading, Subheading, Image for the top section |
| **Intro** | Introductory text section |
| **Pillars** | Key selling points (icon, title, description for each) |
| **Process** | Step-by-step "How It Works" section |
| **Readiness** | "Are You Ready?" checklist or quiz section |
| **Why JJ** | "Why Choose Us" section specific to this service |
| **FAQs** | Service-specific frequently asked questions |
| **Final CTA** | Closing call-to-action (heading, description, button) |
| **SEO Module** | Page-specific meta title, description, OG image (see [Section 33](#33-seo-module-on-every-page)) |

---

## 22. Case Studies

Case studies appear on the `/case-studies` page and are referenced from the Home Page.

### Case Studies Page (overview header)

**How to edit:** Sidebar → 📁 Case Studies Page → click the document

- **Hero:** Badge, Heading, Subheading
- **Stats Bar:** Up to 4 stats shown below the hero (e.g., "200+ properties secured")

### Individual Case Studies

**How to edit:** Sidebar → 💼 Case Studies → click a case study, or click **"Create new document"**

#### Fields

| Field | What it does | Notes |
|---|---|---|
| **Title** | Property headline (e.g., "3-Bed House, Blacktown") | Keep it concise |
| **Slug** | URL-friendly version of the title | Auto-generated from Title — do not change manually |
| **Result Text** | Short result summary (e.g., "$62,000 Under Asking") | Shown on cards |
| **Location** | Suburb/city | |
| **Case Number** | Sequential number (e.g., 12) | Used to sort the list |
| **Tag** | Label badge (e.g., "First Home Buyer") | |
| **Tag Color** | Colour for the tag badge | Choose from dropdown |
| **Property Details** | List of specs (bedrooms, bathrooms, price, land size, etc.) | Click "+ Add item" for each detail |
| **Strategic Advantages** | Bullet points of what made this deal successful | |
| **Main Image** | Feature photo for the case study card | Recommended: 1200×800px |
| **Deal Done** | Yes/No toggle | Shows a "Deal Done" indicator |
| **Client** | Short description of the buyer type (e.g., "First-time buyer couple") | |
| **Challenge** | What the client faced (rich text) | |
| **Strategy** | What JJ Property did (rich text) | |
| **Outcome** | The result (rich text) | |
| **Short Quote** | Pull quote from the client | |
| **Stats** | Numeric outcomes shown in boxes (e.g., "Bought $62K Under Asking") | |
| **SEO Module** | Meta title, description, OG image | |

**How to add a new case study:**
1. Sidebar → 💼 Case Studies → click **"Create new document"** (pencil icon or + button)
2. Fill in all required fields (Title, Location, Main Image are the most important for the listing page)
3. Click **"Publish"** when ready
4. To feature it on the homepage, open the Home Page document → Work Highlights Section → add a reference to this case study

---

## 23. Property Acquisitions

**What it controls:** The "Recent Acquisitions" section — a scrolling ticker/grid showing recently acquired properties. These appear on the homepage and possibly other pages.

**How to edit:** Sidebar → 📈 Property Acquisitions → click an entry or create new

### Fields

| Field | What it does |
|---|---|
| **City** | Suburb or city name |
| **State** | State abbreviation (e.g., NSW) |
| **Linked Case Study** | Optional reference to a full Case Study document |
| **Deal Done** | Yes/No toggle |
| **Price** | Purchase price (e.g., "$875,000") |
| **Config** | Property configuration (e.g., "3 Bed / 2 Bath") |
| **Month** | Month of acquisition (e.g., "March 2026") |
| **Rental** | Weekly rental yield (e.g., "$650/wk") |
| **Value** | Estimated current value |
| **Size** | Land size (e.g., "450 sqm") |
| **Growth** | Capital growth achieved |
| **Yield** | Rental yield percentage |
| **Image** | Property photo |

**To add a new acquisition:**
1. Click **"Create new document"**
2. Fill in at minimum: City, State, Price, Config, Month
3. Click **"Publish"**

---

## 24. Blog Posts

Blog posts appear on the `/blog` page and as individual pages at `/blog/[slug]`.

**How to edit:** Sidebar → ✍️ Blog Posts → click a post or create new

### Creating a new blog post

1. Sidebar → ✍️ Blog Posts
2. Click the **pencil/edit icon** or **"Create new"** button
3. Fill in all fields (see below)
4. Click **"Publish"** when ready to go live — or leave as a **draft** to continue editing later

### Fields

| Field | What it does | Tips |
|---|---|---|
| **Title** | Article headline | Keep under 70 characters for SEO |
| **Slug** | URL path (e.g., `first-home-buyer-guide`) | Auto-generated from Title — check and edit if needed |
| **Author** | Reference to an Author document | Must create the author first — see [Section 26](#26-authors) |
| **Main Image** | Cover photo shown in listings and at top of article | Recommended: 1200×630px (landscape) |
| **Categories** | One or more category tags | Select from existing categories — see [Section 27](#27-categories) |
| **Published At** | Publication date | Set to today's date |
| **Excerpt** | Short summary (2–3 sentences) | Shown on listing cards — keep under 160 characters |
| **Body** | Full article content (rich text editor) | Supports headings, paragraphs, bold, italic, bullet lists, numbered lists, links, and embedded images |
| **Featured** | Toggle to mark as a featured post | May be shown more prominently |
| **FAQs** | Optional FAQ section appended after the body | Adds FAQ schema for rich Google results |
| **SEO Module** | Meta title, description, canonical URL | See [Section 33](#33-seo-module-on-every-page) |

### Writing body content

The **Body** field is a rich text editor. Available formatting:

- **H2** — Section heading (use for main sections)
- **H3** — Sub-section heading
- **Normal** — Body paragraph
- **Blockquote** — Pull quote / highlighted quote
- **Bold** (Ctrl+B / ⌘B) — Emphasis within a paragraph
- **Italic** (Ctrl+I / ⌘I) — Light emphasis
- **Bullet list** — Unordered list (click the list icon in the toolbar)
- **Numbered list** — Ordered list
- **Link** — Highlight text, click the link icon, paste URL
- **Image** — Click the image/upload icon to embed a photo inline in the article

**Structure recommendation:**
```
Introduction paragraph
H2: First Section
Paragraph...
H2: Second Section
Paragraph...
Bullet list...
H2: Conclusion
Paragraph...
```

### Editing a draft post

- Drafts are auto-saved every few seconds
- They show a **"Draft"** badge in the list view
- Click **"Publish"** to make the post live
- You can unpublish a live post by clicking **"Unpublish"** (it returns to draft status)

---

## 25. Blog Page Settings

**What it controls:** The hero section and newsletter block on the `/blog` listing page.

**How to edit:** Sidebar → 📰 Blog Page → click the document

### Fields

| Field | What it does |
|---|---|
| **SEO Module** | Meta title, description for the /blog page |
| **Hero → Badge** | Small label above the heading (e.g., "Market Intelligence") |
| **Hero → Heading** | Main heading on the blog page |
| **Hero → Subheading** | Descriptive paragraph below the heading |
| **Newsletter → Heading** | Heading for the email subscribe section |
| **Newsletter → Description** | Descriptive text for the newsletter |
| **Newsletter → Button Text** | Subscribe button label |
| **Newsletter → Success Message** | Message shown after subscribing |

> **Note:** The newsletter subscribe form currently shows a success animation but does not actually save email addresses. A real integration would need to be added separately.

---

## 26. Authors

Authors are referenced by blog posts to show who wrote the article.

**How to edit:** Sidebar → 👤 Authors → click an author or create new

### Fields

| Field | What it does |
|---|---|
| **Name** | Full name of the author |
| **Slug** | URL-friendly identifier |
| **Image** | Author headshot (recommended: 200×200px, square) |
| **Bio** | Short author biography (shown at the bottom of posts) |

**To create a new author:**
1. Sidebar → 👤 Authors → click **"Create new"**
2. Fill in Name and upload Image (Bio is optional but recommended)
3. Click **"Publish"**
4. You can now select this author when creating or editing a blog post

---

## 27. Categories

Categories tag blog posts and power the category filter buttons on the blog listing page.

**How to edit:** Sidebar → 🏷️ Categories → click a category or create new

### Fields

| Field | What it does |
|---|---|
| **Title** | Category name (e.g., "First Home", "Investment", "Market Analysis") |
| **Description** | Optional description of the category |
| **Color** | CSS class for the category badge colour |

**To create a new category:**
1. Sidebar → 🏷️ Categories → click **"Create new"**
2. Enter a Title
3. Click **"Publish"**
4. Go to a Blog Post and select this category in the **Categories** field

---

## 28. Contact Page

**What it controls:** The `/contact` page hero and contact detail cards.

**How to edit:** Sidebar → 📞 Contact Page → click the document

### Fields

| Field | What it does |
|---|---|
| **SEO Module** | Meta title, description for the /contact page |
| **Hero → Badge** | Small badge above the heading |
| **Hero → Heading** | Main heading on the contact page |
| **Hero → Subheading** | Descriptive paragraph |
| **Details → Heading** | Heading for the contact details section |
| **Details → Email** | Email address shown as a clickable link |
| **Details → Phone** | Phone number shown as a clickable link |
| **Details → WhatsApp** | WhatsApp number or link |
| **Details → Address** | Full office/mailing address |

---

## 29. Reviews

Reviews are Google-style testimonials displayed on the website (typically on the homepage or dedicated reviews section).

**How to edit:** Sidebar → ⭐ Reviews → click a review or create new

### Fields

| Field | What it does |
|---|---|
| **Name** | Reviewer's name |
| **Text** | The review content |
| **Rating** | Star rating from 1 to 5 |
| **Date** | Date of the review |
| **Author Image** | Optional headshot of the reviewer |
| **Is Featured** | Toggle — featured reviews may be shown in priority positions |
| **Order** | Number to control display order (lower = first) |

**To add a new review:**
1. Sidebar → ⭐ Reviews → click **"Create new"**
2. Fill in Name, Text, Rating, Date
3. Set **Order** (e.g., 1 for the first review to show)
4. Toggle **Is Featured** if you want it highlighted
5. Click **"Publish"**

---

## 30. Inquiries (Contact Form Submissions)

**What it controls:** This section shows all contact form submissions from the website. These are read-only — you cannot create inquiries from the Studio.

**How to access:** Sidebar → 📩 Inquiries

### What you'll see

Each inquiry record contains:

| Field | Meaning |
|---|---|
| **Name** | Visitor's name |
| **Email** | Their email address |
| **Phone** | Their phone number |
| **Goal** | What they selected from the dropdown (e.g., "First Home Buyer", "Investment Property") |
| **Message** | Their message |
| **Submitted At** | Date and time the form was submitted |
| **Status** | Workflow status — change this to track progress |

### Managing inquiry status

Each inquiry has a **Status** field you can update:
- **New** — Just arrived, not yet reviewed
- **In Progress** — You are actively working with this lead
- **Contacted** — You have reached out to them
- **Archived** — Completed or no longer relevant

**To update status:**
1. Click on the inquiry
2. Change the **Status** dropdown
3. Click **"Publish"** to save

> **Tip:** Inquiries also arrive as emails to your configured email address (via Brevo). Sanity is the backup record.

---

## 31. Privacy Policy Page

**What it controls:** The `/privacy-policy` page content.

**How to edit:** Sidebar → ⚖️ Privacy Policy → click the document

### Structure

The Privacy Policy is made up of **sections**. Each section has:
- **Title** — Section heading (e.g., "1. Information We Collect")
- **Body** — Rich text content with full formatting support (paragraphs, bullet lists, bold, italic, links)

**To add a new section:**
1. Scroll to the Sections field
2. Click **"Add item"**
3. Enter a Title and write the body content
4. Click **"Publish"**

**To reorder sections:**
- Drag the handle (≡) on the left of each section to reorder them

---

## 32. Terms & Conditions Page

**What it controls:** The `/terms-and-conditions` page content.

**How to edit:** Sidebar → ⚖️ Terms & Conditions → click the document

Works exactly the same as the Privacy Policy (sections with Title + Body). See [Section 31](#31-privacy-policy-page) above.

---

## 33. SEO Module (on every page)

Almost every page has a **SEO Module** section. This controls how that specific page appears in Google search results and when shared on social media.

### Fields

| Field | What it does | Best practice |
|---|---|---|
| **Meta Title** | Title shown in Google search results | 50–60 characters; include the main keyword |
| **Meta Description** | Description shown in Google search results | 140–160 characters; explain what the page is about |
| **OG Image** | Image shown when the page is shared on Facebook/LinkedIn | Recommended: 1200×630px (landscape) |
| **Canonical URL** | Tells Google which URL is the "official" version | Leave blank unless you have duplicate content issues |
| **No Index** | Toggle — hides the page from Google if enabled | Only enable for pages you DO NOT want indexed |

### Schema Modules (advanced)

Each page's SEO Module can also include **structured data schemas** that help Google display rich results:

- **FAQ Schema** — Marks up FAQ content so Google can show Q&A directly in search results. Add each question and answer.
- **Review Schema** — Marks up your aggregate rating (e.g., 5.0 stars, 47 reviews).
- **Article Schema** — Marks up blog posts for Google News and article rich results.
- **Service Schema** — Marks up service pages with service name, description, and area served.

**To add a schema:**
1. In any page's SEO Module, scroll to **Schema Modules**
2. Click **"Add item"**
3. Choose the schema type from the dropdown
4. Fill in the fields
5. Toggle **Enabled** to on
6. Click **"Publish"**

---

## 34. Image Upload Guidelines

Sanity handles image storage, resizing, and optimisation. Follow these guidelines for best results:

### Recommended image sizes

| Image type | Recommended size | Format |
|---|---|---|
| Hero / banner | 1600×900px | JPG (landscape) |
| Blog cover / OG image | 1200×630px | JPG (landscape) |
| Profile / headshot | 600×600px | JPG (square) |
| Case study main image | 1200×800px | JPG |
| Property photo | 1200×800px | JPG |
| Logo | 400×200px | PNG (transparent background) |
| Author headshot | 300×300px | JPG (square) |

### File format guidance

- **JPG** — Use for all photographs (smaller file size)
- **PNG** — Use for logos or images that need a transparent background
- **Do not upload** very large raw files (above 5 MB) — compress them first

### How to upload an image in Sanity

1. Click on the image field (shows a placeholder box or existing image)
2. Click **"Upload"** or drag and drop an image file
3. The image uploads to Sanity's CDN
4. Optionally adjust the **hotspot** (click the face/focal area icon) so the most important part of the image is not cropped when displayed at different sizes
5. Add **Alt text** in the Alt field — this describes the image for screen readers and search engines

### Alt text guidance

Alt text should briefly describe what is in the image:
- Good: `"Alex reviewing property data with clients in Sydney"`
- Too vague: `"image"` or `"photo"`
- Not needed: leave blank for purely decorative images

---

## 35. Troubleshooting & FAQ

### "I published a change but the website hasn't updated"

- Wait 30 seconds and do a **hard refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- The website reads content from Sanity in real time — changes appear as soon as the page is loaded fresh
- If it still hasn't updated after 2 minutes, check that you clicked **"Publish"** (not just saved the draft)

### "My image is showing as a broken/missing image on the site"

- Check that you actually uploaded an image and clicked Publish (not just a draft)
- Try uploading the image again — sometimes uploads time out on slow connections
- Make sure the image is not more than 10 MB

### "I accidentally deleted content"

- Sanity keeps a full version history of every document
- Open the affected document → click the **clock icon** (History) in the top right
- Browse to a previous version and click **"Restore"**

### "The contact form is not working / I'm not receiving inquiries"

This is a server-side issue (PHP + Brevo). Check:
1. The `config.php` file exists on the server and has valid credentials
2. Your Brevo API key is still valid (log in to Brevo to check)
3. The Sanity write token in `config.php` is still valid (check at sanity.io/manage → Tokens)

### "I want to add a new service page"

New service pages require a developer. The routing, page component, and navigation links are all in the code. A developer would need to:
1. Create a new service page component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Add a corresponding navigation link
4. Create the CMS schema if a new document type is needed

### "I want to change the colour scheme or fonts"

This requires a developer. Colours and fonts are defined in:
- `src/styles/theme.css` — design tokens (gold colour, navy colour, etc.)
- `index.html` — Google Fonts loading

### "How do I see what inquiries came in today?"

1. Sidebar → 📩 Inquiries
2. The list is sorted by most recent first
3. Look for records with today's date in the **Submitted At** column
4. Click any record to see the full message

### "I need to add a new team member / author for the blog"

1. Sidebar → 👤 Authors → Create new
2. Fill in Name, upload a headshot, add Bio
3. Publish
4. They can now be selected when creating blog posts

### "The Calendly booking widget is not opening when visitors click the button"

1. Check that the Calendly URL in the **Header** is correct and active
2. Log into your Calendly account and verify the event type URL is still valid
3. Update the Header in Sanity if the URL has changed
4. Publish the Header

---

## Quick Reference — Most Common Tasks

| Task | Where in Studio |
|---|---|
| Check new inquiries | 📩 Inquiries |
| Add a blog post | ✍️ Blog Posts → Create new |
| Add a case study | 💼 Case Studies → Create new |
| Add a review | ⭐ Reviews → Create new |
| Add an acquisition | 📈 Property Acquisitions → Create new |
| Update phone number | 🔗 Header AND 🦶 Footer |
| Update booking link | 🔗 Header → Calendly URL |
| Update address | 🦶 Footer → Address |
| Update page SEO | Open the page → SEO Module section |
| Update service content | 🔧 Service Pages → select a service |
| Update about info | ℹ️ About Page |
| Update home page | 🏠 Home Page |

---

*End of Handover Document*

*For technical questions, contact your developer. For Sanity support, visit https://www.sanity.io/docs*
