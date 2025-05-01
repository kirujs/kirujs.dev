export type TutorialItem =
  | {
      title: string
      route: string
    }
  | {
      title: string
      route: string
      sections: TutorialItem[]
    }

export const tutorials: TutorialItem[] = [
  {
    title: "Introduction",
    route: "/tutorial/introduction",
  },
  {
    title: "JSX", // cover jsx expressions
    route: "/tutorial/jsx",
    sections: [
      {
        title: "Basics",
        route: "/basics",
      },
      {
        title: "Advanced",
        route: "/advanced",
      },
    ],
  },
  {
    title: "State",
    route: "/tutorial/state",
    sections: [
      {
        title: "Hooks",
        route: "/hooks",
      },
      {
        title: "Signals",
        route: "/signals",
      },
    ],
  },
  {
    title: "Context",
    route: "/tutorial/context",
  },
  {
    title: "Routing", // explore the Router API
    route: "/tutorial/routing",
  },
  {
    title: "Forms", // explore the Form API
    route: "/tutorial/forms",
  },
  {
    title: "Data Fetching", // explore the useAsync/useSWR hooks
    route: "/tutorial/fetching",
    sections: [
      {
        title: "useAsync",
        route: "/use-async",
      },
      {
        title: "useSWR",
        route: "/use-swr",
      },
    ],
  },
]
