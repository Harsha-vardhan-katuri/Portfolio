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
import { SectionTransition } from "@/components/SectionTransition";

const Index = () => {
  return (
    <SmoothScroll>
      <div className="relative">
        <PageTransition />
        <ShaderBackground />
        <Navigation />
        <Hero />
        <SectionTransition><About /></SectionTransition>
        <SectionTransition><Skills /></SectionTransition>
        <SectionTransition><HorizontalProjects /></SectionTransition>
        <SectionTransition><Experience /></SectionTransition>
        <SectionTransition><Education /></SectionTransition>
        <SectionTransition><Certifications /></SectionTransition>
        <SectionTransition><Contact /></SectionTransition>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Index;
