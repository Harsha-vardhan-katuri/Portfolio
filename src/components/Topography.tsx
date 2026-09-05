import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Animated topography (contour-line) background.
 * Single full-screen shader plane — cheap, GPU-driven.
 * Props mirror the requested config: elevation color ramp, morphing bands,
 * mouse interaction, and subtle grain.
 */
const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

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
    for(int i=0;i<4;i++){
      v += a*noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  // Elevation ramp: low -> mid -> high
  vec3 ramp(float e){
    vec3 low = vec3(0.012, 0.027, 0.89);   // #0307e3 electric blue
    vec3 mid = vec3(0.447, 0.027, 0.027);  // #720707 deep red
    vec3 high = vec3(0.063, 0.725, 0.506); // #10B981 emerald
    vec3 c = mix(low, mid, smoothstep(0.0, 0.55, e));
    c = mix(c, high, smoothstep(0.55, 1.0, e));
    return c;
  }

  float height(vec2 p, float t){
    // morphing base field
    vec2 q = vec2(fbm(p + t * 0.05), fbm(p - t * 0.05 + 5.2));
    float h = fbm(p + q * 3.0 + t * 0.05);
    // mouse bump
    vec2 m = uMouse;
    float d = length(p - m);
    h += 0.4 * exp(-(d*d) / (0.3*0.3));
    return h;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = (uv - 0.5);
    p.x *= uResolution.x / uResolution.y;
    p *= 2.0; // scale

    float t = uTime * 0.35;
    float h = height(p, t);

    // 2 bands per unit -> contour frequency
    float lines = h * 24.0 * 2.0;
    float f = abs(fract(lines) - 0.5);
    float line = 1.0 - smoothstep(0.06, 0.12, f); // thickness 0.01-style thin lines

    vec3 col = ramp(h);
    // contrast 3
    col = (col - 0.5) * 3.0 + 0.5;
    // brightness 1, glow 0.5 on the lines
    vec3 lineCol = clamp(col, 0.0, 1.0) * (1.0 + 0.5 * 1.5) + 0.12;
    vec3 base = vec3(0.012, 0.008, 0.03); // near-black backdrop
    vec3 outCol = base + lineCol * line * 1.1;

    // faint filled tint so bands are readable
    outCol += clamp(col, 0.0, 1.0) * 0.05 * h;

    // vignette (gentle so lines stay visible)
    float vig = smoothstep(1.35, 0.35, length(p / 2.0)) * 0.35 + 0.65;
    outCol *= vig;

    // grain
    float g = fract(sin(dot(uv * uResolution, vec2(12.9898,78.233))) * 43758.5453);
    outCol += (g - 0.5) * 0.05;

    gl_FragColor = vec4(outCol, 1.0);
  }
`;

const vertex = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const TopoPlane = () => {
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
    const aspect = size.width / size.height;
    mouse.current.x += (state.pointer.x * 0.5 * aspect - mouse.current.x) * 0.06;
    mouse.current.y += (state.pointer.y * 0.5 - mouse.current.y) * 0.06;
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

/** Hero-scoped topography background. */
export const TopographyHero = () => (
  <div className="absolute inset-0 -z-10">
    <Canvas
      dpr={[0.75, 1]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      camera={{ position: [0, 0, 1] }}
    >
      <TopoPlane />
    </Canvas>
  </div>
);

export default TopographyHero;
