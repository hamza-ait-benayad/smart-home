import { ArticleDetail } from "@/components/article-detail"
import { RelatedArticles } from "@/components/related-articles"
import { allArticlesQuery, singleArticleQuery } from "@/lib/queries"
import { client } from "@/lib/sanity.client"
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import type { Metadata } from "next"
import { notFound } from "next/navigation"


interface ArticlePageProps {
  params: {
    slug: string
  }
}

export const revalidate = 60;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {

  const builder = imageUrlBuilder(client);
  const urlFor = (source: SanityImageSource) => builder.image(source).url();

  const { slug } = await params;
  const article: Article = await client.fetch(singleArticleQuery, { slug })

  if (!article) {
    return {
      title: "Article Not Found | TechHome Hub",
    }
  }

  return {
    title: `${article.title} | TechHome Hub`,
    description: article.excerpt,
    keywords: article.keywords?.join(", "),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.mainImage ? [{ url: urlFor(article.mainImage) }] : [],
      type: "article",
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.mainImage ? [{ url: urlFor(article.mainImage) }] : [],
    },
  alternates: {
    canonical: `https://www.echofex.me/articles/${article.slug.current}`,
  },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {

  const { slug } = await params;
  const article: Article = await client.fetch(singleArticleQuery, { slug })

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <ArticleDetail article={article} />
      <RelatedArticles currentId={article._id} categoryId={article.category._id} />
    </div>
  )
}

export async function generateStaticParams() {
  const articles = await client.fetch(allArticlesQuery);
  return articles.map((article: Article) => ({
    slug: article.slug.current,
  }));
}
