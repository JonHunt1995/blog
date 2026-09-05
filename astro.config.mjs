// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  // Set this to your production URL (no trailing slash)
  site: 'https://jonhunt.dev',
  // Set this to your site's subpath if it is NOT hosted at the domain root
  // (e.g. GitHub Pages project sites). Delete this line if your site lives at "/".
  base: '',
  integrations: [
    sitemap(),
    mdx(),
    react(),
    keystatic(),
  ],
});
