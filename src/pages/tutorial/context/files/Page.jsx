import { useTheme } from "./Theme"
import { Header } from "./Header"
import { Settings } from "./Settings"

export function Page() {
  const { styles } = useTheme()
  
  return (
    <div>
      <Header />
      <Settings />
      
      <div style={{ 
        marginTop: "30px", 
        padding: "20px", 
        backgroundColor: styles.container.backgroundColor === "#ffffff" ? "#f8f9fa" : "#444444",
        borderRadius: "8px"
      }}>
        <h3>💡 How Context Works</h3>
        <ul>
          <li>ThemeProvider wraps the entire app</li>
          <li>Any component can access theme data using useTheme()</li>
          <li>State changes propagate to all consuming components</li>
          <li>No prop drilling required!</li>
        </ul>
      </div>
    </div>
  )
} 