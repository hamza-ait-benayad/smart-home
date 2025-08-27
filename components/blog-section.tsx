import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { OptimizedImage } from "./optimized-image"
import { LazyLoadSection } from "./lazy-load-section"
import Link from "next/link"
import { client, urlFor } from "@/lib/sanity.client"
import { allArticlesQuery } from "@/lib/queries"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

interface articleSchema {
  _id: string
  _type: "article"
  title: string
  slug: {
    _type: "slug"
    current: string
  }
  excerpt: string
  content: any // You can make this stricter if you use Portable Text types
  mainImage?: SanityImageSource
  category?: {
    _id: string
    _type: "category"
    title: string
    slug: {
      _type: "slug"
      current: string
    }
  }
  publishedAt: string
  readTime?: string
  featured?: boolean
}

export async function BlogSection() {
  const articles = await client.fetch(allArticlesQuery);
  return (
    <LazyLoadSection>
      <section className="py-20 bg-muted/30 dark:bg-muted/10 transition-colors duration-300">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-playfair font-bold text-3xl lg:text-4xl text-foreground">Latest Smart Home Insights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends, reviews, and expert advice in the smart home world.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: articleSchema) => (
              <Card
                key={article._id}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-violet-200 dark:hover:border-violet-800 overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Post Image */}
                  <div className="relative overflow-hidden">
                    <OptimizedImage
                      src={article.mainImage ? urlFor(article.mainImage).url() : "/placeholder.svg"}
                      alt={article.title}
                      width={400}
                      height={250}
                      className="w-full h-58 object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <Badge className="absolute top-3 left-3 bg-violet-600 text-white" variant="secondary">
                      {article.category?.title}
                    </Badge>
                  </div>

                  {/* Post Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <div>
                      <Link href={`articles/${article.slug.current}`}>
                        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{article.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Link href={`/articles/${article.slug.current}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 p-0 h-auto font-medium group transition-all duration-200"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href={"/articles"}>
              <Button
                variant="outline"
                size="lg"
                className="border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-300 dark:hover:bg-violet-950/20 px-8 bg-transparent transition-all duration-200"
              >
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </LazyLoadSection>
  )
}
