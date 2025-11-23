import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import type { Metadata } from "next"
import type React from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

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
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`} style={{ backgroundColor: "#00072D" }}>
        {children}
      </body>
    </html>
  )
}
