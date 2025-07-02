import { Link } from "kaioken/router"
import { users } from "./data"

export function UsersPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 Users</h2>
      {users.map(user => (
        <div key={user.id} style={{ marginBottom: "10px" }}>
          <Link to={`/users/${user.id}`} className="nav-link">
            {user.name} - {user.email}
          </Link>
        </div>
      ))}
    </div>
  )
} 