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

export const HorizontalProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = section.offsetHeight - viewH;
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const progress = scrolled / total;
      const trackWidth = track.scrollWidth;
      const maxX = trackWidth - window.innerWidth;
      setTranslateX(-progress * maxX);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative"
      style={{ height: `${projects.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="container mx-auto px-6 pt-24 pb-6 z-10">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary/60 mb-3">
                — Selected Work
              </p>
              <h2 className="font-display text-5xl md:text-7xl font-black tracking-tight">
                Projects.
              </h2>
            </div>
            <p className="text-foreground/40 text-sm max-w-xs">
              Scroll to traverse · {projects.length} featured builds in firmware,
              IoT, and intelligent systems.
            </p>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 flex items-center">
          <div
            ref={trackRef}
            className="flex gap-8 pl-6 md:pl-24 will-change-transform"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
            }}
          >
            {projects.map((p) => (
              <article
                key={p.num}
                data-magnetic
                className="group relative shrink-0 w-[85vw] md:w-[60vw] lg:w-[48vw] h-[60vh] rounded-3xl border border-foreground/10 overflow-hidden bg-background/40"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-60 group-hover:opacity-100 transition-opacity duration-700`}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_60%)]" />

                <div className="relative h-full p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-7xl md:text-8xl font-black text-foreground/20">
                      {p.num}
                    </span>
                    <ArrowUpRight className="h-8 w-8 text-foreground/40 group-hover:text-primary group-hover:rotate-45 transition-all duration-500" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-primary/70 mb-3">
                      {p.tag}
                    </p>
                    <h3 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-[1.05]">
                      {p.title}
                    </h3>
                    <p className="text-foreground/60 text-sm md:text-base mb-6 max-w-md">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full border border-foreground/15 text-foreground/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={p.github}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors"
                      >
                        <Github className="h-4 w-4" /> Code
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            {/* Spacer */}
            <div className="shrink-0 w-[24vw]" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="container mx-auto px-6 pb-10 z-10">
          <div className="h-px w-full bg-foreground/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              style={{
                width: `${(Math.abs(translateX) / Math.max(1, (trackRef.current?.scrollWidth ?? 1) - window.innerWidth)) * 100}%`,
                transition: "width 0.1s linear",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
