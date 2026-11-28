import { shows, videos, TOPICS } from '../data/site.js';
export function GET() {
  const urls = ['/', ...shows.map(s => `/${s.id}/`), ...videos.map(v => `/${v.show}/${v.slug}/`), ...Object.keys(TOPICS).map(t => `/topics/${t}/`), '/sources/', '/about/', '/brands/'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(p => `  <url><loc>https://vidatu.com${p}</loc><lastmod>2026-11-28</lastmod></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
