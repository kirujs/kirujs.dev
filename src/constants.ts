export const SITE_LINKS = [
  {
    title: "Docs",
    href: "/docs/introduction",
    activePath: "/docs",
  },
  {
    title: "Tutorial",
    href: "/tutorial/introduction",
    activePath: "/tutorial",
  },
  {
    title: "Playground",
    href: "https://stackblitz.com/~/github.com/CrimsonChi/kaioken-csr-template",
    external: true,
  },
]

export const DISCORD_LINK = "https://discord.gg/Pf9zbgBaRw"

export const OS =
  "window" in globalThis &&
  navigator.userAgent.toUpperCase().indexOf("MAC OS") !== -1
    ? "mac"
    : "other"
