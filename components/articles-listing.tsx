"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Clock, User, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { urlFor } from "@/lib/sanity.client";


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


interface ArticlesListingProps {
  allArticles: Article[]
}


const categories = ["All", "Buying Guide", "Security", "Energy", "Installation", "Reviews"]
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "popular", label: "Most Popular" },
  { value: "category", label: "By Category" },
]


export function ArticlesListing({ allArticles }: ArticlesListingProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6

  const filteredAndSortedArticles = useMemo(() => {
    const filtered = allArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || article.category?.title === selectedCategory
      return matchesSearch && matchesCategory
    })


    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "popular":
          // Mock popularity by ID (string comparison)
          return a._id.localeCompare(b._id);
        case "category":
          // Compare category titles safely
          const titleA = a.category?.title || "";
          const titleB = b.category?.title || "";
          return titleA.localeCompare(titleB);
        default: // newest
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });


    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  const totalPages = Math.ceil(filteredAndSortedArticles.length / articlesPerPage)
  const paginatedArticles = filteredAndSortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage,
  )

  const featuredArticles = allArticles.filter((article) => article.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="font-playfair font-bold text-3xl lg:text-4xl text-foreground mb-4">
          Smart Home Articles & Guides
        </h1>
        <p className="text-lg text-muted-foreground">
          Expert insights, reviews, and guides to help you build the perfect smart home
        </p>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-16">
          <h2 className="font-playfair font-bold text-2xl text-foreground mb-8">Featured Articles</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredArticles.slice(0, 2).map((article) => (
              <Card
                key={article._id}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-violet-200 dark:hover:border-violet-800 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={article.mainImage ? urlFor(article.mainImage).url() : "/placeholder.svg"}
                      alt={article.title}
                      width={1000}
                      height={1000}
                      className="w-full h-52 sm:h-84 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-violet-600 text-white">Featured</Badge>
                    <Badge className="absolute top-4 right-4 bg-background/90 text-foreground" variant="secondary">
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
                        <h3 className="font-playfair font-bold text-xl text-foreground mb-3 group-hover:text-violet-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">{article.excerpt}</p>
                    </div>

                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link href={`/articles/${article.slug.current}`}>
                    <Button
                      variant="ghost"
                      className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 p-0 h-auto font-medium group"
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-muted/30 rounded-lg">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Articles Grid */}
      {paginatedArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedArticles.map((article) => (
            <Card
              key={article._id}
              className="group hover:shadow-lg transition-all duration-300 border-border hover:border-violet-200 dark:hover:border-violet-800 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={article.mainImage ? urlFor(article.mainImage).url() : "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-50 sm:h-58 object-cover group-hover:scale-105 transition-transform duration-300"
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
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 p-0 h-auto font-medium group"
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
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              )
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="px-2">
                  ...
                </span>
              )
            }
            return null
          })}

          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
