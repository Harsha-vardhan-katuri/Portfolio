'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface EnergyArcProps {
  offset: number
}

const EnergyArcs: React.FC<EnergyArcProps> = ({ offset }) => {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const timeRef = useRef(0)
  const arcLinesRef = useRef<THREE.Line[]>([])

  // Create energy arc paths and particles
  const { particleGeometry, arcCurves } = useMemo(() => {
    const particleCount = 180 // Minimal particle count for performance
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    // Place particles near edges and arcs
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const distance = 18 + Math.random() * 8

      positions[i * 3] = Math.cos(angle) * distance
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24 + Math.sin(angle) * 4
      positions[i * 3 + 2] = Math.sin(angle) * distance

      // Blue and purple colors
      colors[i * 3] = 0.3 + Math.random() * 0.3
      colors[i * 3 + 1] = 0.2 + Math.random() * 0.2
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Create 4 energy arc curves
    const curves = [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-30, 15, -20),
        new THREE.Vector3(-15, 8, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(15, -8, 0),
        new THREE.Vector3(30, -15, 20),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(30, -15, 20),
        new THREE.Vector3(20, 0, 15),
        new THREE.Vector3(0, 5, 0),
        new THREE.Vector3(-20, 0, -15),
        new THREE.Vector3(-30, 15, -20),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 20, -25),
        new THREE.Vector3(15, 10, -10),
        new THREE.Vector3(20, 0, 5),
        new THREE.Vector3(10, -10, 15),
        new THREE.Vector3(0, -20, 25),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -20, 25),
        new THREE.Vector3(-15, -10, 10),
        new THREE.Vector3(-20, 0, -5),
        new THREE.Vector3(-10, 10, -15),
        new THREE.Vector3(0, 20, -25),
      ]),
    ]

    return { particleGeometry: geom, arcCurves: curves }
  }, [])

  useFrame(() => {
    timeRef.current += 1
    const time = timeRef.current * 0.0004 // Very slow motion

    // Update particles
    if (particlesRef.current && particleGeometry) {
      const positions = particleGeometry.getAttribute('position').array as Float32Array
      const colors = particleGeometry.getAttribute('color').array as Float32Array
      const posAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute
      const colAttr = particleGeometry.getAttribute('color') as THREE.BufferAttribute

      const particleCount = positions.length / 3
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3
        // Subtle drift motion
        positions[idx] += Math.sin(time + i * 0.02) * 0.008
        positions[idx + 1] += Math.cos(time * 0.7 + i * 0.015) * 0.006
        positions[idx + 2] += Math.sin(time * 0.5 + i * 0.01) * 0.007

        // Pulsing brightness
        const pulse = 0.4 + 0.3 * Math.sin(time * 0.5 + i * 0.05)
        colors[idx] = 0.3 * pulse
        colors[idx + 1] = 0.2 * pulse
        colors[idx + 2] = 0.85 * pulse
      }

      posAttr.needsUpdate = true
      colAttr.needsUpdate = true
    }

    // Update arc positions (moving light trails)
    if (groupRef.current) {
      arcCurves.forEach((curve, idx) => {
        if (arcLinesRef.current[idx]) {
          const positions = arcLinesRef.current[idx].geometry.getAttribute('position') as THREE.BufferAttribute
          const colors = arcLinesRef.current[idx].geometry.getAttribute('color') as THREE.BufferAttribute
          const posArray = positions.array as Float32Array
          const colArray = colors.array as Float32Array

          const points = curve.getPoints(80)
          const offset = ((time * 0.3 + idx * 0.5) % 1.0)

          for (let j = 0; j < Math.min(points.length, posArray.length / 3); j++) {
            const point = points[j]
            posArray[j * 3] = point.x
            posArray[j * 3 + 1] = point.y
            posArray[j * 3 + 2] = point.z

            // Light pulse traveling along arc
            const distAlongArc = (j / points.length + offset) % 1.0
            const brightness = Math.exp(-Math.pow((distAlongArc - 0.5) * 2, 2)) // Gaussian pulse

            colArray[j * 3] = 0.3 * brightness
            colArray[j * 3 + 1] = 0.1 * brightness
            colArray[j * 3 + 2] = brightness
          }

          positions.needsUpdate = true
          colors.needsUpdate = true
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Particles */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          size={0.3}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.5}
          fog={true}
        />
      </points>

      {/* Energy arcs */}
      {arcCurves.map((curve, idx) => {
        const points = curve.getPoints(80)
        const positions = new Float32Array(points.length * 3)
        const colors = new Float32Array(points.length * 3)

        points.forEach((p, i) => {
          positions[i * 3] = p.x
          positions[i * 3 + 1] = p.y
          positions[i * 3 + 2] = p.z
          colors[i * 3] = 0.3
          colors[i * 3 + 1] = 0.1
          colors[i * 3 + 2] = 0.9
        })

        const geom = new THREE.BufferGeometry()
        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        return (
          <line
            key={`arc-${idx}`}
            ref={(el) => {
              if (el) arcLinesRef.current[idx] = el
            }}
            geometry={geom}
          >
            <lineBasicMaterial
              vertexColors
              transparent
              opacity={0.7}
              linewidth={2}
              fog={true}
            />
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
        camera={{ position: [0, 0, 45], fov: 70 }}
        gl={{
          antialias: true,
          alpha: true,
          precision: 'mediump' as const,
          powerPreference: 'high-performance',
        }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        style={{ background: '#000000' }}
      >
        <EnergyArcs offset={0} />
        {/* Volumetric lighting with multiple lights */}
        <ambientLight intensity={0.1} color="#0a1a2e" />
        <directionalLight position={[30, 20, 25]} intensity={0.25} color="#3b7bff" />
        <directionalLight position={[-30, -20, -25]} intensity={0.2} color="#8040ff" />
        <pointLight position={[0, 15, 0]} intensity={0.15} color="#4080ff" />
        <pointLight position={[0, -15, 0]} intensity={0.12} color="#7030ff" />
        {/* Fog for cinematic depth */}
        <fog attach="fog" args={['#000000', 10, 100]} />
      </Canvas>
    </div>
  )
}
