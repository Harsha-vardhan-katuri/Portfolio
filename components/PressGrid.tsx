'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface PressItem {
  id: string
  title: string
  description: string
  year: string
}

const pressItems: PressItem[] = [
  {
    id: '1',
    title: 'Featured in Design Weekly',
    description: 'Recognition for innovative UI/UX design patterns',
    year: '2024',
  },
  {
    id: '2',
    title: 'TechCrunch Interview',
    description: 'Discussing modern web development practices',
    year: '2023',
  },
  {
    id: '3',
    title: 'Speaking at Web Summit',
    description: 'Keynote on interactive animations and performance',
    year: '2023',
  },
  {
    id: '4',
    title: 'Award: Best Portfolio Design',
    description: 'Interactive portfolio excellence award',
    year: '2024',
  },
]

export function PressGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pressItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative group cursor-pointer"
          >
            <motion.div
              className="relative p-6 border border-slate-700/40 bg-slate-900/20 backdrop-blur-sm rounded overflow-hidden"
              animate={{
                x: hoveredId === item.id ? 8 : 0,
                backgroundColor: hoveredId === item.id ? 'rgba(15, 23, 42, 0.4)' : 'rgba(15, 23, 42, 0.2)',
              }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{
                  x: hoveredId === item.id ? 400 : -400,
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-light text-slate-100">{item.title}</h3>
                  <span className="text-xs font-light text-slate-500 ml-4">{item.year}</span>
                </div>
                <p className="text-sm font-light text-slate-400">{item.description}</p>

                {/* Hover indicator */}
                <motion.div
                  className="mt-4 flex items-center gap-2 text-slate-500"
                  animate={{
                    x: hoveredId === item.id ? 4 : 0,
                    color: hoveredId === item.id ? '#f1f5f9' : '#64748b',
                  }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <span className="text-xs">Read More</span>
                  <span className="text-xs">→</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Surrounding items dim effect */}
            {hoveredId && hoveredId !== item.id && (
              <motion.div
                className="absolute inset-0 bg-black/20 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
