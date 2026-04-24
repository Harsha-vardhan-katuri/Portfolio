'use client'

import { motion } from 'framer-motion'
import { DarkShaderBackground } from '@/components/DarkShaderBackground'
import { HUDNav } from '@/components/HUDNav'
import { PressGrid } from '@/components/PressGrid'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <DarkShaderBackground />
      <HUDNav />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          className="text-center max-w-3xl px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-slate-100"
          >
            Harsha Vardhan
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl font-light text-slate-400 mb-8"
          >
            Creative Developer & Designer
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-lg font-light text-slate-500 max-w-xl mx-auto leading-relaxed"
          >
            Crafting premium digital experiences with cutting-edge technology and meticulous attention to detail. Specializing in interactive animations, smooth scrolling, and immersive web design.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-12 flex gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-slate-700 text-slate-300 font-light rounded transition-all duration-300 hover:text-slate-100"
            >
              View Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(51, 65, 85, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-slate-800/40 border border-slate-700 text-slate-300 font-light rounded transition-all duration-300 hover:text-slate-100"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Press Section */}
      <section id="press" className="min-h-screen flex items-center justify-center py-20">
        <div className="w-full px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-5xl md:text-6xl font-light text-center mb-20 text-slate-100"
          >
            Press & Features
          </motion.h2>
          <PressGrid />
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center max-w-2xl px-6"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-slate-100">Selected Work</h2>
          <p className="text-lg font-light text-slate-400 leading-relaxed">
            Portfolio projects showcasing expertise in web design, interactive experiences, and digital innovation.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center max-w-2xl px-6"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-slate-100">Let's Create</h2>
          <p className="text-lg font-light text-slate-400 mb-12 leading-relaxed">
            Ready to discuss your next project? I'm always interested in hearing about new ideas and opportunities.
          </p>
          <motion.a
            href="mailto:hello@example.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 border border-slate-700 text-slate-300 font-light rounded transition-all duration-300 hover:text-slate-100 hover:bg-slate-800/30"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </section>
    </main>
  )
}
