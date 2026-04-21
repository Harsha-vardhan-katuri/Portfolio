'use client'

import { WebGLBackground } from '@/components/WebGLBackground'
import Hero from '@/app/components/Hero'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <WebGLBackground />
      <div className="relative z-10">
        <Hero />
      </div>
    </main>
  )
}
