import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageview } from './ga4'

export default function GAListener() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname + location.search + location.hash
    trackPageview(path, document.title)
  }, [location])

  return null
}
