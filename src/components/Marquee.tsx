interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
}

/**
 * Pure CSS infinite marquee, GPU-accelerated.
 */
export const Marquee = ({ items, speed = 40, reverse = false }: MarqueeProps) => {
  const content = items.map((item, i) => (
    <span key={i} className="mx-12 inline-flex items-center gap-12">
      <span className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground/[0.08] hover:text-primary transition-colors duration-500">
        {item}
      </span>
      <span className="h-3 w-3 rounded-full bg-primary/30" aria-hidden />
    </span>
  ));

  return (
    <div className="relative w-full overflow-hidden py-8 select-none">
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0">{content}</div>
        <div className="flex shrink-0" aria-hidden>
          {content}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
