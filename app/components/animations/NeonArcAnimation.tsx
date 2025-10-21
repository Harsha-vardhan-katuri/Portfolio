"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function NeonArcAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 1)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    // Create neon arc (smile shape)
    const arcGeometry = new THREE.BufferGeometry()
    const arcPoints = []

    // Create a smile-shaped arc
    for (let i = 0; i <= 100; i++) {
      const angle = (i / 100) * Math.PI
      const x = Math.cos(angle) * 2
      const y = Math.sin(angle) * 1.5 - 0.5
      arcPoints.push(new THREE.Vector3(x, y, 0))
    }

    arcGeometry.setFromPoints(arcPoints)

    // Create neon material with glow
    const arcMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      linewidth: 3,
      fog: false,
    })

    const arc = new THREE.Line(arcGeometry, arcMaterial)
    scene.add(arc)

    // Create glow effect
    const glowGeometry = new THREE.BufferGeometry()
    glowGeometry.setFromPoints(arcPoints)
    const glowMaterial = new THREE.LineBasicMaterial({
      color: 0x0088ff,
      linewidth: 8,
      transparent: true,
      opacity: 0.3,
    })
    const glow = new THREE.Line(glowGeometry, glowMaterial)
    scene.add(glow)

    // Create particles
    const particleCount = 100
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 10
      particlePositions[i + 1] = (Math.random() - 0.5) * 10
      particlePositions[i + 2] = (Math.random() - 0.5) * 10
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate arc
      arc.rotation.z += 0.001
      glow.rotation.z += 0.001

      // Animate particles
      const positions = particleGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.01
        if (positions[i + 1] < -5) {
          positions[i + 1] = 5
        }
      }
      particleGeometry.attributes.position.needsUpdate = true

      // Pulse glow
      glowMaterial.opacity = 0.3 + Math.sin(Date.now() * 0.003) * 0.2

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-screen" />
}
