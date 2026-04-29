import { useEffect, useRef } from "react";

/**
 * Lightweight cursor accent — a soft glowing ring that follows the native
 * cursor with mild lerp. Native cursor stays visible (no slowness).
 * Disabled on touch devices.
 */
export const MagneticCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    if (matchMedia("(hover: none), (pointer: coarse)").matches) {
      ring.style.display = "none";
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onEnter = () => ring.classList.add("cursor-hover");
    const onLeave = () => ring.classList.remove("cursor-hover");
    const interactive = "a, button, [data-magnetic], [role='button']";
    const bind = () => {
      document.querySelectorAll(interactive).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    bind();

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.querySelectorAll(interactive).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-primary/40 transition-[width,height,background,border-color] duration-300"
        style={{ willChange: "transform" }}
      />
      <style>{`
        .cursor-hover { width: 48px !important; height: 48px !important; border-color: hsl(var(--primary)) !important; background: hsl(var(--primary) / 0.10); }
      `}</style>
    </>
  );
};
