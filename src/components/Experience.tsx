import { Briefcase, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    type: "work",
    title: "Firmware Engineer",
    company: "HealthCubed India Pvt. Ltd.",
    location: "Bengaluru",
    period: "Feb 2025 — Present",
    year: "2025",
    description:
      "Worked on Embedded Linux firmware for a multi-parameter medical diagnostic platform, delivering feature enhancements, optimizing device communication, and improving system performance. Additionally, developed an Android application for portable, real-time soil parameter monitoring through binary packet decoding.",
  },
  {
    type: "work",
    title: "AI Internship",
    company: "Edunet Foundation (Microsoft & SAP)",
    location: "Remote",
    period: "Dec 2024 — Jan 2025",
    year: "2024",
    description:
      "Created an AI-powered health assistant that leverages Natural Language Processing and transformer models to understand user queries and generate meaningful responses. Optimized for response quality, low latency, and an intuitive web-based user experience.",
  },
  {
    type: "training",
    title: "Embedded Systems Trainee",
    company: "Vector India",
    location: "Hyderabad",
    period: "Jul 2023 — Apr 2024",
    year: "2023",
    description: [
      "Completed 6+ hands-on projects in C, C++, Embedded C",
      "Mastered microcontroller architectures and HW interfacing",
      "Gained expertise in Linux internals and device drivers",
      "Worked with ESP8266, LPC2148, Keil IDE, Ubuntu",
    ],
  },
];

const iconFor = (type: string) =>
  type === "training" ? Sparkles : Briefcase;

export const Experience = () => {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-primary/70 mb-3">
              — Journey
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight">
              Experience.
            </h2>
            <div className="h-0.5 w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-foreground/10 to-secondary/40" />

            <div className="space-y-10 md:space-y-16">
              {experiences.map((exp, i) => {
                const Icon = iconFor(exp.type);
                const left = i % 2 === 0; // even -> details on LEFT, year on RIGHT
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: left ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Node */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10">
                      <div className="relative h-5 w-5 rounded-full bg-background border-2 border-primary">
                        <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                      </div>
                    </div>

                    {/* Details */}
                    <div className={left ? "md:pr-12" : "md:order-2 md:pl-12"}>
                      <div className="group p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-md hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-500">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold font-display">{exp.title}</h3>
                            <p className="text-primary text-sm font-medium">{exp.company}</p>
                            <p className="text-xs text-foreground/50">{exp.location}</p>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>

                    {/* Year */}
                    <div className={`hidden md:block ${left ? "md:pl-12" : "md:order-1 md:pr-12 md:text-right"}`}>
                      <div className="font-display text-5xl md:text-7xl font-black text-foreground/15 leading-none">
                        {exp.year}
                      </div>
                      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-foreground/50">
                        {exp.period}
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
