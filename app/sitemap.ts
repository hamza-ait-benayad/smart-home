import { allArticlesQuery, allProductsQuery } from "@/lib/queries"
import { client } from "@/lib/sanity.client"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.echofex.me"
  const articles: Article[] = await client.fetch(allArticlesQuery);
  const products: Product[] = await client.fetch(allProductsQuery);

  const currentDate = new Date()

  // Static pages with strategic priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/affiliate-disclaimer`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ]

  // Product pages with actual modification dates
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug.current}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Article pages with actual modification dates
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug.current}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...articlePages]
}
