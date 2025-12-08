import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function InfiniteMarquee({
    items = [],
    speed = 50,
    direction = 'left',
    className = ""
}) {
    const containerRef = useRef(null)
    const scrollerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current || !scrollerRef.current) return

        const scrollerContent = Array.from(scrollerRef.current.children)

        // Duplicate content to ensure seamless loop
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true)
            duplicatedItem.setAttribute('aria-hidden', true)
            scrollerRef.current.appendChild(duplicatedItem)
        })

        // GSAP Animation
        const totalWidth = scrollerRef.current.scrollWidth / 2 // Original width
        const duration = totalWidth / speed

        const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } })

        if (direction === 'left') {
            tl.to(scrollerRef.current, {
                x: -totalWidth,
                duration: duration
            })
        } else {
            // Start from -totalWidth and go to 0 for right direction
            gsap.set(scrollerRef.current, { x: -totalWidth })
            tl.to(scrollerRef.current, {
                x: 0,
                duration: duration
            })
        }

        return () => {
            tl.kill()
        }
    }, [items, speed, direction])

    return (
        <div
            ref={containerRef}
            className={`relative z-20 max-w-7xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] ${className}`}
        >
            <div
                ref={scrollerRef}
                className="flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap"
            >
                {items.map((item, idx) => (
                    <div key={idx} className="relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]">
                        {typeof item === 'string' ? (
                            <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500 uppercase tracking-tighter">
                                {item}
                            </span>
                        ) : item}
                    </div>
                ))}
            </div>
        </div>
    )
}
