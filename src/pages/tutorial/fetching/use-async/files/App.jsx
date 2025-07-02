import { useState } from "kaioken"
import { UserProfile } from "./UserProfile"

export function App() {
  const [selectedUserId, setSelectedUserId] = useState("1")
  const [customUserId, setCustomUserId] = useState("")
  
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId)
    setCustomUserId("")
  }
  
  const handleCustomUser = () => {
    if (customUserId.trim()) {
      setSelectedUserId(customUserId.trim())
    }
  }
  
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "20px" }}>
      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      {/* User Selector */}
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ margin: "0 0 20px 0" }}>👤 User Profile Viewer</h1>
        <p style={{ margin: "0 0 20px 0", color: "#666" }}>
          Select a user to view their profile, or try "404" to see error handling
        </p>
        
        <div style={{ 
          display: "flex", 
          gap: "10px", 
          justifyContent: "center", 
          flexWrap: "wrap",
          marginBottom: "20px"
        }}>
          {["1", "2", "3", "42", "99", "404"].map(id => (
            <button
              key={id}
              onclick={() => handleUserSelect(id)}
              style={{
                padding: "8px 16px",
                backgroundColor: selectedUserId === id ? "#007bff" : "#e9ecef",
                color: selectedUserId === id ? "white" : "#333",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: selectedUserId === id ? "bold" : "normal"
              }}
            >
              {id === "404" ? "Error Case" : `User ${id}`}
            </button>
          ))}
        </div>
        
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
          <input
            type="text"
            value={customUserId}
            oninput={(e) => setCustomUserId(e.target.value)}
            placeholder="Enter custom user ID"
            style={{
              padding: "8px 12px",
              border: "2px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px"
            }}
            onkeypress={(e) => e.key === "Enter" && handleCustomUser()}
          />
          <button
            onclick={handleCustomUser}
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Load User
          </button>
        </div>
      </div>
      
      <UserProfile userId={selectedUserId} />
    </div>
  )
} 