'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useScroll } from 'framer-motion'

const ShaderPlane = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0001
      const material = meshRef.current.material as THREE.ShaderMaterial
      if (material.uniforms) {
        material.uniforms.uTime.value += 0.01
        material.uniforms.uScroll.value = scrollProgress
      }
    }
  })

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform float uScroll;
    varying vec2 vUv;

    vec3 hash33(vec3 p3) {
      p3 = fract(p3 * vec3(.1031, .11369, .13787));
      p3 += dot(p3, p3.yxz + 19.19);
      return -1.0 + 2.0 * fract(vec3((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y, (p3.y + p3.z) * p3.x));
    }

    float simplex(vec3 p) {
      const float F3 = 0.3333333;
      const float G3 = 0.1666667;
      vec3 s = floor(p + dot(p, vec3(F3)));
      vec3 x = p - s + dot(s, vec3(G3));
      
      vec3 e = step(vec3(0.0), x - x.yzx);
      vec3 i1 = e * (1.0 - e.zxy);
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);
      
      vec3 x1 = x - i1 + G3;
      vec3 x2 = x - i2 + 2.0 * G3;
      vec3 x3 = x - 1.0 + 3.0 * G3;
      
      vec4 w, d;
      w.x = dot(x, x);
      w.y = dot(x1, x1);
      w.z = dot(x2, x2);
      w.w = dot(x3, x3);
      
      w = max(0.6 - w, 0.0);
      d.x = dot(hash33(s + 0.0), x);
      d.y = dot(hash33(s + i1), x1);
      d.z = dot(hash33(s + i2), x2);
      d.w = dot(hash33(s + 1.0), x3);
      
      w *= w;
      w *= w;
      d *= w;
      
      return dot(d, vec4(52.0));
    }

    void main() {
      vec2 uv = vUv;
      
      float noise = simplex(vec3(uv * 3.0, uTime * 0.2 + uScroll));
      float noise2 = simplex(vec3(uv * 6.0, uTime * 0.15 + uScroll * 0.5));
      
      vec3 color = vec3(0.03, 0.02, 0.05);
      
      float redGlow = abs(sin(uTime * 0.3 + noise)) * 0.15;
      float orangeGlow = abs(cos(uTime * 0.2 + noise2)) * 0.1;
      float tealGlow = abs(sin(uTime * 0.25 + noise2)) * 0.12;
      
      color += vec3(redGlow * 0.8, redGlow * 0.4, redGlow * 0.2);
      color += vec3(orangeGlow * 0.7, orangeGlow * 0.4, orangeGlow * 0.1);
      color += vec3(tealGlow * 0.2, tealGlow * 0.5, tealGlow * 0.6);
      
      float distortion = simplex(vec3(uv * 2.0, uTime * 0.1));
      color *= (0.8 + distortion * 0.2);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `

  return (
    <mesh ref={meshRef} scale={[window.innerWidth, window.innerHeight, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0 },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export const WebGLBackground = () => {
  const { scrollY } = useScroll()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? latest / maxScroll : 0)
    })
  }, [scrollY])

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas className="!absolute inset-0" camera={{ position: [0, 0, 1], fov: 75 }}>
        <ShaderPlane scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
