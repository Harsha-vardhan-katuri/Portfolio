"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function SolarEclipseAnimation() {
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

    // Create dark sphere (moon)
    const moonGeometry = new THREE.SphereGeometry(1, 64, 64)
    const moonMaterial = new THREE.MeshBasicMaterial({ color: 0x1a1a1a })
    const moon = new THREE.Mesh(moonGeometry, moonMaterial)
    scene.add(moon)

    // Create corona effect
    const coronaGeometry = new THREE.SphereGeometry(1.1, 64, 64)
    const coronaMaterial = new THREE.ShaderMaterial({
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
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
          vec3 corona = mix(vec3(0.0, 0.5, 1.0), vec3(1.0, 1.0, 1.0), fresnel);
          float pulse = 0.5 + 0.5 * sin(time * 2.0);
          gl_FragColor = vec4(corona * pulse, fresnel * 0.8);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
    })
    const corona = new THREE.Mesh(coronaGeometry, coronaMaterial)
    scene.add(corona)

    // Create god rays
    const rayCount = 12
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2
      const rayGeometry = new THREE.ConeGeometry(0.3, 4, 16)
      const rayMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
      })
      const ray = new THREE.Mesh(rayGeometry, rayMaterial)
      ray.position.x = Math.cos(angle) * 2
      ray.position.y = Math.sin(angle) * 2
      ray.rotation.z = angle
      scene.add(ray)
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Move moon across screen
      const time = Date.now() * 0.0003
      moon.position.x = Math.sin(time) * 2
      moon.position.y = Math.cos(time * 0.5) * 0.5

      // Update corona
      if (coronaMaterial.uniforms) {
        coronaMaterial.uniforms.time.value = Date.now() * 0.001
      }

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
