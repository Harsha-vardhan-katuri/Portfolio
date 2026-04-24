'use client'

import { motion } from 'framer-motion'
import { DarkShaderBackground } from '@/components/DarkShaderBackground'
import { HUDNav } from '@/components/HUDNav'
import { PressGrid } from '@/components/PressGrid'

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
      <DarkShaderBackground />
      <HUDNav />

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
            Creative Developer & Designer
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-lg font-light text-slate-500 max-w-xl mx-auto leading-relaxed"
          >
            Crafting premium digital experiences with cutting-edge technology and meticulous attention to detail. Specializing in interactive animations, smooth scrolling, and immersive web design.
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
        <div className="w-full px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-5xl md:text-6xl font-light text-center mb-20 text-slate-100"
          >
            Press & Features
          </motion.h2>
          <PressGrid />
        </div>
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
            I'm a full-stack developer passionate about creating beautiful, functional digital experiences. With expertise in modern web technologies and a keen eye for design, I bridge the gap between creative vision and technical implementation.
          </p>
          <p className="text-lg font-light text-slate-400 leading-relaxed">
            My journey in tech started with a curiosity about how things work. Today, I use that mindset to solve complex problems through clean code, thoughtful design, and innovative solutions. Whether it's building interactive animations or architecting scalable systems, I'm committed to excellence.
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
              <h3 className="text-2xl font-light text-slate-200 mb-2">Senior Developer</h3>
              <p className="text-slate-500 font-light mb-3">Tech Company • 2022 - Present</p>
              <p className="text-slate-400 font-light leading-relaxed">Led development of high-performance web applications using React, TypeScript, and modern tooling. Mentored junior developers and established best practices for code quality.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: false }}>
              <h3 className="text-2xl font-light text-slate-200 mb-2">Full Stack Developer</h3>
              <p className="text-slate-500 font-light mb-3">Digital Agency • 2020 - 2022</p>
              <p className="text-slate-400 font-light leading-relaxed">Built responsive websites and web applications for diverse clients. Focused on performance optimization, accessibility, and user experience design.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: false }}>
              <h3 className="text-2xl font-light text-slate-200 mb-2">Junior Developer</h3>
              <p className="text-slate-500 font-light mb-3">Startup • 2018 - 2020</p>
              <p className="text-slate-400 font-light leading-relaxed">Started my professional journey building features for a fast-paced startup. Learned full development lifecycle from concept to deployment.</p>
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
              <h3 className="text-xl font-light text-slate-200 mb-4">Frontend</h3>
              <p className="text-slate-400 font-light leading-relaxed">React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js, WebGL, Responsive Design</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: false }}>
              <h3 className="text-xl font-light text-slate-200 mb-4">Backend</h3>
              <p className="text-slate-400 font-light leading-relaxed">Node.js, Express, PostgreSQL, MongoDB, REST APIs, GraphQL, Authentication & Security</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: false }}>
              <h3 className="text-xl font-light text-slate-200 mb-4">Tools & Platforms</h3>
              <p className="text-slate-400 font-light leading-relaxed">Git, Docker, Vercel, AWS, Firebase, Figma, VS Code, CI/CD Pipelines</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: false }}>
              <h3 className="text-xl font-light text-slate-200 mb-4">Other</h3>
              <p className="text-slate-400 font-light leading-relaxed">SEO Optimization, Performance Tuning, Accessibility (WCAG), UI/UX Design Principles</p>
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
              <h3 className="text-2xl font-light text-slate-200 mb-2">Interactive Design Platform</h3>
              <p className="text-slate-500 font-light mb-3">React, Three.js, WebGL</p>
              <p className="text-slate-400 font-light leading-relaxed">A browser-based design tool with real-time 3D visualization and collaborative features. Implemented smooth animations and optimized performance for seamless user experience.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: false }} className="border-l border-slate-700 pl-6">
              <h3 className="text-2xl font-light text-slate-200 mb-2">E-Commerce Platform</h3>
              <p className="text-slate-500 font-light mb-3">Next.js, PostgreSQL, Stripe</p>
              <p className="text-slate-400 font-light leading-relaxed">Full-stack e-commerce solution with advanced filtering, payment integration, and admin dashboard. Optimized for conversion with smooth checkout experience.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: false }} className="border-l border-slate-700 pl-6">
              <h3 className="text-2xl font-light text-slate-200 mb-2">Data Visualization Dashboard</h3>
              <p className="text-slate-500 font-light mb-3">React, D3.js, Node.js</p>
              <p className="text-slate-400 font-light leading-relaxed">Real-time analytics dashboard with interactive charts and deep insights. Built with focus on performance and clarity of complex data sets.</p>
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
              <h3 className="text-2xl font-light text-slate-200 mb-2">Bachelor of Technology in Computer Science</h3>
              <p className="text-slate-500 font-light mb-3">University Name • 2018</p>
              <p className="text-slate-400 font-light">GPA: 3.8/4.0 • First Class with Distinction</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: false }}>
              <h3 className="text-2xl font-light text-slate-200 mb-2">Advanced Web Development Bootcamp</h3>
              <p className="text-slate-500 font-light mb-3">Online Platform • 2017</p>
              <p className="text-slate-400 font-light">Completed comprehensive training in full-stack web development</p>
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
                <h3 className="text-lg font-light text-slate-200">AWS Certified Solutions Architect</h3>
                <p className="text-slate-500 font-light text-sm">Amazon Web Services • 2023</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: false }} className="flex items-start gap-4">
              <div className="w-2 h-2 bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-light text-slate-200">Google Cloud Professional Data Engineer</h3>
                <p className="text-slate-500 font-light text-sm">Google Cloud • 2022</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: false }} className="flex items-start gap-4">
              <div className="w-2 h-2 bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-light text-slate-200">MongoDB Certified Developer</h3>
                <p className="text-slate-500 font-light text-sm">MongoDB University • 2021</p>
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
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-slate-100">Let's Create</h2>
          <p className="text-lg font-light text-slate-400 mb-12 leading-relaxed">
            Ready to discuss your next project? I'm always interested in hearing about new ideas and opportunities.
          </p>
          <motion.a
            href="mailto:hello@example.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 border border-slate-700 text-slate-300 font-light rounded transition-all duration-300 hover:text-slate-100 hover:bg-slate-800/30"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </section>
    </main>
  )
}
