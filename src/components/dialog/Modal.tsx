import { type TransitionState, ref, onMount } from "kiru"
import { Backdrop } from "./Backdrop"
import { trapFocus } from "$/utils"

type ModalProps = {
  state: TransitionState
  close: () => void
  className?: string
  sender?: Event | null
  children: JSX.Children
}

export const Modal: Kiru.FC<ModalProps> = () => {
  const wrapperRef = ref<HTMLDivElement>(null)

  return ({ state, close, sender, className = "", children }) => {
    const opacity = state === "entered" ? "1" : "0"
    const scale = state === "entered" ? 1 : 0.85
    const translateY = state === "entered" ? -50 : -65

    onMount(() => {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      const outerEl = wrapperRef.current
      if (state === "exited" || !outerEl) return
      if (e.key === "Escape") {
        e.preventDefault()
        return handleClose()
      }
      trapFocus(outerEl, e)
    }

    const handleClose = () => {
      if (sender && sender.target && sender.target instanceof HTMLElement)
        sender.target.focus()
      close()
    }

    return (
      <Backdrop
        ref={wrapperRef}
        onclick={(e) => e.target === wrapperRef.current && handleClose()}
        style={{ opacity }}
      >
        <div
          className={`modal-content p-4 ${className}`}
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
