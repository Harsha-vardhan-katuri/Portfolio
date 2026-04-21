'use client'

import { motion } from 'framer-motion'

const navItems = ['home', 'work', 'prototypes', 'art', 'press', 'info', 'reel']

export const NavHeader = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="fixed bottom-8 left-0 right-0 z-20 flex justify-center pointer-events-auto"
    >
      <div className="flex gap-8 items-center">
        {navItems.map((item, index) => (
          <motion.a
            key={item}
            href={`#${item}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            whileHover={{ textShadow: '0 0 8px rgba(229, 229, 229, 0.5)' }}
            className="text-xs uppercase tracking-widest text-[#e5e5e5] hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          >
            {item}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  )
}
