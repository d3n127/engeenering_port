import { useEffect, useRef, useState } from 'react'
import { Link } from '../router.jsx'
import Reveal from '../components/Reveal.jsx'
import { strava } from '../data/site.js'
import '../Jogging.css'

/** Replace the url in src/data/site.js with your real Strava profile link. */
const STRAVA_URL = strava.profileUrl

const STATS = [
  { label: 'Total distance', value: 214.6, suffix: ' km', decimals: 1 },
  { label: 'This week', value: 21.4, suffix: ' km', decimals: 1 },
  { label: 'Average pace', value: 6.2, suffix: ' /km', decimals: 1, pace: true },
  { label: 'Elevation gain', value: 1240, suffix: ' m', decimals: 0 },
]

const WEEK = [
  ['Mon', 4.2],
  ['Tue', 0],
  ['Wed', 6.5],
  ['Thu', 3.1],
  ['Fri', 0],
  ['Sat', 8.8],
  ['Sun', 5.4],
]

const ACTIVITIES = [
  { name: 'Morning loop — Dumangas', dist: '5.42 km', time: '33:18', pace: "6'08\"/km" },
  { name: 'Tempo run — coastal road', dist: '8.81 km', time: '52:04', pace: "5'55\"/km" },
  { name: 'Easy recovery jog', dist: '3.10 km', time: '20:11', pace: "6'31\"/km" },
  { name: 'Interval session 6×400m', dist: '6.50 km', time: '36:47', pace: "5'39\"/km" },
]

function useCountUp(target, decimals = 0, duration = 1600) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return
          started.current = true
          const t0 = performance.now()
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(target * eased)
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        })
      },
      { threshold: 0.4 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [target, duration])

  return [ref, value.toFixed(decimals)]
}

function Stat({ label, value, suffix, decimals, pace }) {
  const [ref, shown] = useCountUp(value, decimals)
  const text = pace
    ? `${Math.floor(Number(shown))}:${String(Math.round((Number(shown) % 1) * 60)).padStart(2, '0')}`
    : shown

  return (
    <div className="jstat" ref={ref}>
      <span className="jstat__label">{label}</span>
      <strong className="jstat__value">
        {text}
        <em>{suffix}</em>
      </strong>
      <span className="jstat__bar" />
    </div>
  )
}

export default function Jogging() {
  const maxWeek = Math.max(...WEEK.map(([, v]) => v))

  return (
    <div className="jog">
      <div className="shell jog__shell">
        <header className="jog__head">
          <div>
            <Link to="/beyond" className="jog__back">
              ← Back to Beyond
            </Link>
            <h1 className="jog__title">
              Jogging<span className="dot">.</span>
            </h1>
            <p className="jog__sub">Building endurance — one kilometer at a time.</p>
          </div>

          <a className="btn jog__cta" href={STRAVA_URL} target="_blank" rel="noreferrer noopener">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
              <path d="M15.4 26 23 8l7.6 18h-4.9L23 17.6 18.3 26h-2.9Z" />
              <path d="M8.6 26 13.2 14.7 17.8 26h-4.9l-1.4-3.5L10.1 26H8.6Z" />
            </svg>
            Open my Strava
            <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
        </header>

        {/* ---------- stats ---------- */}
        <div className="jog__stats">
          {STATS.map((s, i) => (
            <Reveal delay={i * 90} key={s.label}>
              <Stat {...s} />
            </Reveal>
          ))}
        </div>

        {/* ---------- route + week ---------- */}
        <div className="jog__mid">
          <Reveal className="jcard jog__route" variant="left">
            <div className="jcard__head">
              <span>Last run · Dumangas loop</span>
              <span>Today · 05:42</span>
            </div>

            <svg className="route" viewBox="0 0 520 260" aria-label="Route map illustration">
              <g className="route__grid">
                {Array.from({ length: 7 }, (_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 43} x2="520" y2={i * 43} />
                ))}
                {Array.from({ length: 11 }, (_, i) => (
                  <line key={`v${i}`} x1={i * 52} y1="0" x2={i * 52} y2="260" />
                ))}
              </g>

              <path
                className="route__path"
                d="M40 210 C 90 120, 150 90, 210 120 S 300 210, 360 160 S 430 60, 486 74"
                fill="none"
              />
              <path
                className="route__glow"
                d="M40 210 C 90 120, 150 90, 210 120 S 300 210, 360 160 S 430 60, 486 74"
                fill="none"
              />

              <circle className="route__start" cx="40" cy="210" r="8" />
              <circle className="route__end" cx="486" cy="74" r="9" />
              <g className="route__runner" transform="translate(486 74)">
                <circle r="16" className="route__halo" />
              </g>

              <text className="route__label" x="40" y="238">START</text>
              <text className="route__label" x="440" y="52">FINISH</text>
            </svg>

            <div className="jog__route-foot">
              <span>
                <strong>5.42</strong> km
              </span>
              <span>
                <strong>33:18</strong> time
              </span>
              <span>
                <strong>6'08"</strong> pace
              </span>
              <span>
                <strong>42</strong> m elev
              </span>
            </div>
          </Reveal>

          <Reveal className="jcard jog__week" delay={120} variant="right">
            <div className="jcard__head">
              <span>This week</span>
              <span>21.4 km · 4 runs</span>
            </div>

            <div className="bars">
              {WEEK.map(([day, km], i) => (
                <div className="bars__col" key={day}>
                  <span className="bars__val">{km ? km : ''}</span>
                  <span
                    className={`bars__bar ${km === 0 ? 'is-empty' : ''}`}
                    style={{
                      '--h': `${Math.max(6, (km / maxWeek) * 100)}%`,
                      '--d': `${i * 90}ms`,
                    }}
                  />
                  <span className="bars__day">{day}</span>
                </div>
              ))}
            </div>

            <p className="jog__week-note">
              Rest days count too — recovery is where the training sticks.
            </p>
          </Reveal>
        </div>

        {/* ---------- strava panel ---------- */}
        <Reveal className="strava" delay={100} variant="scale">
          <div className="strava__mark" aria-hidden="true">
            <svg width="54" height="54" viewBox="0 0 32 32" fill="currentColor">
              <path d="M15.4 26 23 8l7.6 18h-4.9L23 17.6 18.3 26h-2.9Z" />
              <path d="M8.6 26 13.2 14.7 17.8 26h-4.9l-1.4-3.5L10.1 26H8.6Z" />
            </svg>
          </div>

          <div className="strava__copy">
            <span className="strava__kicker">Live on Strava</span>
            <h2 className="strava__title">Every run, mapped and measured.</h2>
            <p className="strava__text">
              Splits, heart rate, elevation and weekly consistency — all synced
              automatically from my watch to my Strava profile.
            </p>
          </div>

          <a className="btn strava__btn" href={STRAVA_URL} target="_blank" rel="noreferrer noopener">
            View activities
            <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
        </Reveal>

        {/* ---------- activities ---------- */}
        <div className="jog__list">
          <div className="jog__list-head">
            <span>Recent activities</span>
            <span>Synced from Strava</span>
          </div>
          {ACTIVITIES.map((a, i) => (
            <Reveal className="act" delay={i * 70} key={a.name}>
              <span className="act__n">0{i + 1}</span>
              <span className="act__name">{a.name}</span>
              <span className="act__meta">{a.dist}</span>
              <span className="act__meta">{a.time}</span>
              <span className="act__meta act__meta--accent">{a.pace}</span>
              <span className="act__go" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
