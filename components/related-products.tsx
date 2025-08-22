import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { client } from "@/lib/sanity.client"
import { relatedProductsQuery } from "@/lib/queries"


interface RelatedProductsProps {
  currentId: string
  categoryId: string
}

export async function RelatedProducts({ categoryId, currentId }: RelatedProductsProps) {
  // Filter out current product and show related ones
  const relatedProducts: Product[] = await client.fetch(relatedProductsQuery,{categoryId, currentId})

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair font-bold text-3xl text-foreground mb-4">You Might Also Like</h2>
          <p className="text-lg text-muted-foreground">Complete your smart home setup with these popular products</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((product) => {
            const savings = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

            return (
              <Card
                key={product._id}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-violet-200 dark:hover:border-violet-800"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
                      {product.category.title}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <Link href={`/products/${product.slug.current}`}>
                        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-violet-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl text-foreground">${product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        Save {savings}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Link href={`/products/${product.slug.current}`} className="w-full">
                    <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white group" size="lg">
                      View Details
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
