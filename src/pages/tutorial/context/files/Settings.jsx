import { useTheme } from "./Theme"

export function Settings() {
  const { primaryColor, setPrimaryColor, styles } = useTheme()
  
  const colors = ["#007bff", "#28a745", "#dc3545", "#ffc107", "#6f42c1", "#fd7e14"]
  
  return (
    <div style={{ 
      padding: "20px", 
      border: "2px solid " + primaryColor, 
      borderRadius: "10px" 
    }}>
      <h2>🎨 Color Settings</h2>
      <p>Choose your primary color:</p>
      
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {colors.map(color => (
          <button
            key={color}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: color,
              border: primaryColor === color ? "3px solid #fff" : "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: primaryColor === color ? "0 0 10px rgba(0,0,0,0.3)" : "none"
            }}
            onclick={() => setPrimaryColor(color)}
            title={color}
          >
            {primaryColor === color && "✓"}
          </button>
        ))}
      </div>
      
      <div style={{ marginTop: "20px" }}>
        <p>Selected color: <span style={{ color: primaryColor, fontWeight: "bold" }}>{primaryColor}</span></p>
      </div>
    </div>
  )
} 