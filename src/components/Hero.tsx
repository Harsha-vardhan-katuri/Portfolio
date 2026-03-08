import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingArc } from "@/components/GlowingArc";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const ease = [0.16, 1, 0.3, 1] as const;

// Single row of widely spaced letters like ARGUS
const nameChars = "HARSHA VARDHAN KATURI".split("");


export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef as React.RefObject<HTMLElement>);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const exitProgress = Math.max(0, (progress - 0.7) / 0.3);
  const contentOpacity = 1 - exitProgress;
  const contentBlur = exitProgress * 6;
  const contentScale = 1 - exitProgress * 0.05;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Glowing arc canvas behind everything */}
        <GlowingArc />

        <div
          className="relative z-10 h-full flex flex-col items-center justify-center will-change-transform"
          style={{
            opacity: contentOpacity,
            filter: contentBlur > 0 ? `blur(${contentBlur}px)` : undefined,
            transform: `scale(${contentScale})`,
          }}
        >
          {/* Name - single line, widely spaced, positioned in center of arc */}
          <div className="w-full flex justify-center items-center px-4 mb-2" style={{ marginTop: "-2vh" }}>
            <div className="flex items-center justify-center flex-wrap" style={{ gap: "clamp(2px, 0.8vw, 12px)" }}>
              {nameChars.map((char, i) => {
                const isSpace = char === " ";

                return (
                  <motion.span
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 20,
                      filter: "blur(8px)",
                    }}
                    animate={{
                      opacity: isSpace ? 0 : 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + i * 0.07,
                      ease,
                    }}
                    className="font-black font-display text-foreground"
                    style={{
                      fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)",
                      letterSpacing: "0.12em",
                      lineHeight: 1,
                      display: "inline-block",
                      minWidth: isSpace ? "clamp(15px, 3vw, 40px)" : undefined,
                      textShadow: "0 0 30px hsl(230 80% 65% / 0.25), 0 0 60px hsl(260 60% 50% / 0.1)",
                    }}
                  >
                    {isSpace ? "" : char}
                  </motion.span>
                );
              })}
            </div>
          </div>

          {/* Subtitle - widely tracked like "VPN THAT SIMPLY WORKS" */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.0, ease }}
            className="text-center mb-10"
            style={{
              fontSize: "clamp(0.75rem, 1.8vw, 1.25rem)",
              letterSpacing: "0.4em",
              color: "hsl(0 0% 55%)",
              fontWeight: 300,
            }}
          >
            FIRMWARE ENGINEER & IOT DEVELOPER
          </motion.p>

          {/* CTA Button - white pill like "Install ArgusVPN" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.3, ease }}
            className="flex flex-col items-center gap-4 mb-6"
          >
            <Button
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background rounded-full px-12 py-7 text-base font-semibold shadow-xl"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.6 }}
              className="text-sm text-muted-foreground/50"
            >
              Open to collaborations & opportunities
            </motion.span>
          </motion.div>

          {/* Social links row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 2.8, ease }}
            className="flex items-center gap-5 mt-2"
          >
            {[
              { icon: Github, href: "https://github.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Mail, href: "mailto:harsha@example.com" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-foreground/8 hover:border-foreground/25 hover:bg-foreground/5 transition-all duration-300"
              >
                <Icon className="h-4 w-4 text-foreground/40 hover:text-foreground/70 transition-colors" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.6 }}
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10"
          style={{ opacity: Math.max(0, 1 - progress * 3) }}
        >
          <ArrowDown className="h-6 w-6 text-foreground/25" />
        </motion.button>
      </div>
    </section>
  );
};
