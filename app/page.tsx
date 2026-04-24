'use client'

import { motion } from 'framer-motion'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          className="text-center max-w-3xl px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-slate-100"
          >
            Harsha Vardhan
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl font-light text-slate-400 mb-8"
          >
            Firmware Engineer & Embedded Systems Developer
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-lg font-light text-slate-500 max-w-xl mx-auto leading-relaxed"
          >
            Progressed from Embedded Systems Trainee to Firmware Engineer. Specializing in low-level firmware design, microcontroller development, and embedded systems with hands-on expertise in hardware bring-up, debugging, and real-time signal processing.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-12 flex gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-slate-700 text-slate-300 font-light rounded transition-all duration-300 hover:text-slate-100"
            >
              View Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(51, 65, 85, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-slate-800/40 border border-slate-700 text-slate-300 font-light rounded transition-all duration-300 hover:text-slate-100"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Press Section */}
      <section id="press" className="min-h-screen flex items-center justify-center py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-5xl md:text-6xl font-light text-center text-slate-100"
        >
          Press & Features Coming Soon
        </motion.h2>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-12 text-slate-100">About Me</h2>
          <p className="text-lg font-light text-slate-400 leading-relaxed mb-6">
            I am a Firmware Engineer at HealthCubed India with a strong foundation in embedded systems and a passion for low-level design. My journey progressed from an Embedded Systems Trainee at Vector India to developing real-time firmware solutions for microcontroller-based systems. I specialize in debugging complex firmware issues, hardware bring-up, and signal processing while collaborating with manufacturing and quality teams.
          </p>
          <p className="text-lg font-light text-slate-400 leading-relaxed">
            With expertise in embedded C, microcontroller architectures, and communication protocols, I focus on delivering reliable, production-ready firmware. My aim is to grow as a strong Embedded/Firmware Engineer with a focus on long-term product ownership, stability, and innovation in real-time systems.
          </p>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-12 text-slate-100">Experience</h2>
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: false }}>
              <h3 className="text-2xl font-light text-slate-200 mb-2">Firmware Engineer</h3>
              <p className="text-slate-500 font-light mb-3">HealthCubed India Private Limited, Bengaluru • February 2025 – Present</p>
              <p className="text-slate-400 font-light leading-relaxed">Deliver core firmware projects including LoRa soil monitoring system and GSR sensor prototype. Diagnose and fix firmware bugs in HC-XL product, perform board bring-up, continuity/voltage checks, and collaborate with quality and manufacturing teams on hardware validation.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: false }}>
              <h3 className="text-2xl font-light text-slate-200 mb-2">AI Internship</h3>
              <p className="text-slate-500 font-light mb-3">Edunet Foundation (Microsoft & SAP Program), Remote • December 2024 – January 2025</p>
              <p className="text-slate-400 font-light leading-relaxed">Built AI-based health assistant chatbot using Streamlit and Hugging Face Transformers, reducing irrelevant responses by 40%. Achieved 85% response relevance with DistilGPT-2 fallback and improved query latency to under 2 seconds.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: false }}>
              <h3 className="text-2xl font-light text-slate-200 mb-2">Embedded Systems Trainee</h3>
              <p className="text-slate-500 font-light mb-3">Vector India, Hyderabad • July 2023 – April 2024</p>
              <p className="text-slate-400 font-light leading-relaxed">Completed 6+ embedded projects gaining proficiency in C/C++, microcontroller architectures, hardware interfacing, Linux internals, device drivers, and communication protocols (I2C, SPI, UART) using ESP8266 and LPC2148.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-12 text-slate-100">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: false }}>
              <h3 className="text-xl font-light text-slate-200 mb-4">Programming Languages</h3>
              <p className="text-slate-400 font-light leading-relaxed">C, C++, Embedded C, Python</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: false }}>
              <h3 className="text-xl font-light text-slate-200 mb-4">Protocols & Hardware</h3>
              <p className="text-slate-400 font-light leading-relaxed">UART, SPI, I2C, RS485, Modbus, Hardware debugging, Logic analyzers, Board bring-up, Soldering</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: false }}>
              <h3 className="text-xl font-light text-slate-200 mb-4">Tools & IDEs</h3>
              <p className="text-slate-400 font-light leading-relaxed">ESP32, ESP8266, LPC2148, Keil IDE, Arduino IDE, VS Code, Git, Ubuntu, Eclipse</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: false }}>
              <h3 className="text-xl font-light text-slate-200 mb-4">Standards & Practices</h3>
              <p className="text-slate-400 font-light leading-relaxed">ISO 13485, IEC 60601, Product development, Verification & Validation, Documentation control</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-12 text-slate-100">Featured Projects</h2>
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: false }} className="border-l border-slate-700 pl-6">
              <h3 className="text-2xl font-light text-slate-200 mb-2">GSR-Based Stress Monitoring System</h3>
              <p className="text-slate-500 font-light mb-3">ESP32, Grove GSR Sensor, Arduino</p>
              <p className="text-slate-400 font-light leading-relaxed">Real-time GSR system performing ADC-based signal acquisition at 10-20 Hz sampling rate. Extracted tonic and phasic components with threshold-based classification to identify Calm, Normal, and Stress states, achieving under 1 second response latency.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: false }} className="border-l border-slate-700 pl-6">
              <h3 className="text-2xl font-light text-slate-200 mb-2">LoRa-Enabled Soil Health Monitoring System</h3>
              <p className="text-slate-500 font-light mb-3">ESP32, RS485, LoRa, Modbus RTU</p>
              <p className="text-slate-400 font-light leading-relaxed">Programmed ESP32 to read NPK, pH, EC, moisture, and temperature via RS485 Modbus RTU with under 200ms decoding latency. Achieved 1 km wireless range with 80% packet delivery accuracy through optimized 50-byte sensor payloads and SPI-based LoRa communication.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: false }} className="border-l border-slate-700 pl-6">
              <h3 className="text-2xl font-light text-slate-200 mb-2">IoT-Based Weather Reporting System</h3>
              <p className="text-slate-500 font-light mb-3">LPC2148, ESP-01, DHT11, ThingSpeak</p>
              <p className="text-slate-400 font-light leading-relaxed">Weather monitoring system capturing temperature and humidity data via DHT11, uploading to ThingSpeak at 15-second intervals. Optimized data transmission logic achieving 2°C temperature and 5% RH humidity accuracy with 60% reduction in retrieval time.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section id="education" className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-12 text-slate-100">Education</h2>
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: false }}>
              <h3 className="text-2xl font-light text-slate-200 mb-2">Bachelor of Technology in Electronics and Communication Engineering</h3>
              <p className="text-slate-500 font-light mb-3">Gudlavalleru Engineering College • 2019-2023</p>
              <p className="text-slate-400 font-light">CGPA: 8.36</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: false }}>
              <h3 className="text-2xl font-light text-slate-200 mb-2">Intermediate Mathematics, Physics, Chemistry</h3>
              <p className="text-slate-500 font-light mb-3">Narayana Junior College • 2017-2019</p>
              <p className="text-slate-400 font-light">CGPA: 9.94 • Ranked as top student</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-12 text-slate-100">Certifications</h2>
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: false }} className="flex items-start gap-4">
              <div className="w-2 h-2 bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-light text-slate-200">Advanced Embedded Systems</h3>
                <p className="text-slate-500 font-light text-sm">Vector India • 2024</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: false }} className="flex items-start gap-4">
              <div className="w-2 h-2 bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-light text-slate-200">AI: Transformative Learning with Tech Saksham</h3>
                <p className="text-slate-500 font-light text-sm">AICTE, Microsoft, SAP • 2024</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: false }} className="flex items-start gap-4">
              <div className="w-2 h-2 bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-light text-slate-200">JEE Mains - 91% Score</h3>
                <p className="text-slate-500 font-light text-sm">All India Entrance Examination • Top Student</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center max-w-2xl px-6"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-slate-100">Get In Touch</h2>
          <p className="text-lg font-light text-slate-400 mb-12 leading-relaxed">
            Let's discuss embedded systems, firmware development, or your next project. Always open to new opportunities and collaborations.
          </p>
          <div className="flex flex-col gap-4 items-center">
            <motion.a
              href="mailto:harshavardhankaturi@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 border border-slate-700 text-slate-300 font-light rounded transition-all duration-300 hover:text-slate-100 hover:bg-slate-800/30"
            >
              Email Me
            </motion.a>
            <p className="text-sm text-slate-500">Phone: +91 9676227794 | Bengaluru, Karnataka</p>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
