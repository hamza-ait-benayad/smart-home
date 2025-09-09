import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { PerformanceMonitor } from "@/components/performance-monitor"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
})

const sourceSans = Source_Sans_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "600"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://techhomehub.com"),
  title: {
    default: "Echofex - Smart Home & Tech Gadgets",
    template: "%s | Echofex",
  },
  description: "Expert reviews and guides for smart home devices, IoT gadgets, and home automation technology.",
  generator: "Next.js",
  applicationName: "Echofex",
  referrer: "origin-when-cross-origin",
  keywords: ["smart home", "IoT", "home automation", "tech reviews", "gadgets"],
  authors: [{ name: "Echofex Team", url: "https://www.echofex.me" }],
  creator: "Echofex",
  publisher: "Echofex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "automation",
  other: {
    'google-site-verification': 'a6KlWNchltIO-A2N_vtecb1fUq5R2m4TsVoxnyNK1Ts',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://www.echofex.me/" />
        <link rel="icon" href="/echofex-icon-logo.png" sizes="any" />
        <link rel="icon" href="/echofex-icon-logo.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="google-site-verification" content="a6KlWNchltIO-A2N_vtecb1fUq5R2m4TsVoxnyNK1Ts" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={`${playfair.variable} ${sourceSans.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <Header />
            <main>{children}</main>
          </div>
        </ThemeProvider>

        {/* Added performance monitoring component */}
        <PerformanceMonitor />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Echofex",
              description: "Expert reviews and guides for smart home devices and technology",
              url: "https://www.echofex.me",
              logo: "https://www.echofex.me/echofex-icon-logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-555-123-4567",
                contactType: "customer service",
                email: "hello@echofex.com",
              },
              sameAs: [
                "https://twitter.com/echofex",
                "https://facebook.com/echofex",
                "https://linkedin.com/company/echofex",
                "https://youtube.com/c/echofex",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
