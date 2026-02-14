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

export const revalidate = 86400

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {

  const builder = imageUrlBuilder(client);
  const urlFor = (source: SanityImageSource) => builder.image(source).url();

  const { slug } = await params;
  const article: Article = await client.fetch(singleArticleQuery, { slug })

  if (!article) {
    return {
      title: "Article Not Found | Echofex",
      description: "The article you're looking for could not be found.",
    }
  }

  const imageUrl = article.mainImage ? urlFor(article.mainImage) : "/echofex-icon-logo.png"

  return {
    title: `${article.title} | Smart Home Guide | Echofex`,
    description: article.excerpt,
    keywords: article.keywords?.join(", ") || "smart home, IoT, home automation",
    authors: [{ name: "Echofex Team" }],
    alternates: {
      canonical: `https://www.echofex.me/articles/${article.slug.current}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `https://www.echofex.me/articles/${article.slug.current}`,
      siteName: "Echofex",
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      authors: ["Echofex Team"],
      section: article.category?.title || "Smart Home",
      tags: article.keywords || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@echofex",
      creator: "@echofex",
      title: article.title,
      description: article.excerpt,
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
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {

  const builder = imageUrlBuilder(client);
  const urlFor = (source: SanityImageSource) => builder.image(source).url();

  const { slug } = await params;
  const article: Article = await client.fetch(singleArticleQuery, { slug })

  if (!article) {
    notFound()
  }

  const imageUrl = article.mainImage ? urlFor(article.mainImage) : "/echofex-icon-logo.png"

  return (
    <>
      <div className="min-h-screen bg-background">
        <ArticleDetail article={article} />
        <RelatedArticles currentId={article._id} categoryId={article.category._id} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "@id": `https://www.echofex.me/articles/${article.slug.current}#article`,
              headline: article.title,
              description: article.excerpt,
              image: imageUrl,
              datePublished: article.publishedAt,
              dateModified: article.publishedAt,
              author: {
                "@type": "Person",
                name: "Echofex Team",
                url: "https://www.echofex.me/about",
              },
              publisher: {
                "@id": "https://www.echofex.me/#organization",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://www.echofex.me/articles/${article.slug.current}`,
              },
              articleSection: article.category?.title || "Smart Home",
              keywords: article.keywords?.join(", ") || "smart home, IoT, home automation",
              inLanguage: "en-US",
              isPartOf: {
                "@id": "https://www.echofex.me/articles#blog",
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
                {
                  "@type": "ListItem",
                  position: 3,
                  name: article.title,
                  item: `https://www.echofex.me/articles/${article.slug.current}`,
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
  const articles = await client.fetch(allArticlesQuery);
  return articles.map((article: Article) => ({
    slug: article.slug.current,
  }));
}
