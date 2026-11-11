import Reveal from '../components/Reveal.jsx'

const CARDS = [
  {
    n: '01',
    tag: 'Logic',
    title: 'Problem solving',
    text: 'Breaking complex electrical engineering problems into smaller, testable parts and working toward a practical answer.',
    tags: ['Analysis', 'Reasoning', 'Persistence'],
    art: 'logic',
    icon: (
      <path
        d="M9 4.5A2.5 2.5 0 0 0 6.5 7v1.2c0 .6-.2 1.2-.6 1.7L4 12.4c-.5.7 0 1.6.9 1.6h1.4v1.6A2.5 2.5 0 0 0 8.8 18c1 0 1.9-.6 2.3-1.5M15 4.5A2.5 2.5 0 0 1 17.5 7v1.2c0 .6.2 1.2.6 1.7l1.9 2.5c.5.7 0 1.6-.9 1.6h-1.4v1.6A2.5 2.5 0 0 1 15.2 18c-1 0-1.9-.6-2.3-1.5M12 4v16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    n: '02',
    tag: 'Ideas',
    title: 'Creativity',
    text: 'Looking beyond the obvious path, exploring alternatives, and turning fresh ideas into useful possibilities.',
    tags: ['Imagination', 'Adaptability', 'Design'],
    art: 'ideas',
    featured: true,
    icon: (
      <path
        d="M12 3.5a5.5 5.5 0 0 0-3.2 9.97c.4.29.7.72.8 1.2l.1.63h4.6l.1-.63c.1-.48.4-.91.8-1.2A5.5 5.5 0 0 0 12 3.5ZM10 19h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    n: '03',
    tag: 'Puzzles',
    title: 'Rubik’s Cube',
    text: 'Pattern recognition, algorithms, patience, and speed — puzzle solving keeps my mind sharp and focused.',
    tags: ['Patterns', 'Algorithms', 'Focus'],
    art: 'cube',
    icon: (
      <path
        d="M12 3.2 4.5 7v10L12 20.8 19.5 17V7L12 3.2Zm0 0v7.6m7.5-3.8L12 10.8 4.5 7m7.5 3.8v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
]

const CUBE = [
  ['#3355ff', '#ff4438', '#c6f53c'],
  ['#faf8f2', '#ff8a1f', '#3355ff'],
  ['#ff4438', '#c6f53c', '#faf8f2'],
]

function Art({ kind }) {
  if (kind === 'logic') {
    return (
      <svg className="art art--logic" viewBox="0 0 300 170" aria-hidden="true">
        <g className="art__grid">
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 24 + 8} x2="300" y2={i * 24 + 8} />
          ))}
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`v${i}`} x1={i * 24 + 6} y1="0" x2={i * 24 + 6} y2="170" />
          ))}
        </g>
        <path className="art__flow" d="M30 40 H120 V95 H200" />
        <path className="art__flow art__flow--b" d="M110 140 H210 V95" />
        <path className="art__flow art__flow--c" d="M250 55 V95 H215" />
        <circle className="art__dot art__dot--ink" cx="30" cy="40" r="6" />
        <circle className="art__dot art__dot--ink" cx="110" cy="140" r="6" />
        <circle className="art__dot art__dot--ink" cx="250" cy="55" r="6" />
        <circle className="art__pulse" cx="150" cy="85" r="17" />
      </svg>
    )
  }

  if (kind === 'ideas') {
    return (
      <svg className="art art--ideas" viewBox="0 0 300 170" aria-hidden="true">
        <g className="art__orbits">
          <circle cx="150" cy="85" r="62" />
          <circle cx="150" cy="85" r="44" />
          <circle cx="150" cy="85" r="26" />
        </g>
        <g className="art__spark">
          <path
            d="M150 55 158 77 180 85 158 93 150 115 142 93 120 85 142 77 150 55Z"
            fill="currentColor"
          />
          <circle cx="185" cy="58" r="4" fill="currentColor" />
          <circle cx="118" cy="112" r="3" fill="currentColor" />
        </g>
      </svg>
    )
  }

  return (
    <svg className="art art--cube" viewBox="0 0 300 170" aria-hidden="true">
      <g className="art__cube">
        <rect x="88" y="6" width="124" height="124" rx="4" fill="#0d0d0f" />
        {CUBE.map((row, r) =>
          row.map((color, c) => (
            <rect
              key={`${r}-${c}`}
              x={93 + c * 40}
              y={11 + r * 40}
              width="34"
              height="34"
              rx="2"
              fill={color}
            />
          )),
        )}
      </g>
      <ellipse className="art__cube-shadow" cx="150" cy="146" rx="66" ry="8" />
    </svg>
  )
}

export default function Strengths() {
  return (
    <section className="section strengths" id="skills">
      <div className="shell">
        <Reveal className="eyebrow">02 · Core strengths</Reveal>

        <div className="strengths__head">
          <Reveal as="h2" className="display strengths__title" delay={80}>
            Different
            <br />
            problems.
            <br />
            One <em>mindset.</em>
          </Reveal>
          <Reveal as="p" className="lede strengths__lede" delay={180} variant="right">
            I combine structured reasoning with imagination — because the best
            answer is both correct and clever.
          </Reveal>
        </div>

        <div className="strengths__grid">
          {CARDS.map((c, i) => (
            <Reveal
              className={`scard ${c.featured ? 'scard--featured' : ''}`}
              delay={i * 130}
              key={c.n}
            >
              <div className="scard__top">
                <span className="scard__num">
                  {c.n} / {c.tag}
                </span>
                <span className="scard__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24">{c.icon}</svg>
                </span>
              </div>

              <div className="scard__art">
                <Art kind={c.art} />
              </div>

              <h3 className="scard__title">{c.title}</h3>
              <p className="scard__text">{c.text}</p>

              <div className="scard__tags">
                {c.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
