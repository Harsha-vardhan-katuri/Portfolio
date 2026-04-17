import { useEffect, useRef, useState, RefObject } from "react";

/**
 * Cheap scroll progress 0..1 for an element across its height.
 * Uses rAF throttling so we don't trigger one setState per scroll event.
 */
export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();
  const lastRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      rafRef.current = undefined;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = el.offsetHeight - viewH;
      if (total <= 0) {
        if (lastRef.current !== 0) {
          lastRef.current = 0;
          setProgress(0);
        }
        return;
      }
      const scrolled = -rect.top;
      const next = Math.max(0, Math.min(1, scrolled / total));
      // skip tiny deltas to avoid wasted renders
      if (Math.abs(next - lastRef.current) < 0.001) return;
      lastRef.current = next;
      setProgress(next);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ref]);

  return progress;
}

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}
