"use client"

import { motion } from "framer-motion"
import { Code, Cpu, Network, Microscope as Microchip, Shield, CheckCircle } from "lucide-react"

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-5 h-5 md:w-6 md:h-6" />,
      skills: [
        { name: "C", level: 95 },
        { name: "C++", level: 90 },
        { name: "Embedded C", level: 95 },
        { name: "Python", level: 85 },
        { name: "Data Structures", level: 80 },
      ],
    },
    {
      title: "Embedded Systems",
      icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" />,
      skills: [
        { name: "Microcontroller Arch.", level: 90 },
        { name: "Hardware Interfacing", level: 95 },
        { name: "Linux Internals", level: 75 },
        { name: "Device Drivers", level: 70 },
        { name: "Board Bring-up", level: 85 },
      ],
    },
    {
      title: "Communication Protocols",
      icon: <Network className="w-5 h-5 md:w-6 md:h-6" />,
      skills: [
        { name: "I2C / SPI / UART", level: 95 },
        { name: "RS485 / Modbus", level: 90 },
        { name: "LoRa", level: 85 },
        { name: "MQTT / HTTP", level: 80 },
      ],
    },
    {
      title: "Hardware & Testing",
      icon: <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />,
      skills: [
        { name: "Component Fault ID", level: 90 },
        { name: "Root Cause Analysis", level: 85 },
        { name: "Voltage/Continuity Test", level: 95 },
        { name: "Soldering", level: 90 },
        { name: "Hardware Debugging", level: 88 },
      ],
    },
    {
      title: "System on Chips",
      icon: <Microchip className="w-5 h-5 md:w-6 md:h-6" />,
      skills: [
        { name: "ESP32 / ESP8266", level: 95 },
        { name: "ARM Cortex-M", level: 85 },
        { name: "LPC2148", level: 80 },
        { name: "Arduino", level: 95 },
      ],
    },
    {
      title: "Standards & Tools",
      icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />,
      skills: [
        { name: "ISO 13485 / IEC 60601", level: 80 },
        { name: "Keil / Eclipse IDE", level: 90 },
        { name: "Git / GitHub / GitLab", level: 90 },
        { name: "VS Code / Ubuntu", level: 95 },
      ],
    },
  ]

  return (
    <div className="py-4 md:py-8">
      <div className="text-center mb-6 md:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">Technical Skills</h2>
        <p className="text-slate-300 font-medium mt-2 text-sm md:text-base px-2">
          Core competencies in programming, embedded systems, and protocols
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0, delay: index * 0.0008, ease: "easeOut" }}
            className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 border-b border-white/20 pb-3 md:pb-4">
              <div className="p-1.5 md:p-2 rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-white group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-base md:text-xl font-bold text-white">{category.title}</h3>
            </div>
            <div className="space-y-3 md:space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white font-medium text-xs md:text-sm">{skill.name}</span>
                    <span className="text-cyan-400 text-xs font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-cyan-500/50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
