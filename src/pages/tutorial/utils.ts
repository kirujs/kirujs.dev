import { TutorialItem, tutorials } from "./meta"

export function matchUrl(url: string): null | { stack: TutorialItem[] } {
  const urlParts = url.split("/").filter(Boolean)

  let section: TutorialItem = {
    title: "",
    route: "/tutorial",
    children: tutorials,
  }

  const stack: TutorialItem[] = []
  const stackMatchesParts = () => {
    return (
      stack.length === urlParts.length &&
      stack.every(
        (item, index) => item.route.replace("/", "") === urlParts[index]
      )
    )
  }
  const recurse = (item: TutorialItem): TutorialItem[] | null => {
    stack.push(item)
    if (stackMatchesParts()) {
      return stack
    }
    if (item.children) {
      for (const child of item.children) {
        const result = recurse(child)
        if (result) {
          return result
        }
      }
    }
    stack.pop()
    return null
  }

  const result = recurse(section)
  if (result) {
    return { stack: result }
  }
  return null
}
