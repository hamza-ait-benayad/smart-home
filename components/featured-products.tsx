import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "./optimized-image"
import { LazyLoadSection } from "./lazy-load-section"
import { client, urlFor } from "@/lib/sanity.client"
import { featuredProductsQuery } from "@/lib/queries"
import Link from "next/link"

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    className={`h-4 w-4 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg
    className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)


export async function FeaturedProducts() {
  const featuredProducts: Product[] = await client.fetch(featuredProductsQuery);

  return (
    <LazyLoadSection>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-playfair font-bold text-3xl lg:text-4xl text-foreground">
              Featured Smart Home Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked devices that deliver exceptional performance, reliability, and value for your smart home
              ecosystem.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product._id}
                className="group hover:shadow-xl transition-all duration-300 border-border hover:border-violet-300 dark:hover:border-violet-700 bg-card hover:bg-card/80 dark:hover:bg-card/90"
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <OptimizedImage
                      src={product.image
                        ? urlFor(product.image)?.url()
                        : "/placeholder.svg"}
                      alt={product.name}
                      width={1000}
                      height={1000}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <Badge
                      className="absolute top-3 left-3 bg-violet-600 hover:bg-violet-700 text-white border-0"
                      variant="secondary"
                    >
                      {"featured"}
                    </Badge>
                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-foreground">
                      {product.category.title}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <Link href={`/products/${product.slug.current}`}>
                        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} filled={i < Math.floor(product.rating)} />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl text-foreground">{product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200 dark:text-green-400 dark:border-green-800"
                      >
                        Save{" "}
                        {Math.round(
                          (product.originalPrice - product.price) /
                          (product.originalPrice) *
                          100,
                        )}
                        %
                      </Badge>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 text-white group transition-all duration-200 shadow-md hover:shadow-lg"
                    size="lg"
                  >
                    View Details
                    <ExternalLinkIcon />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300 dark:border-violet-700 dark:text-violet-300 dark:hover:bg-violet-900/30 dark:hover:border-violet-600 px-8 bg-transparent transition-all duration-200"
            >
              View All Products
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </section>
    </LazyLoadSection>
  )
}
