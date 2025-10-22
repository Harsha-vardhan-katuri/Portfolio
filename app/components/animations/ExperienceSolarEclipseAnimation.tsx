"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom, GodRays } from "@react-three/postprocessing"
import { useRef } from "react"
import type * as THREE from "three"

function SolarEclipse() {
  const planetRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.Light>(null)

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const intensity = 80 + Math.sin(clock.getElapsedTime() * 0.5) * 20
      ;(lightRef.current as THREE.PointLight).intensity = intensity
    }
  })

  return (
    <>
      {/* Black planet */}
      <mesh ref={planetRef} position={[0, 0, 0]} scale={5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Bright light behind planet */}
      <pointLight ref={lightRef} position={[0, 0, -10]} color="#6600ff" intensity={100} />

      {/* Post-processing effects */}
      <EffectComposer>
        <GodRays sun={planetRef.current} samples={60} density={0.97} decay={0.97} weight={0.4} exposure={0.6} />
        <Bloom intensity={2} kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  )
}

export default function ExperienceSolarEclipseAnimation() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <SolarEclipse />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  )
}
