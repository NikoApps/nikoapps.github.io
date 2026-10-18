// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://nikoapps.github.io',
  output: 'static',
  trailingSlash: 'always',
  // Keep quotes and apostrophes exactly as written.
  integrations: [mdx({ smartypants: false }), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
