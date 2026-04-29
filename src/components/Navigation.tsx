import { useState, useEffect } from "react";
import { Home, User, Cpu, Briefcase, Award, FolderKanban, Mail } from "lucide-react";

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const sections = ["home", "about", "skills", "projects", "experience", "certifications", "contact"];
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const { offsetTop, offsetHeight } = el;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "Home", id: "home", icon: Home },
    { label: "About", id: "about", icon: User },
    { label: "Skills", id: "skills", icon: Cpu },
    { label: "Projects", id: "projects", icon: FolderKanban },
    { label: "Experience", id: "experience", icon: Briefcase },
    { label: "Certifications", id: "certifications", icon: Award },
    { label: "Contact", id: "contact", icon: Mail },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-white/[0.04] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeSection === item.id;
          return (
            <button
              key={item.id}
              data-magnetic
              onClick={() => scrollToSection(item.id)}
              className={`group relative flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-xs font-medium transition-colors duration-300 ${
                active ? "text-primary" : "text-foreground/60 hover:text-foreground"
              }`}
              aria-label={item.label}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
              {active && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-[6px] h-[2px] w-6 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
