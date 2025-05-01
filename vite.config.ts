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
  plugins: [
    //     {
    //       name: "cf: emit '_headers' file",
    //       buildStart() {
    //         this.emitFile({
    //           type: "asset",
    //           fileName: "_headers",
    //           source: `# custom cloudflare headers
    // https://kaioken.dev/*
    //   Content-Security-Policy: default-src 'self'; img-src 'self' kaioken.dev;
    //           `,
    //         })
    //       },
    //     },
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
