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

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product: Product = await client.fetch(singleProductQuery(slug));

  if (!product) {
    return {
      title: "Product Not Found | TechHome Hub",
    }
  }

  return {
    title: `${product.name} - ${product.brand} | TechHome Hub`,
    description: product.description,
    keywords: `${product.name}, ${product.brand}, ${product.category}, smart home, review`,
    openGraph: {
      type: "website", // <-- change from "product"
      title: product.name,
      description: product.description,
      url: `https://www.echofex.me/products/${product.slug.current}`,
      images: [
        {
          url: product.image ? urlFor(product.image).url() : "/placeholder.svg",
          width: 800,
          height: 600,
        },
      ],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product: Product = await client.fetch(singleProductQuery(slug));

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductDetail product={product} />
      <RelatedProducts currentId={product._id} categoryId={product.category?._id} />
    </div>
  )
}

export async function generateStaticParams() {
  const products: Product[] = await client.fetch(allProductsQuery);
  return products.map((product) => ({
    slug: product.slug.current,
  }))
}
