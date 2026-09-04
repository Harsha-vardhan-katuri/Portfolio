import { useEffect, useRef } from "react";

interface ParticleTextProps {
  lines: string[];
  particleSize?: number;
  density?: number; // gap between sampled pixels (lower = denser)
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number; // ms
  stagger?: number; // ms total stagger window
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  fontSize?: number; // px at dpr 1
  fontWeight?: number;
  fontFamily?: string;
  className?: string;
}

interface Particle {
  x: number; y: number;      // current
  tx: number; ty: number;    // target
  sx: number; sy: number;    // scatter origin
  delay: number;
  highlight: boolean;
  phase: number;
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Particle text: samples text pixels offscreen, gathers particles from a
 * scattered start, then lets them idle-drift and repel from the pointer.
 * All work happens on a single canvas — cheap and smooth.
 */
export const ParticleText = ({
  lines,
  particleSize = 2.2,
  density = 4,
  color = "#f1f0fa",
  highlightColor = "#a78bfa",
  scatter = 190,
  gatherDuration = 1600,
  stagger = 420,
  pointerRepel = 42,
  repelRadius = 120,
  idleDrift = 0.8,
  fontSize = 96,
  fontWeight = 800,
  fontFamily = "'Space Grotesk', 'Inter', sans-serif",
  className = "",
}: ParticleTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let start = 0;
    let particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const build = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Responsive font size
      const fs = Math.min(fontSize, (w / Math.max(...lines.map((l) => l.length))) * 1.6);
      const lineHeight = fs * 1.15;

      // Sample text pixels offscreen
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.fillStyle = "#fff";
      octx.font = `${fontWeight} ${fs}px ${fontFamily}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      const totalH = lineHeight * lines.length;
      lines.forEach((line, i) => {
        octx.fillText(line, w / 2, h / 2 - totalH / 2 + lineHeight * (i + 0.5));
      });

      const data = octx.getImageData(0, 0, w, h).data;
      particles = [];
      for (let y = 0; y < h; y += density) {
        for (let x = 0; x < w; x += density) {
          if (data[(y * w + x) * 4 + 3] > 128) {
            const a = Math.random() * Math.PI * 2;
            const r = scatter * (0.4 + Math.random() * 0.6);
            particles.push({
              x: x + Math.cos(a) * r,
              y: y + Math.sin(a) * r,
              tx: x,
              ty: y,
              sx: x + Math.cos(a) * r,
              sy: y + Math.sin(a) * r,
              delay: Math.random() * stagger,
              highlight: Math.random() < 0.12,
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }
      start = performance.now();
    };

    const tick = (now: number) => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const elapsed = now - start;

      for (const p of particles) {
        const t = Math.min(Math.max((elapsed - p.delay) / gatherDuration, 0), 1);
        const e = easeOutExpo(t);

        let px = p.sx + (p.tx - p.sx) * e;
        let py = p.sy + (p.ty - p.sy) * e;

        // idle drift once gathered
        if (t >= 1) {
          px += Math.sin(now * 0.0012 + p.phase) * idleDrift;
          py += Math.cos(now * 0.001 + p.phase) * idleDrift;

          // pointer repel
          const dx = px - pointer.x;
          const dy = py - pointer.y;
          const d2 = dx * dx + dy * dy;
          const rr = repelRadius;
          if (d2 < rr * rr) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / rr) * pointerRepel;
            px += (dx / d) * f;
            py += (dy / d) * f;
          }
        }

        p.x = px;
        p.y = py;
        ctx.fillStyle = p.highlight ? highlightColor : color;
        ctx.globalAlpha = t >= 1 ? 0.95 : e * 0.95;
        if (p.highlight) {
          ctx.shadowColor = highlightColor;
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillRect(px, py, particleSize, particleSize);
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    // Wait for fonts so the sampled text uses the display font
    const ready = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve();
    let cancelled = false;
    ready.then(() => {
      if (cancelled) return;
      build();
      raf = requestAnimationFrame(tick);
    });

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [lines, particleSize, density, color, highlightColor, scatter, gatherDuration, stagger, pointerRepel, repelRadius, idleDrift, fontSize, fontWeight, fontFamily]);

  return (
    <div ref={wrapRef} className={className} style={{ touchAction: "pan-y" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
};
