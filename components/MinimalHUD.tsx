'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Contact', id: 'contact' },
]

export function MinimalHUD() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollHeight > 0 ? window.scrollY / scrollHeight : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <motion.div
        className="text-lg font-light tracking-widest text-slate-100"
        whileHover={{ scale: 1.05 }}
      >
        HV
      </motion.div>

      {/* Nav Items */}
      <div className="hidden md:flex gap-12">
        {navItems.map((item) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            className="text-sm font-light text-slate-400 hover:text-slate-100 transition-colors duration-300 relative"
            whileHover={{ y: -2 }}
          >
            {item.label}
          </motion.a>
        ))}
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="w-1 h-6 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: Math.max(0.1, scrollProgress) }}
        transition={{ duration: 0.1 }}
      />
    </motion.nav>
  )
}
