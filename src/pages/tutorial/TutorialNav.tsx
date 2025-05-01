import { usePageContext } from "$/context/pageContext"
import { signal } from "kaioken"
import { tutorials, TutorialItem } from "./meta"
import { ChevronRightIcon } from "$/components/icons/ChevronRightIcon"

const navCollapsed = signal(true)

export function TutorialNav() {
  const { urlPathname } = usePageContext()
  if (!navCollapsed.value) {
    return (
      <ul className="flex flex-col gap-1 p-2 py-1 bg-white/5">
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
        className="flex items-center gap-1 p-2 py-1 bg-white/5"
        onclick={() => {
          navCollapsed.value = !navCollapsed.value
        }}
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
      className="flex items-center gap-1 p-2 py-1 bg-white/5"
      onclick={() => {
        navCollapsed.value = !navCollapsed.value
      }}
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
}: {
  item: TutorialItem
  prefix?: string
}) {
  const { urlPathname } = usePageContext()
  if ("sections" in item) {
    const active = urlPathname.startsWith(prefix + item.route)
    return (
      <li>
        <span className={["text-light", active && "font-bold"]}>
          {item.title}
        </span>
        <ul className="pl-4">
          {item.sections.map((section) => (
            <TutorialNavItem
              key={section.title}
              item={section}
              prefix={item.route}
            />
          ))}
        </ul>
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
        onclick={() => (navCollapsed.value = true)}
      >
        {item.title}
        {isActive && <ChevronRightIcon style="transform: rotate(90deg)" />}
      </a>
    </li>
  )
}
