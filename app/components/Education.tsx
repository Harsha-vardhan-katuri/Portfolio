"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, Award } from "lucide-react"

export default function Education() {
  const education = [
    {
      degree: "Gudlavalleru Engineering College – B.Tech ECE", // Updated format
      school: "Gudlavalleru Engineering College",
      period: "2019–2023",
      grade: "CGPA: 8.36", // Updated format
      description: "Specialized in Embedded Systems and Electronics",
    },
    {
      degree: "Narayana Junior College – MPC", // Updated format
      school: "Narayana Junior College",
      period: "2017–2019",
      grade: "CGPA: 9.94", // Updated format
      description: "Mathematics, Physics, and Chemistry",
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
            className="rounded-lg p-6 bg-transparent hover:shadow-2xl hover:shadow-sky-500/30 hover:-translate-y-3 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white mb-2">{edu.degree}</h3>
                <p className="font-black mb-2 text-[rgba(244,250,20,1)]">{edu.school}</p>
                <div className="flex items-center gap-4 mb-3 text-sm font-black text-red-800">
                  <div className="flex items-center gap-1 text-[rgba(251,0,0,1)]">
                    <Calendar className="w-4 h-4" />
                    {edu.period}
                  </div>
                  <div className="flex items-center gap-1 text-[rgba(254,0,0,1)]">
                    <Award className="w-4 h-4" />
                    {edu.grade}
                  </div>
                </div>
                <p className="text-white font-semibold">{edu.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
