import { effect, nextIdle, onMount, ref, signal, ViewTransitions } from "kiru"
import { className as cls } from "kiru/utils"
import { Container } from "$/components/atoms/Container"
import { SidebarContent } from "$/components/SidebarContent"
import { useFileRouter } from "kiru/router"

export default function DocsLayout({ children }: { children: JSX.Children }) {
  return (
    <Container className="flex gap-8 pt-(--navbar-height) min-h-screen">
      <aside className="hidden sm:block min-w-50 max-h-[calc(100vh-2.5rem-60px)] sticky top-20 p-1 overflow-y-auto">
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
  const router = useFileRouter()
  const thingRef = ref<HTMLDivElement>(null)
  const currentEl = ref<Element | null>(null)
  const mounted = signal(false)
  console.log("ActiveLinkTrackerSlidingThing")

  onMount(() => {
    mounted.value = true
    const setPos = () => {
      if (!thingRef.current) return
      const parent = document.querySelector("aside")!
      const parentRect = parent.getBoundingClientRect()
      const el = parent.querySelector(
        'a[href="' + window.location.pathname + window.location.hash + '"]'
      )
      if (!el || el === currentEl.current) return
      currentEl.current = el
      const tgtRect = el.getBoundingClientRect()
      // adding 1px to account for box sizing !== line height
      thingRef.current.style.top =
        tgtRect.top - parentRect.top + parent.scrollTop + 1 + "px"
      thingRef.current.style.height = tgtRect.height + "px"
    }
    setPos()

    effect([router.state.pathname, router.state.hash], () =>
      nextIdle(() => setPos())
    )

    window.addEventListener("resize", setPos)
    window.addEventListener("hashchange", setPos)
    return () => {
      window.removeEventListener("resize", setPos)
      window.removeEventListener("hashchange", setPos)
    }
  })

  return () => (
    <div
      ref={thingRef}
      className={cls(
        "bg-neutral-50 w-[2px] h-4 block absolute left-0 top-0",
        mounted.value ? "opacity-100 transition-all" : "opacity-0"
      )}
    />
  )
}
