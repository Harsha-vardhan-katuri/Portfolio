import Navigation from "../components/Navigation"
import Services from "../components/Services"

export default function ServicesPage() {
  return (
    <main className="text-white min-h-screen" style={{ backgroundColor: "#4A1F5C" }}>
      <Navigation activeSection="services" />
      <div className="pt-20">
        <Services />
      </div>
    </main>
  )
}
