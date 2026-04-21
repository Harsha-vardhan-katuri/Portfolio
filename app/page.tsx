'use client'

import { WebGLBackground } from '@/components/WebGLBackground'
import Hero from '@/app/components/Hero'

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      {/* Fixed WebGL Background */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <WebGLBackground />
      </div>

      {/* Content on top */}
      <div className="relative z-10 w-full">
        <Hero />
      </div>
    </main>
  )
}
