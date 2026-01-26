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
    if (!ringRef.current || lettersRef.current.length === 0) return

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 2 } })

    // 1. Scale the Ring in
    tl.to(ringRef.current, { opacity: 1, scale: 1.2, duration: 2.5 }, 0)

    // 2. Letters flying in from different directions
    lettersRef.current.forEach((letter, index) => {
      if (!letter) return

      const offsetX = (index - Math.floor(lettersRef.current.length / 2)) * 150
      const offsetY = (index % 2 === 0 ? -1 : 1) * 200

      tl.fromTo(
        letter,
        { x: offsetX - 300 + index * 100, y: offsetY - 100, opacity: 0, filter: 'blur(15px)' },
        { x: 0, y: 0, opacity: 1, filter: 'blur(0px)' },
        0.1 + index * 0.1
      )
    })
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Logo Container */}
      <div className="flex gap-6 md:gap-8 lg:gap-10 relative z-10">
        {text.split('').map((letter, index) => (
          <span
            key={index}
            ref={(el) => {
              if (el) lettersRef.current[index] = el
            }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white opacity-0"
            style={{
              letterSpacing: '10px',
              filter: 'blur(15px)',
              textShadow: '0 0 20px rgba(0, 85, 255, 0.3)',
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  )
}
