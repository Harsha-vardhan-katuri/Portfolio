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

    class KeyboardHexagon {
      x: number
      y: number
      size: number
      baseSize: number
      opacity: number
      baseOpacity: number
      color: string
      isPressed: boolean
      pressOffset: number
      targetPressOffset: number
      pressSpeed: number

      constructor(x: number, y: number, size: number) {
        this.x = x
        this.y = y
        this.size = size
        this.baseSize = size
        this.opacity = Math.random() * 0.2 + 0.1 // Subtle opacity
        this.baseOpacity = this.opacity
        this.isPressed = false
        this.pressOffset = 0
        this.targetPressOffset = 0
        this.pressSpeed = 0.25 // Fast press like keyboard

        // Only black colors - no gray, no shine
        const blackColors = [
          "#000000", // Pure black
          "#0a0a0a", // Very dark black
          "#141414", // Slightly lighter black
          "#1e1e1e", // Dark black
          "#0f0f0f", // Almost black
          "#050505", // Very very dark
        ]
        this.color = blackColors[Math.floor(Math.random() * blackColors.length)]
      }

      checkPress(mouseX: number, mouseY: number) {
        const distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2)
        const wasPressed = this.isPressed
        this.isPressed = distance < this.size + 15

        if (this.isPressed && !wasPressed) {
          // Press DOWN like keyboard key
          this.targetPressOffset = 12 // Press down by 12px
        } else if (!this.isPressed && wasPressed) {
          // Release back up
          this.targetPressOffset = 0
        }
      }

      update() {
        // Fast keyboard-like press animation
        this.pressOffset += (this.targetPressOffset - this.pressOffset) * this.pressSpeed

        if (this.isPressed) {
          // Slightly smaller when pressed (like real keyboard key)
          this.size = this.baseSize * 0.95
          this.opacity = Math.min(this.baseOpacity * 1.5, 0.3)
        } else {
          // Return to normal size
          this.size += (this.baseSize - this.size) * 0.2
          this.opacity += (this.baseOpacity - this.opacity) * 0.2
        }
      }

      drawHexagon() {
        if (!ctx) return

        ctx.save()
        ctx.translate(this.x, this.y + this.pressOffset) // Press DOWN
        ctx.globalAlpha = this.opacity

        // Draw hexagon - flat black, no shine
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

        // Fill with flat black color - no gradients, no shine
        ctx.fillStyle = this.color
        ctx.fill()

        // Only add border when pressed (like keyboard key depth)
        if (this.isPressed) {
          ctx.strokeStyle = "#333333"
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        ctx.restore()
      }
    }

    const hexagons: KeyboardHexagon[] = []

    // Create static hexagon grid
    const createKeyboardHexagons = () => {
      hexagons.length = 0
      const hexSize = 30 // Good size for keyboard effect
      const spacing = hexSize * 2
      const rows = Math.ceil(canvas.height / (spacing * 0.75)) + 3
      const cols = Math.ceil(canvas.width / (spacing * Math.sqrt(3))) + 3

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Honeycomb pattern positioning
          const x = col * spacing * Math.sqrt(3) + (row % 2) * ((spacing * Math.sqrt(3)) / 2)
          const y = row * spacing * 0.75

          // Add slight randomness
          const randomX = x + (Math.random() - 0.5) * 10
          const randomY = y + (Math.random() - 0.5) * 10
          const randomSize = hexSize + (Math.random() - 0.5) * 8

          hexagons.push(new KeyboardHexagon(randomX, randomY, randomSize))
        }
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      setMousePos({ x: mouseX, y: mouseY })

      // Check press for all hexagons
      hexagons.forEach((hexagon) => {
        hexagon.checkPress(mouseX, mouseY)
      })
    }

    const animate = () => {
      // Pure black background - no shine, flat
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw all hexagons
      hexagons.forEach((hexagon) => {
        hexagon.update()
        hexagon.drawHexagon()
      })

      requestAnimationFrame(animate)
    }

    createKeyboardHexagons()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createKeyboardHexagons()
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
