import { ElementProps } from "kaioken"

export function DemoComponentWrapper({
  children,
  className,
}: ElementProps<"div">) {
  const classIncludesPadding = (className?.indexOf("p-") ?? -1) > -1
  return (
    <div
      className={`${classIncludesPadding ? "" : "p-4"} bg-[#1c1a1a] shadow-[#0005] shadow-lg grow rounded-lg ${className || ""}`}
    >
      {children}
    </div>
  )
}
