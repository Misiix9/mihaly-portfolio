import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import App from './App.jsx'
import { setupI18n } from './lib/i18n/index.js'
import { initSmoothScroll } from './lib/scroll/smoothScroll.js'
import { initGsapLenisBridge } from './lib/scroll/gsapBridge.js'
import { initParallax, setParallaxGlobalIntensity } from './lib/anim/parallax.js'
import { initScrollReveal } from './lib/anim/scrollReveal.js'
import { initGA } from './lib/analytics/ga4.js'
import GAListener from './lib/analytics/GAListener.jsx'
import { setDefaultSiteMeta } from './lib/seo/meta.js'
import { setPersonSchema } from './lib/seo/schema.js'
import { initPerformanceOptimizations } from './lib/performance/criticalCSS.js'
import { initWebVitalsOptimizations, performanceMonitor, useWebVitals } from './lib/performance/webVitals.js'

// Reduced motion detection
function detectReducedMotion() {
  try {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  } catch { /* no-op */ }
  return false
}

// Initialize i18n
setupI18n()

// Initialize performance optimizations early
initPerformanceOptimizations()
initWebVitalsOptimizations()

// Initialize Lenis smooth scrolling
initSmoothScroll()

// Bridge Lenis with GSAP ScrollTrigger
initGsapLenisBridge()

// Set up parallax with proper motion handling
const reducedMotion = detectReducedMotion()
setParallaxGlobalIntensity(reducedMotion ? 0 : 1)
if (!reducedMotion) {
  initParallax()
}

// Initialize Google Analytics
try {
  const GA_ID = import.meta.env.VITE_GA_ID
  if (GA_ID) initGA(GA_ID)
} catch {
  // no-op
}

// Set default site meta
try { 
  setDefaultSiteMeta() 
} catch (e) { 
  void e 
}

// Inject JSON-LD Person schema
try {
  const origin = window.location.origin
  setPersonSchema({
    name: 'Győri Mihály',
    alternateName: 'Mihaly Gyori',
    jobTitle: 'Website and desktop developer student',
    email: 'mihalygyori05@gmail.com',
    url: origin,
    image: new URL('og-image.svg', import.meta.env.BASE_URL).toString(),
    sameAs: [
      'https://github.com/Misiix9',
      'https://instagram.com/gyr.misi',
    ],
  })
} catch (e) { 
  void e 
}

// Performance monitoring wrapper
const AppWithMonitoring = () => {
  const vitals = useWebVitals()
  
  // Report vitals when they change
  useEffect(() => {
    if (Object.values(vitals).some(v => v !== null)) {
      performanceMonitor.reportVitals(vitals)
    }
  }, [vitals])
  
  return (
    <BrowserRouter>
      <GAListener />
      <App />
    </BrowserRouter>
  )
}

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithMonitoring />
  </StrictMode>,
)

// Initialize scroll-reveal after first paint
try {
  setTimeout(() => {
    initScrollReveal()
  }, 0)
} catch { 
  /* no-op */ 
}
