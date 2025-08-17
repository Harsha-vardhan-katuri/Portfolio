import Navigation from "../components/Navigation"
import Contact from "../components/Contact"

export default function ContactPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation activeSection="contact" />
      <div className="pt-20">
        <Contact />
      </div>
    </main>
  )
}
