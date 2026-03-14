'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  baseColor: THREE.Color
  brightness: number
}

interface Edge {
  start: number
  end: number
  pulsePhase: number
}

const TechMeshScene = () => {
  const particlesRef = useRef<Particle[]>([])
  const edgesRef = useRef<Edge[]>([])
  const meshRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    // Create minimalistic tech mesh particles
    const particles: Particle[] = []
    const particleCount = 2000

    // Create particles in organized clusters for mesh appearance
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const radius = 10 + Math.random() * 15
      const height = (Math.random() - 0.5) * 30

      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 3
      const y = height + Math.sin(timeRef.current * 0.0005 + i * 0.01) * 2
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 3

      particles.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.02
        ),
        baseColor: new THREE.Color(0x00d9ff),
        brightness: Math.random() * 0.6 + 0.2,
      })
    }
    particlesRef.current = particles

    // Create edges between nearby particles (minimal connections for clean look)
    const edges: Edge[] = []
    const edgeDistance = 8

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < Math.min(i + 25, particleCount); j++) {
        const dist = particles[i].position.distanceTo(particles[j].position)
        if (dist < edgeDistance) {
          edges.push({
            start: i,
            end: j,
            pulsePhase: Math.random() * Math.PI * 2,
          })
        }
      }
    }
    edgesRef.current = edges
  }, [])

  useFrame((state) => {
    timeRef.current += 1

    // Smooth, minimal particle movement
    particlesRef.current.forEach((particle, i) => {
      particle.position.add(particle.velocity)

      // Gentle boundary wrapping
      if (particle.position.x > 25) particle.position.x = -25
      if (particle.position.x < -25) particle.position.x = 25
      if (particle.position.y > 15) particle.position.y = -15
      if (particle.position.y < -15) particle.position.y = 15
      if (particle.position.z > 25) particle.position.z = -25
      if (particle.position.z < -25) particle.position.z = 25

      // Subtle pulsing effect
      particle.brightness = 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(timeRef.current * 0.002 + i * 0.05))
    })

    // Update particle geometry with cyan/blue gradient
    if (meshRef.current) {
      const positionAttribute = meshRef.current.geometry.getAttribute('position')
      const colorAttribute = meshRef.current.geometry.getAttribute('color')

      particlesRef.current.forEach((particle, i) => {
        positionAttribute.setXYZ(i, particle.position.x, particle.position.y, particle.position.z)

        // Neon blue to cyan gradient
        const color = new THREE.Color()
        const hue = 0.52 + particle.brightness * 0.08 // Cyan to blue range
        const saturation = 1
        const lightness = 0.35 + particle.brightness * 0.25

        color.setHSL(hue, saturation, lightness)
        colorAttribute.setXYZ(i, color.r, color.g, color.b)
      })

      positionAttribute.needsUpdate = true
      colorAttribute.needsUpdate = true
    }

    // Update light pulses across edges
    if (linesRef.current) {
      const linePositions = linesRef.current.geometry.getAttribute('position')
      const lineColors = linesRef.current.geometry.getAttribute('color')

      edgesRef.current.forEach((edge, idx) => {
        const start = particlesRef.current[edge.start]
        const end = particlesRef.current[edge.end]

        const baseIdx = idx * 2

        linePositions.setXYZ(baseIdx, start.position.x, start.position.y, start.position.z)
        linePositions.setXYZ(baseIdx + 1, end.position.x, end.position.y, end.position.z)

        // Animated light pulse traveling along edges
        const pulse = Math.sin(timeRef.current * 0.005 + edge.pulsePhase)
        const pulseIntensity = Math.max(0, pulse) * 0.8

        const edgeColor = new THREE.Color()
        edgeColor.setHSL(0.54, 1, 0.25 + pulseIntensity * 0.4)

        lineColors.setXYZ(baseIdx, edgeColor.r, edgeColor.g, edgeColor.b)
        lineColors.setXYZ(baseIdx + 1, edgeColor.r, edgeColor.g, edgeColor.b)
      })

      linePositions.needsUpdate = true
      lineColors.needsUpdate = true
    }

    // Cinematic camera drift
    if (cameraRef.current) {
      cameraRef.current.position.x = Math.sin(timeRef.current * 0.0001) * 5
      cameraRef.current.position.z = 30 + Math.cos(timeRef.current * 0.00008) * 3
      cameraRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} position={[0, 0, 30]} fov={75} near={0.1} far={1000} makeDefault />

      {/* Volumetric lighting - ambient + directional */}
      <ambientLight intensity={0.15} color={0x00d9ff} />
      <directionalLight position={[10, 10, 10]} intensity={0.4} color={0x0099ff} />
      <pointLight position={[-15, -5, -15]} intensity={0.3} color={0x00d9ff} />

      {/* Particles - nodes of the mesh */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2000}
            array={new Float32Array(2000 * 3)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={2000}
            array={new Float32Array(2000 * 3).fill(0.5)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.3} sizeAttenuation vertexColors transparent opacity={0.8} />
      </points>

      {/* Connection lines with light pulses */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={edgesRef.current.length * 2}
            array={new Float32Array(Math.max(edgesRef.current.length * 2, 1) * 3)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={edgesRef.current.length * 2}
            array={new Float32Array(Math.max(edgesRef.current.length * 2, 1) * 3).fill(0.4)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.5} linewidth={1} />
      </lineSegments>

      {/* Fog for depth effect */}
      <fog attach="fog" args={[0x000000, 10, 60]} />
    </>
  )
}

export const NeuralNetworkBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <color attach="background" args={[0x000000]} />
        <TechMeshScene />
      </Canvas>
    </div>
  )
}
