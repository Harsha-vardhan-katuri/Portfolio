'use client'

import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

const AnimatedBackground = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!meshRef.current) return

    // Rotate based on scroll progress
    meshRef.current.rotation.x = scrollProgress * Math.PI * 2
    meshRef.current.rotation.y = scrollProgress * Math.PI * 2
    meshRef.current.rotation.z = scrollProgress * Math.PI

    // Scale based on scroll progress
    const scale = 1 + Math.sin(scrollProgress * Math.PI) * 0.3
    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <group ref={meshRef}>
      {/* Icosahedron that rotates with scroll */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[2, 4]} />
        <meshPhongMaterial
          color="#3b82f6"
          emissive="#1e40af"
          wireframe={false}
          opacity={0.6}
          transparent
        />
      </mesh>

      {/* Orbiting spheres */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((scrollProgress * Math.PI * 2 + (i * Math.PI * 2) / 3)) * 5,
            Math.sin((scrollProgress * Math.PI * 2 + (i * Math.PI * 2) / 3)) * 5,
            Math.cos((scrollProgress * Math.PI + (i * Math.PI) / 3)) * 3,
          ]}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshPhongMaterial color="#60a5fa" emissive="#3b82f6" />
        </mesh>
      ))}
    </group>
  )
}

export const SyncedBackgroundAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = scrollHeight > 0 ? scrolled / scrollHeight : 0

      scrollProgressRef.current = progress
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          clearColor: 0x0f0f0f,
        }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
      >
        <ambientLight intensity={0.5} color="#3b82f6" />
        <directionalLight position={[10, 10, 10]} intensity={0.8} color="#60a5fa" />
        <directionalLight position={[-10, -10, -10]} intensity={0.4} color="#1e40af" />

        {/* Pass scroll progress to animated background */}
        <group>
          <AnimatedBackground scrollProgress={scrollProgressRef.current} />
        </group>

        <fog attach="fog" args={['#0f0f0f', 5, 50]} />
      </Canvas>
    </div>
  )
}
