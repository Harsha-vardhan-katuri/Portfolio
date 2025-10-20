import Navigation from "../components/Navigation"
import Contact from "../components/Contact"

export default function ContactPage() {
  return (
    <main className="text-white min-h-screen" style={{ backgroundColor: "#00001c" }}>
      <Navigation activeSection="contact" />
      <div className="pt-20">
        <Contact />
      </div>
    </main>
  )
}
