'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const WaveParticles = () => {
  const pointsRef = useRef<THREE.Points>(null)
  const timeRef = useRef(0)

  const geometry = useMemo(() => {
    const particleCount = 250
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    // Create particles concentrated at edges
    for (let i = 0; i < particleCount; i++) {
      let x, y, z

      const rand = Math.random()
      if (rand < 0.33) {
        x = (Math.random() - 0.5) * 60
        y = Math.random() > 0.5 ? 15 + Math.random() * 8 : -15 - Math.random() * 8
        z = (Math.random() - 0.5) * 40
      } else if (rand < 0.66) {
        x = Math.random() > 0.5 ? 25 + Math.random() * 8 : -25 - Math.random() * 8
        y = (Math.random() - 0.5) * 20
        z = (Math.random() - 0.5) * 40
      } else {
        x = (Math.random() - 0.5) * 50
        y = (Math.random() - 0.5) * 20
        z = Math.random() > 0.5 ? 15 + Math.random() * 8 : -15 - Math.random() * 8
      }

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Blue and violet color
      colors[i * 3] = 0.2 + Math.random() * 0.4
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.4
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geom
  }, [])

  useFrame(() => {
    timeRef.current += 1

    if (pointsRef.current && geometry) {
      const positions = geometry.getAttribute('position').array as Float32Array
      const colors = geometry.getAttribute('color').array as Float32Array
      const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute
      const colorAttr = geometry.getAttribute('color') as THREE.BufferAttribute

      const particleCount = positions.length / 3
      const time = timeRef.current * 0.0002

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3
        const origX = positions[idx]
        const origY = positions[idx + 1]
        const origZ = positions[idx + 2]

        // Wave deformation
        positions[idx] += Math.sin(time * 0.5 + i) * 0.02
        positions[idx + 1] += Math.cos(time * 0.3 + i) * 0.015
        positions[idx + 2] += Math.sin(time * 0.4 + i * 0.5) * 0.01

        // Boundary wrapping
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

        // Brightness based on distance from center
        const distFromCenter = Math.sqrt(
          (positions[idx] * positions[idx]) / 2000 +
          (positions[idx + 1] * positions[idx + 1]) / 400
        )
        const brightness = 0.3 + 0.4 * (0.5 + 0.5 * Math.sin(time + i * 0.03))
        const finalBrightness = brightness * Math.max(0.2, Math.min(1, distFromCenter))

        colors[idx] = 0.3 * finalBrightness
        colors[idx + 1] = 0.5 * finalBrightness
        colors[idx + 2] = 0.9 * finalBrightness
      }

      positionAttr.needsUpdate = true
      colorAttr.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.4}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.6}
        fog={true}
      />
    </points>
  )
}

export const ElegantWaveBackground: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 35], fov: 75 }}
        gl={{
          antialias: false,
          alpha: true,
          precision: 'lowp' as const,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
          clearColor: 0x000000,
        }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1}
        frameloop="always"
        flat
        style={{ background: '#000000' }}
      >
        <WaveParticles />
        <ambientLight intensity={0.15} color="#1a3a52" />
        <directionalLight position={[10, 15, 20]} intensity={0.3} color="#4080ff" />
        <directionalLight position={[-10, -10, -20]} intensity={0.15} color="#6040ff" />
        <fog attach="fog" args={['#000000', 5, 80]} />
      </Canvas>
    </div>
  )
}
