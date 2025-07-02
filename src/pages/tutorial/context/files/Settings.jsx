import { useTheme } from "./Theme"

export function Settings() {
  const { styles, primaryColor, toggleTheme, isDark, setPrimaryColor } = useTheme()
  
  return (
    <div style={styles.container}>
      <h3>⚙️ Theme Settings</h3>
      
      <div style={{ marginBottom: "15px" }}>
        <button
          onclick={toggleTheme}
          style={styles.button}
        >
          Switch to {isDark ? "Light" : "Dark"} Mode
        </button>
      </div>
      
      <div>
        <label>Primary Color:</label>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <input
            type="color"
            value={primaryColor}
            oninput={(e) => setPrimaryColor(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
} 