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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      const cx = width / 2;
      // Center far above viewport — only the bottom curve of the ellipse is visible
      // This creates a wide arch/dome shape opening downward
      const outerRx = width * 0.48;
      const outerRy = height * 0.55;
      const outerCy = -outerRy * 0.15; // push center up

      const innerRx = outerRx * 0.78;
      const innerRy = outerRy * 0.78;
      const innerCy = outerCy + 10;

      // Arc range: only the bottom portion (facing down into page)
      // 0.08 to PI-0.08 draws the bottom half of the ellipse
      const arcStart = 0.12;
      const arcEnd = Math.PI - 0.12;

      // Helper to draw a full layered arc (outer or inner)
      const drawLayeredArc = (rx: number, ry: number, cy: number, brightness: number) => {
        // === Wide diffuse glow ===
        const g1 = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
        g1.addColorStop(0, "hsl(30 90% 50% / 0.2)");
        g1.addColorStop(0.3, "hsl(40 95% 55% / 0.5)");
        g1.addColorStop(0.5, "hsl(45 100% 60% / 0.6)");
        g1.addColorStop(0.7, "hsl(40 95% 55% / 0.5)");
        g1.addColorStop(1, "hsl(30 90% 50% / 0.2)");
        drawArc(cx, cy, rx, ry, arcStart, arcEnd, 50, 40, 0.2 * brightness, g1);

        // === Mid glow ===
        const g2 = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
        g2.addColorStop(0, "hsl(25 80% 45% / 0.4)");
        g2.addColorStop(0.25, "hsl(35 90% 55% / 0.7)");
        g2.addColorStop(0.5, "hsl(45 100% 65% / 0.9)");
        g2.addColorStop(0.75, "hsl(35 90% 55% / 0.7)");
        g2.addColorStop(1, "hsl(25 80% 45% / 0.4)");
        drawArc(cx, cy, rx, ry, arcStart, arcEnd, 18, 20, 0.35 * brightness, g2);

        // === Core bright line ===
        const core = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy);
        core.addColorStop(0, "hsl(30 100% 50% / 0.3)");
        core.addColorStop(0.15, "hsl(40 100% 60% / 0.8)");
        core.addColorStop(0.5, "hsl(50 100% 75% / 1)");
        core.addColorStop(0.85, "hsl(40 100% 60% / 0.8)");
        core.addColorStop(1, "hsl(30 100% 50% / 0.3)");
        drawArc(cx, cy, rx, ry, arcStart, arcEnd, 3.5, 3, 0.85 * brightness, core);

        // === Thin bright inner edge ===
        drawArc(cx, cy, rx, ry, arcStart, arcEnd, 1.5, 0, 0.95 * brightness, core);
      };

      // Draw outer arc
      drawLayeredArc(outerRx, outerRy, outerCy, 1.0);

      // Draw inner arc
      drawLayeredArc(innerRx, innerRy, innerCy, 0.7);

      // === Sunrise sweep — bright white/gold point traveling along the arc ===
      const drawSweepBeam = (rx: number, ry: number, cy: number, offset: number, speed: number) => {
        const beamAngle = (time * speed + offset) % (Math.PI * 2);
        
        // Only draw when in visible arc range
        if (beamAngle >= arcStart - 0.1 && beamAngle <= arcEnd + 0.1) {
          const bx = cx + Math.cos(beamAngle) * rx;
          const by = cy + Math.sin(beamAngle) * ry;

          // Layered bright point
          const layers = [
            { blur: 40, size: 60, alpha: 0.35, color: "hsl(45 100% 70%)" },
            { blur: 15, size: 30, alpha: 0.6, color: "hsl(50 100% 80%)" },
            { blur: 4, size: 10, alpha: 0.95, color: "hsl(0 0% 100%)" },
          ];

          for (const l of layers) {
            ctx.save();
            ctx.globalAlpha = l.alpha;
            ctx.filter = `blur(${l.blur}px)`;
            const grad = ctx.createRadialGradient(bx, by, 0, bx, by, l.size);
            grad.addColorStop(0, l.color);
            grad.addColorStop(0.4, "hsl(40 100% 65% / 0.5)");
            grad.addColorStop(1, "transparent");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(bx, by, l.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // Bright segment on the arc near the beam
          const segStart = beamAngle - 0.25;
          const segEnd = beamAngle + 0.25;
          drawArc(cx, cy, rx, ry, segStart, segEnd, 8, 10, 0.7, "hsl(50 100% 90% / 0.9)");
          drawArc(cx, cy, rx, ry, segStart, segEnd, 2.5, 1, 1.0, "hsl(0 0% 100%)");

          // Comet trail
          for (let t = 0; t < 20; t++) {
            const trailAngle = beamAngle - t * 0.035;
            if (trailAngle < arcStart || trailAngle > arcEnd) continue;
            const tx = cx + Math.cos(trailAngle) * rx;
            const ty = cy + Math.sin(trailAngle) * ry;
            const trailAlpha = (1 - t / 20) * 0.5;

            ctx.save();
            ctx.globalAlpha = trailAlpha;
            ctx.filter = "blur(5px)";
            const tGrad = ctx.createRadialGradient(tx, ty, 0, tx, ty, 10);
            tGrad.addColorStop(0, "hsl(45 100% 80%)");
            tGrad.addColorStop(1, "transparent");
            ctx.fillStyle = tGrad;
            ctx.beginPath();
            ctx.arc(tx, ty, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      };

      // Two beams on outer arc, one on inner
      drawSweepBeam(outerRx, outerRy, outerCy, 0, 0.6);
      drawSweepBeam(outerRx, outerRy, outerCy, Math.PI, 0.5);
      drawSweepBeam(innerRx, innerRy, innerCy, Math.PI * 0.5, 0.7);

      // === Sunrise ambient glow from the top center ===
      ctx.save();
      const sunGrad = ctx.createRadialGradient(cx, 0, 0, cx, 0, height * 0.6);
      sunGrad.addColorStop(0, "hsl(40 100% 55% / 0.08)");
      sunGrad.addColorStop(0.3, "hsl(35 80% 45% / 0.04)");
      sunGrad.addColorStop(1, "transparent");
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // === Warm edge glows where arcs meet page edges ===
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.filter = "blur(50px)";
      const leftG = ctx.createRadialGradient(width * 0.05, height * 0.35, 0, width * 0.05, height * 0.35, 150);
      leftG.addColorStop(0, "hsl(35 90% 55%)");
      leftG.addColorStop(1, "transparent");
      ctx.fillStyle = leftG;
      ctx.fillRect(-50, height * 0.1, 300, 400);
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.filter = "blur(50px)";
      const rightG = ctx.createRadialGradient(width * 0.95, height * 0.35, 0, width * 0.95, height * 0.35, 150);
      rightG.addColorStop(0, "hsl(40 90% 55%)");
      rightG.addColorStop(1, "transparent");
      ctx.fillStyle = rightG;
      ctx.fillRect(width - 250, height * 0.1, 300, 400);
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
