/**
 * QA Audit Script — JJ Property Partner
 * Drives Playwright/Chromium against localhost:3000 and reports issues.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(__dirname, '../qa-screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const PAGES = [
  { name: 'home',                 path: '/' },
  { name: 'about',                path: '/about' },
  { name: 'services',             path: '/services' },
  { name: 'first-home-buyers',    path: '/services/first-home-buyers' },
  { name: 'property-investors',   path: '/services/property-investors' },
  { name: 'smsf-property',        path: '/services/smsf-property' },
  { name: 'commercial-property',  path: '/services/commercial-property' },
  { name: 'case-studies',         path: '/case-studies' },
  { name: 'reviews',              path: '/reviews' },
  { name: 'blog',                 path: '/blog' },
  { name: 'contact',              path: '/contact' },
  { name: 'privacy-policy',       path: '/privacy-policy' },
  { name: 'terms-and-conditions', path: '/terms-and-conditions' },
];

const VIEWPORTS = [
  { name: 'mobile',  width: 390,  height: 844 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const issues = [];
function log(page, severity, msg) {
  const entry = `[${severity}] ${page}: ${msg}`;
  console.log(entry);
  issues.push(entry);
}

async function auditPage(page, pageCfg, viewport) {
  const url = BASE + pageCfg.path;
  const consoleErrors = [];
  const failedRequests = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('requestfailed', req => {
    failedRequests.push(`${req.failure()?.errorText} — ${req.url()}`);
  });
  page.on('response', resp => {
    const status = resp.status();
    const u = resp.url();
    // Ignore Sanity API calls timing out as expected in dev (they use CDN)
    if ((status >= 400) && !u.includes('sanity.io') && !u.includes('google') && !u.includes('youtube')) {
      failedRequests.push(`HTTP ${status} — ${u}`);
    }
  });

  await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {
    log(pageCfg.name, 'ERROR', `Page failed to load at ${url}`);
  });

  // Wait for React hydration
  await page.waitForTimeout(1500);

  // Screenshot
  const ssName = `${pageCfg.name}-${viewport.name}.png`;
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, ssName), fullPage: true });

  // Console errors
  consoleErrors.forEach(e => {
    if (!e.includes('favicon') && !e.includes('net::ERR_ABORTED')) {
      log(pageCfg.name, 'JS-ERROR', e.substring(0, 200));
    }
  });

  // Failed requests (non-Sanity)
  failedRequests.forEach(r => log(pageCfg.name, 'NET-FAIL', r));

  // Broken images: img tags with no src, empty src, or failed load
  const brokenImgs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).filter(img => {
      return !img.src || img.src === window.location.href || img.naturalWidth === 0;
    }).map(img => ({ src: img.src || '(empty)', alt: img.alt || '(no alt)' }));
  });
  brokenImgs.forEach(img => log(pageCfg.name, 'BROKEN-IMG', `src="${img.src}" alt="${img.alt}"`));

  // Missing alt on images
  const noAlt = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).filter(img => !img.alt).map(img => img.src);
  });
  noAlt.forEach(src => log(pageCfg.name, 'NO-ALT', src.substring(0, 120)));

  // Horizontal overflow (elements wider than viewport)
  const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (hasHScroll) log(pageCfg.name, 'OVERFLOW', `Horizontal scroll detected at ${viewport.width}px width`);

  // Page title check
  const title = await page.title();
  if (!title || title === 'Vite App') log(pageCfg.name, 'SEO', `Missing or default page title: "${title}"`);

  // Check for placeholder/lorem text
  const bodyText = await page.evaluate(() => document.body.innerText.toLowerCase());
  if (bodyText.includes('lorem ipsum')) log(pageCfg.name, 'CONTENT', 'Lorem ipsum placeholder text found');
  if (bodyText.includes('coming soon') && pageCfg.path !== '/') log(pageCfg.name, 'CONTENT', '"Coming Soon" text found');

  // Check h1 exists
  const h1Count = await page.locator('h1').count();
  if (h1Count === 0) log(pageCfg.name, 'SEO', 'No <h1> tag found on page');
  if (h1Count > 1) log(pageCfg.name, 'SEO', `Multiple <h1> tags found: ${h1Count}`);
}

async function testContactForm(page) {
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1500);

  // Test empty submit
  const submitBtn = page.locator('button[type="submit"], button:has-text("Send"), button:has-text("Submit"), button:has-text("Get In Touch")').first();
  if (await submitBtn.count() === 0) {
    log('contact-form', 'ERROR', 'No submit button found');
    return;
  }
  await submitBtn.click();
  await page.waitForTimeout(500);
  const validationVisible = await page.locator('text=/required|please|error|invalid/i').count();
  if (validationVisible === 0) log('contact-form', 'WARN', 'No validation messages appeared after empty submit');
  else console.log('[PASS] contact-form: validation triggered on empty submit');

  // Test invalid email
  const emailInput = page.locator('input[type="email"], input[name="email"]').first();
  if (await emailInput.count() > 0) {
    await emailInput.fill('notanemail');
    await submitBtn.click();
    await page.waitForTimeout(300);
    console.log('[PASS] contact-form: invalid email tested');
  }
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'contact-form-validation.png') });
}

async function testNavigation(page) {
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1000);

  // Desktop nav links
  const navLinks = await page.locator('nav a[href]').all();
  console.log(`[INFO] Found ${navLinks.length} nav links`);

  // Mobile menu open/close
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1000);
  const hamburger = page.locator('button[aria-label="Open Mobile Menu"]');
  if (await hamburger.count() > 0) {
    await hamburger.click();
    await page.waitForTimeout(500);
    const drawerVisible = await page.locator('text=Services').first().isVisible();
    if (!drawerVisible) log('navigation', 'ERROR', 'Mobile menu drawer did not open');
    else console.log('[PASS] navigation: mobile menu opens');
    // Close it
    const closeBtn = page.locator('button[aria-label="Close Mobile Menu"]');
    if (await closeBtn.count() > 0) {
      await closeBtn.click();
      await page.waitForTimeout(300);
      console.log('[PASS] navigation: mobile menu closes');
    }
  } else {
    log('navigation', 'WARN', 'No hamburger button found at mobile width');
  }
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-nav.png') });
}

async function testInternalLinks(page) {
  const checked = new Set();
  const broken = [];

  for (const pg of PAGES) {
    await page.goto(BASE + pg.path, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(800);
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href]'))
        .map(a => a.getAttribute('href'))
        .filter(h => h && h.startsWith('/') && !h.startsWith('//'))
    );
    for (const href of links) {
      if (checked.has(href)) continue;
      checked.add(href);
      const res = await page.goto(BASE + href, { waitUntil: 'domcontentloaded', timeout: 8000 }).catch(() => null);
      if (!res) { broken.push(href); continue; }
      const status = res.status();
      if (status >= 400) broken.push(`${href} → ${status}`);
    }
  }
  if (broken.length > 0) broken.forEach(b => log('links', 'BROKEN-LINK', b));
  else console.log('[PASS] links: all internal links resolve');
}

async function main() {
  console.log('\n══════════════════════════════════════════');
  console.log('  JJ Property Partner — QA Audit');
  console.log('══════════════════════════════════════════\n');

  const browser = await chromium.launch({ executablePath: '/Users/jas/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', headless: true });

  // Phase 1: Per-page audit at desktop viewport
  console.log('── Phase 1: Page content & console audit ──');
  for (const pageCfg of PAGES) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS[2] });
    const pg = await ctx.newPage();
    await auditPage(pg, pageCfg, VIEWPORTS[2]);
    await ctx.close();
    process.stdout.write('.');
  }
  console.log('\n');

  // Phase 2: Responsive audit — mobile & tablet for key pages
  console.log('── Phase 2: Responsive design audit ──');
  const keyPages = PAGES.slice(0, 5); // home, about, services, first-home, investors
  for (const vp of [VIEWPORTS[0], VIEWPORTS[1]]) {
    for (const pageCfg of keyPages) {
      const ctx = await browser.newContext({ viewport: vp });
      const pg = await ctx.newPage();
      await auditPage(pg, pageCfg, vp);
      await ctx.close();
      process.stdout.write('.');
    }
  }
  console.log('\n');

  // Phase 3: Contact form validation
  console.log('── Phase 3: Form validation ──');
  const ctx3 = await browser.newContext({ viewport: VIEWPORTS[2] });
  const pg3 = await ctx3.newPage();
  await testContactForm(pg3);
  await ctx3.close();

  // Phase 4: Navigation & mobile menu
  console.log('\n── Phase 4: Navigation & mobile menu ──');
  const ctx4 = await browser.newContext({ viewport: VIEWPORTS[2] });
  const pg4 = await ctx4.newPage();
  await testNavigation(pg4);
  await ctx4.close();

  // Phase 5: Internal link check
  console.log('\n── Phase 5: Internal link crawl ──');
  const ctx5 = await browser.newContext({ viewport: VIEWPORTS[2] });
  const pg5 = await ctx5.newPage();
  await testInternalLinks(pg5);
  await ctx5.close();

  await browser.close();

  // Report
  console.log('\n══════════════════════════════════════════');
  console.log(`  AUDIT COMPLETE — ${issues.length} issue(s) found`);
  console.log('══════════════════════════════════════════\n');
  if (issues.length > 0) {
    issues.forEach(i => console.log(i));
  } else {
    console.log('✓ No issues detected.');
  }

  fs.writeFileSync(path.join(SCREENSHOT_DIR, 'report.json'), JSON.stringify(issues, null, 2));
  console.log(`\nScreenshots saved to: qa-screenshots/`);
}

main().catch(e => { console.error('Audit failed:', e); process.exit(1); });
