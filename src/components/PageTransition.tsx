import { useEffect, useState } from "react";

/**
 * Initial page-load wipe: a panel slides up to reveal the site,
 * with the name briefly displayed.
 */
export const PageTransition = () => {
  const [stage, setStage] = useState<"intro" | "exit" | "done">("intro");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("exit"), 1200);
    const t2 = setTimeout(() => setStage("done"), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (stage === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center"
      style={{
        background: "hsl(222 60% 4%)",
        transform: stage === "exit" ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
      aria-hidden
    >
      <div className="text-center">
        <p
          className="text-xs uppercase tracking-[0.5em] text-primary/70 mb-4"
          style={{
            opacity: stage === "intro" ? 1 : 0,
            transform: stage === "intro" ? "translateY(0)" : "translateY(-10px)",
            transition: "all 0.4s ease",
          }}
        >
          Portfolio
        </p>
        <h1
          className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground"
          style={{
            opacity: stage === "intro" ? 1 : 0,
            transform: stage === "intro" ? "translateY(0)" : "translateY(-20px)",
            transition: "all 0.5s ease",
          }}
        >
          Harsha Vardhan Katuri
        </h1>
        <div
          className="mx-auto mt-6 h-px bg-primary"
          style={{
            width: stage === "intro" ? "120px" : "0px",
            transition: "width 0.9s cubic-bezier(0.76, 0, 0.24, 1) 0.2s",
          }}
        />
      </div>
    </div>
  );
};
