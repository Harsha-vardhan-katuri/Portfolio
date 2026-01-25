"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

export default function Education() {
  const education = [
    {
      degree: "B.Tech in Electronics and Communication Engineering",
      school: "Gudlavalleru Engineering College",
      period: "August 2019 – May 2023",
      grade: "8.36 CGPA",
      description: "Specialized in embedded systems, digital electronics, and communication protocols",
    },
    {
      degree: "Intermediate in MPC (Mathematics, Physics, Chemistry)",
      school: "Narayana Junior College",
      period: "June 2017 – April 2019",
      grade: "9.94 CGPA",
      description: "Strong foundation in mathematics and physics with focus on analytical thinking",
    },
  ]

  return (
    <div className="py-12 md:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gradient">My Education</h2>
        <p className="text-slate-300 font-medium mt-2 text-sm md:text-base">Academic background that shaped my technical expertise</p>
      </div>
      
      <div className="w-full px-4 md:px-0 md:max-w-7xl md:mx-auto">
        {/* Desktop Timeline - Hidden on Mobile */}
        <div className="hidden md:block relative">
          {/* Center Timeline Line */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 transform -translate-x-1/2 z-10" />

          {/* Desktop Timeline Items */}
          <div className="space-y-24">
            {education.map((edu, index) => {
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-start"
                >
                  {/* Full width container with timeline circle in center */}
                  <div className="w-full flex items-start">
                    {/* Left side - Card or Date */}
                    <div className="w-1/2 flex flex-col items-end pr-12">
                      {isEven ? (
                        <motion.div
                          whileHover={{ y: -8 }}
                          className="glass-card rounded-2xl p-6 border border-purple-500/20 hover:border-pink-500/40 transition-all duration-300 group w-full"
                        >
                          <div className="mb-4">
                            <h3 className="text-lg font-bold text-purple-400 group-hover:text-pink-400 transition-colors">
                              {edu.degree}
                            </h3>
                            <p className="text-white font-semibold mt-1">{edu.school}</p>
                          </div>
                          
                          <div className="space-y-2 mb-4 text-sm">
                            <div className="flex items-center gap-2 text-slate-300">
                              <Award className="w-4 h-4" />
                              <span>{edu.grade}</span>
                            </div>
                          </div>

                          <p className="text-slate-300 text-sm leading-relaxed">{edu.description}</p>
                        </motion.div>
                      ) : (
                        <p className="text-slate-300 font-semibold text-sm whitespace-nowrap">{edu.period}</p>
                      )}
                    </div>

                    {/* Center - Timeline Circle */}
                    <div className="flex justify-center w-fit -mx-8">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-4 border-slate-900 shadow-lg shadow-purple-500/50 z-40">
                        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                          <span className="text-purple-400 font-bold">{index + 1}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Card or Date */}
                    <div className="w-1/2 flex flex-col items-start pl-12">
                      {!isEven ? (
                        <motion.div
                          whileHover={{ y: -8 }}
                          className="glass-card rounded-2xl p-6 border border-purple-500/20 hover:border-pink-500/40 transition-all duration-300 group w-full"
                        >
                          <div className="mb-4">
                            <h3 className="text-lg font-bold text-purple-400 group-hover:text-pink-400 transition-colors">
                              {edu.degree}
                            </h3>
                            <p className="text-white font-semibold mt-1">{edu.school}</p>
                          </div>
                          
                          <div className="space-y-2 mb-4 text-sm">
                            <div className="flex items-center gap-2 text-slate-300">
                              <Award className="w-4 h-4" />
                              <span>{edu.grade}</span>
                            </div>
                          </div>

                          <p className="text-slate-300 text-sm leading-relaxed">{edu.description}</p>
                        </motion.div>
                      ) : (
                        <p className="text-slate-300 font-semibold text-sm whitespace-nowrap">{edu.period}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile Timeline - Centered Single Line */}
        <div className="md:hidden relative">
          {/* Centered Timeline Line */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 transform -translate-x-1/2 z-10" />

          {/* Mobile Timeline Items */}
          <div className="space-y-12 pt-4">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex flex-col items-center"
              >
                {/* Timeline Circle */}
                <div className="flex justify-center z-40 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-4 border-slate-900 shadow-lg shadow-purple-500/50">
                    <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center">
                      <span className="text-purple-400 font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Card below timeline circle */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-4 border border-purple-500/20 hover:border-pink-500/40 transition-all duration-300 group w-full"
                >
                  <div className="mb-3">
                    <h3 className="text-base md:text-lg font-bold text-purple-400 group-hover:text-pink-400 transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-white font-semibold mt-1 text-sm">{edu.school}</p>
                  </div>
                  
                  <div className="space-y-2 mb-3 text-xs">
                    <p className="text-slate-300 font-semibold">{edu.period}</p>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Award className="w-4 h-4" />
                      <span>{edu.grade}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed">{edu.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
