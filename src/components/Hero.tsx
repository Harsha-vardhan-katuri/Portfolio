import { useRef, useCallback } from "react";
import { ArrowDown, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { ShaderHero } from "@/components/ShaderHero";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Reveal } from "@/components/RevealText";

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef as React.RefObject<HTMLElement>);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const exitProgress = Math.max(0, (progress - 0.6) / 0.4);
  const opacity = 1 - exitProgress;
  const translateY = exitProgress * -80;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative"
      style={{ height: "180vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <ShaderHero />

        {/* Top label bar */}
        <div className="absolute top-20 left-0 right-0 z-10 px-8 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-foreground/40">
          <span>Bengaluru, IN</span>
          <span className="hidden md:inline">Available for work — 2026</span>
          <span>v 2.0</span>
        </div>

        <div
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 pt-16 will-change-transform"
          style={{
            opacity,
            transform: `translate3d(0, ${translateY}px, 0)`,
          }}
        >
          {/* Eyebrow */}
          <Reveal delay={0.1} className="mb-8">
            <span className="text-xs uppercase tracking-[0.5em] text-primary font-medium">
              Firmware Engineer · IoT Developer
            </span>
          </Reveal>

          {/* Name — clean, professional, single weight, single colour */}
          <h1 className="text-center font-display font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
            <Reveal delay={0.2} block className="w-full">
              <span className="block text-[clamp(2.5rem,7.5vw,7rem)]">
                Harsha Vardhan
              </span>
            </Reveal>
            <Reveal delay={0.35} block className="w-full">
              <span className="block text-[clamp(2.5rem,7.5vw,7rem)]">
                Katuri
              </span>
            </Reveal>
          </h1>

          {/* Accent underline */}
          <Reveal delay={0.55} className="mt-8">
            <span className="block h-[3px] w-24 bg-primary rounded-full" />
          </Reveal>

          {/* Subtitle */}
          <Reveal delay={0.7} block className="mt-6 max-w-2xl">
            <p className="text-center text-base md:text-lg text-foreground/70 px-4 leading-relaxed">
              Engineering production-grade firmware for embedded, IoT and AI-enabled systems. Based in Bengaluru, India.
            </p>
          </Reveal>

          {/* CTA row */}
          <div className="mt-12 flex items-center gap-4 flex-wrap justify-center">
            <button
              data-magnetic
              onClick={() => scrollToSection("contact")}
              className="group relative px-8 py-4 rounded-full bg-foreground text-background text-sm font-semibold inline-flex items-center gap-3 overflow-hidden hover:scale-[1.03] transition-transform duration-300"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" />
            </button>
            <button
              data-magnetic
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 rounded-full border border-foreground/20 text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-300"
            >
              See work
            </button>
          </div>

          {/* Social links */}
          <div className="mt-10 flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Mail, href: "mailto:harsha@example.com" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                data-magnetic
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-foreground/10 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
              >
                <Icon className="h-4 w-4 text-foreground/60" />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-foreground/40 hover:text-foreground transition-colors"
          style={{ opacity: Math.max(0, 1 - progress * 3) }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
