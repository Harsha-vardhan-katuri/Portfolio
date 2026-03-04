'use client'

import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react'
import Lenis from 'lenis'

interface LenisContextType {
  lenis: Lenis | null
}

const LenisContext = createContext<LenisContextType>({ lenis: null })

export const useLenis = () => {
  const context = useContext(LenisContext)
  if (!context) {
    throw new Error('useLenis must be used within a LenisProvider')
  }
  return context.lenis
}

interface LenisProviderProps {
  children: ReactNode
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    // Initialize Lenis with premium smooth scroll settings
    lenisRef.current = new Lenis({
      lerp: 0.1, // Heavy premium feel - low lerp for slower acceleration
      duration: 1.2, // Smooth duration
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: false,
      normalizeWheel: true,
    })

    /**
     * RAF-optimized animation loop for consistent 60fps performance
     * All scroll events and animations run within this single RAF callback
     * This prevents jittery animations and ensures smooth motion
     */
    const raf = (time: number) => {
      lenisRef.current?.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      lenisRef.current?.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  )
}
