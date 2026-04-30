import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const education = [
  {
    title: "B.Tech in Electronics & Communication Engineering",
    institution: "Gudlavalleru Engineering College",
    location: "Andhra Pradesh, India",
    period: "Aug 2019 — May 2023",
    year: "2023",
    score: "CGPA · 8.36 / 10",
    highlights: [
      "Specialised in embedded systems, microcontrollers and IoT",
      "Multiple firmware and hardware capstone projects",
      "Active in electronics and robotics clubs",
    ],
  },
  {
    title: "Intermediate (MPC)",
    institution: "Sri Chaitanya Junior College",
    location: "Andhra Pradesh, India",
    period: "2017 — 2019",
    year: "2019",
    score: "Percentage · 92%",
    highlights: ["Mathematics, Physics and Chemistry stream"],
  },
];

export const Education = () => {
  return (
    <section id="education" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-primary/70 mb-3">
              — Academics
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight">
              Education.
            </h2>
            <div className="h-0.5 w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
          </div>

          <div className="relative">
            {/* center vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-foreground/10 to-secondary/40" />

            <div className="space-y-16">
              {education.map((ed, i) => {
                const left = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: left ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10">
                      <div className="relative h-5 w-5 rounded-full bg-background border-2 border-primary">
                        <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                      </div>
                    </div>

                    {/* Details */}
                    <div className={left ? "md:pr-12" : "md:order-2 md:pl-12"}>
                      <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-md hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-500">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                            <GraduationCap className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display font-bold text-lg leading-snug">
                              {ed.title}
                            </h3>
                            <p className="text-primary text-sm font-medium">{ed.institution}</p>
                            <p className="text-xs text-foreground/50">{ed.location}</p>
                          </div>
                        </div>
                        <p className="mt-1 inline-block text-xs px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary">
                          {ed.score}
                        </p>
                        <ul className="mt-4 space-y-1.5">
                          {ed.highlights.map((h, k) => (
                            <li key={k} className="text-sm text-foreground/70">
                              • {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Year */}
                    <div className={left ? "md:pl-12" : "md:order-1 md:pr-12 md:text-right"}>
                      <div className="font-display text-5xl md:text-7xl font-black text-foreground/15 leading-none">
                        {ed.year}
                      </div>
                      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-foreground/50">
                        {ed.period}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
