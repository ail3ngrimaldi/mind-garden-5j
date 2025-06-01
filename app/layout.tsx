import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, DM_Sans } from "next/font/google"
import "./globals.css"

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MindGarden+ MVP",
  description: "A wellness application that helps users track their mood and develop healthy habits",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${bricolageGrotesque.variable} ${dmSans.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
