import Navigation from "../components/Navigation"
import Projects from "../components/Projects"

export default function PortfolioPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation activeSection="projects" />
      <div className="pt-20">
        <Projects />
      </div>
    </main>
  )
}
