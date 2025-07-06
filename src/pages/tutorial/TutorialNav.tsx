import { usePageContext } from "$/context/pageContext"
import { ElementProps, signal, useLayoutEffect, useMemo, useRef } from "kaioken"
import { className as cls } from "kaioken/utils"
import { tutorials, TutorialItem } from "./meta"
import { ChevronRightIcon } from "$/components/icons/ChevronRightIcon"
import { matchUrl } from "./utils"
import { useTutorialSteps } from "$/components/tutorials/TutorialStepsContext"

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

  const matchResult = useMemo(() => matchUrl(urlPathname), [urlPathname])

  const breadcrumbs = useMemo<JSX.Element[] | null>(() => {
    if (!matchResult) {
      return null
    }
    if (matchResult.stack.length === 2) {
      return [matchResult.stack[1].title, <ChevronRightIcon />]
    }
    return matchResult.stack.reduce<JSX.Element[]>((acc, item, index) => {
      if (index > 0 && index < matchResult.stack.length - 1) {
        return [...acc, item.title, <ChevronRightIcon key={index} />]
      }
      return [...acc, item.title]
    }, [])
  }, [matchResult])

  if (navExpanded.value) {
    return (
      <ul className="flex flex-col gap-1 p-2 py-1 bg-white/2.5 border border-white/5">
        {tutorials.map((tutorial) => (
          <TutorialNavItem
            key={tutorial.title}
            item={tutorial}
            urlPrefix={"/tutorial"}
          />
        ))}
      </ul>
    )
  }

  if (!matchResult) {
    console.error("No match found for url", urlPathname)
    return null
  }

  return (
    <button
      type="button"
      className="flex items-center gap-1 p-2 py-1 bg-white/2.5 border border-white/5"
      onclick={() => (navExpanded.value = true)}
    >
      {breadcrumbs}
    </button>
  )
}

function TutorialNavItem({
  item,
  urlPrefix,
}: {
  item: TutorialItem
  urlPrefix: string
}) {
  const { urlPathname } = usePageContext()
  const { isTutorialCompleted } = useTutorialSteps()

  if (item.children) {
    const active = urlPathname.startsWith(urlPrefix + item.route)

    // Count completed child tutorials
    const completedChildren = item.children.filter((child) =>
      isTutorialCompleted(urlPrefix + item.route + child.route)
    ).length

    const hasCompletedChildren = completedChildren > 0
    const allChildrenCompleted = completedChildren === item.children.length

    return (
      <li className="px-2 py-1 bg-white/2.5 border border-white/5">
        <details open={active}>
          <summary className="text-light cursor-pointer flex items-center justify-between">
            <span className="flex items-center gap-2">
              {item.title}
              {allChildrenCompleted && (
                <span className="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                  ✓ Complete
                </span>
              )}
            </span>
            {hasCompletedChildren && (
              <span className="text-xs text-gray-400">
                {completedChildren}/{item.children.length}
              </span>
            )}
          </summary>
          <ul className="pl-4">
            {item.children.map((section) => (
              <TutorialNavItem
                key={section.title}
                item={section}
                urlPrefix={urlPrefix + item.route}
              />
            ))}
          </ul>
        </details>
      </li>
    )
  }

  const isActive = urlPathname === urlPrefix + item.route
  const isCompleted = isTutorialCompleted(urlPrefix + item.route)

  return (
    <li>
      <a
        className={cls(
          "text-light flex items-center justify-between gap-2 py-1",
          isActive && "font-bold"
        )}
        href={urlPrefix + item.route}
        onclick={() => isActive && (navExpanded.value = false)}
      >
        <span className="flex items-center gap-2">
          {item.title}
          {isCompleted && (
            <span className="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded-full">
              ✓
            </span>
          )}
        </span>
      </a>
    </li>
  )
}
