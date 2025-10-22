"use client"

import { Canvas } from "@react-three/fiber"
import { RenderTexture } from "@react-three/drei"
import { Suspense } from "react"

function PhoneModel() {
  return (
    <group>
      {/* Placeholder for phone - using a simple box for now */}
      <mesh position={[0, 0, 0]} scale={[2, 3, 0.2]}>
        <boxGeometry />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.15]}>
        <planeGeometry args={[1.8, 2.8]} />
        <meshStandardMaterial>
          <RenderTexture attach="map">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <mesh>
                <planeGeometry args={[10, 10]} />
                <meshBasicMaterial color="#0a0a0a" />
              </mesh>
              {/* PCB circuit visualization */}
              <mesh position={[0, 0, 0.1]}>
                <planeGeometry args={[8, 8]} />
                <meshBasicMaterial color="#00ff00" wireframe emissive="#00ff00" emissiveIntensity={0.5} />
              </mesh>
              <pointLight position={[0, 0, 2]} intensity={2} color="#00ff00" />
            </Canvas>
          </RenderTexture>
        </meshStandardMaterial>
      </mesh>
    </group>
  )
}

export default function AboutPhoneAnimation() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <PhoneModel />
        </Suspense>
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  )
}
