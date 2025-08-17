"use client"

import { useEffect, useRef } from "react"

export default function CursorRainbowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; size: number; color: string }[] = []

    const createParticle = (x: number, y: number) => {
      const size = Math.random() * 3 + 1
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`
      particles.push({ x, y, size, color })
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.size -= 0.1
        if (particle.size <= 0) {
          particles.splice(index, 1)
        } else {
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      requestAnimationFrame(animateParticles)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      for (let i = 0; i < 3; i++) {
        createParticle(clientX, clientY)
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    animateParticles()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}
