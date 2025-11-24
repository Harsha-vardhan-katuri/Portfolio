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
    {
      title: "Internship - Voice Based Home Automation",
      company: "Technical Internship",
      location: "On-site",
      period: "January 2023 – April 2023",
      type: "Internship",
      githubLink: null,
      achievements: [
        "Worked on Text-to-speech (TTS) and speech-to-text (STT) integration for enhancing voice-based home automation systems",
        "Enabled seamless interaction between users and smart devices through natural language processing commands",
        "Facilitated natural communication via spoken commands and responses to improve system usability",
        "Focused on improving accessibility features, particularly designing interfaces for users with visual impairments",
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
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0, delay: index * 0.0008, ease: "easeOut" }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 hover:border-blue-400/50 hover:scale-[1.02] transition-all duration-500 border border-white/10 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 mb-2 transition-all">
                  {experience.title}
                </h3>
                <p className="font-bold mb-2 text-slate-200">{experience.company}</p>
                <div className="flex items-center gap-4 mb-3 text-sm text-slate-300 font-medium">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {experience.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {experience.period}
                  </div>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-xs font-bold backdrop-blur-sm">
                    {experience.type}
                  </span>
                </div>
              </div>
              {experience.githubLink && (
                <a
                  href={experience.githubLink}
                  className="text-slate-300 hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
            <ul className="space-y-3">
              {experience.achievements.map((achievement, achievementIndex) => (
                <li
                  key={achievementIndex}
                  className="text-slate-200 font-medium flex items-start transition-colors group-hover:text-white"
                >
                  <span className="text-blue-400 mr-2 mt-2 font-bold">•</span>
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
