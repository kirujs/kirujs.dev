import * as esbuild from "esbuild-wasm"
import { signal } from "kiru"

const CDN = "https://esm.sh"

const initPromise = signal<Promise<void> | null>(null)
let idb: IDBDatabase | null = null

export async function compile(code: string): Promise<string> {
  if (!initPromise.peek()) {
    await (initPromise.value = initialize())
  }

  const result = await esbuild.build({
    stdin: {
      contents: `
import { createElement as _jsx, Fragment as _jsxFragment, mount } from "kiru"
window.__kiru?.apps.forEach(app => app.unmount())
${code}

mount(<App />, document.body)
`,
      loader: "tsx",
      sourcefile: "index.tsx",
    },
    bundle: true,
    write: false,
    format: "esm",
    platform: "browser",
    jsx: "transform",
    jsxFactory: "_jsx",
    jsxFragment: "_jsxFragment",
    plugins: [npmPlugin()],
  })

  return result.outputFiles[0].text
}

async function initialize(): Promise<void> {
  await initIDB()
  await esbuild.initialize({ wasmURL: "/esbuild.wasm" })
}

function npmPlugin(): esbuild.Plugin {
  const cache = new Map<string, esbuild.OnLoadResult>()

  return {
    name: "npm-plugin",
    setup(build) {
      // Resolve relative imports inside fetched modules
      build.onResolve({ filter: /^\.+\// }, (args) => ({
        path: new URL(args.path, args.importer).href,
        namespace: "http",
      }))

      // Resolve absolute-path imports from esm.sh (e.g. "/pkg@1.0.0/file.mjs")
      build.onResolve({ filter: /^\/[^/]/ }, (args) => ({
        path: new URL(args.path, CDN).href,
        namespace: "http",
      }))

      // Resolve bare npm imports
      build.onResolve({ filter: /^[^./].*/ }, (args) => ({
        path: `${CDN}/${args.path}`,
        namespace: "http",
      }))

      // Load remote modules with in-memory + IDB caching
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
