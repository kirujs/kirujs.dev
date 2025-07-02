import { Counter } from "./Counter"
import { GlobalControls } from "./GlobalControls"

export function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>📡 Signals Demo</h1>
      <p>Global reactive state that automatically updates all connected components</p>
      
      <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
        <Counter />
        <Counter />
        <GlobalControls />
      </div>
    </div>
  )
} 