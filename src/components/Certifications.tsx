import { Award, BadgeCheck, ExternalLink } from "lucide-react";
import { FlyIn } from "@/components/FlyIn";
import { motion } from "framer-motion";
import { ScrollSection } from "@/components/ScrollSection";
import { Button } from "@/components/ui/button";

const certifications = [
  {
    title: "Embedded Systems & Firmware Engineering",
    issuer: "Vector India",
    year: "2024",
    skills: ["C/C++", "Embedded C", "Microcontrollers"],
    link: "#",
  },
  {
    title: "AI Internship — Microsoft & SAP",
    issuer: "Edunet Foundation",
    year: "2025",
    skills: ["Python", "Hugging Face", "DistilGPT-2"],
    link: "#",
  },
  {
    title: "IoT & Cloud Communication",
    issuer: "Self-Certified Project Portfolio",
    year: "2024",
    skills: ["LoRa", "MQTT", "ThingSpeak"],
    link: "#",
  },
  {
    title: "Linux Internals & Device Drivers",
    issuer: "Vector India",
    year: "2023",
    skills: ["Linux", "Kernel", "Drivers"],
    link: "#",
  },
];

export const Certifications = () => {
  return (
    <ScrollSection id="certifications" height="220vh">
      {() => (
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-display gradient-text-shimmer mb-4"
              >
                Certifications
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0 }}
                className="text-lg text-muted-foreground max-w-lg mx-auto"
              >
                Credentials and training that sharpen my edge in embedded systems, firmware, and IoT.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 relative z-10">
              {/* Certification cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 space-y-5"
              >
                <h3 className="text-xl font-bold font-display">Certification Details</h3>
                {certifications.map((c, i) => (
                  <div
                    key={i}
                    className="group relative p-4 rounded-2xl bg-card/20 border border-primary/15 hover:bg-card/30 hover:border-highlight/30 transition-all duration-500 overflow-hidden"
                  >
                    <div className="relative flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h4 className="font-display font-bold text-lg leading-snug">{c.title}</h4>
                          <span className="text-xs text-foreground/50 font-mono shrink-0">{c.year}</span>
                        </div>
                        <p className="text-sm text-highlight mb-3 inline-flex items-center gap-1.5">
                          <BadgeCheck className="h-3.5 w-3.5" />
                          {c.issuer}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {c.skills.map((s) => (
                            <span
                              key={s}
                              className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-foreground/70"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Highlights + action */}
              <div className="space-y-6">
                <FlyIn direction="top-right" className="glass-card p-8 space-y-5">
                  <h3 className="text-xl font-bold font-display">Highlights</h3>
                  {[
                    { label: "Total credentials", value: "4+" },
                    { label: "Core focus", value: "Firmware & Embedded Systems" },
                    { label: "Tools covered", value: "C/C++, Linux, Python, LoRa, MQTT" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-card/20 border border-primary/15">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-semibold">{item.value}</span>
                    </div>
                  ))}
                </FlyIn>

                <FlyIn direction="bottom-right" delay={0.08} className="glass-card p-8">
                  <h3 className="text-xl font-bold font-display mb-4">Validate Credentials</h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    Want to verify a certificate or learn more about the training programs behind these credentials?
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-xl border-white/[0.08] hover:bg-highlight/[0.05] hover:text-highlight"
                  >
                    <a
                      href="https://www.linkedin.com/in/harsha-vardhan-katuri/details/certifications/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on LinkedIn
                    </a>
                  </Button>
                </FlyIn>
              </div>
            </div>
          </div>
        </div>
      )}
    </ScrollSection>
  );
};
