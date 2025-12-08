import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../../lib/anim/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function TextReveal({
    children,
    className = "",
    delay = 0,
    duration = 1,
    stagger = 0.05,
    threshold = 0.5
}) {
    const containerRef = useRef(null)
    const reduced = useReducedMotion()
    const text = typeof children === 'string' ? children : ''

    useEffect(() => {
        if (reduced || !containerRef.current || !text) return

        const chars = containerRef.current.querySelectorAll('.char')

        gsap.fromTo(chars,
            {
                y: 50,
                opacity: 0,
                filter: 'blur(10px)',
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
                duration: duration,
                stagger: stagger,
                ease: 'power3.out',
                delay: delay,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: `top ${threshold * 100}%`,
                    toggleActions: 'play none none reverse'
                }
            }
        )

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [reduced, text, delay, duration, stagger, threshold])

    if (!text) return <div className={className}>{children}</div>

    if (reduced) {
        return <div className={className}>{children}</div>
    }

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`} aria-label={text}>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true" className="inline-block leading-[1.1]">
                {text.split('').map((char, index) => (
                    <span
                        key={index}
                        className="char inline-block"
                        style={{
                            willChange: 'transform, opacity, filter',
                            display: char === ' ' ? 'inline' : 'inline-block',
                            whiteSpace: 'pre'
                        }}
                    >
                        {char}
                    </span>
                ))}
            </span>
        </div>
    )
}
