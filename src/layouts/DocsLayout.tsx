import { Container } from "$/components/atoms/Container"
import { SidebarContent } from "$/components/SidebarContent"
import { usePageContext } from "$/context/pageContext"
import { docMeta } from "$/docs-meta"
import { useHashChangeDispatcher } from "$/hooks/useHashChangeDispatcher"
import { useEffect, useMemo, useRef, useState } from "kaioken"

export function DocsLayout({ children }: { children: JSX.Children }) {
  const { urlPathname } = usePageContext()
  const sectionIds = useMemo(() => {
    const pageData = docMeta.find(({ href }) => href === urlPathname)
    if (!pageData) return []
    return pageData.sections?.map(({ id }) => id) ?? []
  }, [urlPathname])
  useHashChangeDispatcher(sectionIds)

  return (
    <Container className="flex gap-8 mt-[var(--navbar-height)] min-h-[calc(100dvh+var(--navbar-height-negative))]">
      <aside className="hidden sm:block min-w-[200px] max-h-[calc(100vh-2.5rem-60px)] sticky top-[80px] p-1 overflow-y-auto">
        <div>
          <SidebarContent />
          <ActiveLinkTrackerSlidingThing />
        </div>
      </aside>
      <article className="prose prose-invert grow py-5 w-full max-w-none sm:max-w-[calc(100%-200px-2rem)]">
        {children}
      </article>
    </Container>
  )
}

function ActiveLinkTrackerSlidingThing() {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const setPos = () => {
    if (!ref.current) return
    const parent = document.querySelector("aside")!
    const parentRect = parent.getBoundingClientRect()
    const el = parent.querySelector(
      'a[href="' + window.location.pathname + window.location.hash + '"]'
    )
    if (!el) return
    const domRect = el.getBoundingClientRect()

    ref.current.style.top =
      domRect.top - parentRect.top + parent.scrollTop + 4 + "px"
  }
  useEffect(() => {
    setPos()
    window.addEventListener("resize", setPos)
    window.addEventListener("hashchange", setPos)
    return () => {
      window.removeEventListener("resize", setPos)
      window.removeEventListener("hashchange", setPos)
    }
  }, [globalThis.window?.location.pathname, globalThis.window?.location.hash])

  useEffect(() => {
    setMounted(true)
  }, [])

  const className = `bg-neutral-50 ${mounted ? "opacity-100" : "opacity-0"} w-[2px] h-4 block absolute left-0 top-0 ${mounted ? "transition-all" : ""}`
  return <div ref={ref} className={className}></div>
}
