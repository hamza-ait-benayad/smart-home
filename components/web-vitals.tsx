"use client"

import { useEffect } from "react"
import { useReportWebVitals } from "next/web-vitals"

/**
 * Web Vitals Monitoring Component
 * Tracks Core Web Vitals and sends them to analytics
 * 
 * Metrics tracked:
 * - CLS (Cumulative Layout Shift)
 * - FID (First Input Delay) 
 * - FCP (First Contentful Paint)
 * - LCP (Largest Contentful Paint)
 * - TTFB (Time to First Byte)
 * - INP (Interaction to Next Paint)
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      })
    }

    // Send to analytics service
    // You can replace this with your analytics service (Google Analytics, Vercel Analytics, etc.)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", metric.name, {
        event_category: "Web Vitals",
        event_label: metric.id,
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        non_interaction: true,
      })
    }

    // Send to your custom analytics endpoint
    // fetch("/api/analytics/web-vitals", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name: metric.name,
    //     value: metric.value,
    //     rating: metric.rating,
    //     delta: metric.delta,
    //     id: metric.id,
    //     navigationType: metric.navigationType,
    //   }),
    // })
  })

  return null
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
