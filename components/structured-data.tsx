interface ProductStructuredDataProps {
  product: {
    name: string
    description: string
    image: string
    price: number
    originalPrice: number
    rating: number
    reviews: number
    brand: string
    model: string
    category: string
    affiliateUrl: string
  }
}

export function ProductStructuredData({ product }: ProductStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://techhomehub.com${product.image}`,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    model: product.model,
    category: product.category,
    offers: {
      "@type": "Offer",
      url: product.affiliateUrl,
      priceCurrency: "USD",
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days from now
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "TechHome Hub",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: product.rating,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: "TechHome Hub Editorial Team",
        },
        reviewBody: `Comprehensive review of the ${product.name}. ${product.description}`,
        publisher: {
          "@type": "Organization",
          name: "TechHome Hub",
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

interface ArticleStructuredDataProps {
  article: {
    title: string
    description: string
    image: string
    publishDate: string
    author: string
    category: string
  }
}

export function ArticleStructuredData({ article }: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `https://techhomehub.com${article.image}`,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "TechHome Hub",
      logo: {
        "@type": "ImageObject",
        url: "https://techhomehub.com/logo.png",
      },
    },
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": typeof window !== "undefined" ? window.location.href : "",
    },
    articleSection: article.category,
    keywords: ["smart home", "technology", "reviews", article.category.toLowerCase()],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
