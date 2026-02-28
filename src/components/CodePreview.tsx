import { CodePreviewData } from "$/types"
import { isLinkActive } from "$/utils"
import { Portal, Transition, ref, signal } from "kiru"
import { Link, useFileRouter } from "kiru/router"

function clearTimeoutRef(timeoutRef: Kiru.RefObject<number>) {
  if (timeoutRef.current !== -1) {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = -1
  }
}

export function CodePreview({
  data,
  text,
}: {
  data: CodePreviewData
  text?: string
}) {
  const router = useFileRouter()
  const linkRef = ref<any>(null)
  const linkBounds = ref<DOMRect | null>(null)
  const open = signal(false)
  const previewHovered = ref(false)
  const hideTimeout = ref(-1)

  const handleOpen = () => {
    clearTimeoutRef(hideTimeout)
    linkBounds.current = linkRef.current?.getBoundingClientRect() || null
    open.value = true
  }

  const handleClose = () => {
    if (previewHovered.current) return
    clearTimeoutRef(hideTimeout)
    hideTimeout.current = window.setTimeout(() => (open.value = false), 250)
  }

  return () => (
    <>
      {isLinkActive(data.link.href, router.state.pathname.value) ? (
        <button
          className="preview-button"
          ariaLabel="Show code preview"
          ref={linkRef}
          onfocus={handleOpen}
          onblur={handleClose}
          onpointerenter={handleOpen}
          onpointerleave={handleClose}
        >
          {text ?? data.link.text}
        </button>
      ) : (
        <Link
          to={data.link.href}
          ref={linkRef}
          onfocus={handleOpen}
          onblur={handleClose}
          onpointerenter={handleOpen}
          onpointerleave={handleClose}
        >
          {text ?? data.link.text}
        </Link>
      )}

      <Portal container={() => document.getElementById("portal-root")!}>
        <Transition
          in={open}
          element={(state) => {
            if (state === "exited") return null
            if (!linkBounds.current) return null
            const x = linkBounds.current.x
            const y = linkBounds.current.y + window.scrollY
            const width = linkBounds.current.width
            const height = linkBounds.current.height
            const opacity = state === "entered" ? "1" : "0"

            const linkCenterX = x + width / 2
            let previewOffsetX = Math.min(
              linkCenterX - 200,
              window.innerWidth - 420
            )
            if (previewOffsetX < 10) previewOffsetX = 10

            return (
              <div className="transition-opacity" style={{ opacity }}>
                <div
                  onpointerenter={() => (
                    clearTimeoutRef(hideTimeout),
                    (previewHovered.current = true)
                  )}
                  onpointerleave={() => {
                    previewHovered.current = false
                    handleClose()
                  }}
                  style={{
                    transform: `translate(${previewOffsetX}px, calc(${y + height}px + .5rem))`,
                  }}
                  className="preview-content"
                >
                  <div className="not-prose">
                    <data.element />
                  </div>
                </div>
              </div>
            )
          }}
        />
      </Portal>
    </>
  )
}
