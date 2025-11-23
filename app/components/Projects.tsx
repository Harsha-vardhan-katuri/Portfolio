"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"
import Image from "next/image"

export default function Projects() {
  const projects = [
    {
      title: "LoRa-Enabled Soil Health Monitoring System",
      description:
        "Advanced agricultural IoT system using ESP32, RS485 sensors, and LoRa communication for real-time soil parameter monitoring.",
      image: "/lora-soil-monitoring.png",
      technologies: ["ESP32", "LoRa", "RS485", "Modbus RTU", "C/C++", "SPI", "UART"],
      achievements: [
        "Programmed ESP32 to interface with RS485-based soil sensors extracting NPK, pH, EC, moisture, and temperature data",
        "Achieved decoding latency under 200ms with robust signal handling for real-time responsiveness",
        "Enabled wireless transmission over 1km range with 95% delivery accuracy in agricultural field conditions",
        "Maintained packet integrity while limiting current draw to below 50mA",
      ],
      githubLink: "https://github.com/Harsha-vardhan-katuri/Soil-Sensor-Project",
      category: "IoT & Embedded Systems",
    },
    {
      title: "AI-Powered Health Assistant Chatbot",
      description:
        "Intelligent health assistant using Streamlit and Hugging Face Transformers for medical query assistance.",
      image: "/ai-health-assistant-chatbot.png",
      technologies: ["Python", "Streamlit", "Hugging Face", "DistilGPT-2", "NLP", "AI/ML"],
      achievements: [
        "Achieved 90% response accuracy for predefined health-related queries",
        "Improved query classification accuracy by 40% using rule-based keyword matching",
        "Reduced response generation time by 35% with DistilGPT-2 integration",
        "Increased user engagement by 50% with instant health advice delivery",
      ],
      githubLink: "https://github.com/Harsha-vardhan-katuri/AI_Chat_Bot",
      category: "AI & Machine Learning",
    },
    {
      title: "IoT Weather Reporting System",
      description:
        "Real-time weather monitoring system with cloud integration for continuous environmental data tracking.",
      image: "/iot-weather-monitoring.png",
      technologies: ["LPC2148", "ESP01", "DHT11", "ThingSpeak", "Wi-Fi", "LCD Display"],
      achievements: [
        "Built real-time weather reporting system updating every 15 seconds to ThingSpeak cloud",
        "Reduced data retrieval time by 60% with enhanced ThingSpeak configuration",
        "Achieved environmental readings accurate to ±2°C for temperature and ±5%RH for humidity",
        "Integrated ESP01 Wi-Fi module with LPC2148 for reliable real-time updates",
      ],
      githubLink: null,
      category: "IoT & Cloud Integration",
    },
    {
      title: "OTP Based Smart Wireless Locking System",
      description:
        "Secure access control system utilizing One-Time Passwords (OTPs) to replace traditional physical keys.",
      image: "/smart-lock-arduino.jpg",
      technologies: ["Arduino", "GSM Module", "Keypad", "LCD", "C++", "Embedded Systems"],
      achievements: [
        "Employs one-time passwords (OTPs) instead of physical keys for enhanced access security",
        "Enhances security by requiring unique OTPs for each distinct access attempt",
        "Offers user convenience and flexibility in both locking and unlocking mechanisms",
        "Utilizes Arduino microcontrollers to manage secure OTP generation and validation logic",
      ],
      githubLink: null,
      category: "Embedded Security",
    },
    {
      title: "Voice Based Home Automation using IoT",
      description: "Smart home control system enabling seamless interaction through natural voice commands.",
      image: "/voice-automation-iot.jpg",
      technologies: ["IoT", "Voice Recognition", "NodeMCU", "Relay Module", "C++", "Blynk App"],
      achievements: [
        "Integrated Text-to-speech (TTS) and speech-to-text (STT) to boost voice-based automation capabilities",
        "Enables seamless interaction between users and smart home devices for intuitive control",
        "Facilitates natural communication via spoken commands and automated audio responses",
        "Improves accessibility significantly, particularly for users with visual impairments",
      ],
      githubLink: null,
      category: "IoT & Automation",
    },
    {
      title: "Grove GSR Sensor with ESP32",
      description:
        "Stress level monitoring system measuring skin conductance to detect physiological stress responses.",
      image: "/gsr-sensor-esp32.jpg",
      technologies: ["ESP32", "Grove GSR Sensor", "Arduino IDE", "Signal Processing", "Bio-Sensors"],
      achievements: [
        "Measures skin conductance in microSiemens (µS) to analyze physiological stress markers",
        "Separates signals into tonic (SCL) and phasic (SCR) components for detailed stress analysis",
        "Classifies stress levels into Calm, Normal, Sweaty/Mild Stress, and High Stress categories",
        "Visualizes real-time data using Arduino Serial Plotter with spike detection algorithms",
      ],
      githubLink: null,
      category: "Biomedical IoT",
    },
    {
      title: "High-Precision BLE Motion Detection",
      description:
        "Advanced signal analysis system for detecting motion patterns using Bluetooth Low Energy technology.",
      image: "/ble-motion-detection.jpg",
      technologies: ["C", "BLE", "Accelerometer", "Algorithm Design", "Embedded Systems"],
      achievements: [
        "Architected a high-efficiency C program to decode BLE packets, achieving 95% precision in extracting critical accelerometer data",
        "Distinguished iBeacon signals with a 70% faster classification process, enhancing system responsiveness and overall efficiency",
        "Synthesized motion analysis algorithms to detect movement within 100 milliseconds per packet, improving processing speed",
        "Reinforced data integrity through advanced error correction, improving packet reliability by 98%, ensuring robust transmission",
      ],
      githubLink: "https://github.com/Harsha-vardhan-katuri",
      category: "Wireless Comm",
    },
    {
      title: "Packetized Image Transmission System",
      description:
        "Efficient image transfer protocol implementation with robust error correction for reliable data delivery.",
      image: "/packetized-image-transfer.jpg",
      technologies: ["C", "CRC-16", "Image Processing", "Network Protocols", "Error Correction"],
      achievements: [
        "Engineered a C program for packetized image transfer, enhancing data throughput by 40% through segmentation techniques",
        "Implemented CRC-16/XMODEM error detection, ensuring 99% accuracy in maintaining packet integrity during data transmission",
        "Refined image reconstruction algorithms, cutting display latency by 30% and achieving 98% accuracy in rendering images",
        "Upgraded network communication protocols, reducing packet loss to under 2% and improving real-time delivery performance",
      ],
      githubLink: "https://github.com/Harsha-vardhan-katuri",
      category: "Network Systems",
    },
  ]

  return (
    <div className="py-8">
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0, delay: index * 0.0008, ease: "easeOut" }}
            className="bg-transparent rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300 group border border-white/5 hover:border-cyan-500/30"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-cyan-600 text-white rounded-full text-sm font-bold shadow-lg shadow-cyan-500/20">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-6 bg-transparent relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:from-cyan-300 group-hover:to-blue-300 transition-all">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        className="text-gray-400 hover:text-white transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 font-medium mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded text-xs font-bold bg-blue-900/30 text-cyan-300 border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Key Achievements</h4>
                  <ul className="space-y-2">
                    {project.achievements.slice(0, 2).map((achievement, achievementIndex) => (
                      <li
                        key={achievementIndex}
                        className="text-gray-300 text-sm flex items-start font-medium group-hover:text-white transition-colors"
                      >
                        <span className="text-cyan-500 mr-2 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
