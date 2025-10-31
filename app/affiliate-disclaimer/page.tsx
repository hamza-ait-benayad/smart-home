import type { Metadata } from "next"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Affiliate Disclaimer",
  description:
    "Echofex uses affiliate links and may earn a commission at no extra cost to you. Read our full affiliate disclosure.",
  alternates: {
    canonical: "/affiliate-disclaimer",
  },
  openGraph: {
    title: "Affiliate Disclaimer | Echofex",
    description:
      "Learn how Echofex uses affiliate links to support the site at no extra cost to you.",
    url: "https://www.echofex.me/affiliate-disclaimer",
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
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AffiliateDisclaimerPage() {
  const formattedDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4">
      <section className="py-16 max-w-3xl">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Affiliate Disclaimer
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last Updated: {formattedDate}</p>

        <div className="prose prose-neutral dark:prose-invert mt-8">
          <p>
            At <strong>Echofex</strong>, we believe in transparency and honesty with our audience. Please note that some of the links on this website are affiliate links, meaning that at no additional cost to you, we may earn a small commission if you click through and make a purchase.
          </p>
          <p>
            Our goal is to provide valuable information, tools, and recommendations to help you make informed decisions. We only promote products or services that we have personally used, tested, or believe will add genuine value to our readers.
          </p>
          <p>
            Your support through these affiliate links helps us maintain and grow Echofex, so we can continue offering high-quality content and resources for free.
          </p>
          <p>
            Thank you for supporting Echofex! 🙌
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}


