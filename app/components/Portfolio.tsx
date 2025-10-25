"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Portfolio() {
  const projects = [
    {
      title: "High-Precision BLE Motion Detection",
      image: "/placeholder.svg",
      color: "from-orange-500 to-pink-500",
    },
    {
      title: "Packetized Image Transmission",
      image: "/placeholder.svg",
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "IoT Weather Reporting System",
      image: "/placeholder.svg",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-12">
          <h2 className="text-4xl font-bold">
            My latest{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Projects</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0, delay: index * 0.0008 }}
              className="group relative aspect-square rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-pink-500/30 hover:-translate-y-3 transition-all duration-300"
            >
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-75`} />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <Link
                  href="#"
                  className="inline-flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  VIEW WORK <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="#" className="inline-flex items-center text-orange-500 hover:text-orange-400 transition-colors">
            View All Projects <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
