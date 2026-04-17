import { useEffect, useRef, useState, useMemo } from "react";

/**
 * Lightweight ambient background — pure CSS animations, no scroll listener,
 * no canvas, no expensive blurs. Only visible behind sections AFTER the hero,
 * so the WebGL hero stays performant.
 */
export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      {/* Deep base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(222 55% 8%) 0%, hsl(222 60% 4%) 60%, hsl(222 65% 2%) 100%)",
        }}
      />
      {/* Two slow drifting blobs — single composite layer each */}
      <div
        className="absolute animate-blob-1"
        style={{
          width: 600,
          height: 600,
          top: "20%",
          left: "10%",
          background: "radial-gradient(circle, hsl(199 89% 48% / 0.18), transparent 65%)",
          filter: "blur(120px)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute animate-blob-2"
        style={{
          width: 500,
          height: 500,
          bottom: "15%",
          right: "10%",
          background: "radial-gradient(circle, hsl(260 60% 55% / 0.20), transparent 65%)",
          filter: "blur(120px)",
          willChange: "transform",
        }}
      />
      {/* Grain */}
      <div className="grain-overlay" />
    </div>
  );
};
