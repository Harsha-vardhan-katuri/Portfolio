"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function PlanetAtmosphereAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 1)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    // Create planet
    const planetGeometry = new THREE.SphereGeometry(1.5, 64, 64)
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x0a0a2e })
    const planet = new THREE.Mesh(planetGeometry, planetMaterial)
    scene.add(planet)

    // Create atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.6, 64, 64)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          vec3 glow = vec3(0.0, 0.3, 0.6) * fresnel;
          gl_FragColor = vec4(glow, fresnel * 0.4);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
    })
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphere)

    // Create data particles
    const particleCount = 200
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleVelocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 15
      particlePositions[i + 1] = (Math.random() - 0.5) * 15
      particlePositions[i + 2] = (Math.random() - 0.5) * 15

      particleVelocities[i] = (Math.random() - 0.5) * 0.02
      particleVelocities[i + 1] = (Math.random() - 0.5) * 0.02
      particleVelocities[i + 2] = (Math.random() - 0.5) * 0.02
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x0088ff,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate planet
      planet.rotation.y += 0.0002

      // Animate particles
      const positions = particleGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += particleVelocities[i]
        positions[i + 1] += particleVelocities[i + 1]
        positions[i + 2] += particleVelocities[i + 2]

        // Wrap around
        if (Math.abs(positions[i]) > 7.5) particleVelocities[i] *= -1
        if (Math.abs(positions[i + 1]) > 7.5) particleVelocities[i + 1] *= -1
        if (Math.abs(positions[i + 2]) > 7.5) particleVelocities[i + 2] *= -1
      }
      particleGeometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-screen" />
}
