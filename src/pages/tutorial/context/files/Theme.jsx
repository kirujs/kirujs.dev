import { createContext, useContext, useState } from "kaioken"

// Create a Theme Context
const ThemeContext = createContext()

// Theme Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")
  const [primaryColor, setPrimaryColor] = useState("#007bff")
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }
  
  const styles = {
    container: {
      padding: "20px",
      backgroundColor: theme === "light" ? "#ffffff" : "#333333",
      color: theme === "light" ? "#333333" : "#ffffff",
      minHeight: "100vh",
      fontFamily: "sans-serif"
    },
    button: {
      padding: "10px 20px",
      backgroundColor: primaryColor,
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      margin: "5px"
    }
  }
  
  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      primaryColor,
      setPrimaryColor,
      styles
    }}>
      <div style={styles.container}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
} 