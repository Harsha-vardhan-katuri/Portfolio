import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 150;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* Desktop Navigation - Full width bar like ArgusVPN */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/60 backdrop-blur-xl border-b border-foreground/5' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="text-xl font-bold font-display tracking-wider text-foreground"
            >
              HVK
            </button>

            {/* Center nav links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    activeSection === item.id
                      ? "text-foreground"
                      : "text-foreground/40 hover:text-foreground/70"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side - CTA */}
            <button
              onClick={() => scrollToSection("contact")}
              className="px-5 py-2 text-sm font-semibold bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
            >
              Contact Me
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-foreground/5">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection("home")} className="text-xl font-bold font-display text-foreground tracking-wider">
              HVK
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {isMobileMenuOpen && (
            <div className="mt-3 pb-2 animate-fade-in">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2.5 text-sm transition-colors ${
                    activeSection === item.id ? "text-foreground font-medium" : "text-foreground/40 hover:text-foreground/70"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
