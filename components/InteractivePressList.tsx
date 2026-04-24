'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const pressItems = [
  {
    id: 1,
    title: 'Featured in Tech Innovations',
    publication: 'Digital Trends',
    year: '2024',
    category: 'Featured',
  },
  {
    id: 2,
    title: 'Best Creative Developer',
    publication: 'Web Design Awards',
    year: '2024',
    category: 'Award',
  },
  {
    id: 3,
    title: 'Interview: The Future of Design',
    publication: 'Creative Quarterly',
    year: '2023',
    category: 'Interview',
  },
  {
    id: 4,
    title: 'Case Study: Enterprise Solutions',
    publication: 'Design Journal',
    year: '2023',
    category: 'Case Study',
  },
  {
    id: 5,
    title: 'Pioneering Motion Design',
    publication: 'Motion Graphics Mag',
    year: '2023',
    category: 'Feature',
  },
]

export function InteractivePressList() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-20">
      <motion.h2
        className="text-4xl md:text-5xl font-light text-slate-100 mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Press & Features
      </motion.h2>

      <div className="space-y-4">
        {pressItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Background glow on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-transparent rounded-lg"
              initial={{ opacity: 0, x: -100 }}
              animate={{
                opacity: hoveredId === item.id ? 1 : 0,
                x: hoveredId === item.id ? 0 : -100,
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-transparent rounded-lg"
            />

            {/* Content */}
            <motion.div
              className="relative px-6 py-6 border border-slate-700/30 rounded-lg backdrop-blur-sm cursor-pointer"
              animate={{
                backgroundColor:
                  hoveredId === item.id
                    ? 'rgba(30, 41, 59, 0.4)'
                    : 'rgba(15, 23, 42, 0.2)',
                borderColor:
                  hoveredId === item.id
                    ? 'rgba(100, 116, 139, 0.5)'
                    : 'rgba(51, 65, 85, 0.3)',
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Text Content */}
                <div className="flex-1">
                  <motion.h3
                    className="text-lg font-light text-slate-100 mb-2"
                    animate={{
                      x: hoveredId === item.id ? 12 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.title}
                  </motion.h3>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <span className="font-light">{item.publication}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-500">{item.year}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <motion.div
                  className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50"
                  animate={{
                    opacity: hoveredId === item.id ? 1 : 0.6,
                    scale: hoveredId === item.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs font-light text-slate-300">
                    {item.category}
                  </span>
                </motion.div>
              </div>

              {/* Arrow indicator */}
              <motion.div
                className="absolute right-6 top-1/2 transform -translate-y-1/2"
                animate={{
                  opacity: hoveredId === item.id ? 1 : 0,
                  x: hoveredId === item.id ? 0 : -10,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-slate-400 text-xl">→</span>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
