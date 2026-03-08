import { useRef, ReactNode } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ScrollSectionProps {
  id: string;
  children: (progress: number) => ReactNode;
  height?: string;
}

export const ScrollSection = ({ id, children, height = "200vh" }: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef as React.RefObject<HTMLElement>);

  // Cinematic enter/exit transforms
  const enterProgress = Math.min(progress * 5, 1); // 0→1 in first 20%
  const exitProgress = Math.max(0, (progress - 0.8) / 0.2); // 0→1 in last 20%

  const contentY = (1 - enterProgress) * 60 - exitProgress * 30;
  const contentOpacity = enterProgress * (1 - exitProgress);
  const contentScale = 1 - exitProgress * 0.04;
  const contentBlur = exitProgress * 4;

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative"
      style={{ height }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div
          className="w-full will-change-transform"
          style={{
            transform: `translateY(${contentY}px) scale(${contentScale})`,
            opacity: contentOpacity,
            filter: contentBlur > 0 ? `blur(${contentBlur}px)` : undefined,
          }}
        >
          {children(progress)}
        </div>
      </div>
    </section>
  );
};
