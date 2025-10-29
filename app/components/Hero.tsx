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
        {/* Home Section */}
        <div id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
          <div className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px] pixelate-reveal"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20">
                <Image
                  src="/images/design-mode/harsha.jpg(1).jpeg"
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl font-black text-white pixelate-reveal"
            >
              Harsha Vardhan Katuri
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-xl md:text-2xl font-black pixelate-reveal text-[rgba(252,6,6,1)]"
            >
              Firmware Engineer
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-lg font-black pixelate-reveal text-border"
            >
              Specialized in Embedded Systems & IoT Solutions
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-4 text-green-400 font-black pixelate-reveal"
            >
              <div className="flex items-center gap-1 text-border">
                <MapPin className="w-4 h-4" />
                Bengaluru, Karnataka, 560068
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-white max-w-3xl leading-relaxed font-semibold pixelate-reveal"
            >
              Currently working as a <span className="font-black text-[rgba(255,0,0,1)]">Firmware Engineer</span> at HealthCube
              Private Limited, developing <span className="font-black text-border">LoRa-enabled soil</span> health
              monitoring systems and contributing to production-grade{" "}
              <span className="font-black text-border">medical device firmware</span>. Experienced in C/C++,
              embedded firmware development, and IoT solutions with expertise in microcontroller architectures and
              communication protocols.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mt-8 pixelate-reveal"
            >
              <style jsx>{`
                @keyframes ripple {
                  0% {
                    box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.7);
                  }
                  70% {
                    box-shadow: 0 0 0 10px rgba(0, 212, 255, 0);
                  }
                  100% {
                    box-shadow: 0 0 0 0 rgba(0, 212, 255, 0);
                  }
                }
                
                .ripple-button {
                  animation: ripple 1.5s infinite;
                }
              `}</style>

              <button
                className="ripple-button bg-transparent hover:bg-white/10 text-white font-black flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 transition-all"
                onClick={handleEmailCopy}
              >
                {copiedEmail ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                <span>{copiedEmail ? "Email Copied!" : "Gmail"}</span>
              </button>

              <button
                className="ripple-button bg-transparent hover:bg-white/10 text-white font-black px-6 py-3 rounded-lg flex items-center gap-2 border border-white/30 transition-all"
                onClick={handlePhoneCopy}
              >
                {copiedPhone ? <Check className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                <span>{copiedPhone ? "Number Copied!" : "Contact"}</span>
              </button>

              <Link href="https://github.com/Harsha-vardhan-katuri" target="_blank">
                <button className="ripple-button bg-transparent hover:bg-white/10 text-white font-black px-6 py-3 rounded-lg flex items-center gap-2 border border-white/30 transition-all">
                  <Github className="w-4 h-4" />
                  GitHub
                </button>
              </Link>

              <Link href="https://www.linkedin.com/in/harsha-vardhan-katuri-772166256/" target="_blank">
                <button className="ripple-button bg-transparent hover:bg-white/10 text-white font-black px-6 py-3 rounded-lg flex items-center gap-2 border border-white/30 transition-all">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </button>
              </Link>

              <button
                className="ripple-button bg-transparent hover:bg-white/10 text-white font-black px-6 py-3 rounded-lg flex items-center gap-2 border border-white/30 transition-all"
                onClick={handleResumeDownload}
              >
                <Download className="w-4 h-4" />
                Resume
              </button>
            </motion.div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="min-h-screen flex items-center justify-center pt-20 px-4">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              About <span className="font-black text-border">Me</span>
            </h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="rounded-lg p-8 text-left bg-transparent backdrop-blur-sm items-start hover:shadow-2xl hover:shadow-sky-500/30 hover:-translate-y-3 transition-all duration-300"
            >
              <p className="text-white text-lg leading-relaxed mb-6 font-semibold">
                I am a dedicated <span className="font-black text-red-700">Firmware Engineer</span> currently working at
                HealthCube Private Limited, specializing in embedded systems and IoT solutions. My expertise lies in
                developing robust firmware for microcontrollers, particularly{" "}
                <span className="font-black text-border">ESP32</span>, and implementing various communication
                protocols including <span className="font-black text-[rgba(140,0,255,1)]">LoRa, RS485, UART, I2C, and SPI</span>.
              </p>
              <p className="text-white text-lg leading-relaxed font-semibold">
                With hands-on experience in <span className="font-black text-border">agricultural IoT systems</span>{" "}
                and <span className="font-black text-border">medical device firmware</span>, I focus on creating
                efficient, low-power solutions that deliver reliable performance in real-world applications. My recent
                work includes developing a <span className="font-black text-border">LoRa-enabled soil health</span>{" "}
                monitoring system and contributing to production-grade medical device firmware.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Experience Section */}
        <div id="experience" className="min-h-screen flex flex-col justify-center pt-16 px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center mt-4">
            Work <span className="font-black text-border">Experience</span>
          </h2>
          <p className="max-w-2xl mx-auto font-black text-center mb-2 text-[rgba(241,255,0,1)]">
            Professional journey in embedded systems, firmware development, and AI technologies
          </p>
          <Experience />
        </div>

        {/* Skills Section */}
        <div id="skills" className="min-h-screen flex flex-col justify-center pt-16 px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center mt-4">
            Technical <span className="font-black text-border">Skills</span>
          </h2>
          <p className="max-w-2xl mx-auto font-black text-center mb-2 text-[rgba(255,0,0,1)]">
            Comprehensive expertise in embedded systems, firmware development, and IoT technologies
          </p>
          <Skills />
        </div>

        {/* Projects Section */}
        <div id="projects" className="min-h-screen flex flex-col justify-center pt-16 px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center mt-4">
            Featured <span className="font-black text-border">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto font-black text-center mb-2 text-[rgba(245,9,9,1)]">
            Innovative solutions in embedded systems, IoT, and AI technologies
          </p>
          <Projects />
        </div>

        {/* Education Section */}
        <div id="education" className="min-h-screen flex flex-col justify-center pt-16 px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center mt-4">
            My <span className="font-black text-border">Education</span>
          </h2>
          <p className="max-w-2xl mx-auto font-black text-center mb-2 text-[rgba(254,4,4,1)]">
            Academic background that shaped my technical expertise
          </p>
          <Education />
        </div>

        {/* Certifications Section */}
        <div id="certifications" className="min-h-screen flex flex-col justify-center pt-16 px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center mt-4">
            Achievements & <span className="font-black text-border">Certifications</span>
          </h2>
          <p className="max-w-2xl mx-auto font-black text-center mb-2 text-[rgba(33,255,0,1)]">
            Recognition and certifications that validate my expertise and academic excellence
          </p>
          <Certifications />
        </div>

        {/* Hire Me Section */}
        <div id="hire" className="min-h-screen flex items-center justify-center pt-20 px-4">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Let's Work <span className="font-black text-border">Together</span>
              </h2>
              <p className="max-w-2xl mx-auto font-black text-xl text-[rgba(244,250,0,1)]">
                Ready to bring your embedded systems and IoT projects to life
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="rounded-lg p-8 text-center space-y-6 bg-transparent backdrop-blur-sm hover:shadow-2xl hover:shadow-sky-500/30 hover:-translate-y-3 transition-all duration-300"
            >
              <h3 className="text-2xl font-black text-white mb-4">Available for Freelance Projects</h3>
              <p className="text-white text-lg font-black mb-6">
                I'm currently available for <span className="font-black text-[rgba(252,0,0,1)]">firmware development</span>,{" "}
                <span className="font-black text-[rgba(0,255,9,1)]">IoT solutions</span>, and{" "}
                <span className="font-black text-[rgba(245,3,237,1)]">embedded systems</span> projects. Let's discuss how I can
                help bring your ideas to reality.
              </p>
              <style jsx>{`
                @keyframes ripple {
                  0% {
                    box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.7);
                  }
                  70% {
                    box-shadow: 0 0 0 10px rgba(0, 212, 255, 0);
                  }
                  100% {
                    box-shadow: 0 0 0 0 rgba(0, 212, 255, 0);
                  }
                }
                
                .ripple-button-hire {
                  animation: ripple 1.5s infinite;
                }
              `}</style>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  className="ripple-button-hire bg-transparent hover:bg-white/10 text-white font-black px-8 py-3 rounded-lg flex items-center gap-2 border border-white/30 transition-all"
                  onClick={() => (window.location.href = "mailto:katuriharshavardhan369@gmail.com")}
                >
                  <Mail className="w-5 h-5" />
                  Email Me
                </button>

                <Link href="https://www.linkedin.com/in/harsha-vardhan-katuri-772166256/" target="_blank">
                  <button className="ripple-button-hire bg-transparent hover:bg-white/10 text-white font-black px-8 py-3 rounded-lg flex items-center gap-2 border border-white/30 transition-all">
                    <Linkedin className="w-5 h-5" />
                    Connect on LinkedIn
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
