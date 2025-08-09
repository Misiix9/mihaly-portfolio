// Lightweight GA4 integration with runtime injection and manual page_view
// Usage: initGA(import.meta.env.VITE_GA_MEASUREMENT_ID)
// Then render <GAListener /> inside Router to fire page views on route changes.

export function initGA(measurementId) {
  if (!measurementId) return
  if (typeof window === 'undefined') return
  if (window.__GA_INITIALIZED__) return

  // dataLayer and gtag shim
  window.dataLayer = window.dataLayer || []
  function gtag(){ window.dataLayer.push(arguments) }
  // expose to window for module-local use
  window.gtag = window.gtag || gtag

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  script.id = 'ga4-script'
  document.head.appendChild(script)

  window.gtag('js', new Date())
  window.gtag('config', measurementId, { send_page_view: false })

  window.__GA_MEASUREMENT_ID__ = measurementId
  window.__GA_INITIALIZED__ = true
}

export function trackPageview(path, title) {
  if (typeof window === 'undefined') return
  const id = window.__GA_MEASUREMENT_ID__
  if (!id || typeof window.gtag !== 'function') return

  window.gtag('event', 'page_view', {
    page_title: title || document.title,
    page_location: window.location.href,
    page_path: path,
  })
}
