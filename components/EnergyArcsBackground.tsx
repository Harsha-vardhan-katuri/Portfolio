'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RainbowArcPattern: React.FC<{ patternIndex: number; time: number }> = ({ patternIndex, time }) => {
  const lineGroupRef = useRef<THREE.Group>(null)
  
  // Create thick rainbow-like arcs with geometric patterns
  const { lines } = useMemo(() => {
    const lines: THREE.Mesh[] = []
    const patterns = [
      createConcentricRainbowArcs,
      createSemicircleArcs,
      createTriangleArcs,
      createDoubleRainbowArcs,
      createWaveRainbowArcs,
    ]
    
    const patternFunc = patterns[patternIndex % patterns.length]
    return { lines: patternFunc() }
  }, [patternIndex])
  
  useFrame(() => {
    if (lineGroupRef.current) {
      lines.forEach((line, idx) => {
        const material = line.material as THREE.MeshLine
        if (material.uniforms?.dashOffset) {
          material.uniforms.dashOffset.value = (time * 0.0005 + idx * 0.1) % 1
        }
      })
    }
  })
  
  return (
    <group ref={lineGroupRef}>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  )
}

function createConcentricRainbowArcs() {
  const lines: THREE.Mesh[] = []
  const colors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x9400d3]
  
  for (let i = 0; i < colors.length; i++) {
    const radius = 15 + i * 2
    const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.6, 0, Math.PI, false)
    const points = curve.getPoints(100)
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: colors[i],
      linewidth: 8,
      fog: false,
    })
    
    const line = new THREE.Line(geometry, material)
    line.position.z = i * 0.1
    lines.push(line)
  }
  
  return lines
}

function createSemicircleArcs() {
  const lines: THREE.Mesh[] = []
  const colors = [0x60a5fa, 0x3b82f6, 0x1e40af, 0x00d4ff, 0x60a5fa]
  
  for (let i = 0; i < 5; i++) {
    const radius = 12 + i * 2.5
    const curve = new THREE.EllipseCurve(0, -5, radius, radius * 0.7, Math.PI * 0.25, Math.PI * 0.75, false)
    const points = curve.getPoints(120)
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: colors[i],
      linewidth: 10,
      fog: false,
    })
    
    const line = new THREE.Line(geometry, material)
    lines.push(line)
  }
  
  return lines
}

function createTriangleArcs() {
  const lines: THREE.Mesh[] = []
  const colors = [0x60a5fa, 0x3b82f6, 0x1e3a8a, 0x0ea5e9, 0x06b6d4]
  
  for (let t = 0; t < 3; t++) {
    for (let i = 0; i < 3; i++) {
      const radius = 10 + i * 3
      const rotation = (Math.PI * 2 / 3) * t
      
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, rotation, rotation + Math.PI * 0.6, false)
      const points = curve.getPoints(80)
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: colors[(t * 3 + i) % colors.length],
        linewidth: 9,
        fog: false,
      })
      
      const line = new THREE.Line(geometry, material)
      lines.push(line)
    }
  }
  
  return lines
}

function createDoubleRainbowArcs() {
  const lines: THREE.Mesh[] = []
  const primaryColors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x9400d3]
  
  for (let i = 0; i < primaryColors.length; i++) {
    const radius = 14 + i * 2
    const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.65, 0, Math.PI, false)
    const points = curve.getPoints(100)
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: primaryColors[i],
      linewidth: 8,
      fog: false,
    })
    
    const line = new THREE.Line(geometry, material)
    line.position.y = 3
    lines.push(line)
  }
  
  for (let i = 0; i < primaryColors.length; i++) {
    const radius = 24 + i * 2
    const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.65, 0, Math.PI, false)
    const points = curve.getPoints(100)
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const color = new THREE.Color(primaryColors[i]).multiplyScalar(0.5)
    const material = new THREE.LineBasicMaterial({
      color: color,
      linewidth: 6,
      fog: false,
      opacity: 0.6,
      transparent: true,
    })
    
    const line = new THREE.Line(geometry, material)
    line.position.y = -3
    lines.push(line)
  }
  
  return lines
}

function createWaveRainbowArcs() {
  const lines: THREE.Mesh[] = []
  const colors = [0x60a5fa, 0x3b82f6, 0x1e40af, 0x00d4ff, 0x06b6d4, 0x0ea5e9]
  
  for (let w = 0; w < 3; w++) {
    for (let i = 0; i < 4; i++) {
      const radius = 10 + i * 2.5 + Math.sin(w * Math.PI / 3) * 2
      const yOffset = Math.cos(w * Math.PI / 3) * 5
      
      const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.7, Math.PI * 0.2, Math.PI * 0.8, false)
      const points = curve.getPoints(100)
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: colors[(w * 4 + i) % colors.length],
        linewidth: 9,
        fog: false,
      })
      
      const line = new THREE.Line(geometry, material)
      line.position.y = yOffset
      line.position.z = w * 0.5
      lines.push(line)
    }
  }
  
  return lines
}

const FloatingParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null)
  const timeRef = useRef(0)
  
  const { geometry } = useMemo(() => {
    const particleCount = 200
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 15 + Math.random() * 15
      const height = (Math.random() - 0.5) * 20
      
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius
      
      colors[i * 3] = 0.2 + Math.random() * 0.4
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.3
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
    }
    
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    return { geometry: geom }
  }, [])
  
  useFrame(() => {
    timeRef.current += 1
    if (pointsRef.current) {
      pointsRef.current.rotation.z += 0.0001
      const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < posArray.length; i += 3) {
        posArray[i + 1] += Math.sin(timeRef.current * 0.001 + i) * 0.02
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.3} vertexColors sizeAttenuation transparent opacity={0.7} />
    </points>
  )
}

export const EnergyArcsBackground: React.FC = () => {
  const timeRef = useRef(0)
  const currentPatternRef = useRef(0)
  
  useFrame(() => {
    timeRef.current += 1
    currentPatternRef.current = Math.floor((timeRef.current / 480) % 5)
  })
  
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 40], fov: 70 }}
        gl={{
          antialias: false,
          alpha: true,
          precision: 'lowp' as const,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1}
        frameloop="always"
        flat
        style={{ background: '#000000' }}
      >
        <ambientLight intensity={0.3} color={0x3b82f6} />
        <pointLight position={[20, 20, 20]} intensity={0.6} color={0x60a5fa} />
        <pointLight position={[-20, -20, 20]} intensity={0.4} color={0x1e40af} />
        
        <fog attach="fog" args={[0x000000, 5, 80]} />
        
        <RainbowArcPattern patternIndex={currentPatternRef.current} time={timeRef.current} />
        <FloatingParticles />
      </Canvas>
    </div>
  )
}
