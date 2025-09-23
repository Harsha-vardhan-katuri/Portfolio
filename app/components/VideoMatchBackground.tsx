"use client"

import { useEffect, useRef } from "react"

interface VideoMatchBackgroundProps {
  activeSection: string
}

export default function VideoMatchBackground({ activeSection }: VideoMatchBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Exact colors from video - bright contrasts
    const sectionColors = {
      home: ["#FFFFFF", "#000000", "#FF0000", "#FFFACD"], // White, Black, Red, Cream
      about: ["#FF6B35", "#FFFFFF", "#000000", "#FFFACD"],
      experience: ["#00FF00", "#FFFFFF", "#000000", "#FF0000"],
      skills: ["#FF1493", "#FFFFFF", "#FFFACD", "#000000"],
      projects: ["#00FFFF", "#FFFFFF", "#FF0000", "#000000"],
      education: ["#9400D3", "#FFFFFF", "#FFFACD", "#000000"],
      certifications: ["#4169E1", "#FFFFFF", "#FF6B35", "#FFFACD"],
      hire: ["#FF0000", "#FFFFFF", "#FFFACD", "#000000"],
    }

    // Exact movement patterns matching video
    const getExactPattern = (section: string) => {
      const patterns = {
        home: {
          centerX: 0.5,
          centerY: 0.5,
          flowRadius: 0.25,
          particleCount: 35,
          speed: 0.4,
        },
        about: {
          centerX: 0.75,
          centerY: 0.25,
          flowRadius: 0.3,
          particleCount: 30,
          speed: 0.35,
        },
        experience: {
          centerX: 0.25,
          centerY: 0.35,
          flowRadius: 0.28,
          particleCount: 32,
          speed: 0.38,
        },
        skills: {
          centerX: 0.7,
          centerY: 0.7,
          flowRadius: 0.32,
          particleCount: 28,
          speed: 0.42,
        },
        projects: {
          centerX: 0.3,
          centerY: 0.75,
          flowRadius: 0.35,
          particleCount: 33,
          speed: 0.36,
        },
        education: {
          centerX: 0.8,
          centerY: 0.5,
          flowRadius: 0.27,
          particleCount: 31,
          speed: 0.39,
        },
        certifications: {
          centerX: 0.2,
          centerY: 0.2,
          flowRadius: 0.29,
          particleCount: 29,
          speed: 0.41,
        },
        hire: {
          centerX: 0.6,
          centerY: 0.4,
          flowRadius: 0.33,
          particleCount: 36,
          speed: 0.37,
        },
      }
      return patterns[section as keyof typeof patterns] || patterns.home
    }

    class VideoParticle {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      angle: number
      speed: number
      rotationSpeed: number
      opacity: number
      color: string
      shape: "circle" | "square" | "triangle"
      time: number
      orbitRadius: number
      orbitAngle: number
      pattern: any

      constructor(pattern: any, colors: string[]) {
        this.pattern = pattern

        // Base position - exact center point for section
        this.baseX = canvas.width * pattern.centerX
        this.baseY = canvas.height * pattern.centerY

        // Orbital setup - exactly like video
        this.orbitRadius = (Math.random() * 0.7 + 0.3) * Math.min(canvas.width, canvas.height) * pattern.flowRadius
        this.orbitAngle = Math.random() * Math.PI * 2

        // Initial position on orbit
        this.x = this.baseX + Math.cos(this.orbitAngle) * this.orbitRadius
        this.y = this.baseY + Math.sin(this.orbitAngle) * this.orbitRadius

        // Particle properties - matching video exactly
        this.size = Math.random() * 12 + 4 // 4-16px like video
        this.speed = pattern.speed * (Math.random() * 0.3 + 0.85) // Consistent with video speed
        this.rotationSpeed = (Math.random() - 0.5) * 0.02 // Slow rotation like video
        this.opacity = Math.random() * 0.6 + 0.4 // 0.4-1.0 opacity range
        this.color = colors[Math.floor(Math.random() * colors.length)]

        // Shape distribution like video
        const shapeRand = Math.random()
        if (shapeRand < 0.4) this.shape = "circle"
        else if (shapeRand < 0.7) this.shape = "square"
        else this.shape = "triangle"

        this.angle = 0
        this.time = Math.random() * Math.PI * 2
      }

      update() {
        // Exact orbital movement from video
        this.time += this.speed * 0.008 // Slower time progression
        this.angle += this.rotationSpeed

        // Complex orbital pattern exactly like video
        const primaryOrbit = this.time
        const secondaryOrbit = this.time * 1.3
        const tertiaryWave = this.time * 0.7

        // Multi-layered movement - exactly matching video flow
        const flowX =
          Math.cos(primaryOrbit) * this.orbitRadius * 0.8 +
          Math.cos(secondaryOrbit) * this.orbitRadius * 0.2 +
          Math.cos(tertiaryWave) * 15

        const flowY =
          Math.sin(primaryOrbit * 0.9) * this.orbitRadius * 0.6 +
          Math.sin(secondaryOrbit * 1.1) * this.orbitRadius * 0.3 +
          Math.sin(tertiaryWave * 1.2) * 12

        this.x = this.baseX + flowX
        this.y = this.baseY + flowY

        // Boundary wrapping - exactly like video
        const margin = this.size * 2
        if (this.x < -margin) this.x = canvas.width + margin
        if (this.x > canvas.width + margin) this.x = -margin
        if (this.y < -margin) this.y = canvas.height + margin
        if (this.y > canvas.height + margin) this.y = -margin

        // Opacity pulsing - subtle like video
        this.opacity = 0.5 + Math.sin(this.time * 1.5) * 0.3
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.globalAlpha = this.opacity

        // Exact drawing style from video
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color
        ctx.lineWidth = 1.5

        switch (this.shape) {
          case "circle":
            ctx.beginPath()
            ctx.arc(0, 0, this.size, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            break

          case "square":
            const half = this.size
            ctx.fillRect(-half, -half, half * 2, half * 2)
            ctx.strokeRect(-half, -half, half * 2, half * 2)
            break

          case "triangle":
            ctx.beginPath()
            ctx.moveTo(0, -this.size)
            ctx.lineTo(-this.size * 0.866, this.size * 0.5)
            ctx.lineTo(this.size * 0.866, this.size * 0.5)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
            break
        }

        ctx.restore()
      }
    }

    let particles: VideoParticle[] = []
    let currentSection = activeSection

    const initParticles = () => {
      particles = []
      const pattern = getExactPattern(currentSection)
      const colors = sectionColors[currentSection as keyof typeof sectionColors] || sectionColors.home

      // Exact particle count from video
      for (let i = 0; i < pattern.particleCount; i++) {
        particles.push(new VideoParticle(pattern, colors))
      }
    }

    const animate = () => {
      // Clear with exact black background like video
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Section change detection
      if (currentSection !== activeSection) {
        currentSection = activeSection
        initParticles()
      }

      // Update and draw all particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    initParticles()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [activeSection])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}
