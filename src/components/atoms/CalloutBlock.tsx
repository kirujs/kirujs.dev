import { className as cls } from "kiru/utils"
interface CalloutBlockVariantProps {
  fontSize?: FontSize
  prose?: boolean
  className?: string
  children: JSX.Children
}

function DefaultCalloutBlock({
  fontSize = "small",
  prose,
  children,
  className,
}: CalloutBlockVariantProps) {
  return (
    <div
      className={cls(
        fontSize === "small" && "text-sm",
        prose ? "prose prose-invert" : "not-prose",
        `callout-block px-2 py-2 bg-dark/50 backdrop-blur-md text-neutral-200 rounded-sm border-l-4 border-l-[#b42641]`,
        className
      )}
    >
      {children}
    </div>
  )
}

function InfoCalloutBlock({
  fontSize = "small",
  prose,
  children,
  className,
}: CalloutBlockVariantProps) {
  return (
    <div
      className={cls(
        fontSize === "small" && "text-sm",
        prose ? "prose prose-invert" : "not-prose",
        `callout-block px-2 py-2 bg-white/7.5 backdrop-blur-md text-neutral-200 rounded-sm`,
        className
      )}
    >
      {children}
    </div>
  )
}

function WarningCalloutBlock({
  fontSize = "small",
  prose,
  children,
  className,
}: CalloutBlockVariantProps) {
  return (
    <div
      className={cls(
        fontSize === "small" && "text-sm",
        prose ? "prose prose-invert" : "not-prose",
        `callout-block px-2 py-2 border-2 border-dashed border-amber-400/10 bg-amber-400/8 backdrop-blur-md text-neutral-200 rounded-sm`,
        className
      )}
    >
      {children}
    </div>
  )
}

type FontSize = "small" | "normal"
interface CalloutBlockProps extends CalloutBlockVariantProps {
  variant?: "default" | "info" | "warning"
}

export function CalloutBlock({ variant, ...props }: CalloutBlockProps) {
  switch (variant) {
    case "info":
      return <InfoCalloutBlock {...props} />
    case "warning":
      return <WarningCalloutBlock {...props} />
    default:
      return <DefaultCalloutBlock {...props} />
  }
}
