"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

interface NavigationProps {
  activeSection?: string
  setActiveSection?: (section: string) => void
}

export default function Navigation({ activeSection = "home", setActiveSection }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certification" },
    { id: "hire", label: "Hire Me" },
  ]

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      setActiveSection?.(sectionId)
      setMobileMenuOpen(false) // Close mobile menu on click
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" })
      }, 50)
    }
  }

  return (
    <>
      <style jsx>{`
        @keyframes wave-letter-once {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            color: #ffffff;
          }
          25% { 
            transform: translateY(-8px) scale(1.1);
            color: #000000;
          }
          50% { 
            transform: translateY(-12px) scale(1.2);
            color: #000000;
          }
          75% { 
            transform: translateY(-8px) scale(1.1);
            color: #000000;
          }
        }
        
        .nav-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          border-radius: 50px;
        }
        
        .nav-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
        }

        .nav-button.active {
          background: linear-gradient(135deg, #8a2be2 0%, #a855f7 100%) !important;
          color: #ffffff !important;
          font-weight: 900;
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(138, 43, 226, 0.8), 0 0 60px rgba(168, 85, 247, 0.6);
          border: 2px solid rgba(168, 85, 247, 0.8);
          padding: 6px 20px !important;
        }
        
        .wave-text {
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        .nav-button:hover .wave-text:nth-child(1) { animation: wave-letter-once 0.8s ease-in-out 0s forwards; }
        .nav-button:hover .wave-text:nth-child(2) { animation: wave-letter-once 0.8s ease-in-out 0.05s forwards; }
        .nav-button:hover .wave-text:nth-child(3) { animation: wave-letter-once 0.8s ease-in-out 0.1s forwards; }
        .nav-button:hover .wave-text:nth-child(4) { animation: wave-letter-once 0.8s ease-in-out 0.15s forwards; }
        .nav-button:hover .wave-text:nth-child(5) { animation: wave-letter-once 0.8s ease-in-out 0.2s forwards; }
        .nav-button:hover .wave-text:nth-child(6) { animation: wave-letter-once 0.8s ease-in-out 0.25s forwards; }
        .nav-button:hover .wave-text:nth-child(7) { animation: wave-letter-once 0.8s ease-in-out 0.3s forwards; }
        .nav-button:hover .wave-text:nth-child(8) { animation: wave-letter-once 0.8s ease-in-out 0.35s forwards; }
        .nav-button:hover .wave-text:nth-child(9) { animation: wave-letter-once 0.8s ease-in-out 0.4s forwards; }
        .nav-button:hover .wave-text:nth-child(10) { animation: wave-letter-once 0.8s ease-in-out 0.45s forwards; }
        .nav-button:hover .wave-text:nth-child(11) { animation: wave-letter-once 0.8s ease-in-out 0.5s forwards; }
        .nav-button:hover .wave-text:nth-child(12) { animation: wave-letter-once 0.8s ease-in-out 0.55s forwards; }
        .nav-button:hover .wave-text:nth-child(13) { animation: wave-letter-once 0.8s ease-in-out 0.6s forwards; }
        .nav-button:hover .wave-text:nth-child(14) { animation: wave-letter-once 0.8s ease-in-out 0.65s forwards; }

        /* Mobile menu animation */
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-item {
          animation: slideIn 0.3s ease forwards;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
        <div className="flex items-center justify-center h-16 md:h-20 px-4">
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 backdrop-blur-xl bg-black/30 rounded-full px-4 xl:px-6 py-3 border border-white/20 shadow-2xl shadow-blue-500/10">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`nav-button px-3 xl:px-6 py-2 rounded-full text-xs xl:text-sm font-black transition-all relative ${
                  activeSection === section.id ? "active" : "text-slate-200 hover:bg-white/10 hover:scale-110"
                }`}
              >
                <span className="relative z-10">
                  {section.label.split("").map((letter, index) => (
                    <span key={index} className="wave-text">
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
              </button>
            ))}
          </div>

          <div className="lg:hidden flex items-center justify-between w-full">
            <span className="text-white font-bold text-lg">Portfolio</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl backdrop-blur-xl bg-black/30 border border-white/20 text-white hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-4 right-4 backdrop-blur-xl bg-black/80 rounded-2xl border border-white/20 shadow-2xl p-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`mobile-menu-item p-3 rounded-xl text-sm font-bold transition-all ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "text-slate-200 bg-white/5 hover:bg-white/10"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
