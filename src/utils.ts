import { useEffect, useEffectEvent, useRef } from "kaioken"

export function isLinkActive(href: string, urlPath: string) {
  return (
    href.split("#")[0] === urlPath ||
    urlPath.startsWith(href + "/") ||
    urlPath.startsWith(href + "#")
  )
}

export function isClickEventFromKeyboard(e: Event) {
  return e && "detail" in e && e.detail === 0
}

export function trapFocus(element: Element, e: KeyboardEvent) {
  if (e.key === "Tab") {
    const focusableModalElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableModalElements[0]
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1]
    if (
      document.activeElement &&
      !element.contains(document.activeElement) &&
      firstElement &&
      firstElement instanceof HTMLElement
    ) {
      return firstElement.focus()
    }
    if (e.shiftKey) {
      if (
        document.activeElement === firstElement &&
        lastElement instanceof HTMLElement
      ) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (
        document.activeElement === lastElement &&
        firstElement instanceof HTMLElement
      ) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }
}

export function useDebounceThrottle(fn: () => void, delay: number) {
  const timeoutRef = useRef<number>(-1)
  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current)
  }, [])
  return useEffectEvent(() => {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(fn, delay)
  })
}
