import { Link } from "kaioken/router"

export function HomePage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🏠 Welcome Home!</h1>
      <p>This is the homepage of our routing demo.</p>
      <div style={{ margin: "20px 0" }}>
        <h2>Quick Navigation:</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link to="/about" className="nav-button">About Us</Link>
          <Link to="/users" className="nav-button">Users</Link>
          <Link to="/users/1" className="nav-button">View Alice</Link>
          <Link to="/dashboard" className="nav-button">Dashboard</Link>
        </div>
      </div>
    </div>
  )
} 