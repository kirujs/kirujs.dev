```tsx
import { signal } from "kiru"
import { ThemeContext } from "./themeContext"

export function ThemeContextProvider({ children }: { children: JSX.Children }) {
  const theme = signal("light")

  return (
    <ThemeContext.Provider
      value={{
        value: theme,
        toggle: () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
```
