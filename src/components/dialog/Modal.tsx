import { type TransitionState, ref, onMount, Signalable, unwrap } from "kiru"
import { className as cls } from "kiru/utils"
import { Backdrop } from "./Backdrop"
import { trapFocus } from "$/utils"

type ModalProps = {
  state: TransitionState
  close: () => void
  className?: Signalable<string | undefined>
  children: JSX.Children
}

export const Modal: Kiru.FC<ModalProps> = ({ close }) => {
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

  return ({ state, close, className = "", children }) => {
    if (state === "exited") return null

    const opacity = state === "entered" ? "1" : "0"
    const scale = state === "entered" ? 1 : 0.85
    const translateY = state === "entered" ? -50 : -65

    return (
      <Backdrop
        ref={wrapperRef}
        onclick={(e) => e.target === wrapperRef.current && close()}
        style={{ opacity }}
      >
        <div
          className={cls("modal-content p-4", unwrap(className))}
          style={{
            transform: `translate(-50%, ${translateY}%) scale(${scale})`,
          }}
        >
          {children}
        </div>
      </Backdrop>
    )
  }
}
