import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INTRO_NAME = "HARSHA VARDHAN KATURI";

const IntroParticle = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute rounded-full" style={style} />
);

export const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState<"letters" | "glow" | "line" | "dissolve" | "done">("letters");

  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => {
      const size = 1 + Math.random() * 1.5;
      return {
        key: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `radial-gradient(circle, hsl(199 89% 60% / 0.8), hsl(199 89% 48% / 0))`,
          boxShadow: `0 0 ${size * 3}px hsl(199 89% 48% / 0.5)`,
          animation: `particle-float ${5 + Math.random() * 5}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
        } as React.CSSProperties,
      };
    }), []);

  const letterDelay = 0.07;
  const totalLetterTime = INTRO_NAME.length * letterDelay + 0.6;

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Stage 2: glow after letters
    timers.push(setTimeout(() => setStage("glow"), totalLetterTime * 1000));
    // Stage 3: underline
    timers.push(setTimeout(() => setStage("line"), (totalLetterTime + 1.5) * 1000));
    // Stage 4: dissolve
    timers.push(setTimeout(() => setStage("dissolve"), (totalLetterTime + 2.8) * 1000));
    // Done
    timers.push(setTimeout(() => {
      setStage("done");
      onComplete();
    }, (totalLetterTime + 3.6) * 1000));

    return () => timers.forEach(clearTimeout);
  }, [onComplete, totalLetterTime]);

  if (stage === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: "#050816" }}
        animate={stage === "dissolve" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <IntroParticle key={p.key} style={p.style} />
          ))}
        </div>

        {/* Faint mesh glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute animate-blob-1"
            style={{
              width: "500px", height: "500px",
              top: "30%", left: "30%",
              background: "radial-gradient(circle, hsl(199 89% 48% / 0.12) 0%, transparent 70%)",
              filter: "blur(200px)",
              mixBlendMode: "screen",
            }}
          />
          <div
            className="absolute animate-blob-2"
            style={{
              width: "400px", height: "400px",
              top: "40%", right: "20%",
              background: "radial-gradient(circle, hsl(260 60% 55% / 0.1) 0%, transparent 70%)",
              filter: "blur(200px)",
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* Text container */}
        <div className="relative flex flex-col items-center">
          {/* Glow behind text */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={
              stage === "glow" || stage === "line"
                ? { opacity: [0.4, 0.7, 0.4] }
                : stage === "dissolve"
                ? { opacity: 0 }
                : { opacity: 0 }
            }
            transition={
              stage === "glow" || stage === "line"
                ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.8 }
            }
            style={{
              background: "radial-gradient(ellipse 120% 80% at 50% 50%, hsl(199 89% 48% / 0.25) 0%, hsl(260 60% 55% / 0.1) 40%, transparent 70%)",
              filter: "blur(30px)",
              inset: "-60px -80px",
            }}
          />

          {/* Letters */}
          <div className="relative z-10 flex flex-wrap justify-center gap-x-0">
            {INTRO_NAME.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={
                  stage === "dissolve"
                    ? { opacity: 0, filter: "blur(6px)", scale: 1.05 }
                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                transition={{
                  duration: stage === "dissolve" ? 0.8 : 0.6,
                  delay: stage === "dissolve" ? 0 : i * letterDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground tracking-wider"
                style={{ display: "inline-block", minWidth: char === " " ? "0.4em" : undefined }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* Underline energy line */}
          <motion.div
            className="relative z-10 mt-4 h-[2px] rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={
              stage === "line"
                ? { width: 200, opacity: 1 }
                : stage === "dissolve"
                ? { width: 200, opacity: 0 }
                : { width: 0, opacity: 0 }
            }
            transition={{
              duration: stage === "dissolve" ? 0.6 : 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              background: "linear-gradient(90deg, transparent, hsl(199 89% 48%), hsl(260 60% 55%), transparent)",
              boxShadow: "0 0 12px hsl(199 89% 48% / 0.6), 0 0 30px hsl(199 89% 48% / 0.3)",
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
