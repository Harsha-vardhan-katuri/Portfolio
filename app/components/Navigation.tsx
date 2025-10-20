"use client"

interface NavigationProps {
  activeSection?: string
  setActiveSection?: (section: string) => void
}

export default function Navigation({ activeSection = "home", setActiveSection }: NavigationProps) {
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
    if (setActiveSection) {
      setActiveSection(sectionId)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
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
        }
        
        .nav-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
        }
        
        .wave-text {
          display: inline-block;
          transition: all 0.3s ease;
          color: #ffffff;
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
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center justify-center h-20 px-4">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`nav-button px-4 py-2 rounded-full text-sm font-black transition-all relative ${
                  activeSection === section.id ? "bg-gray-800 text-white" : "text-white hover:bg-white/10"
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
        </div>
      </header>
    </>
  )
}
