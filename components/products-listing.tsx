"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Grid, List, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/lib/sanity.client"
const sortOptions = [
  { value: "popularity", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
]

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

interface productsListingProps {
  allProducts: Product[]
  categories?: Category[]
}

export function ProductsListing({ allProducts, categories = [] }: productsListingProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6

  // Create categories list with "All" option
  const categoryOptions = ["All", ...categories.map(cat => cat.title)]


  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category?.title === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return a._id.localeCompare(b._id)
        default: // popularity
          return b.reviews - a.reviews
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-playfair font-bold text-3xl lg:text-4xl text-foreground mb-4">Smart Home Products</h1>
        <p className="text-lg text-muted-foreground">
          Discover our curated collection of {filteredAndSortedProducts.length} smart home devices and gadgets
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-muted/30 rounded-lg">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, brands, or features..."
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
            {categoryOptions.map((category) => (
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

        {/* View Mode */}
        <div className="flex border rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid/List */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
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
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {paginatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} viewMode={viewMode} />
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

export function ProductCard({ product, viewMode, amazonProd }: { product: Product; viewMode: "grid" | "list"; amazonProd?: boolean }) {
  const savings = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const productImageUrl = product.image
    ? urlFor(product.image)?.width(550).height(310).url()
    : null;

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 border-border hover:border-violet-200 dark:hover:border-violet-800">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-72 flex-shrink-0">
              <Image
                src={productImageUrl || "/placeholder.svg"}
                alt={product.name}
                width={1000}
                height={600}
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 p-6 space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{product.category?.title}</Badge>
                    <span className="text-sm text-muted-foreground">{product.brand}</span>
                  </div>

                  <Link href={`/products/${product.slug.current}`}>
                    <h3 className="font-semibold text-xl text-foreground mb-2 hover:text-violet-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-muted-foreground mb-4">{product.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(product.features ?? []).slice(0, 3).map((feature: string) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex flex-col lg:items-end lg:justify-between gap-4 w-full lg:max-w-max py-1">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-2xl text-foreground">${product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200 mt-1">
                      Save {savings}%
                    </Badge>
                  </div>
                  <div className="flex flex-col-reverse gap-2">
                    <Link href={`/products/${product.slug.current}`}>
                      <Button className={`w-full bg-transparent border-2 border-violet-700 hover:bg-violet-700  hover:text-white text-violet-700 group`} size="lg">
                        View Details
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    {amazonProd &&
                      <Link href={product.affiliateUrl}>
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold group" size="lg">
                          Check Price on Amazon
                          <Image src={"/aws_amazon_web_services_icon.svg"} alt="amazon icon" width={500} height={500} className="h-10 w-10 font-bold" />
                        </Button>
                      </Link>
                    }
                  </div>

                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid view
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-violet-200 dark:hover:border-violet-800">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={productImageUrl ? productImageUrl : "/placeholder.svg"}
            alt={product.name}
            width={1000}
            height={1000}
            className="w-full h-50 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
            {product.category?.title}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{product.brand}</span>
            </div>
            <Link href={`/products/${product.slug.current}`}>
              <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-violet-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl text-foreground">${product.price}</span>
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            <Badge variant="outline" className="text-green-600 border-green-200">
              Save {savings}%
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 ">
        <Link href={`${amazonProd ? product.affiliateUrl : `/products/${product.slug.current}`}`} className="w-full">
          <Button className={`w-full ${amazonProd ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-violet-500 hover:bg-violet-700 text-white"}  group`} size="lg">
            View Details
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
