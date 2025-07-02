import { useState } from "kaioken"

export function App() {
  // Multiple state variables
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")

  // Functions to update state
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>🎯 State Management with Hooks</h1>
      
      {/* Counter Section */}
      <div style={{ marginBottom: "30px", padding: "20px", border: "2px solid #007bff", borderRadius: "8px" }}>
        <h2>Count: {count}</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onclick={increment}>+</button>
          <button onclick={decrement}>-</button>
          <button onclick={reset}>Reset</button>
        </div>
      </div>

      {/* Name Input Section */}
      <div style={{ marginBottom: "30px", padding: "20px", border: "2px solid #28a745", borderRadius: "8px" }}>
        <h2>Name Input</h2>
        <div>
          <input
            type="text"
            value={name}
            oninput={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button onclick={() => setName("")}>Clear</button>
        </div>
        
        <div style={{ marginTop: "20px", padding: "10px", background: "#333" }}>
          <strong>Status:</strong> {count > 0 ? "Positive" : count < 0 ? "Negative" : "Zero"}
        </div>
        
        {name && (
          <div style={{ marginTop: "10px", padding: "10px", background: "#e3f2fd", borderRadius: "4px" }}>
            Hello, <strong>{name}</strong>! 👋
          </div>
        )}
      </div>

      {/* Combined State Display */}
      <div style={{ padding: "20px", background: "#f8f9fa", borderRadius: "8px" }}>
        <h3>Combined State</h3>
        <p>Count: {count}</p>
        <p>Name: {name || "(empty)"}</p>
        <p>Both filled: {count !== 0 && name ? "✅ Yes" : "❌ No"}</p>
      </div>
    </div>
  )
} 