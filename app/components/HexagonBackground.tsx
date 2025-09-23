"use client"

import { useEffect, useRef } from "react"

export default function HexagonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Hexagon {
      x: number
      y: number
      size: number
      opacity: number
      speed: number
      angle: number
      rotationSpeed: number
      color: string
      time: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 40 + 20 // 20-60px hexagons
        this.opacity = Math.random() * 0.3 + 0.1 // 0.1-0.4 opacity
        this.speed = Math.random() * 0.5 + 0.2 // Slow movement
        this.angle = 0
        this.rotationSpeed = (Math.random() - 0.5) * 0.01 // Very slow rotation
        this.time = Math.random() * Math.PI * 2

        // Different shades of gray like Google's
        const grayShades = ["#2a2a2a", "#3a3a3a", "#4a4a4a", "#5a5a5a", "#6a6a6a"]
        this.color = grayShades[Math.floor(Math.random() * grayShades.length)]
      }

      update() {
        this.time += this.speed * 0.01
        this.angle += this.rotationSpeed

        // Gentle floating movement
        this.x += Math.sin(this.time) * 0.3
        this.y += Math.cos(this.time * 0.8) * 0.2

        // Wrap around screen edges
        if (this.x < -this.size) this.x = canvas.width + this.size
        if (this.x > canvas.width + this.size) this.x = -this.size
        if (this.y < -this.size) this.y = canvas.height + this.size
        if (this.y > canvas.height + this.size) this.y = -this.size

        // Subtle opacity pulsing
        this.opacity = 0.2 + Math.sin(this.time * 2) * 0.1
      }

      drawHexagon() {
        if (!ctx) return

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.globalAlpha = this.opacity

        // Draw hexagon
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          const x = Math.cos(angle) * this.size
          const y = Math.sin(angle) * this.size
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()

        // Fill hexagon
        ctx.fillStyle = this.color
        ctx.fill()

        // Add subtle border
        ctx.strokeStyle = this.color
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.restore()
      }
    }

    const hexagons: Hexagon[] = []

    // Create hexagon grid pattern like Google
    const createHexagons = () => {
      hexagons.length = 0
      const hexSize = 60
      const rows = Math.ceil(canvas.height / (hexSize * 0.75)) + 2
      const cols = Math.ceil(canvas.width / (hexSize * Math.sqrt(3))) + 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const hexagon = new Hexagon()

          // Position hexagons in honeycomb pattern
          hexagon.x = col * hexSize * Math.sqrt(3) + (row % 2) * ((hexSize * Math.sqrt(3)) / 2)
          hexagon.y = row * hexSize * 0.75

          // Add some randomness to break the perfect grid
          hexagon.x += (Math.random() - 0.5) * 20
          hexagon.y += (Math.random() - 0.5) * 20

          hexagons.push(hexagon)
        }
      }

      // Add some random floating hexagons
      for (let i = 0; i < 30; i++) {
        hexagons.push(new Hexagon())
      }
    }

    const animate = () => {
      // Clear with dark background like Google
      ctx.fillStyle = "#1a1a1a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw all hexagons
      hexagons.forEach((hexagon) => {
        hexagon.update()
        hexagon.drawHexagon()
      })

      requestAnimationFrame(animate)
    }

    createHexagons()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createHexagons()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}
