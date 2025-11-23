"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

export default function Experience() {
  const experiences = [
    {
      title: "Firmware Engineer",
      company: "HealthCubed India Private Limited", // Updated company name
      location: "Bengaluru",
      period: "February 2025 – Present",
      type: "Full-time",
      achievements: [
        "Designed and completed core firmware projects including the LoRa soil monitoring system and GSR sensor prototype; executed board bring-up, continuity and voltage checks, and component-level fault diagnosis",
        "Supported firmware development by configuring UART/I2C/SPI/RS485 stacks, testing new device firmware, analysing device logs, diagnosing issues, and assisting in optimization and validation cycles",
        "Collaborated with Quality and Manufacturing teams on PCB soldering, hardware bring-up, device evaluation, documentation updates, and cross-functional issue resolution, while actively learning the codebase and strengthening system stability through guided real-time debugging",
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
        "Developed an AI-powered Health Assistant Chatbot using Streamlit, Hugging Face Transformers, NLTK preprocessing, rule-based keyword matching, custom intent classification, symptom-based query handling, quick suggestions, and structured health advice—improving query accuracy by 40% and reducing DistilGPT-2 latency by 35%",
        "Enhanced user interaction and response quality through a refined Streamlit UI, optimized tokenization, predefined medical-response templates, real-time feedback, and improved chat flow—achieving 90% accuracy for predefined queries and boosting user engagement by 50%",
      ],
    },
    {
      title: "Embedded Systems Trainee",
      company: "Vector India",
      location: "Hyderabad",
      period: "July 2023 – April 2024",
      type: "Professional Development", // Updated type
      achievements: [
        "Built strong foundations in embedded systems through 6+ projects, gaining proficiency in C/C++, Embedded C, Data Structures, microcontroller architectures, hardware interfacing, Linux internals, device drivers, and communication protocols (I2C, SPI, UART)",
        "Worked extensively with SoCs like ESP8266 and LPC2148, and developed debugging and development skills using tools such as Keil IDE and Ubuntu, enabling efficient embedded application development and problem-solving",
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
            className="rounded-lg p-6 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300 bg-transparent border border-white/5 hover:border-cyan-500/30 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 group-hover:from-cyan-300 group-hover:to-white mb-2 transition-all">
                  {experience.title}
                </h3>
                <p className="font-bold mb-2 text-cyan-400">{experience.company}</p>
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-400 font-medium">
                  <div className="flex items-center gap-1 group-hover:text-cyan-300 transition-colors">
                    <MapPin className="w-4 h-4" />
                    {experience.location}
                  </div>
                  <div className="flex items-center gap-1 group-hover:text-cyan-300 transition-colors">
                    <Calendar className="w-4 h-4" />
                    {experience.period}
                  </div>
                  <span className="px-2 py-1 bg-cyan-900/30 text-cyan-300 border border-cyan-500/20 rounded-full text-xs font-bold">
                    {experience.type}
                  </span>
                </div>
              </div>
              {experience.githubLink && (
                <a
                  href={experience.githubLink}
                  className="text-gray-500 hover:text-white transition-colors"
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
                  className="text-gray-300 font-medium flex items-start group-hover:text-white transition-colors"
                >
                  <span className="text-cyan-500 mr-2 mt-2 font-bold">•</span>
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
