import { motion } from "framer-motion";
import { ScrollSection } from "@/components/ScrollSection";

export const Skills = () => {
  const skillCategories = [
    { title: "Programming Languages", skills: ["C", "C++", "Embedded C", "Python", "Data Structures"] },
    { title: "Embedded Systems", skills: ["Microcontroller Architectures", "Hardware Interfacing", "Linux Internals", "Network Protocols", "Device Drivers"] },
    { title: "System on Chips", skills: ["ESP32", "ESP8266", "LPC2148", "Arduino"] },
    { title: "Communication Protocols", skills: ["UART", "I2C", "SPI", "RS485", "LoRa", "MQTT", "Modbus RTU"] },
    { title: "Tools & Platforms", skills: ["Keil IDE", "Arduino IDE", "VS Code", "Git/GitHub/GitLab", "Ubuntu", "MATLAB"] },
    { title: "IoT & AI", skills: ["Sensor Integration", "Cloud IoT", "Thing Speak", "Streamlit", "Hugging Face Transformers"] },
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
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-display gradient-text-shimmer mb-4"
              >
                Skills & Expertise
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="h-0.5 bg-gradient-to-r from-primary to-secondary"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="glass-card-hover p-6 group"
                >
                  <h3 className="text-lg font-bold font-display text-primary mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-sm bg-primary/5 border border-primary/10 rounded-lg text-foreground/60 hover:bg-primary/15 hover:text-foreground hover:border-primary/30 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
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
