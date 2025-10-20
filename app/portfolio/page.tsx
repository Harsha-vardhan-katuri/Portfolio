import Navigation from "../components/Navigation"
import Projects from "../components/Projects"

export default function PortfolioPage() {
  return (
    <main className="text-white min-h-screen" style={{ backgroundColor: "#00001c" }}>
      <Navigation activeSection="projects" />
      <div className="pt-20">
        <Projects />
      </div>
    </main>
  )
}
