import { motion } from "framer-motion";
import { ScrollSection } from "@/components/ScrollSection";

export const Skills = () => {
  const skillCategories: { title: string; skills: { name: string; level: number }[] }[] = [
    {
      title: "Programming Languages",
      skills: [
        { name: "C / Embedded C", level: 94 },
        { name: "C++", level: 88 },
        { name: "Python", level: 86 },
        { name: "Basic Assembly", level: 72 },
      ],
    },
    {
      title: "Embedded Firmware & Platform",
      skills: [
        { name: "Embedded Linux", level: 88 },
        { name: "Register Level Programming", level: 90 },
        { name: "State Machines / U-Boot", level: 84 },
        { name: "HAL / Build Automation", level: 82 },
      ],
    },
    {
      title: "Communication Protocols",
      skills: [
        { name: "UART / SPI / I2C", level: 94 },
        { name: "RS485 / Modbus RTU", level: 86 },
        { name: "BLE / LoRa", level: 82 },
        { name: "Ethernet / USB", level: 80 },
      ],
    },
    {
      title: "Hardware Validation & Interfacing",
      skills: [
        { name: "GPIO / Sensor Interfacing", level: 92 },
        { name: "Interrupts / Board Bring-up", level: 86 },
        { name: "Packet Parsing / Protocol Analysis", level: 84 },
        { name: "Logic Analyzer / Oscilloscope", level: 80 },
      ],
    },
    {
      title: "System on Chips & Platforms",
      skills: [
        { name: "ESP32", level: 92 },
        { name: "ESP8266", level: 86 },
        { name: "LPC2148", level: 82 },
        { name: "TI AM335x", level: 78 },
      ],
    },
    {
      title: "Tools & Environment",
      skills: [
        { name: "Git / GitHub", level: 90 },
        { name: "CI/CD / GitHub Actions", level: 85 },
        { name: "VS Code / Eclipse", level: 88 },
        { name: "Makefile / Doxygen", level: 82 },
        { name: "Ubuntu / Unit Testing", level: 80 },
      ],
    },
  ];

  return (
    <ScrollSection id="skills">
      {() => (
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-display gradient-text-shimmer mb-4"
              >
                Skills & Expertise
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0}}
                className="h-0.5 bg-gradient-to-r from-primary to-secondary"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card-hover p-6 group"
                >
                  <h3 className="text-base font-bold font-display text-primary mb-5 tracking-wide">
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-foreground/80">{skill.name}</span>
                          <span className="text-foreground/50 font-mono tabular-nums">{skill.level}%</span>
                        </div>
                        <div className="h-1 w-full rounded-full bg-white/[0.05] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-secondary shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ScrollSection>
  );
};
