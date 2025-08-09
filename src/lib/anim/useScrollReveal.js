import { useCallback, useEffect, useRef } from 'react'

/**
 * useScrollReveal
 * Adds a smooth fade+up reveal on first intersection.
 *
 * Usage:
 * const revealRef = useScrollReveal()
 * return <div ref={revealRef}>...</div>
 */
export default function useScrollReveal({
  root = null,
  rootMargin = '0px',
  threshold = 0.12,
  once = true,
} = {}) {
  const observerRef = useRef(null)

  const disconnect = () => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
  }

  const callback = useCallback(
    (node) => {
      if (!node) return

      // Initial state (hidden)
      node.classList.add(
        'opacity-0',
        'translate-y-4',
        'transition-all',
        'duration-700',
        'ease-out',
        'will-change-transform'
      )

      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.remove('opacity-0', 'translate-y-4')
            node.classList.add('opacity-100', 'translate-y-0')
            if (once) {
              obs.unobserve(node)
            }
          }
        })
      }, { root, rootMargin, threshold })

      obs.observe(node)
      observerRef.current = obs
    },
    [once, root, rootMargin, threshold]
  )

  useEffect(() => () => disconnect(), [])

  return callback
}
