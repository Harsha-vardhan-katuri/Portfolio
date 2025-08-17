"use client"

import { Github, Linkedin, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function Profile() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-black/50 backdrop-blur-sm border-white/10">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Harsha Vardhan Katuri</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Embedded systems and IoT specialist with expertise in firmware development and microcontroller systems
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="tel:9676227794"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                9676227794
              </Link>
              <Link
                href="mailto:katuriharshavardhan369@gmail.com"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                katuriharshavardhan369@gmail.com
              </Link>
              <Link
                href="https://github.com/Harsha-vardhan-katuri"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub Profile
              </Link>
              <Link
                href="https://www.linkedin.com/in/harsha-vardhan-katuri-772166256/"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
