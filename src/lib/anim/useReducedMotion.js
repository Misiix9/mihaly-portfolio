import { useEffect, useState } from 'react'

export default function useReducedMotion(defaultValue = false) {
  const [reduced, setReduced] = useState(defaultValue)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => setReduced(!!mql.matches)
    update()

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', update)
      return () => mql.removeEventListener('change', update)
    }
    // Safari fallback
    if (typeof mql.addListener === 'function') {
      mql.addListener(update)
      return () => mql.removeListener(update)
    }
  }, [])

  return reduced
}
