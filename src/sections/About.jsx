import Reveal from '../components/Reveal.jsx'
import { Link } from '../router.jsx'
import { profile } from '../data/site.js'

const MAPS_URL = profile.location.mapsUrl

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="shell">
        <Reveal className="eyebrow">01 · About me</Reveal>

        <div className="about__head">
          <Reveal as="h2" className="display about__title" delay={80}>
            Learning to build
            <br />
            <em>what matters.</em>
          </Reveal>

          <Reveal className="about__quote" delay={200} variant="right">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8 12 3.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M19 15.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z" fill="currentColor" />
            </svg>
            <p>
              I believe good solutions begin with curiosity: understand the
              problem, test an idea, and keep improving until it works.
            </p>
          </Reveal>
        </div>

        <div className="about__grid">
          {/* ---------- the person ---------- */}
          <Reveal className="card about__card" delay={60}>
            <span className="card__label">The person</span>
            <p className="about__lead">
              I’m Icae, an aspiring electrical engineer who enjoys difficult
              questions and the satisfaction of finding a clean solution.
            </p>
            <p className="about__sub">
              My interests move between electrical systems, logical puzzles,
              creative thinking, and the stories and places that keep my
              perspective open.
            </p>
            <Link className="tlink about__link" to="/skills">
              See what drives me
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Link>
          </Reveal>

          {/* ---------- education ---------- */}
          <Reveal className="card about__card about__card--edu" delay={160}>
            <span className="about__watermark" aria-hidden="true">WIT</span>
            <span className="about__badge" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M2.5 8.5 12 4l9.5 4.5L12 13 2.5 8.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M6.5 10.6V15c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </span>
            <span className="card__label">Education</span>
            <span className="about__kicker">Degree in progress</span>
            <h3 className="about__edu-title">
              Bachelor of Science in Electrical Engineering
            </h3>
            <p className="about__sub">Western Institute of Technology</p>
            <div className="about__progress">
              <span className="about__progress-bar" />
              <span className="about__progress-text">Building the foundation</span>
            </div>
          </Reveal>

          {/* ---------- location / maps ---------- */}
          <Reveal className="about__map" delay={260} variant="scale">
            <div className="about__map-frame">
              <iframe
                className="about__map-iframe"
                title="Map of Dumangas, Iloilo, Philippines"
                src={profile.location.osmEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span className="about__map-tint" aria-hidden="true" />
              <span className="about__map-ping" aria-hidden="true" />
              <span className="about__map-live">
                <span className="about__map-live-dot" aria-hidden="true" />
                Dumangas · Iloilo
              </span>
            </div>

            <div className="about__map-body">
              <span className="about__map-loc">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                Iloilo
                <br />
                Philippines
              </span>
              <h3 className="about__map-city">Dumangas</h3>
              <p className="about__map-tag">Rooted locally. Thinking beyond.</p>
              <a
                className="about__map-link"
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                View on Google Maps
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
