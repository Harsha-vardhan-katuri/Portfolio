"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

export default function Experience() {
  const experiences = [
    {
      title: "Firmware Engineer",
      company: "HealthCube Private Limited",
      location: "Bengaluru",
      period: "February 2025 – Present",
      type: "Full-time",
      achievements: [
        "Architecting a LoRa-enabled soil health monitoring system by developing embedded firmware in C/C++ for ESP32, integrating RS485-based 7-in-1 sensors to capture NPK, pH, EC, moisture, and temperature data with reliable Modbus RTU communication",
        "Configuring and validating UART, I2C, SPI, and RS485 protocols to ensure robust, low-latency communication between microcontrollers and peripherals across both agricultural and medical device platforms",
        "Currently working on enhancing the soil sensor project while parallelly learning and contributing to HealthCube HCXL's production-grade firmware by assisting in debugging and supporting optimization and feature validation efforts",
      ],
    },
    {
      title: "AI Internship",
      company: "Edunet Foundation (Microsoft & SAP Program)",
      location: "Remote",
      period: "December 2024 – January 2025",
      type: "Internship",
      githubLink: "#",
      achievements: [
        "Developed an AI-powered Health Assistant Chatbot using Streamlit and Hugging Face Transformers, enabling intelligent health-related conversations with users, achieving a 90% response accuracy for predefined queries",
        "Implemented rule-based keyword matching, improving query classification accuracy by 40%, and integrated DistilGPT-2, reducing response generation time by 35%",
        "Enhanced user interaction by providing instant health-related advice, increasing user engagement by 50%, and enabling faster decision-making for medical assistance",
      ],
    },
    {
      title: "Embedded Systems Trainee",
      company: "Vector India",
      location: "Hyderabad",
      period: "July 2023 – April 2024",
      type: "Training",
      achievements: [
        "Proficient in multiple programming languages, including C, C++, Embedded C and Data Structures, demonstrated through 6+ hands-on projects and practical applications",
        "Comprehensive understanding of embedded systems, covering microcontroller architectures, hardware interfacing, Linux internals, device drivers, and networking protocols such as I2C, SPI and UART",
        "Experienced with a range of System on Chips (SoCs) like ESP8266 and LPC2148, and skilled in using development and debugging tools like Keil IDE and Ubuntu",
      ],
    },
  ]

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="rounded-lg p-6 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300 bg-transparent"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-black text-white mb-2">{experience.title}</h3>
                <p className="font-black mb-2 text-indigo-700">{experience.company}</p>
                <div className="flex items-center gap-4 mb-3 text-sm text-pink-500 font-black">
                  <div className="flex items-center gap-1 text-red-800">
                    <MapPin className="w-4 h-4" />
                    {experience.location}
                  </div>
                  <div className="flex items-center gap-1 text-red-800">
                    <Calendar className="w-4 h-4" />
                    {experience.period}
                  </div>
                  <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-black">
                    {experience.type}
                  </span>
                </div>
              </div>
              {experience.githubLink && (
                <a
                  href={experience.githubLink}
                  className="text-purple-500 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
            <ul className="space-y-3">
              {experience.achievements.map((achievement, achievementIndex) => (
                <li key={achievementIndex} className="text-white font-semibold flex items-start">
                  <span className="text-indigo-500 mr-2 mt-2 font-black">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
