import { useState } from "kaioken"

export function App() {
  const [theme, setTheme] = useState("light")

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#333" : "#fff",
        padding: "20px",
      }}
    >
      <h1>Theme Example</h1>
      <button onclick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Switch to {theme === "light" ? "dark" : "light"} theme
      </button>
      <p>Current theme: {theme}</p>
    </div>
  )
}
