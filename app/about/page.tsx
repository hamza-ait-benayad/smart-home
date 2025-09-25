import type { Metadata } from "next"
import Image from "next/image"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About Echofex - Smart Home Experts",
  description:
    "Learn about Echofex — our mission, values, and how we help you choose the best smart home devices with honest reviews and practical guides.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Echofex - Smart Home Experts",
    description:
      "Our mission is to simplify smart home technology with expert reviews and guides.",
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
    title: "About Echofex - Smart Home Experts",
    description:
      "We help you make confident smart home purchases with expert, unbiased guidance.",
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
              About Echofex
            </h1>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Echofex is your trusted guide to smart home devices and connected living. We combine hands-on testing
              with practical advice to help you choose products that fit your home, your lifestyle, and your budget.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From thermostats and security systems to lighting and voice assistants, our team evaluates how products
              perform in real homes — not just on spec sheets. Our goal is simple: make smart homes simpler.
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
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="mt-2 text-muted-foreground">
              Empower every homeowner to build a smarter, safer, and more efficient home — without the guesswork.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">How We Review</h2>
            <p className="mt-2 text-muted-foreground">
              We test devices for setup, reliability, integrations, and everyday experience. We disclose affiliate
              relationships and keep our recommendations independent.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">What We Cover</h2>
            <p className="mt-2 text-muted-foreground">
              Thermostats, security, lighting, energy, hubs, voice assistants, cameras, doorbells, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="rounded-2xl border bg-muted/30 p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-semibold">Work With Us</h3>
          <p className="mt-2 text-muted-foreground">
            Have a product you want us to test, or feedback to share? Reach out at
            <span className="ml-1 font-medium text-foreground">hello@echofex.com</span>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}


