"use client"

import { motion } from "framer-motion"
import { Linkedin, Mail, Download, Github, Phone, MapPin, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import FallingCubes from "./FallingCubes"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Skills from "./Skills"
import Education from "./Education"
import Projects from "./Projects"
import Certifications from "./Certifications"
import Experience from "./Experience"
import Navigation from "./Navigation"

export default function Hero() {
  const [activeSection, setActiveSection] = useState("home")
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const handleResumeDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a")
    link.href = "/resume.pdf" // Assuming resume is in public folder
    link.download = "Harsha_Vardhan_Katuri_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText("katuriharshavardhan369@gmail.com")
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = "katuriharshavardhan369@gmail.com"
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    }
  }

  const handlePhoneCopy = async () => {
    try {
      await navigator.clipboard.writeText("9676227794")
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = "9676227794"
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    }
  }

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return (
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                About <span className="text-orange-500 font-black">Me</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-900 rounded-lg p-8 text-left"
            >
              <p className="text-white text-lg leading-relaxed mb-6 font-semibold">
                I am a dedicated <span className="text-orange-500 font-black">Firmware Engineer</span> currently working
                at HealthCube Private Limited, specializing in embedded systems and IoT solutions. My expertise lies in
                developing robust firmware for microcontrollers, particularly{" "}
                <span className="text-cyan-500 font-black">ESP32</span>, and implementing various communication
                protocols including <span className="text-pink-500 font-black">LoRa, RS485, UART, I2C, and SPI</span>.
              </p>
              <p className="text-white text-lg leading-relaxed font-semibold">
                With hands-on experience in <span className="text-green-500 font-black">agricultural IoT systems</span>{" "}
                and <span className="text-purple-500 font-black">medical device firmware</span>, I focus on creating
                efficient, low-power solutions that deliver reliable performance in real-world applications. My recent
                work includes developing a <span className="text-indigo-500 font-black">LoRa-enabled soil health</span>{" "}
                monitoring system and contributing to production-grade medical device firmware.
              </p>
            </motion.div>
          </div>
        )
      case "experience":
        return <Experience />
      case "skills":
        return <Skills />
      case "projects":
        return <Projects />
      case "education":
        return <Education />
      case "certifications":
        return <Certifications />
      case "hire":
        return (
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Let's Work <span className="text-red-500 font-black">Together</span>
              </h2>
              <p className="text-cyan-500 max-w-2xl mx-auto font-black text-xl">
                Ready to bring your embedded systems and IoT projects to life
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-900 rounded-lg p-8 text-center space-y-6"
            >
              <h3 className="text-2xl font-black text-white mb-4">Available for Freelance Projects</h3>
              <p className="text-white text-lg font-black mb-6">
                I'm currently available for <span className="text-orange-500 font-black">firmware development</span>,{" "}
                <span className="text-green-500 font-black">IoT solutions</span>, and{" "}
                <span className="text-pink-500 font-black">embedded systems</span> projects. Let's discuss how I can
                help bring your ideas to reality.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-red-500 hover:bg-red-600 text-white font-black px-8 py-3" asChild>
                  <Link href="mailto:katuriharshavardhan369@gmail.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Me
                  </Link>
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-white font-black px-8 py-3" asChild>
                  <Link href="https://www.linkedin.com/in/harsha-vardhan-katuri-772166256/" target="_blank">
                    <Linkedin className="w-5 h-5 mr-2" />
                    Connect on LinkedIn
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px]"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-black">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/harsha.jpg-uphx2UA7uij7KGB4m98IHwrQgB7JhD.jpeg"
                  alt="Harsha Vardhan Katuri"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 200px, 250px"
                />
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-black text-white"
            >
              Harsha Vardhan Katuri
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl font-black text-blue-600"
              style={{ fontWeight: 900 }}
            >
              Firmware Engineer
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-orange-500 font-black"
            >
              Specialized in Embedded Systems & IoT Solutions
            </motion.p>

            {/* Location and Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 text-green-500 font-black"
            >
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Bengaluru, Karnataka, 560068
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white max-w-3xl leading-relaxed font-semibold"
            >
              Currently working as a <span className="text-pink-500 font-black">Firmware Engineer</span> at HealthCube
              Private Limited, developing <span className="text-cyan-500 font-black">LoRa-enabled soil</span> health
              monitoring systems and contributing to production-grade{" "}
              <span className="text-purple-500 font-black">medical device firmware</span>. Experienced in C/C++,
              embedded firmware development, and IoT solutions with expertise in microcontroller architectures and
              communication protocols.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <Button
                className="bg-red-500 hover:bg-red-600 text-white font-black flex items-center gap-2 relative"
                onClick={handleEmailCopy}
              >
                {copiedEmail ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                {copiedEmail ? "Email Copied!" : "Gmail"}
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-white hover:bg-orange-500 hover:text-white bg-orange-500 font-black relative"
                onClick={handlePhoneCopy}
              >
                {copiedPhone ? <Check className="w-4 h-4 mr-2" /> : <Phone className="w-4 h-4 mr-2" />}
                {copiedPhone ? "Number Copied!" : "Contact"}
              </Button>
              <Button
                variant="outline"
                className="border-green-500 text-white hover:bg-green-500 hover:text-black bg-green-500 font-black"
                asChild
              >
                <Link href="https://github.com/Harsha-vardhan-katuri" target="_blank">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-pink-500 text-white hover:bg-pink-500 hover:text-white bg-pink-500 font-black"
                asChild
              >
                <Link href="https://www.linkedin.com/in/harsha-vardhan-katuri-772166256/" target="_blank">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-cyan-500 text-white hover:bg-cyan-500 hover:text-white bg-cyan-500 font-black"
                onClick={handleResumeDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </motion.div>
          </div>
        )
    }
  }

  return (
    <section className="min-h-screen relative bg-black overflow-hidden" id="home">
      <FallingCubes />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Content Area */}
      <div className="pt-20 px-4 min-h-screen flex items-center justify-center relative z-10">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-7xl"
        >
          {renderSection()}
        </motion.div>
      </div>
    </section>
  )
}
