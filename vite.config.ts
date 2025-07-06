import path from "node:path"
import { defineConfig } from "vite"
import vike from "vike/plugin"
import kaioken from "vite-plugin-kaioken"
import mdx from "@mdx-js/rollup"
import shiki, { type RehypeShikiOptions } from "@shikijs/rehype"
import {
  transformerNotationHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers"
import { shikiInlineDiffNotation } from "./shikiInlineDiffNotation"

export default defineConfig({
  resolve: {
    alias: {
      $: path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      external: ["/src/components/CodeSandbox/files/**/*"],
    },
  },
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        jsx: false,
        jsxImportSource: "kaioken",
        jsxRuntime: "automatic",
        rehypePlugins: [
          [
            shiki,
            {
              theme: "github-dark",
              transformers: [
                transformerNotationHighlight(),
                transformerNotationDiff(),
                shikiInlineDiffNotation(),
              ],
            } as RehypeShikiOptions,
          ],
        ],
      }),
    },
    vike(),
    kaioken(),
  ],
})
