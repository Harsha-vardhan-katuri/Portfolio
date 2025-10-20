export const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["C", "C++", "Embedded C", "Python", "Data Structures"]
    },
    {
      title: "Embedded Systems",
      skills: ["Microcontroller Architectures", "Hardware Interfacing", "Linux Internals", "Network Protocols", "Device Drivers"]
    },
    {
      title: "System on Chips (SoCs)",
      skills: ["ESP32", "ESP8266", "LPC2148", "Arduino"]
    },
    {
      title: "Communication Protocols",
      skills: ["UART", "I2C", "SPI", "RS485", "LoRa", "MQTT", "Modbus RTU"]
    },
    {
      title: "Tools & Platforms",
      skills: ["Keil IDE", "Arduino IDE", "VS Code", "Git/GitHub/GitLab", "Ubuntu", "MATLAB"]
    },
    {
      title: "IoT & AI",
      skills: ["Sensor Integration", "Cloud IoT", "Thing Speak", "Streamlit", "Hugging Face Transformers"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Skills & Expertise
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="glass-effect rounded-2xl p-6 hover:scale-105 transition-smooth hover:glow-effect"
              >
                <h3 className="text-xl font-bold mb-4 text-primary">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-smooth"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
