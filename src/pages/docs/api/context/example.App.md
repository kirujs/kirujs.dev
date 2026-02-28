```jsx
import { ThemeContext } from "./ThemeContext"
import { Button } from "./Button"

function App() {
  const theme = signal("light")
  const toggle = () => {
    theme.value = theme.value === "light" ? "dark" : "light"
  }

  return () => (
    <ThemeContext
      value={{
        theme,
        toggle,
      }}
    >
      {children}
    </ThemeContext>
  )
}
```
