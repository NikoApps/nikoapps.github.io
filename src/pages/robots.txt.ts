// Everything on the site is public, including to AI crawlers.
import type { APIContext } from 'astro';

export function GET(context: APIContext) {
  const sitemap = new URL('sitemap-index.xml', context.site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`);
}
