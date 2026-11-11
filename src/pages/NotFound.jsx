import { Link } from '../router.jsx'

export default function NotFound() {
  return (
    <div className="n404">
      <div className="shell n404__inner">
        <span className="n404__code">404</span>
        <h1 className="n404__title">
          Open circuit<span className="dot">.</span>
        </h1>
        <p className="n404__text">
          This page isn’t wired up — but the rest of the portfolio is.
        </p>
        <Link className="btn btn--lime" to="/">
          Back to the landing page
          <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
