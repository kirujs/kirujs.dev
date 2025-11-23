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

const STATUS_MAP: Record<string, DocItemStatus> = {
  fileRouterApi: {
    type: "new",
    since: "0.50.0",
  },
  deriveApi: {
    type: "new",
    since: "0.53.0",
  },
} as const

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
        title: "Derive",
        href: "/docs/api/derive",
        tags: ["derive", "promise", "fallback", "mode", "signals"],
        status: STATUS_MAP.deriveApi,
      },
      {
        title: "Lazy",
        href: "/docs/api/lazy",
        tags: ["code-splitting"],
      },
      {
        title: "Memo",
        href: "/docs/api/memo",
      },
      {
        title: "Portal",
        href: "/docs/api/portal",
      },
      {
        title: "File Router",
        href: "/docs/api/file-router",
        tags: ["FileRouter", "Link", "SSG", "useFileRouter", "404"],
        status: STATUS_MAP.fileRouterApi,
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
        title: "Form",
        href: "/docs/api/form",
        tags: ["useForm", "form", "validation", "Field", "Subscribe"],
        status: STATUS_MAP.formApi,
        sections: [
          {
            id: "basic-usage",
            title: "Basic Usage",
          },
          {
            id: "validation",
            title: "Validation",
          },
          {
            id: "form-components",
            title: "Form Components",
          },
        ],
      },
      {
        title: "Signal",
        href: "/docs/api/signal",
        tags: ["state", "computed", "effect", "two way binding", "For"],
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
            title: "Watch",
          },
          {
            id: "usage-in-components",
            title: "In Components",
          },
          {
            id: "two-way-binding",
            title: "Two Way Binding",
            isNew: STATUS_MAP.elementBindings,
          },
          {
            id: "for-component",
            title: "For",
            isNew: STATUS_MAP.ForComponent,
          },
        ],
      },
      {
        title: "Store",
        href: "/docs/api/store",
        tags: ["createStore", "useStore", "MethodFactory", "state"],
      },
      {
        title: "SWR",
        href: "/docs/api/swr",
        tags: ["swr", "useSWR", "fetcher", "mutate", "revalidate", "cache"],
        status: STATUS_MAP.swrApi,
        sections: [
          {
            id: "basic-usage",
            title: "Basic Usage",
          },
          {
            id: "mutations",
            title: "Mutations",
          },
          {
            id: "caching",
            title: "Caching",
          },
        ],
      },
      {
        title: "Transition",
        href: "/docs/api/transition",
        tags: ["transitions", "animation"],
      },
    ],
  },
  {
    title: "Hooks",
    pages: [
      {
        title: "useAsync",
        href: "/docs/hooks/useAsync",
      },
      {
        title: "useCallback",
        href: "/docs/hooks/useCallback",
      },
      {
        title: "useContext",
        href: "/docs/hooks/useContext",
      },
      {
        title: "useEffect",
        href: "/docs/hooks/useEffect",
      },
      {
        title: "useEffectEvent",
        href: "/docs/hooks/useEffectEvent",
      },
      {
        title: "useId",
        href: "/docs/hooks/useId",
      },
      {
        title: "useLayoutEffect",
        href: "/docs/hooks/useLayoutEffect",
      },
      {
        title: "useMemo",
        href: "/docs/hooks/useMemo",
      },
      {
        title: "useReducer",
        href: "/docs/hooks/useReducer",
      },
      {
        title: "useRef",
        href: "/docs/hooks/useRef",
        tags: ["Ref"],
      },
      {
        title: "useState",
        href: "/docs/hooks/useState",
      },
      {
        title: "useSyncExternalStore",
        href: "/docs/hooks/useSyncExternalStore",
        tags: ["state", "global state"],
      },
      {
        title: "useViewTransition",
        href: "/docs/hooks/useViewTransition",
        tags: ["view transition", "animation"],
        status: STATUS_MAP.useViewTransition,
      },
      {
        title: "Dependency arrays",
        href: "/docs/hooks/dependency-arrays",
      },
      {
        title: "Custom hooks",
        href: "/docs/hooks/custom-hooks",
        tags: ["useHook"],
      },
    ],
  },
]
