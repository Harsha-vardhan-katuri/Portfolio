'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import StaggeredText from './StaggeredText'
import MagneticButton from './MagneticButton'

/**
 * Hero component
 * Premium landing section with staggered text and magnetic buttons
 */
export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    // Animate hero background with subtle parallax
    gsap.set(heroRef.current, {
      willChange: 'transform, opacity',
    })

    // Create entrance animation timeline
    const timeline = gsap.timeline()

    // Animate content entrance
    timeline.from(contentRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
    })

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-secondary) 100%)`,
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-accent-primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[var(--color-accent-secondary)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        <div className="mb-6">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[var(--color-fg)] tracking-tighter mb-4">
            <StaggeredText
              text="Premium"
              className="block leading-tight"
              splitType="words"
              staggerDelay={0.15}
              duration={1}
              trigger="load"
            />
            <StaggeredText
              text="Digital Experiences"
              className="block leading-tight text-[var(--color-accent-primary)]"
              splitType="words"
              staggerDelay={0.15}
              duration={1}
              trigger="load"
            />
          </h1>
        </div>

        <p className="text-lg md:text-xl text-[var(--color-fg-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
          Crafted with meticulous attention to detail, where luxury meets innovation. Experience the future of digital design.
        </p>

        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton
            variant="primary"
            size="lg"
            magnetic={true}
            strength={0.4}
          >
            Explore Portfolio
          </MagneticButton>
          <MagneticButton
            variant="outline"
            size="lg"
            magnetic={true}
            strength={0.4}
          >
            Learn More
          </MagneticButton>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm text-[var(--color-fg-secondary)]">Scroll to explore</span>
          <svg
            className="w-5 h-5 text-[var(--color-accent-primary)]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero
