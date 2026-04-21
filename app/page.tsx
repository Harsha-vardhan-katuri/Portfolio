'use client'

import { WebGLBackground } from '@/components/WebGLBackground'
import { NavHeader } from '@/components/NavHeader'
import { PressList } from '@/components/PressList'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-[#e5e5e5] overflow-x-hidden">
      <WebGLBackground />

      {/* HUD Overlay */}
      <div className="relative z-10 pointer-events-none">
        {/* Hero Section */}
        <motion.section
          className="min-h-screen flex flex-col items-center justify-center px-4 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center max-w-2xl"
          >
            <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-[#e5e5e5]">
              Harsha Vardhan
            </h1>
            <p className="text-lg md:text-xl font-light text-[#e5e5e5]/70 mb-8">
              Creative Developer & Designer
            </p>
            <p className="text-sm md:text-base font-light text-[#e5e5e5]/50 max-w-lg mx-auto">
              Crafting premium digital experiences with cutting-edge technology and meticulous attention to detail.
            </p>
          </motion.div>
        </motion.section>

        {/* Press List Section */}
        <section className="relative min-h-screen flex items-center justify-center pointer-events-auto">
          <div className="w-full">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="text-4xl md:text-5xl font-light text-center mb-16 text-[#e5e5e5]"
            >
              Press & Features
            </motion.h2>
            <PressList />
          </div>
        </section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="min-h-screen flex items-center justify-center text-center px-4 pointer-events-auto"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-[#e5e5e5]">Let's Create</h2>
            <p className="text-lg text-[#e5e5e5]/70 mb-8 max-w-lg mx-auto">
              Ready to discuss your next project? Reach out and let's build something extraordinary together.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-[#e5e5e5]/30 text-[#e5e5e5] hover:bg-[#e5e5e5]/5 transition-colors duration-300"
            >
              Get in Touch
            </motion.button>
          </div>
        </motion.footer>
      </div>

      {/* Navigation */}
      <NavHeader />
    </main>
  )
}
