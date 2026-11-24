// Single place for site-wide settings and links.
export const SITE = {
  name: 'Aria Watch',
  tagline: 'Breathe the truth',
  description:
    'Open-source air-quality monitors and a community data network. Know what you breathe. Act for the planet.',
  url: 'https://aria.watch',
  repo: 'https://github.com/Aria-Watch/Aria-Watch-Website',
  // Base for "Edit this page on GitHub" links (+ the entry's file path).
  editBase: 'https://github.com/Aria-Watch/Aria-Watch-Website/edit/main',
  // Google Analytics 4 measurement ID. A PUBLIC_GA_MEASUREMENT_ID environment
  // variable at build time overrides it; set this to '' to remove analytics
  // and the cookie banner entirely.
  // GA is only ever loaded after the visitor explicitly accepts the banner.
  gaMeasurementId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID || 'G-F9B1YHDM13',
};

// Bump when the cookie/analytics setup changes, so everyone is asked again.
export const CONSENT = {
  version: 1,
  // Garante privacy (IT) guidance: don't ask again for 6 months after a choice.
  maxAgeDays: 182,
  // GA cookie lifetime (CNIL/EDPB practice: at most 13 months).
  gaCookieSeconds: 60 * 60 * 24 * 395,
};

export const LINKS = {
  app: 'https://app.aria.watch',
  github: 'https://github.com/Aria-Watch/',
  contribute: 'https://github.com/Aria-Watch/Aria-Watch-Borino-PCB',
  instagram: 'https://www.instagram.com/aria.watch_official/',
  email: 'mailto:info@aria.watch',
};

export const NAV = [
  { label: 'About', href: '/about/' },
  { label: 'Docs', href: '/docs/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'API', href: '/api/' },
  { label: 'App', href: LINKS.app, external: true },
];
