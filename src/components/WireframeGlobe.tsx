import { useEffect, useRef } from "react";

interface WireframeGlobeProps {
  scrollProgress: number;
}

export const WireframeGlobe = ({ scrollProgress }: WireframeGlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 500;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = 180;

    const drawGlobe = () => {
      ctx.clearRect(0, 0, size, size);

      const baseRotation = rotationRef.current;
      const scrollRotation = scrollProgress * 0.7; // 0 → ~40deg
      const totalRotation = baseRotation + scrollRotation;

      // Outer glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.4);
      glowGrad.addColorStop(0, "hsl(199 89% 48% / 0.06)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, size, size);

      ctx.strokeStyle = "hsl(199 89% 48% / 0.15)";
      ctx.lineWidth = 0.8;

      // Latitude lines
      for (let lat = -80; lat <= 80; lat += 20) {
        const latRad = (lat * Math.PI) / 180;
        const r = radius * Math.cos(latRad);
        const y = cy + radius * Math.sin(latRad);

        ctx.beginPath();
        ctx.ellipse(cx, y, r, r * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude lines
      for (let lon = 0; lon < 180; lon += 20) {
        const lonRad = ((lon + totalRotation * 50) * Math.PI) / 180;
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 2) {
          const latRad = (lat * Math.PI) / 180;
          const x = cx + radius * Math.cos(latRad) * Math.sin(lonRad);
          const y = cy + radius * Math.sin(latRad);
          if (lat === -90) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Equator highlight
      ctx.strokeStyle = "hsl(199 89% 48% / 0.25)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius, radius * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Dot nodes at intersections
      for (let lat = -60; lat <= 60; lat += 30) {
        for (let lon = 0; lon < 360; lon += 40) {
          const latRad = (lat * Math.PI) / 180;
          const lonRad = ((lon + totalRotation * 50) * Math.PI) / 180;
          const x = cx + radius * Math.cos(latRad) * Math.sin(lonRad);
          const y = cy + radius * Math.sin(latRad);
          const z = Math.cos(latRad) * Math.cos(lonRad);

          if (z > -0.1) {
            const alpha = 0.15 + z * 0.4;
            ctx.fillStyle = `hsl(199 89% 48% / ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      rotationRef.current += 0.002;
      requestAnimationFrame(drawGlobe);
    };

    const animId = requestAnimationFrame(drawGlobe);
    return () => cancelAnimationFrame(animId);
  }, [scrollProgress]);

  const scale = 1 + scrollProgress * 0.08;
  const exitProgress = Math.max(0, (scrollProgress - 0.7) / 0.3);
  const translateX = exitProgress * 120;
  const opacity = 1 - exitProgress;
  const blur = exitProgress * 6;

  return (
    <canvas
      ref={canvasRef}
      className="will-change-transform"
      style={{
        transform: `scale(${scale}) translateX(${translateX}px)`,
        opacity,
        filter: `blur(${blur}px)`,
        transition: "none",
      }}
    />
  );
};
