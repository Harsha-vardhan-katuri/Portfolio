'use client'

import { useEffect, useRef, ReactNode } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionRevealProps {
  children: ReactNode
  className?: string
  duration?: number
  delay?: number
}

/**
 * SectionReveal component
 * Reveals entire section with smooth fade and scale animation
 * Optimized with will-change for GPU acceleration
 */
export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  duration = 1,
  delay = 0,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Set initial state
    gsap.set(sectionRef.current, {
      opacity: 0,
      scale: 0.95,
      willChange: 'transform, opacity',
    })

    // Animate in on scroll
    gsap.to(sectionRef.current, {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: false,
        markers: false,
      },
      onComplete: () => {
        if (sectionRef.current) {
          sectionRef.current.style.willChange = 'auto'
        }
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
      gsap.killTweensOf(sectionRef.current)
    }
  }, [duration, delay])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}

export default SectionReveal
