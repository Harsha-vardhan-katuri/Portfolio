"use client"

import { useEffect, useRef, useState } from "react"

export default function HexagonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class DarkHexagon {
      x: number
      y: number
      baseY: number
      size: number
      baseSize: number
      opacity: number
      baseOpacity: number
      color: string
      shadowColor: string
      isPressed: boolean
      pressOffset: number
      targetPressOffset: number
      floatOffset: number
      floatSpeed: number
      floatAmplitude: number
      time: number
      elevation: number

      constructor(x: number, y: number, size: number) {
        this.x = x
        this.y = y
        this.baseY = y
        this.size = size
        this.baseSize = size
        this.opacity = Math.random() * 0.3 + 0.7 // More visible
        this.baseOpacity = this.opacity
        this.isPressed = false
        this.pressOffset = 0
        this.targetPressOffset = 0

        // Floating animation
        this.floatOffset = 0
        this.floatSpeed = Math.random() * 0.015 + 0.008 // Slow gentle movement
        this.floatAmplitude = Math.random() * 6 + 3 // 3-9px movement
        this.time = Math.random() * Math.PI * 2
        this.elevation = Math.random() * 3 + 1 // Random elevation for 3D effect

        // Dark hexagon colors like in the image
        const darkHexColors = [
          "#2a2a2a", // Dark gray
          "#333333", // Medium dark gray
          "#3a3a3a", // Lighter dark gray
          "#404040", // Medium gray
          "#2e2e2e", // Dark charcoal
          "#363636", // Medium charcoal
          "#424242", // Light charcoal
          "#1e1e1e", // Very dark
        ]
        this.color = darkHexColors[Math.floor(Math.random() * darkHexColors.length)]
        this.shadowColor = "#000000" // Pure black shadows
      }

      checkPress(mouseX: number, mouseY: number) {
        const distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2)
        const wasPressed = this.isPressed
        this.isPressed = distance < this.size + 20

        if (this.isPressed && !wasPressed) {
          // Press DOWN deeper
          this.targetPressOffset = 6
        } else if (!this.isPressed && wasPressed) {
          // Release back up
          this.targetPressOffset = 0
        }
      }

      update() {
        // Update floating animation
        this.time += this.floatSpeed
        this.floatOffset = Math.sin(this.time) * this.floatAmplitude

        // Update Y position with floating
        this.y = this.baseY + this.floatOffset

        // Press animation
        this.pressOffset += (this.targetPressOffset - this.pressOffset) * 0.2

        if (this.isPressed) {
          this.size = this.baseSize * 0.95
          this.opacity = Math.min(this.baseOpacity * 1.2, 1)
        } else {
          this.size += (this.baseSize - this.size) * 0.15
          this.opacity += (this.baseOpacity - this.opacity) * 0.15
        }
      }

      drawHexagon() {
        if (!ctx) return

        const currentY = this.y + this.pressOffset

        // Draw shadow first (behind hexagon)
        ctx.save()
        ctx.translate(this.x + 2, currentY + 4) // Shadow offset
        ctx.globalAlpha = 0.4

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
        ctx.fillStyle = this.shadowColor
        ctx.fill()
        ctx.restore()

        // Draw main hexagon
        ctx.save()
        ctx.translate(this.x, currentY)
        ctx.globalAlpha = this.opacity

        // Create gradient for 3D effect
        const gradient = ctx.createRadialGradient(-this.size * 0.3, -this.size * 0.3, 0, 0, 0, this.size)

        // Lighter on top-left, darker on bottom-right (3D lighting)
        const baseColor = this.color
        const lightColor = this.lightenColor(baseColor, 20)
        const darkColor = this.darkenColor(baseColor, 30)

        gradient.addColorStop(0, lightColor)
        gradient.addColorStop(0.6, baseColor)
        gradient.addColorStop(1, darkColor)

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

        // Fill with gradient
        ctx.fillStyle = gradient
        ctx.fill()

        // Add border for definition
        ctx.strokeStyle = "#555555"
        ctx.lineWidth = 0.8
        ctx.stroke()

        ctx.restore()
      }

      // Helper functions for 3D lighting
      lightenColor(color: string, percent: number): string {
        const num = Number.parseInt(color.replace("#", ""), 16)
        const amt = Math.round(2.55 * percent)
        const R = (num >> 16) + amt
        const G = ((num >> 8) & 0x00ff) + amt
        const B = (num & 0x0000ff) + amt
        return (
          "#" +
          (
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
          )
            .toString(16)
            .slice(1)
        )
      }

      darkenColor(color: string, percent: number): string {
        const num = Number.parseInt(color.replace("#", ""), 16)
        const amt = Math.round(2.55 * percent)
        const R = (num >> 16) - amt
        const G = ((num >> 8) & 0x00ff) - amt
        const B = (num & 0x0000ff) - amt
        return (
          "#" +
          (
            0x1000000 +
            (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
            (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
            (B > 255 ? 255 : B < 0 ? 0 : B)
          )
            .toString(16)
            .slice(1)
        )
      }
    }

    const hexagons: DarkHexagon[] = []

    const createDarkHexagons = () => {
      hexagons.length = 0
      const hexSize = 35 // Good size for the 3D effect
      const spacing = hexSize * 1.8
      const rows = Math.ceil(canvas.height / (spacing * 0.75)) + 2
      const cols = Math.ceil(canvas.width / (spacing * Math.sqrt(3))) + 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Honeycomb pattern
          const x = col * spacing * Math.sqrt(3) + (row % 2) * ((spacing * Math.sqrt(3)) / 2)
          const y = row * spacing * 0.75

          // Slight randomness for natural look
          const randomX = x + (Math.random() - 0.5) * 8
          const randomY = y + (Math.random() - 0.5) * 8
          const randomSize = hexSize + (Math.random() - 0.5) * 6

          hexagons.push(new DarkHexagon(randomX, randomY, randomSize))
        }
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      setMousePos({ x: mouseX, y: mouseY })

      hexagons.forEach((hexagon) => {
        hexagon.checkPress(mouseX, mouseY)
      })
    }

    const animate = () => {
      // Dark background like in the image
      ctx.fillStyle = "#1a1a1a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw all hexagons
      hexagons.forEach((hexagon) => {
        hexagon.update()
        hexagon.drawHexagon()
      })

      requestAnimationFrame(animate)
    }

    createDarkHexagons()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createDarkHexagons()
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}
