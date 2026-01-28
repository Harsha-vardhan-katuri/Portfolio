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
        "Developed an AI-based health assistant chatbot using Streamlit and Hugging Face Transformers to support intelligent health-related conversations. Implemented NLP preprocessing, rule-based keyword matching, and intent classification to improve query understanding and response accuracy. Integrated DistilGPT-2 for response generation, optimized tokenization and fallback logic, and enhanced user experience through a clean interactive UI and structured health advice responses",
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
        "Developed a voice-controlled home automation system to operate household appliances using cloud-based speech services. Implemented voice command processing using Speech-to-Text and Text-to-Speech services, integrated with IBM Watson Assistant for intent handling and decision logic. Designed Node-RED flows to process voice commands, trigger appliance control actions, and provide real-time responses, enabling hands-free operation and improved accessibility for elderly and physically challenged users.",
      ],
    },
  ]

  return (
    <div className="py-20 px-4">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Work Experience</h2>
        <p className="text-slate-400 mt-3">Professional journey in embedded systems, firmware development, and AI technologies</p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          {/* Center Timeline Line - Only on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 transform -translate-x-1/2 z-20" />

          {/* Desktop Timeline Items - Grid Layout */}
          <div className="space-y-24 hidden md:block">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* 3-Column Grid: [1fr_auto_1fr] */}
                  <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">
                    {/* Left Column */}
                    <div className="flex flex-col items-end">
                      {isEven ? (
                        <motion.div
                          whileHover={{ y: -8, boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)" }}
                          className="bg-slate-800/40 backdrop-blur border border-purple-500/30 hover:border-purple-500/60 transition-all rounded-2xl p-8 group w-full"
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
                      ) : (
                        <p className="text-white font-semibold text-sm text-right self-center">{exp.period}</p>
                      )}
                    </div>

                    {/* Center - Timeline Circle with background solid to sit on top of line */}
                    <div className="flex justify-center w-fit mx-auto">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center border-4 border-slate-900 shadow-lg shadow-cyan-500/50 relative z-40">
                        <span className="text-2xl">{exp.icon}</span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col items-start">
                      {!isEven ? (
                        <motion.div
                          whileHover={{ y: -8, boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)" }}
                          className="bg-slate-800/40 backdrop-blur border border-purple-500/30 hover:border-purple-500/60 transition-all rounded-2xl p-8 group w-full"
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
                      ) : (
                        <p className="text-white font-semibold text-sm self-center">{exp.period}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Timeline - 2 Column Layout with line on left */}
          <div className="md:hidden relative space-y-12">
            {/* Left Timeline Line - Mobile only */}
            <div className="absolute left-6 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 z-10" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative grid grid-cols-[auto_1fr] gap-4 items-start"
              >
                {/* Left Column - Timeline Circle */}
                <div className="flex justify-center z-40 pt-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center border-4 border-slate-900 shadow-lg shadow-cyan-500/50 relative z-40">
                    <span className="text-lg">{exp.icon}</span>
                  </div>
                </div>

                {/* Right Column - Period and Card stacked */}
                <div className="flex flex-col gap-2 pl-4">
                  <p className="text-white font-semibold text-xs">{exp.period}</p>
                  
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)" }}
                    className="bg-slate-800/40 backdrop-blur border border-purple-500/30 hover:border-purple-500/60 transition-all rounded-2xl p-4 group w-full"
                  >
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-purple-300 font-semibold mb-3 text-xs">{exp.company}</p>
                    
                    <ul className="space-y-2 min-h-0">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex gap-2 text-slate-300 text-xs leading-relaxed">
                          <span className="text-cyan-400 flex-shrink-0 mt-0.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
