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
});
