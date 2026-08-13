// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// TODO(user): replace with the real production domain before deploying.
// Required for correct canonical URLs, sitemap.xml and OG tags.
const SITE_URL = 'https://paulquentinondoa.dev';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [icon(), sitemap()],
  build: {
    // Keep all CSS in external files (none inlined into <style> blocks) so the
    // production Content-Security-Policy can use a plain `style-src 'self'`
    // without per-page hashes or 'unsafe-inline'.
    inlineStylesheets: 'never',
  },
});
