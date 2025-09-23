"use client"

import { motion } from "framer-motion"
import { Linkedin, Mail, Download, Github, Phone, MapPin, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import FallingCubes from "./FallingCubes"
import HexagonBackground from "./HexagonBackground"
import { useState, useEffect } from "react"
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
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set())

  // Track when a section becomes active and trigger animation once
  useEffect(() => {
    if (activeSection !== "home" && !animatedSections.has(activeSection)) {
      setAnimatedSections((prev) => new Set(prev).add(activeSection))
    }
  }, [activeSection, animatedSections])

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [activeSection])

  const handleResumeDownload = () => {
    // Open Google Drive link in new tab
    window.open("https://drive.google.com/file/d/12LjzYqlAkPaz9xmxxNB0uoS1poytS9me/view?usp=drive_link", "_blank")
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
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto min-h-screen justify-center">
            <style jsx>{`
            .about-heading-wave-text {
              display: inline-block;
              animation: ${animatedSections.has("about") ? "about-heading-letter-wave 3s ease-in-out" : "none"};
            }
            
            .about-heading-wave-text:nth-child(1) { animation-delay: 0s !important; }
            .about-heading-wave-text:nth-child(2) { animation-delay: 0.1s !important; }
            .about-heading-wave-text:nth-child(3) { animation-delay: 0.2s !important; }
            .about-heading-wave-text:nth-child(4) { animation-delay: 0.3s !important; }
            .about-heading-wave-text:nth-child(5) { animation-delay: 0.4s !important; }
            
            @keyframes about-heading-letter-wave {
              0%, 100% { 
                transform: translateY(0px) scale(1);
                background: linear-gradient(45deg, #ffffff, #ffffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              25% { 
                transform: translateY(-12px) scale(1.1);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-18px) scale(1.2);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-12px) scale(1.1);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            
            .about-colored-text-wave {
              display: inline-block;
              animation: ${animatedSections.has("about") ? "about-colored-letter-wave 3s ease-in-out" : "none"};
            }
            
            .about-colored-text-wave:nth-child(1) { animation-delay: 0.5s !important; }
            .about-colored-text-wave:nth-child(2) { animation-delay: 0.6s !important; }
            
            @keyframes about-colored-letter-wave {
              0%, 100% { 
                transform: translateY(0px) scale(1);
              }
              25% { 
                transform: translateY(-15px) scale(1.15);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-20px) scale(1.25);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-15px) scale(1.15);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          `}</style>

            <h2 className="text-4xl md:text-5xl font-black mb-8">
              {"About".split("").map((letter, index) => (
                <span key={index} className="about-heading-wave-text">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}{" "}
              <span className="text-orange-500 font-black">
                {"Me".split("").map((letter, index) => (
                  <span key={index} className="about-colored-text-wave">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-lg p-8 text-left bg-black/90 backdrop-blur-sm items-start border border-white/20"
            >
              <p className="text-white text-lg leading-relaxed mb-6 font-semibold">
                I am a dedicated <span className="font-black text-red-700">Firmware Engineer</span> currently working at
                HealthCube Private Limited, specializing in embedded systems and IoT solutions. My expertise lies in
                developing robust firmware for microcontrollers, particularly{" "}
                <span className="text-cyan-500 font-black">ESP32</span>, and implementing various communication
                protocols including <span className="font-black text-purple-800">LoRa, RS485, UART, I2C, and SPI</span>.
              </p>
              <p className="text-white text-lg leading-relaxed font-semibold">
                With hands-on experience in <span className="font-black text-yellow-300">agricultural IoT systems</span>{" "}
                and <span className="text-purple-500 font-black">medical device firmware</span>, I focus on creating
                efficient, low-power solutions that deliver reliable performance in real-world applications. My recent
                work includes developing a <span className="font-black text-red-600">LoRa-enabled soil health</span>{" "}
                monitoring system and contributing to production-grade medical device firmware.
              </p>
            </motion.div>
          </div>
        )
      case "experience":
        return (
          <div className="min-h-screen flex flex-col justify-center pt-16">
            <style jsx>{`
            .exp-heading-wave-text {
              display: inline-block;
              animation: ${animatedSections.has("experience") ? "exp-heading-letter-wave 3s ease-in-out" : "none"};
            }
            
            .exp-heading-wave-text:nth-child(1) { animation-delay: 0s !important; }
            .exp-heading-wave-text:nth-child(2) { animation-delay: 0.1s !important; }
            .exp-heading-wave-text:nth-child(3) { animation-delay: 0.2s !important; }
            .exp-heading-wave-text:nth-child(4) { animation-delay: 0.3s !important; }
            
            @keyframes exp-heading-letter-wave {
              0%, 100% { 
                transform: translateY(0px) scale(1);
                background: linear-gradient(45deg, #ffffff, #ffffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              25% { 
                transform: translateY(-12px) scale(1.1);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-18px) scale(1.2);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-12px) scale(1.1);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            
            .exp-colored-text-wave {
              display: inline-block;
              animation: ${animatedSections.has("experience") ? "exp-colored-letter-wave 3s ease-in-out" : "none"};
            }
            
            .exp-colored-text-wave:nth-child(1) { animation-delay: 0.4s !important; }
            .exp-colored-text-wave:nth-child(2) { animation-delay: 0.5s !important; }
            .exp-colored-text-wave:nth-child(3) { animation-delay: 0.6s !important; }
            .exp-colored-text-wave:nth-child(4) { animation-delay: 0.7s !important; }
            .exp-colored-text-wave:nth-child(5) { animation-delay: 0.8s !important; }
            .exp-colored-text-wave:nth-child(6) { animation-delay: 0.9s !important; }
            .exp-colored-text-wave:nth-child(7) { animation-delay: 1.0s !important; }
            .exp-colored-text-wave:nth-child(8) { animation-delay: 1.1s !important; }
            .exp-colored-text-wave:nth-child(9) { animation-delay: 1.2s !important; }
            .exp-colored-text-wave:nth-child(10) { animation-delay: 1.3s !important; }
            
            @keyframes exp-colored-letter-wave {
              0%, 100% { 
                transform: translateY(0px) scale(1);
              }
              25% { 
                transform: translateY(-15px) scale(1.15);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-20px) scale(1.25);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-15px) scale(1.15);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          `}</style>

            <h2 className="text-4xl md:text-5xl font-black mb-16 text-center mt-4">
              {"Work".split("").map((letter, index) => (
                <span key={index} className="exp-heading-wave-text">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}{" "}
              <span className="text-green-500 font-black">
                {"Experience".split("").map((letter, index) => (
                  <span key={index} className="exp-colored-text-wave">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto font-black text-center text-purple-700 mb-2">
              Professional journey in embedded systems, firmware development, and AI technologies
            </p>
            <Experience />
          </div>
        )
      case "skills":
        return (
          <div className="min-h-screen flex flex-col justify-center pt-16">
            <style jsx>{`
            .skills-heading-wave-text {
              display: inline-block;
              animation: ${animatedSections.has("skills") ? "skills-heading-letter-wave 3s ease-in-out" : "none"};
            }
            
            .skills-heading-wave-text:nth-child(1) { animation-delay: 0s !important; }
            .skills-heading-wave-text:nth-child(2) { animation-delay: 0.1s !important; }
            .skills-heading-wave-text:nth-child(3) { animation-delay: 0.2s !important; }
            .skills-heading-wave-text:nth-child(4) { animation-delay: 0.3s !important; }
            .skills-heading-wave-text:nth-child(5) { animation-delay: 0.4s !important; }
            .skills-heading-wave-text:nth-child(6) { animation-delay: 0.5s !important; }
            .skills-heading-wave-text:nth-child(7) { animation-delay: 0.6s !important; }
            .skills-heading-wave-text:nth-child(8) { animation-delay: 0.7s !important; }
            .skills-heading-wave-text:nth-child(9) { animation-delay: 0.8s !important; }
            
            @keyframes skills-heading-letter-wave {
              0%, 100% { 
                transform: translateY(0px) scale(1);
                background: linear-gradient(45deg, #ffffff, #ffffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              25% { 
                transform: translateY(-12px) scale(1.1);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-18px) scale(1.2);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-12px) scale(1.1);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            
            .skills-colored-text-wave {
              display: inline-block;
              animation: ${animatedSections.has("skills") ? "skills-colored-letter-wave 3s ease-in-out" : "none"};
            }
            
            .skills-colored-text-wave:nth-child(1) { animation-delay: 0.9s !important; }
            .skills-colored-text-wave:nth-child(2) { animation-delay: 1.0s !important; }
            .skills-colored-text-wave:nth-child(3) { animation-delay: 1.1s !important; }
            .skills-colored-text-wave:nth-child(4) { animation-delay: 1.2s !important; }
            .skills-colored-text-wave:nth-child(5) { animation-delay: 1.3s !important; }
            .skills-colored-text-wave:nth-child(6) { animation-delay: 1.4s !important; }
            
            @keyframes skills-colored-letter-wave {
              0%, 100% { 
                transform: translateY(0px) scale(1);
              }
              25% { 
                transform: translateY(-15px) scale(1.15);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-20px) scale(1.25);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-15px) scale(1.15);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          `}</style>

            <h2 className="text-4xl md:text-5xl font-black mb-16 text-center mt-4">
              {"Technical".split("").map((letter, index) => (
                <span key={index} className="skills-heading-wave-text">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}{" "}
              <span className="text-pink-500 font-black">
                {"Skills".split("").map((letter, index) => (
                  <span key={index} className="skills-colored-text-wave">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto font-black text-center text-yellow-400 mb-2">
              Comprehensive expertise in embedded systems, firmware development, and IoT technologies
            </p>
            <Skills />
          </div>
        )
      case "projects":
        return (
          <div className="min-h-screen flex flex-col justify-center pt-16">
            <style jsx>{`
            .projects-heading-wave-text {
              display: inline-block;
              animation: ${animatedSections.has("projects") ? "projects-heading-letter-wave 3s ease-in-out" : "none"};
            }
            
            .projects-heading-wave-text:nth-child(1) { animation-delay: 0s !important; }
            .projects-heading-wave-text:nth-child(2) { animation-delay: 0.1s !important; }
            .projects-heading-wave-text:nth-child(3) { animation-delay: 0.2s !important; }
            .projects-heading-wave-text:nth-child(4) { animation-delay: 0.3s !important; }
            .projects-heading-wave-text:nth-child(5) { animation-delay: 0.4s !important; }
            .projects-heading-wave-text:nth-child(6) { animation-delay: 0.5s !important; }
            .projects-heading-wave-text:nth-child(7) { animation-delay: 0.6s !important; }
            .projects-heading-wave-text:nth-child(8) { animation-delay: 0.7s !important; }
            
            @keyframes projects-heading-letter-wave {
              0%, 100% { 
                transform: translateY(0px) scale(1);
                background: linear-gradient(45deg, #ffffff, #ffffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              25% { 
                transform: translateY(-12px) scale(1.1);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-18px) scale(1.2);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-12px) scale(1.1);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            
            .projects-colored-text-wave {
              display: inline-block;
              animation: ${animatedSections.has("projects") ? "projects-colored-letter-wave 3s ease-in-out" : "none"};
            }
            
            .projects-colored-text-wave:nth-child(1) { animation-delay: 0.8s !important; }
            .projects-colored-text-wave:nth-child(2) { animation-delay: 0.9s !important; }
            .projects-colored-text-wave:nth-child(3) { animation-delay: 1.0s !important; }
            .projects-colored-text-wave:nth-child(4) { animation-delay: 1.1s !important; }
            .projects-colored-text-wave:nth-child(5) { animation-delay: 1.2s !important; }
            .projects-colored-text-wave:nth-child(6) { animation-delay: 1.3s !important; }
            .projects-colored-text-wave:nth-child(7) { animation-delay: 1.4s !important; }
            .projects-colored-text-wave:nth-child(8) { animation-delay: 1.5s !important; }
            
            @keyframes projects-colored-letter-wave {
              0%, 100% { 
                transform: translateY(0px) scale(1);
              }
              25% { 
                transform: translateY(-15px) scale(1.15);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-20px) scale(1.25);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-15px) scale(1.15);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          `}</style>

            <h2 className="text-4xl md:text-5xl font-black mb-16 text-center mt-4">
              {"Featured".split("").map((letter, index) => (
                <span key={index} className="projects-heading-wave-text">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}{" "}
              <span className="text-cyan-500 font-black">
                {"Projects".split("").map((letter, index) => (
                  <span key={index} className="projects-colored-text-wave">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto font-black text-center mb-2 text-red-700">
              Innovative solutions in embedded systems, IoT, and AI technologies
            </p>
            <Projects />
          </div>
        )
      case "education":
        return (
          <div className="min-h-screen flex flex-col justify-center pt-16">
            <style jsx>{`
            .education-heading-wave-text {
              display: inline-block;
              animation: ${animatedSections.has("education") ? "education-heading-letter-wave 3s ease-in-out" : "none"};
            }
            
            .education-heading-wave-text:nth-child(1) { animation-delay: 0s !important; }
            .education-heading-wave-text:nth-child(2) { animation-delay: 0.1s !important; }
            
            @keyframes education-heading-letter-wave {
              0%, 100% { 
                transform: translateY(0px) scale(1);
                background: linear-gradient(45deg, #ffffff, #ffffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              25% { 
                transform: translateY(-12px) scale(1.1);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-18px) scale(1.2);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-12px) scale(1.1);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            
            .education-colored-text-wave {
              display: inline-block;
              animation: ${animatedSections.has("education") ? "education-colored-letter-wave 3s ease-in-out" : "none"};
            }
            
            .education-colored-text-wave:nth-child(1) { animation-delay: 0.2s !important; }
            .education-colored-text-wave:nth-child(2) { animation-delay: 0.3s !important; }
            .education-colored-text-wave:nth-child(3) { animation-delay: 0.4s !important; }
            .education-colored-text-wave:nth-child(4) { animation-delay: 0.5s !important; }
            .education-colored-text-wave:nth-child(5) { animation-delay: 0.6s !important; }
            .education-colored-text-wave:nth-child(6) { animation-delay: 0.7s !important; }
            .education-colored-text-wave:nth-child(7) { animation-delay: 0.8s !important; }
            .education-colored-text-wave:nth-child(8) { animation-delay: 0.9s !important; }
            .education-colored-text-wave:nth-child(9) { animation-delay: 1.0s !important; }
            
            @keyframes education-colored-letter-wave {
              0%, 100% { 
                transform: translateY(0px) scale(1);
              }
              25% { 
                transform: translateY(-15px) scale(1.15);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-20px) scale(1.25);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-15px) scale(1.15);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          `}</style>

            <h2 className="text-4xl md:text-5xl font-black mb-16 text-center mt-4">
              {"My".split("").map((letter, index) => (
                <span key={index} className="education-heading-wave-text">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}{" "}
              <span className="text-purple-500 font-black">
                {"Education".split("").map((letter, index) => (
                  <span key={index} className="education-colored-text-wave">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto font-black text-center text-red-800 mb-2">
              Academic background that shaped my technical expertise
            </p>
            <Education />
          </div>
        )
      case "certifications":
        return (
          <div className="min-h-screen flex flex-col justify-center pt-16">
            <style jsx>{`
            .cert-heading-wave-text {
              display: inline-block;
              animation: ${animatedSections.has("certifications") ? "cert-heading-letter-wave 3s ease-in-out" : "none"};
            }
            
            .cert-heading-wave-text:nth-child(1) { animation-delay: 0s !important; }
            .cert-heading-wave-text:nth-child(2) { animation-delay: 0.1s !important; }
            .cert-heading-wave-text:nth-child(3) { animation-delay: 0.2s !important; }
            .cert-heading-wave-text:nth-child(4) { animation-delay: 0.3s !important; }
            .cert-heading-wave-text:nth-child(5) { animation-delay: 0.4s !important; }
            .cert-heading-wave-text:nth-child(6) { animation-delay: 0.5s !important; }
            .cert-heading-wave-text:nth-child(7) { animation-delay: 0.6s !important; }
            .cert-heading-wave-text:nth-child(8) { animation-delay: 0.7s !important; }
            .cert-heading-wave-text:nth-child(9) { animation-delay: 0.8s !important; }
            .cert-heading-wave-text:nth-child(10) { animation-delay: 0.9s !important; }
            .cert-heading-wave-text:nth-child(11) { animation-delay: 1.0s !important; }
            .cert-heading-wave-text:nth-child(12) { animation-delay: 1.1s !important; }
            
            @keyframes cert-heading-letter-wave {
              0%, 100% { 
                transform: translateY(0px) scale(1);
                background: linear-gradient(45deg, #ffffff, #ffffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              25% { 
                transform: translateY(-12px) scale(1.1);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-18px) scale(1.2);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-12px) scale(1.1);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            
            .cert-colored-text-wave {
              display: inline-block;
              animation: ${animatedSections.has("certifications") ? "cert-colored-letter-wave 3s ease-in-out" : "none"};
            }
            
            .cert-colored-text-wave:nth-child(1) { animation-delay: 1.2s !important; }
            .cert-colored-text-wave:nth-child(2) { animation-delay: 1.3s !important; }
            .cert-colored-text-wave:nth-child(3) { animation-delay: 1.4s !important; }
            .cert-colored-text-wave:nth-child(4) { animation-delay: 1.5s !important; }
            .cert-colored-text-wave:nth-child(5) { animation-delay: 1.6s !important; }
            .cert-colored-text-wave:nth-child(6) { animation-delay: 1.7s !important; }
            .cert-colored-text-wave:nth-child(7) { animation-delay: 1.8s !important; }
            .cert-colored-text-wave:nth-child(8) { animation-delay: 1.9s !important; }
            .cert-colored-text-wave:nth-child(9) { animation-delay: 2.0s !important; }
            .cert-colored-text-wave:nth-child(10) { animation-delay: 2.1s !important; }
            .cert-colored-text-wave:nth-child(11) { animation-delay: 2.2s !important; }
            .cert-colored-text-wave:nth-child(12) { animation-delay: 2.3s !important; }
            .cert-colored-text-wave:nth-child(13) { animation-delay: 2.4s !important; }
            
            @keyframes cert-colored-letter-wave {
              0%, 100% { 
                transform: translateY(0px) scale(1);
              }
              25% { 
                transform: translateY(-15px) scale(1.15);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-20px) scale(1.25);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-15px) scale(1.15);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          `}</style>

            <h2 className="text-4xl md:text-5xl font-black mb-16 text-center mt-4">
              {"Achievements".split("").map((letter, index) => (
                <span key={index} className="cert-heading-wave-text">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}{" "}
              &{" "}
              <span className="text-indigo-500 font-black">
                {"Certifications".split("").map((letter, index) => (
                  <span key={index} className="cert-colored-text-wave">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto font-black text-center text-fuchsia-600 mb-2">
              Recognition and certifications that validate my expertise and academic excellence
            </p>
            <Certifications />
          </div>
        )
      case "hire":
        return (
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto min-h-screen justify-center">
            <style jsx>{`
            @keyframes rainbow-wave {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            .action-button {
              position: relative;
              overflow: hidden;
              transition: all 0.3s ease;
            }

            .action-button:hover {
              transform: translateY(-3px);
              box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
            }

            .action-button:hover .button-text {
              color: #000000 !important;
              font-weight: 900;
            }

            .action-button:hover .rainbow-overlay {
              opacity: 1;
            }

            .rainbow-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(
                45deg,
                rgba(255, 0, 0, 0.15), rgba(255, 127, 0, 0.15), rgba(255, 255, 0, 0.15), 
                rgba(0, 255, 0, 0.15), rgba(0, 0, 255, 0.15), rgba(75, 0, 130, 0.15), 
                rgba(148, 0, 211, 0.15), rgba(255, 20, 147, 0.15)
              );
              background-size: 400% 400%;
              animation: rainbow-wave 1.8s ease-in-out infinite;
              opacity: 0;
              transition: opacity 0.3s ease;
              border-radius: 0.5rem;
            }

            .wave-text {
              display: inline-block;
              transition: all 0.3s ease;
            }

            .action-button:hover .wave-text:nth-child(1) { animation-delay: 0s; }
            .action-button:hover .wave-text:nth-child(2) { animation-delay: 0.1s; }
            .action-button:hover .wave-text:nth-child(3) { animation-delay: 0.2s; }
            .action-button:hover .wave-text:nth-child(4) { animation-delay: 0.3s; }
            .action-button:hover .wave-text:nth-child(5) { animation-delay: 0.4s; }
            .action-button:hover .wave-text:nth-child(6) { animation-delay: 0.5s; }
            .action-button:hover .wave-text:nth-child(7) { animation-delay: 0.6s; }
            .action-button:hover .wave-text:nth-child(8) { animation-delay: 0.7s; }
            .action-button:hover .wave-text:nth-child(9) { animation-delay: 0.8s; }
            .action-button:hover .wave-text:nth-child(10) { animation-delay: 0.9s; }
            .action-button:hover .wave-text:nth-child(11) { animation-delay: 1.0s; }
            .action-button:hover .wave-text:nth-child(12) { animation-delay: 1.1s; }
            .action-button:hover .wave-text:nth-child(13) { animation-delay: 1.2s; }
            .action-button:hover .wave-text:nth-child(14) { animation-delay: 1.3s; }
            .action-button:hover .wave-text:nth-child(15) { animation-delay: 1.4s; }
            .action-button:hover .wave-text:nth-child(16) { animation-delay: 1.5s; }
            .action-button:hover .wave-text:nth-child(17) { animation-delay: 1.6s; }
            .action-button:hover .wave-text:nth-child(18) { animation-delay: 1.7s; }
            .action-button:hover .wave-text:nth-child(19) { animation-delay: 1.8s; }
            .action-button:hover .wave-text:nth-child(20) { animation-delay: 1.9s; }

            @keyframes wave-letter {
              0%, 100% { 
                transform: translateY(0px) scale(1);
                color: #000000;
              }
              25% { 
                transform: translateY(-10px) scale(1.15);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-15px) scale(1.25);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-10px) scale(1.15);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }

            .action-button:hover .wave-text {
              animation: wave-letter 1.6s ease-in-out infinite;
            }

            .icon-wave {
              transition: all 0.3s ease;
            }

            .action-button:hover .icon-wave {
              animation: icon-bounce 1.2s ease-in-out infinite;
            }

            @keyframes icon-bounce {
              0%, 100% { 
                transform: translateY(0px) rotate(0deg) scale(1);
              }
              25% { 
                transform: translateY(-8px) rotate(5deg) scale(1.1);
              }
              50% { 
                transform: translateY(-12px) rotate(-5deg) scale(1.2);
              }
              75% { 
                transform: translateY(-8px) rotate(3deg) scale(1.1);
              }
            }
          `}</style>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                {"Let's Work".split("").map((letter, index) => (
                  <span key={index} className="hire-heading-wave-text">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}{" "}
                <span className="text-red-500 font-black">
                  {"Together".split("").map((letter, index) => (
                    <span key={index} className="hire-colored-text-wave">
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
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
              className="rounded-lg p-8 text-center space-y-6 bg-black/90 backdrop-blur-sm border border-white/20"
            >
              <h3 className="text-2xl font-black text-white mb-4">Available for Freelance Projects</h3>
              <p className="text-white text-lg font-black mb-6">
                I'm currently available for <span className="text-orange-500 font-black">firmware development</span>,{" "}
                <span className="text-green-500 font-black">IoT solutions</span>, and{" "}
                <span className="text-pink-500 font-black">embedded systems</span> projects. Let's discuss how I can
                help bring your ideas to reality.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  className="action-button bg-black hover:bg-gray-800 text-white font-black px-8 py-3 rounded-lg flex items-center gap-2 relative"
                  onClick={() => (window.location.href = "mailto:katuriharshavardhan369@gmail.com")}
                >
                  <div className="rainbow-overlay"></div>
                  <div className="icon-wave">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="button-text relative z-10">
                    {"Email Me".split("").map((letter, index) => (
                      <span key={index} className="wave-text">
                        {letter === " " ? "\u00A0" : letter}
                      </span>
                    ))}
                  </span>
                </button>

                <Link href="https://www.linkedin.com/in/harsha-vardhan-katuri-772166256/" target="_blank">
                  <button className="action-button bg-black hover:bg-gray-800 text-white font-black px-8 py-3 rounded-lg flex items-center gap-2 relative">
                    <div className="rainbow-overlay"></div>
                    <div className="icon-wave">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <span className="button-text relative z-10">
                      {"Connect on LinkedIn".split("").map((letter, index) => (
                        <span key={index} className="wave-text">
                          {letter === " " ? "\u00A0" : letter}
                        </span>
                      ))}
                    </span>
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto min-h-screen justify-center">
            <style jsx>{`
            @keyframes rainbow-wave {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            
            .action-button {
              position: relative;
              overflow: hidden;
              transition: all 0.3s ease;
            }
            
            .action-button:hover {
              transform: translateY(-3px);
              box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
            }
            
            .action-button:hover .button-text {
              color: #000000 !important;
              font-weight: 900;
            }
            
            .action-button:hover .rainbow-overlay {
              opacity: 1;
            }
            
            .rainbow-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(
                45deg,
                rgba(255, 0, 0, 0.15), rgba(255, 127, 0, 0.15), rgba(255, 255, 0, 0.15), 
                rgba(0, 255, 0, 0.15), rgba(0, 0, 255, 0.15), rgba(75, 0, 130, 0.15), 
                rgba(148, 0, 211, 0.15), rgba(255, 20, 147, 0.15)
              );
              background-size: 400% 400%;
              animation: rainbow-wave 1.8s ease-in-out infinite;
              opacity: 0;
              transition: opacity 0.3s ease;
              border-radius: 0.5rem;
            }
            
            .wave-text {
              display: inline-block;
              transition: all 0.3s ease;
            }
            
            .action-button:hover .wave-text:nth-child(1) { animation-delay: 0s; }
            .action-button:hover .wave-text:nth-child(2) { animation-delay: 0.1s; }
            .action-button:hover .wave-text:nth-child(3) { animation-delay: 0.2s; }
            .action-button:hover .wave-text:nth-child(4) { animation-delay: 0.3s; }
            .action-button:hover .wave-text:nth-child(5) { animation-delay: 0.4s; }
            .action-button:hover .wave-text:nth-child(6) { animation-delay: 0.5s; }
            .action-button:hover .wave-text:nth-child(7) { animation-delay: 0.6s; }
            .action-button:hover .wave-text:nth-child(8) { animation-delay: 0.7s; }
            .action-button:hover .wave-text:nth-child(9) { animation-delay: 0.8s; }
            .action-button:hover .wave-text:nth-child(10) { animation-delay: 0.9s; }
            
            @keyframes wave-letter {
              0%, 100% { 
                transform: translateY(0px) scale(1);
                color: #000000;
              }
              25% { 
                transform: translateY(-10px) scale(1.15);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              50% { 
                transform: translateY(-15px) scale(1.25);
                background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              75% { 
                transform: translateY(-10px) scale(1.15);
                background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            
            .action-button:hover .wave-text {
              animation: wave-letter 1.6s ease-in-out infinite;
            }
            
            .icon-wave {
              transition: all 0.3s ease;
            }
            
            .action-button:hover .icon-wave {
              animation: icon-bounce 1.2s ease-in-out infinite;
            }
            
            @keyframes icon-bounce {
              0%, 100% { 
                transform: translateY(0px) rotate(0deg) scale(1);
              }
              25% { 
                transform: translateY(-8px) rotate(5deg) scale(1.1);
              }
              50% { 
                transform: translateY(-12px) rotate(-5deg) scale(1.2);
              }
              75% { 
                transform: translateY(-8px) rotate(3deg) scale(1.1);
              }
            }
          `}</style>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px]"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/harsha.jpg-ywbzZga5wdtOdP2WiPfsFpjM1o30qa.jpeg"
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
              className="text-xl md:text-2xl font-black text-red-700"
              style={{ fontWeight: 900 }}
            >
              Firmware Engineer
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg font-black text-violet-800"
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
              Currently working as a <span className="font-black text-red-700">Firmware Engineer</span> at HealthCube
              Private Limited, developing <span className="font-black text-yellow-400">LoRa-enabled soil</span> health
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
              <button
                className="action-button bg-black/90 hover:bg-gray-800 text-white font-black flex items-center gap-2 relative px-6 py-3 rounded-lg border border-white/20"
                onClick={handleEmailCopy}
              >
                <div className="rainbow-overlay"></div>
                <div className="icon-wave">
                  {copiedEmail ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </div>
                <span className="button-text relative z-10">
                  {(copiedEmail ? "Email Copied!" : "Gmail").split("").map((letter, index) => (
                    <span key={index} className="wave-text">
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
              </button>

              <button
                className="action-button bg-black/90 hover:bg-gray-800 text-white font-black relative px-6 py-3 rounded-lg flex items-center gap-2 border border-white/20"
                onClick={handlePhoneCopy}
              >
                <div className="rainbow-overlay"></div>
                <div className="icon-wave">
                  {copiedPhone ? <Check className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                </div>
                <span className="button-text relative z-10">
                  {(copiedPhone ? "Number Copied!" : "Contact").split("").map((letter, index) => (
                    <span key={index} className="wave-text">
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
              </button>

              <Link href="https://github.com/Harsha-vardhan-katuri" target="_blank">
                <button className="action-button bg-black/90 hover:bg-gray-800 text-white font-black px-6 py-3 rounded-lg flex items-center gap-2 relative border border-white/20">
                  <div className="rainbow-overlay"></div>
                  <div className="icon-wave">
                    <Github className="w-4 h-4" />
                  </div>
                  <span className="button-text relative z-10">
                    {"GitHub".split("").map((letter, index) => (
                      <span key={index} className="wave-text">
                        {letter === " " ? "\u00A0" : letter}
                      </span>
                    ))}
                  </span>
                </button>
              </Link>

              <Link href="https://www.linkedin.com/in/harsha-vardhan-katuri-772166256/" target="_blank">
                <button className="action-button bg-black/90 hover:bg-gray-800 text-white font-black px-6 py-3 rounded-lg flex items-center gap-2 relative border border-white/20">
                  <div className="rainbow-overlay"></div>
                  <div className="icon-wave">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <span className="button-text relative z-10">
                    {"LinkedIn".split("").map((letter, index) => (
                      <span key={index} className="wave-text">
                        {letter === " " ? "\u00A0" : letter}
                      </span>
                    ))}
                  </span>
                </button>
              </Link>

              <button
                className="action-button bg-black/90 hover:bg-gray-800 text-white font-black px-6 py-3 rounded-lg flex items-center gap-2 relative border border-white/20"
                onClick={handleResumeDownload}
              >
                <div className="rainbow-overlay"></div>
                <div className="icon-wave">
                  <Download className="w-4 h-4" />
                </div>
                <span className="button-text relative z-10">
                  {"Resume".split("").map((letter, index) => (
                    <span key={index} className="wave-text">
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
              </button>
            </motion.div>
          </div>
        )
    }
  }

  return (
    <section className="min-h-screen relative bg-black overflow-hidden" id="home">
      {activeSection === "hire" ? <HexagonBackground /> : <FallingCubes />}
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
