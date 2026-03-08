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

    // Particles
    const particles: { x: number; y: number; size: number; speed: number; drift: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        size: 1 + Math.random() * 1.5,
        speed: 0.1 + Math.random() * 0.3,
        drift: (Math.random() - 0.5) * 0.5,
        opacity: 0.3 + Math.random() * 0.3,
      });
    }

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
      cx: number, cy: number, r: number,
      startAngle: number, endAngle: number,
      lineWidth: number, blur: number, alpha: number,
      color: string | CanvasGradient
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.filter = blur > 0 ? `blur(${blur}px)` : "none";
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      // ==========================================
      // PARTICLES (behind everything)
      // ==========================================
      for (const p of particles) {
        p.y -= p.speed * 0.001;
        p.x += p.drift * 0.0003;
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;

        const px = p.x * width;
        const py = p.y * height;
        const flicker = p.opacity + Math.sin(time * 3 + p.x * 10) * 0.1;

        ctx.save();
        ctx.globalAlpha = Math.max(0, flicker);
        ctx.fillStyle = `hsl(210 80% 80%)`;
        ctx.shadowColor = "hsl(210 90% 70%)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ==========================================
      // OUTER ARC — large dome across top
      // ==========================================
      // Center far below viewport so only the top curve is visible
      const outerCx = width / 2;
      const outerCy = height + height * 1.2; // 120vh below bottom
      const outerR = Math.sqrt((width / 2) ** 2 + (outerCy) ** 2) * 1.02;

      // Calculate angles where the circle intersects the top edge of viewport
      // We want the arc to go from left edge to right edge across the top
      const outerAngleLeft = Math.atan2(0 - outerCy, 0 - outerCx);
      const outerAngleRight = Math.atan2(0 - outerCy, width - outerCx);

      // Gradient along the arc
      const outerGrad = ctx.createLinearGradient(0, 0, width, 0);
      outerGrad.addColorStop(0, "hsl(0 0% 100% / 0.3)");
      outerGrad.addColorStop(0.2, "hsl(220 100% 65%)");
      outerGrad.addColorStop(0.5, "hsl(260 80% 65%)");
      outerGrad.addColorStop(0.8, "hsl(220 100% 65%)");
      outerGrad.addColorStop(1, "hsl(0 0% 100% / 0.3)");

      // Outer glow (60px blur)
      drawArc(outerCx, outerCy, outerR, outerAngleLeft, outerAngleRight, 40, 60, 0.15, outerGrad);
      // Mid glow (25px blur)
      drawArc(outerCx, outerCy, outerR, outerAngleLeft, outerAngleRight, 12, 25, 0.3, outerGrad);
      // Core line
      drawArc(outerCx, outerCy, outerR, outerAngleLeft, outerAngleRight, 4, 3, 0.8, outerGrad);
      // Bright inner
      drawArc(outerCx, outerCy, outerR, outerAngleLeft, outerAngleRight, 1.5, 0, 0.9, outerGrad);

      // Sweeping highlight on outer arc
      const sweepAngle = outerAngleLeft + (outerAngleRight - outerAngleLeft) * ((Math.sin(time * 0.6) + 1) / 2);
      const sweepX = outerCx + Math.cos(sweepAngle) * outerR;
      const sweepY = outerCy + Math.sin(sweepAngle) * outerR;

      for (let layer = 0; layer < 3; layer++) {
        const blurs = [30, 12, 3];
        const sizes = [50, 25, 8];
        const alphas = [0.25, 0.45, 0.85];
        ctx.save();
        ctx.globalAlpha = alphas[layer];
        ctx.filter = `blur(${blurs[layer]}px)`;
        const sg = ctx.createRadialGradient(sweepX, sweepY, 0, sweepX, sweepY, sizes[layer]);
        sg.addColorStop(0, "hsl(0 0% 100%)");
        sg.addColorStop(0.4, "hsl(220 100% 85%)");
        sg.addColorStop(1, "transparent");
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(sweepX, sweepY, sizes[layer], 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Bright segment near sweep
      const segHalf = 0.04;
      drawArc(outerCx, outerCy, outerR, sweepAngle - segHalf, sweepAngle + segHalf, 6, 8, 0.5, "hsl(0 0% 100% / 0.8)");

      // Comet tail
      for (let t = 0; t < 12; t++) {
        const ta = sweepAngle - t * 0.008;
        if (ta < outerAngleLeft || ta > outerAngleRight) continue;
        const tx = outerCx + Math.cos(ta) * outerR;
        const ty = outerCy + Math.sin(ta) * outerR;
        ctx.save();
        ctx.globalAlpha = (1 - t / 12) * 0.35;
        ctx.filter = "blur(5px)";
        const tg = ctx.createRadialGradient(tx, ty, 0, tx, ty, 10);
        tg.addColorStop(0, "hsl(220 100% 85%)");
        tg.addColorStop(1, "transparent");
        ctx.fillStyle = tg;
        ctx.beginPath();
        ctx.arc(tx, ty, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ==========================================
      // INNER ARC — crossing orbit, curves downward
      // ==========================================
      const innerCx = width / 2;
      const innerCy = height * 0.4; // 40vh from top
      const innerR = outerR * 0.7;

      // Arc from right edge to left edge, curving downward
      const innerAngleLeft = Math.atan2(height * 0.3 - innerCy, 0 - innerCx);
      const innerAngleRight = Math.atan2(height * 0.3 - innerCy, width - innerCx);

      // Draw from right to left going through the bottom (positive y direction)
      const innerStart = innerAngleRight;
      const innerEnd = innerAngleLeft + Math.PI * 2; // go the long way around bottom

      // But we only want the bottom portion visible
      const innerVisStart = -0.1; // just past 0 (rightward)
      const innerVisEnd = Math.PI + 0.1; // just past PI (leftward)

      const innerGrad = ctx.createLinearGradient(0, innerCy, width, innerCy);
      innerGrad.addColorStop(0, "hsl(185 90% 70% / 0.2)");
      innerGrad.addColorStop(0.3, "hsl(190 100% 75%)");
      innerGrad.addColorStop(0.5, "hsl(0 0% 95%)");
      innerGrad.addColorStop(0.7, "hsl(190 100% 75%)");
      innerGrad.addColorStop(1, "hsl(185 90% 70% / 0.2)");

      // Outer glow
      drawArc(innerCx, innerCy, innerR, innerVisStart, innerVisEnd, 20, 40, 0.1, innerGrad);
      // Mid glow
      drawArc(innerCx, innerCy, innerR, innerVisStart, innerVisEnd, 8, 15, 0.25, innerGrad);
      // Core
      drawArc(innerCx, innerCy, innerR, innerVisStart, innerVisEnd, 2, 2, 0.6, innerGrad);
      // Inner bright
      drawArc(innerCx, innerCy, innerR, innerVisStart, innerVisEnd, 1, 0, 0.7, innerGrad);

      // Sweeping highlight on inner arc (opposite direction)
      const innerSweep = innerVisEnd - (innerVisEnd - innerVisStart) * ((Math.sin(time * 0.8 + 2) + 1) / 2);
      const isx = innerCx + Math.cos(innerSweep) * innerR;
      const isy = innerCy + Math.sin(innerSweep) * innerR;

      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.filter = "blur(15px)";
      const isg = ctx.createRadialGradient(isx, isy, 0, isx, isy, 30);
      isg.addColorStop(0, "hsl(185 100% 90%)");
      isg.addColorStop(0.5, "hsl(190 80% 70% / 0.4)");
      isg.addColorStop(1, "transparent");
      ctx.fillStyle = isg;
      ctx.beginPath();
      ctx.arc(isx, isy, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ==========================================
      // CENTER GLOW — light source under text
      // ==========================================
      const glowCx = width / 2;
      const glowCy = height / 2;

      ctx.save();
      const centerGlow = ctx.createRadialGradient(glowCx, glowCy, 0, glowCx, glowCy, 200);
      centerGlow.addColorStop(0, "hsl(0 0% 100% / 0.08)");
      centerGlow.addColorStop(0.3, "hsl(220 80% 70% / 0.05)");
      centerGlow.addColorStop(0.6, "hsl(240 60% 50% / 0.02)");
      centerGlow.addColorStop(1, "transparent");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(glowCx - 250, glowCy - 250, 500, 500);
      ctx.restore();

      // Brighter center spot
      ctx.save();
      ctx.globalAlpha = 0.12 + Math.sin(time * 2) * 0.03;
      ctx.filter = "blur(40px)";
      const spotGlow = ctx.createRadialGradient(glowCx, glowCy, 0, glowCx, glowCy, 120);
      spotGlow.addColorStop(0, "hsl(0 0% 100%)");
      spotGlow.addColorStop(0.4, "hsl(210 80% 75%)");
      spotGlow.addColorStop(1, "transparent");
      ctx.fillStyle = spotGlow;
      ctx.beginPath();
      ctx.arc(glowCx, glowCy, 120, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

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
