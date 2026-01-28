"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"
import Image from "next/image"

export default function Projects() {
  const projects = [
    {
      title: "GSR-Based Stress Monitoring System",
      description:
        "Built a real-time Galvanic Skin Response (GSR) system using ESP32-WROOM-32 and Grove GSR sensor to measure human electrodermal activity. Implemented ADC-based signal acquisition, converted skin resistance to conductance (µS), and extracted tonic (SCL) and phasic (SCR) components to analyze stress and emotional responses. Designed calibration and classification logic to identify Calm, Normal, and Stress states, with live visualization using Serial Plotter.",
      image: "/gsr-stress-monitoring-system.jpg",
      technologies: ["ESP32", "GSR Sensor", "ADC", "Embedded C/C++", "Biomedical Signal Processing"],
      githubLink: "https://github.com/Harsha-vardhan-katuri/GSR-Sensor-Project",
      category: "Biomedical & IoT",
    },
    {
      title: "LoRa-Enabled Soil Health Monitoring System",
      description:
        "Built a long-range soil monitoring system using ESP32 and RS485-based 7-in-1 soil sensors to measure NPK, pH, EC, moisture, and temperature. Implemented Modbus RTU communication for reliable sensor data acquisition with optimized decoding latency. Designed compact payload formatting and synchronized UART-SPI data flow for LoRa transmission, enabling wireless monitoring over long distances with stable packet integrity and low power consumption.",
      image: "/lora-soil-monitoring-system-esp32-iot.jpg",
      technologies: ["ESP32", "RS485", "Modbus RTU", "LoRa", "UART", "SPI", "Embedded C/C++", "IoT Systems"],
      githubLink: "https://github.com/Harsha-vardhan-katuri/Soil-Sensor-Project",
      category: "IoT & Embedded Systems",
    },
    {
      title: "AI-Powered Health Assistant Chatbot",
      description:
        "Developed an AI-based health assistant chatbot using Streamlit and Hugging Face Transformers to support intelligent health-related conversations. Implemented NLP preprocessing, rule-based keyword matching, and intent classification to improve query understanding and response accuracy. Integrated DistilGPT-2 for response generation, optimized tokenization and fallback logic, and enhanced user experience through a clean interactive UI and structured health advice responses.",
      image: "/ai-health-assistant-chatbot.png",
      technologies: ["Python", "Streamlit", "Hugging Face Transformers", "NLTK", "DistilGPT-2", "NLP", "AI Chatbots"],
      githubLink: "https://github.com/Harsha-vardhan-katuri/AI_Chat_Bot",
      category: "AI & Machine Learning",
    },
    {
      title: "IoT-Based Weather Reporting System",
      description:
        "Designed a real-time weather monitoring system to measure temperature and humidity using the DHT11 sensor and transmit data to the ThingSpeak cloud platform. Implemented periodic data uploads at fixed intervals and optimized cloud configuration for faster data retrieval and visualization. Integrated ESP-01 Wi-Fi module with LPC2148 to ensure stable IoT connectivity and accurate environmental monitoring.",
      image: "/iot-weather-monitoring.png",
      technologies: ["LPC2148", "ESP-01", "DHT11", "ThingSpeak", "Embedded C", "IoT", "Cloud Integration"],
      githubLink: null,
      category: "IoT & Cloud Integration",
    },
    {
      title: "Image Projector Firmware",
      description:
        "Developed embedded firmware to receive and render image data packets for a toy projector system. Implemented packet validation, header and length checks, and chunk-based image data extraction using C. Designed logic to process streamed byte data and reconstruct image frames using sequential packets, focusing on reliable data handling, memory management, and controlled output rendering.",
      image: "/image-projector.jpg",
      technologies: ["C", "Embedded Firmware", "Packet Parsing", "Byte-Level Data Processing", "Memory Handling"],
      githubLink: "https://github.com/Harsha-vardhan-katuri/Image_Projector_Firmware",
      category: "Embedded Systems",
    },
    {
      title: "Button-Controlled LEDs (Bare-Metal Firmware)",
      description:
        "Developed bare-metal embedded firmware using direct register-level programming to control multiple LEDs via a push-button input. Configured GPIO using DDR and PORT registers, implemented software debouncing, and designed finite-state logic to cycle LED patterns reliably based on user input.",
      image: "/button-controlled-leds-bare-metal-embedded.jpg",
      technologies: [
        "Bare-Metal Embedded C",
        "Register-Level Programming",
        "GPIO",
        "Debouncing Logic",
        "Microcontroller I/O",
      ],
      githubLink: "https://github.com/Harsha-vardhan-katuri/Button_Controlled_LEDs",
      category: "Embedded Systems",
    },
    {
      title: "OTP-Based Smart Wireless Locking System",
      description:
        "Designed and implemented a smart wireless locking system using Arduino and Bluetooth communication to enhance access security. Developed logic to generate and validate One-Time Passwords (OTP) via an Android application, enabling secure lock and unlock operations. Integrated servo motor control and status indication to physically actuate the locking mechanism based on OTP verification, ensuring reliable and controlled access.",
      image: "/smart-lock-arduino.jpg",
      technologies: [
        "Arduino UNO (ATmega328P)",
        "Bluetooth HC-05",
        "Servo Motor",
        "Embedded C",
        "MIT App Inventor",
        "Wireless Security Systems",
      ],
      githubLink: null,
      category: "Embedded Security",
    },
    {
      title: "Voice-Controlled Home Automation System",
      description:
        "Developed a voice-controlled home automation system to operate household appliances using cloud-based speech services. Implemented voice command processing using Speech-to-Text and Text-to-Speech services, integrated with IBM Watson Assistant for intent handling and decision logic. Designed Node-RED flows to process voice commands, trigger appliance control actions, and provide real-time responses, enabling hands-free operation and improved accessibility for elderly and physically challenged users.",
      image: "/voice-automation-iot.jpg",
      technologies: [
        "IBM Cloud",
        "IBM Watson IoT Platform",
        "IBM Watson Assistant",
        "Node-RED",
        "Speech-to-Text",
        "Text-to-Speech",
        "Python",
      ],
      githubLink: null,
      category: "IoT & Automation",
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
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0, delay: index * 0.0008, ease: "easeOut" }}
            className="glass-card rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-3 hover:scale-[1.03] group border border-cyan-500/10 hover:border-purple-500/30"
          >
            <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg?height=224&width=400&query=embedded systems project"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={index < 2}
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

              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
