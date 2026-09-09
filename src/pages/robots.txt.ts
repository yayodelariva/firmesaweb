import type { APIRoute } from 'astro';
import { url } from '../lib/links';

/** robots.txt generated so it always points at the deployment's own sitemap. */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(url('/sitemap-index.xml'), site).href;

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
