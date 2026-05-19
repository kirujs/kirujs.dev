import { defineRouteTree } from "kiru/router"
import { pagesFromGlob, routePathFromPageModule } from "./glob-routes"

const v1DocModules = import.meta.glob("./pages/docs/**/index.mdx")
const v2DocModules = import.meta.glob("./pages/v2/docs/**/index.mdx")

/** v2 API/component pages reuse v1 MDX until dedicated v2 copies exist. */
const v2SharedModules = import.meta.glob("./pages/docs/**/index.mdx")

const v2SharedRoutes = [
  "/api/context",
  "/api/ref",
  "/api/utils",
  "/api/lifecycles",
  "/api/signal",
  "/api/view-transitions",
  "/components/derive",
  "/components/error-boundary",
  "/components/for",
  "/components/lazy",
  "/components/portal",
  "/components/show",
  "/components/transition",
] as const

function v2SharedPages(r: Parameters<Parameters<typeof defineRouteTree>[0]>[0]) {
  return v2SharedRoutes.map((suffix) => {
    const v1Key = `./pages/docs${suffix}/index.mdx`
    const loader = v2SharedModules[v1Key]
    if (!loader) {
      throw new Error(`[routes] missing v1 module for v2 shared route: ${v1Key}`)
    }
    return r.page(`/v2/docs${suffix}`, () => loader())
  })
}

export const routes = defineRouteTree((r) =>
  r.scope({
    static: true,
    layout: () => import("./pages/layout.tsx"),
    notFound: () => import("./pages/404/index.tsx"),
    children: [
      r.page("/", () => import("./pages/index.tsx")),
      r.page("/keys-warning", () => import("./pages/keys-warning/index.tsx")),
      r.scope({
        layout: () => import("./pages/docs/layout.tsx"),
        children: pagesFromGlob(r, v1DocModules, { withDocHead: true }),
      }),
      r.scope({
        layout: () => import("./pages/v2/docs/layout.tsx"),
        children: [
          ...pagesFromGlob(r, v2DocModules),
          ...v2SharedPages(r),
        ],
      }),
    ],
  })
)

export { routePathFromPageModule }
