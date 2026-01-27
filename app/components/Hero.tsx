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
import GlowingRingAnimation from "./animations/GlowingRingAnimation"

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
    window.open("https://drive.google.com/file/d/1pACp9kZzcZYo4HuaHVCS2jDJx8cQUKrf/view?usp=drive_link", "_blank")
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
        {/* Home Section */}
        <div id="home" className="min-h-screen flex items-center justify-center pt-16 md:pt-20 px-3 md:px-4">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start md:pt-12">
              {/* Left Column - Photo with info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="hidden md:flex flex-col items-center md:items-start border-0 mx-8 my-0 py-0 px-0"
              >
                {/* Profile Image - moved right and up */}
                <div className="relative w-[180px] h-[180px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] rounded-full overflow-hidden border-4 md:border-4 border-white shadow-lg ml-8">
                  <Image
                    src="/images/design-mode/harsha.jpg(1).jpeg"
                    alt="Harsha Vardhan Katuri"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 250px"
                  />
                </div>

                {/* Info below photo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-6 text-center md:text-left md:mt-8 mb-0 space-y-3 ml-12 w-full"
                >
                  {/* Role */}
                  <h3 className="text-lg md:text-xl font-bold text-gradient">Firmware Engineer</h3>

                  {/* Specialization */}
                  <p className="text-sm md:text-base text-slate-300">Specialized in Embedded Systems & IoT Solutions</p>

                  {/* Location */}
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm md:text-base text-white font-semibold">
                    <MapPin className="w-4 h-4" />
                    <span>Bengaluru, Karnataka</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Name and details / Mobile Full View */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col justify-start space-y-6 md:col-span-1 col-span-1"
              >
                {/* Mobile Photo - Only shows on mobile */}
                <div className="md:hidden mb-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center space-y-4"
                  >
                    {/* Photo first */}
                    <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src="/images/design-mode/harsha.jpg(1).jpeg"
                        alt="Harsha Vardhan Katuri"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Name */}
                    <div className="space-y-1">
                      <div className="overflow-hidden">
                        <GlowingRingAnimation text="HARSHA VARDHAN" ringColor="#0055ff" glowColor="#0044ff" />
                      </div>
                      <div className="overflow-hidden">
                        <GlowingRingAnimation text="KATURI" ringColor="#ec4899" glowColor="#db2777" />
                      </div>
                    </div>

                    {/* Role and details */}
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-bold text-gradient">Firmware Engineer</h3>
                      <p className="text-xs text-slate-300">Specialized in Embedded Systems & IoT Solutions</p>
                      <div className="flex items-center justify-center gap-2 text-xs text-white font-semibold">
                        <MapPin className="w-3 h-3" />
                        <span>Bengaluru, Karnataka</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Full Name - Split across lines with glowing animation (Desktop only) */}
                <div className="hidden md:block space-y-1">
                  <div className="overflow-hidden">
                    <GlowingRingAnimation text="HARSHA VARDHAN" ringColor="#0055ff" glowColor="#0044ff" />
                  </div>
                  <div className="overflow-hidden">
                    <GlowingRingAnimation text="KATURI" ringColor="#ec4899" glowColor="#db2777" />
                  </div>
                </div>

                {/* Currently Working */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-sm md:text-base text-slate-300 leading-relaxed"
                >
                  Currently working as a <span className="font-bold text-white">Firmware Engineer</span> at{" "}
                  <span className="font-bold text-purple-400">HealthCube Private Limited</span>, developing{" "}
                  <span className="font-bold text-cyan-400">LoRa-enabled soil</span> health monitoring systems and
                  contributing to production-grade <span className="font-bold text-pink-400">medical device firmware</span>.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap gap-3 pt-4"
                >
                  <button
                    className="glass-button text-white font-bold flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm md:text-base"
                    onClick={handleEmailCopy}
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                    <span>{copiedEmail ? "Copied!" : "Gmail"}</span>
                  </button>

                  <button
                    className="glass-button text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm md:text-base"
                    onClick={handlePhoneCopy}
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                    <span>{copiedPhone ? "Copied!" : "Contact"}</span>
                  </button>

                  <Link href="https://github.com/Harsha-vardhan-katuri" target="_blank" className="contents">
                    <button className="glass-button text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm md:text-base">
                      <Github className="w-4 h-4 md:w-5 md:h-5" />
                      <span>GitHub</span>
                    </button>
                  </Link>

                  <Link
                    href="https://www.linkedin.com/in/harsha-vardhan-katuri-772166256/"
                    target="_blank"
                    className="contents"
                  >
                    <button className="glass-button text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm md:text-base">
                      <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                      <span>LinkedIn</span>
                    </button>
                  </Link>

                  <button
                    className="glass-button text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm md:text-base"
                    onClick={handleResumeDownload}
                  >
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Resume</span>
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="min-h-screen flex items-center justify-center pt-16 md:pt-20 px-3 md:px-4">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-8 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-8 text-gradient">About Me</h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-8 text-left"
            >
              <p className="text-white text-sm md:text-lg leading-relaxed mb-4 md:mb-6 font-normal">
                I am an <span className="font-bold text-cyan-400">Embedded / Firmware Engineer</span> with hands-on
                experience in developing bare-metal and embedded software for microcontroller-based systems. My work
                focuses on <span className="font-bold text-purple-400">low-level firmware development</span>,{" "}
                <span className="font-bold text-pink-400">register-level programming</span>, hardware interfacing, board
                bring-up, and debugging across ESP32 and other embedded platforms.
              </p>
              <p className="text-white text-sm md:text-lg leading-relaxed mb-4 md:mb-6 font-normal">
                I have worked on <span className="font-bold text-cyan-400">real-world projects</span> involving
                communication protocols, sensor integration, packet-based data processing, and IoT systems, along with
                practical exposure to firmware testing, issue analysis, and system stability improvement. I enjoy
                working close to hardware, understanding how software interacts with electronics at the{" "}
                <span className="font-bold text-purple-400">register and signal level</span>.
              </p>
              <p className="text-white text-sm md:text-lg leading-relaxed font-normal">
                I am continuously learning{" "}
                <span className="font-bold text-pink-400">production-grade embedded development practices</span> and
                enjoy collaborating with cross-functional teams to build reliable, efficient, and well-structured
                embedded systems.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Experience Section */}
        <div id="experience" className="min-h-screen flex flex-col justify-center pt-12 md:pt-16 px-3 md:px-4">
          <Experience />
        </div>

        {/* Skills Section */}
        <div id="skills" className="min-h-screen flex flex-col justify-center pt-12 md:pt-16 px-3 md:px-4">
          <Skills />
        </div>

        {/* Projects Section */}
        <div id="projects" className="min-h-screen flex flex-col justify-center pt-12 md:pt-16 px-3 md:px-4">
          <Projects />
        </div>

        {/* Education Section */}
        <div id="education" className="min-h-screen flex flex-col justify-center pt-12 md:pt-16 px-3 md:px-4">
          <Education />
        </div>

        {/* Certifications Section */}
        <div id="certifications" className="min-h-screen flex flex-col justify-center pt-12 md:pt-16 px-3 md:px-4">
          <Certifications />
        </div>

        {/* Hire Me Section */}
        <div id="hire" className="min-h-screen flex items-center justify-center pt-16 md:pt-20 px-3 md:px-4">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
              transition={{ duration: 0.5, ease: "easeOut" }}
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
