"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ExternalLink, Share2, Heart, ShoppingCart, Check, Zap, Shield, Wifi } from "lucide-react"
import Image from "next/image"
import { urlFor } from "@/lib/sanity.client"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)


  const savings = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const gallery = (product.gallery && product.gallery.length > 0
    ? product.gallery
    : product.image
      ? [product.image]
      : []
  ) as NonNullable<typeof product.gallery>;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <span>Home</span>
        <span>/</span>
        <span>Products</span>
        <span>/</span>
        <span>{product.category?.title}</span>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-lg bg-muted/30">
            <Image
              src={urlFor(gallery[selectedImage]).width(1200).height(1200).url() || "/placeholder.svg"}
              alt={product.name}
              width={1200}
              height={1200}
              className="w-full h-96 lg:h-[500px] object-cover"
            />
          </div>

          {/* Image Gallery */}
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? "border-violet-600" : "border-border"
                    }`}
                >
                  <Image
                    src={urlFor(image).width(400).height(400).url() || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.category?.title}</Badge>
              <span className="text-sm text-muted-foreground">{product.brand}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">Model: {product.model}</span>
            </div>

            <h1 className="font-playfair font-bold text-3xl lg:text-4xl text-foreground mb-4">{product.name}</h1>

            <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-lg">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="font-bold text-3xl text-foreground">${product.price}</span>
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">Save {savings}%</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Free shipping on orders over $50. 30-day return policy.</p>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-foreground">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(product.features ?? []).map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white flex-1 text-base py-3">
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Buy Now - ${product.price}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`px-6 ${isWishlisted ? "text-red-600 border-red-200" : ""}`}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>

            <Button variant="outline" size="lg" onClick={handleShare} className="px-6 bg-transparent">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-violet-600" />
              <span>Energy Star Certified</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-violet-600" />
              <span>3-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wifi className="h-4 w-4 text-violet-600" />
              <span>Easy Setup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features & Benefits</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(product.specifications ?? []).map(spec => (
                    <div key={spec.key} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="font-medium text-foreground">{spec.key}</span>
                      <span className="text-muted-foreground text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Features & Benefits</h3>
                <div className="space-y-4">
                  {(product.features ?? []).map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground">{feature}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Advanced {feature.toLowerCase()} technology that enhances your smart home experience.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {/* Review Summary */}
                  <div className="flex items-center gap-6 pb-6 border-b border-border">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">{product.rating}</div>
                      <div className="flex items-center justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{product.reviews} reviews</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground">
                        Based on {product.reviews} verified customer reviews. Most customers praise the easy setup and
                        energy savings.
                      </p>
                    </div>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-4">
                    <div className="border-b border-border pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-medium">John D.</span>
                        <span className="text-sm text-muted-foreground">Verified Purchase</span>
                      </div>
                      <p className="text-muted-foreground">
                        "Excellent product! Easy to install and the energy savings are noticeable. The app is intuitive
                        and the scheduling features work perfectly."
                      </p>
                    </div>

                    <div className="border-b border-border pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="font-medium">Sarah M.</span>
                        <span className="text-sm text-muted-foreground">Verified Purchase</span>
                      </div>
                      <p className="text-muted-foreground">
                        "Great smart thermostat with lots of features. Setup was straightforward. Only minor issue is
                        the app can be slow sometimes."
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
