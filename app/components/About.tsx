"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">About Me</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-500 mb-12"
        >
          <div className="space-y-6">
            <p className="text-slate-200 text-base md:text-lg leading-relaxed font-normal">
              I am an <span className="text-cyan-400 font-bold">Embedded / Firmware Engineer</span> with hands-on
              experience in developing bare-metal and embedded software for microcontroller-based systems. My work
              focuses on{" "}
              <span className="text-purple-400 font-bold">
                low-level firmware development, register-level programming, hardware interfacing, board bring-up, and
                debugging
              </span>{" "}
              across ESP32 and other embedded platforms.
            </p>

            <p className="text-slate-200 text-base md:text-lg leading-relaxed font-normal">
              I have worked on real-world projects involving{" "}
              <span className="text-pink-400 font-bold">
                communication protocols, sensor integration, packet-based data processing, and IoT systems
              </span>
              , along with practical exposure to firmware testing, issue analysis, and system stability improvement. I
              enjoy working close to hardware, understanding how software interacts with electronics at the register and
              signal level.
            </p>

            <p className="text-slate-200 text-base md:text-lg leading-relaxed font-normal">
              I am continuously learning production-grade embedded development practices and enjoy collaborating with
              cross-functional teams to build{" "}
              <span className="text-sky-400 font-bold">reliable, efficient, and well-structured embedded systems</span>.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-500"
        >
          <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Education
          </h3>

          <div className="space-y-8">
            <div className="flex gap-4">
              <GraduationCap className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-white">B.Tech in Electronics and Communication Engineering</h4>
                <p className="text-slate-300 font-semibold mt-1">Gudlavalleru Engineering College</p>
                <p className="text-sm text-slate-400 mt-1">2019 - 2023 • Grade: 8.36</p>
              </div>
            </div>

            <div className="flex gap-4">
              <GraduationCap className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-white">Intermediate in MPC</h4>
                <p className="text-slate-300 font-semibold mt-1">Narayana Junior College</p>
                <p className="text-sm text-slate-400 mt-1">2017 - 2019 • Grade: 9.94</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
