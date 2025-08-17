"use client"

import { useEffect, useRef } from "react"

export default function FallingCubes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Cube {
      x: number
      y: number
      size: number
      speed: number
      rotation: number
      rotationSpeed: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = -50
        this.size = Math.random() * 20 + 10
        this.speed = Math.random() * 0.5 + 0.2
        this.rotation = 0
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
        this.opacity = Math.random() * 0.3 + 0.1
      }

      update() {
        this.y += this.speed
        this.rotation += this.rotationSpeed

        if (this.y > canvas.height + 50) {
          this.y = -50
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2)
        ctx.rotate(this.rotation)
        ctx.globalAlpha = this.opacity

        // Draw cube with white color
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)

        // Add white border
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 1
        ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size)

        ctx.restore()
      }
    }

    const cubes: Cube[] = []
    for (let i = 0; i < 30; i++) {
      cubes.push(new Cube())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      cubes.forEach((cube) => {
        cube.update()
        cube.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}
