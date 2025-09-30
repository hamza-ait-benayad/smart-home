import type { Metadata } from "next"
import { Suspense } from "react"
import { client } from "@/lib/sanity.client"
import { searchArticlesQuery, searchProductsQuery, allCategoriesQuery } from "@/lib/queries"
import { ArticlesListing } from "@/components/articles-listing"
import { ProductsListing } from "@/components/products-listing"

export const metadata: Metadata = {
  title: "Search Results",
  description: "Find smart home products and articles on Echofex.",
  alternates: { canonical: "/search" },
}

interface SearchPageProps {
  searchParams: { q?: string }
}

async function SearchResults({ q }: { q: string }) {
  const term = q?.trim() || ""
  if (!term) {
    return (
      <div className="text-center py-16">
        <h1 className="font-playfair text-3xl font-bold">Search</h1>
        <p className="mt-2 text-muted-foreground">Type a query in the search bar above.</p>
      </div>
    )
  }

  const [articles, products, categories] = await Promise.all([
    client.fetch(searchArticlesQuery(term)),
    client.fetch(searchProductsQuery(term)),
    client.fetch(allCategoriesQuery),
  ])

  return (
    <div className="space-y-12">
      <div>
        {articles?.length ? (
          <ArticlesListing allArticles={articles} categories={categories} />
        ) : (
          <p className="text-muted-foreground">No articles found for "{term}".</p>
        )}
      </div>

      <div>
        {products?.length ? (
          <ProductsListing allProducts={products} categories={categories} />
        ) : (
          <p className="text-muted-foreground">No products found for "{term}".</p>
        )}
      </div>
    </div>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const q = searchParams?.q ?? ""
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-playfair text-4xl font-bold mb-6">Search Results</h1>
      <Suspense>
        {/* @ts-expect-error Server Component async */}
        <SearchResults q={q} />
      </Suspense>
    </div>
  )
}


