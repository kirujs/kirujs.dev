import { defineSiteConfig } from "kiru/router"

export const site = defineSiteConfig({
  url: "https://kirujs.dev",
  sitemap: {
    overrides: {
      "/": {
        changefreq: "daily",
        priority: 0.9,
      },
    },
  },
  robots: true,
})
