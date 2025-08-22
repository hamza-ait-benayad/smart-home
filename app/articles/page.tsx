import { ArticlesListing } from "@/components/articles-listing"
import { allArticlesQuery } from "@/lib/queries";
import { client } from "@/lib/sanity.client";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Smart Home Articles & Guides | TechHome Hub",
  description:
    "Expert reviews, buying guides, and smart home tips. Stay updated with the latest trends in home automation and IoT devices.",
  keywords: "smart home guides, IoT reviews, home automation tips, tech articles, buying guides",
}

export default async function ArticlesPage() {
  const articles = await client.fetch(allArticlesQuery);
  return (
    <div className="min-h-screen bg-background">
      <ArticlesListing allArticles={articles}/>
    </div>
  )
}
