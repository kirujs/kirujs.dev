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
import { esbuildWasmPlugin } from "./vite/plugin-esbuild-wasm"

export default defineConfig({
  resolve: {
    alias: {
      $: path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    esbuildWasmPlugin(),
    tailwindcss(),
    {
      enforce: "pre",
      ...mdx({
        jsx: false,
        jsxImportSource: "kiru",
        jsxRuntime: "automatic",
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
      ssg: {
        page: "index.{tsx,mdx}",
        sitemap: {
          domain: "https://kirujs.dev",
          overrides: {
            "/": {
              changefreq: "daily",
              priority: 0.9,
            },
          },
        },
      },
    }),
  ],
})
