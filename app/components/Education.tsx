"use client"

import { motion } from "framer-motion"
import { Calendar, Award } from "lucide-react"

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
    <div className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gradient">My Education</h2>
        <p className="text-slate-300 font-medium mt-2">Academic background that shaped my technical expertise</p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500/50 via-purple-500/50 to-cyan-500/50" />
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {education.map((edu, index) => (
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
                      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)" }}
                      className="glass-card rounded-2xl p-6 border border-purple-500/20 hover:border-pink-500/40 transition-all duration-300 group"
                    >
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-purple-400 group-hover:text-pink-400 transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-white font-semibold mt-1">{edu.school}</p>
                      </div>
                      
                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-300 justify-end">
                          <span>{edu.period}</span>
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 justify-end">
                          <span>CGPA: {edu.grade}</span>
                          <Award className="w-4 h-4" />
                        </div>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">{edu.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="col-span-2 flex justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-4 border-slate-900 shadow-lg shadow-purple-500/50 z-10 relative"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                        <span className="text-purple-400 font-bold text-lg">{index + 1}</span>
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
