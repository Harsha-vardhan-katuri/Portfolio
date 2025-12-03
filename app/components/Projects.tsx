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
        "Programmed ESP32 to read NPK, pH, EC, moisture, and temperature via RS485 Modbus RTU with <200 Ms decoding latency and stable real-time signal handling",
        "Synchronized UART and SPI communication to enable seamless data transfer between the ESP32 and LoRa transceiver, achieving 1 km wireless range with 80% delivery accuracy in agricultural field conditions",
        "Formatted compact 50-byte sensor payloads and transmitted them over SPI-based LoRa, ensuring packet integrity, optimized current consumption (less than 50 mA), and consistent remote monitoring of soil metrics",
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
        "Developed an AI-powered Health Assistant Chatbot using Streamlit, Hugging Face Transformers, NLTK preprocessing, rule-based keyword matching, custom intent classification, symptom-based query handling, quick suggestions, and structured health advice—improving query accuracy by 40% and reducing DistilGPT-2 latency by 35%",
        "Enhanced user interaction and response quality through a refined Streamlit UI, optimized tokenization, predefined medical response templates, real-time feedback, and improved chat flow—achieving 90% accuracy for predefined queries and boosting user engagement by 50%",
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
        "Engineered a real-time weather reporting system using DHT11 to measure temperature and humidity, updating data to Thing Speak cloud at 15-second intervals with reliable connectivity",
        "Configured Thing Speak for faster cloud access, reducing retrieval time by 60% and enabling efficient real-time visualization through LCD display integration",
        "Optimized data transmission logic using the ESP-01 Wi-Fi module with LPC2148 to secure environmental readings with a margin of error of 2°C temperature and 5%RH humidity, resulting in stable IoT data updates",
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
        "Measures skin conductance in microSiemens (µS) to analyze physiological stress markers and separates signals into tonic (SCL) and phasic (SCR) components for detailed stress analysis",
        "Classifies stress levels into Calm, Normal, Sweaty/Mild Stress, and High Stress categories and visualizes real-time data using Arduino Serial Plotter with spike detection algorithms",
      ],
      githubLink: "https://github.com/Harsha-vardhan-katuri/GSR-Sensor-Project",
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
      githubLink: "https://github.com/Harsha-vardhan-katuri/BLE_Packet_Parser",
      category: "Wireless Comm",
    },
    {
      title: "Packetized Image Transmission System",
      description:
        "Efficient image transfer protocol implementation with robust error correction for reliable data delivery.",
      image: "/packetized-image-transfer.jpg",
      technologies: ["C", "CRC-16", "Image Processing", "Network Protocols", "Error Correction"],
      achievements: [
        "Implemented a firmware system to handle the reception and validation of image data packets for a toy projector, ensuring seamless data transmission and storage",
        "Engineered a packet validation mechanism using CRC-16/XMODEM checksum, ensuring a 98% accuracy rate in detecting corrupted or missing packets and maintaining data integrity",
        "Optimized memory management by developing functions to erase and save image data, resulting in a 30% reduction in memory usage and improved system performance",
      ],
      githubLink: "https://github.com/Harsha-vardhan-katuri/Image_Projector_Firmware",
      category: "Network Systems",
    },
  ]

  return (
    <div className="py-4 md:py-8">
      <div className="text-center mb-6 md:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">Featured Projects</h2>
        <p className="text-slate-300 font-medium mt-2 text-sm md:text-base px-2">
          Innovative solutions in embedded systems, IoT, and AI
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="glass-card rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 md:top-4 left-2 md:left-4">
                <span className="px-2 md:px-3 py-0.5 md:py-1 bg-gradient-to-r from-cyan-500/90 to-purple-500/90 backdrop-blur-sm text-white rounded-full text-xs md:text-sm font-bold shadow-lg">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between mb-2 md:mb-4">
                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 group-hover:from-cyan-200 group-hover:to-purple-300 transition-all pr-2">
                  {project.title}
                </h3>
                <div className="flex gap-2 flex-shrink-0">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      className="text-white/70 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-slate-300 font-medium mb-3 md:mb-4 leading-relaxed text-xs md:text-base">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-1 md:space-y-2">
                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">
                  Key Achievements
                </h4>
                <ul className="space-y-1 md:space-y-2">
                  {project.achievements.slice(0, 2).map((achievement, achievementIndex) => (
                    <li
                      key={achievementIndex}
                      className="text-slate-200 text-xs md:text-sm flex items-start font-medium group-hover:text-white transition-colors"
                    >
                      <span className="text-cyan-400 mr-1.5 md:mr-2 mt-0.5 font-bold">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
