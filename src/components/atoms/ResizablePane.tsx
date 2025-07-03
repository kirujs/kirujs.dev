import {
  useRef,
  useSignal,
  useComputed,
  type ElementProps,
  StyleObject,
  useCallback,
  useMemo,
} from "kaioken"
import { className as cls } from "kaioken/utils"
import "./ResizablePane.css"

interface ResizablePaneProps extends ElementProps<"div"> {
  /** The first pane element */
  firstPane: JSX.Element
  /** The second pane element */
  secondPane: JSX.Element
  /** Direction of the split */
  direction?: "horizontal" | "vertical"
  /** Initial size percentage for the first pane (0-100) */
  initialFirstSize?: number
  /** Minimum size percentage for the first pane (0-100) */
  minFirstSize?: number
  /** Maximum size percentage for the first pane (0-100) */
  maxFirstSize?: number
  /** Width/height of the resize handle in pixels */
  handleSize?: number
  /** Callback when the pane is resized */
  onResize?: (firstSize: number) => void
}

export function ResizablePane({
  firstPane,
  secondPane,
  direction = "horizontal",
  initialFirstSize = 50,
  minFirstSize = 10,
  maxFirstSize = 90,
  handleSize = 4,
  onResize,
  className = "",
  ...props
}: ResizablePaneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const firstSize = useSignal(initialFirstSize)
  const isResizing = useSignal(false)

  const isHorizontal = direction === "horizontal"
  const flexDirection = isHorizontal ? "flex-row" : "flex-col"
  const cursorResize = isHorizontal ? "col-resize" : "row-resize"
  const handleClass = isHorizontal ? "cursor-col-resize" : "cursor-row-resize"

  // Use useComputed for fine-grained reactivity on styles
  const firstPaneStyle = useComputed<StyleObject>(() => ({
    [isHorizontal ? "width" : "height"]: `${firstSize.value}%`,
  }))
  const secondPaneStyle = useComputed<StyleObject>(() => ({
    [isHorizontal ? "width" : "height"]: `${100 - firstSize.value}%`,
  }))

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      isResizing.value = true

      const handleMouseMove = (e: MouseEvent) => {
        const containerRect = containerRef.current!.getBoundingClientRect()
        const newFirstSize = isHorizontal
          ? ((e.clientX - containerRect.left) / containerRect.width) * 100
          : ((e.clientY - containerRect.top) / containerRect.height) * 100

        // Clamp the size to the min/max bounds
        const clampedSize = Math.max(
          minFirstSize,
          Math.min(maxFirstSize, newFirstSize)
        )

        firstSize.value = clampedSize
        onResize?.(clampedSize)
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
      document.body.style.cursor = cursorResize
      document.body.style.userSelect = "none"
    },
    [isHorizontal, minFirstSize, maxFirstSize, onResize]
  )

  const handleStyleObject = useMemo<StyleObject>(
    () =>
      isHorizontal
        ? { width: `${handleSize}px`, minWidth: `${handleSize + 4}px` }
        : { height: `${handleSize}px`, minHeight: `${handleSize + 4}px` },
    [isHorizontal, handleSize]
  )

  return (
    <div
      ref={containerRef}
      className={`flex ${flexDirection} ${className}`}
      {...props}
    >
      {/* First Pane */}
      <div className="overflow-hidden" style={firstPaneStyle}>
        {firstPane}
      </div>

      {/* Resize Handle */}
      <div
        className={`${handleClass}  flex items-center justify-center group relative`}
        style={handleStyleObject}
        onmousedown={handleMouseDown}
      >
        <div
          className={`bg-neutral-700 hover:bg-neutral-600 transition-all duration-200 ${
            isHorizontal
              ? "h-full w-[6px] group-hover:w-full"
              : "w-full h-[6px] group-hover:h-full"
          }`}
        >
          <div
            className={cls(
              "bg-neutral-400 group-hover:bg-neutral-300 transition-colors duration-200",
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              isHorizontal ? "w-[1px] h-8" : "h-[1px] w-8"
            )}
          />
        </div>
      </div>

      {/* Second Pane */}
      <div className="overflow-hidden flex-1" style={secondPaneStyle}>
        {secondPane}
      </div>
    </div>
  )
}

// Export backward compatibility props
export interface ResizablePaneProps_Legacy extends ElementProps<"div"> {
  leftPane: JSX.Element
  rightPane: JSX.Element
  initialLeftWidth?: number
  minLeftWidth?: number
  maxLeftWidth?: number
  handleWidth?: number
  onResize?: (leftWidth: number) => void
}

// Legacy component for backward compatibility
export function ResizablePaneHorizontal(props: ResizablePaneProps_Legacy) {
  return (
    <ResizablePane
      firstPane={props.leftPane}
      secondPane={props.rightPane}
      direction="horizontal"
      initialFirstSize={props.initialLeftWidth}
      minFirstSize={props.minLeftWidth}
      maxFirstSize={props.maxLeftWidth}
      handleSize={props.handleWidth}
      onResize={props.onResize}
      className={props.className}
      {...(props as any)}
    />
  )
}
