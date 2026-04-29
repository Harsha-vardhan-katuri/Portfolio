import { BackgroundEffects } from "@/components/BackgroundEffects";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { HorizontalProjects } from "@/components/HorizontalProjects";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MagneticCursor } from "@/components/MagneticCursor";
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
        <About />
        <Skills />
        <HorizontalProjects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Index;
