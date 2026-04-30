import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Wraps a section to give it a cinematic reveal when it scrolls into view:
 * - a thin overlay panel slides up off the section (page-transition style)
 * - the children fade + lift in as the panel exits
 */
export const SectionTransition = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Sliding overlay panel */}
      <motion.div
        aria-hidden
        initial={{ y: "0%" }}
        animate={inView ? { y: "-101%" } : { y: "0%" }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none absolute inset-0 z-30 origin-top"
        style={{
          background:
            "linear-gradient(180deg, hsl(258 45% 5%) 0%, hsl(265 55% 8%) 100%)",
        }}
      />

      {/* Content fade-up */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
