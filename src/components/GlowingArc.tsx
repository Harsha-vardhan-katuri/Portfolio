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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Draw a single clean arc with glow
    const drawCleanArc = (
      cx: number, cy: number,
      rx: number, ry: number,
      startAngle: number, endAngle: number,
      lineWidth: number, color: string, glowSize: number, glowAlpha: number
    ) => {
      // Outer glow layers
      for (let i = 3; i >= 0; i--) {
        ctx.save();
        ctx.globalAlpha = glowAlpha * (1 - i * 0.22);
        ctx.filter = `blur(${glowSize * (i + 1) * 0.4}px)`;
        ctx.lineWidth = lineWidth + i * 4;
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), 0, startAngle, endAngle);
        ctx.stroke();
        ctx.restore();
      }

      // Core sharp line
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = "hsl(210 100% 95%)";
      ctx.lineCap = "round";
      ctx.shadowColor = color;
      ctx.shadowBlur = glowSize * 0.6;
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), 0, startAngle, endAngle);
      ctx.stroke();
      ctx.restore();
    };

    // Light sweep — a bright pulse traveling along the arc
    const drawLightSweep = (
      cx: number, cy: number,
      rx: number, ry: number,
      startAngle: number, endAngle: number,
      sweepAngle: number, sweepLength: number
    ) => {
      const steps = 60;
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const angle = sweepAngle - t * sweepLength;
        if (angle < startAngle || angle > endAngle) continue;

        const x = cx + Math.cos(angle) * rx;
        const y = cy + Math.sin(angle) * ry;
        const alpha = (1 - t) * (1 - t); // quadratic falloff

        ctx.save();
        ctx.globalAlpha = alpha * 0.9;
        ctx.filter = `blur(${2 + t * 6}px)`;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 12 + (1 - t) * 20);
        grad.addColorStop(0, "hsl(210 100% 98%)");
        grad.addColorStop(0.3, "hsl(215 100% 80%)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 12 + (1 - t) * 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Bright head
      const hx = cx + Math.cos(sweepAngle) * rx;
      const hy = cy + Math.sin(sweepAngle) * ry;
      if (sweepAngle >= startAngle && sweepAngle <= endAngle) {
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.filter = "blur(2px)";
        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 18);
        hg.addColorStop(0, "hsl(0 0% 100%)");
        hg.addColorStop(0.2, "hsl(210 100% 90%)");
        hg.addColorStop(0.5, "hsl(220 100% 70% / 0.5)");
        hg.addColorStop(1, "transparent");
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(hx, hy, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.004;

      const cx = width / 2;

      // === MAIN DOME — large semi-circle spanning top half ===
      const mainRx = width * 0.48;
      const mainRy = height * 0.75;
      const mainCy = height * 0.02; // pushed up so dome covers top half
      const mainStart = 0.05;
      const mainEnd = Math.PI - 0.05;

      drawCleanArc(cx, mainCy, mainRx, mainRy, mainStart, mainEnd, 1.5, "hsl(215 100% 60%)", 20, 0.35);

      // Sweep on main dome
      const sweep1 = mainStart + ((time * 0.5) % 1) * (mainEnd - mainStart);
      drawLightSweep(cx, mainCy, mainRx, mainRy, mainStart, mainEnd, sweep1, 0.4);

      // Second sweep, offset
      const sweep1b = mainStart + ((time * 0.5 + 0.55) % 1) * (mainEnd - mainStart);
      drawLightSweep(cx, mainCy, mainRx, mainRy, mainStart, mainEnd, sweep1b, 0.3);

      // === INNER ARC 1 — slightly smaller, offset left ===
      const inner1Rx = mainRx * 0.72;
      const inner1Ry = mainRy * 0.68;
      const inner1Cx = cx - width * 0.02;
      const inner1Cy = mainCy + height * 0.06;
      const inner1Start = 0.15;
      const inner1End = Math.PI * 0.75;

      drawCleanArc(inner1Cx, inner1Cy, inner1Rx, inner1Ry, inner1Start, inner1End, 1.0, "hsl(220 100% 55%)", 14, 0.25);

      const sweep2 = inner1Start + ((time * 0.6 + 0.2) % 1) * (inner1End - inner1Start);
      drawLightSweep(inner1Cx, inner1Cy, inner1Rx, inner1Ry, inner1Start, inner1End, sweep2, 0.35);

      // === INNER ARC 2 — slightly smaller, offset right ===
      const inner2Rx = mainRx * 0.58;
      const inner2Ry = mainRy * 0.55;
      const inner2Cx = cx + width * 0.04;
      const inner2Cy = mainCy + height * 0.1;
      const inner2Start = Math.PI * 0.3;
      const inner2End = Math.PI - 0.12;

      drawCleanArc(inner2Cx, inner2Cy, inner2Rx, inner2Ry, inner2Start, inner2End, 0.8, "hsl(225 100% 55%)", 12, 0.2);

      const sweep3 = inner2Start + ((time * 0.45 + 0.4) % 1) * (inner2End - inner2Start);
      drawLightSweep(inner2Cx, inner2Cy, inner2Rx, inner2Ry, inner2Start, inner2End, sweep3, 0.3);

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
