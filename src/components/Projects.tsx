import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Projects = () => {
  const projects = [
    {
      title: "LoRa-Enabled Soil Health Monitoring System",
      description: "Architected an advanced IoT system using ESP32 and RS485-based sensors to monitor soil parameters (NPK, pH, EC, moisture, temperature) with LoRa wireless transmission over 1km range.",
      technologies: ["ESP32", "RS485", "LoRa", "Modbus RTU", "C/C++", "SPI/UART"],
      highlights: [
        "Decoding latency under 200ms for real-time responsiveness",
        "80% delivery accuracy in field conditions",
        "Compact 50-byte message formatting",
        "Power consumption below 50mA"
      ],
      github: "#"
    },
    {
      title: "IoT Based Weather Reporting System",
      description: "Built a real-time weather monitoring system with DHT11 sensor integration, cloud connectivity via Thing Speak, and LCD display for local visualization.",
      technologies: ["LPC2148", "ESP01", "DHT11", "Thing Speak", "Wi-Fi"],
      highlights: [
        "15-second cloud update intervals",
        "60% faster data retrieval",
        "±2°C temperature accuracy",
        "±5%RH humidity accuracy"
      ],
      github: "#"
    },
    {
      title: "AI-Powered Health Assistant Chatbot",
      description: "Developed an intelligent chatbot using Streamlit and Hugging Face Transformers for health-related conversations with high accuracy and fast response times.",
      technologies: ["Python", "Streamlit", "DistilGPT-2", "Hugging Face", "NLP"],
      highlights: [
        "90% response accuracy",
        "40% improved query classification",
        "35% reduced response time",
        "50% increased user engagement"
      ],
      github: "#"
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="glass-effect rounded-2xl p-6 flex flex-col hover:scale-105 transition-smooth hover:glow-effect"
              >
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-foreground/80 mb-4 flex-grow">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-primary mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-primary/10 border border-primary/30 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-primary mb-2">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                        <span className="text-primary mt-0.5">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-primary/50 hover:bg-primary/10"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-primary/50 hover:bg-primary/10"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
