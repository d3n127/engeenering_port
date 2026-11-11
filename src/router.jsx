import { useEffect, useRef, useState } from 'react'

/**
 * Hash router. Supports:
 *  - '#/chess'      → page routes
 *  - '#about'       → plain anchors on the landing page (no route change)
 */
function readHash() {
  const raw = window.location.hash.replace(/^#/, '')
  if (!raw.startsWith('/')) return '/'
  return raw.split('#')[0] || '/'
}

export function useRoute() {
  const [route, setRoute] = useState(readHash)
  const pathRef = useRef(route)

  useEffect(() => {
    const onChange = () => {
      const next = readHash()
      // only reset scroll when we actually changed page
      if (next !== pathRef.current) window.scrollTo({ top: 0, behavior: 'auto' })
      pathRef.current = next
      setRoute(next)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

export function navigate(to) {
  if (readHash() === to) {
    // already there — just glide back to the top
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  window.location.hash = to
}

/** Internal link that never reloads the page. */
export function Link({ to, children, className, onClick, ...rest }) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(event) => {
        // let the browser handle modified clicks (new tab, etc.)
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        navigate(to)
        onClick?.(event)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
