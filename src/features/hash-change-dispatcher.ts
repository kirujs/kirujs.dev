import { signal } from "kiru"
import type { FileRouterContextType } from "kiru/router"
import { CustomEvents } from "$/custom-events"
import { navEvent } from "$/state"

let timeout: number | undefined
function dispatchHashChange(newHash: string, router: FileRouterContextType) {
  clearTimeout(timeout)
  timeout = window.setTimeout(() => {
    const hash = newHash ? `#${newHash}` : ""
    router.setHash(hash, { replace: true })
    window.dispatchEvent(new CustomEvents.ScrollHashChangeEvent())
  }, 50)
}

function findSectionCompletelyInViewport(sectionIds: string[]) {
  for (const sectionId of sectionIds) {
    const el = document.getElementById(sectionId)
    if (!el) continue
    const rect = el.getBoundingClientRect()
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      return sectionId
    }
  }
  return ""
}

function findMostVisibleSection(sectionIds: string[]) {
  const state: Array<{ id: string; percent: number }> = []

  for (const sectionId of sectionIds) {
    const el = document.getElementById(sectionId)
    if (!el) continue

    const rect = el.getBoundingClientRect()
    const visibleTop = Math.max(rect.top, 0)
    const visibleBottom = Math.min(rect.bottom, window.innerHeight)
    const visibleHeight = visibleBottom - visibleTop
    const totalHeight = rect.height
    const percent = visibleHeight > 0 ? visibleHeight / totalHeight : 0
    state.push({ id: sectionId, percent })
  }

  const sorted = state.sort((a, b) => b.percent - a.percent)
  return sorted[0]?.id ?? ""
}

export function createHashChangeDispatcher(
  getSectionIds: () => string[],
  router: FileRouterContextType
) {
  const currentSection = signal("")

  const handleScroll = (e?: Event) => {
    if (!e || (e.type === "scroll" && navEvent.peek())) return
    const sectionIds = getSectionIds()
    let sectionId = ""
    if (window.scrollY > 50) {
      if (
        window.scrollY + window.innerHeight >=
        document.body.offsetHeight - 10
      ) {
        sectionId = sectionIds[sectionIds.length - 1] ?? ""
      } else {
        sectionId =
          findSectionCompletelyInViewport(sectionIds) ||
          findMostVisibleSection(sectionIds)
      }
    }
    currentSection.value = sectionId
    dispatchHashChange(sectionId, router)
  }

  const init = () => {
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }

  return { init }
}
