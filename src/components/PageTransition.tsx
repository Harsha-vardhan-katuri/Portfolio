import { useEffect, useMemo, useState } from "react";

const LINES = ["HARSHA VARDHAN", "KATURI"];

/** deterministic pseudo-random offsets so letters fly in from all directions */
const offsetFor = (i: number) => {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12345.6789;
  const rx = a - Math.floor(a);
  const ry = b - Math.floor(b);
  return { x: (rx - 0.5) * 700, y: (ry - 0.5) * 700 };
};

/**
 * Initial page-load intro: a glowing ring scales in while the letters of the
 * name fly in from different directions, then the panel wipes upward.
 */
export const PageTransition = () => {
  const [stage, setStage] = useState<"init" | "intro" | "exit" | "done">("init");

  const lines = useMemo(() => LINES.map((l) => l.split("")), []);

  useEffect(() => {
    const t0 = requestAnimationFrame(() => setStage("intro"));
    const t1 = setTimeout(() => setStage("exit"), 2200);
    const t2 = setTimeout(() => setStage("done"), 3200);
    return () => {
      cancelAnimationFrame(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (stage === "done") return null;

  const active = stage === "intro" || stage === "exit";

  return (
    <div
      className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center overflow-hidden"
      style={{
        background: "hsl(258 45% 4%)",
        transform: stage === "exit" ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
      aria-hidden
    >
      {/* Glowing ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "min(70vw, 420px)",
          height: "min(70vw, 420px)",
          border: "2px solid hsl(var(--primary))",
          boxShadow:
            "0 0 60px hsl(var(--primary) / 0.55), inset 0 0 40px hsl(var(--primary) / 0.45)",
          opacity: active ? 1 : 0,
          transform: active ? "scale(1.15)" : "scale(0.5)",
          transition:
            "opacity 2.2s cubic-bezier(0.16,1,0.3,1), transform 2.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Flying letters */}
      <h1 className="relative z-10 font-display font-extrabold text-center px-4 text-[clamp(1.6rem,6vw,4rem)] tracking-[0.12em] leading-[1.15] text-foreground">
        {lines.map((chars, li) => (
          <span key={li} className="block text-center">
            {chars.map((ch, ci) => {
              const i = li * 20 + ci;
              const { x, y } = offsetFor(i);
              const d = 0.05 * (li * 8 + ci);
              return (
                <span
                  key={ci}
                  className="inline-block will-change-transform"
                  style={{
                    whiteSpace: "pre",
                    opacity: active ? 1 : 0,
                    filter: active ? "blur(0px)" : "blur(15px)",
                    transform: active
                      ? "translate3d(0,0,0)"
                      : `translate3d(${x}px, ${y}px, 0)`,
                    transition: `transform 1.6s cubic-bezier(0.16,1,0.3,1) ${d}s, opacity 1.2s ease ${d}s, filter 1.2s ease ${d}s`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        ))}
      </h1>
    </div>
  );
};
