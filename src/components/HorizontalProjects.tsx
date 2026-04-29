import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

const projects = [
  {
    num: "01",
    title: "LoRa Soil Health Monitor",
    tag: "IoT · Embedded",
    description:
      "Architected an advanced IoT system using ESP32 and RS485-based sensors to monitor soil parameters with LoRa wireless transmission over 1km range.",
    technologies: ["ESP32", "RS485", "LoRa", "Modbus RTU"],
    color: "from-cyan-500/30 via-blue-600/20 to-transparent",
    github: "#",
  },
  {
    num: "02",
    title: "IoT Weather Reporting",
    tag: "Embedded · Cloud",
    description:
      "Real-time weather monitoring system with DHT11 sensor integration and cloud connectivity via ThingSpeak.",
    technologies: ["LPC2148", "ESP01", "DHT11", "ThingSpeak"],
    color: "from-violet-500/30 via-purple-600/20 to-transparent",
    github: "#",
  },
  {
    num: "03",
    title: "AI Health Chatbot",
    tag: "AI · Python",
    description:
      "Intelligent chatbot using Streamlit and Hugging Face Transformers for health-related conversations with 90% response accuracy.",
    technologies: ["Python", "Streamlit", "DistilGPT-2"],
    color: "from-fuchsia-500/30 via-pink-600/20 to-transparent",
    github: "#",
  },
  {
    num: "04",
    title: "HealthCube HCXL",
    tag: "Production Firmware",
    description:
      "Contributing to production-grade firmware for medical diagnostic devices, integrating multiple sensors and protocols.",
    technologies: ["C/C++", "RTOS", "I2C", "SPI"],
    color: "from-emerald-500/30 via-teal-600/20 to-transparent",
    github: "#",
  },
];

const SLIDE_MS = 3000;

export const HorizontalProjects = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setTimeout(() => {
      setActive((i) => (i + 1) % projects.length);
    }, SLIDE_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [active, paused]);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary/70 mb-3">
              — Selected Work
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight">
              Projects.
            </h2>
          </div>
          <p className="text-foreground/50 text-sm max-w-xs">
            Auto-rotating · 3s per project · hover to pause.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden rounded-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ height: "min(70vh, 620px)" }}
        >
          <div
            className="flex h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
            style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
          >
            {projects.map((p) => (
              <article
                key={p.num}
                className="group relative shrink-0 w-full h-full overflow-hidden bg-white/[0.03] border border-white/10"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-70`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.18),transparent_60%)]" />

                <div className="relative h-full p-8 md:p-16 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-7xl md:text-9xl font-black text-foreground/15">
                      {p.num}
                    </span>
                    <ArrowUpRight className="h-8 w-8 text-foreground/40 group-hover:text-primary group-hover:rotate-45 transition-all duration-500" />
                  </div>

                  <div className="max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">
                      {p.tag}
                    </p>
                    <h3 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-[1.05]">
                      {p.title}
                    </h3>
                    <p className="text-foreground/70 text-sm md:text-base mb-6">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        data-magnetic
                        href={p.github}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors"
                      >
                        <Github className="h-4 w-4" /> Code
                      </a>
                      <a
                        data-magnetic
                        href="#"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dots & progress */}
        <div className="mt-8 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex gap-2">
            {projects.map((p, i) => (
              <button
                key={p.num}
                data-magnetic
                onClick={() => setActive(i)}
                aria-label={`Go to ${p.title}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === active ? "w-10 bg-primary" : "w-2 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-foreground/50 font-mono tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            {paused && <span className="ml-3 text-primary">paused</span>}
          </div>
        </div>
      </div>
    </section>
  );
};
