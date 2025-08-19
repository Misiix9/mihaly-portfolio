import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import useReducedMotion from '../../lib/anim/useReducedMotion'

export default function SkillsFilter({ categories, activeFilter, onFilterChange }) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const indicatorRef = useRef(null)
  const filtersRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // All filter options - memoized to prevent re-creation
  const filterOptions = useMemo(() => [
    { id: 'all', label: t('skills.filter.all') },
    ...categories.map(cat => ({ id: cat.id, label: cat.title }))
  ], [t, categories])

  // Update activeIndex when activeFilter changes from parent
  useEffect(() => {
    const newIndex = filterOptions.findIndex(option => option.id === activeFilter)
    if (newIndex !== -1 && newIndex !== activeIndex) {
      setActiveIndex(newIndex)
    }
  }, [activeFilter, filterOptions, activeIndex])

  // Animate active indicator
  useEffect(() => {
    if (reduced || !indicatorRef.current || !filtersRef.current) return

    // Find the actual active button by matching the activeFilter ID
    const buttons = Array.from(filtersRef.current.children).filter(child => child.tagName === 'BUTTON')
    const activeButton = buttons[activeIndex]
    
    if (activeButton) {
      const containerRect = filtersRef.current.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      
      // Calculate position relative to container
      const offsetLeft = buttonRect.left - containerRect.left
      const offsetTop = buttonRect.top - containerRect.top
      
      gsap.to(indicatorRef.current, {
        x: offsetLeft,
        y: offsetTop,
        width: buttonRect.width,
        height: buttonRect.height,
        duration: 0.4,
        ease: 'power3.out'
      })
    }
  }, [activeIndex, reduced, activeFilter])

  const handleFilterChange = (filterId, index) => {
    setActiveIndex(index)
    onFilterChange(filterId)
  }

  return (
    <div className="relative">
      {/* Filter buttons container */}
      <div 
        ref={filtersRef}
        className="relative flex flex-wrap justify-center gap-2 p-2 rounded-xl glass-light border border-white/10"
      >
        {/* Active indicator - positioned behind text */}
        <div 
          ref={indicatorRef}
          className="absolute rounded-xl backdrop-blur-md transition-all duration-300 pointer-events-none z-0"
          style={{ 
            width: '0px',
            height: '0px',
            left: '0px',
            top: '0px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 4px 20px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        />
        
        {filterOptions.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleFilterChange(option.id, index)}
            className={`
              relative z-10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
              ${activeFilter === option.id 
                ? 'text-white font-semibold' 
                : 'text-white/60 hover:text-white/80'
              }
            `}
            data-magnetic="0.1"
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Skills count indicator */}
      <div className="text-center mt-3">
        <span className="text-xs text-hierarchy-secondary">
          {activeFilter === 'all' 
            ? `${categories.reduce((total, cat) => total + cat.items.length, 0)} skills total`
            : `${categories.find(cat => cat.id === activeFilter)?.items.length || 0} skills in category`
          }
        </span>
      </div>
    </div>
  )
}
