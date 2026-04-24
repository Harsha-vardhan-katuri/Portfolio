"use client"

import { DarkBackground } from "@/components/DarkBackground"
import Hero from "@/app/components/Hero"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <DarkBackground />
      <div className="relative z-10">
        <Hero />
      </div>
    </main>
  )
}
