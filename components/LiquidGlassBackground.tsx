'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function LiquidGlassBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      containerRef.current.style.setProperty('--mouse-x', `${clientX}px`)
      containerRef.current.style.setProperty('--mouse-y', `${clientY}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
      } as React.CSSProperties}
    >
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />

      {/* Animated liquid glass orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent)',
          top: '-10%',
          left: '10%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)',
          bottom: '10%',
          right: '5%',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent)',
          top: '50%',
          right: '20%',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl opacity-5" />
    </div>
  )
}
