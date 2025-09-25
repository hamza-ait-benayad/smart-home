import { allArticlesQuery, allProductsQuery } from "@/lib/queries"
import { client } from "@/lib/sanity.client"
import type { MetadataRoute } from "next"

export default async function sitemap() {
  const baseUrl = "https://www.echofex.me"
  const articles: Article[] = await client.fetch(allArticlesQuery);
  const products: Product[] = await client.fetch(allProductsQuery);

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]


  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))


  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug.current}`,
    lastModified: article.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...articlePages]
}
