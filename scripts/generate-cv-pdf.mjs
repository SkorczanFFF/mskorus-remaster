/**
 * Generate static CV PDFs with real selectable text using Puppeteer.
 *
 * Usage:
 *   1. Start dev server:  npm run dev
 *   2. Run this script:   node scripts/generate-cv-pdf.mjs
 *
 * Outputs:
 *   public/cv-en.pdf
 *   public/cv-pl.pdf
 */

import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Resume container is 794x1123px — convert to mm for PDF page size
const pxToMm = (px) => (px * 25.4) / 96;
const WIDTH_MM = pxToMm(794);
const HEIGHT_MM = pxToMm(1123);

async function generatePdf(locale) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 900 });

  const url = `${BASE_URL}/resume`;
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Set locale and reload
  await page.evaluate((loc) => {
    localStorage.setItem('locale', loc);
    document.cookie = `locale=${loc};path=/;max-age=31536000`;
  }, locale);
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Wait for fonts
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 500));

  // Strip DOM down to just the resume container, preserving font CSS variables
  await page.evaluate(() => {
    // Capture font CSS variables before stripping — they live on a wrapper div from _app.tsx
    const root = document.documentElement;
    const fontVars = ['--font-grotesk', '--font-unica'];
    const captured = {};
    for (const v of fontVars) {
      // Walk up from the resume element to find the variable
      let el = document.querySelector('div[class*="overflow-hidden"][class*="w-[794px]"]');
      while (el) {
        const val = getComputedStyle(el).getPropertyValue(v).trim();
        if (val) { captured[v] = val; break; }
        el = el.parentElement;
      }
    }

    // The resume ref div is the one with exact 794x1123 dimensions
    const resumeEl = document.querySelector(
      'div[class*="overflow-hidden"][class*="w-[794px]"]'
    );
    if (!resumeEl) {
      const allDivs = document.querySelectorAll('div');
      for (const div of allDivs) {
        if (div.offsetWidth === 794 && div.offsetHeight === 1123) {
          document.body.innerHTML = '';
          document.body.appendChild(div);
          break;
        }
      }
      if (!document.body.children.length) throw new Error('Could not find resume container');
    } else {
      document.body.innerHTML = '';
      document.body.appendChild(resumeEl);
    }

    // Re-apply font CSS variables on <html> so var() references resolve
    for (const [k, v] of Object.entries(captured)) {
      root.style.setProperty(k, v);
    }
  });

  // Apply clean styles for PDF
  await page.addStyleTag({
    content: `
      @page {
        size: ${WIDTH_MM}mm ${HEIGHT_MM}mm;
        margin: 0;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 794px !important;
        height: 1123px !important;
        overflow: hidden !important;
        background: none !important;
      }
    `,
  });

  const outPath = resolve(__dirname, '..', 'public', `Maciej Skorus - CV [${locale.toUpperCase()}].pdf`);

  await page.pdf({
    path: outPath,
    width: `${WIDTH_MM}mm`,
    height: `${HEIGHT_MM}mm`,
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log(`  cv-${locale}.pdf -> ${outPath}`);
}

console.log('Generating CV PDFs...');
console.log(`Using: ${BASE_URL}/resume\n`);

await generatePdf('en');
await generatePdf('pl');

console.log('\nDone!');
