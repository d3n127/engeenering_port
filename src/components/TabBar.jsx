import { Link, useRoute } from '../router.jsx'

/**
 * App-style bottom tab bar (≤940px). Six icon-only tabs mirroring the top
 * nav; the active route lights up in lime. Hidden on the immersive hobby
 * pages, which keep the top bar only.
 */
const TABS = [
  {
    to: '/',
    label: 'Home',
    icon: <path d="M3 10.6 12 3.4l9 7.2V19a1.6 1.6 0 0 1-1.6 1.6H14V14h-4v6.6H4.6A1.6 1.6 0 0 1 3 19z" />,
  },
  {
    to: '/about',
    label: 'About',
    icon: (
      <>
        <circle cx="12" cy="8.2" r="3.6" />
        <path d="M4.8 20.4a7.2 7.2 0 0 1 14.4 0" />
      </>
    ),
  },
  {
    to: '/skills',
    label: 'Skills',
    icon: <path d="M13.6 2.6 5.2 13.8h5.4L9.6 21.4l8.9-11.4h-5.5z" />,
  },
  {
    to: '/beyond',
    label: 'Beyond',
    icon: (
      <>
        <circle cx="12" cy="12" r="8.6" />
        <path d="m15.3 8.7-2.1 5.5-5.5 2.1 2.1-5.5z" />
      </>
    ),
  },
  {
    to: '/projects',
    label: 'Projects',
    icon: (
      <>
        <rect x="4" y="4" width="6.6" height="6.6" rx="1.4" />
        <rect x="13.4" y="4" width="6.6" height="6.6" rx="1.4" />
        <rect x="4" y="13.4" width="6.6" height="6.6" rx="1.4" />
        <rect x="13.4" y="13.4" width="6.6" height="6.6" rx="1.4" />
      </>
    ),
  },
  {
    to: '/experience',
    label: 'Experience',
    icon: (
      <>
        <rect x="3.2" y="7.6" width="17.6" height="12.4" rx="2" />
        <path d="M8.6 7.6V6.2a2 2 0 0 1 2-2h2.8a2 2 0 0 1 2 2v1.4M3.2 13.2h17.6" />
      </>
    ),
  },
]

const HOBBY_ROUTES = ['/chess', '/jogging', '/travel', '/walking', '/anime']

export default function TabBar() {
  const route = useRoute()

  if (HOBBY_ROUTES.includes(route)) return null

  return (
    <nav className="tabbar" aria-label="Section tabs">
      {TABS.map((tab) => {
        const active = route === tab.to
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className={`tabbar__tab${active ? ' is-active' : ''}`}
            aria-label={tab.label}
            aria-current={active ? 'page' : undefined}
            title={tab.label}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {tab.icon}
            </svg>
          </Link>
        )
      })}
    </nav>
  )
}
