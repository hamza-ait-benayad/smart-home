import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { client, urlFor } from "@/lib/sanity.client"
import { relatedArticlesQuery } from "@/lib/queries"


export interface Article {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: any;
  mainImage?: SanityImageSource
  category?: {
    _id: string
    _type: "category"
    title: string
    slug: {
      _type: "slug"
      current: string
    }
  };
  publishedAt: string;
  readTime?: string;
  keywords?: string[];
  relatedProducts?: {
    _ref: string;
    _type: string;
  }[];
  featured?: boolean;
}

interface RelatedArticles {
  allArticles: Article[]
}

interface RelatedArticlesProps {
  currentId: string
  categoryId: string
}

export async function RelatedArticles({ currentId, categoryId }: RelatedArticlesProps) {
  
  const relatedArticles = await client.fetch(relatedArticlesQuery,{categoryId, currentId});

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair font-bold text-3xl text-foreground mb-4">Related Articles</h2>
          <p className="text-lg text-muted-foreground">Continue exploring smart home topics and expert insights</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedArticles.map((article: Article) => (
            <Card
              key={article._id}
              className="group hover:shadow-lg transition-all duration-300 border-border hover:border-violet-200 dark:hover:border-violet-800 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={article.mainImage ? urlFor(article.mainImage).width(800).height(500).url() : "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-violet-600 text-white" variant="secondary">
                    {article.category?.title}
                  </Badge>
                </div>

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
                    <Link href={`/articles/${article.slug.current}`}>
                      <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{article.excerpt}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <Link href={`/articles/${article.slug.current}`}>
                      <div className="flex items-center text-violet-600 hover:text-violet-700 text-sm font-medium group">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
