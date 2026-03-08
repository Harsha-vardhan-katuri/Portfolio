import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const ease = [0.16, 1, 0.3, 1] as const;

const nameChars = "HARSHA VARDHAN KATURI".split("");

// Flying directions for each letter (scattered like ARGUS reference)
const getLetterDirection = (i: number) => {
  const directions = [
    { x: -350, y: -150 }, { x: 200, y: -300 }, { x: -100, y: 400 },
    { x: 300, y: 200 }, { x: -250, y: 300 }, { x: 150, y: -400 },
    { x: 0, y: 0 }, // space
    { x: -400, y: 100 }, { x: 250, y: -250 }, { x: -150, y: 350 },
    { x: 350, y: -100 }, { x: -300, y: -300 }, { x: 100, y: 400 },
    { x: -200, y: -200 },
    { x: 0, y: 0 }, // space
    { x: 300, y: 300 }, { x: -350, y: -100 }, { x: 200, y: 350 },
    { x: -100, y: -350 }, { x: 350, y: 150 }, { x: -250, y: 250 },
  ];
  return directions[i] || { x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 400 };
};

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
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div
          className="w-full will-change-transform"
          style={{
            opacity: contentOpacity,
            filter: contentBlur > 0 ? `blur(${contentBlur}px)` : undefined,
            transform: `scale(${contentScale})`,
          }}
        >
          <div className="flex flex-col items-center text-center relative">
            {/* Glowing Ring behind name */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "clamp(300px, 50vw, 550px)",
                height: "clamp(300px, 50vw, 550px)",
                border: "2px solid hsl(199 89% 48% / 0.4)",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1.15 }}
              transition={{ duration: 2.5, ease, delay: 0.1 }}
            >
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: "0 0 80px hsl(199 89% 48% / 0.3), inset 0 0 50px hsl(199 89% 48% / 0.15)",
                }}
              />
              {/* Rotating shimmer / sunlight sweep */}
              <motion.div
                className="absolute inset-[-2px] rounded-full overflow-hidden"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0%, transparent 60%, hsl(199 89% 70% / 0.6) 75%, hsl(199 89% 90% / 0.9) 80%, hsl(199 89% 70% / 0.6) 85%, transparent 100%)",
                    filter: "blur(4px)",
                  }}
                />
              </motion.div>
              {/* Inner ring glow pulse */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 40px hsl(199 89% 48% / 0.2), inset 0 0 30px hsl(199 89% 48% / 0.1)",
                    "0 0 80px hsl(199 89% 48% / 0.4), inset 0 0 50px hsl(199 89% 48% / 0.2)",
                    "0 0 40px hsl(199 89% 48% / 0.2), inset 0 0 30px hsl(199 89% 48% / 0.1)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* "Hi, I'm" label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.2, ease }}
              className="text-primary text-lg font-medium tracking-wider uppercase mb-4 relative z-10"
            >
              Hi, I'm
            </motion.p>

            {/* Flying letters - full name */}
            <div className="relative z-10 flex flex-wrap justify-center px-4 mb-4" style={{ maxWidth: "900px" }}>
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{
                    opacity: 0,
                    x: getLetterDirection(i).x,
                    y: getLetterDirection(i).y,
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
                    delay: 0.2 + i * 0.06,
                    ease,
                  }}
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-display gradient-text-shimmer"
                  style={{
                    display: "inline-block",
                    minWidth: char === " " ? "0.3em" : undefined,
                    lineHeight: 1.1,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 2.0, ease }}
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground/70 mb-6 relative z-10"
            >
              Firmware Engineer & IoT Developer
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.4, ease }}
              className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-8 relative z-10 px-4"
            >
              Crafting innovative embedded systems and IoT solutions with expertise in
              C/C++, ESP32, and cutting-edge firmware development.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.6, ease }}
              className="flex flex-wrap items-center justify-center gap-4 mb-6 relative z-10"
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

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 2.8, ease }}
              className="flex items-center gap-5 relative z-10"
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
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.6 }}
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
