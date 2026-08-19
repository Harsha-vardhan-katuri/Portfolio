import { motion } from "framer-motion";
import { ReactNode } from "react";

export type FlyDirection =
  | "left"
  | "right"
  | "up"
  | "down"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "zoom";

const OFFSETS: Record<FlyDirection, { x: number; y: number; s?: number; r?: number }> = {
  left: { x: -70, y: 0, r: -3 },
  right: { x: 70, y: 0, r: 3 },
  up: { x: 0, y: 50 },
  down: { x: 0, y: -50 },
  "top-left": { x: -60, y: -50, r: -4 },
  "top-right": { x: 60, y: -50, r: 4 },
  "bottom-left": { x: -60, y: 50, r: 4 },
  "bottom-right": { x: 60, y: 50, r: -4 },
  zoom: { x: 0, y: 0, s: 0.9 },
};

const CYCLE: FlyDirection[] = [
  "bottom-left",
  "up",
  "bottom-right",
  "left",
  "zoom",
  "right",
  "top-left",
  "down",
  "top-right",
];

/** Pick a varied direction from an index so no two neighbours arrive alike. */
export const dirFor = (i: number): FlyDirection => CYCLE[i % CYCLE.length];

interface FlyInProps {
  children: ReactNode;
  direction?: FlyDirection;
  index?: number;
  delay?: number;
  duration?: number;
  blur?: boolean;
  className?: string;
}

/**
 * Reusable entrance animation — elements fly in from varied angles with an
 * optional blur-focus, mirroring the intro letter animation.
 */
export const FlyIn = ({
  children,
  direction,
  index = 0,
  delay = 0,
  duration = 0.7,
  blur = true,
  className = "",
}: FlyInProps) => {
  const dir = direction ?? dirFor(index);
  const o = OFFSETS[dir];

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: o.x,
        y: o.y,
        scale: o.s ?? 1,
        rotate: o.r ?? 0,
        filter: blur ? "blur(10px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay: delay + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
};
