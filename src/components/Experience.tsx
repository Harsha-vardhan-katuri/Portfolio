import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollSection } from "@/components/ScrollSection";

export const Experience = () => {
  const experiences = [
    { type: "work", title: "Firmware Engineer", company: "HealthCubed India Private Limited", location: "Bengaluru", period: "February 2025 – Present", description: ["Architecting LoRa-enabled soil health monitoring system with ESP32", "Integrating RS485-based 7-in-1 sensors for NPK, pH, EC, moisture monitoring", "Configuring UART, I2C, SPI, and RS485 protocols", "Contributing to HealthCube HCXL's production-grade firmware"] },
    { type: "work", title: "AI Internship", company: "Edunet Foundation (Microsoft & SAP Program)", location: "Remote", period: "December 2024 – January 2025", description: ["Developed AI-powered Health Assistant Chatbot with 90% accuracy", "Implemented rule-based keyword matching, improving accuracy by 40%", "Integrated DistilGPT-2, reducing response time by 35%", "Increased user engagement by 50%"] },
    { type: "training", title: "Embedded Systems Trainee", company: "Vector India", location: "Hyderabad", period: "July 2023 – April 2024", description: ["Completed 6+ hands-on projects in C, C++, and Embedded C", "Mastered microcontroller architectures and hardware interfacing", "Gained expertise in Linux internals and device drivers", "Worked with ESP8266, LPC2148, Keil IDE, and Ubuntu"] },
    { type: "education", title: "B.Tech in ECE", company: "Gudlavalleru Engineering College", location: "Andhra Pradesh", period: "August 2019 – May 2023", description: ["CGPA: 8.36", "Focused on embedded systems, microcontrollers, and IoT", "Multiple projects in firmware and hardware development"] },
  ];

  return (
    <ScrollSection id="experience" height="250vh">
      {() => (
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-display gradient-text-shimmer mb-4"
              >
                Experience & Education
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="h-0.5 bg-gradient-to-r from-primary to-secondary"
              />
            </div>

            <div className="relative">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary/40 via-secondary/20 to-primary/40"
              />

              <div className="space-y-10">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex items-start gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="absolute left-8 md:left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-primary z-10"
                      style={{ boxShadow: "0 0 24px hsl(199 89% 48% / 0.5)" }}
                    />

                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 ml-20 md:ml-0" : "md:pl-12 ml-20 md:ml-0"}`}>
                      <div className="glass-card-hover p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-2.5 glass-card rounded-xl">
                            {exp.type === "education" ? (
                              <GraduationCap className="h-5 w-5 text-primary" />
                            ) : (
                              <Briefcase className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold font-display">{exp.title}</h3>
                            <p className="text-primary text-sm font-semibold">{exp.company}</p>
                            <p className="text-xs text-muted-foreground">{exp.location} • {exp.period}</p>
                          </div>
                        </div>
                        <ul className="space-y-1.5">
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground/65">
                              <span className="text-primary mt-1">▹</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </ScrollSection>
  );
};
