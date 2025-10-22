"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import { Points, PointsMaterial, PointsGeometry } from "@react-three/drei"

function PlanetWithAtmosphere() {
  const planetRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0001
      particlesRef.current.rotation.y += 0.0002
    }
  })

  return (
    <>
      {/* Dark planet */}
      <mesh ref={planetRef} position={[0, 0, 0]} scale={5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#0a0a1a" />
      </mesh>

      {/* Atmospheric glow */}
      <mesh position={[0, 0, 0]} scale={5.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#0066ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          emissive="#0066ff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Drifting data particles */}
      <Points ref={particlesRef}>
        <PointsGeometry args={[1000]}>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(1000 * 3).map(() => (Math.random() - 0.5) * 30)}
            count={1000}
            itemSize={3}
          />
        </PointsGeometry>
        <PointsMaterial size={0.02} color="#0099ff" transparent opacity={0.6} />
      </Points>
    </>
  )
}

export default function EducationPlanetAnimation() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <PlanetWithAtmosphere />
        <ambientLight intensity={0.2} />
      </Canvas>
    </div>
  )
}
