// llms.txt (added 28 Nov 2026): a plain-text map of the site for AI assistants, built from the same data as the pages.
import { shows, videos, reports, showOf, TOPICS, RETIRED, RESTING, yt } from '../data/site.js';
export function GET() {
  const rich = Object.fromEntries(reports.map(r => [r.slug, r]));
  const line = v => { const r = v.show === 'oob' ? rich[v.slug] : null, f = yt(v), q = r?.h1 || v.title, a = (r?.answer || v.answer).replace(/\s+/g, ' ');
    return `- [${q}](https://vidatu.com/${v.show}/${v.slug}/): ${a}${RETIRED.has(v.show + '-' + v.n) ? ' (Not on YouTube.)' : f ? ` Film: https://www.youtube.com/shorts/${f.id} (public from ${f.day} 2026).` : ''}`; };
  const out = ['# Vidatu', '', '> Hidden rules, made visible. 30-second animated explainers, made entirely in code, with a named source for every fact. Inspector Oob, an alien, files field reports on human habits; other characters explain maths, numbers and everyday science. Created and produced by SellnShip Solutions Pvt. Ltd., Chandigarh, India. Voices are AI-generated.', '',
    'Each page below answers one question in its first paragraph, says what was checked and when, and links its sources. YouTube channel: https://www.youtube.com/@vidatutv', ''];
  for (const s of shows) { const eps = videos.filter(v => v.show === s.id); if (!eps.length) continue;
    out.push(`## ${s.short === 'Lab' ? 'The Lab' : s.name}${RESTING.has(s.id) ? ' (resting: no new films for now)' : ''}`, '', `${s.idea}`, '', ...eps.map(line), ''); }
  out.push('## Other pages', '', '- [Every source, by show](https://vidatu.com/sources/)', '- [About Vidatu](https://vidatu.com/about/)', ...Object.entries(TOPICS).map(([k, v]) => `- [${v[0]}](https://vidatu.com/topics/${k}/): ${v[1]}`), '');
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
