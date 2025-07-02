import { useState } from "kaioken"
import { useTheme } from "./Theme"

export function Settings() {
  const { theme, toggleTheme, setCustomColor, isDark } = useTheme()
  const [colorInput, setColorInput] = useState(theme.primary)
  
  return (
    <div style={{
      padding: "20px",
      backgroundColor: theme.cardBg,
      borderRadius: "8px",
      border: `1px solid ${theme.border}`
    }}>
      <h3>⚙️ Theme Settings</h3>
      
      <div style={{ marginBottom: "15px" }}>
        <button
          onclick={toggleTheme}
          style={{
            padding: "10px 20px",
            backgroundColor: theme.primary,
            color: theme.bg,
            border: "none",
            borderRadius: "4px"
          }}
        >
          Switch to {isDark ? "Light" : "Dark"} Mode
        </button>
      </div>
      
      <div>
        <label>Primary Color:</label>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <input
            type="color"
            value={colorInput}
            oninput={(e) => setColorInput(e.target.value)}
          />
          <button
            onclick={() => setCustomColor(colorInput)}
            style={{ padding: "8px 16px" }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
} 