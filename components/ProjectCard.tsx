'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
}

/**
 * ProjectCard component
 * Portfolio project with parallax scale animation (0.9 → 1.0)
 * Optimized with will-change for GPU acceleration
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  link,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return

    // Set initial image scale
    gsap.set(imageRef.current, {
      scale: 0.9,
      willChange: 'transform',
    })

    // Create parallax scale animation
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 2,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom',
        end: 'center center',
        scrub: 1,
        markers: false,
      },
    })

    // Fade in card content
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        markers: false,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (
          trigger.vars.trigger === cardRef.current ||
          trigger.vars.trigger === contentRef.current
        ) {
          trigger.kill()
        }
      })
      gsap.killTweensOf([imageRef.current, contentRef.current])
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="group cursor-pointer rounded-xl overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent-primary)] transition-all duration-500"
    >
      {/* Image container with parallax */}
      <div className="relative h-72 overflow-hidden bg-[var(--color-border)]">
        <div
          ref={imageRef}
          className="w-full h-full bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] will-change-transform"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="p-6 lg:p-8"
      >
        <h3 className="text-2xl font-serif font-bold text-[var(--color-fg)] mb-3 group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">
          {title}
        </h3>

        <p className="text-[var(--color-fg-secondary)] mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block px-3 py-1 text-xs font-medium text-[var(--color-accent-primary)] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        {link && (
          <a
            href={link}
            className="inline-flex items-center gap-2 text-[var(--color-accent-primary)] font-medium hover:gap-4 transition-all duration-300"
          >
            View Project
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
