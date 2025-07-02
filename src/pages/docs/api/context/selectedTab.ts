import { signal } from "kaioken"

export const selectedTab = signal<
  "App" | "ThemeContext" | "ThemeContextProvider" | "Button"
>("App")
