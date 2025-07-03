import { useComputed } from "kaioken"
import { count, doubled } from "./state"

export function App() {
  const isEven = useComputed(() => count.value % 2 === 0)
  return (
    <>
      <div style="display:flex; gap:10px; justify-content:center;">
        <button onclick={() => count.value--}>-</button>
        <span>Count: {count}</span>
        <button onclick={() => count.value++}>+</button>
      </div>
      <p>Doubled: {doubled}</p>
      <p>Is even: {isEven.value ? "Yes" : "No"}</p>
    </>
  )
}
