import { Router, Route, Link } from "kaioken/router"

export function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>My App</h1>

      <nav style={{ display: "flex", gap: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Router>
        <Route path="/" element={<div>Welcome to the home page!</div>} />
        <Route path="/about" element={<div>About us page</div>} />
      </Router>
    </div>
  )
}
