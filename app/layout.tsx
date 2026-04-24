import "./globals.css"
import type { Metadata, Viewport } from "next"
import type React from "react"
import { LenisProvider } from "@/lib/lenis-context"

export const metadata: Metadata = {
  title: "Harsha Vardhan Katuri - Premium Portfolio",
  description: "Premium digital portfolio with dark theme, smooth scrolling, and interactive animations",
  generator: "v0.app",
  themeColor: "#0a0a0a",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="font-sans bg-slate-950 text-slate-100 antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
