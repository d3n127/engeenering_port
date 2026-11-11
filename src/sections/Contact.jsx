import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import Socials from '../components/Socials.jsx'
import { profile } from '../data/site.js'

const EMAIL = profile.email
const MAPS_URL = profile.location.mapsUrl
const BASED_IN = `${profile.location.city}, ${profile.location.province}, ${profile.location.country}`

const TOPICS = [
  'Internship / on-the-job training',
  'Project collaboration',
  'Just saying hello',
  'Something else',
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  })

  const update = (key) => (event) =>
    setForm((f) => ({ ...f, [key]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`[${form.topic || 'Portfolio'}] ${form.name}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`,
    )
    setSent(true)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section className="section section--blue contact" id="contact">
      <div className="shell contact__inner">
        <div className="contact__copy">
          <Reveal className="eyebrow">06 · Contact</Reveal>

          <Reveal as="h2" className="display contact__title" delay={80}>
            Let’s create
            <br />
            the first
            <br />
            <em>connection.</em>
          </Reveal>

          <Reveal as="p" className="lede" delay={160}>
            Have an opportunity, a challenge, or simply a good idea? I’d be glad
            to hear from you.
          </Reveal>

          <div className="contact__meta">
            <Reveal className="contact__meta-row" delay={220}>
              <span className="contact__meta-ic" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </span>
              <span>
                <small>Based in</small>
                <a href={MAPS_URL} target="_blank" rel="noreferrer noopener">
                  {BASED_IN}
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </a>
              </span>
            </Reveal>

            <Reveal className="contact__meta-row" delay={280}>
              <span className="contact__meta-ic" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M2.5 8.5 12 4l9.5 4.5L12 13 2.5 8.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  <path d="M6.5 10.6V15c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <span>
                <small>Studying at</small>
                {profile.school}
              </span>
            </Reveal>

            <Reveal className="contact__meta-row" delay={340}>
              <span className="contact__meta-ic" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2.5" y="5" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m3.5 6.5 8.5 6.5 8.5-6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <span>
                <small>Email</small>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </span>
            </Reveal>
          </div>

          <Reveal className="contact__socials" delay={400}>
            <span className="contact__socials-label">Follow or message me</span>
            <Socials size={48} variant="solid" />
          </Reveal>
        </div>

        <Reveal className="contact__form-wrap" delay={140} variant="right">
          <form className="cform" onSubmit={submit}>
            <span className="cform__label">Send a message</span>

            <label className="cform__field">
              <span>Your name</span>
              <input
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={update('name')}
              />
            </label>

            <label className="cform__field">
              <span>Email address</span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={update('email')}
              />
            </label>

            <label className="cform__field">
              <span>What would you like to talk about?</span>
              <select required value={form.topic} onChange={update('topic')}>
                <option value="" disabled>
                  Choose a topic
                </option>
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="cform__field">
              <span>Your message</span>
              <textarea
                rows="4"
                required
                placeholder="Write your message here…"
                value={form.message}
                onChange={update('message')}
              />
            </label>

            <button className="btn btn--ink cform__submit" type="submit">
              Send message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 3 10.5 13.5M21 3l-6.6 18-3.9-7.5L3 9.6 21 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
            </button>

            <p className={`cform__note ${sent ? 'is-on' : ''}`} role="status">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m4.5 12.5 5 5 10-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Thank you for reaching out — your email app should be opening now.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
