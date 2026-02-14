import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 - Page Not Found | Echofex",
  description: "The page you're looking for doesn't exist. Explore our smart home products and articles.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Go Home
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Browse Products
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/articles"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Read Articles
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Popular Pages</h3>
          <ul className="space-y-2 text-left max-w-md mx-auto">
            <li>
              <Link href="/about" className="text-primary hover:underline">
                About Echofex
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-primary hover:underline">
                Smart Home Products
              </Link>
            </li>
            <li>
              <Link href="/articles" className="text-primary hover:underline">
                Tech Guides & Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
