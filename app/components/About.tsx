"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"

export default function About() {
  const education = [
    {
      degree: "B.Tech in Electronics and Communication Engineering",
      school: "Gudlavalleru Engineering College",
      period: "2019 - 2023",
      grade: "8.36",
    },
    {
      degree: "Intermediate in MPC",
      school: "Narayana Junior College",
      period: "2017 - 2019",
      grade: "9.94",
    },
  ]

  // Skills moved to main Skills component as requested, simplifying About to just About/Education highlights

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* Removed colorful text classes */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            About <span className="text-white font-bold">Me</span>
          </h2>
          <p className="text-white max-w-2xl mx-auto font-bold">
            Passionate firmware engineer specializing in embedded systems and IoT solutions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-transparent rounded-lg p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{edu.degree}</h4>
                    <p className="text-white font-bold">{edu.school}</p>
                    <p className="text-sm text-white font-bold">
                      {edu.period} • Grade: {edu.grade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-transparent rounded-lg p-8 text-center border border-white/10"
        >
          <p className="text-white text-lg leading-relaxed font-normal">
            I am a dedicated <span className="text-white font-bold">Firmware Engineer</span> currently working at
            HealthCube Private Limited, specializing in embedded systems and IoT solutions. My expertise lies in
            developing robust firmware for microcontrollers, particularly{" "}
            <span className="text-white font-bold">ESP32</span>, and implementing various communication protocols
            including <span className="text-white font-bold">LoRa, RS485, UART, I2C, and SPI</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
