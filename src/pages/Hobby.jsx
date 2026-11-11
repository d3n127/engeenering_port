import Reveal from '../components/Reveal.jsx'
import { Link } from '../router.jsx'
import '../Hobby.css'

/**
 * Shared detail page for the "Beyond engineering" hobbies.
 * Travel, Walking and Anime each pass their own content block.
 */
export default function Hobby({
  index,
  eyebrow,
  title,
  accent,
  tagline,
  intro,
  stats = [],
  cards = [],
  quote,
  gallery = [],
  siblings = [],
}) {
  return (
    <div className={`hpage hpage--${accent}`}>
      <div className="shell hpage__shell">
        <header className="hpage__head">
          <Link to="/beyond" className="hpage__back">
            ← Back to Beyond
          </Link>
          <span className="hpage__index">
            {index} · {eyebrow}
          </span>
          <h1 className="hpage__title">
            {title}
            <em>.</em>
          </h1>
          <p className="hpage__tagline">{tagline}</p>
        </header>

        <Reveal className="hpage__intro">
          <p>{intro}</p>
        </Reveal>

        <div className="hpage__stats">
          {stats.map((s, i) => (
            <Reveal className="hstat" delay={i * 90} key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>

        <div className="hpage__grid">
          {cards.map((c, i) => (
            <Reveal className="hcard" delay={i * 110} key={c.title}>
              <span className="hcard__n">0{i + 1}</span>
              <h3 className="hcard__title">{c.title}</h3>
              <p className="hcard__text">{c.text}</p>
              {c.meta && <span className="hcard__meta">{c.meta}</span>}
            </Reveal>
          ))}
        </div>

        {quote && (
          <Reveal className="hpage__quote">
            <span className="hpage__quote-mark" aria-hidden="true">
              “
            </span>
            <p>{quote}</p>
          </Reveal>
        )}

        {gallery.length > 0 && (
          <div className="hpage__gallery">
            {gallery.map((g, i) => (
              <Reveal
                className={`gcard gcard--${g.theme || 'plain'}`}
                delay={i * 100}
                key={g.label}
              >
                <span className="gcard__glyph" aria-hidden="true">
                  {g.glyph}
                </span>
                <span className="gcard__label">{g.label}</span>
                <span className="gcard__meta">{g.meta}</span>
              </Reveal>
            ))}
          </div>
        )}

        <nav className="hpage__siblings" aria-label="Other hobbies">
          <span className="hpage__siblings-label">Keep exploring</span>
          <div className="hpage__siblings-row">
            {siblings.map((s) => (
              <Link className="hsib" to={s.to} key={s.to}>
                <span className="hsib__n">{s.n}</span>
                <span className="hsib__name">{s.title}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
