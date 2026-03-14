'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

interface GridBackgroundProps {
  gridSize?: number
  gridDivisions?: number
  glowColor?: string
  className?: string
}

function GridScene({ gridSize = 100, gridDivisions = 20 }: GridBackgroundProps) {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Create grid geometry
  const gridGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const vertices: number[] = []

    // Create grid lines
    for (let i = -gridDivisions; i <= gridDivisions; i++) {
      const pos = (i / gridDivisions) * gridSize

      // Horizontal lines (Z-axis)
      vertices.push(-gridSize, 0, pos)
      vertices.push(gridSize, 0, pos)

      // Vertical lines (X-axis)
      vertices.push(pos, 0, -gridSize)
      vertices.push(pos, 0, gridSize)
    }

    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3))
    return geo
  }, [gridSize, gridDivisions])

  // Create particles
  const particlesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const particleCount = 500
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * gridSize * 2 // X
      positions[i + 1] = Math.random() * 50 // Y
      positions[i + 2] = (Math.random() - 0.5) * gridSize * 2 // Z
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [gridSize])

  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Subtle camera movement
      camera.position.z = 50 + Math.sin(Date.now() * 0.0003) * 2
      camera.position.y = 15 + Math.cos(Date.now() * 0.0002) * 2
      camera.lookAt(0, 10, 0)
    }

    if (particlesRef.current) {
      // Animate particles
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.1 // Move down
        if (positions[i + 1] < 0) {
          positions[i + 1] = 50 // Reset to top
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* Grid lines */}
      <lineSegments geometry={gridGeometry}>
        <lineBasicMaterial
          color="#3b82f6"
          linewidth={1}
          fog={true}
          transparent
          opacity={0.4}
        />
      </lineSegments>

      {/* Grid with purple accent */}
      <lineSegments geometry={gridGeometry}>
        <lineBasicMaterial
          color="#a855f7"
          linewidth={1}
          fog={true}
          transparent
          opacity={0.15}
        />
      </lineSegments>

      {/* Holographic particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial
          color="#60a5fa"
          size={0.3}
          sizeAttenuation
          fog={true}
          transparent
          opacity={0.6}
        />
      </points>

      {/* Volumetric light simulation with fog */}
      <fog attach="fog" args={['#0f0f0f', 20, 200]} />
    </group>
  )
}

export function FuturisticGridBackground({
  gridSize = 100,
  gridDivisions = 20,
  className = '',
}: GridBackgroundProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 15, 50], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <GridScene gridSize={gridSize} gridDivisions={gridDivisions} />
      </Canvas>
    </div>
  )
}
