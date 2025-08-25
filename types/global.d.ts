import { SanityImageSource } from '@sanity/image-url/lib/types'

declare global {


  interface Category {
    _id: string;
    _type: 'category';
    title: string;
    slug: {
      _type: 'slug';
      current: string;
    };
  }

  interface Article {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    content: any;
    mainImage?: SanityImageSource;
    category: Category;
    publishedAt: string;
    readTime?: string;
    keywords?: string[];
    relatedProducts?: Product[];
    featured?: boolean;
  }


  interface Specification {
    key: string
    value: string
  }

  interface Product {
    _id: string
    name: string
    slug: {
      _type: 'slug'
      current: string
    }
    description: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    image?: SanityImageSource;
    gallery?: SanityImageSource[];
    category: {
      _id: string,
      title: string,
      slug: string,
    }
    brand: string
    model?: string
    features?: string[]
    specifications?: Specification[]
    affiliateUrl: string
  }

}


export { }
