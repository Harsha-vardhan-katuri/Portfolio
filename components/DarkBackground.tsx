'use client'

import { useEffect, useRef, useState } from 'react'

export function DarkBackground() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
      
      {/* Scroll-linked color overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(
            circle at 50% ${50 + scrollProgress * 50}%,
            rgba(${Math.round(102 + scrollProgress * 30)}, ${Math.round(26 + scrollProgress * 20)}, ${Math.round(20 + scrollProgress * 15)}, ${0.08 + scrollProgress * 0.07}),
            transparent
          )`,
        }}
      />
      
      {/* Subtle accent overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse at 50% ${30 - scrollProgress * 30}%,
            rgba(13, 51, 64, ${0.05 + scrollProgress * 0.04}),
            transparent
          )`,
        }}
      />
    </div>
  )
}
