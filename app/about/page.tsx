import Navigation from "../components/Navigation"
import About from "../components/About"

export default function AboutPage() {
  return (
    <main className="text-white min-h-screen" style={{ backgroundColor: "#4A1F5C" }}>
      <Navigation activeSection="about" />
      <div className="pt-20">
        <About />
      </div>
    </main>
  )
}
