import { useTheme } from "./Theme"
import { Header } from "./Header"
import { Settings } from "./Settings"

export function Page() {
  const { theme } = useTheme()
  
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: "Arial, sans-serif"
    }}>
      <Header />
      <div style={{ padding: "20px" }}>
        <Settings />
        
        <div style={{
          padding: "20px",
          backgroundColor: theme.cardBg,
          borderRadius: "8px",
          marginTop: "20px"
        }}>
          <h2 style={{ color: theme.primary }}>🎨 Context Demo</h2>
          <p>This demonstrates how Context allows components to share theme data globally.</p>
        </div>
      </div>
    </div>
  )
} 