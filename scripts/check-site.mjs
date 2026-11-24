/**
 * Post-build quality gate for the static site in ./dist (run: `npm test`).
 *
 *  - every internal link and asset resolves to a built file (no broken links)
 *  - every <img> has an alt attribute
 *  - every page has exactly one <h1>
 *  - no page loads images from the old external storage
 *  - GDPR: no third-party resource (fonts, scripts, images, frames) is
 *    requested on page load — only after consent, via the consent script
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else files.push(full);
  }
})(DIST);

const exists = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  const target = path.join(DIST, clean);
  return [target, path.join(target, 'index.html'), `${target}.html`].some(
    (p) => fs.existsSync(p) && fs.statSync(p).isFile(),
  );
};

const errors = [];
const htmlFiles = files.filter((f) => f.endsWith('.html'));

for (const file of htmlFiles) {
  const page = '/' + path.relative(DIST, file).split(path.sep).join('/');
  const html = fs.readFileSync(file, 'utf8');

  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) errors.push(`${page}: expected 1 <h1>, found ${h1s}`);

  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    // `alt` may be rendered bare (alt="" for decorative images) or with a value.
    if (!/\salt(=|[\s/>])/.test(img)) errors.push(`${page}: <img> without alt → ${img.slice(0, 90)}`);
  }

  if (html.includes('r3-it.storage.cloud.it')) errors.push(`${page}: still references the old image storage`);

  // GDPR: nothing may be fetched from a third party on page load (fonts,
  // scripts, images, frames...). Analytics is injected by the consent script
  // only after the visitor accepts, so it never appears as a tag here.
  const resourceTags = html.match(/<(?:script|link|img|iframe|source|video|audio|embed|object)\b[^>]*>/g) ?? [];
  for (const tag of resourceTags) {
    if (/^<link\b/.test(tag) && /rel="(?:canonical|alternate|sitemap)"/.test(tag)) continue;
    const external = tag.match(/\s(?:src|href|srcset|poster|data)="(?:https?:)?\/\/(?!aria\.watch\/)[^"]+"/);
    if (external) errors.push(`${page}: loads a third-party resource without consent → ${tag.slice(0, 110)}`);
  }

  const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  const srcsets = [...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) =>
    m[1].split(',').map((s) => s.trim().split(/\s+/)[0]),
  );
  for (const ref of [...refs, ...srcsets]) {
    if (!ref.startsWith('/') || ref.startsWith('//')) continue;
    if (!exists(ref)) errors.push(`${page}: broken link → ${ref}`);
  }
}

// Fonts and other CSS-referenced files must be self-hosted.
for (const file of files.filter((f) => f.endsWith('.css'))) {
  const css = fs.readFileSync(file, 'utf8');
  if (/url\(\s*["']?(?:https?:)?\/\//.test(css) || /@import\s+url\(\s*["']?https?:/.test(css)) {
    errors.push(`${path.basename(file)}: CSS loads a file from a third-party host`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) found:\n  ` + [...new Set(errors)].join('\n  '));
  process.exit(1);
}
console.log(`✓ ${htmlFiles.length} pages checked: links, images, headings all good.`);
