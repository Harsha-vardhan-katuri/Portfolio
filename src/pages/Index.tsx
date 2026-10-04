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
import Lightfall from "@/components/Lightfall";

const Index = () => {
  return (
    <SmoothScroll>
      <div className="relative">
        <PageTransition />
        <Navigation />
        <Hero />
        <div className="relative isolate">
          <div className="sticky top-0 h-screen -mb-[100vh] pointer-events-none" aria-hidden="true">
            <Lightfall
              colors={["#FF1717", "#FFFFFF"]}
              backgroundColor="#0A29FF"
              speed={0.5}
              streakCount={4}
              streakWidth={1}
              streakLength={1}
              glow={1}
              density={1}
              twinkle={1}
              zoom={2}
              backgroundGlow={1}
              opacity={0.9}
              mouseInteraction={false}
            />
          </div>
          <div className="relative z-10">
            <About />
            <Skills />
            <HorizontalProjects />
            <Experience />
            <Education />
            <Certifications />
            <Contact />
          </div>
        </div>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Index;
