"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Share2, Bookmark, Twitter, Facebook, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { urlFor } from "@/lib/sanity.client"
import { PortableText } from '@portabletext/react'
import { ProductCard } from "./products-listing"


interface ArticleDetailProps {
  article: Article;
}


const components = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-6 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-semibold mt-5 mb-3">{children}</h2>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-violet-600 underline"
      >
        {children}
      </a>
    ),
  },
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleShare = async (platform?: string) => {
    const url = window.location.href
    const text = article.title

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
      )
    } else if (navigator.share) {
      try {
        await navigator.share({ title: text, url })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(url)
      setShowShareMenu(false)
    }
  }



  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-violet-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-violet-600">
          Articles
        </Link>
        <span>/</span>
        <span className="text-foreground">{article.title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-violet-600 text-white">{article.category?.title}</Badge>
          {article.keywords?.slice(0, 2).map((keyword) => (
            <Badge key={keyword} variant="outline">
              {keyword}
            </Badge>
          ))}
        </div>

        <h1 className="font-playfair font-bold text-3xl lg:text-5xl text-foreground mb-6 leading-tight">
          {article.title}
        </h1>

        <p className="text-xl text-muted-foreground leading-relaxed mb-6">{article.excerpt}</p>

        {/* Article Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Share Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`${isBookmarked ? "text-violet-600 border-violet-200" : ""} bg-transparent`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>

            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="bg-transparent"
              >
                <Share2 className="h-4 w-4" />
              </Button>

              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 bg-background border border-border rounded-lg shadow-lg p-2 z-10">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleShare("twitter")}>
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare("facebook")}>
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare("linkedin")}>
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-8">
        <Image
          src={article.mainImage ? urlFor(article.mainImage).width(800).height(500).url() : "/placeholder.svg"}
          alt={article.title}
          width={800}
          height={500}
          className="w-full object-cover rounded-lg"
          priority
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <div className="prose prose-lg max-w-none"><PortableText value={article.content} components={components} /></div>
      </div>
      <div className="flex flex-col gap-5 ">
        {
        article.relatedProducts?.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} viewMode="list" amazonProd={true}/>
          </div>
        ))
      }
      </div>
      
      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Share this article:</span>
            <Button variant="ghost" size="sm" onClick={() => handleShare("twitter")}>
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleShare("facebook")}>
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleShare("linkedin")}>
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.mainImage,
            publisher: {
              "@type": "Organization",
              name: "TechHome Hub",
              logo: {
                "@type": "ImageObject",
                url: "/logo.png",
              },
            },
            datePublished: article.publishedAt,
            dateModified: article.publishedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": typeof window !== "undefined" ? window.location.href : "",
            },
          }),
        }}
      />
    </article>
  )
}
