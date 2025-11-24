"use client"

import { motion } from "framer-motion"
import { Award, Star, Trophy } from "lucide-react"

export default function Certifications() {
  const achievements = [
    {
      title: "JEE Mains Achievement",
      description: "Secured 91% in JEE Mains exam, outperforming thousands of candidates",
      type: "Academic Achievement",
      icon: <Trophy className="w-6 h-6 text-white" />,
    },
    {
      title: "Top Student Recognition",
      description: "Ranked as the top student in Intermediate education with 9.94 CGPA",
      type: "Academic Achievement",
      icon: <Star className="w-6 h-6 text-white" />,
    },
    {
      title: "Advanced Embedded Systems",
      description:
        "Comprehensive certification from Vector India covering microcontroller architectures and embedded programming",
      type: "Technical Certification",
      icon: <Award className="w-6 h-6 text-white" />,
    },
    {
      title: "AI: Transformative Learning with TechSaksham",
      description:
        "Advanced AI and machine learning certification from AICTE, Microsoft, and SAP collaboration program",
      type: "Technical Certification",
      icon: <Award className="w-6 h-6 text-white" />,
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
            className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-3 hover:scale-[1.02] hover:border-amber-400/50 transition-all duration-500 border border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-400/20 border border-amber-400/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  {achievement.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-400">
                    {achievement.title}
                  </h3>
                </div>
                <p className="text-sm mb-2 font-bold text-slate-400">{achievement.type}</p>
                <p className="text-slate-300 font-normal">{achievement.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
