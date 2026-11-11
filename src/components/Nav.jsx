import { Fragment, useEffect, useState } from 'react'
import { Link, useRoute } from '../router.jsx'
import Logo from './Logo.jsx'
import Socials from './Socials.jsx'
import { profile } from '../data/site.js'

const LINKS = [
  { id: 'about', label: 'About', to: '/about' },
  { id: 'skills', label: 'Skills', to: '/skills' },
  { id: 'beyond', label: 'Beyond', to: '/beyond' },
  { id: 'projects', label: 'Projects', to: '/projects' },
  { id: 'experience', label: 'Experience', to: '/experience' },
]

/**
 * Top navigation. Every item is a real route (#/about, #/skills …) so it can
 * be bookmarked; on phones it opens a full-screen menu overlay.
 */
export default function Nav() {
  const route = useRoute()
  const onDark = route === '/chess' || route === '/jogging'
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [route])

  /* if the window is dragged past the desktop breakpoint, drop the overlay */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 941px)')
    const onChange = (e) => {
      if (e.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  /* while the menu is open: freeze the page + close on Escape */
  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`nav ${scrolled || open ? 'nav--stuck' : ''} ${open ? 'nav--open' : ''} ${
        onDark ? 'nav--on-dark' : ''
      }`}
    >
      <div className="nav__inner shell">
        <Link to="/" className="nav__logo" aria-label="Icae D. Alambro — home">
          <Logo className="nav__logo-mark" size={30} />
          <span className="nav__logo-word">
            IA<span className="dot">.</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l, i) => (
            <Fragment key={l.id}>
              {i > 0 && <span className="nav__sep" aria-hidden="true" />}
              <Link to={l.to} className="nav__link">
                {l.label}
              </Link>
            </Fragment>
          ))}
        </nav>

        <div className="nav__right">
          <Link to="/contact" className="btn btn--ink nav__cta">
            Connect
            <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </Link>
          <button
            type="button"
            className="nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav__drawer" id="nav-drawer">
        <div className="nav__drawer-meta">
          <span>Menu</span>
          <span>
            {profile.location.city} · {profile.location.country}
          </span>
        </div>

        {LINKS.map((l, i) => (
          <Link
            key={l.id}
            to={l.to}
            className="nav__drawer-link"
            style={{ '--d': `${80 + i * 55}ms` }}
            onClick={() => setOpen(false)}
          >
            <span className="nav__drawer-n">{String(i + 1).padStart(2, '0')}</span>
            <span className="nav__drawer-label">{l.label}</span>
            <svg
              className="nav__drawer-arrow"
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>
        ))}

        <Link
          to="/contact"
          className="btn btn--ink nav__drawer-cta"
          style={{ '--d': `${80 + LINKS.length * 55}ms` }}
          onClick={() => setOpen(false)}
        >
          Let’s connect
          <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </Link>

        <div className="nav__drawer-socials" style={{ '--d': `${120 + (LINKS.length + 1) * 55}ms` }}>
          <span className="nav__drawer-socials-label">Find me online</span>
          <Socials size={44} />
        </div>

        <p className="nav__drawer-foot" style={{ '--d': `${160 + (LINKS.length + 1) * 55}ms` }}>
          Electrical Engineering student · Western Institute of Technology
        </p>
      </div>
    </header>
  )
}
