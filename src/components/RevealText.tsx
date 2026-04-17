import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Clip-path reveal — a single observer, transform/clip only. No layout thrash.
 */
export const Reveal = ({ children, delay = 0, className = "", as: Tag = "div" }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`overflow-hidden ${className}`}
      style={{ display: "inline-block" }}
    >
      <span
        style={{
          display: "inline-block",
          transform: shown ? "translate3d(0,0,0)" : "translate3d(0,110%,0)",
          opacity: shown ? 1 : 0,
          transition: `transform 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity 0.8s ease ${delay}s`,
          willChange: "transform",
        }}
      >
        {children}
      </span>
    </Tag>
  );
};
