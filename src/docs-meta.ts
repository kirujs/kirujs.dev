export type DocItem = {
  title: string
  href?: string
  pages?: DocPageLink[]
  sections?: DocSectionLink[]
}

export type DocItemStatus =
  | {
      type: "new"
      since: string
    }
  | {
      type: "deprecated"
      since: string
    }

export type DocPageLink = {
  title: string
  href: string
  disabled?: boolean
  tags?: string[]
  status?: DocItemStatus
  sections?: DocSectionLink[]
}

type DocSectionLink = {
  title: string
  id: string
  isNew?: DocItemStatus
}

// const STATUS_MAP: Record<string, DocItemStatus> = {

// } as const

export const docMeta: DocItem[] = [
  {
    title: "Introduction",
    href: "/docs/introduction",
    sections: [
      {
        title: "About Kiru",
        id: "about-kiru",
      },
      {
        title: "Roadmap",
        id: "roadmap",
      },
      {
        title: "Ecosystem",
        id: "ecosystem",
      },
    ],
  },
  {
    title: "Getting started",
    href: "/docs/getting-started",
    sections: [
      {
        title: "Start a new project",
        id: "start-a-new-project",
      },
      {
        title: "Add to an existing project",
        id: "add-to-an-existing-project",
      },
      {
        title: "Getting help",
        id: "getting-help",
      },
    ],
  },
  {
    title: "API",
    pages: [
      {
        title: "Context",
        href: "/docs/api/context",
        tags: ["createContext"],
      },
      {
        title: "Utils",
        href: "/docs/api/utils",
        tags: ["className", "flushSync", "nextIdle", "onHmr", "unwrap"],
        sections: [
          { id: "className", title: "className" },
          { id: "flushSync", title: "flushSync" },
          { id: "nextIdle", title: "nextIdle" },
          { id: "onHmr", title: "onHmr" },
          { id: "unwrap", title: "unwrap" },
        ],
      },

      {
        title: "Lifecycles",
        href: "/docs/api/lifecycles",
        tags: [
          "onMount",
          "onBeforeMount",
          "onCleanup",
          "useEffect",
          "useLayoutEffect",
          "setup",
          "onHmr",
        ],
        sections: [
          {
            id: "setup",
            title: "setup",
          },
          {
            id: "onMount",
            title: "onMount",
          },
          {
            id: "onBeforeMount",
            title: "onBeforeMount",
          },
          {
            id: "onCleanup",
            title: "onCleanup",
          },
          {
            id: "onHmr",
            title: "onHmr",
          },
        ],
      },

      {
        title: "File Router",
        href: "/docs/api/file-router",
        tags: ["FileRouter", "Link", "SSG", "useFileRouter", "404"],
        sections: [
          {
            id: "general-usage",
            title: "General Usage",
          },
          {
            id: "file-structure",
            title: "File Structure & Routing",
          },
          {
            id: "data-loading",
            title: "Data Loading",
          },
          {
            id: "static-site-generation",
            title: "Static Site Generation (SSG)",
          },
          {
            id: "navigation",
            title: "Navigation",
          },
          {
            id: "layouts",
            title: "Layouts",
          },
          {
            id: "404",
            title: "404",
          },
          {
            id: "useFileRouter",
            title: "useFileRouter",
          },
        ],
      },
      {
        title: "Signal",
        href: "/docs/api/signal",
        tags: ["state", "computed", "effect", "resource", "two way binding"],
        sections: [
          {
            id: "general-usage",
            title: "General Usage",
          },
          {
            id: "computed-signals",
            title: "Computed",
          },
          {
            id: "signal-effects",
            title: "Effect",
          },
          {
            id: "usage-in-components",
            title: "In Components",
          },
          {
            id: "two-way-binding",
            title: "Two Way Binding",
          },
          {
            id: "resource",
            title: "Resource",
            isNew: { type: "new", since: "1.3.0" },
          },
        ],
      },

      {
        title: "ViewTransitions",
        href: "/docs/api/view-transitions",
        tags: ["view transitions", "animation", "batching", "AbortSignal"],
        sections: [
          {
            id: "run",
            title: "run",
          },
          {
            id: "abort",
            title: "Cancelling with AbortSignal",
          },
          {
            id: "stop",
            title: "stop",
          },
        ],
      },
    ],
  },
  {
    title: "Components",
    pages: [
      {
        title: "Derive",
        href: "/docs/components/derive",
        tags: ["derive", "promise", "fallback", "mode", "signals"],
      },
      {
        title: "ErrorBoundary",
        href: "/docs/components/error-boundary",
        tags: ["error handling", "error boundary"],
      },
      {
        title: "For",
        href: "/docs/components/for",
        tags: ["for", "list", "iteration"],
      },
      {
        title: "Lazy",
        href: "/docs/components/lazy",
        tags: ["code-splitting"],
      },
      {
        title: "Portal",
        href: "/docs/components/portal",
        tags: ["portal", "modal", "tooltip", "overlay"],
      },
      {
        title: "Show",
        href: "/docs/components/show",
        tags: ["show", "conditional rendering"],
      },
      {
        title: "Transition",
        href: "/docs/components/transition",
        tags: ["animation", "coroutine"],
      },
    ],
  },
]
