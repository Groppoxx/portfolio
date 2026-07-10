import React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Iam Alvarez Portfolio",
  description:
    "Portfolio personal de Iam Alvarez Orellana, especialista en ciberseguridad ofensiva: certificaciones, proyectos y participaciones en CTF",
  icons: {
    icon: "/icon.svg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
