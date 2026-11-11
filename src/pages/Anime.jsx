import Hobby from './Hobby.jsx'

const SIBLINGS = [
  { n: '01', title: 'Chess', to: '/chess' },
  { n: '02', title: 'Travel', to: '/travel' },
  { n: '03', title: 'Jogging', to: '/jogging' },
  { n: '04', title: 'Walking', to: '/walking' },
]

export default function Anime() {
  return (
    <Hobby
      index="05"
      eyebrow="Beyond engineering"
      title="Anime"
      accent="red"
      tagline="Stories without limits."
      intro="Anime is where I go when a story needs room to breathe — long
        arcs, impossible stakes, characters who grow one decision at a time.
        It is also a masterclass in pacing and design: how a single frame can
        say what a paragraph cannot."
      stats={[
        { value: '80+', label: 'Series finished' },
        { value: '6', label: 'All-time favourites' },
        { value: '2', label: 'Genres I rewatch' },
        { value: '1', label: 'Genre I avoid' },
      ]}
      cards={[
        {
          title: 'Strategy shows',
          text: 'Games within games. Every episode is a proof, and I keep pausing to predict the next move before it lands.',
          meta: 'Chess energy',
        },
        {
          title: 'Slow-burn stories',
          text: 'Character studies that reward patience — the same discipline puzzle solving and endurance training demand.',
          meta: 'Character',
        },
        {
          title: 'Visual design',
          text: 'Colour scripts, layout, motion: the craft behind each scene quietly feeds how I compose a page or a diagram.',
          meta: 'Inspiration',
        },
      ]}
      quote="A good story, like a good circuit, only works when every part carries its share of the load."
      gallery={[
        { glyph: '観', label: 'Watching', meta: 'Current season', theme: 'red' },
        { glyph: '⚔️', label: 'Battle arcs', meta: 'High stakes', theme: 'ink' },
        { glyph: '🧠', label: 'Mind games', meta: 'Plot first', theme: 'blue' },
        { glyph: '🌸', label: 'Slice of life', meta: 'Reset mode', theme: 'lime' },
      ]}
      siblings={SIBLINGS}
    />
  )
}
