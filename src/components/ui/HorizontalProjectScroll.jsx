import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../../lib/anim/useReducedMotion'
import ProjectCard from './ProjectCard'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalProjectScroll({ items, onOpenModal }) {
    const containerRef = useRef(null)
    const trackRef = useRef(null)
    const reduced = useReducedMotion()

    useEffect(() => {
        if (reduced || !containerRef.current || !trackRef.current) return

        const track = trackRef.current
        // const cards = track.children // Unused
        const totalWidth = track.scrollWidth
        const viewportWidth = window.innerWidth

        // Calculate scroll amount: total width - viewport width + padding
        const xMovement = -(totalWidth - viewportWidth + 100)

        // Create the horizontal scroll animation
        const scrollTween = gsap.to(track, {
            x: xMovement,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                start: 'top top',
                end: `+=${totalWidth}`, // Scroll amount proportional to content width
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        })

        return () => {
            scrollTween.kill()
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [reduced, items])

    if (reduced) {
        // Fallback for reduced motion: standard grid
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
                {items.map((project, idx) => (
                    <ProjectCard key={idx} project={project} onOpenModal={onOpenModal} />
                ))}
            </div>
        )
    }

    return (
        <div ref={containerRef} className="relative h-screen flex items-center overflow-hidden">
            {/* Helper text */}
            <div className="absolute top-8 left-8 z-10 text-white/50 text-sm uppercase tracking-widest flex items-center gap-2">
                <span className="w-8 h-px bg-white/30"></span>
                Scroll to Explore
            </div>

            <div
                ref={trackRef}
                className="flex gap-12 px-12 md:px-24 w-max items-center"
                style={{ willChange: 'transform' }}
            >
                {items.map((project, idx) => (
                    <div key={idx} className="w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 transform transition-transform hover:scale-[1.02]">
                        <ProjectCard project={project} onOpenModal={onOpenModal} />
                    </div>
                ))}
            </div>
        </div>
    )
}
