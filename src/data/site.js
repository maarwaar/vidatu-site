export const u = p => import.meta.env.BASE_URL.replace(/\/$/, '') + p;
// Cloudflare Web Analytics token (public by design). Empty = no analytics script.
export const beacon = '2e719a0bfca94259b52f0fb168bd8312';
import content from './content.json';
import relaunch from './relaunch.json'; // the relaunch videos of 28 Nov 2026, written from "Vidatu relaunch scripts"
const AC = { oob: '#7CFFCB', percy: '#FFD23F', 'old-h': '#FFB52E', gulp: '#17122B', 'yup-and-nope': '#17122B', tess: '#FFD166', murmur: '#FFC145', lab: '#FFB52E' };
export const shows = content.shows.map(x => ({ ...x, ac: AC[x.id], one: x.format === 'Lives' ? 'Life' : x.format.replace(/s$/, ''), title: x.short === 'Lab' ? 'The Lab' : x.name }));
export const host = l => new URL(l).hostname.replace(/^www\./, '');
export const videos = [...content.videos, ...relaunch];
// Shows with no new videos since the relaunch (28 Nov 2026). Their pages stay; the home page shows them as resting.
export const RESTING = new Set(['percy', 'old-h', 'gulp']);
export const showOf = id => shows.find(x => x.id === id);
export const TOPICS = { space: ['Space', 'Stars, black holes, the Moon and the first light in the universe.'], animals: ['Animals', 'Cats that ignore you, and a hippo and a T. rex you cannot outrun.'], maths: ['Maths', 'Bell curves, higher dimensions and shapes that should not be possible.'], physics: ['Physics', 'Time, light, chaos and why pendulums fall back into step.'], humans: ['Human life', 'Robot vacuums, spicy food, haunted houses and the eight billion of us.'] };
export const CHECKED = '26 Nov 2026';
// YouTube: video id and the day it goes public (21:30 IST). Format: 'oob-1': ['<video id>', '2026-12-10'].
// Empty since 27 Nov 2026: the channel launch is paused while every video goes through the topic gate
// ("00 Vidatu - START HERE", section 3b). The 15 uploads stay in YouTube Studio as private videos. Their ids, for the relaunch:
// oob-1 5ajdArNd0dg, tess-2 fEaCtveKdlk, percy-1 9gFafVvjNqk, oob-2 Cw6uO8D1nQE, gulp-1 gAmowDgkN6A, old-h-3 g0D9w1HwGfc, oob-3 50TFVscOujg, percy-2 Q7c2T0TGgGs, gulp-2 1lAmvGpa4h8, tess-1 sVOj6NG15y0, old-h-1 SnmEJCizEaU, percy-3 L7s1_gKGuks, gulp-3 NDiLNtqh0HA, tess-3 Ly7vd_XRYbc, old-h-2 B7JALA7G7ms
// Relaunch, set 28 Nov 2026: the keeps that have a page here. The new videos (Oob 004 to 007, Yup & Nope 4 and 5, Tess 4, Murmur 4) have no page yet.
// oob-2 is the new-ending cut (eTelixkEn04); the old upload Cw6uO8D1nQE is retired.
const YTS = {
  'murmur-1': ['7s3FS2JdXtk', '2026-11-29'],
  'yup-and-nope-1': ['HMnNTYlZhUM', '2026-11-30'],
  'murmur-3': ['XPul1Jg9qk4', '2026-12-02'],
  'yup-and-nope-2': ['Ua_E6y-uQ8Y', '2026-12-03'],
  'tess-2': ['HlbU-JuPV3Q', '2026-12-05'],
  'tess-3': ['b-nvnl644_k', '2026-12-09'],
  'oob-2': ['eTelixkEn04', '2026-12-10'],
  'oob-4': ['PV5-SWblQd4', '2026-11-28'],
  'oob-6': ['h4R1VwNwVpo', '2026-12-01'],
  'oob-7': ['N-12xXhykdw', '2026-12-04'],
  'yup-and-nope-4': ['c8muZgJBALQ', '2026-12-06'],
  'oob-5': ['pHh7w1hmqsY', '2026-12-07'],
  'murmur-4': ['4ubZQ0A5p6c', '2026-12-08'],
  'yup-and-nope-5': ['MBhgALCW1ew', '2026-12-11'],
  'tess-4': ['iXSUI2bE5aY', '2026-12-12'],
};
// Not on YouTube (28 Nov 2026): deleted from Studio after the topic gate, or never uploaded. Their pages keep the explanation and sources.
export const RETIRED = new Set(['oob-1', 'oob-3', 'percy-1', 'percy-2', 'percy-3', 'old-h-1', 'old-h-2', 'old-h-3', 'gulp-1', 'gulp-2', 'gulp-3', 'tess-1', 'murmur-2', 'yup-and-nope-3']);
export const yt = v => { const y = YTS[v.show + '-' + v.n]; if (!y) return null; const d = new Date(y[1] + 'T00:00:00Z'); return { id: y[0], at: y[1] + 'T21:30:00+05:30', day: d.getUTCDate() + ' ' + ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getUTCMonth()] }; };

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
    transcript: ['Field report two. Subject: humans.', 'They keep a small predator indoors.', 'It hunts. It has claws. It ignores them.', 'It knows its name. It chooses not to answer.', 'They clean up after it. Daily.', 'In return, it vibrates.', 'Humans consider this a fair deal.', 'Verdict:', 'Approved. I want one.', 'Does yours answer to its name?'],
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
    faq: [['Is this report based on research?', 'No. Report 003 is Inspector Oob’s own observation. It makes no factual claim that needs a source.']] },
  { slug: 'robot-vacuum', no: '004', subject: 'Robot vacuums', verdict: 'Adorable', vc: 'adorable', img: 'v/oob-4.jpg',
    h1: 'Why do people name their robot vacuums?',
    desc: 'In a study of 30 robot vacuum owners, 21 had named theirs and 16 called it "he". Inspector Oob files Report 004 on the disc that cleans the floor.',
    finding: 'Humans built a disc to clean the floor. Then they gave it a name, and one introduced it to his parents.',
    answer: 'Because a machine that moves around the home by itself gets treated like a member of the household. In a 2007 Georgia Tech study of 30 owners, 21 had given their robot vacuum a name and 16 referred to it as "he".',
    body: ['Humans built a flat, round machine to vacuum the floor. It has no face and no voice. It bumps into the furniture and turns around.',
      'Researchers at Georgia Tech visited 30 households that owned one. Most had named it, and more than half spoke of it as "he". Some owners tidied the floor before switching it on, to make its job easier. One introduced it to his parents.',
      'The researchers called it an intimate home appliance: owners related to it less like a tool and more like part of the household.'],
    transcript: ['Field report four. Subject: humans.', 'They built a machine to clean the floor.', 'It is a disc. It has no face.', 'Researchers visited thirty owners.', 'Twenty-one had given it a name.', 'Sixteen called it "he".', 'Some clean first. So it has less work.', 'One introduced it to his parents.', 'Verdict:', 'Adorable. They have named me too.', 'What is yours called?'],
    sources: [['Sung, Guo, Grinter & Christensen (2007), "My Roomba Is Rambo": Intimate Home Appliances. UbiComp 2007, Lecture Notes in Computer Science 4717, pp. 145–162.', 'https://doi.org/10.1007/978-3-540-74853-3_9']],
    faq: [['Is it normal to name a robot vacuum?', 'In the 2007 study it was the usual thing to do: 21 of the 30 owners had named theirs.'],
      ['Why do people call a robot vacuum "he"?', 'The study does not settle why. It records that 16 of the 30 owners spoke of it as "he", along with other ways of treating it like a person or a pet.']] },
  { slug: 'endurance-hunt', no: '005', subject: 'The endurance hunt', verdict: 'Terrifying', vc: 'terrifying', img: 'v/oob-5.jpg',
    h1: 'Can a human run down an antelope?',
    desc: 'Hunters in the Kalahari were recorded chasing kudu for 2 to 5 hours in 40°C heat until the animal had to stop. Inspector Oob files Report 005.',
    finding: 'Humans are slower than their prey. So they do not sprint. They keep coming until the prey has to stop.',
    answer: 'Sometimes, in great heat. Hunters in the central Kalahari were recorded chasing kudu for about 2 to 5 hours, over 25 to 35 km, at 40 to 42°C. The animal overheats and has to stop; the human, cooled by sweat, keeps going.',
    body: ['A kudu can outrun any human over a short distance. The hunters do not try to. They keep it moving through the hottest part of the day and track it whenever it slips out of sight.',
      'The animal overheats and has to stop. Humans sweat across the whole body, so they can keep going in heat that stops a faster animal. In one hunt Louis Liebenberg measured, the hunters covered about 35 km in 3 hours 35 minutes.',
      'This rests on a small number of recorded hunts. Scholars still debate how common persistence hunting was in the past, and how much it shaped human evolution.'],
    transcript: ['Field report five. Subject: humans.', 'They are slower than their prey.', 'So they do not sprint. They keep coming.', 'Recorded in the Kalahari. At forty degrees.', 'Two to five hours. Thirty-five kilometres.', 'The prey overheats. It has to stop.', 'The human does not. It leaks to stay cool.', 'Then it walks up to its dinner.', 'Verdict:', 'Terrifying. Do not run.', 'How far could you go?'],
    sources: [['Liebenberg (2006), "Persistence Hunting by Modern Hunter-Gatherers", Current Anthropology 47(6): 1017–1026.', 'https://doi.org/10.1086/508695']],
    faq: [['Could a person today run down an animal?', 'Only in narrow conditions: great heat, open country, a hunter who can track, and hours of steady running. Liebenberg recorded it among a few hunters in the central Kalahari.'],
      ['Is this why humans can run long distances?', 'It is one proposed explanation. It is debated, and the evidence from living hunters rests on a small number of recorded hunts.']] },
  { slug: 'spicy-food', no: '006', subject: 'Chilli', verdict: 'Absurd', vc: 'absurd', img: 'v/oob-6.jpg',
    h1: 'Why do humans like spicy food?',
    desc: 'Chillies burn mammals, yet about a third of humans eat them every day. Psychologist Paul Rozin calls it benign masochism. Inspector Oob files Report 006.',
    finding: 'A plant makes a chemical that burns mammals, as a warning. Humans farm it and ask for more.',
    answer: 'Psychologist Paul Rozin, who has studied the question since 1980, calls it "benign masochism": enjoying a burn that the body treats as danger, because the mind knows it is safe. He estimates that well over two billion adults enjoy the burn of chilli.',
    body: ['Chilli peppers make capsaicin, the chemical behind the burn. Mammals feel it; birds do not, and birds spread the seeds. For a mammal, the burn says: do not eat me.',
      'Humans grow chillies on purpose and put them in their food. Most people dislike the burn at first and come to like it by eating it again and again, which is the change Rozin and Schiller studied in 1980.',
      'One caution: humans are not the only mammal that eats them. Chinese tree shrews eat capsaicin-rich plants, because a genetic change dulls the burn for them.'],
    transcript: ['Field report six. Subject: humans.', 'A plant makes a chemical that burns mammals.', 'It is a warning. Do not eat me.', 'Birds cannot feel it. Mammals stay away.', 'Humans farm it.', 'A third of them eat it every day.', 'They sweat. They cry. They ask for more.', 'Their scientists call it benign masochism.', 'Verdict:', 'Absurd. Pass the sauce.', 'How hot can you go?'],
    sources: [['Rozin & Schiller (1980), "The nature and acquisition of a preference for chili pepper by humans", Motivation and Emotion 4: 77–101.', 'https://doi.org/10.1007/BF00995932'],
      ['Rozin, Guillot, Fincher, Rozin & Tsukayama (2013), "Glad to be sad, and other examples of benign masochism", Judgment and Decision Making 8(4): 439–447.', 'https://doi.org/10.1017/S1930297500005295']],
    faq: [['Why do birds not feel chilli heat?', 'Their receptor for capsaicin does not respond to it the way a mammal’s does, so birds eat chillies and spread the seeds.'],
      ['Is liking spicy food learned?', 'Mostly. Rozin’s research found the liking grows with repeated eating, often from childhood, rather than being there from birth.']] },
  { slug: 'haunted-house', no: '007', subject: 'Paying to be scared', verdict: 'Reckless', vc: 'reckless', img: 'v/oob-7.jpg',
    h1: 'Why do people enjoy being scared?',
    desc: '110 visitors to a Danish haunted house wore heart-rate monitors. They enjoyed it most at a middle level of fear. Inspector Oob files Report 007.',
    finding: 'Fear is the alarm that says: leave. Humans buy tickets to it.',
    answer: 'Up to a point. In a 2020 field study, 110 visitors to a haunted house in Denmark wore heart-rate monitors and rated their fear and enjoyment. Enjoyment peaked at a middle level of fear: too little was dull, too much was unpleasant.',
    body: ['Fear is an animal’s alarm. It means: get away from here. Humans pay to walk into dark houses where actors jump out at them.',
      'Researchers from Aarhus University fitted 110 visitors, aged 12 to 57, with heart-rate monitors and filmed them at the scariest moments. Plotted against fear, enjoyment made an upside-down U: highest in the middle, lower at both ends.',
      'The researchers describe this as a sweet spot of arousal that feels just right, and treat recreational fear as a kind of play.'],
    transcript: ['Field report seven. Subject: humans.', 'Fear is their alarm. It means: leave.', 'Humans buy tickets to it.', 'Dark houses. Actors dressed as zombies.', 'Researchers wired 110 visitors to heart monitors.', 'Too little fear: bored.', 'Too much: miserable.', 'In the middle: delighted.', 'Verdict:', 'Reckless. I have bought a ticket.', 'What scared you just enough?'],
    sources: [['Andersen, Schjoedt, Price, Rosas, Scrivner & Clasen (2020), "Playing With Fear: A Field Study in Recreational Horror", Psychological Science 31(12): 1497–1510.', 'https://doi.org/10.1177/0956797620972116']],
    faq: [['Is there a perfect amount of scary?', 'On average, in this study, yes: enjoyment was highest at a middle level of fear and fell when visitors were barely scared or very scared.'],
      ['How was fear measured?', 'Visitors rated their own fear and enjoyment, wore heart-rate monitors, and were filmed at the scariest points of the house.']] }
];
