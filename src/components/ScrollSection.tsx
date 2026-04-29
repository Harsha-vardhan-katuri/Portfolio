import { ReactNode } from "react";

interface ScrollSectionProps {
  id: string;
  children: (progress: number) => ReactNode;
  height?: string;
}

/**
 * Simple, reliable section. No more pinned 180vh blocks that hide content.
 * Standard flow + min-h-screen padding so every section gets full breathing
 * room and is never blank while scrolling.
 */
export const ScrollSection = ({ id, children }: ScrollSectionProps) => {
  return (
    <section id={id} className="relative min-h-screen py-24 md:py-32 flex items-center">
      <div className="w-full">{children(0)}</div>
    </section>
  );
};
