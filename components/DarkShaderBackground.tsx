'use client'

import { useEffect, useRef } from 'react'

export function DarkShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollProgress = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 w-full h-full overflow-hidden"
      style={{
        background: `
          linear-gradient(
            135deg,
            #0a0a0a 0%,
            #0f0f0f 25%,
            #0a0a0a 50%,
            #050505 75%,
            #0a0a0a 100%
          )
        `,
      }}
    >
      {/* Scroll-linked color overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(
            circle at 50% ${50 + scrollProgress.current * 50}%,
            rgba(${Math.round(102 + scrollProgress.current * 30)}, ${Math.round(26 + scrollProgress.current * 20)}, ${Math.round(20 + scrollProgress.current * 15)}, ${0.08 + scrollProgress.current * 0.07}),
            transparent
          )`,
        }}
      />

      {/* Subtle accent overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse at 50% ${30 - scrollProgress.current * 30}%,
            rgba(13, 51, 64, ${0.05 + scrollProgress.current * 0.04}),
            transparent
          )`,
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
