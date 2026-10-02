import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import "./Lightfall.css";

const MAX_COLORS = 8;

const hexToRGB = (hex: string) => {
  const c = hex.replace("#", "").padEnd(6, "0");
  return [
    parseInt(c.slice(0, 2), 16) / 255,
    parseInt(c.slice(2, 4), 16) / 255,
    parseInt(c.slice(4, 6), 16) / 255,
  ];
};

const prepColors = (input?: string[]) => {
  const base = (input && input.length ? input : ["#A6C8FF", "#5227FF", "#FF9FFC"]).slice(0, MAX_COLORS);
  const count = base.length;
  const arr: number[][] = [];
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[Math.min(i, base.length - 1)]));
  const avg = [0, 0, 0];
  for (let i = 0; i < count; i++) {
    avg[0] += arr[i][0];
    avg[1] += arr[i][1];
    avg[2] += arr[i][2];
  }
  avg[0] /= count;
  avg[1] /= count;
  avg[2] /= count;
  return { arr, count, avg };
};

const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;
uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;
uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uColor4;
uniform vec3  uColor5;
uniform vec3  uColor6;
uniform vec3  uColor7;
uniform int   uColorCount;
uniform vec3  uBgColor;
uniform vec3  uMouseColor;
uniform float uSpeed;
uniform int   uStreakCount;
uniform float uStreakWidth;
uniform float uStreakLength;
uniform float uGlow;
uniform float uDensity;
uniform float uTwinkle;
uniform float uZoom;
uniform float uBgGlow;
uniform float uOpacity;
uniform float uMouseEnabled;
uniform float uMouseStrength;
uniform float uMouseRadius;
uniform float uLightMode;
varying vec2 vUv;

vec3 palette(float h) {
  int count = uColorCount;
  if (count < 1) count = 1;
  int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
  if (idx <= 0) return uColor0;
  if (idx == 1) return uColor1;
  if (idx == 2) return uColor2;
  if (idx == 3) return uColor3;
  if (idx == 4) return uColor4;
  if (idx == 5) return uColor5;
  if (idx == 6) return uColor6;
  return uColor7;
}

float hash(float n) {
  return fract(sin(n * 127.1 + 311.7) * 43758.5453);
}

void mainImage(out vec4 o, vec2 C) {
  vec2 r = iResolution.xy;
  // Fixed screen-space columns: every trail remains perfectly vertical.
  float spacing = max(18.0, 34.0 / max(uDensity, 0.2));
  float lane = floor(C.x / spacing);
  float x = (lane + 0.5) * spacing + (hash(lane) - 0.5) * spacing * 0.7;
  float dx = abs(C.x - x);
  float width = max(0.65, uStreakWidth * 0.85);
  float core = 1.0 - smoothstep(width * 0.3, width + 1.0, dx);
  float halo = exp(-dx * dx / (width * width * 16.0));
  float intensity = 0.0;
  for (int m = 0; m < 16; m++) {
    if (m >= uStreakCount) break;
    float seed = lane * 19.0 + float(m) * 43.0;
    float cycle = r.y * (1.9 + hash(seed) * 0.9);
    float speedPx = (85.0 + 65.0 * hash(seed + 3.0)) * uSpeed;
    float head = mod(iTime * speedPx + hash(seed + 7.0) * cycle, cycle);
    float lengthPx = (40.0 + 100.0 * hash(seed + 11.0)) * uStreakLength;
    float behind = head - (r.y - C.y);
    float line = smoothstep(-2.0, 2.0, behind) * (1.0 - smoothstep(lengthPx - 4.0, lengthPx + 2.0, behind));
    intensity = max(intensity, line * (0.42 + 0.58 * hash(seed + 17.0)));
  }
  vec3 col = palette(hash(lane + 23.0));
  vec3 light = col * (core + halo * 0.25) * intensity * uGlow;
  o = vec4(light, clamp((core + halo * 0.3) * intensity * uOpacity, 0.0, 1.0));
}

void main() {
  vec4 color;
  mainImage(color, vUv * iResolution.xy);
  gl_FragColor = color;
}
`;

export interface LightfallProps {
  className?: string;
  dpr?: number;
  paused?: boolean;
  colors?: string[];
  backgroundColor?: string;
  speed?: number;
  streakCount?: number;
  streakWidth?: number;
  streakLength?: number;
  glow?: number;
  density?: number;
  twinkle?: number;
  zoom?: number;
  backgroundGlow?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  mouseDampening?: number;
  lightMode?: boolean;
  mixBlendMode?: string;
}

const Lightfall = ({
  className,
  dpr,
  paused = false,
  colors = ["#A6C8FF", "#5227FF", "#FF9FFC"],
  backgroundColor = "#0A29FF",
  speed = 0.5,
  streakCount = 2,
  streakWidth = 1,
  streakLength = 1,
  glow = 1,
  density = 0.6,
  twinkle = 1,
  zoom = 3,
  backgroundGlow = 0.5,
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 0.5,
  mouseRadius = 1,
  mouseDampening = 0.15,
  lightMode = false,
  mixBlendMode,
}: LightfallProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const programRef = useRef<Program | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const geometryRef = useRef<Triangle | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseTargetRef = useRef<[number, number]>([0, 0]);
  const lastTimeRef = useRef(0);
  const colorKey = colors.join(",");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: dpr ?? (typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.5) : 1),
      alpha: true,
      antialias: true,
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const { arr, count, avg } = prepColors(colors);

    const uniforms = {
      iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uColor0: { value: arr[0] },
      uColor1: { value: arr[1] },
      uColor2: { value: arr[2] },
      uColor3: { value: arr[3] },
      uColor4: { value: arr[4] },
      uColor5: { value: arr[5] },
      uColor6: { value: arr[6] },
      uColor7: { value: arr[7] },
      uColorCount: { value: count },
      uBgColor: { value: hexToRGB(backgroundColor) },
      uMouseColor: { value: avg },
      uSpeed: { value: speed },
      uStreakCount: { value: Math.max(1, Math.min(16, Math.round(streakCount))) },
      uStreakWidth: { value: streakWidth },
      uStreakLength: { value: streakLength },
      uGlow: { value: glow },
      uDensity: { value: density },
      uTwinkle: { value: twinkle },
      uZoom: { value: zoom },
      uBgGlow: { value: backgroundGlow },
      uOpacity: { value: opacity },
      uMouseEnabled: { value: mouseInteraction ? 1 : 0 },
      uMouseStrength: { value: mouseStrength },
      uMouseRadius: { value: mouseRadius },
      uLightMode: { value: lightMode ? 1 : 0 },
    };

    const program = new Program(gl, { vertex, fragment, uniforms });
    programRef.current = program;
    const geometry = new Triangle(gl);
    geometryRef.current = geometry;
    const mesh = new Mesh(gl, { geometry, program });
    meshRef.current = mesh;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scale = renderer.dpr || 1;
      const x = (e.clientX - rect.left) * scale;
      const y = (rect.height - (e.clientY - rect.top)) * scale;
      mouseTargetRef.current = [x, y];
      if (mouseDampening <= 0) uniforms.iMouse.value = [x, y];
    };
    if (mouseInteraction) window.addEventListener("pointermove", onPointerMove);

    let inView = true;
    const io = new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), { threshold: 0 });
    io.observe(container);

    const loop = (t: number) => {
      rafRef.current = requestAnimationFrame(loop);
      uniforms.iTime.value = t * 0.001;
      if (mouseDampening > 0) {
        if (!lastTimeRef.current) lastTimeRef.current = t;
        const dt = (t - lastTimeRef.current) / 1000;
        lastTimeRef.current = t;
        const tau = Math.max(1e-4, mouseDampening);
        const factor = Math.min(1, 1 - Math.exp(-dt / tau));
        const target = mouseTargetRef.current;
        const cur = uniforms.iMouse.value as number[];
        cur[0] += (target[0] - cur[0]) * factor;
        cur[1] += (target[1] - cur[1]) * factor;
      } else {
        lastTimeRef.current = t;
      }
      if (!paused && inView && programRef.current && meshRef.current) {
        renderer.render({ scene: meshRef.current });
      }
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (mouseInteraction) window.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      io.disconnect();
      if (canvas.parentElement === container) container.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      programRef.current = null;
      geometryRef.current = null;
      meshRef.current = null;
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dpr,
    paused,
    colorKey,
    backgroundColor,
    speed,
    streakCount,
    streakWidth,
    streakLength,
    glow,
    density,
    twinkle,
    zoom,
    backgroundGlow,
    opacity,
    mouseInteraction,
    mouseStrength,
    mouseRadius,
    mouseDampening,
    lightMode,
  ]);

  return (
    <div
      ref={containerRef}
      className={`lightfall-container ${className ?? ""}`}
      style={{ ...(mixBlendMode ? { mixBlendMode: mixBlendMode as never } : {}) }}
    />
  );
};

export default Lightfall;
