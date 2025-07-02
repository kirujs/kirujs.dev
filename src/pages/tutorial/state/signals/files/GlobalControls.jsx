import { count, multiplier, doubled } from "./store"

export function GlobalControls() {
  return (
    <div style={{ padding: "20px", background: "#333", margin: "10px" }}>
      <h3>Global State</h3>
      <p>Count × Multiplier = {count.value} × {multiplier.value} = {doubled.value}</p>
      <button onclick={() => { count.value = 0; multiplier.value = 2; }}>
        Reset All
      </button>
    </div>
  )
} 