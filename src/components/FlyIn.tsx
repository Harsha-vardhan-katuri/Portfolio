import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

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

const OFFSETS: Record<FlyDirection, { x: number; y: number; s?: number }> = {
  left: { x: -48, y: 0 },
  right: { x: 48, y: 0 },
  up: { x: 0, y: 36 },
  down: { x: 0, y: -36 },
  "top-left": { x: -40, y: -32 },
  "top-right": { x: 40, y: -32 },
  "bottom-left": { x: -40, y: 32 },
  "bottom-right": { x: 40, y: 32 },
  zoom: { x: 0, y: 0, s: 0.94 },
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
  duration = 0.55,
  blur = false,
  className = "",
}: FlyInProps) => {
  const dir = direction ?? dirFor(index);
  const o = OFFSETS[dir];
  const [done, setDone] = useState(false);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: o.x, y: o.y, scale: o.s ?? 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay: delay + Math.min(index, 5) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      onAnimationComplete={() => setDone(true)}
      style={{ willChange: done ? "auto" : "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};
