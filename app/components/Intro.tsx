import { ArrowDownCircle } from "lucide-react"

export default function Intro() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Hi, I'm Your Name</h1>
      <p className="text-xl mb-8">A passionate developer specializing in web technologies</p>
      <a
        href="#contact"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Get in touch <ArrowDownCircle className="ml-2 h-5 w-5" />
      </a>
    </section>
  )
}
