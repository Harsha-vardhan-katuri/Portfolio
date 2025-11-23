import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import type React from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

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
      <body className={`${inter.variable} font-sans`} style={{ backgroundColor: "#00072D" }}>
        {children}
      </body>
    </html>
  )
}
