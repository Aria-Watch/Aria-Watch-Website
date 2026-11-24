// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkGithubAlerts from './src/lib/remark-github-alerts.mjs';
import remarkStripTitle from './src/lib/remark-strip-title.mjs';
import remarkMdLinks from './src/lib/remark-md-links.mjs';

export default defineConfig({
  site: 'https://aria.watch',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  image: {
    // Every image (including those referenced from Markdown) gets a srcset
    // and modern formats; nothing larger than needed is ever shipped.
    layout: 'constrained',
    responsiveStyles: true,
  },
  markdown: {
    remarkPlugins: [remarkStripTitle, remarkGithubAlerts, remarkMdLinks],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
