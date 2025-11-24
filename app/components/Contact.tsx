"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open mail client with pre-filled data
    const mailtoLink = `mailto:katuriharshavardhan369@gmail.com?subject=Project Inquiry from ${formData.name}&body=${formData.message}`
    window.location.href = mailtoLink
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-white max-w-2xl mx-auto font-normal">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing
            together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 glass-button rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-white/50"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 glass-button rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-white/50"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 glass-button rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-white/50"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 active:scale-95 transition-all font-bold"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center justify-center gap-2 text-white">
                <Mail className="w-5 h-5" />
                <a
                  href="mailto:katuriharshavardhan369@gmail.com"
                  className="hover:text-cyan-400 transition-colors font-normal"
                >
                  katuriharshavardhan369@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
