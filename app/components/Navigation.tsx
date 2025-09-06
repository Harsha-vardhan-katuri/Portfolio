"use client"

interface NavigationProps {
  activeSection?: string
  setActiveSection?: (section: string) => void
}

export default function Navigation({ activeSection = "home", setActiveSection }: NavigationProps) {
  const sections = [
    { id: "home", label: "Home", color: "text-white" },
    { id: "about", label: "About", color: "text-orange-500" },
    { id: "experience", label: "Experience", color: "text-green-500" },
    { id: "skills", label: "Skills", color: "text-pink-500" },
    { id: "projects", label: "Projects", color: "text-cyan-500" },
    { id: "education", label: "Education", color: "text-purple-500" },
    { id: "certifications", label: "Certification", color: "text-indigo-500" },
    { id: "hire", label: "Hire Me", color: "text-red-500" },
  ]

  const handleSectionClick = (sectionId: string) => {
    if (setActiveSection) {
      setActiveSection(sectionId)
    } else {
      // Fallback for when used outside of Hero component
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <>
      <style jsx>{`
        @keyframes rainbow-wave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .rainbow-wave-text {
          background: linear-gradient(
            45deg,
            #ff0000, #ff7f00, #ffff00, #00ff00, 
            #0000ff, #4b0082, #9400d3, #ff1493,
            #00ffff, #ff69b4, #32cd32, #ffd700
          );
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: rainbow-wave 2s ease-in-out infinite;
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
        
        .nav-button:hover .button-text {
          color: #ffffff !important;
          font-weight: 900;
        }
        
        .nav-button:hover .rainbow-overlay {
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
            rgba(255, 0, 0, 0.1), rgba(255, 127, 0, 0.1), rgba(255, 255, 0, 0.1), 
            rgba(0, 255, 0, 0.1), rgba(0, 0, 255, 0.1), rgba(75, 0, 130, 0.1), 
            rgba(148, 0, 211, 0.1), rgba(255, 20, 147, 0.1)
          );
          background-size: 400% 400%;
          animation: rainbow-wave 1.5s ease-in-out infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 9999px;
        }
        
        .wave-text {
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        .nav-button:hover .wave-text:nth-child(1) { animation-delay: 0s !important; }
        .nav-button:hover .wave-text:nth-child(2) { animation-delay: 0.1s !important; }
        .nav-button:hover .wave-text:nth-child(3) { animation-delay: 0.2s !important; }
        .nav-button:hover .wave-text:nth-child(4) { animation-delay: 0.3s !important; }
        .nav-button:hover .wave-text:nth-child(5) { animation-delay: 0.4s !important; }
        .nav-button:hover .wave-text:nth-child(6) { animation-delay: 0.5s !important; }
        .nav-button:hover .wave-text:nth-child(7) { animation-delay: 0.6s !important; }
        .nav-button:hover .wave-text:nth-child(8) { animation-delay: 0.7s !important; }
        .nav-button:hover .wave-text:nth-child(9) { animation-delay: 0.8s !important; }
        .nav-button:hover .wave-text:nth-child(10) { animation-delay: 0.9s !important; }
        .nav-button:hover .wave-text:nth-child(11) { animation-delay: 1.0s !important; }
        .nav-button:hover .wave-text:nth-child(12) { animation-delay: 1.1s !important; }
        .nav-button:hover .wave-text:nth-child(13) { animation-delay: 1.2s !important; }
        .nav-button:hover .wave-text:nth-child(14) { animation-delay: 1.3s !important; }
        
        @keyframes wave-letter {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            color: #ffffff;
          }
          25% { 
            transform: translateY(-8px) scale(1.1);
            background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          50% { 
            transform: translateY(-12px) scale(1.2);
            background: linear-gradient(45deg, #00ff00, #0000ff, #4b0082);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          75% { 
            transform: translateY(-8px) scale(1.1);
            background: linear-gradient(45deg, #9400d3, #ff1493, #00ffff);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        
        .nav-button:hover .wave-text {
          animation: wave-letter 1.5s ease-in-out infinite;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center justify-center h-20 px-4">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`nav-button px-4 py-2 rounded-full text-sm font-black transition-all relative ${
                  activeSection === section.id
                    ? "bg-gray-800 text-white"
                    : `${section.color} hover:text-white hover:bg-white/10`
                }`}
              >
                <div className="rainbow-overlay"></div>
                <span className="button-text relative z-10">
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
