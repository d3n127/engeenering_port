import Reveal from '../components/Reveal.jsx'
import { Link } from '../router.jsx'

export default function Experience() {
  return (
    <section className="section section--dark experience" id="experience">
      <div className="shell experience__inner">
        <Reveal className="experience__orbit-wrap" variant="scale">
          <div className="orbit" aria-hidden="true">
            <span className="orbit__ring orbit__ring--outer" />
            <span className="orbit__ring orbit__ring--inner" />
            <span className="orbit__track orbit__track--a">
              <i className="orbit__moon orbit__moon--lime" />
            </span>
            <span className="orbit__track orbit__track--b">
              <i className="orbit__moon orbit__moon--lime orbit__moon--sm" />
            </span>
            <span className="orbit__core">01</span>
          </div>
        </Reveal>

        <div className="experience__copy">
          <Reveal className="eyebrow">05 · Experience</Reveal>
          <Reveal className="experience__kicker" delay={80}>
            The journey is starting
          </Reveal>

          <Reveal as="h2" className="display experience__title" delay={140}>
            Experience is
            <br />
            <em>under construction.</em>
          </Reveal>

          <Reveal as="p" className="lede" delay={220}>
            I’m currently building my foundation through study, self-directed
            learning, and daily practice. I’m ready for the first opportunity
            where I can contribute, learn, and grow.
          </Reveal>

          <Reveal className="experience__actions" delay={300}>
            <Link className="btn btn--lime" to="/contact">
              Start the conversation
              <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
