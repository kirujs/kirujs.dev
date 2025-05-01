import { customEvents } from "$/custom-events"
import { useEffect, useRef } from "kaioken"

export function HighlightOnLoad({
  children,
  id,
}: {
  children: JSX.Children
  id: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef(-1)
  useEffect(() => {
    const handleHashChange = (e?: Event) => {
      if (e instanceof customEvents.scrollHashChangeEvent) return
      if (!ref.current) return
      if (window.location.hash === `#${id}`) {
        ref.current.classList.add("highlight")
        if (timeoutRef.current !== -1) {
          window.clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = window.setTimeout(
          () => ref.current?.classList.remove("highlight"),
          1000
        )
      }
    }
    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    window.addEventListener("popstate", handleHashChange)
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      window.removeEventListener("popstate", handleHashChange)
    }
  }, [])
  return (
    <div className="docs-section" id={id} ref={ref}>
      {children}
    </div>
  )
}
