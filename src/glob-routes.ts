import type { RouteBuilder, RouteDefinition } from "kiru/router"

/** `./pages/docs/foo/index.mdx` → `/docs/foo`; `./pages/index.tsx` → `/` */
export function routePathFromPageModule(key: string): string {
  if (key === "./pages/index.tsx") return "/"
  const match = key.match(/^\.\/pages(\/.+)\/index\.(tsx|mdx)$/)
  if (!match) {
    throw new Error(`[glob-routes] unexpected module key: ${key}`)
  }
  return match[1]
}

function titleFromDocPath(routePath: string): string {
  if (routePath === "/docs/introduction") return "Kiru - Introduction"
  if (routePath === "/docs/getting-started") return "Kiru - Getting started"
  const segment = routePath.split("/").pop() ?? "Docs"
  const label = segment.replace(/-/g, " ")
  return `Kiru - ${label.charAt(0).toUpperCase()}${label.slice(1)}`
}

export function pagesFromGlob(
  r: RouteBuilder,
  glob: Record<string, () => Promise<unknown>>,
  options?: { withDocHead?: boolean }
): RouteDefinition[] {
  return Object.keys(glob)
    .sort()
    .map((key) => {
      const routePath = routePathFromPageModule(key)
      const load = () => glob[key]()
      if (options?.withDocHead && routePath.startsWith("/docs")) {
        return r.page(routePath, {
          component: load,
          head: { title: titleFromDocPath(routePath) },
        })
      }
      return r.page(routePath, load)
    })
}
