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
        "Designed and completed core firmware projects including the LoRa soil monitoring system and GSR sensor prototype; executed board bring-up, continuity and voltage checks, and component-level fault diagnosis.",
        "Supported firmware development by configuring UART/I2C/SPI/RS485 stacks, testing new device firmware, analysing device logs, diagnosing issues, and assisting in optimization and validation cycles.",
        "Collaborated with Quality and Manufacturing teams on PCB soldering, hardware bring-up, device evaluation, documentation updates, and cross-functional issue resolution, while actively learning the codebase and strengthening system stability through guided real-time debugging.",
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
        "Developed an AI-based health assistant chatbot using Streamlit and Hugging Face Transformers to support intelligent health-related conversations.",
        "Implemented NLP preprocessing, rule-based keyword matching, and intent classification to improve query understanding and response accuracy.",
        "Integrated DistilGPT-2 for response generation, optimized tokenization and fallback logic, and enhanced user experience through a clean interactive UI and structured health advice responses.",
      ],
    },
    {
      title: "Embedded Systems Trainee",
      company: "Vector India",
      location: "Hyderabad",
      period: "July 2023 – April 2024",
      type: "Training",
      achievements: [
        "Built strong foundations in embedded systems through 6+ projects, gaining proficiency in C/C++, Embedded C, Data Structures, microcontroller architectures, hardware interfacing, Linux internals, device drivers, and communication protocols (I2C, SPI, UART).",
        "Worked extensively with SoCs like ESP8266 and LPC2148, and developed debugging and development skills using tools such as Keil IDE and Ubuntu, enabling efficient embedded application development and problem-solving.",
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
        "Developed a voice-controlled home automation system to operate household appliances using cloud-based speech services.",
        "Implemented voice command processing using Speech-to-Text and Text-to-Speech services, integrated with IBM Watson Assistant for intent handling and decision logic.",
        "Designed Node-RED flows to process voice commands, trigger appliance control actions, and provide real-time responses, enabling hands-free operation and improved accessibility for elderly and physically challenged users.",
      ],
    },
  ]

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gradient">Work Experience</h2>
        <p className="text-slate-300 font-medium mt-2">
          Professional journey in embedded systems, firmware development, and AI technologies
        </p>
      </div>
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
