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

  // Pattern cycle: 5 unique arc patterns, each 8 seconds
  const PATTERN_DURATION = 8000 // milliseconds per pattern
  const PATTERNS = [
    'sunrise', // Two arcs from bottom rising like sunrise
    'dualArcs', // Two opposing curved arcs
    'wavePattern', // Flowing wave-like arcs
    'spiralArcs', // Spiral pattern
    'shimmerArcs' // Multiple shimmering arcs
  ]

  // Create energy arc paths and particles
  const { particleGeometry, arcCurves } = useMemo(() => {
    const particleCount = 150
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const distance = 18 + Math.random() * 8

      positions[i * 3] = Math.cos(angle) * distance
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24
      positions[i * 3 + 2] = Math.sin(angle) * distance

      colors[i * 3] = 0.2 + Math.random() * 0.2
      colors[i * 3 + 1] = 0.1 + Math.random() * 0.1
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Create 5 different arc pattern sets
    const patterns: Record<string, THREE.CatmullRomCurve3[]> = {
      sunrise: [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-25, -20, 0),
          new THREE.Vector3(-10, 5, -10),
          new THREE.Vector3(0, 25, 0),
          new THREE.Vector3(10, 5, 10),
          new THREE.Vector3(25, -20, 0),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-20, -15, -15),
          new THREE.Vector3(0, 15, 0),
          new THREE.Vector3(20, -15, 15),
        ]),
      ],
      dualArcs: [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-30, 10, -20),
          new THREE.Vector3(-10, 15, 0),
          new THREE.Vector3(10, 15, 0),
          new THREE.Vector3(30, 10, 20),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(30, -10, 20),
          new THREE.Vector3(10, -15, 0),
          new THREE.Vector3(-10, -15, 0),
          new THREE.Vector3(-30, -10, -20),
        ]),
      ],
      wavePattern: [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-30, 0, -20),
          new THREE.Vector3(-15, 20, -10),
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(15, -20, 10),
          new THREE.Vector3(30, 0, 20),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(30, 0, -20),
          new THREE.Vector3(15, -20, -10),
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(-15, 20, 10),
          new THREE.Vector3(-30, 0, 20),
        ]),
      ],
      spiralArcs: [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, -20, 20),
          new THREE.Vector3(20, -10, 10),
          new THREE.Vector3(20, 10, -10),
          new THREE.Vector3(0, 20, -20),
          new THREE.Vector3(-20, 10, 10),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-20, 10, -10),
          new THREE.Vector3(-20, -10, 10),
          new THREE.Vector3(0, -20, 20),
        ]),
      ],
      shimmerArcs: [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-20, 15, -15),
          new THREE.Vector3(0, 20, 0),
          new THREE.Vector3(20, 15, 15),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-15, -15, 20),
          new THREE.Vector3(0, -20, 0),
          new THREE.Vector3(15, -15, -20),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(20, 0, -20),
          new THREE.Vector3(0, 18, 0),
          new THREE.Vector3(-20, 0, 20),
        ]),
      ],
    }

    return { particleGeometry: geom, arcPatterns: patterns }
  }, [])

  useFrame(() => {
    timeRef.current += 1
    const time = timeRef.current * 0.0004
    const elapsedMs = timeRef.current * 16 // ~60fps = 16ms per frame
    const currentPatternIndex = Math.floor((elapsedMs / PATTERN_DURATION) % PATTERNS.length)
    const patternName = PATTERNS[currentPatternIndex]
    const patternProgress = (elapsedMs % PATTERN_DURATION) / PATTERN_DURATION

    // Update particles
    if (particlesRef.current && particleGeometry) {
      const positions = particleGeometry.getAttribute('position').array as Float32Array
      const colors = particleGeometry.getAttribute('color').array as Float32Array
      const posAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute
      const colAttr = particleGeometry.getAttribute('color') as THREE.BufferAttribute

      const particleCount = positions.length / 3
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3
        positions[idx] += Math.sin(time + i * 0.02) * 0.008
        positions[idx + 1] += Math.cos(time * 0.7 + i * 0.015) * 0.006
        positions[idx + 2] += Math.sin(time * 0.5 + i * 0.01) * 0.007

        const pulse = 0.4 + 0.3 * Math.sin(time * 0.5 + i * 0.05)
        colors[idx] = 0.25 * pulse
        colors[idx + 1] = 0.15 * pulse
        colors[idx + 2] = 0.85 * pulse
      }

      posAttr.needsUpdate = true
      colAttr.needsUpdate = true
    }

    // Update arc positions based on current pattern
    if (groupRef.current && arcPatterns) {
      const currentArcs = arcPatterns[patternName as keyof typeof arcPatterns] || []

      currentArcs.forEach((curve, idx) => {
        if (arcLinesRef.current[idx]) {
          const positions = arcLinesRef.current[idx].geometry.getAttribute('position') as THREE.BufferAttribute
          const colors = arcLinesRef.current[idx].geometry.getAttribute('color') as THREE.BufferAttribute
          const posArray = positions.array as Float32Array
          const colArray = colors.array as Float32Array

          const points = curve.getPoints(80)

          for (let j = 0; j < Math.min(points.length, posArray.length / 3); j++) {
            const point = points[j]
            posArray[j * 3] = point.x
            posArray[j * 3 + 1] = point.y
            posArray[j * 3 + 2] = point.z

            // Smooth light pulse with easing
            const distAlongArc = (j / points.length + patternProgress) % 1.0
            const brightness = Math.exp(-Math.pow((distAlongArc - 0.5) * 2.2, 2))

            colArray[j * 3] = 0.2 * brightness
            colArray[j * 3 + 1] = 0.08 * brightness
            colArray[j * 3 + 2] = 0.95 * brightness
          }

          positions.needsUpdate = true
          colors.needsUpdate = true
        }
      })
    }
  })

  const arcPatterns = useMemo(() => {
    return {
      sunrise: [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-25, -20, 0),
          new THREE.Vector3(-10, 5, -10),
          new THREE.Vector3(0, 25, 0),
          new THREE.Vector3(10, 5, 10),
          new THREE.Vector3(25, -20, 0),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-20, -15, -15),
          new THREE.Vector3(0, 15, 0),
          new THREE.Vector3(20, -15, 15),
        ]),
      ],
      dualArcs: [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-30, 10, -20),
          new THREE.Vector3(-10, 15, 0),
          new THREE.Vector3(10, 15, 0),
          new THREE.Vector3(30, 10, 20),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(30, -10, 20),
          new THREE.Vector3(10, -15, 0),
          new THREE.Vector3(-10, -15, 0),
          new THREE.Vector3(-30, -10, -20),
        ]),
      ],
      wavePattern: [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-30, 0, -20),
          new THREE.Vector3(-15, 20, -10),
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(15, -20, 10),
          new THREE.Vector3(30, 0, 20),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(30, 0, -20),
          new THREE.Vector3(15, -20, -10),
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(-15, 20, 10),
          new THREE.Vector3(-30, 0, 20),
        ]),
      ],
      spiralArcs: [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, -20, 20),
          new THREE.Vector3(20, -10, 10),
          new THREE.Vector3(20, 10, -10),
          new THREE.Vector3(0, 20, -20),
          new THREE.Vector3(-20, 10, 10),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-20, 10, -10),
          new THREE.Vector3(-20, -10, 10),
          new THREE.Vector3(0, -20, 20),
        ]),
      ],
      shimmerArcs: [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-20, 15, -15),
          new THREE.Vector3(0, 20, 0),
          new THREE.Vector3(20, 15, 15),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-15, -15, 20),
          new THREE.Vector3(0, -20, 0),
          new THREE.Vector3(15, -15, -20),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(20, 0, -20),
          new THREE.Vector3(0, 18, 0),
          new THREE.Vector3(-20, 0, 20),
        ]),
      ],
    }
  }, [])

  return (
    <group ref={groupRef}>
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

      {/* Render all pattern arcs, but only animate the current pattern */}
      {Object.entries(arcPatterns).map(([patternKey, curves]) =>
        curves.map((curve, idx) => {
          const points = curve.getPoints(80)
          const positions = new Float32Array(points.length * 3)
          const colors = new Float32Array(points.length * 3)

          points.forEach((p, i) => {
            positions[i * 3] = p.x
            positions[i * 3 + 1] = p.y
            positions[i * 3 + 2] = p.z
            colors[i * 3] = 0.2
            colors[i * 3 + 1] = 0.08
            colors[i * 3 + 2] = 0.95
          })

          const geom = new THREE.BufferGeometry()
          geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
          geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))

          return (
            <line
              key={`arc-${patternKey}-${idx}`}
              ref={(el) => {
                if (el) {
                  const globalIdx = Object.keys(arcPatterns).indexOf(patternKey) * 3 + idx
                  arcLinesRef.current[globalIdx] = el
                }
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
        })
      )}
    </group>
  )
}

export const EnergyArcsBackground: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 45], fov: 70 }}
        gl={{
          antialias: false,
          alpha: true,
          precision: 'lowp' as const,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1}
        frameloop="always"
        flat
        style={{ background: '#000000' }}
      >
        <EnergyArcs offset={0} />
        <ambientLight intensity={0.1} color="#0a1a2e" />
        <directionalLight position={[30, 20, 25]} intensity={0.25} color="#3b7bff" />
        <directionalLight position={[-30, -20, -25]} intensity={0.2} color="#8040ff" />
        <pointLight position={[0, 15, 0]} intensity={0.15} color="#4080ff" />
        <pointLight position={[0, -15, 0]} intensity={0.12} color="#7030ff" />
        <fog attach="fog" args={['#000000', 10, 100]} />
      </Canvas>
    </div>
  )
}
