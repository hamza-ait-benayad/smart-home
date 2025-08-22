import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://techhomehub.com"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ]

  // Product pages
  const productSlugs = [
    "smart-thermostat-pro",
    "security-camera-system",
    "smart-door-lock",
    "voice-assistant-hub",
    "smart-lighting-kit",
    "robot-vacuum-pro",
    "smart-smoke-detector",
    "smart-water-leak-sensor",
  ]

  const productPages = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Article pages
  const articleSlugs = [
    "10-must-have-smart-home-devices-2024",
    "smart-security-protecting-connected-home",
    "energy-savings-smart-thermostats-guide",
    "smart-lighting-setup-basic-to-advanced",
    "voice-assistants-comparison-alexa-google-siri",
  ]

  const articlePages = articleSlugs.map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...articlePages]
}
