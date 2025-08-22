import { useEffect, useState } from 'react'

// Core Web Vitals measurement and optimization
export const webVitals = {
  // Cumulative Layout Shift (CLS) prevention
  preventCLS: () => {
    // Add aspect ratio containers for images
    const images = document.querySelectorAll('img:not([width]):not([height])')
    images.forEach(img => {
      if (!img.style.aspectRatio) {
        img.style.aspectRatio = '16/9' // Default aspect ratio
      }
    })

    // Reserve space for dynamic content
    const dynamicContainers = document.querySelectorAll('[data-dynamic]')
    dynamicContainers.forEach(container => {
      if (!container.style.minHeight) {
        container.style.minHeight = '200px' // Minimum height reservation
      }
    })
  },

  // First Contentful Paint (FCP) optimization
  optimizeFCP: () => {
    // Remove render-blocking resources
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])')
    nonCriticalCSS.forEach(link => {
      link.media = 'print'
      link.onload = function() {
        this.media = 'all'
      }
    })

    // Preload critical resources
    const criticalResources = [
      '/fonts/lexend-400.ttf',
      '/fonts/lexend-600.ttf'
    ]

    criticalResources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource
      link.as = resource.includes('.ttf') ? 'font' : 'style'
      if (resource.includes('.ttf')) {
        link.type = 'font/ttf'
        link.crossOrigin = 'anonymous'
      }
      document.head.appendChild(link)
    })
  },

  // Total Blocking Time (TBT) reduction
  reduceTBT: () => {
    // Defer non-critical JavaScript
    const scripts = document.querySelectorAll('script:not([data-critical])')
    scripts.forEach(script => {
      if (!script.defer && !script.async) {
        script.defer = true
      }
    })

    // Use requestIdleCallback for non-critical tasks
    const scheduleWork = (callback) => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback)
      } else {
        setTimeout(callback, 1)
      }
    }

    return scheduleWork
  },

  // Largest Contentful Paint (LCP) optimization
  optimizeLCP: () => {
    // Preload LCP image/resource
    const heroImage = document.querySelector('.hero img, .hero [data-lcp]')
    if (heroImage) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = heroImage.src || heroImage.dataset.src
      link.as = 'image'
      document.head.appendChild(link)
    }

    // Optimize critical rendering path
    const criticalElements = document.querySelectorAll('[data-lcp-critical]')
    criticalElements.forEach(element => {
      element.style.willChange = 'auto' // Remove will-change after initial render
    })
  }
}

// Web Vitals measurement hook
export const useWebVitals = () => {
  const [vitals, setVitals] = useState({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    inp: null,
    ttfb: null
  })

  useEffect(() => {
    // Dynamic import to avoid blocking
    import('web-vitals').then(({ getCLS, getFCP, getFID, getLCP, getTTFB }) => {
      getCLS(metric => setVitals(prev => ({ ...prev, cls: metric })))
      getFCP(metric => setVitals(prev => ({ ...prev, fcp: metric })))
      getFID(metric => setVitals(prev => ({ ...prev, fid: metric })))
      getLCP(metric => setVitals(prev => ({ ...prev, lcp: metric })))
      getTTFB(metric => setVitals(prev => ({ ...prev, ttfb: metric })))
    }).catch(() => {
      // Fallback measurement
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
              setVitals(prev => ({ ...prev, fcp: { value: entry.startTime } }))
            }
            if (entry.entryType === 'largest-contentful-paint') {
              setVitals(prev => ({ ...prev, lcp: { value: entry.startTime } }))
            }
          })
        })
        
        try {
          observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] })
        } catch {
          // Browser doesn't support these entry types
        }
      }
    })
  }, [])

  return vitals
}

// Performance budget monitoring
export const performanceBudget = {
  thresholds: {
    fcp: 1800, // First Contentful Paint < 1.8s
    lcp: 2500, // Largest Contentful Paint < 2.5s
    cls: 0.1,  // Cumulative Layout Shift < 0.1
    fid: 100,  // First Input Delay < 100ms
    ttfb: 800  // Time to First Byte < 800ms
  },

  check: (vitals) => {
    const results = {}
    Object.entries(performanceBudget.thresholds).forEach(([metric, threshold]) => {
      const value = vitals[metric]?.value
      if (value !== null && value !== undefined) {
        results[metric] = {
          value,
          threshold,
          passed: value <= threshold,
          score: Math.min(100, Math.max(0, 100 - ((value - threshold) / threshold) * 100))
        }
      }
    })
    return results
  }
}

// Image optimization utilities
export const imageOptimization = {
  // Progressive image loading
  loadProgressively: (img) => {
    if (!img.dataset.src) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target
          image.src = image.dataset.src
          image.classList.remove('lazy')
          observer.unobserve(image)
        }
      })
    }, { rootMargin: '50px' })

    observer.observe(img)
  },

  // WebP format detection and serving
  supportsWebP: () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    return canvas.toDataURL('image/webp').indexOf('webp') > -1
  },

  // Responsive image loading
  getOptimalImageSrc: (baseSrc, width) => {
    const webpSupported = imageOptimization.supportsWebP()
    const extension = webpSupported ? '.webp' : '.jpg'
    
    // Determine optimal size based on device pixel ratio and viewport
    const dpr = window.devicePixelRatio || 1
    const optimalWidth = Math.ceil(width * dpr)
    
    // Return appropriate size variant
    if (optimalWidth <= 400) return `${baseSrc}-400w${extension}`
    if (optimalWidth <= 800) return `${baseSrc}-800w${extension}`
    if (optimalWidth <= 1200) return `${baseSrc}-1200w${extension}`
    return `${baseSrc}-1600w${extension}`
  }
}

// Initialize all Core Web Vitals optimizations
export const initWebVitalsOptimizations = () => {
  // Run immediately for critical optimizations
  webVitals.preventCLS()
  webVitals.optimizeFCP()
  
  // Defer non-critical optimizations
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      webVitals.reduceTBT()
      webVitals.optimizeLCP()
    })
  } else {
    setTimeout(() => {
      webVitals.reduceTBT()
      webVitals.optimizeLCP()
    }, 1)
  }
}

// Performance monitoring and reporting
export const performanceMonitor = {
  // Send vitals to analytics
  reportVitals: (vitals) => {
    // Send to Google Analytics 4
    if (window.gtag) {
      Object.entries(vitals).forEach(([name, metric]) => {
        if (metric?.value) {
          window.gtag('event', name, {
            event_category: 'Web Vitals',
            value: Math.round(metric.value),
            metric_id: metric.id,
            metric_value: metric.value,
            metric_delta: metric.delta
          })
        }
      })
    }

    // Console logging for development
    if (import.meta.env.DEV) {
      console.group('🚀 Web Vitals Report')
      Object.entries(vitals).forEach(([name, metric]) => {
        if (metric?.value) {
          const budget = performanceBudget.thresholds[name]
          const status = budget && metric.value <= budget ? '✅' : '⚠️'
          console.log(`${status} ${name.toUpperCase()}: ${Math.round(metric.value)}ms (budget: ${budget}ms)`)
        }
      })
      console.groupEnd()
    }
  }
}
