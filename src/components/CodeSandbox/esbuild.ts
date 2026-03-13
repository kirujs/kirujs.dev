import * as esbuild from "esbuild-wasm"
import { signal } from "kiru"

const CDN = "https://esm.run"

const MAIN_TS = `
import { createElement as _jsx, Fragment as _jsxFragment, mount } from "kiru"
import { App } from "./app.tsx"
window.__kiru?.apps.forEach(app => app.unmount())
mount(<App />, document.body)
`

export const loadingProgress = signal(0)

export async function loadESBuild(): Promise<void> {
  await (initPromise.value ??= actuallyLoadESBuild())
}

const actuallyLoadESBuild = async () => {
  await initIDB()
  loadingProgress.value = 10

  const wasmURL = "/esbuild.wasm"
  const response = await fetch(wasmURL)

  if (!response.ok || !response.body) {
    throw new Error(`Failed to fetch WASM: ${response.status}`)
  }

  const contentLength = response.headers.get("content-length")
  const total = contentLength ? parseInt(contentLength, 10) : 0

  let loaded = 0
  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    chunks.push(value)
    loaded += value.length

    if (total > 0) {
      loadingProgress.value = 10 + Math.floor((loaded / total) * 90)
    }
  }

  const wasmBytes = new Uint8Array(loaded)
  let offset = 0
  for (const chunk of chunks) {
    wasmBytes.set(chunk, offset)
    offset += chunk.length
  }

  const wasmModule = await WebAssembly.compile(wasmBytes)
  await esbuild.initialize({ wasmModule })
  loadingProgress.value = 100
}

const initPromise = signal<Promise<void> | null>(null)
let idb: IDBDatabase | null = null
export async function compile(files: Record<string, string>): Promise<string> {
  await (initPromise.value ??= actuallyLoadESBuild())

  const allFiles = {
    ...Object.fromEntries(
      Object.entries(files).map(([k, v]) => [
        k,
        `import { createElement as _jsx, Fragment as _jsxFragment } from "kiru";
${v}`,
      ])
    ),
    "./main.tsx": MAIN_TS, // injected last so users can't override it
  }

  const result = await esbuild.build({
    entryPoints: ["./main.tsx"],
    bundle: true,
    write: false,
    minify: false,
    //keepNames: true,
    format: "esm",
    platform: "browser",
    jsx: "transform",
    jsxFactory: "_jsx",
    jsxFragment: "_jsxFragment",
    plugins: [localFilesPlugin(allFiles), npmPlugin()],
  })

  return result.outputFiles[0].text
}

function localFilesPlugin(files: Record<string, string>): esbuild.Plugin {
  const normalizedFiles: Record<string, string> = {}
  for (const [k, v] of Object.entries(files)) {
    const key = k.startsWith("./") ? k : `./${k}`
    normalizedFiles[key] = v
  }

  return {
    name: "local-files",
    setup(build) {
      build.onResolve({ filter: /^\.+\// }, (args) => {
        if (args.importer.startsWith("http")) return null

        const resolvedKey = resolveRelative(args.importer, args.path)
        const key = findFile(normalizedFiles, resolvedKey)

        if (key) return { path: key, namespace: "local" }
        return null
      })

      build.onLoad({ filter: /.*/, namespace: "local" }, (args) => {
        const contents = normalizedFiles[args.path]
        if (contents == null)
          return { errors: [{ text: `File not found: ${args.path}` }] }

        return { contents, loader: inferLoader(args.path) }
      })
    },
  }
}

/** Resolve a relative import path against the current file's path */
function resolveRelative(importer: string, importPath: string): string {
  if (!importer || importer === "<stdin>") return importPath

  const importerDir = importer.includes("/")
    ? importer.slice(0, importer.lastIndexOf("/") + 1)
    : "./"

  const url = new URL(importPath, `file://${importerDir.replace(/^\./, "")}`)
  return "." + url.pathname
}

/** Try to find a file key, adding extensions if needed */
function findFile(files: Record<string, string>, path: string): string | null {
  if (files[path] != null) return path

  for (const ext of [".tsx", ".ts", ".jsx", ".js"]) {
    if (files[path + ext] != null) return path + ext
  }

  return null
}

function inferLoader(path: string): esbuild.Loader {
  if (path.endsWith(".tsx")) return "tsx"
  if (path.endsWith(".ts")) return "ts"
  if (path.endsWith(".jsx")) return "jsx"
  if (path.endsWith(".css")) return "css"
  return "js"
}

function npmPlugin(): esbuild.Plugin {
  const cache = new Map<string, esbuild.OnLoadResult>()

  return {
    name: "npm-plugin",
    setup(build) {
      build.onResolve({ filter: /^\.+\// }, (args) => ({
        path: new URL(args.path, args.importer).href,
        namespace: "http",
      }))

      build.onResolve({ filter: /^\/[^/]/ }, (args) => ({
        path: new URL(args.path, CDN).href,
        namespace: "http",
      }))

      build.onResolve({ filter: /^[^./].*/ }, (args) => ({
        path: `${CDN}/${args.path}`,
        namespace: "http",
      }))

      build.onLoad({ filter: /.*/, namespace: "http" }, async (args) => {
        if (cache.has(args.path)) return cache.get(args.path)!

        const result: esbuild.OnLoadResult = {
          loader: "js",
          contents: await fetchCached(args.path),
          resolveDir: new URL("./", args.path).href,
        }

        cache.set(args.path, result)
        return result
      })
    },
  }
}

async function initIDB(): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const req = indexedDB.open("esbuild", 1)

    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains("files")) {
        req.result.createObjectStore("files")
      }
    }

    req.onsuccess = () => {
      idb = req.result
      resolve()
    }

    req.onerror = () => reject(req.error)
  })
}

async function fetchCached(url: string): Promise<string> {
  const cached = await getFile(url)
  if (cached != null) return cached

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const text = await res.text()

  await putFile(url, text)
  return text
}

function getFile(url: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    if (!idb) return reject(new Error("IndexedDB not initialized"))

    const req = idb
      .transaction("files", "readonly")
      .objectStore("files")
      .get(url)
    req.onsuccess = () => resolve(req.result ?? null)
    req.onerror = () => resolve(null)
  })
}

function putFile(url: string, text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!idb) return reject(new Error("IndexedDB not initialized"))

    const req = idb
      .transaction("files", "readwrite")
      .objectStore("files")
      .put(text, url)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}
