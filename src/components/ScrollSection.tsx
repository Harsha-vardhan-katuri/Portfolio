import { useRef, ReactNode } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ScrollSectionProps {
  id: string;
  children: (progress: number) => ReactNode;
  height?: string;
}

/**
 * Pinned, scroll-driven section. Transform + opacity only (GPU-cheap).
 * No blur during scroll — blur on a sticky parent kills FPS.
 */
export const ScrollSection = ({ id, children, height = "180vh" }: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef as React.RefObject<HTMLElement>);

  const enter = Math.min(progress * 4, 1); // 0→1 in first 25%
  const exit = Math.max(0, (progress - 0.8) / 0.2); // 0→1 in last 20%

  const y = (1 - enter) * 50 - exit * 30;
  const opacity = enter * (1 - exit);
  const scale = 1 - exit * 0.03;

  return (
    <section ref={sectionRef} id={id} className="relative" style={{ height }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div
          className="w-full will-change-transform"
          style={{
            transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
            opacity,
          }}
        >
          {children(progress)}
        </div>
      </div>
    </section>
  );
};
