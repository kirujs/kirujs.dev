import type { Config, PageContextServer } from "vike/types"

export default {
  passToClient: ["routeParams", "Layout"] satisfies Array<
    keyof PageContextServer
  >,
  clientRouting: true,
  meta: {
    title: {
      env: { server: true, client: true },
    },
    description: {
      env: { server: true, client: true },
    },
    keywords: {
      env: { server: true, client: true },
    },
  },
  prerender: {
    noExtraDir: true,
  },
} satisfies Config
