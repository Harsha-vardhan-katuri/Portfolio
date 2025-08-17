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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="flex items-center justify-center h-20 px-4">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`px-4 py-2 rounded-full text-sm font-black transition-all ${
                activeSection === section.id
                  ? "bg-gray-800 text-white"
                  : `${section.color} hover:text-white hover:bg-gray-800`
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
