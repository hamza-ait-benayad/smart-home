import { ArticlesListing } from "@/components/articles-listing"
import { allArticlesQuery, allCategoriesQuery } from "@/lib/queries";
import { client } from "@/lib/sanity.client";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Smart Home Articles, Reviews & Buying Guides | Echofex",
  description:
    "Expert reviews, comprehensive buying guides, and smart home tips. Stay updated with the latest trends in home automation, IoT devices, and connected home technology. In-depth analysis and recommendations.",
  keywords: [
    "smart home guides",
    "IoT reviews",
    "home automation tips",
    "tech articles",
    "buying guides",
    "smart home tutorials",
    "IoT tutorials",
    "home automation guides",
    "smart device reviews",
    "connected home articles",
  ],
  alternates: {
    canonical: "https://www.echofex.me/articles",
  },
  openGraph: {
    type: "website",
    title: "Smart Home Articles, Reviews & Buying Guides | Echofex",
    description:
      "Expert reviews, buying guides, and smart home tips. Stay updated with the latest trends in home automation and IoT devices.",
    url: "https://www.echofex.me/articles",
    siteName: "Echofex",
    images: [
      {
        url: "/echofex-icon-logo.png",
        width: 1200,
        height: 630,
        alt: "Echofex Smart Home Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@echofex",
    title: "Smart Home Articles, Reviews & Buying Guides | Echofex",
    description:
      "Expert reviews, buying guides, and smart home tips. Stay updated with the latest trends in home automation and IoT devices.",
    images: ["/echofex-icon-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
    <>
      <div className="min-h-screen bg-background">
        <ArticlesListing allArticles={articles} categories={categories} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "@id": "https://www.echofex.me/articles#blog",
              name: "Echofex Smart Home Blog",
              description: "Expert reviews, buying guides, and smart home tips covering the latest in home automation and IoT devices.",
              url: "https://www.echofex.me/articles",
              inLanguage: "en-US",
              publisher: {
                "@id": "https://www.echofex.me/#organization",
              },
              isPartOf: {
                "@id": "https://www.echofex.me/#website",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.echofex.me",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Articles",
                  item: "https://www.echofex.me/articles",
                },
              ],
            },
          ]),
        }}
      />
    </>
  )
}
