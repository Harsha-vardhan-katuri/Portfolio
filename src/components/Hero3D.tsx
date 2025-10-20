import { useEffect, useRef } from "react";

export const Hero3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const tunnelSpeed = 12; // Faster speed for rapid motion
    let zOffset = 0;
    let glitchTimer = 0;

    // Cyberpunk color palette
    const colors = {
      neonRed: 'hsla(0, 100%, 50%, ',
      neonGreen: 'hsla(120, 100%, 50%, ',
      electricBlue: 'hsla(200, 100%, 60%, ',
      magenta: 'hsla(300, 100%, 50%, ',
      cyan: 'hsla(180, 100%, 50%, ',
    };

    // Data Highway Node class
    class HighwayNode {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      lane: number;

      constructor(z: number) {
        this.lane = Math.floor(Math.random() * 6);
        const angle = (this.lane / 6) * Math.PI * 2;
        const radius = 250 + Math.random() * 200;
        this.x = Math.cos(angle) * radius;
        this.y = Math.sin(angle) * radius;
        this.z = z;
        this.size = 8 + Math.random() * 15;
        this.color = Math.random() > 0.5 ? colors.neonRed : colors.neonGreen;
      }

      update() {
        this.z -= tunnelSpeed * 1.2;
        if (this.z < -500) {
          this.z = 3000;
          this.lane = Math.floor(Math.random() * 6);
          const angle = (this.lane / 6) * Math.PI * 2;
          const radius = 250 + Math.random() * 200;
          this.x = Math.cos(angle) * radius;
          this.y = Math.sin(angle) * radius;
        }
      }

      draw(glitchAmount: number) {
        const scale = 1000 / (1000 + this.z);
        const x2d = this.x * scale + centerX + (Math.random() - 0.5) * glitchAmount;
        const y2d = this.y * scale + centerY + (Math.random() - 0.5) * glitchAmount;
        const size = this.size * scale;

        if (scale > 0.01) {
          ctx.save();
          
          // Hexagonal node shape
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const x = x2d + Math.cos(angle) * size;
            const y = y2d + Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          
          const alpha = Math.min(scale * 1.8, 1);
          ctx.strokeStyle = this.color + alpha + ')';
          ctx.lineWidth = 3 * scale;
          ctx.shadowBlur = 30 * scale;
          ctx.shadowColor = this.color + alpha + ')';
          ctx.stroke();
          
          // Inner glow
          ctx.fillStyle = this.color + (alpha * 0.3) + ')';
          ctx.fill();
          
          ctx.restore();
        }
      }
    }

    // Fast data packet class
    class DataPacket {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      trail: { x: number; y: number; alpha: number }[];
      lane: number;

      constructor() {
        this.lane = Math.floor(Math.random() * 6);
        const angle = (this.lane / 6) * Math.PI * 2;
        const radius = 200 + Math.random() * 300;
        this.x = Math.cos(angle) * radius;
        this.y = Math.sin(angle) * radius;
        this.z = Math.random() * 3000;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        const colorChoice = Math.random();
        if (colorChoice < 0.4) this.color = colors.neonRed;
        else if (colorChoice < 0.8) this.color = colors.neonGreen;
        else this.color = colors.cyan;
        this.size = 1.5 + Math.random() * 2.5;
        this.trail = [];
      }

      update() {
        this.z -= tunnelSpeed * 2;
        this.x += this.vx;
        this.y += this.vy;

        if (this.z < -500) {
          this.z = 3000;
          this.lane = Math.floor(Math.random() * 6);
          const angle = (this.lane / 6) * Math.PI * 2;
          const radius = 200 + Math.random() * 300;
          this.x = Math.cos(angle) * radius;
          this.y = Math.sin(angle) * radius;
          this.trail = [];
        }

        const scale = 1000 / (1000 + this.z);
        const x2d = this.x * scale + centerX;
        const y2d = this.y * scale + centerY;
        
        this.trail.unshift({ x: x2d, y: y2d, alpha: 1 });
        if (this.trail.length > 20) this.trail.pop();
        
        this.trail.forEach((point) => {
          point.alpha *= 0.9;
        });
      }

      draw(glitchAmount: number) {
        const scale = 1000 / (1000 + this.z);
        const x2d = this.x * scale + centerX;
        const y2d = this.y * scale + centerY;
        const size = this.size * scale;

        if (scale > 0.01) {
          // Enhanced chromatic aberration trail
          this.trail.forEach((point, i) => {
            const trailSize = size * (1 - i / this.trail.length) * 1.5;
            const alpha = point.alpha * 0.8;
            const aberration = 3 * (1 - i / this.trail.length);
            
            // Red channel
            ctx.fillStyle = 'rgba(255, 0, 0, ' + alpha * 0.5 + ')';
            ctx.beginPath();
            ctx.arc(point.x - aberration + (Math.random() - 0.5) * glitchAmount, point.y, trailSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Green channel
            ctx.fillStyle = 'rgba(0, 255, 0, ' + alpha * 0.5 + ')';
            ctx.beginPath();
            ctx.arc(point.x, point.y + (Math.random() - 0.5) * glitchAmount, trailSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Blue channel
            ctx.fillStyle = 'rgba(0, 150, 255, ' + alpha * 0.5 + ')';
            ctx.beginPath();
            ctx.arc(point.x + aberration, point.y, trailSize, 0, Math.PI * 2);
            ctx.fill();
          });

          // Main particle with intense glow
          ctx.shadowBlur = 25 * scale;
          ctx.shadowColor = this.color + '1)';
          ctx.fillStyle = this.color + '1)';
          ctx.beginPath();
          ctx.arc(x2d + (Math.random() - 0.5) * glitchAmount, y2d, size * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    // Data Highway Lines
    class DataHighway {
      lane: number;
      z: number;
      radius: number;

      constructor(z: number) {
        this.lane = Math.floor(Math.random() * 6);
        this.z = z;
        this.radius = 250 + Math.random() * 200;
      }

      update() {
        this.z -= tunnelSpeed;
        if (this.z < -500) {
          this.z = 3000;
        }
      }

      draw(glitchAmount: number) {
        const scale = 1000 / (1000 + this.z);
        const alpha = Math.min(scale * 1.2, 0.9);

        if (scale > 0.01) {
          ctx.save();
          const color = Math.random() > 0.5 ? colors.neonRed : colors.neonGreen;
          ctx.strokeStyle = color + alpha + ')';
          ctx.lineWidth = 2.5 * scale;
          ctx.shadowBlur = 20 * scale;
          ctx.shadowColor = color + alpha + ')';

          // Draw pulsing highway line
          ctx.beginPath();
          for (let i = 0; i <= 50; i++) {
            const angle = (this.lane / 6) * Math.PI * 2;
            const segmentZ = this.z + (i * 60);
            const segmentScale = 1000 / (1000 + segmentZ);
            const pulse = Math.sin(i * 0.3 + zOffset * 0.1) * 5;
            const r = (this.radius + pulse) * segmentScale;
            const x = Math.cos(angle) * r + centerX + (Math.random() - 0.5) * glitchAmount * scale;
            const y = Math.sin(angle) * r + centerY + (Math.random() - 0.5) * glitchAmount * scale;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // Create entities
    const nodes: HighwayNode[] = [];
    const packets: DataPacket[] = [];
    const highways: DataHighway[] = [];

    for (let i = 0; i < 40; i++) {
      nodes.push(new HighwayNode(i * 75));
    }

    for (let i = 0; i < 300; i++) {
      packets.push(new DataPacket());
    }

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 15; j++) {
        const highway = new DataHighway(j * 200);
        highway.lane = i;
        highways.push(highway);
      }
    }

    // Animation loop
    const animate = () => {
      // Motion blur with darker fade
      ctx.fillStyle = "rgba(5, 8, 15, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      zOffset += tunnelSpeed;
      glitchTimer++;

      // Cyber-glitch effect
      const glitchAmount = (Math.sin(glitchTimer * 0.1) > 0.95) ? Math.random() * 8 : 0;

      // Camera shake for handheld effect
      const shakeX = (Math.random() - 0.5) * 2;
      const shakeY = (Math.random() - 0.5) * 2;
      ctx.save();
      ctx.translate(shakeX, shakeY);

      // Draw data highways
      highways.forEach((highway) => {
        highway.update();
        highway.draw(glitchAmount);
      });

      // Draw data packets (streaking fast)
      packets.forEach((packet) => {
        packet.update();
        packet.draw(glitchAmount);
      });

      // Draw highway nodes
      nodes.forEach((node) => {
        node.update();
        node.draw(glitchAmount);
      });

      ctx.restore();

      // Occasional chromatic aberration flash
      if (Math.random() > 0.98) {
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-60"
    />
  );
};
