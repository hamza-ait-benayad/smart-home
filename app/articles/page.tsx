import { ArticlesListing } from "@/components/articles-listing"
import { allArticlesQuery, allCategoriesQuery } from "@/lib/queries";
import { client } from "@/lib/sanity.client";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Smart Home Articles & Guides | Echofex",
  description:
    "Expert reviews, buying guides, and smart home tips. Stay updated with the latest trends in home automation and IoT devices.",
  alternates: {
    canonical: "https://echofex.me/articles",
  },
  other: {
    keywords:
      "smart home guides, IoT reviews, home automation tips, tech articles, buying guides",
  },
  openGraph: {
    title: "Smart Home Articles & Guides | Echofex",
    description:
      "Expert reviews, buying guides, and smart home tips. Stay updated with the latest trends in home automation and IoT devices.",
    url: "https://echofex.me/articles",
    siteName: "Echofex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Home Articles & Guides | Echofex",
    description:
      "Expert reviews, buying guides, and smart home tips. Stay updated with the latest trends in home automation and IoT devices.",
  },
}


export const revalidate = 86400;

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([
    client.fetch(allArticlesQuery, {}, {
      next: { revalidate: 86400 },
    }),
    client.fetch(allCategoriesQuery, {}, {
      next: { revalidate: 86400 },
    })
  ]);

  return (
    <div className="min-h-screen bg-background">
      <ArticlesListing allArticles={articles} categories={categories} />
    </div>
  )
}
