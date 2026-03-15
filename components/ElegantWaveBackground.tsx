'use client'

import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleProps {
  index: number
}

const WaveParticles: React.FC<ParticleProps> = ({ index }) => {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.BufferGeometry | null>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    // Create minimal elegant wave particles
    const particleCount = 250 // Very low count for minimal aesthetic
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    // Create particles concentrated at edges, leaving center empty
    for (let i = 0; i < particleCount; i++) {
      // Edge-biased distribution - particles mostly at edges
      let x, y, z

      const rand = Math.random()
      if (rand < 0.33) {
        // Top/bottom edges
        x = (Math.random() - 0.5) * 60
        y = Math.random() > 0.5 ? 15 + Math.random() * 8 : -15 - Math.random() * 8
        z = (Math.random() - 0.5) * 40
      } else if (rand < 0.66) {
        // Left/right edges
        x = Math.random() > 0.5 ? 25 + Math.random() * 8 : -25 - Math.random() * 8
        y = (Math.random() - 0.5) * 20
        z = (Math.random() - 0.5) * 40
      } else {
        // Back edges
        x = (Math.random() - 0.5) * 50
        y = (Math.random() - 0.5) * 20
        z = Math.random() > 0.5 ? 15 + Math.random() * 8 : -15 - Math.random() * 8
      }

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Very slow velocities for cinematic motion
      velocities[i * 3] = (Math.random() - 0.5) * 0.008
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004

      // Blue and violet color palette
      colors[i * 3] = 0.2 + Math.random() * 0.4 // R
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.4 // G (blue-violet)
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2 // B
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    particlesRef.current = geometry
  }, [])

  useFrame(() => {
    timeRef.current += 1

    if (particlesRef.current) {
      const positions = particlesRef.current.getAttribute('position').array as Float32Array
      const colors = particlesRef.current.getAttribute('color').array as Float32Array
      const positionAttr = particlesRef.current.getAttribute('position') as THREE.BufferAttribute
      const colorAttr = particlesRef.current.getAttribute('color') as THREE.BufferAttribute

      const particleCount = positions.length / 3
      const time = timeRef.current * 0.0002 // Extremely slow motion

      // Update positions with wave-like motion
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3

        // Store original positions
        const origX = positions[idx]
        const origY = positions[idx + 1]
        const origZ = positions[idx + 2]

        // Add smooth wave deformation
        const wave = Math.sin(time + i * 0.1) * 2
        const wave2 = Math.cos(time * 0.7 + i * 0.15) * 1.5

        positions[idx] += Math.sin(time * 0.5 + i) * 0.02
        positions[idx + 1] += Math.cos(time * 0.3 + i) * 0.015
        positions[idx + 2] += Math.sin(time * 0.4 + i * 0.5) * 0.01

        // Boundary wrapping with smooth edges
        const bounds = 30
        if (Math.abs(positions[idx]) > bounds) {
          positions[idx] = origX
        }
        if (Math.abs(positions[idx + 1]) > 20) {
          positions[idx + 1] = origY
        }
        if (Math.abs(positions[idx + 2]) > bounds) {
          positions[idx + 2] = origZ
        }

        // Elegant brightness pulsing - low at center edges
        const distFromCenter = Math.sqrt(
          (positions[idx] * positions[idx]) / 2000 +
          (positions[idx + 1] * positions[idx + 1]) / 400
        )
        const brightness = 0.3 + 0.4 * (0.5 + 0.5 * Math.sin(time + i * 0.03))
        const finalBrightness = brightness * Math.max(0.2, Math.min(1, distFromCenter))

        // Blue-violet color with soft glow
        colors[idx] = 0.3 * finalBrightness
        colors[idx + 1] = 0.5 * finalBrightness
        colors[idx + 2] = 0.9 * finalBrightness
      }

      positionAttr.needsUpdate = true
      colorAttr.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {particlesRef.current && (
        <points geometry={particlesRef.current}>
          <pointsMaterial
            size={0.4}
            sizeAttenuation
            vertexColors
            transparent
            opacity={0.6}
            fog={true}
          />
        </points>
      )}
    </group>
  )
}

export const ElegantWaveBackground: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 35], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          precision: 'mediump',
          powerPreference: 'high-performance',
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        style={{ background: '#000000' }}
      >
        <WaveParticles index={0} />

        {/* Minimal ambient lighting */}
        <ambientLight intensity={0.15} color="#1a3a52" />

        {/* Soft blue directional light */}
        <directionalLight
          position={[10, 15, 20]}
          intensity={0.3}
          color="#4080ff"
        />

        {/* Subtle violet accent light */}
        <directionalLight
          position={[-10, -10, -20]}
          intensity={0.15}
          color="#6040ff"
        />

        {/* Volumetric fog for depth */}
        <fog attach="fog" args={['#000000', 5, 80]} />
      </Canvas>
    </div>
  )
}
