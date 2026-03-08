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
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        size: 1 + Math.random() * 1.5,
        speed: 0.15 + Math.random() * 0.25,
        drift: (Math.random() - 0.5) * 0.4,
        opacity: 0.2 + Math.random() * 0.4,
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

    const drawEllipseArc = (
      cx: number, cy: number, rx: number, ry: number,
      rotation: number,
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
      ctx.ellipse(cx, cy, rx, ry, rotation, startAngle, endAngle);
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.004;

      // ==========================================
      // PARTICLES
      // ==========================================
      for (const p of particles) {
        p.y -= p.speed * 0.0008;
        p.x += p.drift * 0.0002;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }

        const px = p.x * width;
        const py = p.y * height;
        const flicker = p.opacity + Math.sin(time * 4 + p.x * 20) * 0.1;

        ctx.save();
        ctx.globalAlpha = Math.max(0, flicker);
        ctx.shadowColor = "hsl(210 90% 75%)";
        ctx.shadowBlur = 4;
        ctx.fillStyle = "hsl(210 80% 85%)";
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ==========================================
      // OUTER ARC — Big dome across top of screen
      // Like ArgusVPN: a huge circle whose center is far below,
      // so only the top curve is visible as a dome
      // ==========================================
      const outerCx = width / 2;
      // Place center well below viewport so the top of the circle
      // creates a dome that peaks around y = height * 0.15
      const outerR = height * 1.8;
      const outerCy = height * 0.15 + outerR; // center below so top of circle is at ~0.15*height

      // Calculate the angles where this circle intersects the screen edges
      // We want to draw from beyond left edge to beyond right edge
      const halfScreenAngle = Math.asin((width * 0.6) / outerR);
      const outerStart = -Math.PI / 2 - halfScreenAngle;
      const outerEnd = -Math.PI / 2 + halfScreenAngle;

      // Outer diffuse glow
      const outerGlowGrad = ctx.createLinearGradient(0, 0, width, 0);
      outerGlowGrad.addColorStop(0, "hsl(260 70% 50% / 0.4)");
      outerGlowGrad.addColorStop(0.15, "hsl(240 90% 55% / 0.9)");
      outerGlowGrad.addColorStop(0.35, "hsl(230 100% 60%)");
      outerGlowGrad.addColorStop(0.5, "hsl(250 80% 65%)");
      outerGlowGrad.addColorStop(0.65, "hsl(230 100% 60%)");
      outerGlowGrad.addColorStop(0.85, "hsl(240 90% 55% / 0.9)");
      outerGlowGrad.addColorStop(1, "hsl(260 70% 50% / 0.4)");

      // Wide soft glow (outermost)
      drawArc(outerCx, outerCy, outerR, outerStart, outerEnd, 80, 60, 0.12, outerGlowGrad);
      // Medium glow
      drawArc(outerCx, outerCy, outerR, outerStart, outerEnd, 30, 30, 0.25, outerGlowGrad);
      // Core glow
      drawArc(outerCx, outerCy, outerR, outerStart, outerEnd, 10, 12, 0.4, outerGlowGrad);
      // Bright core line
      drawArc(outerCx, outerCy, outerR, outerStart, outerEnd, 4, 4, 0.8, outerGlowGrad);
      // Thin white center
      const whiteGrad = ctx.createLinearGradient(0, 0, width, 0);
      whiteGrad.addColorStop(0, "hsl(0 0% 100% / 0.1)");
      whiteGrad.addColorStop(0.3, "hsl(0 0% 100% / 0.7)");
      whiteGrad.addColorStop(0.5, "hsl(0 0% 100% / 0.9)");
      whiteGrad.addColorStop(0.7, "hsl(0 0% 100% / 0.7)");
      whiteGrad.addColorStop(1, "hsl(0 0% 100% / 0.1)");
      drawArc(outerCx, outerCy, outerR, outerStart, outerEnd, 2, 0, 0.85, whiteGrad);

      // Corner glow at edges where arc meets screen border
      for (const side of [-1, 1]) {
        const edgeAngle = side === -1 ? outerStart : outerEnd;
        const ex = outerCx + Math.cos(edgeAngle) * outerR;
        const ey = outerCy + Math.sin(edgeAngle) * outerR;
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.filter = "blur(50px)";
        const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 150);
        eg.addColorStop(0, side === -1 ? "hsl(260 80% 65%)" : "hsl(300 60% 55%)");
        eg.addColorStop(1, "transparent");
        ctx.fillStyle = eg;
        ctx.beginPath();
        ctx.arc(ex, ey, 150, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Sweeping highlight on outer arc
      const sweepT = (Math.sin(time * 0.5) + 1) / 2;
      const sweepAngle = outerStart + (outerEnd - outerStart) * sweepT;
      const sweepX = outerCx + Math.cos(sweepAngle) * outerR;
      const sweepY = outerCy + Math.sin(sweepAngle) * outerR;

      for (const [blur, size, alpha] of [[40, 60, 0.2], [18, 30, 0.4], [5, 12, 0.8]] as const) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.filter = `blur(${blur}px)`;
        const sg = ctx.createRadialGradient(sweepX, sweepY, 0, sweepX, sweepY, size);
        sg.addColorStop(0, "hsl(0 0% 100%)");
        sg.addColorStop(0.3, "hsl(220 100% 85%)");
        sg.addColorStop(1, "transparent");
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(sweepX, sweepY, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Bright segment near sweep point
      drawArc(outerCx, outerCy, outerR, sweepAngle - 0.03, sweepAngle + 0.03, 8, 10, 0.6, "hsl(0 0% 100% / 0.9)");

      // Comet trail
      for (let t = 1; t < 20; t++) {
        const ta = sweepAngle - t * 0.005;
        if (ta < outerStart) break;
        const tx = outerCx + Math.cos(ta) * outerR;
        const ty = outerCy + Math.sin(ta) * outerR;
        ctx.save();
        ctx.globalAlpha = (1 - t / 20) * 0.3;
        ctx.filter = "blur(4px)";
        const tg = ctx.createRadialGradient(tx, ty, 0, tx, ty, 8);
        tg.addColorStop(0, "hsl(220 100% 90%)");
        tg.addColorStop(1, "transparent");
        ctx.fillStyle = tg;
        ctx.beginPath();
        ctx.arc(tx, ty, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ==========================================
      // INNER ARC — Crossing orbit (elliptical, tilted)
      // Curves downward through the center, crossing the outer arc
      // ==========================================
      const innerCx = width / 2;
      const innerCy = height * 0.42;
      const innerRx = width * 0.55;
      const innerRy = height * 0.35;
      const innerRotation = 0.15; // slight tilt

      const innerStart2 = Math.PI + 0.2;
      const innerEnd2 = Math.PI * 2 - 0.2;

      const innerGrad = ctx.createLinearGradient(0, innerCy - innerRy, width, innerCy + innerRy);
      innerGrad.addColorStop(0, "hsl(190 100% 75% / 0.2)");
      innerGrad.addColorStop(0.3, "hsl(200 90% 80%)");
      innerGrad.addColorStop(0.5, "hsl(0 0% 95%)");
      innerGrad.addColorStop(0.7, "hsl(200 90% 80%)");
      innerGrad.addColorStop(1, "hsl(190 100% 75% / 0.2)");

      // Glow layers
      drawEllipseArc(innerCx, innerCy, innerRx, innerRy, innerRotation, innerStart2, innerEnd2, 30, 40, 0.08, innerGrad);
      drawEllipseArc(innerCx, innerCy, innerRx, innerRy, innerRotation, innerStart2, innerEnd2, 12, 18, 0.2, innerGrad);
      drawEllipseArc(innerCx, innerCy, innerRx, innerRy, innerRotation, innerStart2, innerEnd2, 3, 3, 0.55, innerGrad);
      drawEllipseArc(innerCx, innerCy, innerRx, innerRy, innerRotation, innerStart2, innerEnd2, 1.5, 0, 0.65, innerGrad);

      // Inner arc sweep (opposite direction)
      const innerSweepT = (Math.sin(-time * 0.7 + 1.5) + 1) / 2;
      const innerSweepAngle = innerStart2 + (innerEnd2 - innerStart2) * innerSweepT;
      const isx = innerCx + Math.cos(innerSweepAngle) * innerRx * Math.cos(innerRotation);
      const isy = innerCy + Math.sin(innerSweepAngle) * innerRy;

      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.filter = "blur(12px)";
      const isg = ctx.createRadialGradient(isx, isy, 0, isx, isy, 25);
      isg.addColorStop(0, "hsl(180 100% 90%)");
      isg.addColorStop(0.4, "hsl(200 80% 75% / 0.5)");
      isg.addColorStop(1, "transparent");
      ctx.fillStyle = isg;
      ctx.beginPath();
      ctx.arc(isx, isy, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ==========================================
      // PINK/MAGENTA ACCENTS where arcs visually cross
      // ==========================================
      const flarePositions = [
        { angle: -Math.PI / 2 - 0.15, phase: 0 },
        { angle: -Math.PI / 2 + 0.12, phase: 2 },
      ];
      for (const fp of flarePositions) {
        const fx = outerCx + Math.cos(fp.angle) * outerR;
        const fy = outerCy + Math.sin(fp.angle) * outerR;
        const fAlpha = 0.25 + Math.sin(time * 3 + fp.phase) * 0.15;
        ctx.save();
        ctx.globalAlpha = fAlpha;
        ctx.filter = "blur(20px)";
        const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 40);
        fg.addColorStop(0, "hsl(320 85% 65%)");
        fg.addColorStop(0.5, "hsl(290 60% 50% / 0.4)");
        fg.addColorStop(1, "transparent");
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(fx, fy, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ==========================================
      // CENTER GLOW — light source under text
      // ==========================================
      const glowX = width / 2;
      const glowY = height * 0.45;

      ctx.save();
      ctx.globalAlpha = 0.15 + Math.sin(time * 1.5) * 0.03;
      ctx.filter = "blur(50px)";
      const cg = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 200);
      cg.addColorStop(0, "hsl(0 0% 100% / 0.6)");
      cg.addColorStop(0.3, "hsl(220 70% 70% / 0.3)");
      cg.addColorStop(0.6, "hsl(250 50% 50% / 0.1)");
      cg.addColorStop(1, "transparent");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(glowX, glowY, 200, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Upper ambient atmosphere
      ctx.save();
      ctx.globalAlpha = 0.08;
      const ambGrad = ctx.createLinearGradient(0, 0, 0, height * 0.5);
      ambGrad.addColorStop(0, "hsl(240 60% 50%)");
      ambGrad.addColorStop(1, "transparent");
      ctx.fillStyle = ambGrad;
      ctx.fillRect(0, 0, width, height * 0.5);
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
