import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Animated WebGL aurora gradient background.
 * Single full-screen shader plane — extremely cheap, runs on the GPU.
 */
const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  // Simplex-ish smooth noise
  vec3 hash3(vec2 p){
    vec3 q = vec3(dot(p,vec2(127.1,311.7)),
                  dot(p,vec2(269.5,183.3)),
                  dot(p,vec2(419.2,371.9)));
    return fract(sin(q)*43758.5453);
  }
  float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    float a = hash3(i+vec2(0.0,0.0)).x;
    float b = hash3(i+vec2(1.0,0.0)).x;
    float c = hash3(i+vec2(0.0,1.0)).x;
    float d = hash3(i+vec2(1.0,1.0)).x;
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for(int i=0;i<5;i++){
      v += a*noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = (uv - 0.5);
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.08;
    vec2 q = vec2(fbm(p + t), fbm(p - t + 5.2));
    float n = fbm(p + q * 1.8 + uMouse * 0.15 + t);

    // Deep midnight base
    vec3 base = vec3(0.012, 0.02, 0.05);
    // Electric blue
    vec3 blue = vec3(0.20, 0.55, 1.0);
    // Violet
    vec3 violet = vec3(0.45, 0.25, 0.95);
    // Cyan highlight
    vec3 cyan = vec3(0.4, 0.9, 1.0);

    vec3 col = base;
    col = mix(col, blue * 0.55, smoothstep(0.35, 0.85, n));
    col = mix(col, violet * 0.6, smoothstep(0.55, 0.95, n) * 0.7);
    col += cyan * pow(smoothstep(0.7, 1.0, n), 4.0) * 0.6;

    // Vignette
    float vig = smoothstep(1.2, 0.2, length(p));
    col *= vig;

    // Subtle grain
    float g = fract(sin(dot(uv * uResolution, vec2(12.9898,78.233))) * 43758.5453);
    col += (g - 0.5) * 0.025;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const vertex = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const ShaderPlane = () => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
    // ease mouse
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05;
    matRef.current.uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export const ShaderHero = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
        camera={{ position: [0, 0, 1] }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
};

/**
 * Fixed, page-wide variant of the shader — sits behind every section so the
 * same animated 3D background flows through the whole site.
 */
export const ShaderBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
        camera={{ position: [0, 0, 1] }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
};
