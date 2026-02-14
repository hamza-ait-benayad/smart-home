import { ProductsListing } from "@/components/products-listing"
import { allProductsQuery, allCategoriesQuery } from "@/lib/queries"
import { client } from "@/lib/sanity.client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Smart Home Products & Devices - Expert Reviews | Echofex",
  description:
    "Browse our curated collection of smart home devices, IoT gadgets, and home automation accessories. Expert reviews, ratings, and buying guides to help you find the perfect tech solutions for your connected home.",
  keywords: [
    "smart home products",
    "IoT devices",
    "home automation devices",
    "smart gadgets",
    "connected devices",
    "smart home accessories",
    "home automation products",
    "smart home technology",
    "IoT gadgets",
    "smart home reviews",
  ],
  openGraph: {
    type: "website",
    url: "https://www.echofex.me/products",
    title: "Smart Home Products & Devices - Expert Reviews | Echofex",
    description: "Browse our curated collection of smart home devices with expert reviews and buying guides.",
    siteName: "Echofex",
    images: [
      {
        url: "/echofex-icon-logo.png",
        width: 1200,
        height: 630,
        alt: "Echofex Smart Home Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@echofex",
    title: "Smart Home Products & Devices - Expert Reviews | Echofex",
    description: "Browse our curated collection of smart home devices with expert reviews and buying guides.",
    images: ["/echofex-icon-logo.png"],
  },
  alternates: {
    canonical: "https://www.echofex.me/products",
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

export const revalidate = 7200

export default async function ProductsPage() {
  const [allProducts, categories] = await Promise.all([
    client.fetch(allProductsQuery, {}, {
      next: { revalidate: 7200 },
    }),
    client.fetch(allCategoriesQuery, {}, {
      next: { revalidate: 7200 },
    })
  ]);

  return (
    <>
      <div className="min-h-screen bg-background">
        <ProductsListing allProducts={allProducts} categories={categories} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": "https://www.echofex.me/products#collectionpage",
              name: "Smart Home Products & Devices",
              description: "Browse our curated collection of smart home devices with expert reviews and buying guides.",
              url: "https://www.echofex.me/products",
              inLanguage: "en-US",
              isPartOf: {
                "@id": "https://www.echofex.me/#website",
              },
              about: {
                "@type": "Thing",
                name: "Smart Home Technology",
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
                  name: "Products",
                  item: "https://www.echofex.me/products",
                },
              ],
            },
          ]),
        }}
      />
    </>
  )
}
