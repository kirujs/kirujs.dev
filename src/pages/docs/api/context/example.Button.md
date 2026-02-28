```tsx
import { useContext } from "kiru"
import { ThemeContext } from "./themeContext"

export function Button() {
  const { theme, toggle } = useContext(ThemeContext)
  const backgroundColor = theme.value === "light" ? "black" : "white"

  return (
    <button onclick={toggle} style={{ backgroundColor }}>
      Toggle theme
    </button>
  )
}
```
