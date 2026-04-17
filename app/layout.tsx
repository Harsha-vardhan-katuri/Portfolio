import "./globals.css"
import type { Metadata, Viewport } from "next"
import type React from "react"
import { LenisProvider } from "@/lib/lenis-context"
import dynamic from "next/dynamic"

const SyncedBackgroundAnimation = dynamic(() => import("@/components/SyncedBackgroundAnimation").then(m => m.SyncedBackgroundAnimation), { ssr: false })

export const metadata: Metadata = {
  title: "Harsha Vardhan Katuri - Luxury Portfolio",
  description: "High-end portfolio with premium motion design and smooth scrolling",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <SyncedBackgroundAnimation />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
