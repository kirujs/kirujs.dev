import { signal } from "kiru"
import { ThemeContext } from "./theme-context"
import { Button } from "./button"

export function App() {
  const theme = signal<"light" | "dark">("light")
  const toggle = () => {
    theme.value = theme.value === "light" ? "dark" : "light"
  }
  const themeState = { theme, toggle }

  theme.subscribe((value) => console.log("Theme changed to", value))

  return () => (
    <ThemeContext value={themeState}>
      <Button />
    </ThemeContext>
  )
}
