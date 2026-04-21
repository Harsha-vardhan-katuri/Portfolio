import "./globals.css"
import type { Metadata, Viewport } from "next"
import type React from "react"
import { LenisProvider } from "@/lib/lenis-context"

export const metadata: Metadata = {
  title: "Harsha Vardhan Katuri - Premium Portfolio",
  description: "Premium digital portfolio with WebGL background and smooth physics",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="font-sans bg-black text-[#e5e5e5] antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
