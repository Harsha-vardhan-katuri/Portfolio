import { BackgroundEffects } from "@/components/BackgroundEffects";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { HorizontalProjects } from "@/components/HorizontalProjects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MagneticCursor } from "@/components/MagneticCursor";
import { Marquee } from "@/components/Marquee";
import { PageTransition } from "@/components/PageTransition";

const Index = () => {
  return (
    <SmoothScroll>
      <div className="relative">
        <PageTransition />
        <BackgroundEffects />
        <MagneticCursor />
        <Navigation />
        <Hero />
        <Marquee
          items={[
            "FIRMWARE",
            "EMBEDDED",
            "IOT",
            "ESP32",
            "LORA",
            "AI",
            "PYTHON",
            "C / C++",
          ]}
          speed={45}
        />
        <About />
        <Skills />
        <HorizontalProjects />
        <Marquee
          items={[
            "SHIPPED",
            "PRODUCTION",
            "OPEN TO WORK",
            "AVAILABLE 2026",
            "BENGALURU",
          ]}
          speed={55}
          reverse
        />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Index;
