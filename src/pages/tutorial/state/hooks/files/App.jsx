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
        
        {name && (
          <div style={{ marginTop: "10px", padding: "10px", background: "#333", borderRadius: "4px", color: "#fff" }}>
            Hello, <strong>{name}</strong>! 👋
          </div>
        )}
      </div>
    </div>
  )
} 