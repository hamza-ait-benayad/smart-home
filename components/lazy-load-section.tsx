"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { LoadingSpinner } from "./loading-spinner"

interface LazyLoadSectionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}

export function LazyLoadSection({
  children,
  fallback,
  rootMargin = "100px",
  threshold = 0.1,
  className,
}: LazyLoadSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  useEffect(() => {
    if (isVisible) {
      // Simulate loading time for smooth UX
      const timer = setTimeout(() => setIsLoaded(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        isLoaded ? (
          children
        ) : (
          fallback || (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
            </div>
          )
        )
      ) : (
        <div className="h-32" /> // Placeholder height
      )}
    </div>
  )
}
