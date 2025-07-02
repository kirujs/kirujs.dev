import { Counter } from "./Counter"
import { Multiplier } from "./Multiplier"
import { GlobalControls } from "./GlobalControls"

export function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h1>Signals Demo</h1>
      <p>Signals provide reactive state that can be shared across components!</p>
      
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Counter />
        <Multiplier />
      </div>
      
      <GlobalControls />
    </div>
  )
} 