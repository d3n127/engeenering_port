import { Link } from '../router.jsx'
import Logo from './Logo.jsx'
import Socials from './Socials.jsx'
import { profile } from '../data/site.js'

const YEAR = new Date().getFullYear()
const PLACE = `${profile.location.city} · ${profile.location.province} · ${profile.location.country}`

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__top">
          <Link to="/" className="footer__logo" aria-label="Icae D. Alambro — home">
            <Logo className="footer__logo-mark" size={34} />
            <span className="footer__logo-word">
              IA<span className="dot">.</span>
            </span>
          </Link>

          <p className="footer__tag">
            Electrical engineer in progress.
            <br />
            Problem solver by nature.
          </p>

          <div className="footer__socials">
            <span className="footer__label">Find me online</span>
            <Socials size={44} variant="ghost" />
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">© {YEAR} {profile.full}</span>
          <span className="footer__loc">{PLACE}</span>
          <button
            type="button"
            className="tlink footer__top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
