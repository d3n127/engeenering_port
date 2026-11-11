import { Link, useRoute } from '../router.jsx'
import About from '../sections/About.jsx'
import Strengths from '../sections/Strengths.jsx'
import Beyond from '../sections/Beyond.jsx'
import Projects from '../sections/Projects.jsx'
import Experience from '../sections/Experience.jsx'
import Contact from '../sections/Contact.jsx'
import './Section.css'

/* One route per landing-page section: #/about, #/skills … #/contact.
   The section components stay shared with the home page — this wrapper
   only adds the page chrome (back bar, note, prev/next pager, CTA). */
const PAGES = {
  about: {
    index: '01',
    label: 'About',
    note: 'Who I am, where I study, and where I’m rooted.',
    Component: About,
  },
  skills: {
    index: '02',
    label: 'Skills',
    note: 'The strengths I bring to every problem I meet.',
    Component: Strengths,
  },
  beyond: {
    index: '03',
    label: 'Beyond',
    note: 'The parts of life that keep my perspective open.',
    Component: Beyond,
  },
  projects: {
    index: '04',
    label: 'Projects',
    note: 'Case studies currently in the making.',
    Component: Projects,
  },
  experience: {
    index: '05',
    label: 'Experience',
    note: 'Where what I’ve learned is starting to apply.',
    Component: Experience,
  },
  contact: {
    index: '06',
    label: 'Contact',
    note: 'Opportunities, collaborations, or a simple hello.',
    Component: Contact,
  },
}

const ORDER = Object.keys(PAGES)
const HOME = { to: '/', index: '00', label: 'Home' }

export default function SectionPage() {
  const route = useRoute()
  const key = route.replace(/^\//, '')
  const page = PAGES[key] || PAGES.about
  const i = ORDER.indexOf(key)

  const prev = i > 0 ? { to: `/${ORDER[i - 1]}`, ...PAGES[ORDER[i - 1]] } : HOME
  const next = i >= 0 && i < ORDER.length - 1 ? { to: `/${ORDER[i + 1]}`, ...PAGES[ORDER[i + 1]] } : HOME

  const Section = page.Component

  return (
    <div className="spage">
      <div className="shell spage__head">
        <Link to="/" className="tlink spage__back">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M11 7H3M6 3 2.5 7 6 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to home
        </Link>

        <span className="spage__crumb">
          <span className="spage__crumb-n">{page.index}</span>
          <span aria-hidden="true">/</span>
          06
          <span aria-hidden="true">·</span>
          {page.label}
        </span>
      </div>

      <div className="shell spage__intro">
        <p className="spage__note">{page.note}</p>
        <span className="spage__rule" aria-hidden="true" />
      </div>

      <Section />

      <nav className="shell spage__pager" aria-label="Section navigation">
        <Link to={prev.to} className="spage__pg spage__pg--prev">
          <span className="spage__pg-k">← Previous</span>
          <span className="spage__pg-title">{prev.label}</span>
        </Link>
        <Link to={next.to} className="spage__pg spage__pg--next">
          <span className="spage__pg-k">Next →</span>
          <span className="spage__pg-title">{next.label}</span>
        </Link>
      </nav>

      {key !== 'contact' && (
        <div className="shell spage__cta">
          <p>Have an opportunity, a challenge, or a good idea?</p>
          <Link to="/contact" className="btn btn--ink">
            Let’s connect
            <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  )
}
