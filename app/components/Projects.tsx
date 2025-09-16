"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
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
      githubLink: "#",
      category: "IoT & Cloud Integration",
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
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-black">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-6 bg-black">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-black text-white mb-2">{project.title}</h3>
                <div className="flex gap-2">
                  <a
                    href={project.githubLink}
                    className="text-pink-500 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-purple-500 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    
                  </a>
                </div>
              </div>

              <p className="text-white font-semibold mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-indigo-500 text-white rounded text-sm font-black">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-black text-yellow-500 uppercase tracking-wide">Key Achievements</h4>
                <ul className="space-y-1">
                  {project.achievements.slice(0, 2).map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="text-white text-sm flex items-start font-semibold">
                      <span className="text-red-500 mr-2 mt-1 font-black">•</span>
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
