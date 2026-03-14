'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Preload } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

interface GridBackgroundProps {
  gridSize?: number
  gridDivisions?: number
}

function GridScene({ gridSize = 100, gridDivisions = 20 }: GridBackgroundProps) {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const timeRef = useRef(0)

  // Memoized grid geometry for performance
  const gridGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const vertices: number[] = []

    for (let i = -gridDivisions; i <= gridDivisions; i++) {
      const pos = (i / gridDivisions) * gridSize

      vertices.push(-gridSize, 0, pos)
      vertices.push(gridSize, 0, pos)

      vertices.push(pos, 0, -gridSize)
      vertices.push(pos, 0, gridSize)
    }

    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3))
    return geo
  }, [gridSize, gridDivisions])

  // Memoized particle geometry
  const { particlesGeometry, particleCount } = useMemo(() => {
    const count = 400
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * gridSize * 2
      positions[i * 3 + 1] = Math.random() * 80
      positions[i * 3 + 2] = (Math.random() - 0.5) * gridSize * 2

      velocities[i * 3] = (Math.random() - 0.5) * 0.05
      velocities[i * 3 + 1] = -0.08 - Math.random() * 0.04
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.userData.velocities = velocities
    return { particlesGeometry: geo, particleCount: count }
  }, [gridSize])

  useFrame(() => {
    timeRef.current += 1

    // Smooth camera drift
    if (cameraRef.current) {
      cameraRef.current.position.x = Math.sin(timeRef.current * 0.0001) * 8
      cameraRef.current.position.z = 50 + Math.sin(timeRef.current * 0.00015) * 5
      cameraRef.current.position.y = 20 + Math.cos(timeRef.current * 0.00012) * 3
      cameraRef.current.lookAt(0, 10, 0)
    }

    // Animate particles smoothly
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const velocities = particlesRef.current.geometry.userData.velocities as Float32Array

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocities[i]
        positions[i + 1] += velocities[i + 1]
        positions[i + 2] += velocities[i + 2]

        // Wrap particles around for continuous motion
        if (positions[i + 1] < -10) {
          positions[i + 1] = 80
        }

        // Add subtle random drift
        velocities[i] += (Math.random() - 0.5) * 0.001
        velocities[i + 2] += (Math.random() - 0.5) * 0.001

        // Clamp velocities
        velocities[i] = Math.max(-0.08, Math.min(0.08, velocities[i]))
        velocities[i + 2] = Math.max(-0.08, Math.min(0.08, velocities[i + 2]))
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        position={[0, 20, 50]}
        fov={75}
        near={0.1}
        far={500}
        makeDefault
      />

      <ambientLight intensity={0.15} color={0x3b82f6} />
      <directionalLight position={[20, 30, 20]} intensity={0.3} color={0x60a5fa} />
      <pointLight position={[-30, 10, -30]} intensity={0.2} color={0x3b82f6} />

      {/* Primary grid lines - blue */}
      <lineSegments geometry={gridGeometry}>
        <lineBasicMaterial
          color="#3b82f6"
          linewidth={1}
          fog={true}
          transparent
          opacity={0.5}
        />
      </lineSegments>

      {/* Secondary grid lines - purple accent */}
      <lineSegments geometry={gridGeometry}>
        <lineBasicMaterial
          color="#a855f7"
          linewidth={1}
          fog={true}
          transparent
          opacity={0.2}
        />
      </lineSegments>

      {/* Animated holographic particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial
          color="#60a5fa"
          size={0.4}
          sizeAttenuation
          fog={true}
          transparent
          opacity={0.7}
        />
      </points>

      {/* Volumetric fog for depth */}
      <fog attach="fog" args={[0x0f0f0f, 15, 200]} />
      <Preload all />
    </>
  )
}

export function FuturisticGridBackground({
  gridSize = 100,
  gridDivisions = 20,
}: GridBackgroundProps) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          precision: 'mediump',
        }}
        performance={{ min: 0.5, max: 1 }}
      >
        <color attach="background" args={[0x000000]} />
        <GridScene gridSize={gridSize} gridDivisions={gridDivisions} />
      </Canvas>
    </div>
  )
}
