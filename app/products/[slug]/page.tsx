import { ProductDetail } from "@/components/product-detail"
import { RelatedProducts } from "@/components/related-products"
import { allProductsQuery, singleProductQuery } from "@/lib/queries"
import { client, urlFor } from "@/lib/sanity.client"
import type { Metadata } from "next"
import { notFound } from "next/navigation"


interface ProductPageProps {
  params: {
    slug: string
  }
}

export const revalidate = 7200

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product: Product = await client.fetch(singleProductQuery(slug));

  if (!product) {
    return {
      title: "Product Not Found | Echofex",
      description: "The product you're looking for could not be found.",
    }
  }

  const imageUrl = product.image ? urlFor(product.image).url() : "/echofex-icon-logo.png"
  const keywords = [
    product.name,
    product.brand,
    product.category?.title || "smart home",
    "smart home device",
    "review",
    "buying guide",
    "IoT device",
    "home automation",
  ]

  return {
    title: `${product.name} Review - ${product.brand} | Expert Analysis | Echofex`,
    description: `${product.description} Read our comprehensive expert review, ratings, and buying guide for the ${product.name} by ${product.brand}.`,
    keywords: keywords.join(", "),
    alternates: {
      canonical: `https://www.echofex.me/products/${product.slug.current}`,
    },
    openGraph: {
      type: "website",
      title: `${product.name} - ${product.brand} Review`,
      description: product.description,
      url: `https://www.echofex.me/products/${product.slug.current}`,
      siteName: "Echofex",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${product.name} - ${product.brand}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@echofex",
      title: `${product.name} - ${product.brand} Review`,
      description: product.description,
      images: [imageUrl],
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
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product: Product = await client.fetch(singleProductQuery(slug));

  if (!product) {
    notFound()
  }

  const imageUrl = product.image ? urlFor(product.image).url() : "/echofex-icon-logo.png"

  return (
    <>
      <div className="min-h-screen bg-background">
        <ProductDetail product={product} />
        <RelatedProducts currentId={product._id} categoryId={product.category?._id} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "@id": `https://www.echofex.me/products/${product.slug.current}#product`,
              name: product.name,
              description: product.description,
              image: imageUrl,
              brand: {
                "@type": "Brand",
                name: product.brand,
              },
              category: product.category?.title || "Smart Home Devices",
              url: `https://www.echofex.me/products/${product.slug.current}`,
              ...(product.rating && {
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: product.rating,
                  bestRating: 5,
                  worstRating: 1,
                },
              }),
              ...(product.price && {
                offers: {
                  "@type": "Offer",
                  price: product.price,
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: product.affiliateUrl || `https://www.echofex.me/products/${product.slug.current}`,
                  seller: {
                    "@type": "Organization",
                    name: product.brand,
                  },
                },
              }),
              isRelatedTo: {
                "@type": "WebPage",
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
                  name: "Products",
                  item: "https://www.echofex.me/products",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: product.name,
                  item: `https://www.echofex.me/products/${product.slug.current}`,
                },
              ],
            },
          ]),
        }}
      />
    </>
  )
}

export async function generateStaticParams() {
  const products: Product[] = await client.fetch(allProductsQuery);
  return products.map((product) => ({
    slug: product.slug.current,
  }))
}
