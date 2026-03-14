'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Preload } from '@react-three/drei'
import React, { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
}

const TechMeshScene = () => {
  const meshRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const timeRef = useRef(0)
  const particlesRef = useRef<Float32Array | null>(null)
  const particleVelocityRef = useRef<Float32Array | null>(null)
  const edgesRef = useRef<Uint32Array | null>(null)
  const edgeCountRef = useRef(0)

  // Memoized particle initialization for fast startup
  const { particleCount, initialPositions, initialVelocities, edges } = useMemo(() => {
    const count = 1200 // Reduced from 2000 for faster loading
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const edgeList: number[] = []

    // Create particles in a dynamic sphere that rotates
    for (let i = 0; i < count; i++) {
      const phi = Math.random() * Math.PI * 2
      const theta = Math.random() * Math.PI
      const r = 8 + Math.random() * 12

      positions[i * 3] = Math.sin(theta) * Math.cos(phi) * r
      positions[i * 3 + 1] = Math.cos(theta) * r
      positions[i * 3 + 2] = Math.sin(theta) * Math.sin(phi) * r

      // Non-zero velocities for proper animation
      velocities[i * 3] = (Math.random() - 0.5) * 0.015
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015
    }

    // Create edges between nearby particles
    const edgeDistance = 6.5
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < Math.min(i + 15, count); j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < edgeDistance) {
          edgeList.push(i, j)
        }
      }
    }

    return {
      particleCount: count,
      initialPositions: positions,
      initialVelocities: velocities,
      edges: new Uint32Array(edgeList),
    }
  }, [])

  useEffect(() => {
    particlesRef.current = initialPositions.slice()
    particleVelocityRef.current = initialVelocities.slice()
    edgesRef.current = edges
    edgeCountRef.current = edges.length / 2
  }, [initialPositions, initialVelocities, edges])

  useFrame((state) => {
    timeRef.current += 1

    if (meshRef.current && particlesRef.current && particleVelocityRef.current) {
      const positions = particlesRef.current
      const velocities = particleVelocityRef.current

      // Update particle positions with velocity
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocities[i]
        positions[i + 1] += velocities[i + 1]
        positions[i + 2] += velocities[i + 2]

        // Boundary wrapping for continuous motion
        if (positions[i] > 25) {
          positions[i] = -25
          velocities[i] = -velocities[i]
        }
        if (positions[i] < -25) {
          positions[i] = 25
          velocities[i] = -velocities[i]
        }
        if (positions[i + 1] > 20) {
          positions[i + 1] = -20
          velocities[i + 1] = -velocities[i + 1]
        }
        if (positions[i + 1] < -20) {
          positions[i + 1] = 20
          velocities[i + 1] = -velocities[i + 1]
        }
        if (positions[i + 2] > 25) {
          positions[i + 2] = -25
          velocities[i + 2] = -velocities[i + 2]
        }
        if (positions[i + 2] < -25) {
          positions[i + 2] = 25
          velocities[i + 2] = -velocities[i + 2]
        }
      }

      const positionAttribute = meshRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
      positionAttribute.array = positions
      positionAttribute.needsUpdate = true

      // Add color pulsing based on movement
      const colorAttribute = meshRef.current.geometry.getAttribute('color') as THREE.BufferAttribute
      const colors = colorAttribute.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const pulse = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(timeRef.current * 0.003 + i * 0.02))
        const hue = 0.54 + pulse * 0.08
        const sat = 1
        const light = 0.35 + pulse * 0.25

        const color = new THREE.Color()
        color.setHSL(hue, sat, light)

        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      }
      colorAttribute.needsUpdate = true
    }

    // Update line connections with light pulses
    if (linesRef.current && edgesRef.current && particlesRef.current) {
      const positions = particlesRef.current
      const linePositions = linesRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
      const linePositionsArray = linePositions.array as Float32Array
      const lineColors = linesRef.current.geometry.getAttribute('color') as THREE.BufferAttribute
      const lineColorsArray = lineColors.array as Float32Array

      for (let i = 0; i < edgesRef.current.length; i += 2) {
        const startIdx = edgesRef.current[i] * 3
        const endIdx = edgesRef.current[i + 1] * 3
        const lineIdx = i

        linePositionsArray[lineIdx * 3] = positions[startIdx]
        linePositionsArray[lineIdx * 3 + 1] = positions[startIdx + 1]
        linePositionsArray[lineIdx * 3 + 2] = positions[startIdx + 2]

        linePositionsArray[(lineIdx + 1) * 3] = positions[endIdx]
        linePositionsArray[(lineIdx + 1) * 3 + 1] = positions[endIdx + 1]
        linePositionsArray[(lineIdx + 1) * 3 + 2] = positions[endIdx + 2]

        // Animated light pulse
        const pulse = Math.sin(timeRef.current * 0.005 + i * 0.1)
        const intensity = Math.max(0.2, pulse) * 0.7

        const color = new THREE.Color()
        color.setHSL(0.54, 1, 0.25 + intensity * 0.35)

        lineColorsArray[lineIdx * 3] = color.r
        lineColorsArray[lineIdx * 3 + 1] = color.g
        lineColorsArray[lineIdx * 3 + 2] = color.b

        lineColorsArray[(lineIdx + 1) * 3] = color.r
        lineColorsArray[(lineIdx + 1) * 3 + 1] = color.g
        lineColorsArray[(lineIdx + 1) * 3 + 2] = color.b
      }

      linePositions.needsUpdate = true
      lineColors.needsUpdate = true
    }

    // Cinematic camera drift
    if (cameraRef.current) {
      cameraRef.current.position.x = Math.sin(timeRef.current * 0.0001) * 4
      cameraRef.current.position.y = Math.sin(timeRef.current * 0.00008) * 2
      cameraRef.current.position.z = 28 + Math.cos(timeRef.current * 0.00012) * 3
      cameraRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} position={[0, 0, 28]} fov={75} near={0.1} far={1000} makeDefault />

      <ambientLight intensity={0.12} color={0x00d9ff} />
      <directionalLight position={[12, 8, 8]} intensity={0.35} color={0x0099ff} />
      <pointLight position={[-12, -6, -12]} intensity={0.25} color={0x00d9ff} />

      {/* Particles */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={initialPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={new Float32Array(particleCount * 3).fill(0.5)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.25} sizeAttenuation vertexColors transparent opacity={0.85} />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={edges.length}
            array={new Float32Array(edges.length * 3)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={edges.length}
            array={new Float32Array(edges.length * 3).fill(0.4)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.6} linewidth={1} />
      </lineSegments>

      <fog attach="fog" args={[0x000000, 8, 55]} />
      <Preload all />
    </>
  )
}

export const NeuralNetworkBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          precision: 'mediump',
        }}
        performance={{ min: 0.5, max: 1 }}
      >
        <color attach="background" args={[0x000000]} />
        <TechMeshScene />
      </Canvas>
    </div>
  )
}
