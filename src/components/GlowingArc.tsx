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
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Draw a partial arc segment with glow
    const drawArcSegment = (
      cx: number, cy: number,
      rx: number, ry: number,
      tilt: number,
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
      ctx.ellipse(cx, cy, rx, ry, tilt, startAngle, endAngle);
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.004;

      const cx = width / 2;
      // Center of ellipse is pushed down so only the top arc is visible
      const cy = height * 0.72;
      const rx = Math.min(width * 0.52, 700);
      const ry = rx * 0.85;
      const tilt = 0; // no tilt, just a wide ellipse

      // Only draw the upper arc portion (from ~PI to ~2PI = the top half)
      const arcStart = Math.PI + 0.15;
      const arcEnd = Math.PI * 2 - 0.15;

      // === Outer diffuse glow (widest, most blurred) ===
      const glowGrad1 = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
      glowGrad1.addColorStop(0, "hsl(240 70% 40% / 0.6)");
      glowGrad1.addColorStop(0.2, "hsl(250 80% 50% / 0.8)");
      glowGrad1.addColorStop(0.5, "hsl(260 70% 55% / 0.8)");
      glowGrad1.addColorStop(0.8, "hsl(250 80% 50% / 0.8)");
      glowGrad1.addColorStop(1, "hsl(240 70% 40% / 0.6)");
      drawArcSegment(cx, cy, rx, ry, tilt, arcStart, arcEnd, 60, 50, 0.15, glowGrad1);

      // === Mid glow ===
      const glowGrad2 = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
      glowGrad2.addColorStop(0, "hsl(220 90% 50%)");
      glowGrad2.addColorStop(0.3, "hsl(250 80% 55%)");
      glowGrad2.addColorStop(0.5, "hsl(270 70% 55%)");
      glowGrad2.addColorStop(0.7, "hsl(250 80% 55%)");
      glowGrad2.addColorStop(1, "hsl(220 90% 50%)");
      drawArcSegment(cx, cy, rx, ry, tilt, arcStart, arcEnd, 20, 25, 0.25, glowGrad2);

      // === Core arc line ===
      const coreGrad = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
      coreGrad.addColorStop(0, "hsl(220 100% 60% / 0.3)");
      coreGrad.addColorStop(0.15, "hsl(230 90% 65% / 0.8)");
      coreGrad.addColorStop(0.5, "hsl(260 80% 70% / 1)");
      coreGrad.addColorStop(0.85, "hsl(230 90% 65% / 0.8)");
      coreGrad.addColorStop(1, "hsl(220 100% 60% / 0.3)");
      drawArcSegment(cx, cy, rx, ry, tilt, arcStart, arcEnd, 3, 3, 0.7, coreGrad);

      // === Thin bright inner line ===
      drawArcSegment(cx, cy, rx, ry, tilt, arcStart, arcEnd, 1.5, 0, 0.9, coreGrad);

      // === Sweeping light beam rotating along the arc ===
      const numBeams = 2;
      for (let b = 0; b < numBeams; b++) {
        const beamAngle = time * 0.8 + b * Math.PI;
        // Clamp beam to visible arc range
        const normalizedAngle = ((beamAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

        // Only draw if the beam is in the visible arc range
        if (normalizedAngle >= arcStart - 0.3 && normalizedAngle <= arcEnd + 0.3) {
          const bx = cx + Math.cos(normalizedAngle) * rx;
          const by = cy + Math.sin(normalizedAngle) * ry;

          // Bright point
          for (let p = 0; p < 3; p++) {
            const pBlur = [30, 12, 3][p];
            const pSize = [50, 25, 8][p];
            const pAlpha = [0.3, 0.5, 0.9][p];

            ctx.save();
            ctx.globalAlpha = pAlpha;
            ctx.filter = `blur(${pBlur}px)`;
            const pGrad = ctx.createRadialGradient(bx, by, 0, bx, by, pSize);
            pGrad.addColorStop(0, "hsl(0 0% 100%)");
            pGrad.addColorStop(0.3, "hsl(220 100% 85%)");
            pGrad.addColorStop(0.6, "hsl(260 80% 70% / 0.5)");
            pGrad.addColorStop(1, "transparent");
            ctx.fillStyle = pGrad;
            ctx.beginPath();
            ctx.arc(bx, by, pSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // Bright arc segment near the beam (brighter section of the ring)
          const segStart = normalizedAngle - 0.3;
          const segEnd = normalizedAngle + 0.3;
          drawArcSegment(cx, cy, rx, ry, tilt, segStart, segEnd, 6, 8, 0.6, "hsl(0 0% 100% / 0.8)");
          drawArcSegment(cx, cy, rx, ry, tilt, segStart, segEnd, 2, 2, 0.9, "hsl(0 0% 100%)");
        }

        // Also draw the beam even when going around the bottom (as a secondary effect)
        // The beam creates a comet-tail along the arc
        for (let t = 0; t < 15; t++) {
          const trailAngle = normalizedAngle - t * 0.04;
          if (trailAngle < arcStart || trailAngle > arcEnd) continue;

          const tx = cx + Math.cos(trailAngle) * rx;
          const ty = cy + Math.sin(trailAngle) * ry;
          const trailAlpha = (1 - t / 15) * 0.4;

          ctx.save();
          ctx.globalAlpha = trailAlpha;
          ctx.filter = "blur(6px)";
          const tGrad = ctx.createRadialGradient(tx, ty, 0, tx, ty, 12);
          tGrad.addColorStop(0, "hsl(260 80% 80%)");
          tGrad.addColorStop(1, "transparent");
          ctx.fillStyle = tGrad;
          ctx.beginPath();
          ctx.arc(tx, ty, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // === Pink/magenta accent flare (small, at specific points) ===
      const flareAngle1 = Math.PI * 1.4 + Math.sin(time * 2) * 0.15;
      const flareAngle2 = Math.PI * 1.75 + Math.sin(time * 1.5 + 1) * 0.1;
      for (const fa of [flareAngle1, flareAngle2]) {
        const fx = cx + Math.cos(fa) * rx;
        const fy = cy + Math.sin(fa) * ry;

        ctx.save();
        ctx.globalAlpha = 0.3 + Math.sin(time * 3) * 0.15;
        ctx.filter = "blur(15px)";
        const fGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, 30);
        fGrad.addColorStop(0, "hsl(320 80% 65%)");
        fGrad.addColorStop(0.5, "hsl(300 60% 50% / 0.4)");
        fGrad.addColorStop(1, "transparent");
        ctx.fillStyle = fGrad;
        ctx.beginPath();
        ctx.arc(fx, fy, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // === Inner atmosphere / ambient glow inside the arc ===
      ctx.save();
      const ambientGrad = ctx.createRadialGradient(cx, cy - ry * 0.4, 0, cx, cy - ry * 0.4, rx * 0.8);
      ambientGrad.addColorStop(0, "hsl(240 50% 40% / 0.06)");
      ambientGrad.addColorStop(0.5, "hsl(260 50% 35% / 0.03)");
      ambientGrad.addColorStop(1, "transparent");
      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // === Top edge highlights (where arc meets screen edge) ===
      // Left top glow
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.filter = "blur(40px)";
      const leftGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 200);
      leftGlow.addColorStop(0, "hsl(260 80% 60%)");
      leftGlow.addColorStop(1, "transparent");
      ctx.fillStyle = leftGlow;
      ctx.fillRect(-50, -50, 300, 300);
      ctx.restore();

      // Right top glow
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.filter = "blur(40px)";
      const rightGlow = ctx.createRadialGradient(width, 0, 0, width, 0, 200);
      rightGlow.addColorStop(0, "hsl(300 60% 50%)");
      rightGlow.addColorStop(1, "transparent");
      ctx.fillStyle = rightGlow;
      ctx.fillRect(width - 250, -50, 300, 300);
      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
