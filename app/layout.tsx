import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Fredoka } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "MathTunes - Learn Math with Music!",
  description: "A fun and interactive way for kids to learn math through music and games",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${fredoka.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
