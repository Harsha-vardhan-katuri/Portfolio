import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingArc } from "@/components/GlowingArc";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const ease = [0.16, 1, 0.3, 1] as const;

// Split name into individual words for row layout
const nameWords = ["HARSHA", "VARDHAN", "KATURI"];

// Flying directions - each letter from a scattered position
const directions = [
  // HARSHA
  { x: -500, y: -200 }, { x: 300, y: -350 }, { x: -200, y: 400 },
  { x: 450, y: 250 }, { x: -350, y: 300 }, { x: 200, y: -450 },
  // VARDHAN
  { x: -450, y: 150 }, { x: 350, y: -300 }, { x: -150, y: 400 },
  { x: 400, y: -150 }, { x: -300, y: -350 }, { x: 150, y: 450 },
  { x: -400, y: -200 },
  // KATURI
  { x: 350, y: 350 }, { x: -450, y: -150 }, { x: 250, y: 400 },
  { x: -200, y: -400 }, { x: 400, y: 200 }, { x: -350, y: 300 },
];

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

  // Build flat index for directions
  let charIndex = 0;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Glowing arc canvas */}
        <GlowingArc />

        <div
          className="relative z-10 h-full flex flex-col items-center justify-center will-change-transform"
          style={{
            opacity: contentOpacity,
            filter: contentBlur > 0 ? `blur(${contentBlur}px)` : undefined,
            transform: `scale(${contentScale})`,
          }}
        >
          {/* Name - widely spaced letters across full width */}
          <div className="w-full flex flex-col items-center mt-8">
            {nameWords.map((word, wIdx) => {
              const startIdx = charIndex;
              charIndex += word.length;

              return (
                <div
                  key={wIdx}
                  className="flex items-center justify-center"
                  style={{
                    gap: "clamp(12px, 3vw, 50px)",
                    marginBottom: wIdx < nameWords.length - 1 ? "clamp(4px, 1vw, 12px)" : "0",
                  }}
                >
                  {word.split("").map((char, cIdx) => {
                    const globalIdx = startIdx + cIdx;
                    const dir = directions[globalIdx] || { x: 0, y: 0 };

                    return (
                      <motion.span
                        key={cIdx}
                        initial={{
                          opacity: 0,
                          x: dir.x,
                          y: dir.y,
                          filter: "blur(15px)",
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          y: 0,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          duration: 2,
                          delay: 0.3 + globalIdx * 0.08,
                          ease,
                        }}
                        className="font-black font-display text-foreground"
                        style={{
                          fontSize: "clamp(2.5rem, 8vw, 7rem)",
                          letterSpacing: "0.15em",
                          textShadow: "0 0 40px hsl(220 80% 60% / 0.3), 0 0 80px hsl(260 60% 50% / 0.15)",
                          lineHeight: 1,
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease }}
            className="text-center mt-8 mb-8"
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.4rem)",
              letterSpacing: "0.35em",
              color: "hsl(0 0% 60%)",
              fontWeight: 300,
            }}
          >
            FIRMWARE ENGINEER & IOT DEVELOPER
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5, ease }}
            className="flex flex-wrap items-center justify-center gap-4 mb-6"
          >
            <Button
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background rounded-full px-10 py-6 text-base font-semibold"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/20 hover:bg-foreground/10 rounded-full px-10 py-6 text-base"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 2.8, ease }}
            className="flex items-center gap-5"
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
                className="p-3 rounded-full border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300"
              >
                <Icon className="h-5 w-5 text-foreground/50 hover:text-foreground/80 transition-colors" />
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
          <ArrowDown className="h-6 w-6 text-foreground/30" />
        </motion.button>
      </div>
    </section>
  );
};
