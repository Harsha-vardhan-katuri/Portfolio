"use client"

import { Monitor, Cpu, Database } from "lucide-react"
import { motion } from "framer-motion"

export default function Services() {
  const services = [
    {
      title: "Embedded Systems",
      description: "Expert in microcontroller architectures, hardware interfacing, and device drivers",
      icon: <Cpu className="w-12 h-12" />,
      projects: "21",
    },
    {
      title: "IoT Solutions",
      description: "Specialized in developing IoT applications with real-time monitoring and control",
      icon: <Monitor className="w-12 h-12" />,
      projects: "18",
    },
    {
      title: "Firmware Development",
      description: "Custom firmware solutions for various microcontrollers and embedded systems",
      icon: <Database className="w-12 h-12" />,
      projects: "25",
    },
  ]

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            How can <span className="text-red-500 font-black">I help you</span>
          </h2>
          <p className="text-cyan-500 max-w-2xl mx-auto font-black">
            Specialized in embedded systems and IoT solutions, offering expertise in firmware development and hardware
            integration
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors"
            >
              <div className="text-orange-500 mb-4">{service.icon}</div>
              <h3 className="text-xl font-black mb-2 text-white">{service.title}</h3>
              <p className="text-gray-400 mb-4 font-semibold">{service.description}</p>
              <div className="text-sm text-green-500 font-black">{service.projects} Projects</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
