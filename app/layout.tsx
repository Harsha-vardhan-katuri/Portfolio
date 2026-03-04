import "./globals.css"
import type { Metadata } from "next"
import type React from "react"
import { LenisProvider } from "@/lib/lenis-context"

export const metadata: Metadata = {
  title: "Harsha Vardhan Katuri - Luxury Portfolio",
  description: "High-end portfolio with premium motion design and smooth scrolling",
  generator: "v0.app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
