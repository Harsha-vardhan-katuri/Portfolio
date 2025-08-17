import Navigation from "../components/Navigation"
import Services from "../components/Services"

export default function ServicesPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation activeSection="services" />
      <div className="pt-20">
        <Services />
      </div>
    </main>
  )
}
