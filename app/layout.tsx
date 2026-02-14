import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { WebVitals } from "@/components/web-vitals"

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
  metadataBase: new URL("https://www.echofex.me"),
  title: {
    default: "Echofex - Smart Home & Tech Gadgets | Expert Reviews & Buying Guides",
    template: "%s | Echofex",
  },
  description: "Expert reviews and comprehensive buying guides for smart home devices, IoT gadgets, and home automation technology. Discover the best tech solutions for your connected home.",
  generator: "Next.js",
  applicationName: "Echofex",
  referrer: "origin-when-cross-origin",
  keywords: [
    "smart home",
    "IoT devices",
    "home automation",
    "tech reviews",
    "smart gadgets",
    "connected home",
    "smart thermostat",
    "security cameras",
    "smart speakers",
    "home automation hub",
    "smart lighting",
    "IoT reviews",
  ],
  authors: [{ name: "Echofex Team", url: "https://www.echofex.me" }],
  creator: "Echofex",
  publisher: "Echofex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "technology",
  classification: "Smart Home Technology & Reviews",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.echofex.me",
    siteName: "Echofex",
    title: "Echofex - Smart Home & Tech Gadgets | Expert Reviews & Buying Guides",
    description: "Expert reviews and comprehensive buying guides for smart home devices, IoT gadgets, and home automation technology.",
    images: [
      {
        url: "/echofex-icon-logo.png",
        width: 1200,
        height: 630,
        alt: "Echofex - Smart Home Technology Reviews",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@echofex",
    creator: "@echofex",
    title: "Echofex - Smart Home & Tech Gadgets",
    description: "Expert reviews and buying guides for smart home devices and home automation technology.",
    images: ["/echofex-icon-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "a6KlWNchltIO-A2N_vtecb1fUq5R2m4TsVoxnyNK1Ts",
  },
  alternates: {
    canonical: "https://www.echofex.me",
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

        {/* Web Vitals tracking */}
        <WebVitals />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.echofex.me/#organization",
              name: "Echofex",
              legalName: "Echofex",
              description: "Expert reviews and comprehensive guides for smart home devices, IoT gadgets, and home automation technology. Helping consumers make informed decisions about connected home technology.",
              url: "https://www.echofex.me",
              logo: {
                "@type": "ImageObject",
                "@id": "https://www.echofex.me/#logo",
                url: "https://www.echofex.me/echofex-icon-logo.png",
                contentUrl: "https://www.echofex.me/echofex-icon-logo.png",
                caption: "Echofex Logo",
                inLanguage: "en-US",
              },
              image: {
                "@type": "ImageObject",
                "@id": "https://www.echofex.me/#logo",
                url: "https://www.echofex.me/echofex-icon-logo.png",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-555-123-4567",
                contactType: "customer service",
                email: "hello@echofex.com",
                areaServed: "US",
                availableLanguage: ["en"],
              },
              sameAs: [
                "https://twitter.com/echofex",
                "https://facebook.com/echofex",
                "https://linkedin.com/company/echofex",
                "https://youtube.com/c/echofex",
                "https://instagram.com/echofex",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              foundingDate: "2024",
              knowsAbout: [
                "Smart Home Technology",
                "Internet of Things",
                "Home Automation",
                "Smart Devices",
                "Connected Home",
                "IoT Devices",
                "Smart Home Security",
              ],
              areaServed: {
                "@type": "Country",
                name: "United States",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
