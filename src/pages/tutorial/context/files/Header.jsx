import { useTheme } from "./Theme"

export function Header() {
  const { theme, toggleTheme, styles } = useTheme()
  
  return (
    <header style={{ marginBottom: "30px", textAlign: "center" }}>
      <h1>Theme Context Demo</h1>
      <p>Current theme: <strong>{theme}</strong></p>
      <button style={styles.button} onclick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
    </header>
  )
} 