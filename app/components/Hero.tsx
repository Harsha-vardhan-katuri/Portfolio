"use client"

import { motion } from "framer-motion"
import { Linkedin, Mail, Download, Github, Phone, MapPin, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import Skills from "./Skills"
import Education from "./Education"
import Projects from "./Projects"
import Certifications from "./Certifications"
import Experience from "./Experience"
import Navigation from "./Navigation"
import SimpleBackground from "./animations/SimpleBackground"

export default function Hero() {
  const [activeSection, setActiveSection] = useState("home")
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const userClickedRef = useRef(false)

  useEffect(() => {
    const sections = ["home", "about", "experience", "skills", "projects", "education", "certifications", "hire"]

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (!userClickedRef.current) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const handleResumeDownload = () => {
    window.open("https://drive.google.com/file/d/12LjzYqlAkPaz9xmxxNB0uoS1poytS9me/view?usp=drive_link", "_blank")
  }

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText("katuriharshavardhan369@gmail.com")
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
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

  return (
    <section className="relative overflow-hidden">
      <SimpleBackground />

      <Navigation
        activeSection={activeSection}
        setActiveSection={(section) => {
          userClickedRef.current = true
          setActiveSection(section)
          setTimeout(() => {
            userClickedRef.current = false
          }, 1000)
        }}
      />

      <div className="relative z-10">
        <div id="home" className="min-h-screen flex items-center justify-center pt-16 md:pt-20 px-3 md:px-4">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-8 max-w-2xl mx-auto">
            {/* Profile Image - smaller on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="relative w-[140px] h-[140px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] pixelate-reveal"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-3 md:border-4 border-white">
                <Image
                  src="/images/design-mode/harsha.jpg(1).jpeg"
                  alt="Harsha Vardhan Katuri"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 140px, (max-width: 768px) 200px, 250px"
                />
              </div>
            </motion.div>

            {/* Name - responsive text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white pixelate-reveal"
            >
              Harsha Vardhan Katuri
            </motion.h1>

            {/* Title - responsive */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl font-bold pixelate-reveal text-gradient"
            >
              Firmware Engineer
            </motion.h2>

            {/* Subtitle - responsive */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-sm sm:text-base md:text-lg font-bold pixelate-reveal text-white"
            >
              Specialized in Embedded Systems & IoT Solutions
            </motion.p>

            {/* Location - responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-2 md:gap-4 text-white font-bold pixelate-reveal text-sm md:text-base"
            >
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                Bengaluru, Karnataka
              </div>
            </motion.div>

            {/* Description - hidden on very small screens, compact on mobile */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-white max-w-3xl leading-relaxed font-normal pixelate-reveal text-sm md:text-base px-2 hidden sm:block"
            >
              Currently working as a <span className="font-bold text-white">Firmware Engineer</span> at HealthCube
              Private Limited, developing <span className="font-bold text-white">LoRa-enabled soil</span> health
              monitoring systems and contributing to production-grade{" "}
              <span className="font-bold text-white">medical device firmware</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-2 md:gap-4 mt-4 md:mt-8 pixelate-reveal w-full sm:w-auto"
            >
              <button
                className="glass-button text-white font-bold flex items-center justify-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl hover:scale-105 active:scale-95 transition-all text-xs md:text-base"
                onClick={handleEmailCopy}
              >
                {copiedEmail ? <Check className="w-3 h-3 md:w-4 md:h-4" /> : <Mail className="w-3 h-3 md:w-4 md:h-4" />}
                <span className="hidden sm:inline">{copiedEmail ? "Copied!" : "Gmail"}</span>
              </button>

              <button
                className="glass-button text-white font-bold px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-1 md:gap-2 hover:scale-105 active:scale-95 transition-all text-xs md:text-base"
                onClick={handlePhoneCopy}
              >
                {copiedPhone ? (
                  <Check className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <Phone className="w-3 h-3 md:w-4 md:h-4" />
                )}
                <span className="hidden sm:inline">{copiedPhone ? "Copied!" : "Contact"}</span>
              </button>

              <Link href="https://github.com/Harsha-vardhan-katuri" target="_blank" className="contents">
                <button className="glass-button text-white font-bold px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-1 md:gap-2 hover:scale-105 active:scale-95 transition-all text-xs md:text-base">
                  <Github className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </button>
              </Link>

              <Link
                href="https://www.linkedin.com/in/harsha-vardhan-katuri-772166256/"
                target="_blank"
                className="contents"
              >
                <button className="glass-button text-white font-bold px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-1 md:gap-2 hover:scale-105 active:scale-95 transition-all text-xs md:text-base">
                  <Linkedin className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </button>
              </Link>

              <button
                className="glass-button text-white font-bold px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-1 md:gap-2 hover:scale-105 active:scale-95 transition-all text-xs md:text-base col-span-2 sm:col-span-1"
                onClick={handleResumeDownload}
              >
                <Download className="w-3 h-3 md:w-4 md:h-4" />
                <span>Resume</span>
              </button>
            </motion.div>
          </div>
        </div>

        <div id="about" className="min-h-screen flex items-center justify-center pt-16 md:pt-20 px-3 md:px-4">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-8 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-8 text-gradient">About Me</h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-8 text-left"
            >
              <p className="text-white text-sm md:text-lg leading-relaxed mb-4 md:mb-6 font-normal">
                I am a dedicated <span className="font-bold text-white">Firmware Engineer</span> currently working at
                HealthCube Private Limited, specializing in embedded systems and IoT solutions. My expertise lies in
                developing robust firmware for microcontrollers, particularly{" "}
                <span className="font-bold text-white">ESP32</span>, and implementing various communication protocols
                including <span className="font-bold text-white">LoRa, RS485, UART, I2C, and SPI</span>.
              </p>
              <p className="text-white text-sm md:text-lg leading-relaxed font-normal hidden sm:block">
                With hands-on experience in <span className="font-bold text-white">agricultural IoT systems</span> and{" "}
                <span className="font-bold text-white">medical device firmware</span>, I focus on creating efficient,
                low-power solutions that deliver reliable performance in real-world applications.
              </p>
            </motion.div>
          </div>
        </div>

        <div id="experience" className="min-h-screen flex flex-col justify-center pt-12 md:pt-16 px-3 md:px-4">
          <Experience />
        </div>

        <div id="skills" className="min-h-screen flex flex-col justify-center pt-12 md:pt-16 px-3 md:px-4">
          <Skills />
        </div>

        <div id="projects" className="min-h-screen flex flex-col justify-center pt-12 md:pt-16 px-3 md:px-4">
          <Projects />
        </div>

        <div id="education" className="min-h-screen flex flex-col justify-center pt-12 md:pt-16 px-3 md:px-4">
          <Education />
        </div>

        <div id="certifications" className="min-h-screen flex flex-col justify-center pt-12 md:pt-16 px-3 md:px-4">
          <Certifications />
        </div>

        <div id="hire" className="min-h-screen flex items-center justify-center pt-16 md:pt-20 px-3 md:px-4">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center mb-4 md:mb-8"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-gradient">
                Let's Work Together
              </h2>
              <p className="max-w-2xl mx-auto font-bold text-base md:text-xl text-white px-2">
                Ready to bring your embedded systems and IoT projects to life
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="gradient-border w-full"
            >
              <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-8 text-center space-y-4 md:space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">
                  Available for Freelance Projects
                </h3>
                <p className="text-white text-sm md:text-lg font-normal mb-4 md:mb-6">
                  I'm currently available for <span className="font-bold text-gradient">firmware development</span>,{" "}
                  <span className="font-bold text-gradient">IoT solutions</span>, and{" "}
                  <span className="font-bold text-gradient">embedded systems</span> projects.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                  <button
                    className="glass-button text-white font-bold px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm md:text-base"
                    onClick={() => (window.location.href = "mailto:katuriharshavardhan369@gmail.com")}
                  >
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    Email Me
                  </button>

                  <Link
                    href="https://www.linkedin.com/in/harsha-vardhan-katuri-772166256/"
                    target="_blank"
                    className="contents"
                  >
                    <button className="glass-button text-white font-bold px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm md:text-base">
                      <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                      Connect on LinkedIn
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
