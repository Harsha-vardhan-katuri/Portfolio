"use client"

import { DarkBackground } from "@/components/DarkBackground"
import { MinimalHUD } from "@/components/MinimalHUD"
import { InteractivePressList } from "@/components/InteractivePressList"
import Hero from "@/app/components/Hero"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <DarkBackground />
      <MinimalHUD />
      <div className="relative z-10 pt-20">
        <Hero />
        <section id="press" className="min-h-screen flex items-center justify-center">
          <InteractivePressList />
        </section>
      </div>
    </main>
  )
}
