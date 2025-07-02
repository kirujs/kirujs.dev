import { ThemeProvider } from "./Theme"
import { Page } from "./Page"

export function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  )
} 