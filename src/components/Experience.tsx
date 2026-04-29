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
    description: [
      "Architecting LoRa-enabled soil health monitoring system with ESP32",
      "Integrating RS485-based 7-in-1 sensors for NPK, pH, EC, moisture",
      "Configuring UART, I2C, SPI, and RS485 protocols",
      "Contributing to HealthCube HCXL's production-grade firmware",
    ],
  },
  {
    type: "work",
    title: "AI Internship",
    company: "Edunet Foundation (Microsoft & SAP)",
    location: "Remote",
    period: "Dec 2024 — Jan 2025",
    year: "2024",
    description: [
      "Developed AI Health Assistant Chatbot with 90% accuracy",
      "Implemented rule-based keyword matching (+40% accuracy)",
      "Integrated DistilGPT-2, reducing response time by 35%",
      "Increased user engagement by 50%",
    ],
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
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-foreground/10 to-secondary/40" />

            <div className="space-y-16">
              {experiences.map((exp, i) => {
                const Icon = iconFor(exp.type);
                const left = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
                    <div className={`${left ? "md:pr-12 md:text-right" : "md:order-2 md:pl-12"}`}>
                      <div
                        data-magnetic
                        className="group p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.07] hover:border-primary/30 transition-all duration-500"
                      >
                        <div className={`flex items-start gap-3 mb-3 ${left ? "md:flex-row-reverse" : ""}`}>
                          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className={`flex-1 ${left ? "md:text-right" : ""}`}>
                            <h3 className="text-lg font-bold font-display">{exp.title}</h3>
                            <p className="text-primary text-sm font-medium">{exp.company}</p>
                            <p className="text-xs text-foreground/50">{exp.location}</p>
                          </div>
                        </div>
                        <ul className={`space-y-1.5 ${left ? "md:text-right" : ""}`}>
                          {exp.description.map((d, k) => (
                            <li key={k} className="text-sm text-foreground/70">
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Year */}
                    <div className={`${left ? "md:order-2 md:pl-12" : "md:pr-12 md:text-right"}`}>
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
