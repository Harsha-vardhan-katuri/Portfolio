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
            <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-foreground/10 to-secondary/40" />

            <div className="space-y-10">
              {education.map((ed, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative pl-12 md:pl-20"
                >
                  <div className="absolute left-4 md:left-6 -translate-x-1/2 top-6">
                    <div className="relative h-4 w-4 rounded-full bg-background border-2 border-primary">
                      <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                    </div>
                  </div>

                  <div
                    data-magnetic
                    className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.07] hover:border-primary/30 transition-all duration-500"
                  >
                    <div className="flex items-start gap-4 flex-wrap">
                      <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-[240px]">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div>
                            <h3 className="font-display font-bold text-lg leading-snug">
                              {ed.title}
                            </h3>
                            <p className="text-primary text-sm font-medium">
                              {ed.institution}
                            </p>
                            <p className="text-xs text-foreground/50">{ed.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-display text-2xl font-black text-foreground/30 leading-none">
                              {ed.year}
                            </p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
                              {ed.period}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 inline-block text-xs px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary">
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
