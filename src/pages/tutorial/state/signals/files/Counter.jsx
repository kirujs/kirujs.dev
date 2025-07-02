import { signal } from "kaioken"
import { count } from "./store"

export function Counter() {
  const doubled = signal(() => count.value * 2)
  
  return (
    <div style={{
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      textAlign: "center"
    }}>
      <h3>🔢 Counter</h3>
      <p>Count: {count.value}</p>
      <p>Doubled: {doubled.value}</p>
      
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onclick={() => count.value--}>-</button>
        <button onclick={() => count.value++}>+</button>
      </div>
    </div>
  )
} 