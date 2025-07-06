import { useState } from "kaioken"

export function App() {
  const [userId, setUserId] = useState("1")

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>🔄 User Profile App</h1>
      <p>Click a user to view their profile</p>

      <div style={{ marginBottom: "20px" }}>
        <h3>Select User:</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          {["1", "2", "3"].map((id) => (
            <button
              key={id}
              onclick={() => setUserId(id)}
              style={{
                padding: "8px 16px",
                backgroundColor: userId === id ? "#007bff" : "#f8f9fa",
                color: userId === id ? "white" : "#333",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              User {id}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3>User Profile</h3>
        <p>Selected user: {userId}</p>
        <p>Profile data will be loaded here...</p>
      </div>
    </div>
  )
}
