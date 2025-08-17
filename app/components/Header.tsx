"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="fixed w-full z-50 bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-blue-600">
          Your Name
        </a>
        <nav className="hidden md:flex space-x-4">
          <a href="#about" className="text-gray-600 hover:text-blue-600">
            About
          </a>
          <a href="#experience" className="text-gray-600 hover:text-blue-600">
            Experience
          </a>
          <a href="#projects" className="text-gray-600 hover:text-blue-600">
            Projects
          </a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600">
            Contact
          </a>
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white"
        >
          <a href="#about" className="block py-2 px-4 text-gray-600 hover:text-blue-600">
            About
          </a>
          <a href="#experience" className="block py-2 px-4 text-gray-600 hover:text-blue-600">
            Experience
          </a>
          <a href="#projects" className="block py-2 px-4 text-gray-600 hover:text-blue-600">
            Projects
          </a>
          <a href="#contact" className="block py-2 px-4 text-gray-600 hover:text-blue-600">
            Contact
          </a>
        </motion.div>
      )}
    </header>
  )
}
