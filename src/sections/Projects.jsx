import Reveal from '../components/Reveal.jsx'
import { Link } from '../router.jsx'

const ROWS = ['Signal path analyzer', 'Smart energy monitor', 'Puzzle solver engine']

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="shell projects__inner">
        <div className="projects__copy">
          <Reveal className="badge">
            <span className="badge__dot" />
            Work in progress
          </Reveal>

          <Reveal as="h2" className="display projects__title" delay={90}>
            Good work
            <br />
            takes <em>time.</em>
          </Reveal>

          <Reveal as="p" className="lede" delay={180}>
            My project case studies are being prepared. Soon, this space will
            show the challenge, process, circuit, result, and what I learned —
            not just a final photo.
          </Reveal>

          <Reveal className="projects__actions" delay={260}>
            <Link className="btn btn--ghost" to="/contact">
              Notify me when they drop
              <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <Reveal className="projects__panel-wrap" delay={160} variant="right">
          <div className="projects__panel">
            <div className="projects__panel-head">
              <span>Project archive</span>
              <span>00 / 03</span>
            </div>

            <ul className="projects__rows">
              {ROWS.map((name, i) => (
                <li className="projects__row" key={name}>
                  <span className="projects__row-n">0{i + 1}</span>
                  <span className="projects__row-body">
                    <span className="projects__bar" style={{ '--w': `${72 - i * 8}%` }} />
                    <span className="projects__bar projects__bar--thin" style={{ '--w': `${48 - i * 6}%` }} />
                    <span className="projects__row-name">{name}</span>
                  </span>
                  <span className="projects__soon">Coming soon</span>
                </li>
              ))}
            </ul>

            <svg className="projects__mark" viewBox="0 0 120 120" aria-hidden="true">
              <rect x="8" y="8" width="104" height="104" rx="26" stroke="currentColor" strokeWidth="8" fill="none" />
              <circle cx="44" cy="44" r="12" stroke="currentColor" strokeWidth="8" fill="none" />
              <circle cx="78" cy="78" r="12" stroke="currentColor" strokeWidth="8" fill="none" />
              <path d="M56 56 66 66" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>

            <span className="projects__scan" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
