import { useRouter, Link } from "kaioken/router"
import { users } from "./data"

export function UserDetailPage() {
  const router = useRouter()
  const user = users.find(u => u.id === parseInt(router.params.id))

  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>User Not Found</h2>
        <Link to="/users" className="nav-link">← Back to Users</Link>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/users" className="nav-link">← Back to Users</Link>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  )
} 