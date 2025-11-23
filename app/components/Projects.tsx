"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"
import Image from "next/image"

export default function Projects() {
  const projects = [
    {
      title: "LoRa-Enabled Soil Health Monitoring System using RS485 and ESP32",
      description:
        "Real-time agricultural monitoring system with optimized low-power transmission and robust sensor integration.",
      image: "/lora-soil-monitoring.png",
      technologies: ["ESP32", "RS485", "Modbus RTU", "LoRa", "SPI", "UART"],
      achievements: [
        "Programmed ESP32 to read NPK, pH, EC, moisture, and temperature via RS485 Modbus RTU with <200 Ms decoding latency and stable real-time signal handling",
        "Synchronized UART and SPI communication to enable seamless data transfer between the ESP32 and LoRa transceiver, achieving 1 km wireless range with 80% delivery accuracy in agricultural field conditions",
        "Formatted compact 50-byte sensor payloads and transmitted them over SPI-based LoRa, ensuring packet integrity, optimized current consumption (<50 mA), and consistent remote monitoring of soil metrics",
      ],
      githubLink: "https://github.com/Harsha-vardhan-katuri/Soil-Sensor-Project",
      category: "Embedded Systems",
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
      title: "IoT Based Weather Reporting System",
      description:
        "Cloud-connected weather monitoring solution using LPC2148 and ESP-01 for accurate environmental tracking.",
      image: "/iot-weather-monitoring.png",
      technologies: ["LPC2148", "ESP-01", "DHT11", "ThingSpeak", "LCD"],
      achievements: [
        "Engineered a real-time weather reporting system using DHT11 to measure temperature and humidity, updating data to Thing Speak cloud at 15-second intervals with reliable connectivity",
        "Configured Thing Speak for faster cloud access, reducing retrieval time by 60% and enabling efficient real-time visualization through LCD display integration",
        "Optimized data transmission logic using the ESP-01 Wi-Fi module with LPC2148 to secure environmental readings with a margin of error of 2°C temperature and 5%RH humidity, resulting in stable IoT data updates",
      ],
      githubLink: null,
      category: "IoT",
    },
    {
      title: "OTP Based Smart Wireless Locking System using Arduino",
      description:
        "Secure access control system utilizing One-Time Passwords (OTPs) to replace traditional physical keys.",
      image: "/smart-lock-arduino.jpg",
      technologies: ["Arduino", "GSM", "Keypad", "LCD", "C++"],
      achievements: [
        "Employs one-time passwords (OTPs) instead of physical keys for access",
        "Enhances security by requiring unique OTPs for each access attempt",
        "Offers convenience and flexibility in locking and unlocking mechanisms",
        "Uses Arduino microcontrollers to manage secure OTP generation and validation logic",
      ],
      githubLink: null,
      category: "Embedded Security",
    },
    {
      title: "Voice Based Home Automation using IoT",
      description: "Smart home control system enabling seamless interaction through natural voice commands.",
      image: "/voice-automation-iot.jpg",
      technologies: ["IoT", "Voice Recognition", "NodeMCU", "Relay Module"],
      achievements: [
        "Text-to-speech (TTS) and speech-to-text (STT) integration boosts voice-based home automation",
        "Enables seamless interaction between users and smart devices",
        "Facilitates natural communication via spoken commands and responses",
        "Improves accessibility, particularly for users with visual impairments",
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
