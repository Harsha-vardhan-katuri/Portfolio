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

    const drawArc = (
      cx: number, cy: number,
      rx: number, ry: number,
      startAngle: number, endAngle: number,
      lineWidth: number, blur: number, alpha: number,
      color: string | CanvasGradient
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      if (blur > 0) ctx.filter = `blur(${blur}px)`;
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, startAngle, endAngle);
      ctx.stroke();
      ctx.restore();
    };

    const drawGlowArc = (
      cx: number, cy: number,
      rx: number, ry: number,
      arcStart: number, arcEnd: number,
      brightness: number
    ) => {
      // Outer diffuse glow
      const g1 = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
      g1.addColorStop(0, "hsl(240 70% 40% / 0.6)");
      g1.addColorStop(0.2, "hsl(250 80% 50% / 0.8)");
      g1.addColorStop(0.5, "hsl(260 70% 55% / 0.8)");
      g1.addColorStop(0.8, "hsl(250 80% 50% / 0.8)");
      g1.addColorStop(1, "hsl(240 70% 40% / 0.6)");
      drawArc(cx, cy, rx, ry, arcStart, arcEnd, 60, 50, 0.2 * brightness, g1);

      // Mid glow
      const g2 = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
      g2.addColorStop(0, "hsl(220 90% 50%)");
      g2.addColorStop(0.3, "hsl(250 80% 55%)");
      g2.addColorStop(0.5, "hsl(270 70% 55%)");
      g2.addColorStop(0.7, "hsl(250 80% 55%)");
      g2.addColorStop(1, "hsl(220 90% 50%)");
      drawArc(cx, cy, rx, ry, arcStart, arcEnd, 20, 25, 0.3 * brightness, g2);

      // Core line
      const core = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
      core.addColorStop(0, "hsl(220 100% 60% / 0.3)");
      core.addColorStop(0.15, "hsl(230 90% 65% / 0.8)");
      core.addColorStop(0.5, "hsl(260 80% 70% / 1)");
      core.addColorStop(0.85, "hsl(230 90% 65% / 0.8)");
      core.addColorStop(1, "hsl(220 100% 60% / 0.3)");
      drawArc(cx, cy, rx, ry, arcStart, arcEnd, 3.5, 3, 0.85 * brightness, core);

      // Thin bright edge
      drawArc(cx, cy, rx, ry, arcStart, arcEnd, 1.5, 0, 0.95 * brightness, core);
    };

    const drawSweepBeam = (
      cx: number, cy: number,
      rx: number, ry: number,
      arcStart: number, arcEnd: number,
      offset: number, speed: number
    ) => {
      const beamAngle = (time * speed + offset) % (Math.PI * 2);
      if (beamAngle < arcStart - 0.1 || beamAngle > arcEnd + 0.1) return;

      const bx = cx + Math.cos(beamAngle) * rx;
      const by = cy + Math.sin(beamAngle) * ry;

      // Bright point layers
      const layers = [
        { blur: 35, size: 50, alpha: 0.3 },
        { blur: 12, size: 25, alpha: 0.5 },
        { blur: 3, size: 8, alpha: 0.9 },
      ];
      for (const l of layers) {
        ctx.save();
        ctx.globalAlpha = l.alpha;
        ctx.filter = `blur(${l.blur}px)`;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, l.size);
        grad.addColorStop(0, "hsl(0 0% 100%)");
        grad.addColorStop(0.3, "hsl(220 100% 85%)");
        grad.addColorStop(0.6, "hsl(260 80% 70% / 0.5)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, l.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Bright segment
      const segS = beamAngle - 0.25;
      const segE = beamAngle + 0.25;
      drawArc(cx, cy, rx, ry, segS, segE, 8, 10, 0.7, "hsl(0 0% 100% / 0.9)");
      drawArc(cx, cy, rx, ry, segS, segE, 2.5, 1, 1.0, "hsl(0 0% 100%)");

      // Comet trail
      for (let t = 0; t < 18; t++) {
        const ta = beamAngle - t * 0.035;
        if (ta < arcStart || ta > arcEnd) continue;
        const tx = cx + Math.cos(ta) * rx;
        const ty = cy + Math.sin(ta) * ry;
        ctx.save();
        ctx.globalAlpha = (1 - t / 18) * 0.45;
        ctx.filter = "blur(5px)";
        const tg = ctx.createRadialGradient(tx, ty, 0, tx, ty, 10);
        tg.addColorStop(0, "hsl(260 80% 80%)");
        tg.addColorStop(1, "transparent");
        ctx.fillStyle = tg;
        ctx.beginPath();
        ctx.arc(tx, ty, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      const cx = width / 2;

      // ===== BIG ARC — facing DOWN (dome) =====
      // Center pushed above viewport so only bottom curve shows
      const bigRx = width * 0.48;
      const bigRy = height * 0.5;
      const bigCy = -bigRy * 0.1;
      const bigStart = 0.1;
      const bigEnd = Math.PI - 0.1;

      drawGlowArc(cx, bigCy, bigRx, bigRy, bigStart, bigEnd, 1.0);
      drawSweepBeam(cx, bigCy, bigRx, bigRy, bigStart, bigEnd, 0, 0.55);
      drawSweepBeam(cx, bigCy, bigRx, bigRy, bigStart, bigEnd, Math.PI, 0.45);

      // ===== TWO SMALL ARCS — facing UP =====
      // These sit inside the big arc, evenly spaced
      const smallRx = bigRx * 0.28;
      const smallRy = bigRy * 0.32;

      // Left small arc — facing up (draw upper half: PI to 2*PI)
      const leftCx = cx - bigRx * 0.32;
      // Position vertically where the big arc passes
      const leftCy = bigCy + Math.sin(Math.PI * 0.35) * bigRy;
      const smallStart = Math.PI + 0.15;
      const smallEnd = Math.PI * 2 - 0.15;

      drawGlowArc(leftCx, leftCy, smallRx, smallRy, smallStart, smallEnd, 0.6);
      drawSweepBeam(leftCx, leftCy, smallRx, smallRy, smallStart, smallEnd, 0.5, 0.7);

      // Right small arc — facing up
      const rightCx = cx + bigRx * 0.32;
      const rightCy = leftCy;

      drawGlowArc(rightCx, rightCy, smallRx, smallRy, smallStart, smallEnd, 0.6);
      drawSweepBeam(rightCx, rightCy, smallRx, smallRy, smallStart, smallEnd, 1.5, 0.65);

      // === Ambient glow ===
      ctx.save();
      const ambGrad = ctx.createRadialGradient(cx, height * 0.3, 0, cx, height * 0.3, height * 0.5);
      ambGrad.addColorStop(0, "hsl(240 50% 40% / 0.06)");
      ambGrad.addColorStop(0.5, "hsl(260 50% 35% / 0.03)");
      ambGrad.addColorStop(1, "transparent");
      ctx.fillStyle = ambGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Pink accent flares
      const flareAngle1 = bigStart + 0.4 + Math.sin(time * 2) * 0.1;
      const flareAngle2 = bigEnd - 0.4 + Math.sin(time * 1.5) * 0.1;
      for (const fa of [flareAngle1, flareAngle2]) {
        const fx = cx + Math.cos(fa) * bigRx;
        const fy = bigCy + Math.sin(fa) * bigRy;
        ctx.save();
        ctx.globalAlpha = 0.25 + Math.sin(time * 3) * 0.1;
        ctx.filter = "blur(15px)";
        const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 28);
        fg.addColorStop(0, "hsl(320 80% 65%)");
        fg.addColorStop(0.5, "hsl(300 60% 50% / 0.4)");
        fg.addColorStop(1, "transparent");
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(fx, fy, 28, 0, Math.PI * 2);
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
