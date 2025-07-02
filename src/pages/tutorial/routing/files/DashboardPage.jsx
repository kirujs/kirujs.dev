import { useState } from "kaioken"

export function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  if (!isLoggedIn) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>🔐 Login Required</h1>
        <p>Please log in to access the dashboard.</p>
        <button 
          onclick={() => setIsLoggedIn(true)}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Log In
        </button>
      </div>
    )
  }
  
  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Dashboard</h1>
      <p>Welcome to your private dashboard!</p>
      <button 
        onclick={() => setIsLoggedIn(false)}
        style={{ padding: "8px 16px", marginTop: "10px" }}
      >
        Log Out
      </button>
    </div>
  )
} 