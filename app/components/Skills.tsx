"use client"

import { motion } from "framer-motion"
import { Code, Cpu, Network, Wrench } from "lucide-react"

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-8 h-8" />,
      skills: ["C/C++", "Embedded C", "Data Structures", "Python"], // Updated based on resume
      color: "from-red-500 to-orange-500",
    },
    {
      title: "Embedded & Hardware", // Updated title
      icon: <Cpu className="w-8 h-8" />,
      skills: [
        "Microcontroller architectures",
        "Hardware interfacing",
        "Board bring-up",
        "UART/SPI/I2C/RS485",
        "Modbus",
        "Hardware debugging",
      ],
      color: "from-green-500 to-cyan-500",
    },
    {
      title: "SoCs, Tools & Platforms", // Updated title
      icon: <Wrench className="w-8 h-8" />,
      skills: ["ESP32", "ESP01", "LPC2148", "Keil IDE", "Arduino IDE", "Git/GitHub", "Ubuntu"], // Updated skills
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Standards & Processes", // New category based on resume
      icon: <Network className="w-8 h-8" />,
      skills: ["ISO 13485", "IEC 60601", "Product Development SOPs", "Verification & Validation"], // Updated skills
      color: "from-pink-500 to-purple-500",
    },
  ]

  return (
    <div className="py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0, delay: index * 0.0008, ease: "easeOut" }}
            className="rounded-lg p-6 bg-transparent hover:shadow-2xl hover:shadow-sky-500/30 hover:-translate-y-3 transition-all duration-300"
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-r ${category.color} mb-4`}
            >
              <div className="text-white">{category.icon}</div>
            </div>
            <h3 className="text-xl font-black mb-4 text-white">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-white rounded-full text-sm font-black bg-[rgba(20,12,243,1)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
