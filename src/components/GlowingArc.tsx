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
      const g1 = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
      g1.addColorStop(0, "hsl(240 70% 40% / 0.5)");
      g1.addColorStop(0.2, "hsl(250 80% 50% / 0.7)");
      g1.addColorStop(0.5, "hsl(260 70% 55% / 0.8)");
      g1.addColorStop(0.8, "hsl(250 80% 50% / 0.7)");
      g1.addColorStop(1, "hsl(240 70% 40% / 0.5)");
      drawArc(cx, cy, rx, ry, arcStart, arcEnd, 55, 45, 0.2 * brightness, g1);

      const g2 = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
      g2.addColorStop(0, "hsl(220 90% 50%)");
      g2.addColorStop(0.3, "hsl(250 80% 55%)");
      g2.addColorStop(0.5, "hsl(270 70% 55%)");
      g2.addColorStop(0.7, "hsl(250 80% 55%)");
      g2.addColorStop(1, "hsl(220 90% 50%)");
      drawArc(cx, cy, rx, ry, arcStart, arcEnd, 18, 22, 0.3 * brightness, g2);

      const core = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
      core.addColorStop(0, "hsl(220 100% 60% / 0.2)");
      core.addColorStop(0.15, "hsl(230 90% 65% / 0.7)");
      core.addColorStop(0.5, "hsl(260 80% 75% / 1)");
      core.addColorStop(0.85, "hsl(230 90% 65% / 0.7)");
      core.addColorStop(1, "hsl(220 100% 60% / 0.2)");
      drawArc(cx, cy, rx, ry, arcStart, arcEnd, 3, 3, 0.8 * brightness, core);
      drawArc(cx, cy, rx, ry, arcStart, arcEnd, 1.2, 0, 0.9 * brightness, core);
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

      // ===== BIG ARC — facing DOWN, covers from nav to "Get In Touch" button area =====
      // Large radius so the arc covers most of the viewport height
      const bigRx = width * 0.52;
      const bigRy = height * 0.75;
      // Push center way above so the visible bottom curve reaches ~75% down the page
      const bigCy = -bigRy * 0.18;
      const bigStart = 0.08;
      const bigEnd = Math.PI - 0.08;

      drawGlowArc(cx, bigCy, bigRx, bigRy, bigStart, bigEnd, 1.0);
      drawSweepBeam(cx, bigCy, bigRx, bigRy, bigStart, bigEnd, 0, 0.5);
      drawSweepBeam(cx, bigCy, bigRx, bigRy, bigStart, bigEnd, Math.PI * 0.8, 0.4);

      // ===== TWO SMALLER ARCS — facing UP, overlapping in center like ArgusVPN =====
      const smallRx = bigRx * 0.38;
      const smallRy = bigRy * 0.25;
      const smallStart = Math.PI + 0.12;
      const smallEnd = Math.PI * 2 - 0.12;

      // Left upward arc — heavily overlapping in center
      const leftCx = cx - smallRx * 0.18;
      const leftCy = height * 0.40;
      drawGlowArc(leftCx, leftCy, smallRx, smallRy, smallStart, smallEnd, 0.65);
      drawSweepBeam(leftCx, leftCy, smallRx, smallRy, smallStart, smallEnd, 0.8, 0.7);

      // Right upward arc — heavily overlapping with left
      const rightCx = cx + smallRx * 0.18;
      const rightCy = height * 0.40;
      drawGlowArc(rightCx, rightCy, smallRx, smallRy, smallStart, smallEnd, 0.65);
      drawSweepBeam(rightCx, rightCy, smallRx, smallRy, smallStart, smallEnd, 2.0, 0.65);

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
      for (const [sCx, sCy] of [[leftCx, leftCy], [rightCx, rightCy]]) {
        const sfa = Math.PI * 1.5 + Math.sin(time * 2.5) * 0.2;
        const sfx = sCx + Math.cos(sfa) * smallRx;
        const sfy = sCy + Math.sin(sfa) * smallRy;
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
