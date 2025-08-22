"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and if performance API is available
    if (process.env.NODE_ENV === "production" && typeof window !== "undefined" && "performance" in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log performance metrics (in production, you'd send these to analytics)
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime)
          }
          if (entry.entryType === "first-input") {
            console.log("FID:", entry.processingStart - entry.startTime)
          }
          if (entry.entryType === "layout-shift" && !entry.hadRecentInput) {
            console.log("CLS:", entry.value)
          }
        })
      })

      // Observe Core Web Vitals
      observer.observe({ entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"] })

      // Cleanup
      return () => observer.disconnect()
    }
  }, [])

  return null // This component doesn't render anything
}
