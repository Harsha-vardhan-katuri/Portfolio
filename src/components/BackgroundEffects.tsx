import { useEffect, useRef, useState, useMemo } from "react";

interface ParticleData {
  size: number;
  left: number;
  initialY: number;
  delay: number;
  duration: number;
  oscillation: number;
  glowIntensity: number;
}

const Particle = ({ data, parallaxOffset }: { data: ParticleData; parallaxOffset: number }) => {
  const individualParallax = parallaxOffset * (0.3 + data.glowIntensity * 0.7);

  return (
    <div
      className="absolute rounded-full"
      style={{
        width: `${data.size}px`,
        height: `${data.size}px`,
        left: `${data.left}%`,
        top: `${data.initialY}%`,
        background: `radial-gradient(circle, hsl(199 89% 60% / ${0.5 + data.glowIntensity * 0.4}), hsl(199 89% 48% / 0))`,
        boxShadow: `0 0 ${data.size * 3 + data.glowIntensity * 4}px hsl(199 89% 48% / ${0.3 + data.glowIntensity * 0.3})`,
        animation: `particle-drift ${data.duration}s ease-in-out infinite`,
        animationDelay: `${data.delay}s`,
        transform: `translateY(${-individualParallax}px)`,
        willChange: "transform",
      }}
    />
  );
};

export const BackgroundEffects = () => {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const parallaxOffset = scrollY * 0.05;

  const particles = useMemo<ParticleData[]>(() =>
    Array.from({ length: 40 }, () => ({
      size: 1 + Math.random() * 2.5,
      left: Math.random() * 100,
      initialY: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 10,
      oscillation: Math.random() * 20,
      glowIntensity: Math.random(),
    })), []);

  return (
    <>
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Center ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 35%, hsl(199 89% 48% / 0.07) 0%, transparent 65%)",
        }}
      />

      {/* Mesh gradient blobs - enhanced */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div
          className="absolute animate-blob-1"
          style={{
            width: "700px",
            height: "700px",
            top: "5%",
            left: "15%",
            background: "radial-gradient(circle, hsl(199 89% 48% / 0.22) 0%, transparent 65%)",
            filter: "blur(200px)",
            mixBlendMode: "screen",
            transform: `translate3d(0, ${parallaxOffset * 1.2}px, 0)`,
            willChange: "transform",
          }}
        />
        <div
          className="absolute animate-blob-2"
          style={{
            width: "600px",
            height: "600px",
            top: "45%",
            right: "5%",
            background: "radial-gradient(circle, hsl(260 60% 55% / 0.28) 0%, transparent 65%)",
            filter: "blur(220px)",
            mixBlendMode: "screen",
            transform: `translate3d(0, ${parallaxOffset * 0.8}px, 0)`,
            willChange: "transform",
          }}
        />
        <div
          className="absolute animate-blob-3"
          style={{
            width: "800px",
            height: "800px",
            bottom: "5%",
            left: "35%",
            background: "radial-gradient(circle, hsl(210 80% 35% / 0.3) 0%, transparent 60%)",
            filter: "blur(240px)",
            mixBlendMode: "lighten",
            transform: `translate3d(0, ${parallaxOffset * 0.5}px, 0)`,
            willChange: "transform",
          }}
        />
        <div
          className="absolute animate-blob-2"
          style={{
            width: "500px",
            height: "500px",
            top: "65%",
            left: "5%",
            background: "radial-gradient(circle, hsl(180 70% 40% / 0.15) 0%, transparent 65%)",
            filter: "blur(200px)",
            mixBlendMode: "screen",
            animationDelay: "5s",
            transform: `translate3d(0, ${parallaxOffset * 0.9}px, 0)`,
            willChange: "transform",
          }}
        />
      </div>

      {/* Particles with enhanced parallax */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {particles.map((data, i) => (
          <Particle key={i} data={data} parallaxOffset={parallaxOffset} />
        ))}
      </div>
    </>
  );
};
