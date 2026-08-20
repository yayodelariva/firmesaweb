// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Destino del despliegue. Al conectar el dominio definitivo basta con
// publicar con SITE_URL=https://firmesa.mx y BASE_PATH=/
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
