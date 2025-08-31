import Link from "next/link"
import { Home, Mail, Phone } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const footerLinks = {
    products: [
      { name: "Smart Thermostats", href: "/products/thermostats" },
      { name: "Security Systems", href: "/products/security" },
      { name: "Smart Lighting", href: "/products/lighting" },
      { name: "Voice Assistants", href: "/products/voice-assistants" },
    ],
    resources: [
      { name: "Buying Guides", href: "/articles/buying-guides" },
      { name: "Installation Tips", href: "/articles/installation" },
      { name: "Troubleshooting", href: "/articles/troubleshooting" },
      { name: "Product Reviews", href: "/articles/reviews" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  }

  return (
    <footer className="bg-muted/50 dark:bg-muted/20 border-t border-border transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex space-x-2">
            <div className="h-12 w-12 rounded-lg bg-foreground flex items-center justify-center">
            <Image src={"/echofex-icon-logo.png"} alt="logo" height={1000} width={1000} className="w-10 h-10" />
            </div>
            <span className="font-playfair font-bold text-4xl text-foreground">Echofex</span>
          </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted source for smart home device reviews, guides, and recommendations. Elevate your space with
              the latest technology.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@techhomehub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-violet-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-violet-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-violet-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 TechHome Hub. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Built with Next.js and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
