"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

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
      achievements: [
        "Developed an AI-based health assistant chatbot using Streamlit and Hugging Face Transformers to support intelligent health-related conversations. Implemented NLP preprocessing, rule-based keyword matching, and intent classification to improve query understanding and response accuracy. Integrated DistilGPT-2 for response generation, optimized tokenization and fallback logic, and enhanced user experience through a clean interactive UI and structured health advice responses",
        "Tech: Python, Streamlit, Hugging Face Transformers, NLTK, DistilGPT-2, NLP, AI Chatbots",
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
      achievements: [
        "Developed a voice-controlled home automation system to operate household appliances using cloud-based speech services. Implemented voice command processing using Speech-to-Text and Text-to-Speech services, integrated with IBM Watson Assistant for intent handling and decision logic. Designed Node-RED flows to process voice commands, trigger appliance control actions, and provide real-time responses, enabling hands-free operation and improved accessibility for elderly and physically challenged users",
        "Tech: IBM Cloud, IBM Watson IoT Platform, IBM Watson Assistant, Node-RED, Speech-to-Text, Text-to-Speech, Python",
      ],
    },
  ]

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gradient">Work Experience</h2>
        <p className="text-slate-300 font-medium mt-2">
          Professional journey in embedded systems, firmware development, and AI technologies
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-pink-500/50" />
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div key={index} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  className={`grid grid-cols-2 gap-8 items-center ${index % 2 === 0 ? "" : ""}`}
                >
                  {/* Card - Alternating sides */}
                  <div className={index % 2 === 0 ? "col-span-1 text-right" : "col-span-1 order-2 text-left"}>
                    <motion.div
                      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 212, 255, 0.2)" }}
                      className="glass-card rounded-2xl p-6 border border-cyan-500/20 hover:border-purple-500/40 transition-all duration-300 group"
                    >
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-cyan-400 group-hover:text-purple-400 transition-colors">
                          {experience.title}
                        </h3>
                        <p className="text-white font-semibold mt-1">{experience.company}</p>
                      </div>
                      
                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-300 justify-end">
                          <span>{experience.location}</span>
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 justify-end">
                          <span>{experience.period}</span>
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div className="flex justify-end">
                          <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-400/30 rounded-full text-xs font-bold">
                            {experience.type}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-2 text-slate-300 text-sm">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex gap-2 group/item">
                            <span className="text-cyan-400 flex-shrink-0 mt-1">▸</span>
                            <span className="group-hover/item:text-cyan-400 transition-colors">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="col-span-2 flex justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center border-4 border-slate-900 shadow-lg shadow-cyan-500/50 z-10 relative"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                        <span className="text-cyan-400 font-bold text-lg">{index + 1}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
