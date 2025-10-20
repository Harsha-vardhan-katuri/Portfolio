import { Code, Cpu, Zap } from "lucide-react";

export const About = () => {
  const highlights = [
    {
      icon: Cpu,
      title: "Embedded Systems",
      description: "Expert in microcontroller programming, hardware interfacing, and real-time systems"
    },
    {
      icon: Code,
      title: "Firmware Development",
      description: "Proficient in C/C++, with extensive experience in ESP32, LPC2148, and Arduino"
    },
    {
      icon: Zap,
      title: "IoT & AI",
      description: "Building intelligent IoT solutions with LoRa, MQTT, and AI-powered applications"
    }
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-foreground/90 leading-relaxed">
                I'm a <span className="text-primary font-semibold">Firmware Engineer</span> at HealthCubed India, 
                where I architect cutting-edge IoT systems and develop production-grade embedded firmware.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                With expertise spanning from <span className="text-primary font-semibold">microcontroller architectures</span> to 
                <span className="text-primary font-semibold"> wireless communication protocols</span>, I specialize in 
                creating robust, efficient solutions for agricultural and medical device platforms.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                My journey includes architecting a <span className="text-primary font-semibold">LoRa-enabled soil health monitoring system</span>, 
                developing <span className="text-primary font-semibold">AI-powered chatbots</span>, and mastering 
                protocols like UART, I2C, SPI, and RS485.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 space-y-4">
              <h3 className="text-2xl font-bold mb-6">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <p><span className="text-primary font-semibold">Location:</span> Bengaluru, Karnataka</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <p><span className="text-primary font-semibold">Education:</span> B.Tech in ECE (CGPA: 8.36)</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <p><span className="text-primary font-semibold">Experience:</span> 2+ years in Embedded Systems</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <p><span className="text-primary font-semibold">Specialization:</span> Firmware, IoT, AI</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="glass-effect rounded-2xl p-8 hover:scale-105 transition-smooth hover:glow-effect"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <item.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
