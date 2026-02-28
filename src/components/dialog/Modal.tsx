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
    if (state === "exited") return null

    const opacity = state === "entered" ? "1" : "0"
    const scale = state === "entered" ? 1 : 0.85
    const translateY = state === "entered" ? -50 : -65

    onMount(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          return handleClose()
        }
        trapFocus(wrapperRef.current!, e)
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    })

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
