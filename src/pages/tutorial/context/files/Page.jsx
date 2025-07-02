import { useTheme } from "./Theme"
import { Header } from "./Header"
import { Settings } from "./Settings"

export function Page() {
  const { theme } = useTheme()
  
  return (
    <div style={{
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: "Arial, sans-serif"
    }}>
      <Header />
      <Settings />
    </div>
  )
} 