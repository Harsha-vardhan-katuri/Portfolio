import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Project = {
  num: string;
  title: string;
  tag: string;
  description: string;
  technologies: string[];
  color: string;
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    num: "01",
    title: "Multi-Parameter Medical Device Firmware",
    tag: "Embedded C · RTOS",
    description:
      "Modular embedded firmware in C for SPO2, Lipid, WBC, and HbA1c on a multi-threaded POSIX pthread system. Debugged thread interactions and hardware signals using logic analyzer and oscilloscope.",
    technologies: ["Embedded C", "pthreads", "UART", "USB", "Ethernet"],
    color: "from-cyan-500/30 via-blue-600/20 to-transparent",
    github: "https://github.com/Harsha-vardhan-katuri/HC_FW_Code",
  },
  {
    num: "02",
    title: "Modular BLE Advertisement Analysis Framework",
    tag: "Embedded C · BLE",
    description:
      "Architected a modular BLE advertisement analysis framework in Embedded C, supporting four packet categories and extracting three-axis accelerometer data for motion classification. Incorporated packet validation, logging, and fault handling mechanisms, improving decoding reliability across valid, corrupted, and malformed packet scenarios. Automated build verification, unit testing, and API documentation using GitHub Actions, Makefile, and Doxygen, achieving 100% successful CI pipeline execution.",
    technologies: ["Embedded C", "BLE", "GitHub Actions", "Makefile", "Doxygen"],
    color: "from-sky-500/30 via-cyan-600/20 to-transparent",
  },
  {
    num: "03",
    title: "GSR-Based Stress Monitoring System",
    tag: "ESP32 · Bio-Signals",
    description:
      "Real-time GSR pipeline on ESP32 with ADC sampling at 10–20 Hz, extracting tonic (SCL) and phasic (SCR) components to classify Calm, Normal, and Stress states with <1s latency.",
    technologies: ["ESP32", "Grove GSR", "ADC", "DSP"],
    color: "from-violet-500/30 via-purple-600/20 to-transparent",
    github: "https://github.com/Harsha-vardhan-katuri/GSR-Sensor-Project",
  },
  {
    num: "04",
    title: "LoRa Soil Health Monitoring",
    tag: "IoT · LoRa · RS485",
    description:
      "ESP32 reading NPK, pH, EC, moisture, and temperature via RS485 Modbus RTU, paired with SPI-based LoRa achieving 1 km range and compact 50-byte payloads for remote monitoring.",
    technologies: ["ESP32", "RS485", "LoRa", "Modbus RTU"],
    color: "from-fuchsia-500/30 via-pink-600/20 to-transparent",
    github: "https://github.com/Harsha-vardhan-katuri/Soil-Sensor-Project",
  },
  {
    num: "05",
    title: "AI Health Chatbot",
    tag: "AI · NLP · Streamlit",
    description:
      "Health assistant chatbot using Streamlit and Hugging Face Transformers with rule-based intent matching plus DistilGPT-2 fallback, reaching 85% response relevance and <2s latency.",
    technologies: ["Python", "Streamlit", "DistilGPT-2", "NLTK"],
    color: "from-emerald-500/30 via-teal-600/20 to-transparent",
    github: "https://github.com/Harsha-vardhan-katuri/AI_Chat_Bot",
    demo: "https://aichatbot-scmfkmwqvmvzdj9ayyzp8c.streamlit.app/",
  },
  {
    num: "06",
    title: "Image Projector Firmware",
    tag: "Embedded · Packet Parsing",
    description:
      "Embedded firmware in C for a toy projector that validates packet headers, performs chunk-based image extraction, and reconstructs frames from streamed byte data with controlled rendering.",
    technologies: ["C", "Embedded", "Packet Parsing", "Memory"],
    color: "from-indigo-500/30 via-blue-600/20 to-transparent",
    github: "https://github.com/Harsha-vardhan-katuri/Image_Projector_Firmware",
  },
  {
    num: "07",
    title: "Bare Metal GPIO Controller",
    tag: "Bare-Metal · GPIO",
    description:
      "Register-level embedded firmware (DDRB, PORTB, PINB) controlling LED patterns from a debounced push-button input with finite-state logic to minimize false triggers.",
    technologies: ["Embedded C", "GPIO", "Debouncing", "AVR"],
    color: "from-amber-500/25 via-orange-600/20 to-transparent",
    github: "https://github.com/Harsha-vardhan-katuri/Button_Controlled_LEDs",
    demo: "https://wokwi.com/projects/419441645494336513",
  },
  {
    num: "08",
    title: "Voice-Based Home Automation",
    tag: "IBM Cloud · IoT",
    description:
      "Voice-controlled home automation using IBM Watson Assistant with Speech-to-Text and Text-to-Speech, orchestrated via Node-RED flows for hands-free appliance control.",
    technologies: ["IBM Watson", "Node-RED", "STT/TTS", "Python"],
    color: "from-rose-500/30 via-pink-600/20 to-transparent",
  },
  {
    num: "09",
    title: "OTP-Based Smart Wireless Lock",
    tag: "Arduino · Bluetooth",
    description:
      "Smart locking system on Arduino UNO with HC-05 Bluetooth and an MIT App Inventor Android app generating and validating OTPs to actuate a servo-driven lock mechanism.",
    technologies: ["Arduino", "HC-05", "Servo", "Embedded C"],
    color: "from-purple-500/30 via-violet-600/20 to-transparent",
  },
];

export const HorizontalProjects = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const RESUME_DELAY = 13000; // 13s pause after clicking a dot

  // Continuous, seamless auto-scroll with rAF.
  // We render the project list twice; when the scrollLeft reaches the end of
  // the first copy, we wrap by subtracting that width — the visual is unbroken.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Start at the very beginning (project 01).
    track.scrollLeft = 0;

    const SPEED = 60; // pixels per second
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      // Width of one full set of cards (first copy).
      const loopWidth = track.scrollWidth / 2;

      if (!pausedRef.current) {
        track.scrollLeft += SPEED * dt;
      }

      // Seamless wrap-around.
      if (loopWidth > 0 && track.scrollLeft >= loopWidth) {
        track.scrollLeft -= loopWidth;
      } else if (track.scrollLeft < 0) {
        track.scrollLeft += loopWidth;
      }

      // Update active dot based on which card is closest to viewport center.
      const center = track.scrollLeft + track.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < projects.length; i++) {
        const c = cardRefs.current[i];
        if (!c) continue;
        const cCenter = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(cCenter - center);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      setActive(bestIdx);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame((t) => {
      last = t;
      tick(t);
    });

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (resumeTimeoutRef.current !== null) window.clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current !== null) window.clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const jumpTo = (idx: number) => {
    const card = cardRefs.current[idx];
    const track = trackRef.current;
    if (!card || !track) return;

    // Pause auto-scroll, then resume after 13 seconds.
    setPaused(true);
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimeoutRef.current = null;
    }, RESUME_DELAY);

    const loopWidth = track.scrollWidth / 2;
    let target = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    // Normalize into [0, loopWidth).
    if (loopWidth > 0) {
      target = ((target % loopWidth) + loopWidth) % loopWidth;
      // Pick the shorter direction by optionally using the duplicated card.
      const current = track.scrollLeft;
      const forward = (target - current + loopWidth) % loopWidth;
      const backward = loopWidth - forward;
      if (backward < forward) target = current - backward;
      else target = current + forward;
    }
    // Instant snap — no easing, no stuck states.
    track.scrollLeft = target;
  };

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
            Auto-scrolling · hover to pause · click a dot to jump.
          </p>
        </div>

        <div
          className="projects-marquee relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background/60 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background/60 to-transparent" />

          <div
            ref={trackRef}
            className="flex gap-6 py-4 overflow-x-auto no-scrollbar"
          >
            {[...projects, ...projects].map((p, i) => {
              const idx = i % projects.length;
              const isFirstCopy = i < projects.length;
              return (
              <article
                key={`${p.num}-${i}`}
                ref={(el) => {
                  if (isFirstCopy) cardRefs.current[idx] = el;
                }}
                className="group/card relative shrink-0 w-[85vw] sm:w-[520px] h-[440px] rounded-3xl overflow-hidden bg-white/[0.015] border border-white/[0.08] backdrop-blur-[6px] shadow-[0_20px_60px_hsl(265_60%_5%/0.35)]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-25`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.10),transparent_60%)]" />

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
                          className="text-[11px] px-2.5 py-1 rounded-full border border-white/[0.12] bg-white/[0.02] backdrop-blur-[4px] text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {p.github && (
                        <a
                          data-magnetic
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors"
                        >
                          <Github className="h-4 w-4" /> Code
                        </a>
                      )}
                      {p.demo && (
                        <a
                          data-magnetic
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>

        {/* Dot navigation */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {projects.map((p, idx) => (
            <button
              key={p.num}
              data-magnetic
              onClick={() => jumpTo(idx)}
              aria-label={`Go to project ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                active === idx
                  ? "w-8 h-2.5 bg-primary shadow-[0_0_12px_hsl(var(--primary))]"
                  : "w-2.5 h-2.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </section>
  );
};
