import { useEffect, useRef, useState } from 'react'

/**
 * Fade/slide-in wrapper. Adds `is-in` when the element enters the viewport
 * (or immediately when it is already visible on mount), so CSS can play
 * the transition. Never leaves content stuck invisible.
 */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  variant = '',
  threshold = 0.15,
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Already on screen when the component mounts → reveal right away.
    const rect = node.getBoundingClientRect()
    const vh = window.innerHeight || 0
    if (rect.top < vh * 0.94 && rect.bottom > 0) {
      setShown(true)
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        })
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(node)

    // Safety net: if the observer never fires, show the element anyway
    // once it has been near the viewport for a while.
    const safety = window.setTimeout(() => {
      const box = node.getBoundingClientRect()
      if (box.top < vh * 1.4) {
        setShown(true)
        io.disconnect()
      }
    }, 2500)

    return () => {
      io.disconnect()
      window.clearTimeout(safety)
    }
  }, [threshold])

  const variantClass = variant ? `reveal--${variant}` : ''

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${shown ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
