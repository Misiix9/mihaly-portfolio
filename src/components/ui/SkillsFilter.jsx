import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import useReducedMotion from '../../lib/anim/useReducedMotion'

export default function SkillsFilter({ categories, activeFilter, onFilterChange }) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const indicatorRef = useRef(null)
  const filtersRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // All filter options
  const filterOptions = [
    { id: 'all', label: t('skills.filter.all') },
    ...categories.map(cat => ({ id: cat.id, label: cat.title }))
  ]

  // Animate active indicator
  useEffect(() => {
    if (reduced || !indicatorRef.current || !filtersRef.current) return

    const activeButton = filtersRef.current.children[activeIndex]
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton
      
      gsap.to(indicatorRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }, [activeIndex, reduced])

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
        {/* Active indicator */}
        <div 
          ref={indicatorRef}
          className="absolute top-2 h-10 bg-white/10 rounded-lg border border-white/20 transition-all duration-300"
          style={{ 
            width: '0px',
            transform: 'translateX(0px)'
          }}
        />
        
        {filterOptions.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleFilterChange(option.id, index)}
            className={`
              relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${activeFilter === option.id 
                ? 'text-white' 
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
