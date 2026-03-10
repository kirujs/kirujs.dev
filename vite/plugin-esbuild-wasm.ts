import type { Plugin } from "vite"
import { readFile } from "node:fs/promises"
import { resolve } from "node:path"

export function esbuildWasmPlugin(): Plugin {
  const wasmPath = resolve("node_modules/esbuild-wasm/esbuild.wasm")

  return {
    name: "esbuild-wasm",

    configureServer(server) {
      let cache: Buffer | null = null
      server.middlewares.use("/esbuild.wasm", async (_req, res) => {
        cache ??= await readFile(wasmPath)
        res.setHeader("Content-Type", "application/wasm")
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable")
        res.end(cache)
      })
    },

    async generateBundle() {
      const wasm = await readFile(wasmPath)
      this.emitFile({
        type: "asset",
        fileName: "esbuild.wasm",
        source: wasm,
      })
    },
  }
}
