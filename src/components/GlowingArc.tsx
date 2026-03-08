import { useEffect, useRef } from "react";

export const GlowingArc = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let animId: number;
    let time = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.003;

      const cx = width / 2;
      const cy = height * 0.42;
      const radiusX = Math.min(width * 0.42, 580);
      const radiusY = radiusX * 0.95;

      // === Main arc ring ===
      // Draw multiple passes for glow buildup
      for (let pass = 0; pass < 3; pass++) {
        const blur = [40, 20, 4][pass];
        const alpha = [0.15, 0.3, 0.7][pass];
        const lineW = [12, 5, 1.8][pass];

        ctx.save();
        ctx.filter = `blur(${blur}px)`;
        ctx.lineWidth = lineW;
        ctx.globalAlpha = alpha;

        // Base ring gradient (blue → purple → blue)
        const grad = ctx.createLinearGradient(cx - radiusX, cy, cx + radiusX, cy);
        grad.addColorStop(0, "hsl(220 90% 55%)");
        grad.addColorStop(0.3, "hsl(250 80% 60%)");
        grad.addColorStop(0.5, "hsl(280 70% 55%)");
        grad.addColorStop(0.7, "hsl(250 80% 60%)");
        grad.addColorStop(1, "hsl(220 90% 55%)");
        ctx.strokeStyle = grad;

        ctx.beginPath();
        ctx.ellipse(cx, cy, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // === Sweeping light beam (rotating highlight) ===
      const sweepAngle = time * 1.2;
      const numBeams = 2;

      for (let b = 0; b < numBeams; b++) {
        const angle = sweepAngle + (b * Math.PI);
        const sweepWidth = 0.5; // radians

        for (let pass = 0; pass < 3; pass++) {
          const blur = [30, 12, 2][pass];
          const lineW = [16, 7, 2.5][pass];
          const alpha = [0.3, 0.5, 1][pass];

          ctx.save();
          ctx.filter = `blur(${blur}px)`;
          ctx.lineWidth = lineW;
          ctx.globalAlpha = alpha;

          // White-blue-pink gradient for the sweep
          const sweepGrad = ctx.createConicGradient(angle - sweepWidth, cx, cy);
          sweepGrad.addColorStop(0, "transparent");
          sweepGrad.addColorStop(0.05, "hsl(220 100% 70% / 0.3)");
          sweepGrad.addColorStop(0.15, "hsl(260 80% 80% / 0.8)");
          sweepGrad.addColorStop(0.2, "hsl(0 0% 100% / 1)");
          sweepGrad.addColorStop(0.25, "hsl(300 60% 70% / 0.8)");
          sweepGrad.addColorStop(0.35, "hsl(220 100% 70% / 0.3)");
          sweepGrad.addColorStop(0.5, "transparent");
          sweepGrad.addColorStop(1, "transparent");

          ctx.strokeStyle = sweepGrad;
          ctx.beginPath();
          ctx.ellipse(cx, cy, radiusX, radiusY, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // === Inner glow / atmosphere ===
      ctx.save();
      const innerGlow = ctx.createRadialGradient(cx, cy, radiusX * 0.2, cx, cy, radiusX * 1.1);
      innerGlow.addColorStop(0, "hsl(240 60% 50% / 0.04)");
      innerGlow.addColorStop(0.5, "hsl(260 60% 40% / 0.03)");
      innerGlow.addColorStop(1, "transparent");
      ctx.fillStyle = innerGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // === Small orbiting light particles on the ring ===
      for (let i = 0; i < 8; i++) {
        const pAngle = time * (0.8 + i * 0.15) + (i * Math.PI * 2 / 8);
        const px = cx + Math.cos(pAngle) * radiusX;
        const py = cy + Math.sin(pAngle) * radiusY;
        const pSize = 1 + Math.sin(time * 3 + i) * 0.5;

        ctx.save();
        ctx.globalAlpha = 0.4 + Math.sin(time * 2 + i * 1.5) * 0.3;
        ctx.filter = "blur(2px)";
        const pGrad = ctx.createRadialGradient(px, py, 0, px, py, pSize * 6);
        pGrad.addColorStop(0, "hsl(0 0% 100% / 0.9)");
        pGrad.addColorStop(0.3, "hsl(220 100% 80% / 0.5)");
        pGrad.addColorStop(1, "transparent");
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(px, py, pSize * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
