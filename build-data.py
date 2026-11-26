#!/usr/bin/env python3
"""Builds src/data/content.json from the project documents (publishing kit, scripts, cast bible).
Usage: python3 build-data.py <folder with publishing-kit.md, scripts.md, cast-bible.md>"""
import re, json, sys
D = sys.argv[1] if len(sys.argv) > 1 else '../vid'
kit, scr, bible, prod = (open(f'{D}/{f}').read() for f in ('publishing-kit.md', 'scripts.md', 'cast-bible.md', 'character-production.md'))
cap = lambda x: x[:1].upper() + x[1:]
checked = {}
for m in re.finditer(r'^\| (.+?) (\d) \| (.+?) \| (Confirmed[^|]*) \| (.+?) \|$', prod, re.M): checked[(m.group(1).lower().replace('&', 'and'), int(m.group(2)))] = {'claim': m.group(3).strip(), 'verdict': m.group(4).strip()}
slug = lambda s: re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', s.lower())).strip('-')
SHOWS = [  # id, kit name, bible heading, format, colour, text colour, still, loop
 ('oob', 'Oob', 'Inspector Oob', 'Reports', '#1A1340', '#FBF7EA', 'oob.jpg', None),
 ('percy', 'Percy', 'Percy', 'Lives', '#2447F2', '#FFFFFF', 'percy.jpg', 'percy.mp4'),
 ('old-h', 'Old H', 'Old H', 'Tales', '#141740', '#FBF7EA', 'oldh.jpg', 'oldh.mp4'),
 ('gulp', 'Gulp', 'Gulp', 'Snacks', '#CDBBFF', '#17122B', 'gulp.jpg', 'gulp.mp4'),
 ('yup-and-nope', 'Yup & Nope', 'Yup & Nope', 'Rounds', '#FFD9CC', '#17122B', 'duo.jpg', 'duo.mp4'),
 ('tess', 'Tess', 'Tess', 'Tricks', '#0E7C86', '#FFFFFF', 'tess.jpg', 'tess.mp4'),
 ('murmur', 'Murmur', 'Murmur', 'Chapters', '#2A1B6B', '#FFFFFF', 'murmur.jpg', 'murmur.mp4'),
 ('lab', 'Lab', None, 'Experiments', '#070B20', '#E8ECFF', 'lab.jpg', None)]
FILE = {'oob': 'oob', 'percy': 'percy', 'old-h': 'oldh', 'gulp': 'gulp', 'yup-and-nope': 'duo', 'tess': 'tess', 'murmur': 'murmur', 'lab': 'lab'}
TOPIC = {'oob': ['humans', 'animals', 'humans'], 'percy': ['humans', 'humans', 'physics'], 'old-h': ['space'] * 3, 'gulp': ['space', 'space', 'physics'],
         'yup-and-nope': ['animals', 'humans', 'space'], 'tess': ['maths'] * 3, 'murmur': ['humans'] * 3, 'lab': ['physics', 'maths', 'physics']}
LINKS = {  # every address below was confirmed by a web search on 26 Nov 2026; sources without a confirmed address get no link
 'BIPM': 'https://www.bipm.org/en/-/resolution-cgpm-13-1', 'Universe: Overview': 'https://science.nasa.gov/universe/overview/', 'Our Sun: Facts': 'https://science.nasa.gov/sun/facts',
 'Imagine the Universe': 'https://imagine.gsfc.nasa.gov/science/objects/black_holes1.html', 'What Are Black Holes': 'https://www.nasa.gov/universe/what-are-black-holes', 'IGB Berlin': 'https://igb-berlin.de/en/node/11064',
 'Mars at a glance': 'https://www.jpl.nasa.gov/news/press_kits/insight/landing/download/mars_insight_landing_presskit.pdf', 'Zhang et al.': 'https://www.psu.edu/news/research/story/predictability-limit-scientists-find-bounds-weather-forecasting',
 'Smithsonian': 'https://www.smithsonianmag.com/science-nature/the-science-behind-honeys-eternal-shelf-life-1218690/', 'Miranda': 'https://doi.org/10.1128/AEM.01838-16',
 'World Population Prospects': 'https://www.un.org/development/desa/pd/world-population-prospects-2024', 'Population Reference Bureau': 'https://www.prb.org/articles/how-many-people-have-ever-lived-on-earth/',
 'Mann, Faria': 'https://doi.org/10.1098/rsif.2013.0466', 'Saito': 'https://doi.org/10.1038/s41598-019-40616-4'}
OOB_SLUG = {1: 'clapping', 2: 'your-cat', 3: 'the-queue'}
norm = lambda s: s.lower().replace('&', 'and').replace('inspector ', '').strip()
scripts = {}
for m in re.finditer(r'\*\*(.+?) (\d) - (.+?)\*\* \(.*?\)\n(.+)', scr): scripts[(norm(m.group(1)), int(m.group(2)))] = [x.strip() for x in m.group(4).split(' / ')]
shows, videos = [], []
for sid, kname, bhead, fmt, bg, fg, img, vid in SHOWS:
    sh = {'id': sid, 'name': bhead or 'The Lab', 'short': kname, 'format': fmt, 'bg': bg, 'fg': fg, 'img': img, 'vid': vid}
    if bhead:
        sec = re.search(r'## \d\. ' + re.escape(bhead) + r'(.*?)\n(.*?)(?=\n## )', bible, re.S); body = sec.group(2)
        g = lambda k: (re.search(r'\*\*' + k + r':\*\* (.+)', body) or [None, ''])[1]
        sh['tag'] = cap(sec.group(1).strip(' ,').split('(')[0].strip()); sh['idea'] = cap(g('Idea')); al = g('Always')
        sh['always'], sh['never'] = [x.strip(' .*') for x in re.split(r'\*\*Never:\*\*', al)] if 'Never' in al else (al, '')
        nx = re.search(r'\*\*Next[^*]*:\*\* (.+)', body); sh['next'] = [x.strip() for x in nx.group(1).split(' · ')] if nx else []
    else:
        sh.update(tag='No words, just the rule', idea='Captions, code-made sound and one physical rule made visible. No voice-over. Each experiment is a simulation you can run yourself.', always='label a simulation as a simulation', never='fake a result', next=['Sorting algorithms you can hear', 'Circles that draw a picture', 'The bouncing blocks that count the digits of pi'])
    shows.append(sh)
    for m in re.finditer(r'\*\*' + re.escape(kname) + r' 0*(\d+) · Title:\*\* ([^\n]+)\n```\n(.*?)\n```\nPinned comment: ([^\n]+)', kit, re.S):
        n, title, block, pin = int(m.group(1)), m.group(2).strip(), m.group(3), m.group(4).strip()
        paras = [p.strip() for p in block.split('\n\n')]; answer = paras[0]; notes = []
        for ln in '\n'.join(paras[1:]).split('\n'):
            ln = ln.strip()
            if not ln or ln.startswith('#') or ln.startswith('No voice-over'): continue
            link = next((u for k, u in LINKS.items() if k.lower() in ln.lower()), None); notes.append({'text': re.sub(r'^Sources?( for the forecast limit)?: ', '', ln), 'link': link})
        title = title.split(' | ')[0]
        v = {'show': sid, 'n': n, 'slug': OOB_SLUG[n] if sid == 'oob' else slug(title), 'title': title, 'answer': answer, 'notes': notes, 'pin': pin,
             'transcript': scripts.get((norm(kname), n), []), 'checked': checked.get((norm(kname), n)), 'img': f'v/{FILE[sid]}-{n}.jpg', 'topic': TOPIC[sid][n - 1]}
        videos.append(v)
json.dump({'shows': shows, 'videos': videos}, open('src/data/content.json', 'w'), indent=1, ensure_ascii=False)
print(len(shows), 'shows,', len(videos), 'videos;', sum(1 for v in videos if not v['transcript']), 'without transcript; longest slug', max(len(v['slug']) for v in videos))
