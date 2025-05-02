import { usePageContext } from "$/context/pageContext"
import { ElementProps, signal, useLayoutEffect, useRef } from "kaioken"
import { tutorials, TutorialItem } from "./meta"
import { ChevronRightIcon } from "$/components/icons/ChevronRightIcon"

const navExpanded = signal(false)

export function TutorialNav() {
  const { urlPathname } = usePageContext()
  const prevPathname = useRef(urlPathname)
  useLayoutEffect(() => {
    if (urlPathname !== prevPathname.current) {
      navExpanded.value = false
      prevPathname.current = urlPathname
    }
  }, [urlPathname])

  if (navExpanded.value) {
    return (
      <ul className="flex flex-col gap-1 p-2 py-1 bg-white/2.5 border border-white/5">
        {tutorials.map((tutorial) => (
          <TutorialNavItem key={tutorial.title} item={tutorial} />
        ))}
      </ul>
    )
  }

  const activeTopLevelTutorial = tutorials.find(
    (item) => urlPathname === item.route
  )

  if (activeTopLevelTutorial) {
    return (
      <button
        type="button"
        className="flex items-center gap-1 p-2 py-1 bg-white/2.5 border border-white/5"
        onclick={() => (navExpanded.value = true)}
      >
        {activeTopLevelTutorial.title}
        <ChevronRightIcon />
      </button>
    )
  }

  const activeSection = tutorials.find((item) =>
    urlPathname.startsWith(item.route)
  )
  if (!activeSection) return null
  const activeSectionItem = (
    activeSection as TutorialItem & { sections: TutorialItem[] }
  ).sections.find((item) => urlPathname === activeSection.route + item.route)

  return (
    <button
      type="button"
      className="flex items-center gap-1 p-2 py-1 bg-white/2.5 border border-white/5"
      onclick={() => (navExpanded.value = true)}
    >
      {activeSection.title}
      <ChevronRightIcon />
      {activeSectionItem?.title}
    </button>
  )
}

function TutorialNavItem({
  item,
  prefix = "",
  depth = 0,
}: {
  item: TutorialItem
  prefix?: string
  depth?: number
}) {
  const { urlPathname } = usePageContext()
  if ("sections" in item) {
    const active = urlPathname.startsWith(prefix + item.route)
    const detailsProps: ElementProps<"details"> = active ? { open: true } : {}
    return (
      <li className="px-2 py-1 bg-white/2.5 border border-white/5">
        <details {...detailsProps}>
          <summary className="text-light cursor-pointer">{item.title}</summary>
          <ul className="pl-4">
            {item.sections.map((section) => (
              <TutorialNavItem
                key={section.title}
                item={section}
                prefix={item.route}
                depth={depth + 1}
              />
            ))}
          </ul>
        </details>
      </li>
    )
  }

  const isActive = urlPathname === prefix + item.route
  return (
    <li>
      <a
        className={[
          "text-light flex items-center gap-1",
          isActive && "font-bold",
        ]}
        href={prefix + item.route}
        onclick={() => isActive && (navExpanded.value = false)}
      >
        {item.title}
        {isActive && depth === 0 && (
          <ChevronRightIcon style="transform: rotate(90deg)" />
        )}
      </a>
    </li>
  )
}
