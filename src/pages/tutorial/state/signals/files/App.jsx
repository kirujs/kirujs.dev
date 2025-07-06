import { useState } from "kaioken"

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Counter App</h1>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onclick={() => setCount(count - 1)}>-</button>
        <span>Count: {count}</span>
        <button onclick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  )
}
