'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  size: number
  brightness: number
}

interface Connection {
  start: number
  end: number
  progress: number
}

const NeuralNetworkScene = () => {
  const particlesRef = useRef<Particle[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const meshRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const frameCountRef = useRef(0)

  useEffect(() => {
    // Create neural network particles (nodes)
    const particles: Particle[] = []
    const particleCount = 1500

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 40
      const y = (Math.random() - 0.5) * 40
      const z = (Math.random() - 0.5) * 40

      particles.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08
        ),
        size: Math.random() * 0.4 + 0.2,
        brightness: Math.random() * 0.7 + 0.3,
      })
    }
    particlesRef.current = particles

    // Create connections between nearby particles
    const connections: Connection[] = []
    const connectionDistance = 12

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < Math.min(i + 40, particleCount); j++) {
        const dist = particles[i].position.distanceTo(particles[j].position)
        if (dist < connectionDistance) {
          connections.push({
            start: i,
            end: j,
            progress: Math.random(),
          })
        }
      }
    }
    connectionsRef.current = connections
  }, [])

  useFrame((state) => {
    frameCountRef.current++

    // Update particle positions
    particlesRef.current.forEach((particle) => {
      particle.position.add(particle.velocity)

      // Boundary wrapping
      if (particle.position.x > 20) particle.position.x = -20
      if (particle.position.x < -20) particle.position.x = 20
      if (particle.position.y > 20) particle.position.y = -20
      if (particle.position.y < -20) particle.position.y = 20
      if (particle.position.z > 20) particle.position.z = -20
      if (particle.position.z < -20) particle.position.z = 20

      // Pulsing brightness
      particle.brightness =
        0.3 +
        0.7 * (0.5 + 0.5 * Math.sin(frameCountRef.current * 0.01 + particle.position.x))
    })

    // Update particles geometry
    if (meshRef.current) {
      const positionAttribute = meshRef.current.geometry.getAttribute('position')
      const colorAttribute = meshRef.current.geometry.getAttribute('color')

      particlesRef.current.forEach((particle, i) => {
        positionAttribute.setXYZ(i, particle.position.x, particle.position.y, particle.position.z)
        const color = new THREE.Color()
        color.setHSL(0.55 + particle.brightness * 0.1, 1, 0.4 + particle.brightness * 0.2)
        colorAttribute.setXYZ(i, color.r, color.g, color.b)
      })

      positionAttribute.needsUpdate = true
      colorAttribute.needsUpdate = true
    }

    // Update connections
    if (linesRef.current) {
      connectionsRef.current.forEach((conn, idx) => {
        conn.progress = (conn.progress + 0.002) % 1
      })

      const linePositions: number[] = []
      const lineColors: number[] = []

      connectionsRef.current.forEach((conn) => {
        const start = particlesRef.current[conn.start].position
        const end = particlesRef.current[conn.end].position

        linePositions.push(start.x, start.y, start.z)
        linePositions.push(end.x, end.y, end.z)

        const alpha = Math.sin(conn.progress * Math.PI) * 0.6
        const color = new THREE.Color().setHSL(0.55, 1, 0.5)
        lineColors.push(color.r, color.g, color.b)
        lineColors.push(color.r, color.g, color.b)
      })

      const posAttr = linesRef.current.geometry.getAttribute('position')
      const colAttr = linesRef.current.geometry.getAttribute('color')

      if (posAttr instanceof THREE.BufferAttribute) {
        posAttr.array = new Float32Array(linePositions)
        posAttr.needsUpdate = true
      }

      if (colAttr instanceof THREE.BufferAttribute) {
        colAttr.array = new Float32Array(lineColors)
        colAttr.needsUpdate = true
      }
    }

    // Cinematic camera drift
    if (cameraRef.current) {
      const driftX = Math.sin(frameCountRef.current * 0.0005) * 8
      const driftY = Math.cos(frameCountRef.current * 0.0003) * 6
      const driftZ = 25 + Math.sin(frameCountRef.current * 0.0004) * 5

      cameraRef.current.position.lerp(
        new THREE.Vector3(driftX, driftY, driftZ),
        0.05
      )
      cameraRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} position={[0, 0, 25]} fov={60} near={0.1} far={1000} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#3b82f6" />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#06b6d4" />

      {/* Particles */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1500}
            array={new Float32Array(1500 * 3).map(() => (Math.random() - 0.5) * 40)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={1500}
            array={new Float32Array(1500 * 3).map(() => Math.random())}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.8}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
          fog={false}
        />
      </points>

      {/* Connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={0}
            array={new Float32Array(0)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={0}
            array={new Float32Array(0)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          opacity={0.4}
          fog={false}
          linewidth={1}
        />
      </lineSegments>

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a1a', 10, 80]} />
    </>
  )
}

export const NeuralNetworkBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <Canvas
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <NeuralNetworkScene />
      </Canvas>
    </div>
  )
}
