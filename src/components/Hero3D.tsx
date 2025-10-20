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
    const tunnelSpeed = 8;
    let zOffset = 0;

    // Color palette
    const colors = {
      neonGreen: 'hsla(120, 100%, 50%, ',
      neonPurple: 'hsla(271, 91%, 65%, ',
      cobaltBlue: 'hsla(220, 100%, 50%, ',
      cyan: 'hsla(189, 94%, 43%, ',
    };

    // Tetrahedral node class
    class TetraNode {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      rotation: number;
      rotationSpeed: number;

      constructor(z: number) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 200 + Math.random() * 400;
        this.x = Math.cos(angle) * radius;
        this.y = Math.sin(angle) * radius;
        this.z = z;
        this.size = 15 + Math.random() * 20;
        const colorKeys = Object.keys(colors);
        this.color = colors[colorKeys[Math.floor(Math.random() * colorKeys.length)] as keyof typeof colors];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
      }

      update() {
        this.z -= tunnelSpeed;
        this.rotation += this.rotationSpeed;
        if (this.z < -500) {
          this.z = 3000;
          const angle = Math.random() * Math.PI * 2;
          const radius = 200 + Math.random() * 400;
          this.x = Math.cos(angle) * radius;
          this.y = Math.sin(angle) * radius;
        }
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = this.x * scale + centerX;
        const y2d = this.y * scale + centerY;
        const size = this.size * scale;

        if (scale > 0.01) {
          ctx.save();
          ctx.translate(x2d, y2d);
          ctx.rotate(this.rotation);
          
          // Draw tetrahedron (simplified as triangle)
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(-size * 0.866, size * 0.5);
          ctx.lineTo(size * 0.866, size * 0.5);
          ctx.closePath();
          
          const alpha = Math.min(scale * 1.5, 1);
          ctx.strokeStyle = this.color + alpha + ')';
          ctx.lineWidth = 2 * scale;
          ctx.shadowBlur = 20 * scale;
          ctx.shadowColor = this.color + alpha + ')';
          ctx.stroke();
          
          ctx.restore();
        }
      }
    }

    // Data packet class
    class DataPacket {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      trail: { x: number; y: number; alpha: number }[];

      constructor() {
        const angle = Math.random() * Math.PI * 2;
        const radius = 100 + Math.random() * 500;
        this.x = Math.cos(angle) * radius;
        this.y = Math.sin(angle) * radius;
        this.z = Math.random() * 3000;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        const colorKeys = Object.keys(colors);
        this.color = colors[colorKeys[Math.floor(Math.random() * colorKeys.length)] as keyof typeof colors];
        this.size = 2 + Math.random() * 3;
        this.trail = [];
      }

      update() {
        this.z -= tunnelSpeed * 1.5;
        this.x += this.vx;
        this.y += this.vy;

        if (this.z < -500) {
          this.z = 3000;
          const angle = Math.random() * Math.PI * 2;
          const radius = 100 + Math.random() * 500;
          this.x = Math.cos(angle) * radius;
          this.y = Math.sin(angle) * radius;
          this.trail = [];
        }

        const scale = 1000 / (1000 + this.z);
        const x2d = this.x * scale + centerX;
        const y2d = this.y * scale + centerY;
        
        this.trail.unshift({ x: x2d, y: y2d, alpha: 1 });
        if (this.trail.length > 15) this.trail.pop();
        
        this.trail.forEach((point, i) => {
          point.alpha *= 0.85;
        });
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = this.x * scale + centerX;
        const y2d = this.y * scale + centerY;
        const size = this.size * scale;

        if (scale > 0.01) {
          // Draw trail with chromatic aberration
          this.trail.forEach((point, i) => {
            const trailSize = size * (1 - i / this.trail.length);
            const alpha = point.alpha * 0.6;
            
            // Chromatic aberration effect
            const offset = 2 * (1 - i / this.trail.length);
            
            // Red channel
            ctx.fillStyle = 'rgba(255, 0, 100, ' + alpha * 0.3 + ')';
            ctx.beginPath();
            ctx.arc(point.x - offset, point.y, trailSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Green/Cyan channel
            ctx.fillStyle = this.color + alpha + ')';
            ctx.beginPath();
            ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Blue channel
            ctx.fillStyle = 'rgba(0, 100, 255, ' + alpha * 0.3 + ')';
            ctx.beginPath();
            ctx.arc(point.x + offset, point.y, trailSize, 0, Math.PI * 2);
            ctx.fill();
          });

          // Main particle with glow
          ctx.shadowBlur = 15 * scale;
          ctx.shadowColor = this.color + '1)';
          ctx.fillStyle = this.color + '1)';
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    // Plexus grid lines
    class GridLine {
      angle: number;
      radius: number;
      z: number;
      points: number;

      constructor(z: number) {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = 300 + Math.random() * 300;
        this.z = z;
        this.points = 8;
      }

      update() {
        this.z -= tunnelSpeed;
        if (this.z < -500) {
          this.z = 3000;
        }
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const alpha = Math.min(scale * 0.8, 0.6);

        if (scale > 0.01) {
          ctx.beginPath();
          const color = Math.random() > 0.5 ? colors.neonPurple : colors.cyan;
          ctx.strokeStyle = color + alpha + ')';
          ctx.lineWidth = 1 * scale;
          ctx.shadowBlur = 10 * scale;
          ctx.shadowColor = color + alpha + ')';

          for (let i = 0; i <= this.points; i++) {
            const angle = (i / this.points) * Math.PI * 2;
            const x = Math.cos(angle) * this.radius * scale + centerX;
            const y = Math.sin(angle) * this.radius * scale + centerY;
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }
    }

    // Create entities
    const nodes: TetraNode[] = [];
    const packets: DataPacket[] = [];
    const gridLines: GridLine[] = [];

    for (let i = 0; i < 30; i++) {
      nodes.push(new TetraNode(i * 100));
    }

    for (let i = 0; i < 200; i++) {
      packets.push(new DataPacket());
    }

    for (let i = 0; i < 20; i++) {
      gridLines.push(new GridLine(i * 150));
    }

    // Animation loop
    const animate = () => {
      // Heavy motion blur trail effect
      ctx.fillStyle = "rgba(17, 24, 39, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      zOffset += tunnelSpeed;

      // Draw tunnel grid
      gridLines.forEach((line) => {
        line.update();
        line.draw();
      });

      // Draw data packets
      packets.forEach((packet) => {
        packet.update();
        packet.draw();
      });

      // Draw tetrahedral nodes
      nodes.forEach((node) => {
        node.update();
        node.draw();
      });

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
