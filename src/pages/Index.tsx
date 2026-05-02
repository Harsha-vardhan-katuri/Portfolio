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
import { PageTransition } from "@/components/PageTransition";
import { ShaderBackground } from "@/components/ShaderHero";

const Index = () => {
  return (
    <SmoothScroll>
      <div className="relative">
        <PageTransition />
        <ShaderBackground />
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
