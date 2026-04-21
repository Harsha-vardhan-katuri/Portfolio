'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { pressData } from '@/data/press'

export const PressList = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
      },
    },
  }

  const hoverVariants = {
    hover: {
      x: 10,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      className="max-w-3xl mx-auto py-32 px-4 relative z-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-100px' }}
    >
      {pressData.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="flex flex-col md:flex-row justify-between items-baseline py-4 border-b border-white/10 group cursor-pointer"
        >
          {/* Publication */}
          <motion.div
            className="w-full md:w-1/3 font-bold text-sm opacity-70 mb-2 md:mb-0"
            animate={
              hoveredIndex === index
                ? { opacity: 1 }
                : hoveredIndex !== null
                  ? { opacity: 0.3 }
                  : { opacity: 0.7 }
            }
            transition={{ duration: 0.3 }}
          >
            <motion.span className="text-[#e5e5e5]">{item.publication}</motion.span>
          </motion.div>

          {/* Title */}
          <motion.div
            className="w-full md:w-2/3 font-light text-lg text-[#e5e5e5]"
            variants={hoveredIndex === index ? hoverVariants : {}}
            animate={
              hoveredIndex === index
                ? { x: 10 }
                : hoveredIndex !== null
                  ? { x: 0, opacity: 0.3 }
                  : { x: 0, opacity: 1 }
            }
            transition={{
              duration: 0.3,
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
          >
            {item.title}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
