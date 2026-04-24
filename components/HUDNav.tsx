'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function HUDNav() {
  const [activeSection, setActiveSection] = useState('home')

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'press', label: 'Press' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex gap-8 items-center bg-black/30 backdrop-blur-sm px-8 py-4 rounded border border-slate-700/30">
        {sections.map((section) => (
          <motion.a
            key={section.id}
            href={`#${section.id}`}
            onClick={() => setActiveSection(section.id)}
            className={`text-sm font-light tracking-wider transition-colors duration-300 ${
              activeSection === section.id ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
            whileHover={{ x: 4 }}
          >
            {section.label}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  )
}
