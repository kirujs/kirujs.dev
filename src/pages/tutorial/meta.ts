export type TutorialItem = {
  title: string
  route: string
  children?: TutorialItem[]
}

export const tutorials: TutorialItem[] = [
  {
    title: "Introduction",
    route: "/introduction",
  },
  {
    title: "JSX", // cover jsx expressions
    route: "/jsx",
    children: [
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
    route: "/state",
    children: [
      {
        title: "Hooks",
        route: "/hooks",
      },
      {
        title: "Signals",
        route: "/signals",
        children: [
          {
            title: "Basic",
            route: "/basic",
          },
        ],
      },
    ],
  },
  {
    title: "Context",
    route: "/context",
  },
  {
    title: "Routing", // explore the Router API
    route: "/routing",
  },
  {
    title: "Forms", // explore the Form API
    route: "/forms",
  },
  {
    title: "Data Fetching", // explore the useAsync/useSWR hooks
    route: "/fetching",
    children: [
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
