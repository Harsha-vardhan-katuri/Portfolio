"use client"

import { motion } from "framer-motion"
import { Code, Cpu, Network, Microscope as Microchip, Wrench } from "lucide-react"

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-8 h-8" />,
      skills: ["C", "C++", "Embedded C", "Python", "Data Structures"],
      color: "from-red-500 to-orange-500",
    },
    {
      title: "Embedded Systems",
      icon: <Cpu className="w-8 h-8" />,
      skills: [
        "Microcontroller Architectures",
        "Hardware Interfacing",
        "Linux Internals",
        "Network Protocols",
        "Device Drivers",
      ],
      color: "from-green-500 to-cyan-500",
    },
    {
      title: "Communication Protocols",
      icon: <Network className="w-8 h-8" />,
      skills: ["I2C", "SPI", "UART", "RS485", "Modbus RTU", "LoRa"],
      color: "from-pink-500 to-purple-500",
    },
    {
      title: "System on Chips",
      icon: <Microchip className="w-8 h-8" />,
      skills: ["ESP32", "ESP8266", "ARM Cortex-M", "LPC2148"],
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Tools & Platforms",
      icon: <Wrench className="w-8 h-8" />,
      skills: ["Keil IDE", "Arduino IDE", "MATLAB", "Git", "GitHub", "VS Code", "Ubuntu"],
      color: "from-yellow-500 to-orange-500",
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
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors"
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-r ${category.color} mb-4`}
            >
              <div className="text-white">{category.icon}</div>
            </div>
            <h3 className="text-xl font-black mb-4 text-white">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-cyan-500 text-white rounded-full text-sm font-black">
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
