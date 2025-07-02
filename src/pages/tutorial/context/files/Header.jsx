import { useTheme } from "./Theme"

export function Header() {
  const { theme, isDark } = useTheme()
  
  return (
    <header style={{
      backgroundColor: theme.headerBg,
      color: theme.text,
      borderBottom: `1px solid ${theme.border}`
    }}>
      <h1>{isDark ? "🌙" : "☀️"} Theme Demo</h1>
    </header>
  )
} 