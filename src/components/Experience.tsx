import { Briefcase, GraduationCap } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      type: "work",
      title: "Firmware Engineer",
      company: "HealthCubed India Private Limited",
      location: "Bengaluru",
      period: "February 2025 – Present",
      description: [
        "Architecting LoRa-enabled soil health monitoring system with ESP32",
        "Integrating RS485-based 7-in-1 sensors for NPK, pH, EC, moisture monitoring",
        "Configuring UART, I2C, SPI, and RS485 protocols for robust communication",
        "Contributing to HealthCube HCXL's production-grade firmware"
      ]
    },
    {
      type: "work",
      title: "AI Internship",
      company: "Edunet Foundation (Microsoft & SAP Program)",
      location: "Remote",
      period: "December 2024 – January 2025",
      description: [
        "Developed AI-powered Health Assistant Chatbot with 90% accuracy",
        "Implemented rule-based keyword matching, improving accuracy by 40%",
        "Integrated DistilGPT-2, reducing response time by 35%",
        "Increased user engagement by 50% through enhanced interaction"
      ]
    },
    {
      type: "training",
      title: "Embedded Systems Trainee",
      company: "Vector India",
      location: "Hyderabad",
      period: "July 2023 – April 2024",
      description: [
        "Completed 6+ hands-on projects in C, C++, and Embedded C",
        "Mastered microcontroller architectures and hardware interfacing",
        "Gained expertise in Linux internals, device drivers, and networking",
        "Worked with ESP8266, LPC2148, Keil IDE, and Ubuntu"
      ]
    },
    {
      type: "education",
      title: "B.Tech in Electronics and Communication Engineering",
      company: "Gudlavalleru Engineering College",
      location: "Andhra Pradesh",
      period: "August 2019 – May 2023",
      description: [
        "CGPA: 8.36",
        "Focused on embedded systems, microcontrollers, and IoT",
        "Completed multiple projects in firmware and hardware development"
      ]
    }
  ];

  return (
    <section id="experience" className="min-h-screen flex items-center py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Experience & Education
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-primary glow-effect z-10"></div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 ml-20 md:ml-0" : "md:pl-12 ml-20 md:ml-0"}`}>
                    <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-smooth hover:glow-effect">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 glass-effect rounded-lg">
                          {exp.type === "education" ? (
                            <GraduationCap className="h-6 w-6 text-primary" />
                          ) : (
                            <Briefcase className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                          <p className="text-primary font-semibold">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.location} • {exp.period}</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-foreground/80">
                            <span className="text-primary mt-1.5">▹</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
