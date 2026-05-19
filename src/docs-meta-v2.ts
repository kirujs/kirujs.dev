import type { DocItem } from "$/docs-meta"

export const docMetaV2: DocItem[] = [
  {
    title: "Introduction",
    href: "/v2/docs/introduction",
    sections: [
      { title: "About Kiru", id: "about-kiru-v2" },
      { title: "Documentation versions", id: "documentation-versions" },
    ],
  },
  {
    title: "Migration",
    href: "/v2/docs/migration",
    sections: [
      { title: "Overview", id: "overview" },
      { title: "Route tree", id: "route-definition" },
      { title: "Bootstrap", id: "bootstrap" },
      { title: "HTML shell", id: "html-shell" },
      { title: "Vite plugin", id: "vite-plugin" },
      { title: "Navigation", id: "navigation" },
      { title: "SSR apps", id: "ssr-apps" },
      { title: "Checklist", id: "checklist" },
      { title: "Limitations", id: "limitations" },
    ],
  },
  {
    title: "Getting started",
    href: "/v2/docs/getting-started",
    sections: [
      { title: "Start a new project", id: "start-a-new-project" },
      { title: "Add to an existing project", id: "add-to-existing" },
      { title: "Modes", id: "modes" },
    ],
  },
  {
    title: "Router",
    pages: [
      {
        title: "Overview",
        href: "/v2/docs/router/overview",
        sections: [
          { id: "modes", title: "Rendering modes" },
          { id: "choose", title: "Choosing a mode" },
          { id: "html-shell", title: "HTML shell (SSG / SSR)" },
        ],
      },
      {
        title: "Route tree",
        href: "/v2/docs/router/route-tree",
        sections: [
          { id: "defineRouteTree", title: "defineRouteTree" },
          { id: "scopes", title: "Scopes and inheritance" },
          { id: "page-config", title: "Page route config" },
          { id: "layouts", title: "Layouts" },
          { id: "static", title: "Static routes" },
          { id: "guards", title: "beforeEnter" },
        ],
      },
      {
        title: "CSR",
        href: "/v2/docs/router/csr",
        sections: [
          { id: "vite", title: "Vite plugin" },
          { id: "html-shell", title: "index.html" },
          { id: "bootstrap", title: "Bootstrap" },
          { id: "routes", title: "routes.ts" },
          { id: "loaders", title: "Loaders on CSR" },
        ],
      },
      {
        title: "SSG",
        href: "/v2/docs/router/ssg",
        sections: [
          { id: "vite", title: "Vite plugin" },
          { id: "html-shell", title: "index.html" },
          { id: "routes", title: "Route tree" },
          { id: "static-params", title: "generateStaticParams" },
          { id: "bootstrap", title: "Client bootstrap" },
          { id: "loaders", title: "staticLoader" },
          { id: "site-config", title: "site.config.ts" },
        ],
      },
      {
        title: "SSR",
        href: "/v2/docs/router/ssr",
        sections: [
          { id: "vite", title: "Vite plugin" },
          { id: "html-shell", title: "index.html" },
          { id: "server", title: "Server entry" },
          { id: "client", title: "Client entry" },
          { id: "routes", title: "Route tree highlights" },
          { id: "site-config", title: "site.config.ts" },
        ],
      },
      {
        title: "Hybrid",
        href: "/v2/docs/router/hybrid",
        sections: [
          { id: "vite", title: "Vite configuration" },
          { id: "static-routes", title: "Which routes are static?" },
          { id: "runtime", title: "Production vs development" },
          { id: "sitemap", title: "Sitemaps in hybrid apps" },
          { id: "head", title: "Head and SEO" },
        ],
      },
      {
        title: "Loaders",
        href: "/v2/docs/router/loaders",
        sections: [
          { id: "matrix", title: "Loader matrix" },
          { id: "loader", title: "loader (universal)" },
          { id: "serverLoader", title: "serverLoader" },
          { id: "staticLoader", title: "staticLoader" },
          { id: "clientLoader", title: "clientLoader" },
          { id: "validation", title: "Query validation" },
          { id: "invalidate", title: "invalidate and revalidate" },
        ],
      },
      {
        title: "Navigation",
        href: "/v2/docs/router/navigation",
        sections: [
          { id: "link", title: "Link" },
          { id: "useRouter", title: "useRouter" },
          { id: "resolveHref", title: "resolveHref and setLocale" },
          { id: "beforeEnter", title: "beforeEnter guards" },
        ],
      },
      {
        title: "Head & SEO",
        href: "/v2/docs/router/head-seo",
        sections: [
          { id: "html-shell", title: "HTML shell tokens" },
          { id: "route-head", title: "Head on the route tree" },
          { id: "page-exports", title: "Page module exports" },
          { id: "meta-fields", title: "RouteHeadMeta fields" },
          { id: "csr-sync", title: "CSR and client navigations" },
          { id: "site-artifacts", title: "Sitemap and robots" },
        ],
      },
      {
        title: "Deploy",
        href: "/v2/docs/router/deploy",
        sections: [
          { id: "adapters", title: "Runtime adapters" },
          { id: "ssg", title: "Static SSG deploy" },
          { id: "hybrid", title: "Hybrid SSR deploy" },
          { id: "env", title: "Environment" },
        ],
      },
    ],
  },
  {
    title: "API",
    pages: [
      { title: "Context", href: "/v2/docs/api/context" },
      { title: "Ref", href: "/v2/docs/api/ref" },
      { title: "Utils", href: "/v2/docs/api/utils" },
      { title: "Lifecycles", href: "/v2/docs/api/lifecycles" },
      { title: "Signal", href: "/v2/docs/api/signal" },
      { title: "ViewTransitions", href: "/v2/docs/api/view-transitions" },
    ],
  },
  {
    title: "Components",
    pages: [
      { title: "Derive", href: "/v2/docs/components/derive" },
      { title: "ErrorBoundary", href: "/v2/docs/components/error-boundary" },
      { title: "For", href: "/v2/docs/components/for" },
      { title: "Lazy", href: "/v2/docs/components/lazy" },
      { title: "Portal", href: "/v2/docs/components/portal" },
      { title: "Show", href: "/v2/docs/components/show" },
      { title: "Transition", href: "/v2/docs/components/transition" },
    ],
  },
]
