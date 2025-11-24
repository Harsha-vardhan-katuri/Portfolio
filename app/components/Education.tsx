"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, Award } from "lucide-react"

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
    <div className="py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0, delay: index * 0.0008, ease: "easeOut" }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3 hover:scale-[1.02] hover:border-blue-400/50 transition-all duration-500 border border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-sky-500/20 border border-blue-400/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 mb-2">
                  {edu.degree}
                </h3>
                <p className="font-bold mb-2 text-slate-200">{edu.school}</p>
                <div className="flex items-center gap-4 mb-3 text-sm font-bold text-slate-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {edu.period}
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Grade: {edu.grade}
                  </div>
                </div>
                <p className="text-slate-300 font-normal">{edu.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
