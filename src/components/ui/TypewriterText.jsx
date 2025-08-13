import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

// Register the TextPlugin
gsap.registerPlugin(TextPlugin)

export default function TypewriterText({ 
  texts = [], 
  speed = 50, 
  delay = 1000, 
  loop = true,
  className = '',
  onComplete = null,
  cursor = true,
  cursorChar = '|'
}) {
  const textRef = useRef(null)
  const cursorRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    if (!texts.length || !textRef.current) return

    const element = textRef.current
    const cursorElement = cursorRef.current

    // Create master timeline
    const tl = gsap.timeline({ 
      repeat: loop ? -1 : 0,
      onComplete: onComplete 
    })

    // Cursor blinking animation
    if (cursor && cursorElement) {
      gsap.to(cursorElement, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }

    texts.forEach((text, index) => {
      // Type in effect
      tl.to(element, {
        duration: text.length * (speed / 1000),
        text: text,
        ease: 'none'
      })
      
      // Pause between texts
      if (index < texts.length - 1) {
        tl.to({}, { duration: delay / 1000 })
        
        // Type out effect (erase)
        tl.to(element, {
          duration: text.length * (speed / 2000), // Faster erase
          text: '',
          ease: 'none'
        })
        
        // Short pause before next text
        tl.to({}, { duration: 0.3 })
      }
    })

    timelineRef.current = tl

    return () => {
      tl.kill()
    }
  }, [texts, speed, delay, loop, onComplete, cursor])

  return (
    <span className={`inline-block ${className}`}>
      <span ref={textRef} />
      {cursor && (
        <span 
          ref={cursorRef}
          className="inline-block ml-1 text-white/80"
          style={{ fontWeight: 'inherit' }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  )
}
