"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function HolographicGlobeAnimation() {
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

    // Create plexus network globe
    const nodeCount = 150
    const nodes: THREE.Vector3[] = []
    const nodeGeometry = new THREE.BufferGeometry()
    const nodePositions = new Float32Array(nodeCount * 3)

    // Generate nodes on sphere surface
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount)
      const theta = Math.sqrt(nodeCount * Math.PI) * phi

      const x = Math.cos(theta) * Math.sin(phi) * 2
      const y = Math.sin(theta) * Math.sin(phi) * 2
      const z = Math.cos(phi) * 2

      nodes.push(new THREE.Vector3(x, y, z))
      nodePositions[i * 3] = x
      nodePositions[i * 3 + 1] = y
      nodePositions[i * 3 + 2] = z
    }

    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3))

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x00ccff,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
    })

    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial)
    scene.add(nodePoints)

    // Create connections between nearby nodes
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions: number[] = []

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].distanceTo(nodes[j])
        if (distance < 1.2) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z)
          linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0088ff,
      transparent: true,
      opacity: 0.2,
      linewidth: 1,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate globe
      nodePoints.rotation.x += 0.0003
      nodePoints.rotation.y += 0.0005
      lines.rotation.x += 0.0003
      lines.rotation.y += 0.0005

      // Pulse nodes
      nodeMaterial.opacity = 0.6 + Math.sin(Date.now() * 0.002) * 0.2

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
