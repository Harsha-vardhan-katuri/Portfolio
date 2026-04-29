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
  // Duplicate the list once so the marquee loops seamlessly
  const loop = [...projects, ...projects];

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
            Continuously scrolling · hover to pause.
          </p>
        </div>

        {/* Continuous marquee */}
        <div className="projects-marquee group relative overflow-hidden">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

          <div className="projects-marquee-track flex gap-6 py-4 will-change-transform">
            {loop.map((p, idx) => (
              <article
                key={`${p.num}-${idx}`}
                className="group/card relative shrink-0 w-[85vw] sm:w-[520px] h-[440px] rounded-3xl overflow-hidden bg-white/[0.04] border border-white/10 backdrop-blur-md"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-70`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.18),transparent_60%)]" />

                <div className="relative h-full p-8 md:p-10 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-6xl md:text-7xl font-black text-foreground/15">
                      {p.num}
                    </span>
                    <ArrowUpRight className="h-7 w-7 text-foreground/40 group-hover/card:text-primary group-hover/card:rotate-45 transition-all duration-500" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-2">
                      {p.tag}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 leading-[1.1]">
                      {p.title}
                    </h3>
                    <p className="text-foreground/70 text-sm mb-5 line-clamp-3">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.04] text-foreground/80"
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

        <style>{`
          .projects-marquee-track {
            animation: projects-scroll 50s linear infinite;
          }
          .projects-marquee:hover .projects-marquee-track {
            animation-play-state: paused;
          }
          @keyframes projects-scroll {
            from { transform: translate3d(0, 0, 0); }
            to   { transform: translate3d(-50%, 0, 0); }
          }
        `}</style>
      </div>
    </section>
  );
};
