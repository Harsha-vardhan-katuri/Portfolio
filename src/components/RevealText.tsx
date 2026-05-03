import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
  block?: boolean; // when true, behaves as block-level (full-width line)
}

/**
 * Clip-path reveal — single observer, transform/clip only. No layout thrash.
 * Use block={true} for headings that need to occupy their own line.
 */
export const Reveal = ({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  block = false,
}: RevealProps) => {
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`overflow-hidden ${className}`}
      style={{ display: block ? "block" : "inline-block" }}
    >
      <span
        style={{
          display: block ? "block" : "inline-block",
          transform: shown ? "translate3d(0,0,0)" : "translate3d(0,100%,0)",
          opacity: shown ? 1 : 0,
          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
          willChange: "transform",
        }}
      >
        {children}
      </span>
    </Tag>
  );
};
