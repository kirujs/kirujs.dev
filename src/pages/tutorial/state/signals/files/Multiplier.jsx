import { multiplier } from "./store"

export function Multiplier() {
  return (
    <div style={{ padding: "10px", border: "1px solid #ccc", margin: "10px" }}>
      <h3>Multiplier Component</h3>
      <p>Multiplier: {multiplier.value}</p>
      <button onclick={() => multiplier.value++}>Increase</button>
      <button onclick={() => multiplier.value = Math.max(1, multiplier.value - 1)}>
        Decrease
      </button>
    </div>
  )
} 