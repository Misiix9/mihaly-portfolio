import { useEffect, useRef } from 'react'
import clsx from 'classnames'

export default function MagneticButton({
  children = 'Button',
  className,
  strength = 0.25, // 0..1, how strong the attraction is
  radius = 100,    // px, max distance to start attracting
  as = 'button',
  href,
  variant = 'primary',
  size = 'md',
  ...props
}) {
  const wrapperRef = useRef(null)
  const innerRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const wrap = wrapperRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist > radius) {
        reset()
        return
      }
      const pull = (1 - dist / radius) * strength
      const tx = dx * pull
      const ty = dy * pull
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        inner.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
      })
    }

    const reset = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        inner.style.transform = 'translate3d(0,0,0)'
      })
    }

    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', reset)
    return () => {
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', reset)
      cancelAnimationFrame(rafRef.current)
    }
  }, [radius, strength])

  const base = 'inline-flex items-center justify-center rounded-[var(--radius-md)] border transition-transform duration-200 will-change-transform'
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-5 text-base',
    lg: 'h-12 px-6 text-lg',
  }
  const variants = {
    primary: 'bg-white text-black border-transparent hover:bg-white/90',
    secondary: 'bg-[var(--bg-soft)] text-white border-[var(--border)] hover:bg-white/10',
    ghost: 'bg-transparent text-white border-[var(--border)] hover:bg-white/10',
  }

  const Comp = as === 'a' ? 'a' : 'button'

  return (
    <span ref={wrapperRef} className="inline-block">
      <Comp
        ref={innerRef}
        href={as === 'a' ? href : undefined}
        className={clsx(base, sizes[size], variants[variant], className)}
        {...props}
      >
        {children}
      </Comp>
    </span>
  )
}
