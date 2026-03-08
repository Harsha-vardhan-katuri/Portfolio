import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WireframeGlobe } from "@/components/WireframeGlobe";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const ease = [0.22, 1, 0.36, 1] as const;

export const Hero = ({ introComplete }: { introComplete: boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef as React.RefObject<HTMLElement>);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const textX = -progress * 20;
  const exitProgress = Math.max(0, (progress - 0.7) / 0.3);
  const textExitX = -exitProgress * 60;
  const textOpacity = 1 - exitProgress;
  const textBlur = exitProgress * 6;

  const nameChars = "Harsha Vardhan Katuri".split("");
  const subtitleWords = ["Firmware", "Engineer", "&", "IoT", "Developer"];

  // Base delay for hero animations (after intro completes)
  const baseDelay = introComplete ? 0.1 : 10;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Text content */}
            <div
              className="max-w-2xl space-y-6 z-10"
              style={{
                transform: `translateX(${textX + textExitX}px)`,
                opacity: textOpacity,
                filter: textBlur > 0 ? `blur(${textBlur}px)` : undefined,
              }}
            >
              <motion.p
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={introComplete ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.7, delay: baseDelay, ease }}
                className="text-primary text-lg font-medium tracking-wider uppercase"
              >
                Hi, I'm
              </motion.p>

              {/* Character-by-character name reveal */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {nameChars.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={introComplete ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{
                      duration: 0.6,
                      delay: baseDelay + 0.3 + i * 0.03,
                      ease,
                    }}
                    className="gradient-text-shimmer inline-block"
                    style={{ minWidth: char === " " ? "0.25em" : undefined }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>

              <h2 className="text-2xl md:text-3xl font-semibold text-foreground/80">
                {subtitleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
                    animate={introComplete ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{
                      duration: 0.6,
                      delay: baseDelay + 1.0 + i * 0.08,
                      ease,
                    }}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: baseDelay + 1.5, ease }}
                className="text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                Crafting innovative embedded systems and IoT solutions with expertise in
                C/C++, ESP32, and cutting-edge firmware development.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: baseDelay + 1.8, ease }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground animate-glow-pulse"
                  onClick={() => scrollToSection("contact")}
                >
                  Get In Touch
                  <Mail className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10"
                  onClick={() => scrollToSection("projects")}
                >
                  View Projects
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={introComplete ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: baseDelay + 2.1, ease }}
                className="flex items-center gap-5 pt-4"
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
                    className="p-3 glass-card-hover rounded-full"
                  >
                    <Icon className="h-5 w-5 text-foreground/70 hover:text-primary transition-colors" />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={introComplete ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.5, delay: baseDelay + 0.5, ease }}
              className="hidden lg:block"
            >
              <WireframeGlobe scrollProgress={progress} />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 1 } : {}}
          transition={{ delay: baseDelay + 2.5, duration: 0.6 }}
          onClick={() => scrollToSection("about")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float"
          style={{ opacity: Math.max(0, 1 - progress * 3) }}
        >
          <ArrowDown className="h-6 w-6 text-primary/60" />
        </motion.button>
      </div>
    </section>
  );
};
