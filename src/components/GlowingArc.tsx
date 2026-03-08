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
      ctx.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), 0, startAngle, endAngle);
      ctx.stroke();
      ctx.restore();
    };

    const drawGlowArc = (
      cx: number, cy: number,
      rx: number, ry: number,
      arcStart: number, arcEnd: number,
      brightness: number
    ) => {
      // Outer soft glow — deep blue
      const g1 = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
      g1.addColorStop(0, "hsl(220 90% 30% / 0.4)");
      g1.addColorStop(0.3, "hsl(230 95% 45% / 0.6)");
      g1.addColorStop(0.5, "hsl(235 90% 50% / 0.7)");
      g1.addColorStop(0.7, "hsl(230 95% 45% / 0.6)");
      g1.addColorStop(1, "hsl(220 90% 30% / 0.4)");
      drawArc(cx, cy, rx, ry, arcStart, arcEnd, 60, 50, 0.25 * brightness, g1);

      // Mid glow — brighter blue
      const g2 = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
      g2.addColorStop(0, "hsl(215 100% 50%)");
      g2.addColorStop(0.3, "hsl(225 95% 55%)");
      g2.addColorStop(0.5, "hsl(235 90% 60%)");
      g2.addColorStop(0.7, "hsl(225 95% 55%)");
      g2.addColorStop(1, "hsl(215 100% 50%)");
      drawArc(cx, cy, rx, ry, arcStart, arcEnd, 20, 25, 0.35 * brightness, g2);

      // Core line — bright white-blue
      const core = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
      core.addColorStop(0, "hsl(210 100% 70% / 0.3)");
      core.addColorStop(0.15, "hsl(220 100% 78% / 0.8)");
      core.addColorStop(0.5, "hsl(225 100% 85% / 1)");
      core.addColorStop(0.85, "hsl(220 100% 78% / 0.8)");
      core.addColorStop(1, "hsl(210 100% 70% / 0.3)");
      drawArc(cx, cy, rx, ry, arcStart, arcEnd, 3.5, 4, 0.85 * brightness, core);
      drawArc(cx, cy, rx, ry, arcStart, arcEnd, 1.5, 0, 1.0 * brightness, "hsl(220 100% 90%)");
    };

    const drawSweepBeam = (
      cx: number, cy: number,
      rx: number, ry: number,
      arcStart: number, arcEnd: number,
      offset: number, speed: number
    ) => {
      const beamAngle = (time * speed + offset) % (Math.PI * 2);
      if (beamAngle < arcStart - 0.05 || beamAngle > arcEnd + 0.05) return;

      const bx = cx + Math.cos(beamAngle) * rx;
      const by = cy + Math.sin(beamAngle) * ry;

      const layers = [
        { blur: 40, size: 55, alpha: 0.45 },
        { blur: 14, size: 28, alpha: 0.7 },
        { blur: 3, size: 9, alpha: 1.0 },
      ];
      for (const l of layers) {
        ctx.save();
        ctx.globalAlpha = l.alpha;
        ctx.filter = `blur(${l.blur}px)`;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, l.size);
        grad.addColorStop(0, "hsl(210 100% 90%)");
        grad.addColorStop(0.3, "hsl(220 100% 70%)");
        grad.addColorStop(0.6, "hsl(235 85% 55% / 0.5)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, l.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      drawArc(cx, cy, rx, ry, beamAngle - 0.2, beamAngle + 0.2, 6, 8, 0.7, "hsl(0 0% 100% / 0.8)");
      drawArc(cx, cy, rx, ry, beamAngle - 0.15, beamAngle + 0.15, 2, 1, 1.0, "hsl(0 0% 100%)");

      for (let t = 0; t < 16; t++) {
        const ta = beamAngle - t * 0.03;
        if (ta < arcStart || ta > arcEnd) continue;
        const tx = cx + Math.cos(ta) * rx;
        const ty = cy + Math.sin(ta) * ry;
        ctx.save();
        ctx.globalAlpha = (1 - t / 16) * 0.4;
        ctx.filter = "blur(4px)";
        const tg = ctx.createRadialGradient(tx, ty, 0, tx, ty, 8);
        tg.addColorStop(0, "hsl(260 80% 80%)");
        tg.addColorStop(1, "transparent");
        ctx.fillStyle = tg;
        ctx.beginPath();
        ctx.arc(tx, ty, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      const cx = width / 2;

      // ===== BIG ARC — facing DOWN, extends BELOW the Get In Touch button =====
      const bigRx = width * 0.52;
      const bigRy = height * 0.85;
      // Push center up so the bottom of the arc goes well past the button (~70% down page)
      const bigCy = -bigRy * 0.08;
      const bigStart = 0.08;
      const bigEnd = Math.PI - 0.08;

      drawGlowArc(cx, bigCy, bigRx, bigRy, bigStart, bigEnd, 1.0);
      drawSweepBeam(cx, bigCy, bigRx, bigRy, bigStart, bigEnd, 0, 0.5);
      drawSweepBeam(cx, bigCy, bigRx, bigRy, bigStart, bigEnd, Math.PI * 0.8, 0.4);

      // ===== TWO OVERLAPPING CIRCLES inside the dome (ArgusVPN style) =====
      // Two circles offset left and right, overlapping in center like a Venn diagram
      const innerR = height * 0.32; // radius of each inner circle
      const innerCy = height * 0.38; // center Y — in the middle area of the dome
      const innerOffset = width * 0.12; // how far left/right each circle is offset

      // Left circle — draw roughly the right-facing portion (visible inside dome)
      const leftCx = cx - innerOffset;
      // Draw a large arc of each circle (nearly full but skip the far outside edge)
      drawGlowArc(leftCx, innerCy, innerR, innerR, -0.3, Math.PI + 0.3, 0.7);
      drawSweepBeam(leftCx, innerCy, innerR, innerR, -0.3, Math.PI + 0.3, 0.5, 0.5);

      // Right circle — draw roughly the left-facing portion
      const rightCx = cx + innerOffset;
      drawGlowArc(rightCx, innerCy, innerR, innerR, -0.3, Math.PI + 0.3, 0.7);
      drawSweepBeam(rightCx, innerCy, innerR, innerR, -0.3, Math.PI + 0.3, 2.5, 0.45);

      // Keep arc1R reference for flares below
      const arc1R = innerR;

      // === Top center sunrise glow (where big arc peaks) ===
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.filter = "blur(60px)";
      const sunGrad = ctx.createRadialGradient(cx, 0, 0, cx, 0, height * 0.35);
      sunGrad.addColorStop(0, "hsl(260 80% 65%)");
      sunGrad.addColorStop(0.4, "hsl(280 60% 50% / 0.4)");
      sunGrad.addColorStop(1, "transparent");
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, width, height * 0.5);
      ctx.restore();

      // === Pink/magenta accent flares — more of them, brighter ===
      const flares = [
        bigStart + 0.4 + Math.sin(time * 2) * 0.1,
        bigEnd - 0.4 + Math.sin(time * 1.5) * 0.1,
        Math.PI * 0.5 + Math.sin(time * 1.8) * 0.15,
        // Flares on small arcs too
      ];
      for (const fa of flares) {
        const fx = cx + Math.cos(fa) * bigRx;
        const fy = bigCy + Math.sin(fa) * bigRy;
        ctx.save();
        ctx.globalAlpha = 0.45 + Math.sin(time * 3) * 0.15;
        ctx.filter = "blur(18px)";
        const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 35);
        fg.addColorStop(0, "hsl(320 90% 70%)");
        fg.addColorStop(0.4, "hsl(300 70% 55% / 0.5)");
        fg.addColorStop(1, "transparent");
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(fx, fy, 35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Pink flares on small arcs
      const sfa = Math.PI * 1.5 + Math.sin(time * 2.5) * 0.2;
      const sfx = cx + Math.cos(sfa) * arc1R;
      const sfy = innerCy + Math.sin(sfa) * arc1R;
      ctx.save();
      ctx.globalAlpha = 0.4 + Math.sin(time * 4) * 0.15;
      ctx.filter = "blur(12px)";
      const sfg = ctx.createRadialGradient(sfx, sfy, 0, sfx, sfy, 22);
      sfg.addColorStop(0, "hsl(310 85% 68%)");
      sfg.addColorStop(0.5, "hsl(290 60% 50% / 0.4)");
      sfg.addColorStop(1, "transparent");
      ctx.fillStyle = sfg;
      ctx.beginPath();
      ctx.arc(sfx, sfy, 22, 0, Math.PI * 2);
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
