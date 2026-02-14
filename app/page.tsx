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
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.echofex.me/#website",
              name: "Echofex",
              description:
                "Expert reviews and guides for smart home devices, IoT gadgets, and home automation technology.",
              url: "https://www.echofex.me",
              inLanguage: "en-US",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.echofex.me/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@id": "https://www.echofex.me/#organization",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What are the best smart home devices for beginners?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "For beginners, we recommend starting with smart speakers (like Amazon Echo or Google Home), smart plugs, and smart bulbs. These devices are easy to set up, affordable, and provide immediate benefits without requiring complex installation.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I choose the right smart home hub?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Choose a smart home hub based on your existing ecosystem (Amazon Alexa, Google Home, or Apple HomeKit), the devices you want to connect, your budget, and whether you need local processing or cloud-based control. Consider compatibility with Zigbee, Z-Wave, and Wi-Fi devices.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are smart home devices secure?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Smart home devices can be secure when properly configured. Use strong passwords, enable two-factor authentication, keep firmware updated, use a separate network for IoT devices, and choose reputable brands with good security track records.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the difference between Wi-Fi, Zigbee, and Z-Wave smart home devices?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Wi-Fi devices connect directly to your router and don't need a hub but consume more power. Zigbee and Z-Wave are low-power mesh network protocols that require a hub but offer better battery life, range, and network stability for large smart home setups.",
                  },
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.echofex.me",
                },
              ],
            },
          ]),
        }}
      />
    </>
  )
}
