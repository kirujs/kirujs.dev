import { computed } from "kiru"
import { useTheme } from "./theme-context"

export function Button() {
  const { theme, toggle } = useTheme()
  const backgroundColor = computed(() =>
    theme.value === "light" ? "black" : "white"
  )
  const color = computed(() => (theme.value === "light" ? "white" : "black"))
  return () => (
    <button onclick={toggle} style={{ backgroundColor, color }}>
      Toggle theme
    </button>
  )
}
