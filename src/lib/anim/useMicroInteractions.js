/**
 * React hooks for micro-interactions
 * Easy integration of hover effects, loading states, and animations
 */

import { useEffect, useRef } from 'react'
import { 
  createHoverEffect, 
  createPressEffect, 
  createFormFieldEffect, 
  createLoadingEffect,
  createTextRevealEffect,
  createRippleEffect 
} from './microInteractions'

// Enhanced hover effect hook
export const useHoverEffect = (options = {}) => {
  const ref = useRef(null)
  const cleanupRef = useRef(null)

  useEffect(() => {
    if (ref.current && !cleanupRef.current) {
      cleanupRef.current = createHoverEffect(ref.current, options)
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [options])

  return ref
}

// Button press effect hook
export const usePressEffect = (options = {}) => {
  const ref = useRef(null)
  const cleanupRef = useRef(null)

  useEffect(() => {
    if (ref.current && !cleanupRef.current) {
      cleanupRef.current = createPressEffect(ref.current, options)
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [options])

  return ref
}

// Form field effect hook
export const useFormFieldEffect = (options = {}) => {
  const ref = useRef(null)
  const cleanupRef = useRef(null)

  useEffect(() => {
    if (ref.current && !cleanupRef.current) {
      cleanupRef.current = createFormFieldEffect(ref.current, options)
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [options])

  return ref
}

// Loading effect hook
export const useLoadingEffect = (isLoading, options = {}) => {
  const ref = useRef(null)
  const effectRef = useRef(null)

  useEffect(() => {
    if (ref.current && !effectRef.current) {
      effectRef.current = createLoadingEffect(ref.current, options)
    }
  }, [options])

  useEffect(() => {
    if (effectRef.current) {
      if (isLoading) {
        effectRef.current.start()
      } else {
        effectRef.current.stop()
      }
    }
  }, [isLoading])

  return ref
}

// Text reveal effect hook
export const useTextRevealEffect = (trigger = true, options = {}) => {
  const ref = useRef(null)
  const effectRef = useRef(null)

  useEffect(() => {
    if (ref.current && !effectRef.current) {
      effectRef.current = createTextRevealEffect(ref.current, options)
    }
  }, [options])

  useEffect(() => {
    if (effectRef.current && trigger) {
      effectRef.current.reveal()
    }
  }, [trigger])

  return ref
}

// Ripple effect hook
export const useRippleEffect = (options = {}) => {
  const ref = useRef(null)
  const cleanupRef = useRef(null)

  useEffect(() => {
    if (ref.current && !cleanupRef.current) {
      cleanupRef.current = createRippleEffect(ref.current, options)
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [options])

  return ref
}

// Combined interactive effect hook
export const useInteractiveEffect = (options = {}) => {
  const {
    hover = true,
    press = true,
    ripple = false,
    hoverOptions = {},
    pressOptions = {},
    rippleOptions = {},
  } = options

  const ref = useRef(null)
  const cleanupFunctions = useRef([])

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const cleanups = []

    if (hover) {
      const hoverCleanup = createHoverEffect(element, hoverOptions)
      if (hoverCleanup) cleanups.push(hoverCleanup)
    }

    if (press) {
      const pressCleanup = createPressEffect(element, pressOptions)
      if (pressCleanup) cleanups.push(pressCleanup)
    }

    if (ripple) {
      const rippleCleanup = createRippleEffect(element, rippleOptions)
      if (rippleCleanup) cleanups.push(rippleCleanup)
    }

    cleanupFunctions.current = cleanups

    return () => {
      cleanupFunctions.current.forEach(cleanup => cleanup && cleanup())
      cleanupFunctions.current = []
    }
  }, [hover, press, ripple, hoverOptions, pressOptions, rippleOptions])

  return ref
}
