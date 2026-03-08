import { Code, Cpu, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useScrollProgress";

export const About = () => {
  const { ref: headingRef, inView: headingVisible } = useInView(0.2);
  const { ref: contentRef, inView: contentVisible } = useInView(0.1);
  const { ref: cardsRef, inView: cardsVisible } = useInView(0.1);

  const highlights = [
    { icon: Cpu, title: "Embedded Systems", description: "Expert in microcontroller programming, hardware interfacing, and real-time systems" },
    { icon: Code, title: "Firmware Development", description: "Proficient in C/C++, with extensive experience in ESP32, LPC2148, and Arduino" },
    { icon: Zap, title: "IoT & AI", description: "Building intelligent IoT solutions with LoRa, MQTT, and AI-powered applications" },
  ];

  return (
    <section id="about" className="relative py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div ref={headingRef} className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headingVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-display gradient-text-shimmer mb-4"
            >
              About Me
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={headingVisible ? { width: 80 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-0.5 bg-gradient-to-r from-primary to-secondary"
            />
          </div>

          <div ref={contentRef} className="grid md:grid-cols-2 gap-12 items-start mb-20">
            <div className="space-y-6">
              {[
                <>I'm a <span className="text-primary font-semibold">Firmware Engineer</span> at HealthCubed India, where I architect cutting-edge IoT systems and develop production-grade embedded firmware.</>,
                <>With expertise spanning from <span className="text-primary font-semibold">microcontroller architectures</span> to <span className="text-primary font-semibold">wireless communication protocols</span>, I specialize in creating robust, efficient solutions for agricultural and medical device platforms.</>,
                <>My journey includes architecting a <span className="text-primary font-semibold">LoRa-enabled soil health monitoring system</span>, developing <span className="text-primary font-semibold">AI-powered chatbots</span>, and mastering protocols like UART, I2C, SPI, and RS485.</>,
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="text-lg text-foreground/80 leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={contentVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="glass-card p-8 space-y-4"
            >
              <h3 className="text-2xl font-bold font-display mb-6">Quick Facts</h3>
              {[
                { label: "Location", value: "Bengaluru, Karnataka" },
                { label: "Education", value: "B.Tech in ECE (CGPA: 8.36)" },
                { label: "Experience", value: "2+ years in Embedded Systems" },
                { label: "Specialization", value: "Firmware, IoT, AI" },
              ].map((fact, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <p className="text-foreground/80">
                    <span className="text-primary font-semibold">{fact.label}:</span> {fact.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={cardsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="glass-card-hover p-8"
              >
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold font-display mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
