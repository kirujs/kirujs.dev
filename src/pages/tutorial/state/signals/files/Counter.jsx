import { count, doubled, isEven } from "./store"

export function Counter() {
  return (
    <div style={{ padding: "10px", border: "1px solid #ccc", margin: "10px" }}>
      <h3>Counter Component</h3>
      <p>Count: {count.value}</p>
      <p>Doubled: {doubled.value}</p>
      <p>Is Even: {isEven.value ? "Yes" : "No"}</p>
      <button onclick={() => count.value++}>Increment</button>
      <button onclick={() => count.value--}>Decrement</button>
    </div>
  )
} 