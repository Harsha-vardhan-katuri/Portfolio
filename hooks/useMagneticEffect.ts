import { useEffect, useRef, MutableRefObject } from 'react'
import gsap from 'gsap'

interface MagneticConfig {
  strength?: number // How far the element follows the cursor
  ease?: string
  speed?: number // GSAP duration
}

/**
 * Magnetic hover effect hook
 * Makes elements follow the cursor with a smooth, magnetic feel
 * Uses GPU-accelerated transforms for 60fps performance
 */
export const useMagneticEffect = (
  elementRef: MutableRefObject<HTMLElement | null>,
  config: MagneticConfig = {}
) => {
  const timelineRef = useRef<gsap.core.Tween | null>(null)
  const mouseXRef = useRef(0)
  const mouseYRef = useRef(0)

  const {
    strength = 0.3,
    ease = 'power2.out',
    speed = 0.8,
  } = config

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Initial position
    element.style.willChange = 'transform'
    element.style.position = 'relative'

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const elementCenterX = rect.left + rect.width / 2
      const elementCenterY = rect.top + rect.height / 2

      // Calculate distance from cursor to element center
      const distX = (e.clientX - elementCenterX) * strength
      const distY = (e.clientY - elementCenterY) * strength

      // Kill previous animation
      timelineRef.current?.kill()

      // Animate to new position with GPU acceleration
      timelineRef.current = gsap.to(element, {
        x: distX,
        y: distY,
        duration: speed,
        ease,
        overwrite: 'auto',
      })
    }

    const onMouseLeave = () => {
      // Kill animation and return to center
      timelineRef.current?.kill()

      gsap.to(element, {
        x: 0,
        y: 0,
        duration: speed,
        ease,
        overwrite: 'auto',
      })
    }

    element.addEventListener('mousemove', onMouseMove)
    element.addEventListener('mouseleave', onMouseLeave)

    return () => {
      element.removeEventListener('mousemove', onMouseMove)
      element.removeEventListener('mouseleave', onMouseLeave)
      timelineRef.current?.kill()
      element.style.willChange = 'auto'
    }
  }, [elementRef, strength, ease, speed])
}

/**
 * Advanced magnetic effect with cursor tracking
 * Creates a more pronounced luxury feel
 */
export const useCursorMagnetism = (
  elementRef: MutableRefObject<HTMLElement | null>,
  {
    attractRange = 100,
    strength = 0.4,
    speed = 0.6,
  } = {}
) => {
  const timelineRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.style.willChange = 'transform'
    element.style.position = 'relative'

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const elementCenterX = rect.left + rect.width / 2
      const elementCenterY = rect.top + rect.height / 2

      const distanceX = e.clientX - elementCenterX
      const distanceY = e.clientY - elementCenterY
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

      // Only apply effect if cursor is within attract range
      if (distance < attractRange) {
        const angle = Math.atan2(distanceY, distanceX)
        const pullX = Math.cos(angle) * (attractRange - distance) * strength
        const pullY = Math.sin(angle) * (attractRange - distance) * strength

        timelineRef.current?.kill()

        timelineRef.current = gsap.to(element, {
          x: pullX,
          y: pullY,
          duration: speed,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    }

    const onMouseLeave = () => {
      timelineRef.current?.kill()
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: speed,
        ease: 'power2.out',
      })
    }

    document.addEventListener('mousemove', onMouseMove)
    element.addEventListener('mouseleave', onMouseLeave)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      element.removeEventListener('mouseleave', onMouseLeave)
      timelineRef.current?.kill()
      element.style.willChange = 'auto'
    }
  }, [elementRef, attractRange, strength, speed])
}
