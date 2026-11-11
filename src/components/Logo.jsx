/**
 * Brand mark — electrical-engineer emblem:
 * an ink disc ringed in signal-lime, circuit terminals feeding a bolt.
 * Used in the navigation bar and the footer; a static copy lives in
 * /public/favicon.svg — keep both in sync when editing the artwork.
 */
export default function Logo({ size = 30, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="Icae D. Alambro logo"
    >
      <circle cx="24" cy="24" r="22" fill="#0d0d0f" />
      <circle cx="24" cy="24" r="21" fill="none" stroke="#c6f53c" strokeWidth="2" />
      <path d="M6 24h6" stroke="#3355ff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M36 24h6" stroke="#3355ff" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="14" cy="24" r="2.2" fill="#3355ff" />
      <circle cx="34" cy="24" r="2.2" fill="#3355ff" />
      <path d="M28.5 9 15.5 27.5h7L17.5 40l15-18.5h-7z" fill="#c6f53c" />
    </svg>
  )
}
