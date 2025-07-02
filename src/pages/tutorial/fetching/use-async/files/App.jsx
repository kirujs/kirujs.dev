import { useState } from "kaioken"
import { UserProfile } from "./UserProfile"

export function App() {
  const [selectedUserId, setSelectedUserId] = useState("1")

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>🔄 useAsync Demo</h1>
      <p>Async data fetching with loading states and error handling</p>

      {/* User Selector */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Select User:</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          {["1", "2", "3", "404"].map(id => (
            <button
              key={id}
              onclick={() => setSelectedUserId(id)}
              style={{
                padding: "8px 16px",
                backgroundColor: selectedUserId === id ? "#007bff" : "#f8f9fa",
                color: selectedUserId === id ? "white" : "#333",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            >
              {id === "404" ? "Error" : `User ${id}`}
            </button>
          ))}
        </div>
      </div>

      <UserProfile userId={selectedUserId} />
    </div>
  )
} 