import { CustomEvents } from "$/custom-events"
import { onMount, ref } from "kiru"

type DocsSectionProps = {
  children: JSX.Children
  id: string
  title: string
}

export const DocsSection: Kiru.FC<DocsSectionProps> = ({
  id,
}: DocsSectionProps) => {
  const sectionRef = ref<HTMLDivElement>(null)
  const timeoutRef = ref(-1)
  const idRef = ref(id)

  onMount(() => {
    const handleHashChange = (e?: Event) => {
      if (e instanceof CustomEvents.ScrollHashChangeEvent) return
      if (!sectionRef.current) return
      if (window.location.hash === `#${idRef.current}`) {
        sectionRef.current.classList.add("highlight")
        if (timeoutRef.current !== -1) {
          window.clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = window.setTimeout(
          () => sectionRef.current?.classList.remove("highlight"),
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
  })

  return ({ children, title, id }) => {
    idRef.current = id
    return (
      <div className="docs-section" id={id} ref={sectionRef}>
        <div className="docs-section-header mb-5">
          <a href={`#${id}`} className="text-light">
            <p>{title}</p>
          </a>
        </div>
        {children}
      </div>
    )
  }
}
