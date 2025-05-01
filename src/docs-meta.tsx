export type DocItem = {
  title: string
  href?: string
  pages?: DocPageLink[]
  sections?: DocSectionLink[]
}

export type DocPageLink = {
  title: string
  href: string
  disabled?: boolean
  keywords?: string[]
  isNew?: boolean
}

type DocSectionLink = {
  title: string
  id: string
}

const API_RELEASE_DATES = {
  SWR: new Date("2025-05-01").getTime(),
  FORM: new Date("2025-05-01").getTime(),
}

const NEW_API_DURATION = 30 * 24 * 60 * 60 * 1000 // 30 days

const isAPINew = (api: keyof typeof API_RELEASE_DATES) => {
  return Date.now() < API_RELEASE_DATES[api] + NEW_API_DURATION
}

export const docMeta: DocItem[] = [
  {
    title: "Introduction",
    href: "/docs/introduction",
    sections: [
      {
        title: "About Kaioken",
        id: "about-kaioken",
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
        keywords: ["createContext"],
      },
      {
        title: "Form",
        href: "/docs/api/form",
        keywords: ["form", "useForm"],
        isNew: isAPINew("FORM"),
      },
      {
        title: "Lazy",
        href: "/docs/api/lazy",
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
        title: "Routing",
        href: "/docs/api/routing",
        keywords: ["router", "route", "link", "navigate"],
      },
      {
        title: "Signal",
        href: "/docs/api/signal",
        keywords: ["signal", "state"],
      },
      {
        title: "Store",
        href: "/docs/api/store",
        keywords: ["createStore", "useStore", "MethodFactory", "state"],
      },
      {
        title: "SWR",
        href: "/docs/api/swr",
        keywords: ["swr", "useSWR", "fetcher", "mutate", "revalidate", "cache"],
        isNew: isAPINew("SWR"),
      },
      {
        title: "Transition",
        href: "/docs/api/transition",
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
        title: "useModel",
        href: "/docs/hooks/useModel",
        keywords: ["Ref"],
      },
      {
        title: "useReducer",
        href: "/docs/hooks/useReducer",
      },
      {
        title: "useRef",
        href: "/docs/hooks/useRef",
        keywords: ["Ref"],
      },
      {
        title: "useState",
        href: "/docs/hooks/useState",
      },
      {
        title: "useSyncExternalStore",
        href: "/docs/hooks/useSyncExternalStore",
        keywords: ["state", "global state"],
      },
      {
        title: "Dependency arrays",
        href: "/docs/hooks/dependency-arrays",
      },
      {
        title: "Custom hooks",
        href: "/docs/hooks/custom-hooks",
        keywords: ["useHook"],
      },
    ],
  },
]
