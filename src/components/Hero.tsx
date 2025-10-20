import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <p className="text-primary text-lg md:text-xl font-medium animate-fade-in">
              Hi, I'm
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text animate-fade-in-up">
              Harsha Vardhan Katuri
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Firmware Engineer & IoT Developer
            </h2>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            Crafting innovative embedded systems and IoT solutions with expertise in 
            C/C++, ESP32, and cutting-edge firmware development. Passionate about 
            building technology that makes a difference.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect animate-glow-pulse"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
              <Mail className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-effect rounded-full hover:scale-110 transition-smooth hover:glow-effect"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-effect rounded-full hover:scale-110 transition-smooth hover:glow-effect"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:harsha@example.com"
              className="p-3 glass-effect rounded-full hover:scale-110 transition-smooth hover:glow-effect"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float"
        >
          <ArrowDown className="h-8 w-8 text-primary" />
        </button>
      </div>
    </section>
  );
};
