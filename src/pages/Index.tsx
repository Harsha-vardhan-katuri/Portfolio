import { useState, useCallback } from "react";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { IntroAnimation } from "@/components/IntroAnimation";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div className="relative">
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      <BackgroundEffects />
      {introComplete && <Navigation />}
      <Hero introComplete={introComplete} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
