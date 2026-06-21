import { Github, Linkedin, Mail, ArrowUpRight, MapPin, FileText } from "lucide-react";
import { useRef, useCallback } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Reveal } from "@/components/RevealText";
import { SOCIAL_LINKS } from "@/lib/links";

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
        <div
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 pt-16 will-change-transform"
          style={{
            opacity,
            transform: `translate3d(0, ${translateY}px, 0)`,
          }}
        >
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
                <span className="sr-only"> — Firmware Engineer</span>
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

          {/* Location chip — sits ABOVE the Get-in-touch button */}
          <Reveal delay={0.85} className="mt-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.3em] text-foreground/70 bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <MapPin className="h-3 w-3 text-primary" />
              Bengaluru, India
            </span>
          </Reveal>

          {/* CTA row */}
          <div className="mt-5 flex items-center gap-3 flex-wrap justify-center">
            <button
              data-magnetic
              onClick={() => scrollToSection("contact")}
              className="group relative px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-semibold inline-flex items-center gap-2 overflow-hidden hover:scale-[1.03] transition-transform duration-300"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:rotate-45 transition-transform duration-300" />
            </button>
            <button
              data-magnetic
              onClick={() => scrollToSection("projects")}
              className="px-5 py-2.5 rounded-full border border-foreground/20 text-xs font-semibold hover:border-primary hover:text-primary transition-colors duration-300"
            >
              See work
            </button>
            <a
              data-magnetic
              href={SOCIAL_LINKS.resumeView}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-primary/40 text-primary text-xs font-semibold inline-flex items-center gap-2 hover:bg-primary/10 transition-colors duration-300"
            >
              <FileText className="h-3.5 w-3.5" />
              Resume
            </a>
          </div>

          {/* Social links */}
          <div className="mt-10 flex items-center gap-3">
            {[
              { icon: Github, href: SOCIAL_LINKS.github, label: "GitHub" },
              { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
              { icon: Mail, href: SOCIAL_LINKS.email, label: "Email" },
            ].map(({ icon: Icon, href, label }, i) => (
              <a
                key={i}
                data-magnetic
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full border border-foreground/10 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
              >
                <Icon className="h-4 w-4 text-foreground/60" />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[10px] uppercase tracking-[0.3em] text-foreground/40"
          style={{ opacity: Math.max(0, 1 - progress * 3) }}
        >
          Scroll to explore
        </div>
      </div>
    </section>
  );
};
