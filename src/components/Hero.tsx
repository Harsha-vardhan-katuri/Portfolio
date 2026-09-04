import { Github, Linkedin, Mail, ArrowUpRight, MapPin, FileText } from "lucide-react";
import { useRef, useCallback } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Reveal } from "@/components/RevealText";
import { SOCIAL_LINKS } from "@/lib/links";
import { ParticleText } from "@/components/ParticleText";

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
          {/* Name — particle text that gathers into place and repels the pointer */}
          <h1 className="sr-only">Harsha Vardhan Katuri — Firmware Engineer</h1>
          <div className="w-full max-w-3xl h-[clamp(100px,19vw,205px)]" aria-hidden>
            <ParticleText
              lines={["HARSHA VARDHAN", "KATURI"]}
              particleSize={1.8}
              density={4}
              color="#f1f0fa"
              highlightColor="#a78bfa"
              scatter={140}
              gatherDuration={1800}
              stagger={500}
              pointerRepel={42}
              repelRadius={120}
              idleDrift={0.8}
              fontSize={110}
              fontWeight={700}
              className="w-full h-full"
            />
          </div>

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
