import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ScrollSection } from "@/components/ScrollSection";

export const Projects = () => {
  const projects = [
    {
      title: "LoRa-Enabled Soil Health Monitoring System",
      description: "Architected an advanced IoT system using ESP32 and RS485-based sensors to monitor soil parameters with LoRa wireless transmission over 1km range.",
      technologies: ["ESP32", "RS485", "LoRa", "Modbus RTU", "C/C++"],
      highlights: ["Decoding latency under 200ms", "80% delivery accuracy", "Power consumption below 50mA"],
      github: "#"
    },
    {
      title: "IoT Based Weather Reporting System",
      description: "Built a real-time weather monitoring system with DHT11 sensor integration, cloud connectivity via Thing Speak.",
      technologies: ["LPC2148", "ESP01", "DHT11", "Thing Speak", "Wi-Fi"],
      highlights: ["15-second cloud update intervals", "60% faster data retrieval", "±2°C accuracy"],
      github: "#"
    },
    {
      title: "AI-Powered Health Assistant Chatbot",
      description: "Developed an intelligent chatbot using Streamlit and Hugging Face Transformers for health-related conversations.",
      technologies: ["Python", "Streamlit", "DistilGPT-2", "Hugging Face"],
      highlights: ["90% response accuracy", "35% reduced response time", "50% increased engagement"],
      github: "#"
    }
  ];

  return (
    <ScrollSection id="projects" height="250vh">
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
                Featured Projects
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="h-0.5 bg-gradient-to-r from-primary to-secondary"
              />
            </div>

            <div className="space-y-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="glass-card-hover p-8 md:p-10 group relative overflow-hidden"
                >
                  {/* Animated border glow on hover */}
                  <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, hsl(199 89% 48% / 0.1), transparent 50%, hsl(260 60% 55% / 0.1))",
                    }}
                  />

                  <div className="grid md:grid-cols-[1fr_auto] gap-8 relative z-10">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold font-display mb-3">{project.title}</h3>
                      <p className="text-foreground/65 mb-5 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1 text-xs bg-primary/5 border border-primary/10 rounded-full text-primary/70">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <ul className="space-y-1.5">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground/55">
                            <span className="text-primary mt-0.5">▹</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex md:flex-col gap-3 self-end">
                      <Button variant="outline" size="sm" className="border-primary/15 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" /> Code
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="border-primary/15 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                        <ExternalLink className="h-4 w-4 mr-2" /> Demo
                      </Button>
                    </div>
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
