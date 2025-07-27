import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Know Me - Your Digital Identity, Beautifully Crafted",
  description:
    "Create stunning, interactive personal websites that showcase your unique story. From portfolios to business cards, build your digital presence with our revolutionary platform.",
  keywords: "personal website, digital business card, portfolio, online presence, website builder",
  authors: [{ name: "Know Me Team" }],
  creator: "Know Me",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://knowme.site",
    title: "Know Me - Your Digital Identity, Beautifully Crafted",
    description: "Create stunning personal websites that showcase who you are",
    siteName: "Know Me",
  },
  twitter: {
    card: "summary_large_image",
    title: "Know Me - Your Digital Identity, Beautifully Crafted",
    description: "Create stunning personal websites that showcase who you are",
    creator: "@knowmeapp",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
