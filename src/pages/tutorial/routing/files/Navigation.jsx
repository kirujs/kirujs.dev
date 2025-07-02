import { Link, useRouter } from "kaioken/router"

export function Navigation() {
  const router = useRouter()
  
  const navStyle = {
    padding: "15px 20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dee2e6",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
  
  return (
    <nav style={navStyle}>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <h2 style={{ margin: 0, color: "#007bff" }}>Kaioken Router</h2>
        <div style={{ display: "flex", gap: "15px" }}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/users" className="nav-link">Users</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </div>
      </div>
      <div style={{ fontSize: "14px", color: "#666" }}>
        Current: <code>{router.pathname}</code>
      </div>
    </nav>
  )
} 