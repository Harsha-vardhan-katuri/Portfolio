import { useEffect, useState } from "react";

const Particle = ({ index }: { index: number }) => {
  const size = 1 + Math.random() * 2;
  const left = Math.random() * 100;
  const delay = Math.random() * 8;
  const duration = 6 + Math.random() * 6;
  const initialY = Math.random() * 100;

  return (
    <div
      className="absolute rounded-full animate-particle"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${initialY}%`,
        background: `radial-gradient(circle, hsl(199 89% 48% / 0.6), hsl(199 89% 48% / 0))`,
        boxShadow: `0 0 ${size * 2}px hsl(199 89% 48% / 0.3)`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
};

export const BackgroundEffects = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.03;

  return (
    <>
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Center glow */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 40%, hsl(199 89% 48% / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Mesh gradient blobs */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div
          className="absolute animate-blob-1"
          style={{
            width: "600px",
            height: "600px",
            top: "10%",
            left: "20%",
            background: "radial-gradient(circle, hsl(199 89% 48% / 0.18) 0%, transparent 70%)",
            filter: "blur(200px)",
            mixBlendMode: "screen",
            transform: `translateY(${parallaxOffset}px)`,
          }}
        />
        <div
          className="absolute animate-blob-2"
          style={{
            width: "500px",
            height: "500px",
            top: "50%",
            right: "10%",
            background: "radial-gradient(circle, hsl(260 60% 55% / 0.22) 0%, transparent 70%)",
            filter: "blur(220px)",
            mixBlendMode: "screen",
            transform: `translateY(${parallaxOffset * 0.7}px)`,
          }}
        />
        <div
          className="absolute animate-blob-3"
          style={{
            width: "700px",
            height: "700px",
            bottom: "10%",
            left: "40%",
            background: "radial-gradient(circle, hsl(210 80% 30% / 0.25) 0%, transparent 70%)",
            filter: "blur(240px)",
            mixBlendMode: "lighten",
            transform: `translateY(${parallaxOffset * 0.5}px)`,
          }}
        />
        <div
          className="absolute animate-blob-1"
          style={{
            width: "400px",
            height: "400px",
            top: "70%",
            left: "10%",
            background: "radial-gradient(circle, hsl(199 89% 48% / 0.12) 0%, transparent 70%)",
            filter: "blur(180px)",
            mixBlendMode: "screen",
            animationDelay: "4s",
            transform: `translateY(${parallaxOffset * 0.8}px)`,
          }}
        />
      </div>

      {/* Particles */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        style={{ transform: `translateY(${-parallaxOffset * 0.5}px)` }}
      >
        {Array.from({ length: 35 }, (_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>
    </>
  );
};
