'use client'

import { useRef, ReactNode, ButtonHTMLAttributes } from 'react'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

interface MagneticButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  magnetic?: boolean
  strength?: number
}

/**
 * MagneticButton component
 * Premium button with optional magnetic hover effect
 * Applies will-change optimization for smooth animations
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  magnetic = true,
  strength = 0.3,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Apply magnetic effect if enabled
  useMagneticEffect(buttonRef, {
    strength,
    ease: 'power2.out',
    speed: 0.6,
  })

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  // Variant classes
  const variantClasses = {
    primary:
      'bg-[var(--color-accent-primary)] text-[var(--color-bg)] hover:bg-[var(--color-accent-secondary)] font-semibold',
    secondary:
      'bg-[var(--color-bg-secondary)] text-[var(--color-fg)] border border-[var(--color-border)] hover:border-[var(--color-accent-primary)]',
    outline:
      'bg-transparent text-[var(--color-fg)] border-2 border-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-bg)]',
  }

  return (
    <button
      ref={buttonRef}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        relative
        rounded-lg
        font-[var(--font-sans)]
        font-medium
        transition-all
        duration-300
        ease-[var(--transition-smooth)]
        will-change-transform
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-accent-primary)]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[var(--color-bg)]
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default MagneticButton
