import Navigation from "../components/Navigation"
import About from "../components/About"

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation activeSection="about" />
      <div className="pt-20">
        <About />
      </div>
    </main>
  )
}
