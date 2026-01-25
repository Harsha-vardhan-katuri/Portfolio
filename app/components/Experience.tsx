"use client"

import { motion } from "framer-motion"

export default function Experience() {
  const experiences = [
    {
      title: "Firmware Engineer",
      company: "HealthCube Private Limited",
      period: "February 2025 – Present",
      icon: "⚙️",
      bullets: [
        "Designed and completed core firmware projects including the LoRa soil monitoring system and GSR sensor prototype; executed board bring-up, continuity and voltage checks, and component-level fault diagnosis.",
        "Supported firmware development by configuring UART/I2C/SPI/RS485 stacks, testing new device firmware, analysing device logs, diagnosing issues, and assisting in optimization and validation cycles.",
        "Collaborated with Quality and Manufacturing teams on PCB soldering, hardware bring-up, device evaluation, documentation updates, and cross-functional issue resolution.",
      ],
    },
    {
      title: "AI Internship",
      company: "Edunet Foundation (Microsoft & SAP Program)",
      period: "December 2024 – January 2025",
      icon: "🤖",
      bullets: [
        "Developed an AI-based health assistant chatbot using Streamlit and Hugging Face Transformers to support intelligent health-related conversations.",
        "Implemented NLP preprocessing, rule-based keyword matching, and intent classification to improve query understanding and response accuracy.",
        "Integrated DistilGPT-2 for response generation, optimized tokenization and fallback logic, and enhanced user experience through a clean interactive UI.",
      ],
    },
    {
      title: "Embedded Systems Trainee",
      company: "Vector India",
      period: "July 2023 – April 2024",
      icon: "🔌",
      bullets: [
        "Built strong foundations in embedded systems through 6+ projects, gaining proficiency in C/C++, Embedded C, Data Structures, and microcontroller architectures.",
        "Worked extensively with SoCs like ESP8266 and LPC2148, and developed debugging skills using tools such as Keil IDE and Ubuntu.",
        "Developed hardware interfacing projects with communication protocols (I2C, SPI, UART) and device driver implementation.",
      ],
    },
    {
      title: "Voice Based Home Automation Internship",
      company: "Technical Internship",
      period: "January 2023 – April 2023",
      icon: "🎤",
      bullets: [
        "Developed a voice-controlled home automation system to operate household appliances using cloud-based speech services.",
        "Implemented voice command processing using Speech-to-Text and Text-to-Speech services, integrated with IBM Watson Assistant for intent handling.",
        "Designed Node-RED flows to process voice commands, trigger appliance control actions, and provide real-time responses for hands-free operation.",
      ],
    },
  ]

  return (
    <div className="py-20 px-4">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Work Experience</h2>
        <p className="text-slate-400 mt-3">Professional journey in embedded systems, firmware development, and AI technologies</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Center Timeline Line - Behind circles with z-10 */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 transform -translate-x-1/2 z-10" />

          {/* Timeline Items */}
          <div className="space-y-24">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              
              return (
                <div key={index} className="relative">
                  <div className="grid grid-cols-2 gap-8 items-center">
                    {/* Left Side - Content */}
                    {isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="col-span-1"
                      >
                        {/* Card with content */}
                        <motion.div
                          whileHover={{ y: -8, boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)" }}
                          className="bg-slate-800/40 backdrop-blur border border-purple-500/30 hover:border-purple-500/60 transition-all rounded-2xl p-8 group"
                        >
                          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-purple-300 text-lg font-semibold mb-4">{exp.company}</p>
                          
                          <ul className="space-y-3">
                            {exp.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                                <span className="text-cyan-400 flex-shrink-0 mt-1">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <div />
                    )}

                    {/* Right Side - Content */}
                    {!isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="col-span-1"
                      >
                        {/* Card with content */}
                        <motion.div
                          whileHover={{ y: -8, boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)" }}
                          className="bg-slate-800/40 backdrop-blur border border-purple-500/30 hover:border-purple-500/60 transition-all rounded-2xl p-8 group"
                        >
                          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-purple-300 text-lg font-semibold mb-4">{exp.company}</p>
                          
                          <ul className="space-y-3">
                            {exp.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                                <span className="text-cyan-400 flex-shrink-0 mt-1">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Timeline Circle with Period - On the center line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    className="absolute left-1/2 top-8 transform -translate-x-1/2 flex items-center gap-4 z-30"
                  >
                    {isEven && <p className="text-white font-semibold text-sm whitespace-nowrap text-right pr-4">{exp.period}</p>}
                    
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center border-4 border-slate-900 shadow-lg shadow-cyan-500/50 flex-shrink-0 relative z-30">
                      <span className="text-2xl">{exp.icon}</span>
                    </div>
                    
                    {!isEven && <p className="text-white font-semibold text-sm whitespace-nowrap text-left pl-4">{exp.period}</p>}
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
