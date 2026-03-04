'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

interface StaggeredTextProps {
  text: string
  className?: string
  splitType?: 'lines' | 'words' | 'chars'
  staggerDelay?: number
  duration?: number
  trigger?: 'scroll' | 'load'
}

/**
 * StaggeredText component
 * Creates premium text animations with SplitType and GSAP
 * Words emerge as you scroll with customizable stagger effects
 */
export const StaggeredText: React.FC<StaggeredTextProps> = ({
  text,
  className = '',
  splitType = 'words',
  staggerDelay = 0.1,
  duration = 0.8,
  trigger = 'scroll',
}) => {
  const textRef = useRef<HTMLDivElement>(null)
  const splitRef = useRef<SplitType | null>(null)

  useEffect(() => {
    if (!textRef.current) return

    // Create split text
    splitRef.current = new SplitType(textRef.current, {
      types: splitType,
    })

    const chars = textRef.current.querySelectorAll('[data-char]')

    if (trigger === 'scroll') {
      // Scroll-triggered animation
      gsap.to(chars, {
        opacity: 1,
        duration,
        delay: gsap.utils.stagger(staggerDelay),
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: false,
          markers: false,
        },
        willChange: 'opacity',
      })
    } else {
      // Load-triggered animation
      gsap.from(chars, {
        opacity: 0,
        duration,
        delay: gsap.utils.stagger(staggerDelay),
        ease: 'power2.out',
        willChange: 'opacity',
      })
    }

    return () => {
      if (splitRef.current) {
        splitRef.current.revert()
      }
      gsap.killTweensOf(chars)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [text, splitType, staggerDelay, duration, trigger])

  return (
    <div
      ref={textRef}
      className={`${className} inline-block`}
      style={{
        '--data-text': text,
      } as React.CSSProperties}
    >
      {text}
    </div>
  )
}

export default StaggeredText
