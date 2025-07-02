import { Link } from "kaioken/router"
import { users } from "./data"

export function UsersPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>👥 Users</h1>
      <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
        {users.map(user => (
          <div key={user.id} style={{ 
            padding: "15px", 
            border: "1px solid #ddd", 
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <h3 style={{ margin: 0 }}>{user.name}</h3>
              <p style={{ margin: "5px 0", color: "#666" }}>{user.email}</p>
              <span style={{ 
                padding: "2px 8px", 
                backgroundColor: "#e3f2fd", 
                borderRadius: "12px",
                fontSize: "12px"
              }}>
                {user.role}
              </span>
            </div>
            <Link to={`/users/${user.id}`} className="nav-button">
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
} 