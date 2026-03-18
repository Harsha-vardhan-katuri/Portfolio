'use client'

// Cache clear - v2
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RainbowArcPattern = () => {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)

  const arcs = useMemo(() => {
    return [
      { radius: 8, width: 1.5, segments: 64 },
      { radius: 11, width: 1.8, segments: 64 },
      { radius: 14, width: 1.5, segments: 64 },
      { radius: 17, width: 2, segments: 64 },
      { radius: 20, width: 1.8, segments: 64 },
    ]
  }, [])

  const particles = useMemo(() => {
    const particleCount = 180
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 5 + Math.random() * 20
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = Math.sin(angle) * radius

      colors[i * 3] = 0.3 + Math.random() * 0.5
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.3
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.1
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return { geom, positions, colors }
  }, [])

  useFrame(() => {
    timeRef.current += 0.5
    const time = timeRef.current * 0.001

    if (particles.geom) {
      const posAttr = particles.geom.getAttribute('position') as THREE.BufferAttribute
      const colAttr = particles.geom.getAttribute('color') as THREE.BufferAttribute
      const positions = posAttr.array as Float32Array
      const colors = colAttr.array as Float32Array

      for (let i = 0; i < positions.length / 3; i++) {
        const idx = i * 3
        const angle = Math.atan2(positions[idx + 2], positions[idx])
        const radius = Math.sqrt(positions[idx] * positions[idx] + positions[idx + 2] * positions[idx + 2])

        const newAngle = angle + time * 0.3
        positions[idx] = Math.cos(newAngle) * radius
        positions[idx + 2] = Math.sin(newAngle) * radius
        positions[idx + 1] += Math.sin(time * 0.5 + i) * 0.02

        const brightness = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(time + i * 0.02))
        colors[idx] = 0.4 * brightness
        colors[idx + 1] = 0.5 * brightness
        colors[idx + 2] = brightness
      }

      posAttr.needsUpdate = true
      colAttr.needsUpdate = true
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={particles.geom}>
        <pointsMaterial size={0.3} sizeAttenuation vertexColors transparent opacity={0.5} />
      </points>

      {arcs.map((arc, idx) => {
        const arcGeom = new THREE.BufferGeometry()
        const arcPositions = new Float32Array((arc.segments + 1) * 3)
        const arcColors = new Float32Array((arc.segments + 1) * 3)
        const hues = [0.6, 0.55, 0.5, 0.65, 0.58]
        const hue = hues[idx % hues.length]

        for (let i = 0; i <= arc.segments; i++) {
          const angle = (i / arc.segments) * Math.PI * (1.5 + Math.sin(Date.now() * 0.001 + idx) * 0.3)
          arcPositions[i * 3] = Math.cos(angle) * arc.radius
          arcPositions[i * 3 + 1] = 0
          arcPositions[i * 3 + 2] = Math.sin(angle) * arc.radius

          const color = new THREE.Color()
          color.setHSL(hue, 0.8, 0.5 + Math.sin(Date.now() * 0.001 + i * 0.01) * 0.2)
          arcColors[i * 3] = color.r
          arcColors[i * 3 + 1] = color.g
          arcColors[i * 3 + 2] = color.b
        }

        arcGeom.setAttribute('position', new THREE.BufferAttribute(arcPositions, 3))
        arcGeom.setAttribute('color', new THREE.BufferAttribute(arcColors, 3))

        return (
          <line key={idx} geometry={arcGeom}>
            <lineBasicMaterial linewidth={arc.width} vertexColors transparent opacity={0.8} />
          </line>
        )
      })}
    </group>
  )
}

export const EnergyArcsBackground: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 15, 35], fov: 70 }}
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
        <RainbowArcPattern />
        <ambientLight intensity={0.2} color="#1a3a52" />
        <pointLight position={[20, 30, 25]} intensity={0.4} color="#5080ff" />
        <pointLight position={[-20, 20, -25]} intensity={0.3} color="#8060ff" />
        <fog attach="fog" args={['#000000', 10, 100]} />
      </Canvas>
    </div>
  )
}
