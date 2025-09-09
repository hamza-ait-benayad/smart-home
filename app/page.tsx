import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Echofex - Smart Home Devices & Tech Gadgets Reviews",
  description:
    "Discover the best smart home devices and tech gadgets. Expert reviews, buying guides, and recommendations for home automation, IoT devices, and connected living.",
  keywords:
    "smart home, IoT devices, home automation, smart gadgets, tech reviews, connected devices, smart thermostat, security cameras",
  authors: [{ name: "Echofex Team" }],
  creator: "Echofex",
  publisher: "Echofex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.echofex.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Echofex - Smart Home Devices & Tech Gadgets Reviews",
    description:
      "Discover the best smart home devices and tech gadgets. Expert reviews, buying guides, and recommendations for home automation.",
    url: "https://www.echofex.me",
    siteName: "Echofex",
    images: [
      {
        url: "/echofex-icon-logo.png",
        width: 1200,
        height: 630,
        alt: "Echofex - Smart Home Technology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echofex - Smart Home Devices & Tech Gadgets Reviews",
    description:
      "Discover the best smart home devices and tech gadgets. Expert reviews, buying guides, and recommendations.",
    images: ["/twitter-image.png"],
    creator: "@echofex",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "a6KlWNchltIO-A2N_vtecb1fUq5R2m4TsVoxnyNK1Ts",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
}

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <FeaturedProducts />
        <BlogSection />
        <Footer />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Echofex",
            description:
              "Expert reviews and guides for smart home devices, IoT gadgets, and home automation technology.",
            url: "https://www.echofex.me",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://www.echofex.me/products?search={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
            publisher: {
              "@type": "Organization",
              name: "Echofex",
              logo: {
                "@type": "ImageObject",
                url: "https://www.echofex.me/echofex-icon-logo.png",
              },
              sameAs: [
                "https://twitter.com/echofex",
                "https://facebook.com/echofex",
                "https://linkedin.com/company/echofex",
              ],
            },
          }),
        }}
      />
    </>
  )
}
