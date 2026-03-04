import { useEffect, useRef, MutableRefObject } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationConfig {
  start?: string
  end?: string
  scrub?: number | boolean
  markers?: boolean
  ease?: string
  duration?: number
}

/**
 * Hook for scroll-triggered animations with GSAP
 * Integrates with RAF loop for smooth 60fps performance
 * Automatically cleans up animations on unmount
 */
export const useScrollAnimation = (
  elementRef: MutableRefObject<HTMLElement | null>,
  fromState: Record<string, any>,
  toState: Record<string, any>,
  config: ScrollAnimationConfig = {}
) => {
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const {
      start = 'top 80%',
      end = 'top 20%',
      scrub = false,
      markers = false,
      ease = 'power1.out',
      duration = 1,
    } = config

    // Kill previous animation
    animationRef.current?.kill()
    scrollTriggerRef.current?.kill()

    // Create new animation with ScrollTrigger
    animationRef.current = gsap.fromTo(
      elementRef.current,
      fromState,
      {
        ...toState,
        duration,
        ease,
        scrollTrigger: {
          trigger: elementRef.current,
          start,
          end,
          scrub,
          markers,
          onUpdate: () => {
            // Force GPU acceleration with will-change
            if (elementRef.current) {
              elementRef.current.style.willChange = 'transform'
            }
          },
          onComplete: () => {
            if (elementRef.current) {
              elementRef.current.style.willChange = 'auto'
            }
          },
        },
      }
    )

    scrollTriggerRef.current = ScrollTrigger.getById(
      elementRef.current.id || ''
    )

    return () => {
      animationRef.current?.kill()
      scrollTriggerRef.current?.kill()
    }
  }, [elementRef, fromState, toState, config])
}

/**
 * Hook for scroll position tracking with RAF optimization
 * Prevents jittery updates by batching within RAF
 */
export const useScrollProgress = (
  callback: (progress: number) => void
) => {
  const rafIdRef = useRef<number | null>(null)
  const lastProgressRef = useRef(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0

      // Only update if progress has changed significantly
      if (Math.abs(scrollProgress - lastProgressRef.current) > 0.001) {
        callback(scrollProgress)
        lastProgressRef.current = scrollProgress
      }

      rafIdRef.current = requestAnimationFrame(updateProgress)
    }

    rafIdRef.current = requestAnimationFrame(updateProgress)

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [callback])
}

/**
 * Hook for parallax effects with scroll
 * Creates smooth scale and position transforms
 */
export const useParallax = (
  elementRef: MutableRefObject<HTMLElement | null>,
  {
    scaleRange = [0.9, 1],
    yOffset = 50,
    speed = 0.5,
  } = {}
) => {
  useEffect(() => {
    if (!elementRef.current) return

    gsap.to(elementRef.current, {
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top bottom',
        end: 'top center',
        scrub: speed,
        markers: false,
      },
      scale: scaleRange[1],
      y: -yOffset,
      ease: 'none',
      willChange: 'transform',
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === elementRef.current) {
          trigger.kill()
        }
      })
    }
  }, [elementRef, scaleRange, yOffset, speed])
}
