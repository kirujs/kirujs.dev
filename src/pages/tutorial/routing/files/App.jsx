import { Router, Route } from "kaioken/router"

export function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>My App</h1>

      <Router>
        <Route path="/" element={<div>Welcome to the home page!</div>} />
        <Route path="/about" element={<div>About us page</div>} />
      </Router>
    </div>
  )
}
