import React, { useEffect, useRef, useState } from 'react'

/**
 * Viewport
 * - Renders children only when intersecting viewport.
 * - If once=true, stays mounted after first reveal. Otherwise toggles mount.
 */
export default function Viewport({ once = true, rootMargin = '200px', className = '', children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry && entry.isIntersecting) {
        setVisible(true)
        if (once) io.disconnect()
      } else if (!once) {
        setVisible(false)
      }
    }, { rootMargin })

    io.observe(el)
    return () => io.disconnect()
  }, [once, rootMargin])

  return (
    <div ref={ref} className={className}>
      {visible ? children : null}
    </div>
  )
}
