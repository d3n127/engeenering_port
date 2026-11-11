import Reveal from '../components/Reveal.jsx'
import Socials from '../components/Socials.jsx'
import { profile } from '../data/site.js'
import portrait from '../assets/portrait.jpg'

const PLACE = `${profile.location.city} · ${profile.location.country}`

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero__inner">
        <div className="hero__copy">
          <Reveal className="eyebrow hero__eyebrow" delay={80}>
            {profile.role}
          </Reveal>

          <h1 className="display hero__title">
            {['Curious mind.', 'Wired to'].map((line, i) => (
              <Reveal
                as="span"
                className="hero__line"
                delay={160 + i * 110}
                key={line}
              >
                {line}
              </Reveal>
            ))}
            <Reveal as="span" className="hero__line" delay={380}>
              <em>solve.</em>
            </Reveal>
          </h1>

          <Reveal as="p" className="lede hero__lede" delay={480}>
            I’m {profile.full} — an Electrical Engineering student turning
            curiosity into clear, practical solutions, one circuit and one puzzle
            at a time.
          </Reveal>

          <Reveal className="hero__actions" delay={560}>
            <a className="btn btn--lime" href="#about">
              Get to know me
              <svg className="arr arr--down" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className="btn btn--ghost" href="#contact">
              Let’s connect
              <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </a>
          </Reveal>

          <Reveal className="hero__contact" delay={660}>
            <span className="hero__contact-label">Contact me</span>
            <Socials size={46} />
          </Reveal>
        </div>

        <Reveal className="hero__visual" variant="scale" delay={320}>
          <div className="hero__card">
            <img
              className="hero__photo"
              src={portrait}
              alt={`${profile.full} — Iloilo Marathon 21KM`}
              fetchPriority="high"
            />
            <span className="hero__tag">BSEE · 2026</span>
          </div>

          <div className="hero__badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" />
            </svg>
            <span className="hero__badge-text">
              220V
              <br />
              IDEAS
            </span>
          </div>

          <div className="hero__chip">
            <span className="hero__chip-line">
              <span className="hero__pulse" />
              {profile.availability}
            </span>
            <span className="hero__chip-place">{PLACE}</span>
          </div>
        </Reveal>
      </div>

      <div className="hero__strip">
        <div className="shell hero__strip-inner">
          {[
            ['BSEE', 'Degree in progress'],
            ['WIT', profile.school],
            ['220V', 'Ideas running live'],
            ['2026', 'Ready to contribute'],
          ].map(([k, v], i) => (
            <Reveal className="hero__stat" delay={i * 90} key={k}>
              <strong>{k}</strong>
              <span>{v}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
