"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  useEffect(() => {
    if (pointsRef.current) {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(10000 * 3)

      for (let i = 0; i < 10000 * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100
        positions[i + 1] = (Math.random() - 0.5) * 100
        positions[i + 2] = (Math.random() - 0.5) * 100
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      pointsRef.current.geometry = geometry
    }
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.position.y += 0.001
      if (pointsRef.current.position.y > 50) {
        pointsRef.current.position.y = -50
      }
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.6} />
    </points>
  )
}

export default function DriftingParticlesBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }} gl={{ alpha: true }}>
        <ParticleField />
      </Canvas>
    </div>
  )
}
