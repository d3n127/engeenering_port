import Reveal from '../components/Reveal.jsx'
import { Link } from '../router.jsx'

const ITEMS = [
  {
    n: '01',
    title: 'Chess',
    sub: 'Strategy over impulse',
    to: '/chess',
    theme: 'dark',
    art: (
      <span className="hobby__glyph hobby__glyph--knight" aria-hidden="true">
        ♞
      </span>
    ),
    icon: (
      <path
        d="M9 4.5A2.5 2.5 0 0 0 6.5 7v1.2c0 .6-.2 1.2-.6 1.7L4 12.4c-.5.7 0 1.6.9 1.6h1.4v1.6A2.5 2.5 0 0 0 8.8 18c1 0 1.9-.6 2.3-1.5M15 4.5A2.5 2.5 0 0 1 17.5 7v1.2c0 .6.2 1.2.6 1.7l1.9 2.5c.5.7 0 1.6-.9 1.6h-1.4v1.6A2.5 2.5 0 0 1 15.2 18c-1 0-1.9-.6-2.3-1.5M12 4v16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    n: '02',
    title: 'Travel',
    sub: 'New places, new perspectives',
    to: '/travel',
    theme: 'blue',
    art: (
      <span className="hobby__glyph hobby__glyph--arrow" aria-hidden="true">
        ↗
      </span>
    ),
    icon: (
      <path
        d="M3 11.5 21 4l-7.5 17-2.4-7.1L3 11.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    n: '03',
    title: 'Jogging',
    sub: 'Building endurance',
    to: '/jogging',
    theme: 'lime',
    art: <span className="hobby__glyph hobby__glyph--num" aria-hidden="true">42</span>,
    icon: (
      <path
        d="M9 3h6M12 6v2m6 3a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-6 3 3 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    n: '04',
    title: 'Walking',
    sub: 'Where ideas connect',
    to: '/walking',
    theme: 'cream',
    art: (
      <span className="hobby__glyph hobby__glyph--dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    ),
    icon: (
      <path
        d="M7 4v7.5a3 3 0 0 0 3 3h1.5M17 4v7.5a3 3 0 0 1-3 3H12m-1.5 0v5.5M13 17.5v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    n: '05',
    title: 'Anime',
    sub: 'Stories without limits',
    to: '/anime',
    theme: 'red',
    art: <span className="hobby__glyph hobby__glyph--kanji" aria-hidden="true">観</span>,
    icon: (
      <path d="M6 4.5 19 12 6 19.5v-15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    ),
  },
]

export default function Beyond() {
  return (
    <section className="section section--dark beyond" id="beyond">
      <div className="shell">
        <Reveal className="eyebrow">03 · Beyond engineering</Reveal>

        <div className="beyond__head">
          <Reveal as="h2" className="display beyond__title" delay={80}>
            Life outside
            <br />
            the <em>circuit.</em>
          </Reveal>
          <Reveal as="p" className="lede beyond__lede" delay={180} variant="right">
            The things I do away from engineering shape how I think:
            strategically, patiently, and with an open mind.
          </Reveal>
        </div>

        <div className="beyond__grid">
          {ITEMS.map((item, i) => (
            <Reveal delay={i * 110} key={item.to} className="beyond__cell">
              <Link to={item.to} className={`hobby hobby--${item.theme}`}>
                <div className="hobby__top">
                  <span className="hobby__num">{item.n}</span>
                  <span className="hobby__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24">{item.icon}</svg>
                  </span>
                </div>

                <div className="hobby__art">{item.art}</div>

                <div className="hobby__body">
                  <span className="hobby__title">{item.title}</span>
                  <span className="hobby__sub">{item.sub}</span>
                </div>

                <span className="hobby__go" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="beyond__note" delay={200}>
          <span className="beyond__note-dot" />
          Tap a card — each one opens its own page.
        </Reveal>
      </div>
    </section>
  )
}
