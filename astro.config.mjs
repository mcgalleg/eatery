import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://rositas.biz',
  prefetch: {
    prefetchAll: true
  },
  integrations: [tailwind({
    applyBaseStyles: false,
  }), svelte(), sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date()
  }), react()],
  output: 'server',
  adapter: vercel()
});