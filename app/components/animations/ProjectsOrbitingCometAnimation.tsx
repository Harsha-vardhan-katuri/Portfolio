"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type * as THREE from "three"

function OrbitingComet() {
  const cometRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.Light>(null)

  useFrame(({ clock }) => {
    if (cometRef.current && lightRef.current) {
      const time = clock.getElapsedTime()
      const x = Math.cos(time * 0.5) * 8
      const z = Math.sin(time * 0.5) * 8
      const y = Math.sin(time * 0.3) * 3

      cometRef.current.position.set(x, y, z)
      ;(lightRef.current as THREE.PointLight).position.copy(cometRef.current.position)
    }
  })

  return (
    <>
      {/* Central dark purple planet */}
      <mesh position={[0, 0, 0]} scale={4}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#4a0080" roughness={1} metalness={0} />
      </mesh>

      {/* Orbiting cyan comet */}
      <mesh ref={cometRef} scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>

      {/* Light attached to comet */}
      <pointLight ref={lightRef} color="#00ffff" intensity={5} />
    </>
  )
}

export default function ProjectsOrbitingCometAnimation() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <OrbitingComet />
        <ambientLight intensity={0.3} />
      </Canvas>
    </div>
  )
}
