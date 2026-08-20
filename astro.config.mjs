// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Deployment target. To move to the final domain, build with
// SITE_URL=https://firmesa.mx and BASE_PATH=/
const SITE = process.env.SITE_URL ?? 'https://yayodelariva.github.io';
const BASE = process.env.BASE_PATH ?? '/firmesaweb/';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
