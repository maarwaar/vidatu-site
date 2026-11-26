export const u = p => import.meta.env.BASE_URL.replace(/\/$/, '') + p;
// Cloudflare Web Analytics token (public by design). Empty = no analytics script.
export const beacon = '2e719a0bfca94259b52f0fb168bd8312';
import content from './content.json';
const AC = { oob: '#7CFFCB', percy: '#FFD23F', 'old-h': '#FFB52E', gulp: '#17122B', 'yup-and-nope': '#17122B', tess: '#FFD166', murmur: '#FFC145', lab: '#FFB52E' };
export const shows = content.shows.map(x => ({ ...x, ac: AC[x.id], one: x.format === 'Lives' ? 'Life' : x.format.replace(/s$/, ''), title: x.short === 'Lab' ? 'The Lab' : x.name }));
export const host = l => new URL(l).hostname.replace(/^www\./, '');
export const videos = content.videos;
export const showOf = id => shows.find(x => x.id === id);
export const TOPICS = { space: ['Space', 'Stars, black holes, the Moon and the first light in the universe.'], animals: ['Animals', 'Cats that ignore you and hippos you cannot outrun.'], maths: ['Maths', 'Bell curves, higher dimensions and shapes that should not be possible.'], physics: ['Physics', 'Time, light, chaos and why pendulums fall back into step.'], humans: ['Human life', 'Clapping, queues, loading bars and the eight billion of us.'] };
export const CHECKED = '26 Nov 2026';
export const reports = [
  { slug: 'clapping', no: '001', subject: 'Clapping', verdict: 'Absurd', vc: 'absurd', img: 'oob-1.jpg',
    h1: 'Why does a whole audience stop clapping at once?',
    desc: 'Applause spreads through a crowd like a contagion, and so does stopping. Inspector Oob files Report 001 on human clapping.',
    finding: 'Humans strike their own hands in groups. Nobody decides when it ends. They all simply stop.',
    answer: 'Applause spreads through a crowd like a contagion: people start clapping because the people around them are clapping. Stopping works the same way, which is why a whole audience falls silent together with no signal.',
    body: ['When humans approve of something, they hit their own hands together, in a group, and keep going. Nobody is in charge of it. Nobody announces the end.',
      'Researchers who filmed audiences found that the pull to start clapping grows with the share of the room already clapping, and the pull to stop grows with the share that has already stopped. In their data, how long the applause lasted had little to do with how good the talk was. It depended on the crowd.',
      'So an audience does not decide to stop. One or two people stop, the people who notice them stop, and the silence spreads the same way the noise did.'],
    transcript: ['Field report one. Subject: humans.', 'When humans approve of something…', 'they strike their own hands. Repeatedly.', 'In groups. For up to a minute.', 'Nobody decides when it ends.', 'They simply… all stop. Together.', 'No leader. No signal.', 'Verdict:', 'Absurd. Do not stop.', 'Next report: your house predator.'],
    sources: [['Mann, Faria, Sumpter & Krause (2013), "The dynamics of audience applause", Journal of the Royal Society Interface 10: 20130466.', 'https://doi.org/10.1098/rsif.2013.0466']],
    faq: [['Does longer applause mean a better performance?', 'Not reliably. In the 2013 study, the length of applause was driven by how clapping spread through that particular crowd, not by the quality of what they had watched.'],
      ['Who decides when applause ends?', 'Nobody. A few people stop, the people near them notice and stop too, and the quiet spreads until the room is silent.']] },
  { slug: 'your-cat', no: '002', subject: 'Your cat', verdict: 'Approved', vc: 'approved', img: 'oob-2.jpg',
    h1: 'Do cats know their names?',
    desc: 'Yes. A 2019 study of 78 cats found they tell their own names from similar words. Inspector Oob files Report 002 on the house predator.',
    finding: 'A small predator kept indoors. It knows its name and chooses not to answer. In return, it vibrates.',
    answer: 'Yes. In a 2019 study of 78 cats in Japan, cats reacted more to their own names than to similar-sounding words or to other cats’ names, even when a stranger was speaking. Coming when called is a separate matter.',
    body: ['Humans keep a small predator in the house. It hunts, it has claws, and it ignores them. They clean up after it every day. In return, it purrs. Humans consider this a fair deal.',
      'The part about ignoring is supported by research. Scientists in Tokyo played cats a list of four ordinary words that sounded like their names, then the name itself. The cats lost interest during the list, then perked up at their own name: ears, head or tail moved.',
      'The study measured recognition, not obedience. A cat that knows its name and stays on the sofa is behaving exactly as the data describes.'],
    transcript: ['Field report two. Subject: humans.', 'They keep a small predator indoors.', 'It hunts. It has claws. It ignores them.', 'It knows its name. It chooses not to answer.', 'They clean up after it. Daily.', 'In return, it vibrates.', 'Humans consider this a fair deal.', 'Verdict:', 'Approved. I want one.', 'Next report: queues.'],
    sources: [['Saito, Shinozuka, Ito & Hasegawa (2019), "Domestic cats (Felis catus) discriminate their names from other words", Scientific Reports 9: 5394.', 'https://doi.org/10.1038/s41598-019-40616-4'],
      ['Scientific American, "Cats Recognize Their Own Names, Even If They Choose to Ignore Them".', '']],
    faq: [['Why does my cat ignore me when I call its name?', 'Recognising a name and acting on it are different things. The study found cats notice their names; it did not find that they come when called.'],
      ['Does a cat understand that the name means itself?', 'That is not known. The researchers suggest cats may simply link the sound of the name with food, petting or play.']] },
  { slug: 'the-queue', no: '003', subject: 'The queue', verdict: 'Under review', vc: 'review', img: 'oob-3.jpg',
    h1: 'Why do people queue when nobody makes them?',
    desc: 'No fence, no guard, no law: people line up anyway. Inspector Oob files Report 003 on the queue.',
    finding: 'No fence, no guard, no law. Skip ahead and the others say nothing. They only stare.',
    answer: 'Because everyone in the line accepts the same rule: first to arrive is first to be served. Usually nothing enforces it except the disapproval of the other people waiting.',
    body: ['Humans stand in a line, on purpose. There is often no fence, no guard and no written law. The first to arrive is served first, and everyone simply agrees.',
      'If one human skips ahead, the others rarely do anything. They stare. Inspector Oob has recorded this stare as the strongest force observed so far, and has declined to test it personally.',
      'This report is an observation, not a study. No numbers are claimed in it.'],
    transcript: ['Field report three. Subject: humans.', 'They stand in a line. On purpose.', 'No fence. No guard. No law.', 'First to arrive is first to be served.', 'Everyone simply agrees.', 'If one human skips ahead…', 'the others say nothing. They only stare.', 'It is the strongest force I have recorded.', 'Verdict:', 'Under review. I am afraid to cut in.'],
    sources: [],
    faq: [['Is this report based on research?', 'No. Report 003 is Inspector Oob’s own observation. It makes no factual claim that needs a source.']] }
];
