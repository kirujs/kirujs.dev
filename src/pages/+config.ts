import type { Config } from "vike/types"

export default {
  prerender: false,
  meta: {
    Layout: {
      env: { server: true, client: true },
    },
  },
} satisfies Config
