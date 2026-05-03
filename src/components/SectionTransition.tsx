import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Cinematic section reveal: a violet panel wipes upward across the section
 * as it scrolls into view, then content fades + lifts in.
 */
export const SectionTransition = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger as soon as the section's top crosses ~85% of the viewport
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Sliding overlay panel — violet gradient */}
      <motion.div
        aria-hidden
        initial={{ y: "0%" }}
        animate={inView ? { y: "-101%" } : { y: "0%" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0}}
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          background:
            "linear-gradient(180deg, hsl(258 55% 6%) 0%, hsl(265 70% 14%) 45%, hsl(285 80% 22%) 100%)",
        }}
      />

      {/* Bright accent line that follows the panel edge */}
      <motion.div
        aria-hidden
        initial={{ y: "100%", opacity: 1 }}
        animate={inView ? { y: "-101%", opacity: 0 } : { y: "100%", opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0}}
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(265 95% 70%) 50%, transparent 100%)",
          boxShadow: "0 0 24px hsl(265 95% 70% / 0.8)",
        }}
      />

      {/* Content fade-up */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
