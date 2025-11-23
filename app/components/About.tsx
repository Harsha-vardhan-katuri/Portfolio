"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"

export default function About() {
  const education = [
    {
      degree: "B.Tech ECE", // Updated based on resume
      school: "Gudlavalleru Engineering College",
      period: "2019 – 2023",
      grade: "8.36",
    },
    {
      degree: "Intermediate MPC", // Updated based on resume
      school: "Narayana Junior College",
      period: "2017 – 2019",
      grade: "9.94",
    },
  ]

  const skills = [
    { name: "Firmware Development", progress: 95 }, // Updated skills
    { name: "Embedded C/C++", progress: 92 },
    { name: "IoT Solutions", progress: 90 },
    { name: "Communication Protocols", progress: 88 },
  ]

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            About <span className="text-orange-500 font-black">Me</span>
          </h2>
          <p className="text-cyan-500 max-w-2xl mx-auto font-black">
            Passionate firmware engineer specializing in embedded systems and IoT solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-transparent rounded-lg p-8"
          >
            <h3 className="text-2xl font-black mb-6 text-green-500">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1">
                    <GraduationCap className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-white">{edu.degree}</h4>
                    <p className="text-purple-500 font-black">{edu.school}</p>
                    <p className="text-sm text-yellow-500 font-black">
                      {edu.period} • Grade: {edu.grade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-transparent rounded-lg p-8"
          >
            <h3 className="text-2xl font-black mb-6 text-indigo-500">Skills</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-black text-white">{skill.name}</span>
                    <span className="font-black text-red-500">{skill.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                      style={{ width: `${skill.progress}%` }}
                    />
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
          className="mt-12 bg-transparent rounded-lg p-8 text-center"
        >
          <p className="text-white text-lg leading-relaxed font-semibold">
            I am a dedicated <span className="text-orange-500 font-black">Firmware Engineer</span> currently working at
            HealthCube Private Limited, specializing in embedded systems and IoT solutions. My expertise lies in
            designing core firmware, executing board bring-up, and implementing communication protocols like{" "}
            <span className="text-cyan-500 font-black">UART, I2C, SPI, and RS485</span>. I have hands-on experience in
            developing <span className="text-pink-500 font-black">LoRa soil monitoring systems</span> and analyzing
            device logs for system stability.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
