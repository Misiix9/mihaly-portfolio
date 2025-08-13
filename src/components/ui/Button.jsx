import clsx from 'classnames'
import React, { forwardRef } from 'react'
import { useInteractiveEffect } from '../../lib/anim/useMicroInteractions'

const Button = forwardRef(function Button({
  as = 'button',
  href,
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  microInteractions = true,
  ...props
}, externalRef) {
  const interactiveRef = useInteractiveEffect({
    hover: microInteractions && !disabled && !loading,
    press: microInteractions && !disabled && !loading,
    ripple: microInteractions && !disabled && !loading,
    hoverOptions: {
      scale: variant === 'primary' ? 1.05 : 1.02,
      y: -2,
      brightness: variant === 'primary' ? 1.1 : 1.05,
      shadow: true,
      magnetic: variant === 'primary',
      magnetStrength: 0.15,
    },
    pressOptions: {
      scale: 0.96,
      haptic: true,
    },
    rippleOptions: {
      color: variant === 'primary' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)',
    },
  })

  // Use external ref if provided, otherwise use internal ref
  const ref = externalRef || interactiveRef

  const base = 'relative inline-flex items-center justify-center rounded-[var(--radius-md)] border transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 overflow-hidden'

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-5 text-base',
    lg: 'h-12 px-6 text-lg',
  }

  const variants = {
    primary: 'bg-white text-black border-transparent hover:bg-gray-50 hover:shadow-lg font-semibold',
    secondary: 'bg-gray-800/90 text-white border-gray-600 hover:bg-gray-700/90 hover:border-gray-500 font-medium',
    ghost: 'bg-transparent text-gray-200 border-gray-600 hover:bg-white/10 hover:border-gray-400 hover:text-white font-medium',
  }

  const states = {
    loading: 'cursor-wait opacity-70',
    disabled: 'cursor-not-allowed opacity-50',
  }

  const Comp = as === 'a' ? 'a' : 'button'

  return (
    <Comp
      ref={ref}
      href={as === 'a' ? href : undefined}
      disabled={disabled || loading}
      className={clsx(
        base,
        sizes[size],
        variants[variant],
        loading && states.loading,
        disabled && states.disabled,
        className
      )}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Button content */}
      <span className={clsx('flex items-center gap-2', loading && 'opacity-0')}>
        {children}
      </span>

      {/* Subtle background shine effect for primary buttons */}
      {variant === 'primary' && !disabled && !loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </Comp>
  )
})

export default Button
