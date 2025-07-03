import {
  useRef,
  useSignal,
  useComputed,
  type ElementProps,
  StyleObject,
  useCallback,
} from "kaioken"
import "./ResizablePane.css"

interface ResizablePaneProps extends ElementProps<"div"> {
  leftPane: JSX.Element
  rightPane: JSX.Element
  /** Initial width percentage for the left pane (0-100) */
  initialLeftWidth?: number
  /** Minimum width percentage for the left pane (0-100) */
  minLeftWidth?: number
  /** Maximum width percentage for the left pane (0-100) */
  maxLeftWidth?: number
  /** Width of the resize handle in pixels */
  handleWidth?: number
  /** Callback when the pane is resized */
  onResize?: (leftWidth: number) => void
}

export function ResizablePane({
  leftPane,
  rightPane,
  initialLeftWidth = 50,
  minLeftWidth = 10,
  maxLeftWidth = 90,
  handleWidth = 4,
  onResize,
  className = "",
  ...props
}: ResizablePaneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftWidth = useSignal(initialLeftWidth)
  const isResizing = useSignal(false)

  // Use useComputed for fine-grained reactivity on styles
  const leftPaneStyle = useComputed<StyleObject>(() => ({
    width: `${leftWidth.value}%`,
  }))
  const rightPaneStyle = useComputed<StyleObject>(() => ({
    width: `${100 - leftWidth.value}%`,
  }))

  const handleMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault()
    isResizing.value = true

    const handleMouseMove = (e: MouseEvent) => {
      const containerRect = containerRef.current!.getBoundingClientRect()
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100

      // Clamp the width to the min/max bounds
      const clampedWidth = Math.max(
        minLeftWidth,
        Math.min(maxLeftWidth, newLeftWidth)
      )

      leftWidth.value = clampedWidth
      onResize?.(clampedWidth)
    }

    const handleMouseUp = () => {
      isResizing.value = false
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
      document.body.classList.remove("resizable-resizing")
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.body.classList.add("resizable-resizing")
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"
  }, [])

  return (
    <div ref={containerRef} className={`flex ${className}`} {...props}>
      {/* Left Pane */}
      <div className="overflow-hidden" style={leftPaneStyle}>
        {leftPane}
      </div>

      {/* Resize Handle */}
      <div
        className="bg-neutral-700 hover:bg-neutral-600 cursor-col-resize transition-colors duration-200 flex items-center justify-center group"
        style={{ width: `${handleWidth}px` }}
        onmousedown={handleMouseDown}
      >
        <div className="w-px h-8 bg-neutral-400 group-hover:bg-neutral-300 transition-colors duration-200"></div>
      </div>

      {/* Right Pane */}
      <div className="overflow-hidden flex-1" style={rightPaneStyle}>
        {rightPane}
      </div>
    </div>
  )
}
