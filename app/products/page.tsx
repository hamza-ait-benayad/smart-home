import { ProductsListing } from "@/components/products-listing"
import { allProductsQuery } from "@/lib/queries"
import { client } from "@/lib/sanity.client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Smart Home Products | Echofex",
  description:
    "Browse our curated collection of smart home devices, gadgets, and accessories. Find the perfect tech solutions for your connected home.",
  keywords: "smart home, IoT devices, home automation, smart gadgets, connected devices",
}

export const revalidate = 60;

export default async function ProductsPage() {
  const allProducts = await client.fetch(allProductsQuery, {}, {
    next: { revalidate: 60 },
  }); return (
    <div className="min-h-screen bg-background">
      <ProductsListing allProducts={allProducts} />
    </div>
  )
}
