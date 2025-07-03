import { ElementProps, unwrap } from "kaioken"
import { className as cls } from "kaioken/utils"

type ClassnameAttr = ElementProps<"div">["className"]

function classNameIncludes(className: ClassnameAttr, value: string): boolean {
  const v = unwrap(className)
  if (typeof v === "string") {
    return (v.indexOf("p-") ?? -1) > -1
  }
  return false
}

export function DemoComponentWrapper({
  children,
  className,
}: ElementProps<"div">) {
  const classIncludesPadding = classNameIncludes(className, "p-")
  return (
    <div
      className={cls(
        classIncludesPadding ? "" : "p-4",
        "bg-[#1c1a1a] shadow-[#0005] shadow-lg grow rounded-lg",
        unwrap(className)
      )}
    >
      {children}
    </div>
  )
}
