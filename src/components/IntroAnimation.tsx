import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INTRO_NAME = "HVK";

const ease = [0.16, 1, 0.3, 1] as const;

// Flying directions for each letter (like the GSAP reference)
const letterDirections = [
  { x: -300, y: -100 },
  { x: 0, y: 400 },
  { x: 300, y: -100 },
];

const IntroParticle = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute rounded-full" style={style} />
);

export const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState<"ring" | "letters" | "glow" | "dissolve" | "done">("ring");

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

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStage("letters"), 200));
    timers.push(setTimeout(() => setStage("glow"), 2400));
    timers.push(setTimeout(() => setStage("dissolve"), 3800));
    timers.push(setTimeout(() => { setStage("done"); onComplete(); }, 4600));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (stage === "done") return null;

  const isDissolving = stage === "dissolve";

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: "#050816" }}
        animate={isDissolving ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease }}
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

        {/* Glowing Ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            border: "2px solid hsl(199 89% 48% / 0.6)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isDissolving
              ? { opacity: 0, scale: 1.5 }
              : stage !== "ring"
              ? { opacity: 1, scale: 1.2 }
              : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 2.5, ease }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: "0 0 60px hsl(199 89% 48% / 0.4), inset 0 0 40px hsl(199 89% 48% / 0.2)",
            }}
          />
        </motion.div>

        {/* Text container */}
        <div className="relative flex flex-col items-center z-10">
          {/* Glow behind text */}
          <motion.div
            className="absolute pointer-events-none"
            initial={{ opacity: 0 }}
            animate={
              stage === "glow"
                ? { opacity: [0.4, 0.8, 0.4] }
                : isDissolving
                ? { opacity: 0 }
                : { opacity: 0 }
            }
            transition={
              stage === "glow"
                ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.8 }
            }
            style={{
              background: "radial-gradient(ellipse 120% 100% at 50% 50%, hsl(199 89% 48% / 0.3) 0%, hsl(260 60% 55% / 0.15) 40%, transparent 70%)",
              filter: "blur(40px)",
              inset: "-80px -120px",
            }}
          />

          {/* Letters flying in from different directions */}
          <div className="relative z-10 flex items-center gap-6 md:gap-10">
            {INTRO_NAME.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 0,
                  x: letterDirections[i]?.x || 0,
                  y: letterDirections[i]?.y || 0,
                  filter: "blur(15px)",
                }}
                animate={
                  isDissolving
                    ? { opacity: 0, filter: "blur(8px)", scale: 1.1, y: -30 }
                    : stage !== "ring"
                    ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
                    : {}
                }
                transition={{
                  duration: isDissolving ? 0.8 : 2,
                  delay: isDissolving ? 0 : 0.1 + i * 0.1,
                  ease,
                }}
                className="text-6xl md:text-7xl lg:text-8xl font-black font-display text-foreground"
                style={{
                  textShadow: stage === "glow" || stage === "dissolve"
                    ? "0 0 30px hsl(199 89% 48% / 0.5), 0 0 60px hsl(199 89% 48% / 0.2)"
                    : "none",
                  letterSpacing: "0.1em",
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Full name subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              isDissolving
                ? { opacity: 0, y: -10 }
                : stage === "glow"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8, delay: isDissolving ? 0 : 0.3, ease }}
            className="mt-6 text-lg md:text-xl tracking-[0.3em] uppercase text-muted-foreground font-light"
          >
            Harsha Vardhan Katuri
          </motion.p>

          {/* Underline energy line */}
          <motion.div
            className="relative z-10 mt-4 h-[2px] rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={
              stage === "glow"
                ? { width: 250, opacity: 1 }
                : isDissolving
                ? { width: 250, opacity: 0 }
                : { width: 0, opacity: 0 }
            }
            transition={{
              duration: isDissolving ? 0.6 : 1,
              ease,
            }}
            style={{
              background: "linear-gradient(90deg, transparent, hsl(199 89% 48%), hsl(260 60% 55%), transparent)",
              boxShadow: "0 0 15px hsl(199 89% 48% / 0.7), 0 0 40px hsl(199 89% 48% / 0.3)",
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
