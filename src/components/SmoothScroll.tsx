import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Global Lenis smooth-scroll provider.
 * Sets a CSS variable --scroll-y so other effects can react cheaply,
 * and exposes Lenis instance on window for debugging.
 */
export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const rafRef = useRef<number>();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
