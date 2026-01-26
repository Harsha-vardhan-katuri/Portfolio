'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface GlowingRingAnimationProps {
  text?: string
  ringColor?: string
  glowColor?: string
}

export default function GlowingRingAnimation({
  text = 'HARSHA',
  ringColor = '#0055ff',
  glowColor = '#0044ff',
}: GlowingRingAnimationProps) {
  const ringRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (lettersRef.current.length === 0) return

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } })

    // Letters flying in from different directions
    lettersRef.current.forEach((letter, index) => {
      if (!letter) return

      const offsetX = (Math.random() - 0.5) * 400
      const offsetY = (Math.random() - 0.5) * 400

      tl.fromTo(
        letter,
        { x: offsetX, y: offsetY, opacity: 0, filter: 'blur(15px)' },
        { x: 0, y: 0, opacity: 1, filter: 'blur(0px)' },
        index * 0.05
      )
    })
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Logo Container - Responsive wrapping */}
      <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 relative z-10 justify-center">
        {text.split('').map((letter, index) => (
          <span
            key={index}
            ref={(el) => {
              if (el) lettersRef.current[index] = el
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white opacity-0 inline-block"
            style={{
              filter: 'blur(15px)',
              textShadow: '0 0 30px rgba(0, 85, 255, 0.5), 0 0 60px rgba(0, 170, 255, 0.3)',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
    </div>
  )
}
