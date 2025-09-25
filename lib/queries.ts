// lib/queries.ts
export const allArticlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  content,
  mainImage,
  category->{
    title,
    slug
  },
  publishedAt,
  readTime,
  featured
}`;

export const featuredArticlesQuery = `*[_type == "article" && featured == true][0..5]{
  _id, title, slug, mainImage, excerpt, readTime, publishedAt
}`;

export const singleArticleQuery = `
*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  content,
  mainImage,
  category->{
    _id,
    title,
    slug
  },
  publishedAt,
  readTime,
  keywords,
  featured,
  relatedProducts[]->{
    _id,
    name,
    reviews,
    slug,
    price,
    originalPrice,
    rating,
    image,
    affiliateUrl
  }
}
`;

export const relatedArticlesQuery = `
  *[_type == "article" && category._ref == $categoryId && _id != $currentId] | order(publishedAt desc)[0..3] {
    _id,
    title,
    slug {
      current
    },
    excerpt,
    mainImage,
    publishedAt
  }
`

export const allProductsQuery = `*[_type == "product"]{
  _id,
  name,
  slug,
  description,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  gallery,
  category->{_id, title, slug},
  brand,
  model,
  features,
  specifications,
  affiliateUrl
}`

export const singleProductQuery = (slug: string) => `*[_type == "product" && slug.current == "${slug}"][0]{
  _id,
  name,
  slug,
  description,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  gallery,
  category->{_id, title, slug},
  brand,
  model,
  features,
  specifications,
  affiliateUrl
}`


export const featuredProductsQuery = `*[_type == "product" && featured == true][0..8]{
  _id,
  name,
  slug,
  description,
  price,
  originalPrice,
  rating,
  reviews,
  affiliateUrl,
  brand,
  model,
  features,
  specifications[]{
    key,
    value
  },
  image{
    asset->{
      url,
      metadata { lqip, dimensions }
    }
  },
  gallery[]{
    asset->{
      url,
      metadata { lqip, dimensions }
    }
  },
  category->{
    _id,
    title,
    "slug": slug.current
  }
}`;



export const relatedProductsQuery = `*[
  _type == "product" &&
  references($categoryId) &&
  _id != $currentId
][0...3] {
  name,
  slug,
  price,
  originalPrice,
  rating,
  reviews,
  category->{
    _id,
    title,
    "slug": slug.current
  },
  image{
    asset->{
      url,
      metadata { lqip, dimensions }
    }
  },
  affiliateUrl
}`;

// Search queries
export const searchArticlesQuery = (term: string) => `
  *[_type == "article" && (
    title match "${term}*" ||
    excerpt match "${term}*" ||
    keywords[] match "${term}*"
  )] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    category->{ title, slug }
  }
`;

export const searchProductsQuery = (term: string) => `
  *[_type == "product" && (
    name match "${term}*" ||
    description match "${term}*" ||
    brand match "${term}*" ||
    features[] match "${term}*"
  )]{
    _id,
    name,
    slug,
    description,
    price,
    originalPrice,
    rating,
    reviews,
    image,
    category->{ title, slug },
    affiliateUrl,
    brand
  }
`;