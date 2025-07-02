import { Link } from "kaioken/router"

export function Navigation() {
  return (
    <nav style={{ 
      padding: "20px", 
      backgroundColor: "#f8f9fa", 
      borderBottom: "1px solid #ddd" 
    }}>
      <h1 style={{ margin: "0 0 15px 0" }}>🚀 Routing Demo</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/users" className="nav-link">Users</Link>
      </div>
    </nav>
  )
} 