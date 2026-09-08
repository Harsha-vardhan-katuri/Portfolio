import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type TopographyProps = {
  lowColor: string;
  midColor: string;
  highColor: string;
  speed: number;
  morphAmount: number;
  morphSpeed: number;
  bands: number;
  thickness: number;
  scale: number;
  pixelSize: number;
  glow: number;
  colorMode: "elevation";
  contrast: number;
  brightness: number;
  fillBands: boolean;
  opacity: number;
  grain: boolean;
  grainIntensity: number;
  mouseInteraction: boolean;
  mouseRadius: number;
  mouseStrength: number;
  /** Deterministic noise seed — same value renders the same field on every load. */
  seed?: number;
};

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uLowColor;
  uniform vec3 uMidColor;
  uniform vec3 uHighColor;
  uniform float uSpeed;
  uniform float uMorphAmount;
  uniform float uMorphSpeed;
  uniform float uBands;
  uniform float uThickness;
  uniform float uScale;
  uniform float uPixelSize;
  uniform float uGlow;
  uniform float uContrast;
  uniform float uBrightness;
  uniform float uFillBands;
  uniform float uOpacity;
  uniform float uGrain;
  uniform float uGrainIntensity;
  uniform float uMouseInteraction;
  uniform float uMouseRadius;
  uniform float uMouseStrength;
  uniform float uSeed;

  float hash(vec2 p) {
    return fract(sin(dot(p + uSeed, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + vec2(9.2, 3.7);
      amplitude *= 0.5;
    }
    return value;
  }

  vec3 elevationColor(float elevation) {
    vec3 lower = mix(uLowColor, uMidColor, smoothstep(0.0, 0.55, elevation));
    return mix(lower, uHighColor, smoothstep(0.52, 1.0, elevation));
  }

  void main() {
    vec2 frag = floor(gl_FragCoord.xy / uPixelSize) * uPixelSize;
    vec2 uv = frag / uResolution;
    vec2 p = uv - 0.5;
    p.x *= uResolution.x / uResolution.y;
    p *= uScale;

    float time = uTime * uSpeed;
    vec2 warp = vec2(
      fbm(p + vec2(time * uMorphSpeed, 0.0)),
      fbm(p + vec2(4.7, -time * uMorphSpeed))
    );
    float elevation = fbm(p + (warp - 0.5) * uMorphAmount + time * uMorphSpeed);

    if (uMouseInteraction > 0.5) {
      vec2 mouse = uMouse;
      float distanceToMouse = length(p - mouse);
      float influence = exp(-(distanceToMouse * distanceToMouse) /
        max(0.0001, uMouseRadius * uMouseRadius));
      elevation += influence * uMouseStrength;
    }

    // Apply contrast to the elevation field, not to the RGB channels. Applying
    // it to the supplied dark red/blue colors crushed most channels to black.
    float gradedElevation = clamp((elevation - 0.5) * uContrast + 0.5, 0.0, 1.0);
    // Keep contour geometry on the continuous field. Using the contrast-clamped
    // field here creates broad plateaus that incorrectly look like filled bands.
    float contour = fract(elevation * max(1.0, uBands * 6.0));
    float distanceToLine = min(contour, 1.0 - contour);
    float line = 1.0 - smoothstep(uThickness, uThickness + 0.02, distanceToLine);
    float halo = 1.0 - smoothstep(uThickness + 0.02, uThickness + 0.08, distanceToLine);

    vec3 color = elevationColor(gradedElevation) * uBrightness;

    vec3 background = vec3(0.003, 0.004, 0.015);
    float bandFill = uFillBands * 0.2 * gradedElevation;
    vec3 finalColor = background + color * bandFill;
    finalColor += color * halo * uGlow * 0.7;
    finalColor += color * line * (1.6 + uGlow);

    if (uGrain > 0.5) {
      float grainValue = hash(frag + floor(uTime * 24.0) * 97.31) - 0.5;
      finalColor += grainValue * uGrainIntensity;
    }

    gl_FragColor = vec4(max(finalColor, 0.0), uOpacity);
  }
`;

const TopographyPlane = (props: TopographyProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2());
  const elapsed = useRef(0);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2() },
      uLowColor: { value: new THREE.Color(props.lowColor) },
      uMidColor: { value: new THREE.Color(props.midColor) },
      uHighColor: { value: new THREE.Color(props.highColor) },
      uSpeed: { value: props.speed },
      uMorphAmount: { value: props.morphAmount },
      uMorphSpeed: { value: props.morphSpeed },
      uBands: { value: props.bands },
      uThickness: { value: props.thickness },
      uScale: { value: props.scale },
      uPixelSize: { value: props.pixelSize },
      uGlow: { value: props.glow },
      uContrast: { value: props.contrast },
      uBrightness: { value: props.brightness },
      uFillBands: { value: props.fillBands ? 1 : 0 },
      uOpacity: { value: props.opacity },
      uGrain: { value: props.grain ? 1 : 0 },
      uGrainIntensity: { value: props.grainIntensity },
      uMouseInteraction: { value: props.mouseInteraction ? 1 : 0 },
      uMouseRadius: { value: props.mouseRadius },
      uMouseStrength: { value: props.mouseStrength },
      uSeed: { value: props.seed ?? 1337 },
    }),
    [props, size.height, size.width],
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size.height, size.width, uniforms]);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    // Own accumulator (starts at exactly 0 on every mount, clamped delta)
    // so the animation is deterministic and frame-rate independent.
    elapsed.current += Math.min(delta, 1 / 30);
    material.uniforms.uTime.value = elapsed.current;
    const aspect = size.width / size.height;
    const targetX = state.pointer.x * 0.5 * aspect * props.scale;
    const targetY = state.pointer.y * 0.5 * props.scale;
    pointer.current.x += (targetX - pointer.current.x) * 0.08;
    pointer.current.y += (targetY - pointer.current.y) * 0.08;
    material.uniforms.uMouse.value.copy(pointer.current);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={props.opacity < 1}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export const Topography = (props: TopographyProps) => (
  <div className="absolute inset-0 z-0" aria-hidden="true">
    <Canvas
      dpr={1}
      flat
      gl={{ antialias: false, powerPreference: "high-performance", alpha: props.opacity < 1 }}
      camera={{ position: [0, 0, 1] }}
    >
      <TopographyPlane {...props} />
    </Canvas>
  </div>
);

export default Topography;