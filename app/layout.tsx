import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Classic Games",
  description: "A collection of classic arcade games reimagined for the web",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        </head>
        <body className={`${inter.className} min-h-screen bg-background antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 container">
              {children}
            </main>
            <SiteFooter />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
} 