"use client"

import { useEffect, useRef } from "react"

interface DynamicBackgroundProps {
  activeSection: string
}

export default function DynamicBackground({ activeSection }: DynamicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Color schemes for different sections
    const colorSchemes = {
      home: ["#ffffff", "#000000", "#ff0000", "#ffff99"],
      about: ["#ff6b35", "#f7931e", "#ffff99", "#ffffff"],
      experience: ["#00ff00", "#32cd32", "#ffffff", "#000000"],
      skills: ["#ff1493", "#ff69b4", "#ffffff", "#ffff99"],
      projects: ["#00ffff", "#1e90ff", "#ffffff", "#ff0000"],
      education: ["#9400d3", "#8a2be2", "#ffffff", "#ffff99"],
      certifications: ["#4169e1", "#6495ed", "#ffffff", "#ff6b35"],
      hire: ["#ff0000", "#ff4500", "#ffffff", "#ffff99"],
    }

    // Movement patterns for different sections
    const getMovementPattern = (section: string) => {
      switch (section) {
        case "home":
          return { centerX: 0.5, centerY: 0.5, radiusX: 0.3, radiusY: 0.3 }
        case "about":
          return { centerX: 0.8, centerY: 0.2, radiusX: 0.4, radiusY: 0.4 }
        case "experience":
          return { centerX: 0.2, centerY: 0.3, radiusX: 0.35, radiusY: 0.35 }
        case "skills":
          return { centerX: 0.7, centerY: 0.7, radiusX: 0.4, radiusY: 0.3 }
        case "projects":
          return { centerX: 0.3, centerY: 0.8, radiusX: 0.45, radiusY: 0.4 }
        case "education":
          return { centerX: 0.8, centerY: 0.5, radiusX: 0.3, radiusY: 0.45 }
        case "certifications":
          return { centerX: 0.2, centerY: 0.2, radiusX: 0.4, radiusY: 0.35 }
        case "hire":
          return { centerX: 0.6, centerY: 0.4, radiusX: 0.5, radiusY: 0.5 }
        default:
          return { centerX: 0.5, centerY: 0.5, radiusX: 0.3, radiusY: 0.3 }
      }
    }

    class AnimatedShape {
      x: number
      y: number
      size: number
      speed: number
      angle: number
      rotationSpeed: number
      opacity: number
      color: string
      shape: "circle" | "square" | "triangle"
      time: number
      baseX: number
      baseY: number
      pattern: any

      constructor(pattern: any, colors: string[]) {
        this.pattern = pattern
        this.time = Math.random() * Math.PI * 2
        this.baseX = canvas.width * pattern.centerX
        this.baseY = canvas.height * pattern.centerY

        // Create orbital movement around the center point
        const orbitRadius = Math.random() * Math.min(canvas.width * pattern.radiusX, canvas.height * pattern.radiusY)
        const orbitAngle = Math.random() * Math.PI * 2

        this.x = this.baseX + Math.cos(orbitAngle) * orbitRadius
        this.y = this.baseY + Math.sin(orbitAngle) * orbitRadius

        this.size = Math.random() * 15 + 5
        this.speed = Math.random() * 0.8 + 0.3 // Slower speed
        this.angle = 0
        this.rotationSpeed = (Math.random() - 0.5) * 0.03
        this.opacity = Math.random() * 0.7 + 0.3
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.shape = ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle"
      }

      update() {
        this.time += this.speed * 0.01
        this.angle += this.rotationSpeed

        // Create flowing orbital movement
        const orbitRadius = Math.min(canvas.width * this.pattern.radiusX, canvas.height * this.pattern.radiusY) * 0.8
        const flowX = Math.cos(this.time) * orbitRadius * 0.6
        const flowY = Math.sin(this.time * 0.8) * orbitRadius * 0.4

        this.x = this.baseX + flowX + Math.cos(this.time * 2) * 20
        this.y = this.baseY + flowY + Math.sin(this.time * 1.5) * 15

        // Keep shapes within canvas bounds with wrapping
        if (this.x < -this.size) this.x = canvas.width + this.size
        if (this.x > canvas.width + this.size) this.x = -this.size
        if (this.y < -this.size) this.y = canvas.height + this.size
        if (this.y > canvas.height + this.size) this.y = -this.size

        // Subtle opacity pulsing
        this.opacity = 0.4 + Math.sin(this.time * 2) * 0.3
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.globalAlpha = this.opacity

        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color
        ctx.lineWidth = 2

        switch (this.shape) {
          case "circle":
            ctx.beginPath()
            ctx.arc(0, 0, this.size, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            break
          case "square":
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
            ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size)
            break
          case "triangle":
            ctx.beginPath()
            ctx.moveTo(0, -this.size / 2)
            ctx.lineTo(-this.size / 2, this.size / 2)
            ctx.lineTo(this.size / 2, this.size / 2)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
            break
        }

        ctx.restore()
      }
    }

    let shapes: AnimatedShape[] = []
    let currentSection = activeSection

    const initShapes = () => {
      shapes = []
      const pattern = getMovementPattern(currentSection)
      const colors = colorSchemes[currentSection as keyof typeof colorSchemes] || colorSchemes.home

      // Create fewer shapes for better performance
      for (let i = 0; i < 25; i++) {
        shapes.push(new AnimatedShape(pattern, colors))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Check if section changed
      if (currentSection !== activeSection) {
        currentSection = activeSection
        initShapes()
      }

      shapes.forEach((shape) => {
        shape.update()
        shape.draw()
      })

      requestAnimationFrame(animate)
    }

    initShapes()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initShapes()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [activeSection])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}
