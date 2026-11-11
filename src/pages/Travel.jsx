import Hobby from './Hobby.jsx'

const SIBLINGS = [
  { n: '01', title: 'Chess', to: '/chess' },
  { n: '03', title: 'Jogging', to: '/jogging' },
  { n: '04', title: 'Walking', to: '/walking' },
  { n: '05', title: 'Anime', to: '/anime' },
]

export default function Travel() {
  return (
    <Hobby
      index="02"
      eyebrow="Beyond engineering"
      title="Travel"
      accent="blue"
      tagline="New places, new perspectives."
      intro="Every trip resets the way I see a problem. New streets, new
        systems, new people — the pattern always changes, and that is exactly
        what keeps my thinking flexible. I travel light, sketch a lot, and come
        home with better questions than I left with."
      stats={[
        { value: '12', label: 'Places visited' },
        { value: '3', label: 'Islands crossed' },
        { value: '48h', label: 'Longest road trip' },
        { value: '∞', label: 'Photos taken' },
      ]}
      cards={[
        {
          title: 'Plan loosely',
          text: 'I map the essentials — transport, budget, safety — then leave room for the detour that ends up being the story.',
          meta: 'Strategy',
        },
        {
          title: 'Talk to locals',
          text: 'The best directions never come from a screen. A short conversation changes the whole route.',
          meta: 'Connection',
        },
        {
          title: 'Notice systems',
          text: 'Traffic flow, power grids, water lines — cities are circuits too, and I can’t help but read them.',
          meta: 'Engineering eye',
        },
      ]}
      quote="Travel is the cheapest education that never stops teaching."
      gallery={[
        { glyph: '🏝️', label: 'Iloilo', meta: 'Home province', theme: 'blue' },
        { glyph: '🌆', label: 'Manila', meta: 'City energy', theme: 'ink' },
        { glyph: '🌊', label: 'Guimaras', meta: 'Island calm', theme: 'lime' },
        { glyph: '⛰️', label: 'Baguio', meta: 'Highland air', theme: 'red' },
      ]}
      siblings={SIBLINGS}
    />
  )
}
