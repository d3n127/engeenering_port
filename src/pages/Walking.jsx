import Hobby from './Hobby.jsx'

const SIBLINGS = [
  { n: '01', title: 'Chess', to: '/chess' },
  { n: '02', title: 'Travel', to: '/travel' },
  { n: '03', title: 'Jogging', to: '/jogging' },
  { n: '05', title: 'Anime', to: '/anime' },
]

export default function Walking() {
  return (
    <Hobby
      index="04"
      eyebrow="Beyond engineering"
      title="Walking"
      accent="cream"
      tagline="Where ideas connect."
      intro="No headphones, no hurry — just walking until the tangled thought
        at the back of my head finally lines up. Most of my best solutions
        arrive somewhere around the third kilometer, when I stop forcing the
        answer and let it surface on its own."
      stats={[
        { value: '5.6', label: 'km average route' },
        { value: '4×', label: 'Per week' },
        { value: '30+', label: 'Ideas logged' },
        { value: '0', label: 'Headphones worn' },
      ]}
      cards={[
        {
          title: 'Morning loop',
          text: 'Along the coastal road before the heat sets in — the rhythm of walking does the editing for me.',
          meta: '05:30 · 5.6 km',
        },
        {
          title: 'Think out loud',
          text: 'I talk through the problem as I go. Half-formed ideas sound much worse spoken than written, and that helps.',
          meta: 'Method',
        },
        {
          title: 'Sketch the route',
          text: 'A quick note of the path and the thought that arrived on it. Walking is my cheapest brainstorming tool.',
          meta: 'Habit',
        },
      ]}
      quote="An aimless walk is never aimless — it is a mind sorting itself out."
      gallery={[
        { glyph: '🌅', label: 'Sunrise', meta: 'Best thinking hour', theme: 'lime' },
        { glyph: '🛤️', label: 'Coastal road', meta: 'Default route', theme: 'blue' },
        { glyph: '🌳', label: 'Plaza loop', meta: 'Evening wind-down', theme: 'ink' },
        { glyph: '📓', label: 'Pocket notes', meta: 'Ideas on the go', theme: 'red' },
      ]}
      siblings={SIBLINGS}
    />
  )
}
