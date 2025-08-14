import { gsap } from 'gsap'

/**
 * Animates text content switching between languages
 * @param {string[]} selectors - CSS selectors for elements to animate
 * @param {function} changeLanguage - Function to call during animation
 * @param {object} options - Animation options
 */
export function animateLanguageSwitch(selectors, changeLanguage, options = {}) {
  const {
    duration = 0.4,
    ease = 'power2.inOut',
    stagger = 0.02,
    yDistance = 20,
    opacity = 0.3
  } = options

  return new Promise((resolve) => {
    // Get all text elements
    const elements = []
    selectors.forEach(selector => {
      const found = document.querySelectorAll(selector)
      elements.push(...Array.from(found))
    })

    if (elements.length === 0) {
      changeLanguage()
      resolve()
      return
    }

    // Create timeline
    const tl = gsap.timeline({
      onComplete: resolve
    })

    // Animate out (fade and move)
    tl.to(elements, {
      opacity: opacity,
      y: -yDistance,
      duration: duration,
      ease: ease,
      stagger: stagger
    })

    // Change language in the middle of animation
    tl.call(changeLanguage)

    // Animate in (fade and move back)
    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: duration,
      ease: ease,
      stagger: stagger
    }, `-=${duration * 0.3}`) // Start slightly before out animation completes
  })
}

/**
 * Get all text-containing selectors for the portfolio
 */
export const getPortfolioTextSelectors = () => [
  // Navigation
  'nav a, nav button span',
  '[data-section="nav"] *',
  
  // Hero section
  '[data-section="hero"] h1, [data-section="hero"] h2, [data-section="hero"] p, [data-section="hero"] button span, [data-section="hero"] a span',
  '.hero-title, .hero-subtitle, .hero-role, .hero-cta',
  
  // About section
  '[data-section="about"] h2, [data-section="about"] h3, [data-section="about"] p, [data-section="about"] li',
  '.about-title, .about-content, .about-strengths li',
  
  // Skills section
  '[data-section="skills"] h2, [data-section="skills"] h3, [data-section="skills"] p, [data-section="skills"] button span',
  '.skills-title, .skills-subtitle, .skill-name, .skill-description',
  
  // Projects section
  '[data-section="projects"] h2, [data-section="projects"] h3, [data-section="projects"] p, [data-section="projects"] button span',
  '.project-title, .project-description, .project-tech',
  
  // Contact section
  '[data-section="contact"] h2, [data-section="contact"] h3, [data-section="contact"] p, [data-section="contact"] label, [data-section="contact"] button span',
  '.contact-title, .contact-subtitle, .contact-form label, .form-label',
  
  // Footer
  'footer p, footer a span, footer small',
  
  // Common elements
  '.button-text, .link-text, .nav-item, .section-title, .section-subtitle',
  'h1, h2, h3, h4, h5, h6, p:not([aria-hidden="true"]), span:not([aria-hidden="true"]), a:not([aria-hidden="true"])',
  
  // Form elements
  'input::placeholder, textarea::placeholder, select option',
  
  // Modal content
  '.modal-title, .modal-content p, .modal-content h3, .modal-content span'
]

/**
 * Comprehensive text selector for language switching - targets ALL text elements
 */
/**
 * Precise text selector for language switching - ONLY actual text content
 */
export const getAggressiveTextSelectors = () => [
  // Explicit text elements only
  'h1, h2, h3, h4, h5, h6',
  'p',
  
  // Text spans that contain actual content (not decorative)
  'span:not([aria-hidden]):not(.icon):not([class*="w-"]):not([class*="h-"]):not([class*="bg-"]):not([class*="border"])',
  
  // Button and link text content
  'button span, a span',
  'button:not([aria-label]):not([class*="icon"])',
  'a:not([aria-label]):not([class*="icon"])',
  
  // Form text elements
  'label, legend',
  'input[type="text"], input[type="email"], textarea',
  'option',
  
  // Specific text content classes
  '.hero-title, .hero-subtitle, .hero-role',
  '.section-title, .section-subtitle', 
  '.project-title, .project-description',
  '.contact-title, .contact-subtitle',
  '.skill-name, .skill-description',
  '.button-text',
  '.typewriter-text',
  
  // Navigation text (but not icons or decorative elements)
  'nav a:not([aria-label]):not([class*="icon"])',
  'nav span:not([aria-hidden]):not(.icon)',
  '.nav-item:not([class*="icon"])',
  
  // Table text content
  'td, th',
  
  // List text content  
  'li:not([class*="icon"]):not([aria-hidden])',
  
  // Strong emphasis text
  'strong, em, small, b, i',
]

/**
 * Filter elements to include ALL text content with smart exclusions
 */
export function filterTextElements(elements) {
  return elements.filter(el => {
    // Skip if element is hidden or display none
    const style = window.getComputedStyle(el)
    if (style.display === 'none' || style.visibility === 'hidden') return false
    if (!el.offsetParent && style.position !== 'fixed') return false
    
    // Skip if element has no text content
    const text = el.textContent?.trim()
    if (!text || text.length === 0) return false
    
    // Skip if element is just whitespace, symbols, or numbers only
    if (!/[a-zA-ZÀ-ÿĀ-žА-я]/.test(text)) return false
    
    // Skip accessibility helpers
    if (el.getAttribute('aria-hidden') === 'true') return false
    if (el.classList.contains('sr-only') || el.classList.contains('screen-reader-only')) return false
    
    // Skip non-text elements
    const tagName = el.tagName.toLowerCase()
    const skipTags = ['svg', 'path', 'circle', 'rect', 'line', 'polygon', 'polyline', 'ellipse', 'g', 'defs', 'use', 'symbol', 'marker', 'pattern', 'clippath', 'mask', 'script', 'style', 'noscript', 'meta', 'link', 'base', 'title', 'head', 'html']
    if (skipTags.includes(tagName)) return false
    
    // Skip very small elements (likely decorative dots, icons, etc.)
    const rect = el.getBoundingClientRect()
    if (rect.width < 8 || rect.height < 8) return false
    
    // Skip elements with only special characters or single characters
    if (text.length === 1 && !/[a-zA-ZÀ-ÿĀ-žА-я0-9]/.test(text)) return false
    
    // Important: Allow all elements that made it this far
    // This ensures we capture ALL text content on the page
    return true
  })
}

/**
 * Enhanced language switch animation with pure fade-out and fade-in effect - Ultra Smooth
 */
export function enhancedLanguageSwitch(changeLanguage, options = {}) {
  const {
    duration = 0.6,     // Optimized duration for smooth fade effect
    stagger = 0.005,    // Fine stagger for elegant flow
    opacity = 0,        // Full fade out for cleaner transition
    yDistance = 20      // Distance for vertical movement
  } = options

  return new Promise((resolve) => {
    // Get all potential text elements with enhanced selection
    const selectors = getAggressiveTextSelectors()
    const allElements = []
    
    selectors.forEach(selector => {
      try {
        const found = document.querySelectorAll(selector)
        allElements.push(...Array.from(found))
      } catch {
        // Skip invalid selectors
      }
    })

    // Filter to only elements with visible text - enhanced filtering
    const textElements = filterTextElements(allElements)
    
    // Remove duplicates and sort by DOM order for consistent animation
    const uniqueElements = [...new Set(textElements)].sort((a, b) => {
      const position = a.compareDocumentPosition(b)
      return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    })

    if (uniqueElements.length === 0) {
      changeLanguage()
      resolve()
      return
    }

    console.log(`Animating ${uniqueElements.length} text elements for ultra-smooth language switch`)

    // Prepare elements for GPU acceleration
    gsap.set(uniqueElements, {
      willChange: 'transform, opacity',
      backfaceVisibility: 'hidden'
    })

    // Create timeline with ultra-smooth settings
    const tl = gsap.timeline({
      onComplete: () => {
        // Clean up GPU acceleration properties
        gsap.set(uniqueElements, {
          willChange: 'auto',
          backfaceVisibility: 'visible'
        })
        resolve()
      }
    })

    // Phase 1: Fade out and slide up
    tl.to(uniqueElements, {
      opacity: opacity,
      y: -yDistance,                 // Move up while fading out
      duration: duration * 0.5,      // Fade out duration
      ease: 'power2.out',            // Smooth easing for fade out
      stagger: {
        amount: Math.min(uniqueElements.length * stagger, 0.1),
        from: 'start',
        ease: 'power1.out'
      }
    })

    // Phase 2: Call language change function
    tl.call(changeLanguage)

    // Phase 3: Reset position for slide down (invisible, positioned above)
    tl.set(uniqueElements, {
      y: yDistance,                  // Position above for slide down
      opacity: 0
    })

    // Phase 4: Fade in and slide down
    tl.to(uniqueElements, {
      opacity: 1,
      y: 0,                          // Slide down to original position
      duration: duration * 0.6,      // Slightly longer fade in for smoothness
      ease: 'power2.out',            // Smooth easing for fade in
      stagger: {
        amount: Math.min(uniqueElements.length * stagger, 0.12),
        from: 'start',
        ease: 'power1.out'
      }
    })
  })
}

/**
 * Reduced motion version of language switch animation - Enhanced smoothness
 */
export function reducedMotionLanguageSwitch(changeLanguage, options = {}) {
  const {
    duration = 0.4,
    opacity = 0.3,      // Subtle fade for accessibility
    yDistance = 10      // Minimal distance for reduced motion
  } = options

  return new Promise((resolve) => {
    const selectors = getAggressiveTextSelectors()
    const allElements = []
    
    selectors.forEach(selector => {
      try {
        const found = document.querySelectorAll(selector)
        allElements.push(...Array.from(found))
      } catch {
        // Skip invalid selectors
      }
    })

    const textElements = filterTextElements(allElements)
    const uniqueElements = [...new Set(textElements)]

    if (uniqueElements.length === 0) {
      changeLanguage()
      resolve()
      return
    }

    // Prepare for GPU acceleration even in reduced motion
    gsap.set(uniqueElements, {
      willChange: 'transform, opacity'
    })

    // Simple fade and slide animation for reduced motion
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(uniqueElements, {
          willChange: 'auto'
        })
        resolve()
      }
    })

    // Subtle fade out and slide up
    tl.to(uniqueElements, {
      opacity: opacity,
      y: -yDistance,                 // Minimal upward movement
      duration: duration * 0.6,
      ease: 'power2.out'
    })

    // Change language
    tl.call(changeLanguage)

    // Reset position for slide down
    tl.set(uniqueElements, {
      y: yDistance,                  // Position for minimal slide down
      opacity: opacity
    })

    // Subtle fade in and slide down
    tl.to(uniqueElements, {
      opacity: 1,
      y: 0,                          // Slide down to original position
      duration: duration * 0.8,
      ease: 'power2.out'
    })
  })
}

/**
 * Reset interactive components after language switch animation
 * Ensures cursor, scroll progress, and other animations work correctly
 */
export function resetInteractiveComponents() {
  // Reset GSAP transforms on interactive elements that shouldn't be animated
  const interactiveSelectors = [
    '.magnetic-cursor',
    '[data-cursor]',
    '[data-magnetic]',
    '.scroll-progress',
    '.nav-indicator', 
    '.section-progress',
    '.role-animations',
    '[class*="cursor"]',
    '[class*="progress"]',
    '[class*="indicator"]',
    // Also reset any SVG elements that might have been affected
    'svg, path, circle, rect, line, polygon',
    // Reset any canvas or interactive elements
    'canvas, video, audio, iframe',
    // Reset any elements with transform animations that aren't text
    '[style*="transform"]:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(p):not(span):not(div):not(a):not(button)'
  ]
  
  interactiveSelectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => {
        // Only reset if it's not a text element that should keep its animation
        const isTextElement = el.tagName && ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'DIV', 'SMALL', 'STRONG', 'EM'].includes(el.tagName)
        if (!isTextElement || el.closest('.magnetic-cursor') || el.hasAttribute('data-cursor') || el.hasAttribute('data-magnetic')) {
          gsap.set(el, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: '',
            clearProps: 'transform,opacity,willChange,backfaceVisibility,perspective'
          })
        }
      })
    } catch {
      // Skip invalid selectors
    }
  })
  
  // Force refresh of scroll-triggered animations
  if (window.ScrollTrigger) {
    setTimeout(() => {
      window.ScrollTrigger.refresh()
    }, 50)
  }
}
