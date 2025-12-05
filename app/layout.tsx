import "./globals.css"
import type { Metadata } from "next"
import type React from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Harsha Vardhan Katuri - Portfolio",
  description: "Embedded Systems and IoT Specialist",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans" style={{ backgroundColor: "#00072D", fontFamily: "Calibri, sans-serif" }}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
