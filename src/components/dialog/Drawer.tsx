import { ref, onMount, type TransitionState } from "kiru"
import { Backdrop } from "./Backdrop"
import { trapFocus } from "$/utils"

type DrawerProps = {
  state: TransitionState
  close: () => void
  side: "bottom" | "left" | "right"
  children: JSX.Children
}

export const Drawer: Kiru.FC<DrawerProps> = ({ close }) => {
  const wrapperRef = ref<HTMLDivElement>(null)

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        return close()
      }
      trapFocus(wrapperRef.current!, e)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  })

  return ({ state, close, side, children }) => {
    if (state == "exited") return null

    const opacity = state === "entered" ? "1" : "0"
    const translateX =
      side === "right"
        ? state === "entered"
          ? 0
          : 100
        : side === "left"
          ? state === "entered"
            ? 0
            : -100
          : 0
    const translateY = side === "bottom" ? (state === "entered" ? 0 : 100) : 0

    return (
      <Backdrop
        ref={wrapperRef}
        onclick={(e) => e.target === wrapperRef.current && close()}
        style={{ opacity }}
      >
        <div
          className="drawer-content"
          data-side={side}
          style={{ transform: `translate(${translateX}%, ${translateY}%)` }}
        >
          {children}
        </div>
      </Backdrop>
    )
  }
}
