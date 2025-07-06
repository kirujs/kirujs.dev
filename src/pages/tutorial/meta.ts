export type TutorialItem = {
  title: string
  route: string
  children?: TutorialItem[]
}

const pages = import.meta.glob("./**/+config.ts", { eager: true })
// Helper function to extract order number from path
function getOrderNumber(path: string): number {
  const match = path.match(/\/(\d+)-/)
  return match ? parseInt(match[1]) : 0
}

// Helper function to build route path
function buildRoute(path: string): string {
  // Remove the ./ prefix and +config.ts suffix
  const cleanPath = path.replace(/^\.\//, "").replace(/\/\+config\.ts$/, "")

  // Remove the numeric prefixes and convert to route format
  const routePath = cleanPath
    .split("/")
    .map((segment) => segment.replace(/^\d+-/, ""))
    .join("/")

  const split = routePath.split("/").filter(Boolean)
  if (split.length === 1) {
    return `/${split[0]}`
  }

  return `/${split[split.length - 1]}`
}

// Process the glob result into tutorial structure
function processTutorials(): TutorialItem[] {
  const entries = Object.entries(pages)
  const allItems: { [key: string]: TutorialItem } = {}
  const parentChildren: { [key: string]: TutorialItem[] } = {}

  // Sort entries by their path to ensure correct ordering
  entries.sort(([a], [b]) => {
    const aOrder = getOrderNumber(a)
    const bOrder = getOrderNumber(b)
    return aOrder - bOrder
  })

  // First pass: collect all items
  for (const [path, module] of entries) {
    const config = (module as any).default
    const title = config?.title || "Untitled"
    const route = buildRoute(path)

    // Get the path segments to understand the hierarchy
    const pathSegments = path
      .replace(/^\.\//, "")
      .replace(/\/\+config\.ts$/, "")
      .split("/")

    if (pathSegments.length === 1) {
      // This is a top-level or parent item
      const itemKey = pathSegments[0]
      allItems[itemKey] = {
        title,
        route,
      }
    } else {
      // This is a child item
      const parentKey = pathSegments[0]

      if (!parentChildren[parentKey]) {
        parentChildren[parentKey] = []
      }

      parentChildren[parentKey].push({
        title,
        route,
      })
    }
  }

  // Second pass: build the final structure
  const result: TutorialItem[] = []

  // Get all top-level keys and sort them by numeric order
  const topLevelKeys = Object.keys(allItems)
  topLevelKeys.sort((a, b) => {
    const aOrder = getOrderNumber(a)
    const bOrder = getOrderNumber(b)
    return aOrder - bOrder
  })

  for (const key of topLevelKeys) {
    const item = allItems[key]

    // Check if this parent has children
    if (parentChildren[key]) {
      // Sort children by their numeric order
      const children = parentChildren[key].sort((a, b) => {
        const aEntry = entries.find(
          ([path, module]) => (module as any).default?.title === a.title
        )
        const bEntry = entries.find(
          ([path, module]) => (module as any).default?.title === b.title
        )

        const aOrder = aEntry ? getOrderNumber(aEntry[0]) : 0
        const bOrder = bEntry ? getOrderNumber(bEntry[0]) : 0

        return aOrder - bOrder
      })

      result.push({
        ...item,
        children,
      })
    } else {
      result.push(item)
    }
  }

  return result
}

export const tutorials: TutorialItem[] = processTutorials()

console.log({ tutorials })
