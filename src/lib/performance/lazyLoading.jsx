import { lazy, Suspense, useState, useEffect } from 'react'

// Lazy load heavy animation components
export const LazyThreeScene = lazy(() => import('../3d/scene.jsx'))
export const LazyThreeSceneEnhanced = lazy(() => import('../3d/sceneEnhanced.jsx'))
export const LazyParticlesCanvas = lazy(() => import('../../components/ui/ParticlesCanvas.jsx'))
export const LazyParticlesCanvasEnhanced = lazy(() => import('../../components/ui/ParticlesCanvasEnhanced.jsx'))
export const LazyMorphingBlob = lazy(() => import('../../components/ui/MorphingBlob.jsx'))
export const LazyMorphingBlobEnhanced = lazy(() => import('../../components/ui/MorphingBlobEnhanced.jsx'))
export const LazyLottiePlayer = lazy(() => import('../../components/ui/LottiePlayer.jsx'))

// Lazy load heavy animation libraries
export const lazyGSAP = () => import('gsap').then(module => module.default)
export const lazyScrollTrigger = () => import('gsap/ScrollTrigger')
export const lazyScrollToPlugin = () => import('gsap/ScrollToPlugin')
export const lazyThree = () => import('three')
export const lazyThreeFiber = () => import('@react-three/fiber')

// Loading fallback component
export const AnimationLoader = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}>
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  </div>
)

// Lazy wrapper with fallback
export const LazyWrapper = ({ children, fallback, className = '' }) => (
  <Suspense fallback={fallback || <AnimationLoader className={className} />}>
    {children}
  </Suspense>
)

// Progressive loading hook
export const useProgressiveLoading = (priority = 'low') => {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    // Load based on priority and connection speed
    const shouldLoad = () => {
      if (priority === 'high') return true
      
      // Check network conditions
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      if (connection && connection.effectiveType === '4g') return true
      if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        return priority === 'critical'
      }
      
      return true
    }
    
    if (shouldLoad()) {
      // Use requestIdleCallback for non-critical loading
      if (window.requestIdleCallback && priority === 'low') {
        window.requestIdleCallback(() => setIsLoaded(true))
      } else {
        setIsLoaded(true)
      }
    }
  }, [priority])
  
  return isLoaded
}

// Intersection Observer lazy loading
export const useIntersectionLoading = (ref, options = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    })
    
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, options])
  
  return isVisible
}
