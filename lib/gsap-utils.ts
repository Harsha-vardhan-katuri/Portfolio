import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * Custom easing function for luxury motion
 * Creates organic, expensive-feeling movement
 * Matches cubic-bezier(0.23, 1, 0.32, 1)
 */
export const LUXURY_EASING = 'power1.inOut'

/**
 * Custom cubic-bezier easing (0.23, 1, 0.32, 1)
 * Registered as a custom ease in GSAP
 */
gsap.registerEase('luxury', (progress: number) => {
  // Cubic-bezier approximation: (0.23, 1, 0.32, 1)
  const t = progress
  const t2 = t * t
  const t3 = t2 * t

  // Bezier calculation
  const p0 = 0
  const p1 = 0.23
  const p2 = 1
  const p3 = 1

  const mt = 1 - t
  const mt2 = mt * mt
  const mt3 = mt2 * mt

  const q1y = 1
  const q2y = 0.32

  return (
    mt3 * p0 +
    3 * mt2 * t * q1y +
    3 * mt * t2 * q2y +
    t3 * p3
  )
})

/**
 * Refresh ScrollTrigger for dynamic content
 * Use after DOM updates
 */
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh()
}

/**
 * Kill all GSAP animations and ScrollTriggers
 * Useful for cleanup on unmount
 */
export const killAllAnimations = () => {
  gsap.killTweensOf('*')
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

/**
 * Create a staggered text animation with ScrollTrigger
 * @param element - Target element containing text
 * @param duration - Animation duration in seconds
 * @param delay - Delay between character animations
 */
export const createStaggeredTextAnimation = (
  element: HTMLElement | null,
  duration: number = 1,
  delay: number = 0.05
) => {
  if (!element) return null

  const chars = element.querySelectorAll('[data-char]')
  if (chars.length === 0) return null

  return gsap.to(chars, {
    opacity: 1,
    duration,
    delay: gsap.utils.stagger(delay),
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 20%',
      scrub: false,
      markers: false,
    },
    ease: 'luxury',
  })
}

/**
 * Create a reveal animation with ScrollTrigger
 * @param element - Target element to reveal
 * @param duration - Animation duration
 */
export const createRevealAnimation = (
  element: HTMLElement | null,
  duration: number = 1
) => {
  if (!element) return null

  return gsap.to(element, {
    opacity: 1,
    duration,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 0.5,
      markers: false,
    },
    ease: 'luxury',
  })
}

/**
 * Create parallax effect for images
 * @param element - Target element
 * @param scale - Scale range [min, max]
 * @param offset - Parallax offset amount
 */
export const createParallaxAnimation = (
  element: HTMLElement | null,
  scale: [number, number] = [0.9, 1],
  offset: number = 50
) => {
  if (!element) return null

  return gsap.to(element, {
    y: offset,
    scale: scale[1],
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'top center',
      scrub: 1,
      markers: false,
    },
    ease: 'none',
  })
}

/**
 * Setup RAF-optimized scroll animation callback
 * Ensures 60fps performance with requestAnimationFrame
 */
export const setupRAFOptimizedScroll = (callback: (progress: number) => void) => {
  let animationFrameId: number | null = null
  let lastProgress = 0

  const update = () => {
    const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    
    if (Math.abs(progress - lastProgress) > 0.001) {
      callback(progress)
      lastProgress = progress
    }

    animationFrameId = requestAnimationFrame(update)
  }

  animationFrameId = requestAnimationFrame(update)

  return () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
  }
}

/**
 * Get scroll-based animation timeline
 * Useful for complex multi-element animations
 */
export const createScrollTimeline = (trigger: HTMLElement | null) => {
  if (!trigger) return null

  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
      markers: false,
    },
  })
}
