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
            className="rounded-lg p-6 bg-transparent hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-3 transition-all duration-300 border border-white/20"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 border border-white/30 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                <p className="font-bold mb-2 text-white">{edu.school}</p>
                <div className="flex items-center gap-4 mb-3 text-sm font-bold text-white/80">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {edu.period}
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Grade: {edu.grade}
                  </div>
                </div>
                <p className="text-white font-normal">{edu.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
