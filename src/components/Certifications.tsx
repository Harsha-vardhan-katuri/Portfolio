import { Award, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const certifications = [
  {
    title: "Embedded Systems & Firmware Engineering",
    issuer: "Vector India",
    year: "2024",
    skills: ["C/C++", "Embedded C", "Microcontrollers"],
  },
  {
    title: "AI Internship — Microsoft & SAP",
    issuer: "Edunet Foundation",
    year: "2025",
    skills: ["Python", "Hugging Face", "DistilGPT-2"],
  },
  {
    title: "IoT & Cloud Communication",
    issuer: "Self-Certified Project Portfolio",
    year: "2024",
    skills: ["LoRa", "MQTT", "ThingSpeak"],
  },
  {
    title: "Linux Internals & Device Drivers",
    issuer: "Vector India",
    year: "2023",
    skills: ["Linux", "Kernel", "Drivers"],
  },
];

export const Certifications = () => {
  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-primary/70 mb-3">
              — Credentials
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight">
              Certifications.
            </h2>
            <div className="h-0.5 w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {certifications.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-md hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-display font-bold text-lg leading-snug">{c.title}</h3>
                      <span className="text-xs text-foreground/50 font-mono shrink-0">{c.year}</span>
                    </div>
                    <p className="text-sm text-primary/90 mb-4 inline-flex items-center gap-1.5">
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
