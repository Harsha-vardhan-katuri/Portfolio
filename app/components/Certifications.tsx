"use client"

import { motion } from "framer-motion"
import { Award, Star, Trophy } from "lucide-react"

export default function Certifications() {
  const achievements = [
    {
      title: "JEE Mains Achievement",
      description: "Secured a 91% in the JEE Mains exam", // Updated text
      type: "Academic Achievement",
      icon: <Trophy className="w-6 h-6 text-white" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Intermediate Topper",
      description: "Ranked as the top student in Intermediate", // Updated text
      type: "Academic Achievement",
      icon: <Star className="w-6 h-6 text-white" />,
      color: "from-pink-500 to-purple-500",
    },
    {
      title: "Advanced Embedded Systems",
      description: "Certification from Vector India", // Updated text
      type: "Technical Certification",
      icon: <Award className="w-6 h-6 text-white" />,
      color: "from-green-500 to-cyan-500",
    },
    {
      title: "AI: Transformative Learning with Tech Saksham",
      description: "Certification from AICTE, Microsoft, and SAP", // Updated text
      type: "Technical Certification",
      icon: <Award className="w-6 h-6 text-white" />,
      color: "from-indigo-500 to-blue-500",
    },
  ]

  return (
    <div className="py-8">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {achievements.map((achievement, index) => (
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
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center`}
                >
                  {achievement.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-black text-border">{achievement.title}</h3>
                </div>
                <p className="text-sm mb-2 font-black text-red-700">{achievement.type}</p>
                <p className="text-white font-semibold">{achievement.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
