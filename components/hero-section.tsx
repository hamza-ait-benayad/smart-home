import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Wifi } from "lucide-react"
import { OptimizedImage } from "./optimized-image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-violet-50/30 dark:to-violet-950/10">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-playfair font-bold text-4xl lg:text-6xl leading-tight text-foreground">
                Elevate Your Space with <span className="text-violet-600">Smart Innovations</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Discover cutting-edge gadgets that seamlessly integrate into your smart home. Transform your living
                space with the latest technology.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-violet-600" />
                <span>Energy Efficient</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-violet-600" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wifi className="h-4 w-4 text-violet-600" />
                <span>Easy Setup</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 text-base font-semibold group transition-all duration-200"
              >
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-300 dark:hover:bg-violet-950/20 px-8 py-3 text-base bg-transparent transition-all duration-200"
              >
                Read Reviews
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-border">
              <div>
                <div className="font-playfair font-bold text-2xl text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Products Reviewed</div>
              </div>
              <div>
                <div className="font-playfair font-bold text-2xl text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="font-playfair font-bold text-2xl text-foreground">4.9</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <OptimizedImage
                src="/smart-home-setup.png"
                alt="Smart home setup with connected devices"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl w-full"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Background decoration */}
            <div className="absolute -top-10 -right-16 w-72 h-72 bg-violet-100 dark:bg-violet-900/50 rounded-full blur-3xl opacity-70 transition-colors duration-300" />
            <div className="absolute -bottom-14 -left-15 w-64 h-64 bg-violet-200 dark:bg-violet-800/50 rounded-full blur-3xl opacity-50 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </section>
  )
}
