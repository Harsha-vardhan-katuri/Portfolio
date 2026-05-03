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
  const shown = true;

  return (
    <Tag
      ref={ref as never}
      className={`overflow-hidden ${className}`}
      style={{ display: block ? "block" : "inline-block" }}
    >
      <span
        style={{
          display: block ? "block" : "inline-block",
          transform: "translate3d(0,0,0)",
          opacity: 1,
        }}
      >
        {children}
      </span>
    </Tag>
  );
};
