import React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

const title = "Iam Alvarez Portfolio"
const description =
  "Portfolio personal de Iam Alvarez Orellana, especialista en ciberseguridad ofensiva: certificaciones, proyectos y participaciones en CTF"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    locale: "es_PE",
    type: "profile",
    images: [
      {
        url: "/profile.jpg",
        width: 453,
        height: 618,
        alt: "Iam Alvarez Orellana",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/profile.jpg"],
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
