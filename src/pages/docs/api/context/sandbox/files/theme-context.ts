import { createContext, useContext } from "kiru"

interface ThemeContextValue {
  theme: Kiru.Signal<"light" | "dark">
  toggle: () => void
}
export const ThemeContext = createContext<ThemeContextValue>(null!)

export const useTheme = () => useContext(ThemeContext)
