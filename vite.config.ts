import path from "node:path"
import { defineConfig } from "vite"
import kiru from "vite-plugin-kiru"
import tailwindcss from "@tailwindcss/vite"
import mdx from "@mdx-js/rollup"
import shiki, { type RehypeShikiOptions } from "@shikijs/rehype"
import {
  transformerNotationHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers"

export default defineConfig({
  resolve: {
    alias: {
      $: path.resolve(__dirname, "src"),
    },
  },
  esbuild: {
    sourcemap: false,
  },
  plugins: [
    tailwindcss(),
    {
      enforce: "pre",
      ...mdx({
        jsx: false,
        jsxImportSource: "kiru",
        jsxRuntime: "automatic",
        // Match production JSX output during dev SSR + client hydrate (avoid jsxDEV-only trees).
        development: false,
        rehypePlugins: [
          [
            shiki,
            {
              theme: "github-dark",
              transformers: [
                transformerNotationHighlight(),
                transformerNotationDiff(),
              ],
            } satisfies RehypeShikiOptions,
          ],
        ],
      }),
    },
    kiru({
      router: {
        ssg: {
          routes: "./src/routes.ts",
          siteModule: "./src/site.config.ts",
        },
      },
    }),
  ],
})
