import type { Metadata } from "next"
import Image from "next/image"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About Echofex - Your Smart Home Guide",
  description:
    "Learn about Echofex — we help you discover the best smart home products on Amazon with honest reviews, comparisons, and buying guides.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Echofex - Your Smart Home Guide",
    description:
      "We help you make smart, informed shopping decisions with honest product reviews and guides.",
    url: "https://www.echofex.me/about",
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
    title: "About Echofex - Your Smart Home Guide",
    description:
      "We help you find smart home products that actually deliver on their promises.",
    images: ["/echofex-icon-logo.png"],
    creator: "@echofex",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4">
      <section className="py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              About Echofex 👋
            </h1>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              We created this platform with one goal in mind: to help you discover the best smart home products available on Amazon — without wasting time searching through endless options.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our team carefully researches and writes honest, easy-to-read articles that highlight product features, pros, cons, and real value. We combine reviews, comparisons, and buying guides so you can make smart, informed shopping decisions.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl border bg-card p-5">
                <p className="text-3xl font-bold text-violet-600">100k+</p>
                <p className="text-sm text-muted-foreground">Readers helped</p>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <p className="text-3xl font-bold text-violet-600">200+</p>
                <p className="text-sm text-muted-foreground">Products reviewed</p>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <p className="text-3xl font-bold text-violet-600">50+</p>
                <p className="text-sm text-muted-foreground">Buying guides</p>
              </div>
            </div>
          </div>
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden border">
            <Image
              src="/smart-home-setup.png"
              alt="Smart home setup with connected devices"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-12 border-t">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold">🔎 Research Products</h2>
            <p className="mt-2 text-muted-foreground">
              We explore different smart home categories and find products worth your attention.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">📝 Write Helpful Guides</h2>
            <p className="mt-2 text-muted-foreground">
              Each article explains what makes a product special, who it's for, and why it might be the right choice.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">🔗 Affiliate Recommendations</h2>
            <p className="mt-2 text-muted-foreground">
              Some links are affiliate links. We may earn a small commission (at no extra cost to you) when you make a purchase through them. This helps us keep the site running and continue creating free, valuable content.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold">Why Trust Us?</h2>
            <p className="mt-2 text-muted-foreground">
              We focus on <strong>quality over quantity</strong>. Every recommendation is based on thorough research, customer feedback, and usability. Our goal is not just to promote products but to genuinely help you find what fits your needs.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="mt-2 text-muted-foreground">
              To make online shopping easier, smarter, and more transparent by guiding you toward smart home products that actually deliver on their promises.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


