import { useEffect, useMemo, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { setLanguage } from '../lib/i18n/index.js'
import { enhancedLanguageSwitch, reducedMotionLanguageSwitch, resetInteractiveComponents } from '../lib/i18n/textAnimations.js'
import useReducedMotion from '../lib/anim/useReducedMotion'

export default function LanguageSwitch() {
  const { i18n, t } = useTranslation()
  const [lang, setLang] = useState(i18n.language?.slice(0,2) === 'hu' ? 'hu' : 'en')
  const [isAnimating, setIsAnimating] = useState(false)
  const reduced = useReducedMotion()
  const buttonRef = useRef(null)

  // Keep local state in sync if i18n changes elsewhere
  useEffect(() => {
    const onChanged = (lng) => setLang(lng.slice(0,2) === 'hu' ? 'hu' : 'en')
    i18n.on('languageChanged', onChanged)
    return () => i18n.off('languageChanged', onChanged)
  }, [i18n])

  const labels = useMemo(() => ({ en: t('lang.en', 'EN'), hu: t('lang.hu', 'HU') }), [t])

  const toggle = async () => {
    if (isAnimating) return
    
    const next = lang === 'en' ? 'hu' : 'en'
    
    setIsAnimating(true)
    
    try {
      // Add loading state to button
      if (buttonRef.current) {
        buttonRef.current.style.opacity = '0.7'
        buttonRef.current.style.pointerEvents = 'none'
      }
      
      // Choose animation based on reduced motion preference
      if (reduced) {
        await reducedMotionLanguageSwitch(() => setLanguage(next))
      } else {
        // Ultra-smooth slide-up-out and slide-back-in animation
        await enhancedLanguageSwitch(
          () => setLanguage(next),
          {
            duration: 0.8,       // Longer for maximum smoothness
            stagger: 0.006,      // Very fine stagger for fluid motion
            yDistance: 26,       // Optimized distance
            opacity: 0,          // Complete fade out
            scale: 1             // Pure slide effect, no scaling
          }
        )
      }
    } catch (error) {
      console.error('Language switch animation failed:', error)
      // Fallback to immediate change
      setLanguage(next)
    } finally {
      setIsAnimating(false)
      
      // Restore button state
      if (buttonRef.current) {
        buttonRef.current.style.opacity = ''
        buttonRef.current.style.pointerEvents = ''
      }
      
      // Force refresh of interactive components after language switch
      // This ensures cursor, scroll progress, and role animations work correctly
      setTimeout(() => {
        // Reset any transforms that might have been applied to interactive elements
        resetInteractiveComponents()
        
        // Trigger scroll event to refresh scroll-dependent components
        window.dispatchEvent(new Event('scroll'))
        
        // Trigger resize to refresh layout-dependent components
        window.dispatchEvent(new Event('resize'))
        
        // Force recalculation of any GSAP-based scroll triggers
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh()
        }
      }, 100)
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={lang === 'en' ? 'Switch language to Hungarian' : 'Váltás angol nyelvre'}
      onClick={toggle}
      disabled={isAnimating}
      className="relative inline-flex items-center border border-white/20 hover:border-white/40 rounded-[var(--radius-md)] px-2 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 disabled:opacity-70"
      data-magnetic="0.15"
      data-cursor-text="Lang"
    >
      <span className="relative h-5 w-10 overflow-hidden">
        <span
          className="absolute inset-0 grid place-items-center transition-transform duration-300"
          style={{ transform: lang === 'en' ? 'translateY(0%)' : 'translateY(-100%)' }}
        >
          <span className="text-xs tabular-nums tracking-wide">{labels.en}</span>
        </span>
        <span
          className="absolute inset-0 grid place-items-center transition-transform duration-300"
          style={{ transform: lang === 'en' ? 'translateY(100%)' : 'translateY(0%)' }}
        >
          <span className="text-xs tabular-nums tracking-wide">{labels.hu}</span>
        </span>
      </span>
      
      {/* Loading indicator */}
      {isAnimating && (
        <div className="absolute -top-1 -right-1 w-3 h-3 border border-white/40 border-t-transparent rounded-full animate-spin" />
      )}
    </button>
  )
}
